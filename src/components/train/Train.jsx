import { useEffect, useRef, useState } from "react";
import Bogey from "./Bogey";
import { speak } from "../../utils/speak";
import "./Train.css";
import BackgroundMusic from "../common/BackgroundMusic";

const data = [
  { value: 1, object: "🍎" },
  { value: 2, object: "🍎" },
  { value: 3, object: "🍎" },
  { value: 4, object: "🍎" },
  { value: 5, object: "🍎" },
  { value: 6, object: "🍎" },
  { value: 7, object: "🍎" },
  { value: 8, object: "🍎" },
  { value: 9, object: "🍎" },
  { value: 10, object: "🍎" },
];

export default function Train() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("enter"); // enter | wait | exit
  const speechTimerRef = useRef(null);

  const current = data[index];

  /* =========================
     TRAIN PHASE CONTROL
     ========================= */
  useEffect(() => {
    let timer;

    if (phase === "enter") {
      timer = setTimeout(() => setPhase("wait"), 4000);
    }

    if (phase === "wait") {
      const waitTime = current.value * 700 + 1000;
      timer = setTimeout(() => setPhase("exit"), waitTime);
    }

    if (phase === "exit") {
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % data.length);
        setPhase("enter");
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [phase, current.value]);

  /* =========================
     SPEECH — SAY NUMBER ONCE
     ========================= */
  useEffect(() => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
    }

    window.speechSynthesis.cancel();

    // Speak once per number, after apples start appearing
    speechTimerRef.current = setTimeout(() => {
      speak(String(current.value));
    }, 1200);

    return () => clearTimeout(speechTimerRef.current);
  }, [index]);

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="train-scene">
      {/* Background music (auto / loop handled inside component) */}
      <BackgroundMusic />

      <div className="train-number">{current.value}</div>

      <div className="background-layer">
        <div className="tree" style={{ left: "8%" }} />
        <div className="tree" style={{ left: "18%" }} />
        <div className="house" style={{ left: "30%" }} />
        <div className="tree" style={{ left: "45%" }} />
        <div className="house" style={{ left: "65%" }} />
        <div className="tree" style={{ left: "78%" }} />
      </div>

      <div className="train-track" />

      <div className={`train ${phase}`} key={`${index}-${phase}`}>
        <Bogey
          count={current.value}
          object={current.object}
          show={phase === "wait"}
        />
      </div>

      <div className="grass" />
    </div>
  );
}
