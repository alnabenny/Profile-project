import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface Props {
  currentUser: string;
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

const DashBoard: React.FC<Props> = ({
  currentUser,
  selectedBtn,
  setSelected,
  onLogout
}) => {

  const navigate = useNavigate();

  const open = (name: string, path: string) => {
    setSelected(name);
    navigate(path);
  };

  const imgStyle = {
    width: "140px",
    cursor: "pointer"
  };

  return (
    <div style={{ textAlign: "center" }}>

      <Header
        selectedBtn={selectedBtn}
        setSelected={setSelected}
        onLogout={onLogout}
      />

      <h2>Welcome {currentUser}</h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        marginTop: "40px"
      }}>

        <div onClick={() => open("calculator","/calculator")}>
          <img src="/uploads/calculator.jpg" style={imgStyle}/>
          <p>Calculator</p>
        </div>

        <div onClick={() => open("tic","/tic-tac-toe")}>
          <img src="/uploads/tic-tac-toe.jpg" style={imgStyle}/>
          <p>TicTacToe</p>
        </div>

        <div onClick={() => open("contact","/contact")}>
          <img src="/uploads/contact.jpg" style={imgStyle}/>
          <p>Contact</p>
        </div>

        <div onClick={() => open("users","/users")}>
          <img src="/uploads/users.jpg" style={imgStyle}/>
          <p>Users</p>
        </div>

      </div>
    </div>
  );
};

export default DashBoard;