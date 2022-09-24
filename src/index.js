import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100,
  },
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resetpassword/:token" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
