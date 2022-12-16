import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'web3modal';
import { ExecutionResult } from './enums';

export default function useExecution({
    onTxFail,
    onTxSubmit,
    onTxSuccess,
}) {
    const { account, provider } = useWeb3React();
    const [waitingSubmit, setWaitingSubmit] = useState(false);
    const [requests, setRequests] = useState(new Map());
    const [errorMessage, setErrorMessage] = useState();
    const [transactionTx, setTransactionTx] = useState('');
    const [showing, setShowing] = useState();
    const [showingDone, setShowingDone] = useState(false);
    const [submittedConfirmBack, setSubmittedConfirmBack] = useState();

    const handler = useCallback(async (
        brief, 
        spec, 
        subtitle, 
        early = false, 
        submitedBack, 
        mixpanelProps,
        submittedConfirmBack, 
        successBack
    ) => {
        setTransactionTx('');
        setErrorMessage('');
        if (!account || !provider) {
            throw new Error('Submission: can not execute when wallet disconnected');
        }
        setSubmittedConfirmBack(() => submittedConfirmBack);
        let tx, params, transaction;
        setWaitingSubmit(false);
        try {
            setWaitingSubmit(true);
            if (spec.to === '') throw new Error('Submission: malformed to');
            if (spec.data.length === 0) throw new Error('Submission: malformed data');
            params = {
                value: spec.value,
                data: spec.data,
                to: spec.to,
                gasLimit: spec.gasLimit,
                from: account,
                chainId,
            };

            if (!params.gasLimit) {
                try {
                    const gasLimit = await getEstimateGas(params, provider);
                    if (gasLimit) {
                        params.gasLimit = gasLimit;
                    }
                } catch (error) {
                    console.debug(error);
                }
            }

            transaction = await sendTransaction(params, provider);
            tx = transaction.hash;
            setTransactionTx(tx);
            if (!tx) throw new Error(`Unexpected tx: ${tx}`);
        } catch (e) {
            setWaitingSubmit(false);
            setShowing({ spec, brief, subtitle });
            console.error(e);
            if (e.message) {
                const options = { error: e.message, brief };
                if (mixpanelProps) Object.assign(options, mixpanelProps);
                if (onTxFail) {
                    onTxFail(e, mixpanelProps);
                }

                setErrorMessage(getExecutionErrorMsg(chainId, e.message));
            }
            return ExecutionResult.Failed;
        }
        setShowing({ spec, brief, subtitle });
        setShowingDone(false);
        setWaitingSubmit(false);

        const reportInfo = {
            brief,
            ...spec,
            ...params,
            tx,
            subtitle,
            ...mixpanelProps,
        };
        if (onTxSubmit) {
            onTxSubmit(tx, reportInfo);
        }
        if (submittedBack) {
            submittedBack();
        }

        if(transaction?.wait) {
            const receipt = await transaction.wait(1);
            setShowingDone(true);
            if (receipt.status === WatchResult.Success) {
                if (successBack) {
                    successBack(tx);
                }
                if (onTxSuccess) {
                    onTxSuccess(tx, reportInfo);
                }
                setRequests((res) => res.set(tx, [request, State.Success]));
                return ExecutionResult.Success;
            }
        }
        setShowingDone(true);
        setRequests((res) => res.set(tx, [request, State.Failed]));
        return ExecutionResult.Failed;
    }, [account, chainId, setWaitingSubmit, provider]
    );
    const ctxVal = useMemo(
        () => ({
            execute: handler,
            requests,
            setShowing,
            waitingSubmit,
        }),
        [handler, requests, setShowing]
    );
    const closeShowing = useCallback(() => {
        setShowing(null);
        if (submittedConfirmBack) {
            submittedConfirmBack();
            setSubmittedConfirmBack(undefined);
        }
    }, [submittedConfirmBack]);

    return {
        showing,
        showingDone,
        transactionTx,
        errorMessage,
        setErrorMessage,
        closeShowing,
        ctxVal,
        requests,
    };
}