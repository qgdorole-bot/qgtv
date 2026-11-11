import { useEffect, useRef } from "react";
import jingle from "@/assets/audio/christmas-jingle-bells.mp3.asset.json";
import wish from "@/assets/audio/christmas-we-wish-you.mp3.asset.json";
import halls from "@/assets/audio/christmas-deck-the-halls.mp3.asset.json";
import silent from "@/assets/audio/christmas-silent-night.mp3.asset.json";

const PLAYLIST = [jingle.url, wish.url, halls.url, silent.url];
const dailyShuffle = () => {
  const today = new Date();
  let seed = (today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate()) % 2147483647;
  const queue = [...PLAYLIST];
  for (let i = queue.length - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = Math.floor((seed / 2147483647) * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  return queue;
};

export const AmbientAudio = ({ isOn }: { isOn: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isOnRef = useRef(isOn);
  isOnRef.current = isOn;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const queue = dailyShuffle();
    let index = 0;
    audio.volume = 0.25;
    audio.src = queue[index];
    const tryPlay = () => {
      if (!isOnRef.current || document.hidden) return;
      audio.play().catch(() => { /* O navegador aguarda interação. */ });
    };
    const ended = () => {
      index = (index + 1) % queue.length;
      audio.src = queue[index];
      tryPlay();
    };
    const visibility = () => document.hidden ? audio.pause() : tryPlay();
    audio.addEventListener("ended", ended);
    window.addEventListener("keydown", tryPlay);
    window.addEventListener("pointerdown", tryPlay);
    document.addEventListener("visibilitychange", visibility);
    tryPlay();
    return () => {
      audio.removeEventListener("ended", ended);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      document.removeEventListener("visibilitychange", visibility);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isOn && !document.hidden) audio.play().catch(() => {});
    else audio.pause();
  }, [isOn]);

  return <audio ref={audioRef} preload="auto" className="hidden" aria-label="Playlist de Natal" />;
};