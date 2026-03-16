import React, { useState } from "react";
import Header from "./Header";

interface Props {
  currentUser: string;
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

const Calculator: React.FC<Props> = ({
  currentUser,
  selectedBtn,
  setSelected,
  onLogout,
}) => {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Header
        selectedBtn={selectedBtn}
        setSelected={setSelected}
        onLogout={onLogout}
      />

      <h2>Calculator </h2>

     
      <input
        type="text"
        value={input}
        readOnly
        style={{
          width: "220px",
          height: "40px",
          fontSize: "18px",
          textAlign: "right",
          marginBottom: "10px",
          borderRadius:"5px"
        }}
      />

     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 60px)",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleClick(btn)}
            style={{
              height: "50px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;