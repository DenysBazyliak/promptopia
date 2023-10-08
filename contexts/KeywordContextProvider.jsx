"use client";

import { createContext, useState } from "react";

export const KeywordContext = createContext(null);
export default function KeywordContextProvider({ children }) {
  const [keyword, setKeyword] = useState("");

  return (
      <KeywordContext.Provider value={{keyword, setKeyword}}>{children}</KeywordContext.Provider>
  )
}
