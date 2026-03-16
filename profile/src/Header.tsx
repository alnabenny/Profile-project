import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ selectedBtn, setSelected, onLogout }) => {
  const navigate = useNavigate();

  const go = (name: string, path: string) => {
    setSelected(name);
    navigate(path);
  };

  const btnStyle = (name: string) => ({
    padding: "10px 20px",
    margin: "10px",
    background: selectedBtn === name ? "lightblue" : "white",
    border: "1px solid black",
    cursor: "pointer",
  
    
  });

  return (
    <div>
      <button style={btnStyle("home")} onClick={() => go("home", "/dashboard")}>Home</button>

      <button style={btnStyle("calculator")} onClick={() => go("calculator", "/calculator")}>Calculator</button>

      <button style={btnStyle("tictactoe")} onClick={() => go("tictactoe", "/tic-tac-toe")}>TicTacToe</button>

      <button style={btnStyle("contact")} onClick={() => go("contact", "/contact")}>Contact</button>

      <button style={btnStyle("users")} onClick={() => go("users", "/users")}>Users</button>

      <button style={btnStyle("logout")} onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Header;