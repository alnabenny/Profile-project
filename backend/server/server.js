const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "../.env" });


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "users.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

function readUsers() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data || "[]");
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

//function to authenticate is the change made by me"
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}


app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const users = readUsers();

  const emailRegex =/^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  if(!emailRegex.test(email)){
    return res.status(400).send("enter a valid email address");
  }

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).send("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) : -1;

  const newUser = {
    id: maxId + 1,
    name: username,
    email,
    password: hashedPassword,
    phone: "",
    address: "",
    role: "user" 
  };

  users.push(newUser);
  writeUsers(users);

  res.send("Signup successful");
});

app.post("/login", async (req, res) => {
  const { identifier, password } = req.body; 
  const users = readUsers();


  const user = users.find(u => u.email === identifier || u.name === identifier);

  if (!user) return res.status(401).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES ||"1h" }
  );

  res.json({ token, username: user.name });
});

app.post("/logout", (req, res) => {
  res.send("Logged out successfully");
});
app.get("/users", authenticate, (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.post("/users", authenticate, async (req, res) => {
  const users = readUsers();
  const { name, email, password, phone, address, role } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).send("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) : -1;

  const newUser = {
    id: maxId + 1,
    name,
    email,
    password: hashedPassword,
    phone: phone || "",
    address: address || "",
    role: role || "user"
  };

  users.push(newUser);
  writeUsers(users);

  res.send("User added");
});
app.put("/users", authenticate, (req, res) => {
  const users = readUsers();
  const updatedUser = req.body;
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index === -1) return res.status(404).send("User not found");
  users[index] = { ...users[index], ...updatedUser };
  writeUsers(users);
  res.send("User updated");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});