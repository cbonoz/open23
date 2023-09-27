export const APP_NAME = 'DataX'
export const APP_DESC = 'DataX is a decentralized data marketplace that allows anyone to buy and sell data sets with just a wallet.'

export const ACTIVE_CHAIN = {
    id: 314159,
    name: 'Filecoin Calibration',
    symbol: 'tFIL',
    blockTimeSeconds: 30,
    rpc: 'https://calibration.node.glif.io/',
    explorerUrl: 'https://calibration.filscan.io/',
}

export const LISTING_TABLE = process.env.NEXT_PUBLIC_LISTING_TABLE;
export const OFFER_TABLE = process.env.NEXT_PUBLIC_OFFER_TABLE;

export const EXAMPLE_ITEM = {
    "id": 1,
    "address": "0x3CCAFaC2Cd44664bBb22F1fe9FBaEbcfcFFB2898",
    "name": "Oil price data set",
    "image": "https://i.ibb.co/6YfmGCS/oilprices.png",
    "description": "The data contains Weekly crude oil prices from 5/1987 to 9/2023",
    "keywords": ["oil", "price", "energy"],
    "purchases": 0,
    "createdBy": "0xf4982D4aC99d25d89Cc8993a88Dc643832B1515b",
    "createdAt": Date.now(),
    "currency": ACTIVE_CHAIN.symbol,
    "verified": false,
    "price": 0.5,
    "size": "10000000",
}

// Create a time series data set of 10 data points with random values between 1 and 5 to one decimal.
  // ["2023-05-01", 1], ...
export const EXAMPLE_OFFERS = [["2023-05-01", ], ["2023-06-01", 2], ["2023-07-01", 3], ["2023-08-01", 4], ["2023-09-01", 5], ["2023-9-04", 4], ["2023-9-06", 3], ["2023-12-01", 2], ["2024-01-01", 1], ["2024-02-01", 2]].map(x => [x[0], x[1] / 100])

export const generateItem = () => {
    return {
        ...EXAMPLE_ITEM,
        id: Math.round(Math.random() * 100000000),
        createdAt: Date.now(), // timestamp
        price: Math.round(Math.random() * 10) / 10
    }
}

// export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'
// export const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs'
export const IPFS_BASE_URL = 'https://saturn.ms/ipfs'

export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS

export const EXAMPLE_DATASETS = [
    {
      "name": "VideoGamePerformance",
      "description": "A dataset containing performance metrics and user behavior data from various video games.",
      "example": "Includes player scores, game completion times, and in-game purchases."
    },
    {
      "name": "SocialMediaInteractions",
      "description": "A dataset capturing interactions, comments, likes, and shares on a popular social media platform.",
      "example": "Tracks user engagement with posts, hashtags, and user-generated content."
    },
    {
      "name": "AstronomicalObservations",
      "description": "A scientific archive with astronomical observations, star catalogs, and celestial object data.",
      "example": "Includes telescope images, spectral data, and orbital parameters of celestial bodies."
    },
    {
      "name": "HealthcareClinicalTrials",
      "description": "A dataset containing records of clinical trials, drug effectiveness studies, and patient outcomes.",
      "example": "Includes patient profiles, treatment regimens, and trial results."
    },
    {
      "name": "VideoStreamingLogs",
      "description": "A dataset of logs from a video streaming platform, including user sessions, video requests, and quality metrics.",
      "example": "Tracks buffering events, video resolutions, and playback duration."
    },
    {
      "name": "SocialNetworkFriendships",
      "description": "A dataset representing friendships, connections, and interactions within a social network.",
      "example": "Includes friend lists, mutual connections, and messaging history."
    },
    {
      "name": "GenomicSequences",
      "description": "A scientific archive of genomic sequences, DNA data, and genetic variations.",
      "example": "Includes DNA base pairs, gene annotations, and genome assembly information."
    },
    {
      "name": "VideoSurveillanceFootage",
      "description": "A dataset comprising video footage from surveillance cameras in public areas.",
      "example": "Includes timestamps, camera locations, and object detection results."
    },
    {
      "name": "SocialMediaInfluencerProfiles",
      "description": "A dataset of social media influencer profiles, follower counts, and engagement statistics.",
      "example": "Tracks influencers' content categories, sponsored posts, and audience demographics."
    },
    {
      "name": "EnvironmentalSensorReadings",
      "description": "A scientific archive with environmental sensor readings, weather data, and pollution measurements.",
      "example": "Includes temperature, humidity, air quality, and precipitation readings."
    }
  ]

  export const DATASET_ITEMS = EXAMPLE_DATASETS.map(d => generateItem(d))
  export const DATASET_MAP = {}
DATASET_ITEMS.forEach(d => DATASET_MAP[d.id] = d)
