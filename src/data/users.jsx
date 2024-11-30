import { useState } from "react";
import Proman from "../../src/assets/ProfilePicture/man.jpg";
import Progirl from "../../src/assets/ProfilePicture/Girl.jpg";


export const useUserData = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "สมสัก สลักจิต", phone: "0616251425", license: "กก1234", username: "Somsak", password: "12345", profilePicture: Proman, role:"Member" },
    { id: 2, name: "สักสม สลิตจัก", phone: "0616251426", license: "ขข5678", username: "Saksom", password: "12345", profilePicture: Progirl, role:"Visitor" },
    { id: 3, name: "ธีรภัทร์ แสงสร", phone: "0638784638", license: "ยม6969", username: "Thiraphat", password: "12345", profilePicture: Progirl, role:"Visitor" },
  ]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const verifyUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password) || null;
  };

  return { users, addUser, verifyUser };
};