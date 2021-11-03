import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useLocalStorage } from './hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';

export const AuthTokenContext = React.createContext('');

const AuthTokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('', 'accesoToken');
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    if (token) setTokenInfo(jwt_decode(token));
  }, [token]);

  return (
    <AuthTokenContext.Provider value={[token, setToken, tokenInfo]}>
      {children}
    </AuthTokenContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthTokenProvider>
      <App />
    </AuthTokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
