import React, { useState } from "react";
import { upperCaseLetters, lowerCaseLetters, numbers, special } from "./data";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(6);
  const [isUppercase, setIsUppercase] = useState(true);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [modalState, setModalState] = useState({
    title: "",
    show: false,
    message: "",
  });

  const increaseCounter = (e) => {
    e.preventDefault();

    if (counter < 20) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const decreaseCounter = (e) => {
    e.preventDefault();

    if (counter > 6) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const generatePassword = (e) => {
    e.preventDefault();

    let _password = "";

    for (let i = 0; i < counter; i++) {
      _password += getRandom();
    }

    setPassword(_password);
  };

  const getRandom = () => {
    const chars = [];

    if (isUppercase) {
      chars.push(
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
      );
    }
    if (isLowercase) {
      chars.push(
        lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]
      );
    }
    if (isNumbers) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (isSymbols) {
      chars.push(special[Math.floor(Math.random() * special.length)]);
    }

    return chars[Math.floor(Math.random() * chars.length)];
  };

  const createCopy = () => {
    const textAreaEl = document.createElement("textarea");
    textAreaEl.innerText = password;
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  };

  const copyPasswordHandler = (e) => {
    e.preventDefault();

    if (password.trim().length === 0) {
      setModalState({
        title: "Error",
        show: true,
        message: "No password to copy",
      });
    } else {
      setModalState({
        title: "Success",
        show: true,
        message: "Password copied to clipboard",
      });
    }

    createCopy();
  };

  const closeModalHandler = () => {
    setModalState({ ...Modal, show: false });
  };

  return (
    <div className="App">
      <div className="w-[100vw] h-[100vh] absolute">
        <div className="bg-[#FF71CD] h-[900px] w-[500px] absolute overflow-hidden blur-[90px] bottom-0 left-0 z-1 rounded-full"></div>
        <div className="bg-[#5755FE] h-[500px] w-[900px] absolute overflow-hidden blur-[90px] bot-0 left-0 z-1 rounded-full translate-x-[40vw]"></div>
      </div>
      <div className="bg-[white]/10 w-[450px] mx-auto p-6 rounded-3xl translate-y-[100px] z-40 relative">
        <div className="generator">
          <h2 className="generator__title text-center text-2xl font-semibold text-white">
            Password Generator
          </h2>
          <h4 className="password text-center text-white">{password}</h4>
        </div>

        <form className="generator__form">
          <div className="generator__form-controls flex flex-col text-white">
            <div className="generator__form-control space-x-2">
              <input
                checked={isUppercase}
                onChange={(e) => setIsUppercase(e.target.checked)}
                type="checkbox"
                id="uppercase"
                name="uppercase"
              />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div className="generator__form-control space-x-2">
              <input
                checked={isLowercase}
                onChange={(e) => setIsLowercase(e.target.checked)}
                type="checkbox"
                id="lowercase"
                name="lowercase"
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
            <div className="generator__form-control space-x-2">
              <input
                checked={isNumbers}
                onChange={(e) => setIsNumbers(e.target.checked)}
                type="checkbox"
                id="numbers"
                name="numbers"
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div className="generator__form-control space-x-2">
              <input
                checked={isSymbols}
                onChange={(e) => setIsSymbols(e.target.checked)}
                type="checkbox"
                id="symbols"
                name="symbols"
              />
              <label htmlFor="symbols">Symbols</label>
            </div>

            <div className="generator__length flex flex-col items-center space-y-2 bg-[white]/30 mt-4 py-4 rounded-3xl">
              <h4 className="generator__length-title text-center">
                Password Length
              </h4>
              <div className="generator__length-counter">
                <button
                  onClick={decreaseCounter}
                  className="py-1 px-4 bg-[white]/30 rounded-full"
                >
                  -
                </button>
                <span className="px-4">{counter}</span>
                <button
                  onClick={increaseCounter}
                  className="py-1 px-4 bg-[white]/30 rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            <div className="generator__form-action flex flex-col justify-around pt-6 space-y-2">
              <button
                onClick={generatePassword}
                className="btn generate-btn py-2 rounded-full text-white bg-gradient-to-r from-purple-500/70 to-pink-500/70"
              >
                Generate Password
              </button>
              <button
                onClick={copyPasswordHandler}
                className="btn copy-btn py-2 rounded-full text-white bg-slate-200 bg-white/30"
              >
                Copy Password
              </button>
            </div>
          </div>
        </form>
        {modalState.show && (
          <Modal
            onClose={closeModalHandler}
            title={modalState.title}
            message={modalState.message}
          />
        )}
      </div>
    </div>
  );
}

export default App;
