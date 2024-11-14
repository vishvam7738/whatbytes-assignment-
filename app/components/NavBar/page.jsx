"use client";
import React from "react";

export default function NavBar({ setOpenSidebar }) {
  return (
    <div className="p-3 flex items-center justify-between w-full border-b-[1px]">
      <button
        className="logo-div flex"
        onClick={() => setOpenSidebar((prev) => !prev)}
      >
        <div className="flex items-center">
          <img src="/whatbytes.png" className="h-[50px] mr-2" />
          <h1 className="font-bold text-[25px]">WhatBytes</h1>
        </div>
      </button>
      <div className="flex items-center border-[2px] border-gray-200 rounded-md p-1">
  <img src="/profile.png" className="rounded-full h-[30px] mr-2" />
  <p className="font-bold">Rahil Siddique</p>
</div>

    </div>
  );
}
