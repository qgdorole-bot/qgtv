/** Tempo de leitura proporcional à quantidade de elementos da tela. */
export const SLIDE_DURATIONS: Record<string, number> = {
  welcome: 18000,
  geekcontent: 24000,
  cards: 36000,
  gamification: 30000,
  "roles-semana": 40000,
  "terapeutas-musicos": 36000,
  geekevents: 20000,
  closing: 30000,
};

export const getSlideDuration = (id: string) => SLIDE_DURATIONS[id] ?? 24000;