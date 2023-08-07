import React, { useContext, createContext, useMemo, useState } from "react";

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const signUpValues = useMemo(
    () => ({
      firstName,
      setFirstName,
      lastName,
      setLastName,
      address,
      setAddress,
      email,
      setEmail,
      mobileNumber,
      setMobileNumber,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      agreeToTerms,
      setAgreeToTerms,
    }),
    [
      firstName,
      lastName,
      address,
      email,
      mobileNumber,
      password,
      confirmPassword,
      agreeToTerms,
    ]
  );

  return (
    <SignUpContext.Provider value={signUpValues}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => useContext(SignUpContext);
