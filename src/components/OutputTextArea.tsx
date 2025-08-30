import React, { useState } from "react";
import { useContext } from "react";
type OutputProps = {
  color: string;
};
import { LangContext } from "../contexts/LangContext";
import { useSpeech } from "react-text-to-speech";

const OutputTextArea = ({ color }: OutputProps) => {
  let { outputLang, setOutputLang, translatedText, inputLang, copyTextToClipboard } =
    useContext(LangContext)!;
  const { start } = useSpeech({ text: translatedText });

  function handleOutputLang(
    e: React.MouseEvent<HTMLButtonElement>,
    lang: string
  ) {
    e.preventDefault();
    setOutputLang(lang);
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full lg:w-200  h-fit lg:h-106 rounded-3xl p-1 lg:p-2 text-gray-400 opacity-90 "
    >
      <form>
        <div className="w-full mx-auto p-2 flex flex-col font-bold">
          <div className="flex justify-between items-center">
            <ul className="flex gap-3 p-4">
              <li>
                <button
                  className={`${
                    outputLang === "en" && "bg-gray-600 text-[#D6D9DC]"
                  } p-2 rounded-md`}
                  onClick={(e) => handleOutputLang(e, "en")}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className={`${
                    outputLang === "fr" && "bg-gray-600 text-[#D6D9DC]"
                  } p-2 rounded-md`}
                  onClick={(e) => handleOutputLang(e, "fr")}
                >
                  French
                </button>
              </li>
              <li>
                <button
                  className={`${
                    outputLang === "es" && "bg-gray-600 text-[#D6D9DC]"
                  } p-2 rounded-md`}
                  onClick={(e) => handleOutputLang(e, "es")}
                >
                  Spanish
                </button>
              </li>
            </ul>
          <div className="pr-6 "> 
            <img className="w-10 p-1 border-4 rounded-xl border-gray-400" src="/Horizontal_top_left_main.svg"/>
          </div>
          </div>
          <hr className="border-b-1 border-[#D6D9DC] self-center w-15/16 " />
        </div>

        <div className="px-6 py-4 relative">
          <textarea
            className="w-full h-55 text-white outline-0 text-lg font-semibold resize-none"
            value={
              inputLang !== outputLang
                ? translatedText
                : "Select two different languages"
            }
            disabled
          ></textarea>
        </div>

        <div className="flex justify-between items-center pb-4">
          <div className="px-4 flex gap-2 pl-8 items-center justify-between">
            <button
              type="button"
              className="p-1 border-4 rounded-md border-gray-400"
              onClick={start}
            >
              <img className="w-7 hover:w-8" src="/sound_max_fill.svg" alt="" />
            </button>
            <button className="p-1 border-4 rounded-md border-gray-400"
            onClick={(e) => copyTextToClipboard(e,translatedText)}>
              <img className="w-7 hover:w-8" src="/Copy.svg" alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OutputTextArea;
