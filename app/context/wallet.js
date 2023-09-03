
'use client';
import { createContext, useContext, useState } from 'react';

const WalletContext = createContext({})

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(null)

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {children}
        </WalletContext.Provider>
    );

};
export const useWallet = () => {
    return useContext(WalletContext);
};

export default WalletContext;
