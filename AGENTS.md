# Project architecture

- Keep per-slide reading durations in `src/lib/slideTiming.ts` and use them for both slideshow timers and progress, so detailed screens get consistent reading time.
- Load slide images through the current-and-neighbour rendering window, not an eager preload of the full asset archive, to keep TV memory usage bounded.
- Use the shared Halloween frame for presentation-wide decoration while keeping brand logos and QR codes unchanged, so identity and scanning remain intact.