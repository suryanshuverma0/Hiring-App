import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", phone: "" });

  useEffect(() => {
    // Load saved user info from AsyncStorage (if available)
    const loadUser = async () => {
      try {
        const savedName = await AsyncStorage.getItem("userName");
        const savedPhone = await AsyncStorage.getItem("userPhone");
        if (savedName && savedPhone) {
          setUser({ name: savedName, phone: savedPhone });
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  const saveUser = async (name, phone) => {
    try {
      setUser({ name, phone });
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userPhone", phone);
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
