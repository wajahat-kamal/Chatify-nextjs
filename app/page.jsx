"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Chatbox from "@/components/Chatbox";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import Image from "next/image";
import menu from '@/assets/menu.svg'

export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    <>
    {!isMenuOpen && (
      <Image
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden fixed top-3 left-3 w-9 h-9 not-dark:invert"
        src={menu}
        alt="Menu Icon"
      />
    )}

    <div className="h-screen w-screen flex flex-row justify-center items-center overflow-hidden">
      <Sidebar  isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Chatbox />
    </div>

    </>
  );
}
