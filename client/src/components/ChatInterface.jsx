import React, { useState, useEffect } from "react";
import {
  UilAngleLeft,
  UilAngleRight,
  UilPlusCircle,
  UilPen,
} from "@iconscout/react-unicons";

const ChatInterface = () => {
  const [clicked, setClicked] = useState(() => {
    const saved = localStorage.getItem("clicked");
    return saved === "true" ? true : false;
  });


  const handleClick = () => {
    setClicked(!clicked);
  };


  return (
    <div className="w-full h-screen background flex">
      <div
        className={` ${
          clicked ? "w-1/4" : "w-0"
        } h-screen p-2 transition-all duration-150 ease-in-out`}
      >
        <div className={`w-full h-full glass rounded-xl`}>
          {/* History */}
        </div>
      </div>
      <div className="w-full h-screen p-2">
        <div className="w-full h-full glass border rounded-xl">
          <nav className="p-2 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleClick}>
                {clicked ? (
                  <UilAngleLeft size="20" color="white" />
                ) : (
                  <UilAngleRight size="20" color="white" />
                )}
              </button>
              {clicked ? (
                ""
              ) : (
                <button className="flex items-center justify-center text-gray-200 hover:bg-slate-800 px-2 rounded-xl">
                  <UilPlusCircle size="15" color="white" />
                  <span
                    className="ml-1 text-sm"
                  >
                    Title
                  </span>
                </button>
              )}
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="flex items-center">
                <span className="text-sm text-white mr-1">Title</span>
                <UilPen size="13" color="white" />
              </div>
            </div>
          </nav>
          <div className="w-[80%] h-full m-auto bg-rose-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
