import { useEffect } from "react";

export default function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio("/music/bg.mp3");
    audio.loop = true;
    audio.volume = 0.25; // soft volume

    audio.play().catch(() => {
      // autoplay might be blocked until user interaction
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}
