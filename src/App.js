import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>SELAMAT DATANG DI HALAMAN RESET PASSWORD</h1>
      <ul>
        <li>
          <Link to="/resetpassword/:token">Mulai</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
