// Entry point — orchestrates scrape → report → (optional) email
import { fetchJobs } from './scraper.js';
import { generateReport } from './reporter.js';
import { sendReport } from './mailer.js';

// Load .env only if the file exists (avoids crash when not needed)
import { existsSync } from 'fs';
if (existsSync('.env')) {
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  // Simple .env parser — avoids adding the dotenv dependency
  const lines = (await import('fs')).readFileSync('.env', 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && !key.startsWith('#')) process.env[key.trim()] = rest.join('=').trim();
  }
}

const sendEmail = process.argv.includes('--send-email');

try {
  const jobs = await fetchJobs();
  const html = generateReport(jobs);

  if (sendEmail) {
    await sendReport(html, jobs.length);
  } else {
    console.log('Tip: run "npm start" to also send the report by email.');
  }
} catch (err) {
  console.error(`\nError: ${err.message}\n`);
  process.exit(1);
}
