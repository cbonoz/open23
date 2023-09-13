export const APP_NAME = 'DataX'


export const SAMPLE_LISTINGS = [
    {
        id: 1,
        title: 'Sample Listing 1',
        description: 'This is a sample listing',
        price: .005,
        currency: 'ETH',
    },
    {
        id: 2,
        title: 'Sample Listing 3',
        description: 'This is a sample listing',
        price: .005,
        currency: 'ETH',
    },
    {
        id: 3,
        title: 'Sample Listing 3',
        description: 'This is a sample listing',
        price: .005,
        currency: 'ETH',
    }
]

export const EXAMPLE_FORM = {...SAMPLE_LISTINGS[0]}

export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'

export const ACTIVE_CHAIN = {
    id: 314159,
    name: 'Filecoin Calibration',
    symbol: 'tFIL',
    rpc: 'https://calibration.node.glif.io/',
    explorerUrl: 'https://calibration.filscan.io/',
}