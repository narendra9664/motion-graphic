# SPEC — "Ready buyer" (glass-flow style test)

STYLE SOURCE: reference/SaasCendx_ssspin.io_1793801606.mp4 (Highlander launch). The person asked for this look,
so its glass, mesh blobs and 3D-tilted UI are ALLOWED here, used only the way that reference uses them.

GOAL:    a real-estate owner feels "my ready buyer slipped away — frontdesk AI would have caught them", then DMs AUDIT.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps, motion blur on.
TIME:    26.0 s x 30 = 780 frames. Music technology-mixkit-1, 130 BPM (beat 0.4615 s = 13.85 fr), media-start 20.895
         so the track's drop (29.895) lands on film 9.00 = the logo. Music only, no VO.
LOOK:    ground #EEF3FB with 3 soft blobs (#2A63F6, #7AA8FF, #C4D8FF), blur 110 px, always drifting 20–60 px/s;
         ink #0E2244, dim #5B6B88, accent #1F5EFF (one word or one control per shot);
         WhatsApp green #25D366 / bubble #DCF8C6 only in the follow-up shot, where the ground floods green-teal 0.4 s.
         glass = white 55% + backdrop blur 24 px + 1.5 px white 85% rim + shadow 0 30 60 rgba(30,70,160,.18), radius 28–999.
         type Inter: headlines 600/800 at 64–96 px tracking -2%; hero word 900 at 250 px with blue gradient; UI >= 26 px.
MOTION:  enter expo.out / power4.out 0.5–0.8 s; camera + floods power2.inOut; exits power3.in, 40% shorter;
         words: blur 8->0 + opacity, 0.08 s apart; one hero move per shot; NO hard cuts between beats:
         every seam is a morph, blur swap, zoom-through or object-becomes-world.
SHOTS:   0.0–3.2   glass notification pill swaps 3 real buyer events (blur swap)            -> pill lifts, blurs
         3.0–5.6   "Your hottest buyer visited" + hero "6 TIMES." over a drawing intent wave  -> zoom through the 6
         5.3–9.0   glass pill morphs: Missed call -> Cold lead -> Lost deal; "Nobody called them." + 3 agent cursors leaving
         8.8–11.6  DROP: logo mark selected by cursor, glass lens grows, wordmark            -> lens becomes the world
         11.2–16.2 3D-tilted "Ranked by intent" queue; scores count up; cursor clicks Follow up on Rahul (94)
         15.9–20.2 ground floods green; WhatsApp follow-up types itself at 11:42 PM; reply; glass "Viewing booked" tile
         19.9–23.0 "Never lose a ready buyer again." per word over ghost mark
         22.7–26.0 glass CTA pill "DM AUDIT to @frontdesk.ops" between two blue glass shapes -> logo hold >= 1.5 s
SOUND:   bed 0.55, fade-out 1.5; whoosh x2 (alternate takes) on zoom-through and lens; pop on pill swaps;
         click on cursor clicks; notification on WhatsApp send; riser into the drop (ends 9.0).
REALITY: names/numbers are the brand demo data (Rahul Mehta 94, Sky Penthouse A-4, 11:42 PM, Sat 11:00 AM, Meera).
         Logo is a redraw of the orb from the brand's earlier film — PLACEHOLDER until the real logo file is supplied.
BANNED:  dark void; neon / glow halos; text moving while read; floating/breathing loops on titles; three cards in a row;
         everything fading-and-sliding up; logo docked in a corner; hard cuts between beats.
QA:      1.0 pill legible; 4.4 hero word fills >=60% width; 7.5 cursors + line; 9.3 logo on the drop; 13.5 tilted queue
         readable >=26 px; 18.5 booked tile; 21.5 full line; 25.0 logo lockup centred.
