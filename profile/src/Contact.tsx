
import React from "react";
import Header from "./Header";

interface Props {
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

const Contact: React.FC<Props> = ({ selectedBtn, setSelected, onLogout }) => {
  return (
    <div style={{textAlign:"center"}}>
      <Header selectedBtn={selectedBtn} setSelected={setSelected} onLogout={onLogout} />
      <h2>Contact Page</h2>
      <p>Travancore Analytics</p>
      <p>Phone:6287672309</p>
    </div>
  );
};

export default Contact;