import React, { createContext, useState, useContext } from "react";

// สร้าง Context
const UserContext = createContext();

// สร้าง Provider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, username: "Somsak", password: "12345", phone: "0616251425", role: "Member" ,name: "สมสัก สลักจิต",profilePicture: "src/assets/ProfilePicture/man.jpg",license: "กก1234"},
    { id: 2, username: "Saksom", password: "12345", phone: "0616251426", role: "Visitor" ,name: "สักสม สลิตจัก",profilePicture: "src/assets/ProfilePicture/Girl.jpg",license: "ขข5678"},
  ]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const verifyUser = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    ) || null;
  };

  return (
    <UserContext.Provider value={{ users, addUser, verifyUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook เพื่อใช้งาน Context ได้ง่ายขึ้น
export const useUserContext = () => useContext(UserContext);