# Interview Simulator

Answer spoken interview questions with timed recordings, as in the new Take an Interview task.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Interview Simulator.exe` from the [latest release](https://github.com/Apurba94/toefl-interview/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-interview/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

The updated TOEFL Speaking section includes Take an Interview: you answer a series of spoken questions on one topic. This simulator has eight original question sets. It reads each question aloud, records your answer for a set time, and keeps the recordings so you can listen back.

Sections: Interview, Progress, About.

## How to use it

1. Choose a topic and an answer time in **Interview**. 45 seconds is a sensible practice default; check ets.org for the current test timing.
2. Listen to each question, then answer in full sentences: a direct answer, a reason, an example.
3. Listen to your recordings at the end. Did you answer the question that was asked?

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
