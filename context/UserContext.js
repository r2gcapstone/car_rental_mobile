import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ownerId: null,
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    imageUrl: "",
    mobileNumber: "",
    dateCreated: "",
    notifCount: 0,
  });

  // You can add functions to update user details here if needed

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
