interface InputboxProps {
  res: string;
}

const Inputbox: React.FC<InputboxProps> = ({ res }) => {
  return (
    <input
      type="text"
      value={res}
      readOnly
      style={{
        width: "200px",
        margin: "2px",
        paddingRight: "5px",
        paddingBottom:"3px",
        height: "30px",
        border: "2px solid black",
        fontSize: "18px",
        textAlign: "center",
      }}
    />
  );
};

export default Inputbox;