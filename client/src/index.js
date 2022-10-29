import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./style/index.scss";
import { store } from './app/store'
// import Test from './Test';
// import "../fontawesome-free-6.0.0-beta3-web/css/all.css";
// import "./fontawesome-free-6.0.0-beta3-web/css/all.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Test /> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
