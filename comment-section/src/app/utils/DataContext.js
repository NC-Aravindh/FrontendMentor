"use client";
import React, { createContext, useContext, useState } from "react";
import data from "../utils/data";

const CommentContext = createContext();

export const useData = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};

export const DataContextProvider = ({ children }) => {
  const [commentArr, setData] = useState(data.comments);

  const currentUser = data.currentUser;

  return (
    <CommentContext.Provider value={{ commentArr, setData, currentUser }}>
      {children}
    </CommentContext.Provider>
  );
};
