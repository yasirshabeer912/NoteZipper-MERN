import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // When the component mounts, check if there is user data in localStorage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const initialUser = JSON.parse(storedUserInfo);
      setUser(initialUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Store user data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Remove user data from localStorage
    localStorage.removeItem("userInfo");
  };

  // Function to update the user's note
  const updateNote = (noteData) => {
    // Update the note in your state or take any necessary action
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, updateNote }}>
      {children}
    </UserContext.Provider>
  );
};
