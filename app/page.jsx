"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Chatbox from "@/components/Chatbox";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

export default function Home() {
  const {token, setToken, router} = useAppContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken); // set token to state
    }
  }, [router]);

  if (!token) return <Loading/>; // wait until token is loaded

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center overflow-hidden">
      <Sidebar />
      <Chatbox />
    </div>
  );
}
