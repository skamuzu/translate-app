import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import "../App.css"
interface LangContextType {
  inputLang: string;
  setInputLang: React.Dispatch<React.SetStateAction<string>>;
  outputLang: string;
  setOutputLang: React.Dispatch<React.SetStateAction<string>>;
  translatedText : string,
  setTranslatedText: React.Dispatch<React.SetStateAction<string>>;
  copyTextToClipboard: (
    e: React.MouseEvent<HTMLButtonElement>, 
    text: string
  ) => Promise<void>;
}

export const LangContext = createContext<LangContextType | null>(null);

export const LangContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputLang, setInputLang] = useState<string>("en");
  const [outputLang, setOutputLang] = useState<string>("fr");
  const [translatedText, setTranslatedText] = useState<string>("")
  const copyTextToClipboard = async (e: React.MouseEvent<HTMLButtonElement>,text: string) => {
    e.preventDefault()
  try {
    await navigator.clipboard.writeText(text);
    toast("Text copied to clipboard", {
      className: "my-custom-toast"},)
    console.log('Text copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    toast.warning("Copy failed")
  }
};

  return (
    <LangContext.Provider value={{ inputLang, setInputLang, outputLang, setOutputLang, translatedText, setTranslatedText, copyTextToClipboard }}>
      {children}
    </LangContext.Provider>
  );
};
