import React, { useState } from "react";

interface SignUpProps {
  onSignUp: (username: string, password: string, email: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <h2 style={{ fontSize: "50px", textAlign: "center" }}>Sign Up</h2>

      <input
        style={{ margin: "5px", width: "250px", height: "25px", borderRadius: "5px" }}
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />

      <input
        style={{ margin: "5px", width: "250px", height: "25px", borderRadius: "5px" }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        onClick={() => onSignUp(username, password, email)}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;