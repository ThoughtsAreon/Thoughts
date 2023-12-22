import React, { useState, createContext, useContext, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext<Wallet | null>(null);

export const useCurrentWallet = () => {
  return useContext(WalletContext);
};

export type Wallet = {
  address?: string;
  connected?: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  provider: ethers.providers.Web3Provider;
  wallet: ethers.providers.JsonRpcSigner;
  isMetaMask: boolean;
};

export const WalletProvider = ({ children }: any) => {
    const [account, setAccount] = useState(null);
    const [connected, setConnected] = useState(false);
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isMetaMask, setIsMetamask] = useState(false);

    const connect = async () => {
        const { ethereum } = window as any;
        if (ethereum && ethereum.isMetaMask) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            setAccount(accounts[0]);
            setConnected(true);
            setProvider(provider);
            setSigner(signer);
        }
    };

    useEffect(() => {
      if((window as any).ethereum && (window as any).ethereum.isMetaMask) { setIsMetamask(true); connect() }

      (window as any).ethereum && (window as any).ethereum.on('accountsChanged',async function (_: any) {

        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
      
        setAccount(accounts[0]);
        setSigner(signer);
        setProvider(provider);
      })
      
    return () => {
      (window as any).ethereum && (window as any).ethereum.removeAllListeners();
    };
    }, []);

    const disconnect = async () => {
      setAccount(null);
      setConnected(false);
      setProvider(null);
      setSigner(null);
    }

    const value: Wallet = {
        address: account,
        connected,
        connect,
        disconnect,
        provider,
        wallet: signer,
        isMetaMask
      };
    
      return (
        <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
      );
};


