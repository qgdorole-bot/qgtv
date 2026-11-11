import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { AmbientAudio } from "@/components/AmbientAudio";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Som natalino", () => {
  it("respeita o som desligado após interação, mudança de visibilidade e fim da faixa", () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
    const { container } = render(<AmbientAudio isOn={false} />);
    fireEvent.pointerDown(window);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent(document, new Event("visibilitychange"));
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Áudio ausente");
    fireEvent.ended(audio);
    expect(play).not.toHaveBeenCalled();
  });
  it("toca com volume 0.25 e passa para outra faixa natalina", () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
    const { container } = render(<AmbientAudio isOn />);
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Áudio ausente");
    expect(audio.volume).toBe(0.25);
    const initial = audio.src;
    fireEvent.ended(audio);
    expect(audio.src).not.toBe(initial);
    expect(audio.src).toContain("christmas-");
  });
});