import { State } from './enums';
import { useSubmission } from '.';

export default function useInflights() {
    const { requests } = useSubmission();
    const runningRequests = [];
    requests?.forEach(function ([request, state]) {
        if (state === State.Running) {
            runningRequests.push(request);
        }
    });
    return {
        runningRequests,
        isInflight: runningRequests.length > 0,
    };
}