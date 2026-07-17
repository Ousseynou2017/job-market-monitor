# Job Market Monitor

Scrapes remote web developer job listings from RemoteOK (last 24h), generates a dark-themed HTML report, and emails it via Gmail — all with one command.

![report preview](https://placehold.co/900x500/0a0a0a/F97316?text=Report+Preview)

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Configure credentials**
```bash
cp .env.example .env
# Edit .env with your Gmail address, App Password, and recipient email
```
> Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords

**3. Run**
```bash
npm run report   # generate report.html (no email)
npm start        # generate report.html + send email
```

## Tech stack

Node.js 18+ (native `fetch`) · Nodemailer · Zero UI frameworks
