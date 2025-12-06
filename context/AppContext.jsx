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

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to fetch user");
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // const fetchUserChats = async () => {
  //   try {
  //     const { data } = await axios.get("/api/chat/getChats", {
  //       headers: { Authorization: token },
  //     });
  //     if (data.success) {
  //       setChats(data.chats);
  //       if (data.chats.length === 0) {
  //         await createNewChat();
  //       } else {
  //         setSelectedChat(data.chats[0]);
  //       }
  //     } else {
  //       toast.error(data.message || "Failed to load chats");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };

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
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
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
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
