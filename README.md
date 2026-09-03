# पाठशाला (Paathshala)

&gt; **One school. Every exam. Your language.**

A free-to-start, multilingual learning platform for competitive exam preparation. Built for students across India — whether you're preparing for SSC CGL in Bhopal, NEET in Chennai, or UPSC in Patna — Paathshala brings your exam, your syllabus, and your language into one place.

---

## What it does

- **Exam Dashboards** — Syllabus trackers, previous-year questions, notes libraries, and mock tests with instant score breakdowns
- **Daily Practice** — Adaptive daily quizzes and spaced-repetition flashcards that learn from your performance
- **Deadline Tracker** — Never miss an application window, admit card release, or exam date
- **AI Mentor** *(coming soon)* — Step-by-step doubt solving and personalised revision plans
- **Peer Community** — Forum discussions, resource sharing, and verified mentor badges
- **Multilingual by Default** — Hindi and English at launch; Tamil, Telugu, Kannada, and Malayalam to follow

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js (Phone OTP + Google) |
| Database | PostgreSQL + Prisma ORM |
| Caching | Redis (Upstash) |
| Search | Meilisearch / Typesense |
| AI | Anthropic Claude API |
| i18n | next-intl |
| Testing | Vitest + Playwright |
| CI/CD | GitHub Actions → Vercel |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/paathshala.git
cd paathshala

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the dev server
npm run dev