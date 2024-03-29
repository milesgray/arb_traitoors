import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Text } from '@chakra-ui/react'
import { formatEther } from "@ethersproject/units"
import useSWR from 'swr'

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    return library[method](...params)
}

const TokenBalance = () => {
    const { account, active, library, chainId } = useWeb3React()

    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    })
    console.log("TokenBalance", balance)

    useEffect(() => {
        if (!library) return

        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`)
        library.on('block', () => {
            console.log('update balance...')
            mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners('block')
        }

        // trigger the effect only on component mount
        // ** changed to library prepared
    }, [library])

    return (
        <div>
            {active && balance ? (
                <Text fontSize="md" w='100%' my='2' align='left'>
                    ETH in account: {parseFloat(formatEther(balance)).toFixed(3)} {chainId === 31337 ? 'Test' : ' '} ETH
                </Text>
            ) : (
                <Text fontSize="md" w='100%' my='2' align='left'>ETH in account:</Text>
            )}
        </div>
    )
}

export default TokenBalance