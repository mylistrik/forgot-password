import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import "../Style/ForgotPassword.css";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ForgotPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();
  const [expired, setExpired] = useState();
  const alert = useAlert();
  const params = useParams();
  let token = params.token;
  let decodedtoken = jwtDecode(token);
  let currentDate = new Date();
  useEffect(() => {
    if (decodedtoken.exp * 1000 < currentDate.getTime()) {
      console.log("token expired");
      setExpired(true);
    } else {
      console.log("token ok");
      setExpired(false);
    }
  }, []);

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setErrorPassword("password tidak boleh kosong!");
    } else {
      setErrorPassword("");
    }
  };

  const changeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (!value) {
      setErrorConfirmPassword("konfirmasi password tidak boleh kosong!");
    } else if (password !== value) {
      setErrorConfirmPassword("password tidak cocok!");
    } else {
      setErrorConfirmPassword("");
    }
  };

  const simpanPassword = () => {
    console.log(params);
    const data = {
      password: password,
      token: params.token,
    };
    axios
      .put("https://cerulean-clam-cape.cyclic.app/api/v1/resetpassword", data)
      .then((res) => {
        if (res) {
          setPassword("");
          setConfirmPassword("");
          alert.success("password berhasil diganti!");
        } else {
          alert.error("password gagal diganti");
        }
      });
  };

  return (
    <div>
      {!expired ? (
        <div>
          <header>
            <h1>SELAMAT DATANG DI HALAMAN RESET PASSWORD</h1>
          </header>
          <main>
            <section>
              <form>
                <fieldset>
                  <div className="input1">
                    <label for="new-password">Password Baru :</label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      value={password}
                      onChange={changePassword}
                    />
                    {errorPassword && <p>{errorPassword}</p>}
                  </div>
                  <div className="input1">
                    <label for="confirm-password">Konfirmasi Password :</label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      value={confirmPassword}
                      onChange={changeConfirmPassword}
                    />
                    {errorConfirmPassword && <p>{errorConfirmPassword}</p>}
                  </div>
                  <div className="button">
                    <input
                      type="button"
                      value="submit"
                      onClick={() => simpanPassword()}
                    />
                  </div>
                </fieldset>
              </form>
            </section>
          </main>
        </div>
      ) : (
        <div>
          <h1>TOKEN TIDAK ADA ATAU KADALUWARSA</h1>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
