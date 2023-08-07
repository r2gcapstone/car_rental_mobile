import React, { useContext, createContext, useReducer } from "react";

export const SignUpReducer = createContext();

const initialstate = {
  email: "",
  authId: "",
  step: "registrationForm",
};

export const SignUpProvider2 = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "uploadAvatar":
        console.log(action);
        return {
          ...state,
          payload: {
            email: action.payload.email,
            authId: action.payload.authId,
            step: action.payload.step,
          },
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <SignUpReducer.Provider value={{ state, dispatch }}>
      {children}
    </SignUpReducer.Provider>
  );
};

// export const useSignReducer = () => useContext(SignUpReducer);
