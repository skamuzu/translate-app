import "./App.css";
import InputTextArea from "./components/InputTextArea";
import OutputTextArea from "./components/OutputTextArea";
import {LangContextProvider} from "./contexts/LangContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LangContextProvider>
      <ToastContainer/>
      <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_40%,rgba(0,0,0,0.9)_80%),url('/hero_img.jpg')] bg-center bg-cover w-screen min-h-screen flex flex-col items-center p-4 lg:p-12 dm-sans sm:justify-center">
        <img src="/logo.svg" className="w-40 lg:w-60 mb-12" />
        <div className="flex flex-col lg:flex-row gap-10 w-full justify-center items-center">
          <InputTextArea color="#212434" />
          <OutputTextArea color="#101624" />
        </div>
      </main>
      
    </LangContextProvider>
  );
}

export default App;
