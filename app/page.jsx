import Sidebar from "@/components/Sidebar";
import Chatbox from "@/components/Chatbox";

export default function Home() {
  return (
   <div className="h-screen w-screen flex flex-row justify-center items-center overflow-hidden">
   <Sidebar />
   <Chatbox />
   </div>
  );
}
