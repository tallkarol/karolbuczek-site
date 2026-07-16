KAROL BUCZEK — PREMIUM WEBGL HERO PROTOTYPE

FILES
- karol-premium-webgl-hero.html — complete standalone prototype

RUN
Open the HTML file in a modern browser.
If your browser restricts local WebGL files, serve the folder locally:

  python3 -m http.server 8000

Then open:
  http://localhost:8000/karol-premium-webgl-hero.html

INTERACTIONS
- Move the pointer for restrained parallax.
- Drag the illustration to pivot it.
- The architecture modules assemble on initial load.
- Signal pulses move through the topology.
- Reduced-motion preferences are respected.

PRODUCTION DIRECTION
The prototype is dependency-free WebGL2. For karolbuczek.com, the same scene can be ported into a client-only React component or recreated in Three.js / React Three Fiber. The production version should be dynamically loaded, capped for device pixel ratio, paused when offscreen, and replaced with a static fallback on constrained devices.
