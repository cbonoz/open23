
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    DataverseConnector,
    WALLET
} from "@dataverse/dataverse-connector";

/**
 * Initialize the Dataverse Connector
 */


const WalletContext = createContext({})



export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(null)
    const [dataverseConnector, setDataverseConnector] = useState(null)
    const [provider, setProvider] = useState(null)

    const connect = async () => {
        const d = new DataverseConnector();
        const pkh = await d.connectWallet({
            wallet: WALLET.METAMASK,
        });

        setWallet(pkh)
        setDataverseConnector(d)
        setProvider(await d.getProvider())
    }

    const logout = async () => {
        // await dataverseConnector.disconnectWallet();
        setWallet(null)
    }

    return (
        <WalletContext.Provider value={{ wallet, connect, logout, provider, dataverseConnector, test: 5 }}>
            {children}
        </WalletContext.Provider>
    );

};
export const useWallet = () => {
    return useContext(WalletContext);
};

export default WalletContext;
