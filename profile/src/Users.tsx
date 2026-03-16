import React, { useEffect, useState } from "react";
import Header from "./Header";

interface Props {
  selectedBtn: string | null;
  setSelected: (name: string) => void;
  onLogout: () => void;
}

interface User {
  id: number;
  name: string;
  password: string;
  phone: string;
  address: string;
  email: string;
}

const Users: React.FC<Props> = ({ selectedBtn, setSelected, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [popUpUser, setPopUpUser] = useState<User | null>(null);


  const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/users", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    setUsers(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (!localStorage.getItem("token")) {
    alert("Please log in first");
    return;
  }
  fetchUsers();
}, []);

  const editUser = (index: number) => {
    setEditingIndex(index);
    setPopUpUser({ ...users[index] });
  };

  const addUser = () => {
    setEditingIndex(null);
    setPopUpUser({
      id: 0,
      name: "",
      password: "",
      phone: "",
      address: "",
      email: ""
    });
  };

  const handleChange = (field: keyof User, value: string) => {
    if (popUpUser) setPopUpUser({ ...popUpUser, [field]: value });
  };
const handleSave = async () => {
  if (!popUpUser) return;

  try {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/users", {
      method: editingIndex !== null ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(popUpUser)
    });

    fetchUsers();
    setPopUpUser(null);
    setEditingIndex(null);

  } catch (err) {
    console.error(err);
  }
};

  const handleCancel = () => {
    setPopUpUser(null);
    setEditingIndex(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header selectedBtn={selectedBtn} setSelected={setSelected} onLogout={onLogout} />

      <h2>Registered Users</h2>

      <button onClick={addUser} style={{ marginBottom: "15px", fontSize: "18px" }}>
        Add New User
      </button>

      <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "70%", textAlign: "left" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Phone</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Address</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px" }}></th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{user.name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{user.phone}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{user.address}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{user.email}</td>

                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button onClick={() => editUser(index)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {popUpUser && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            minWidth: "300px"
          }}>

            <h3>{editingIndex !== null ? "Edit User" : "Add User"}</h3>

            <div style={{ marginBottom: "10px" }}>
              <label>Name: </label>
              <input
                type="text"
                value={popUpUser.name}
                onChange={e => handleChange("name", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Phone: </label>
              <input
                type="text"
                value={popUpUser.phone}
                onChange={e => handleChange("phone", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Address: </label>
              <input
                type="text"
                value={popUpUser.address}
                onChange={e => handleChange("address", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Password: </label>
              <input
                type="password"
                value={popUpUser.password}
                onChange={e => handleChange("password", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Email: </label>
              <input
                type="email"
                value={popUpUser.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Users;