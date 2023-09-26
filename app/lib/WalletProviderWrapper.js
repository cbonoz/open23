
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    DataverseConnector,
    WALLET
} from "@dataverse/dataverse-connector";

/**
 * Initialize the Dataverse Connector context.
 */
export const WalletContext = createContext({})

export const WalletProviderWrapper = ({ children }) => {
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
        try {
            await dataverseConnector.disconnectWallet();
        } catch (e) {
            // may be already logged in or cache issue.
            console.error('error logging out', e);
        }
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
