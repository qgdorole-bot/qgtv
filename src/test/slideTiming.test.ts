import { describe, expect, it } from "vitest";
import { getSlideDuration } from "@/lib/slideTiming";

describe("Tempo de leitura das telas detalhadas", () => {
  it("deixa os quadros com dez cartas por mais tempo que a abertura", () => {
    expect(getSlideDuration("cards")).toBeGreaterThan(getSlideDuration("welcome"));
    expect(getSlideDuration("terapeutas-musicos")).toBeGreaterThan(getSlideDuration("welcome"));
  });
  it("deixa a escala com vários rolês por mais tempo que um evento", () => {
    expect(getSlideDuration("roles-semana")).toBeGreaterThan(getSlideDuration("geekevents"));
  });
});