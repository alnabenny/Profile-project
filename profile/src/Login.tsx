import React, { useState } from "react";

interface LoginProps {
  onLogin: (identifier: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ fontSize: "40px" }}>Login</h2>
      <input
        style={{ margin: "5px", width: "250px", height: "25px", borderRadius: "5px" }}
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />
      <br />
      <input
        style={{ margin: "5px", width: "250px", height: "25px", borderRadius: "5px" }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button
        style={{ width: "100px", height: "35px", fontSize: "20px" }}
        onClick={() => onLogin(identifier, password)}
      >
        Login
      </button>
    </div>
  );
};

export default Login;