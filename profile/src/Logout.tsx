
import React from "react";

interface Props {
  onLogout: () => void;
}

const Logout: React.FC<Props> = ({ onLogout }) => {
  return (
    <button
      style={{ fontSize: 25, padding: "5px 15px", margin: "10px" }}
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default Logout;