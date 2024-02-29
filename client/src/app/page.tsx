
import ChatInterface from "@/components/ChatInterface";
import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen bg-slate-950 flex">
      <SideBar />
      <ChatInterface />
    </div>
  );
};

export default page;
