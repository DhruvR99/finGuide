# Investment Allocation Guide by Age

A static, mobile-friendly educational website for personal finance and investment learning.  
It explains age-based allocation thinking, compares multiple strategy models, provides an age-26 example recommendation, and includes a live 50-30-20 salary planner.

## Live Domain

- https://finguide.nxtfusion.com

## Features

- Hero section and beginner-friendly user guide
- Age-based investing explanation (including age 26 example)
- Five allocation strategy cards with Chart.js doughnut charts:
  - Conservative
  - Balanced
  - Aggressive Growth
  - Passive / Minimal Effort
  - Barbell Strategy
- Recommended strategy by age ranges + highlighted age-26 allocation chart
- Interactive salary and investment planner:
  - Live 50-30-20 calculation
  - Investment percentage of salary
  - Remaining disposable amount
  - Benchmark feedback against 20% savings target
- Educational notes and clear disclaimer

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Chart.js](https://www.chartjs.org/) via CDN

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

For a local server (recommended), use one of these:

```bash
# Python 3
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push these files.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or your default branch), folder `/ (root)`
4. Save changes and wait for deployment.
5. GitHub will provide a live URL, usually:
   - `https://<your-username>.github.io/<repo-name>/`

## Educational Disclaimer

This project is for educational guidance only and not financial advice.

Final on-page disclaimer:

`I am only an advisor. Please do detailed analysis before choosing any strategy.`
