"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(null); // FIXED
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Load token on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        setLoadingUser(false);
      }
    }
  }, []);

  // Fetch user when token exists
  useEffect(() => {
    if (!token) return;
  
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUser(res.data.user || null); // ✅ use res.data
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
  
    fetchUser();
  }, [token]);
  

  const value = {
    router,
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    loadingUser,
    token,
    setToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
