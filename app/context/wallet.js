
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

    const connect = async (provider) => {
        const d = new DataverseConnector();
        const pkh = await d.connectWallet({
            wallet: WALLET.METAMASK,
        });

        setWallet(pkh)
        setDataverseConnector(d)
    }

    const logout = async () => {
        // await dataverseConnector.disconnectWallet();
        setWallet(null)
    }

    return (
        <WalletContext.Provider value={{ wallet, connect, logout, dataverseConnector, test: 5 }}>
            {children}
        </WalletContext.Provider>
    );

};
export const useWallet = () => {
    return useContext(WalletContext);
};

export default WalletContext;
