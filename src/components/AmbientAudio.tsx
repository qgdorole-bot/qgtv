import { useEffect, useRef } from "react";
import danse from "@/assets/audio/halloween-music.mp3.asset.json";
import toccata from "@/assets/audio/halloween-toccata.mp3.asset.json";
import mountain from "@/assets/audio/halloween-mountain.mp3.asset.json";
import bald from "@/assets/audio/halloween-bald.mp3.asset.json";

/** Halloween ativo até o fim do dia 31/10 (mesma regra das cartas do time). */
const isHalloweenSeason = () => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return todayStr <= "2026-10-31";
};

// Playlist livre de direitos: obras de domínio público, gravações por Kevin MacLeod (incompetech.com, CC BY 3.0) e Musopen
const PLAYLIST = [
  { url: danse.url, title: "Danse Macabre" },
  { url: toccata.url, title: "Toccata and Fugue in D Minor" },
  { url: mountain.url, title: "In the Hall of the Mountain King" },
  { url: bald.url, title: "Night on Bald Mountain" },
];

/** Ordem embaralhada de forma determinística pelo dia (muda todo dia). */
const dailyShuffle = () => {
  const today = new Date();
  const seed = today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate();
  let s = seed % 2147483647;
  const rand = () => (s = (s * 48271) % 2147483647) / 2147483647;
  return [...PLAYLIST].sort(() => rand() - 0.5);
};

interface AmbientAudioProps {
  isOn: boolean;
}

export const AmbientAudio = ({ isOn }: AmbientAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isHalloweenSeason()) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;

    queueRef.current = dailyShuffle().map((t) => t.url);
    indexRef.current = 0;
    audio.src = queueRef.current[0];

    const tryPlay = () => {
      audio.play().catch(() => {
        /* aguardando interação do usuário */
      });
    };

    // Passa para a próxima música quando a atual termina (loop infinito da playlist)
    const handleEnded = () => {
      indexRef.current = (indexRef.current + 1) % queueRef.current.length;
      audio.src = queueRef.current[indexRef.current];
      tryPlay();
    };
    audio.addEventListener("ended", handleEnded);

    tryPlay();
    // Navegadores só permitem som após a primeira interação — tenta de novo no primeiro toque/tecla
    window.addEventListener("keydown", tryPlay, { once: true });
    window.addEventListener("pointerdown", tryPlay, { once: true });

    // Pausa quando a aba/TV está em segundo plano (economia e estabilidade)
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      audio.pause();
    };
  }, []);

  // Liga/desliga pelo controle (TV ou tecla M)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isOn]);

  if (!isHalloweenSeason()) return null;

  return (
    <audio ref={audioRef} preload="auto" style={{ display: "none" }} />
  );
};
