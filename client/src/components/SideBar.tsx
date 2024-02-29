import React from "react";

const SideBar = () => {
  return (
    <div>
      <div className="flex w-[200px] h-screen flex-col justify-between border-e bg-slate-900">
        <div className="px-1 py-6 w-full ">
          <span className="w-full martine text-4xl grid h-10  place-content-center text-gray-600">
            Wren
          </span>
          <div className="text-gray-300 mt-10">
            <div className="flex flex-col w-full p-2 mb-2 bg-slate-700 cursor-pointer rounded-lg">
              <span>Hello World</span>
              <span className="text-xs">This is a summary</span>
            </div>
            <div className="flex flex-col w-full p-2 mb-2 border-2 border-slate-700 cursor-pointer rounded-lg">
              <span>Hello World</span>
              <span className="text-xs">This is a summary</span>
            </div>
            <div className="flex flex-col w-full p-2 mb-2 border-2 border-slate-700 cursor-pointer rounded-lg">
              <span>Hello World</span>
              <span className="text-xs">This is a summary</span>
            </div>
          </div>
        </div>
        <div className="text-gray-300">
            Account
        </div>
      </div>
    </div>
  );
};

export default SideBar;
