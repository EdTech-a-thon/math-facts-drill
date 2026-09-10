# Math Facts Drill

A single-page multiplication drill for the in-class Rocket Math routine. One file, no build step, no server, no database.

## How a session works

1. Student enters a first name and taps the set they're practicing (A–V, then AA–RR).
2. The app builds **36 questions**: each new fact in the chosen set appears **4 times**, and the remaining slots are filled with review facts drawn only from *earlier* sets — never a fact outside the sequence. A standard 4-fact set is 16 new + 20 review.
3. Questions are mixed so no fact ever lands next to itself.
4. Correct → a short encouraging reply. Incorrect → the fact in a full sentence ("Ten times six is sixty."), a prompt to say it three times, then practice **resumes three questions back**. One correction per wrong answer.
5. Typing `done` (or pressing **Finish session**) ends the drill and prints a session line the student copies:

   `Session ID: T931, Name: Matt, Set: F, Questions: 36`

Typing `debug` shows the current set's new facts and confirms they're in the round.

No mastery, no scoring, no progress tracking — the app only facilitates the timed practice.

## Student data

None is collected. The name and answers live in the browser tab only; nothing is written to a server, a database, or even browser storage. Closing the tab erases the session, so no PINs or logins are needed.

## Hosting

Open `index.html` directly, or serve it anywhere static — Vercel, Netlify, GitHub Pages. On Vercel: import the repo, leave framework preset as "Other", no build command, output directory `./`. No config file is needed.

## Editing the fact sequence

The sets live in the `SETS` array near the top of the `<script>` in `index.html`, written as `"3x4"` strings in sequence order. Add or reorder entries there; review facts are computed from whatever precedes each set.

## Session composition, exactly

Most sets have 2–4 new facts, so the arithmetic is simply *facts × 4 new slots*, with review filling the rest. Three situations need a rule:

| Situation | Sets | What happens |
| --- | --- | --- |
| More new facts than four copies can fit | K (12 facts) | Copies drop to the largest number that still leaves 12 review slots — Set K runs 24 new + 12 review from Sets A–J |
| No earlier sets to review from | A | All 36 questions come from Set A itself, each of its 15 facts 2–3 times |
| Review pool smaller than the slots to fill | B (15 available, 24 needed), C (18 available, 20 needed) | The pool is reshuffled and reused rather than reaching outside the sequence |

Every new fact in the chosen set is guaranteed to appear, and no question is ever drawn from a later set.
