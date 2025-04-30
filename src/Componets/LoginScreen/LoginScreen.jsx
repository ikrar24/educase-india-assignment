import React, { useState } from "react";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function LoginScreen() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const isFormFilled = Email.trim() !== "" && Password.trim() !== "";

  const submitLogin = (e) => {
    e.preventDefault();

    const storedEmail = JSON.parse(localStorage.getItem("email"));
    const storedHashedPassword = localStorage.getItem("password");

    if (!storedEmail || !storedHashedPassword) {
      alert("User not found, please sign up first!");
      navigate("/signup")
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(Password, storedHashedPassword);

    if (Email === storedEmail && isPasswordCorrect) {
      navigate("/account-setting");
    } else {
      alert("Invalid email or password!");
    }


  };

  return (
    <section className="logingContaier">
      <div className="loginSmallContaier">
        <div className="loginHeadingBox">
          <h1 className="loginHeading">
            Signin to your <br /> PopX Account
          </h1>
          <h2 className="loginShortLink">
            Lorem Ipsum dolor sit amet. <br />
            consectetur adipiscing elit.
          </h2>
        </div>

        <form id="loginForm" onSubmit={submitLogin}>
          <div className="EmailInputBox">
            <input
              type="email"
              placeholder="Enter email address"
              id="loginEmail"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="loginEmail" className="EmailLebel">
              Email address
            </label>
          </div>

          <div className="PasswordInputBox">
            <input
              type="password"
              placeholder="Enter password"
              id="loginPassword"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="loginPassword" className="passLebel">
              Password
            </label>
          </div>

          <div className="loginBtnBox">
            <button
              id="loginBtn"
              type="submit"
              style={{
                backgroundColor: isFormFilled ? "#6c25ff" : "rgba(92, 92, 92, 0.596)",
                color: "white",
                cursor: isFormFilled ? "pointer" : "default",
              }}
              disabled={!isFormFilled}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginScreen;
