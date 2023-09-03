
'use client';

import { createContext, useContext, useState } from 'react';
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

    const connect = async (provider) => {
        console.log('connect', provider)
        const dataverseConnector = new DataverseConnector();
        const pkh = await dataverseConnector.connectWallet({
            provider
        });

        setWallet(pkh)
    }

    const logout = async () => {
        await dataverseConnector.disconnectWallet();
        setWallet(null)
    }

    return (
        <WalletContext.Provider value={{ wallet, connect, logout }}>
            {children}
        </WalletContext.Provider>
    );

};
export const useWallet = () => {
    return useContext(WalletContext);
};

export default WalletContext;
