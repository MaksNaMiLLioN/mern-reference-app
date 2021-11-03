import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    //clearError();
  }, [error, message]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h4>Cut the reference</h4>
        <div className="card #5c6bc0 indigo lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Fill in email"
                  id="email"
                  type="text"
                  name="mail"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Fill in password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn #29b6f6 light-blue lighten-1"
              style={{ marginRight: "10px" }}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn #29b6f6 light-blue lighten-1"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
