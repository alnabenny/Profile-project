let users = []; 
const fs = require("fs");
const path= require("path");

const filePath =path.join(__dirname,"users.json");

function readUsers(){
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeUsers(users){
  fs.writeFileSync(filePath,JSON.stringify(users,null,2));
}

function userSignup(username, password) {
  const users =readUsers();
  if (!username || !password) return { error: "Username and password required" };
  if (users.find(u => u.username === username)) return { error: "User exists" };

  users.push({ username, password,phone:"",address:"" ,email:""});

   writeUsers(users);

  return { message: "Signup successful" };
}

function userLogin(username, password) {
  const users = readUsers();

  const user = users.find(
    u => u.username === username && u.password === password);

  if (!user) {
    return { error: "Invalid credentials" };
  }
  return { message: "Login successful" };
  
}

function listUsers() {
  const users = readUsers();


  return users.map(u => ({
    name: u.username,
    phone: u.phone,
    address: u.address,
    email:u.email
  }));

}

function addUser(name,phone,address,password,email){
  const users=readUsers();

   users.push({
    username: name,
    password:password,
    phone,
    address,
    email
  });

  writeUsers(users);
    return { message: "User added successfully" };
}


function updateUser(name, phone, address,email) {
  const users = readUsers();

  const user = users.find(u => u.username === name);

  if (!user) return { error: "User not found" };

  user.phone = phone;
  user.address = address;
  user.email=email;

  writeUsers(users);

  return { message: "User updated" };
}

module.exports = { userSignup, userLogin, listUsers ,addUser,updateUser};