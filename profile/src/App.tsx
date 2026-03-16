import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import DashBoard from "./DashBoard";
import TicTacToe from "./TicTacToe";
import Calculator from "./Calculator";
import Contact from "./Contact";
import Users from "./Users";

function App() {

  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem("currentUser") || ""
  );

  
  const [loggedin, setLoggedin] = useState(
    () => !!localStorage.getItem("token")
  );

  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<string | null>(null);

  const handleSignUp = async (username: string, password: string, email: string) => {
    if (!username || !password || !email) return alert("Enter all fields");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!res.ok) return alert(await res.text());

      alert(await res.text());
      setShowSignUp(false);

    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  const handleLogin = async (identifier: string, password: string) => {
    if (!identifier || !password)
      return alert("Enter username/email and password");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", data.username);

      setCurrentUser(data.username);
      setLoggedin(true);

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", { method: "POST" });

      
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      setCurrentUser("");
      setLoggedin(false);
      setSelectedBtn(null);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Routes>

      {!loggedin ? (
        <>
          <Route
            path="/"
            element={
              <div style={{ textAlign: "center", marginTop: 50 }}>
                {showSignUp ? (
                  <>
                    <SignUp onSignUp={handleSignUp} />
                    <p style={{ fontSize: "20px" }}>
                      Already have an account?{" "}
                      <button
                        style={{ width: "100px", height: "25px", fontSize: "15px" }}
                        onClick={() => setShowSignUp(false)}
                      >
                        Login
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <Login onLogin={handleLogin} />
                    <p style={{ fontSize: "20px" }}>
                      Don't have an account?{" "}
                      <button
                        style={{ width: "100px", height: "25px", fontSize: "15px" }}
                        onClick={() => setShowSignUp(true)}
                      >
                        Sign Up
                      </button>
                    </p>
                  </>
                )}
              </div>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/dashboard"
            element={
              <DashBoard
                currentUser={currentUser}
                selectedBtn={selectedBtn}
                setSelected={setSelectedBtn}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="/calculator"
            element={
              <Calculator
                currentUser={currentUser}
                selectedBtn={selectedBtn}
                setSelected={setSelectedBtn}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="/tic-tac-toe"
            element={
              <TicTacToe
                currentUser={currentUser}
                selectedBtn={selectedBtn}
                setSelected={setSelectedBtn}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact
                selectedBtn={selectedBtn}
                setSelected={setSelectedBtn}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="/users"
            element={
              <Users
                selectedBtn={selectedBtn}
                setSelected={setSelectedBtn}
                onLogout={handleLogout}
              />
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}

    </Routes>
  );
}

export default App;