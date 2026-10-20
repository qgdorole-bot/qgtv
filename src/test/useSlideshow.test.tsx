import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSlideshow } from "@/hooks/useSlideshow";

describe("Troca com tempo individual por tela", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
  });
  afterEach(() => vi.useRealTimers());

  it("respeita o tempo maior da próxima imagem e continua o loop", () => {
    const { result, unmount } = renderHook(() => useSlideshow({
      totalSlides: 2, slideDurations: [18000, 36000],
    }));
    act(() => vi.advanceTimersByTime(18000));
    expect(result.current.currentSlide).toBe(1);
    act(() => vi.advanceTimersByTime(35999));
    expect(result.current.currentSlide).toBe(1);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.currentSlide).toBe(0);
    unmount();
  });

  it("dá o tempo completo quando alguém avança manualmente", () => {
    const { result, unmount } = renderHook(() => useSlideshow({
      totalSlides: 2, slideDurations: [18000, 36000],
    }));
    act(() => vi.advanceTimersByTime(17000));
    act(() => result.current.nextSlide());
    act(() => vi.advanceTimersByTime(35999));
    expect(result.current.currentSlide).toBe(1);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.currentSlide).toBe(0);
    unmount();
  });
});