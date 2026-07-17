// Fetches job listings from RemoteOK public API and filters by keyword + time window
// RemoteOK's feed refreshes slowly and few postings have dev/engineer titles at any
// given moment, so we default to a 7-day window (168h) to guarantee results in demos.
const API_URL = 'https://remoteok.com/api';
// Strict filter — only match against the job title (not tags, which are too broad/noisy)
const TITLE_KEYWORDS = ['developer', 'engineer', 'frontend', 'front-end', 'backend', 'back-end', 'full-stack', 'fullstack', 'web'];
const HOURS = Number(process.env.FILTER_HOURS ?? 168);

export async function fetchJobs() {
  console.log('Fetching jobs from RemoteOK...');

  const res = await fetch(API_URL, {
    headers: { 'User-Agent': 'job-market-monitor/1.0' },
  }).catch((err) => {
    throw new Error(`Network error — could not reach RemoteOK: ${err.message}`);
  });

  if (!res.ok) throw new Error(`RemoteOK returned HTTP ${res.status}`);

  const data = await res.json();
  // First element is a metadata notice, skip it
  const jobs = data.slice(1);

  const oneDayAgo = Math.floor(Date.now() / 1000) - HOURS * 3600;

  const filtered = jobs.filter((job) => {
    if (job.epoch < oneDayAgo) return false;

    // Match by job title only — tags are too broad (e.g. "web dev" appears on unrelated roles)
    const title = (job.position ?? '').toLowerCase();
    return TITLE_KEYWORDS.some((kw) => title.includes(kw));
  });

  // Normalise fields we care about
  return filtered.map((job) => ({
    title: job.position ?? 'Untitled',
    company: job.company ?? 'Unknown',
    tags: job.tags ?? [],
    url: job.url ?? `https://remoteok.com/remote-jobs/${job.id}`,
    salary:
      job.salary_min && job.salary_max
        ? `$${Number(job.salary_min).toLocaleString()} – $${Number(job.salary_max).toLocaleString()}`
        : job.salary_min
        ? `From $${Number(job.salary_min).toLocaleString()}`
        : null,
    date: new Date(job.epoch * 1000).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  }));
}
