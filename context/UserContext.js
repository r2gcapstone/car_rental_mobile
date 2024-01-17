import React, { createContext, useContext, useState, useEffect } from "react";
import { updateRentingDuration } from "api/rental";

// Create the UserContext
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ownerId: null,
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    email: "",
    imageUrl: "",
    mobileNumber: "",
    dateCreated: "",
    notifCount: 0,
  });

  useEffect(() => {
    updateRentingDuration();

    const intervalId = setInterval(updateRentingDuration, 720000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
