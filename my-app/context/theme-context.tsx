"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type Theme = "light" | "dark"

type ThemeContext = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}
const ThemeContext = createContext<ThemeContext | null>(null)

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`${theme === "light" ? "bg-white text-black" : "bg-black text-white"} min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useThemeContext(){
  const context = useContext(ThemeContext)
  if(!context){
    throw new Error("use it within ThemeContextProvider buddy!");
  }
  return context
}