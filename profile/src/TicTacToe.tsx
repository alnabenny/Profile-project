import React, { useState } from "react";
import Header from "./Header";

interface Props {
  currentUser: string;
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

const TicTacToe: React.FC<Props> = ({
  currentUser,
  selectedBtn,
  setSelected,
  onLogout,
}) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [result, setResult] = useState("");

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || result) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const winner = checkWinner(newBoard);
    if (winner === "X") {
      setResult(`${currentUser} wins`);
    } else if (winner === "O") {
      setResult("Opponent wins");
    } else if (!newBoard.includes(null)) {
      setResult("Draw");
    }
  };

 
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setResult("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header
        selectedBtn={selectedBtn}
        setSelected={setSelected}
        onLogout={onLogout}
      />

      <h2>Tic Tac Toe</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              height: "80px",
              fontSize: "28px",
              cursor: "pointer",
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={result}
          readOnly
          style={{
            width: "250px",
            height: "35px",
            textAlign: "center",
            fontSize: "16px",
          }}
        />
      </div>

      
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleRestart}
          style={{
            width: "120px",
            height: "40px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;