# Project SHARON — An Experience Made Just for Her ❤️
**Interactive Luxury Editorial Birthday Website · Storytelling · Secret Vault · Media Archive**

A bespoke cinematic interactive birthday experience created for Sharon by her two friends, **Idris** and **Daniel**.

---

## ✨ Features Included

1. **Editorial Luxury Visual Direction**
   - Romantic editorial luxury palette: Midnight Plum (`#160B19`), Deep Burgundy (`#47243C`), Warm Ivory (`#FAF2EC`), Dusty Rose (`#E9AFC1`), and Champagne Gold (`#D9B47A`).
   - Cormorant Garamond & DM Sans typography with golden foil accents and subtle glassmorphism.
   - Dynamic canvas with floating ambient golden particles and celebratory confetti bursts.

2. **9 Progressive Connected Scenes ("Reveal, Don't Display")**
   - **Scene 01 — The Mysterious Invitation**: Sealed luxury envelope with a 3D golden wax seal monogram ("S"). Breaking the seal unrolls the invitation.
   - **Scene 02 — The First Reveal**: Staggered cinematic reveal with golden glow and starry accents: *"Today isn't an ordinary day... Because someone extraordinary was born... HAPPY BIRTHDAY, SHARON."*
   - **Scene 03 — The Woman We Know**: 4 interactive editorial trait cards (*The Go-Getter*, *The Independent Queen*, *Our Super Mom*, *The Woman Who Builds*) that unlock their observations on tap.
   - **Scene 04 — Two Stories, One Sharon**: Two sealed letter capsules (*377 Days & Counting* from Idris & *From Childhood, With Love* from Daniel). Tapping either opens an authentic warm ivory parchment reader with full word-for-word preservation.
   - **Scene 05 — The ShazBeauty Chapter**: Luxury magazine spotlight celebrating her courage, consistency, and vision as founder of ShazBeauty, with a dedicated photo frame.
   - **Scene 06 — The Funny Little Things**: Affectionate banter cards (*Nepo Baby Privilege 😂*, *Daniel's Big Head 😭*, *The Car Era 🚗*, *Operation Party Jollof 😹*) plus the interactive *"Abeg, Leave Me Alone! 😂"* button with click counter and funny popups.
   - **Scene 07 — A Thousand Good Wishes**: 5 heavenly blessing cards (Prosperity, Wisdom, Love, Long Life, A Beautiful Future) that gracefully reveal their prayers on click.
   - **Scene 08 — The Secret Vault**: A mechanical vault dial and password clue (*"What do two stubborn boys call the woman who's always looking out for them?"*). Password: `SUPER MOM` (case-insensitive, spaces ignored). Includes playful error feedback, hint unlocks, and opening sound/confetti.
   - **Dedicated Pics & Videos Section**: Inside the vault is Sharon's Private Media Archive featuring photos, a video player, interactive fullscreen lightbox, and live file upload buttons to drop her actual pictures and video clips.
   - **Scene 09 — The Grand Finale**: Full cinematic celebration with golden radiance, confetti showers, heartfelt closing dedication from Idris & Daniel, and replay buttons.

3. **Built-in Web Audio API Synthesizer**
   - Includes an optional soothing ambient music generator playing gentle melodic chords, plus tactile sound effects for envelope unsealing, card reveals, vault dial clicks, and celebration fanfare—zero external audio dependencies needed!

4. **Progress Preservation & Navigation**
   - Chapter dropdown in the top bar allows jumping back to any previously unlocked scene.
   - Automatically saves progress to `localStorage` so refreshing never loses unlocked milestones.

---

## 🚀 How to Open and Run

Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Safari, Firefox), or use a lightweight local server:

```powershell
# In PowerShell:
Start-Process index.html
```

Or run with Python / Node if preferred:
```powershell
# Python:
python -m http.server 8080

# Or npx serve:
npx serve .
```

---

## 📸 Adding Your Own Photos & Videos

1. **Directly on the website**: Open Scene 05 or the Vault (Scene 08) and click **"Add Photos"** or **"Add Video"** / **"Upload Sharon's Photo"**. You can preview real photos and videos immediately.
2. **In Code**: Place your image or video files in this folder and update the `src` attributes in `index.html` or `script.js`.
