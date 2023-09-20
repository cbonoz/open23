export const APP_NAME = 'DataX'

export const ACTIVE_CHAIN = {
    id: 314159,
    name: 'Filecoin Calibration',
    symbol: 'tFIL',
    rpc: 'https://calibration.node.glif.io/',
    explorerUrl: 'https://calibration.filscan.io/',
}

export const STAT_KEYS = [
    'purchases',
    'price',
    'size',
    'tags',
    'createdAt'
]

export const EXAMPLE_ITEM = {
    "id": 1,
    "address": "0x1234",
    "name": "Oil price data set",
    "image": "https://i.ibb.co/6YfmGCS/oilprices.png",
    "description": "The data contains Weekly crude oil prices from 1987 to 9/2023",
    "tags": ["oil", "price", "energy"],
    "purchases": 0,
    "createdBy": "0xf4982D4aC99d25d89Cc8993a88Dc643832B1515b",
    "createdAt": "2023-09-18T00:00:00.000Z",
    "currency": ACTIVE_CHAIN.symbol,
    "size": "10mb",
  }

export const EXAMPLE_OFFERS = [
    {"2023-05-13": 2, "2023-05-14": 5}
]

export const generateItem = (id) => {
    return {
        ...EXAMPLE_ITEM,
        id,
        price: Math.round(Math.random() * 10) / 10
    }
}


// export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'
export const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs'

