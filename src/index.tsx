import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { RecoilRoot } from 'recoil'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'styles/globals.css';
import 'degen/styles'
import 'react-loading-skeleton/dist/skeleton.css'
import { WalletProvider } from 'WalletProvider';
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <ToastContainer />
        <WalletProvider>
        <App />
        </WalletProvider>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
