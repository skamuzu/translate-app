import React, { useState, createContext } from "react";

interface LangContextType {
  inputLang: string;
  setInputLang: React.Dispatch<React.SetStateAction<string>>;
  outputLang: string;
  setOutputLang: React.Dispatch<React.SetStateAction<string>>;
  translatedText : string,
  setTranslatedText: React.Dispatch<React.SetStateAction<string>>;
}

export const LangContext = createContext<LangContextType | null>(null);

const LangContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputLang, setInputLang] = useState<string>("en");
  const [outputLang, setOutputLang] = useState<string>("fr");
  const [translatedText, setTranslatedText] = useState<string>("")

  return (
    <LangContext.Provider value={{ inputLang, setInputLang, outputLang, setOutputLang, translatedText, setTranslatedText }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContextProvider;
