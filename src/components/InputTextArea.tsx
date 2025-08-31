import React, { useState } from "react";
import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";
import { useSpeech } from "react-text-to-speech";
import { useVoices } from "react-text-to-speech";

type InputProps = {
  color: string;
};

const InputTextArea = ({ color }: InputProps) => {
  let { inputLang, setInputLang, outputLang, setTranslatedText, copyTextToClipboard, setLoading } =
    useContext(LangContext)!;
  const [sentence, setSentence] = useState<string>("");

  const { start } = useSpeech({ text: sentence });

  function handleInputLang(
    e: React.MouseEvent<HTMLButtonElement>,
    lang: string
  ) {
    e.preventDefault();
    setInputLang(lang);
    setSentence("")
  }

  async function fetchTranslation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    try {
      const url = new URL("https://api.mymemory.translated.net/get");
      url.searchParams.append("q", sentence);
      url.searchParams.append("langpair", `${inputLang}|${outputLang}`);

      const response = await fetch(url.toString(), {
        method: "GET",
      });

      const data = await response.json();
      console.log(data);
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full lg:w-200  h-fit lg:h-106 rounded-3xl p-1 lg:p-2 text-gray-400 opacity-90 "
    >
      <form onSubmit={(e) => fetchTranslation(e)}>
        <div className="w-full mx-auto p-2 flex flex-col font-bold">
          <ul className="flex gap-1.5 lg:gap-3 p-4 flex-wrap">
            <li>
              <button
                className={`${
                  inputLang === "en" && "bg-gray-600 text-[#D6D9DC]"
                } p-2 rounded-lg`}
                onClick={(e) => handleInputLang(e, "en")}
              >
                English
              </button>
            </li>
            <li>
              <button
                className={`${
                  inputLang === "fr" && "bg-gray-600 text-[#D6D9DC]"
                } p-2 rounded-lg`}
                onClick={(e) => handleInputLang(e, "fr")}
              >
                French
              </button>
            </li>
            <li>
              <button
                className={`${
                  inputLang === "es" && "bg-gray-600 text-[#D6D9DC]"
                } p-2 rounded-lg`}
                onClick={(e) => handleInputLang(e, "es")}
              >
                Spanish
              </button>
            </li>
          </ul>
          <hr className="border-b-1 border-[#D6D9DC] self-center w-15/16 " />
        </div>

        <div className="px-6 py-4 relative">
          <textarea
            className="w-full h-55 text-white outline-0 text-lg font-semibold resize-none"
            value={sentence}
            maxLength={500}
            onChange={(e) => {
              setSentence(e.target.value);
              setTranslatedText("")
            }}
          ></textarea>
          <p className="absolute bottom-8 right-10 font-bold">{sentence.length}/500</p>
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
            <button
              type="button"
              className="p-1 border-4 rounded-md border-gray-400 "
              onClick={(e) => copyTextToClipboard(e,sentence)}
            >
              <img className="w-7 hover:w-8" src="/Copy.svg" alt="" />
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 flex items-center active:bg-blue-800 hover:bg-blue-700  mr-4 p-3 px-5 rounded-xl  text-white "
            disabled={inputLang === outputLang}
          >
            <img src="/Sort_alfa.svg" alt="" />
            Translate
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputTextArea;
