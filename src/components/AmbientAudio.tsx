import { useEffect, useRef } from "react";
import track from "@/assets/audio/halloween-music.mp3.asset.json";

/** Halloween ativo até o fim do dia 31/10 (mesma regra das cartas do time). */
const isHalloweenSeason = () => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return todayStr <= "2026-10-31";
};

// "Danse Macabre" — Camille Saint-Saëns (domínio público), gravação por Kevin MacLeod (incompetech.com), CC BY 3.0
interface AmbientAudioProps {
  isOn: boolean;
}

export const AmbientAudio = ({ isOn }: AmbientAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isHalloweenSeason()) return;
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio.play().catch(() => {
        /* aguardando interação do usuário */
      });
    };

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
    <audio
      ref={audioRef}
      src={track.url}
      loop
      preload="auto"
      volume={0.25}
      style={{ display: "none" }}
    />
  );
};
