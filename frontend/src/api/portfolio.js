import axios from 'axios'

// In production (Vercel), VITE_API_BASE_URL points to the Render backend.
// In local dev, falls back to '/api' which Vite proxies to localhost:8080.
const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const BASE = `${baseUrl}/api`

export const incrementVisitor = () => axios.post(`${BASE}/visit`).then(r => r.data).catch(err => {
    console.error("Failed to increment visitor count:", err);
    return null;
});
export const getVisitorCount = () => axios.get(`${BASE}/visit/count`).then(r => r.data).catch(err => {
    console.error("Failed to get visitor count:", err);
    return 0;
});
export const incrementResumeDownload = () => axios.post(`${BASE}/resume/download`).then(r => r.data).catch(err => {
    console.error("Failed to increment resume download:", err);
    return null;
});
export const getResumeDownloadCount = () => axios.get(`${BASE}/resume/download/count`).then(r => r.data).catch(err => {
    console.error("Failed to get resume download count:", err);
    return 0;
});
export const submitContact = (data) => axios.post(`${BASE}/contact`, data).then(r => r.data).catch(err => {
    console.error("Failed to submit contact form:", err);
    throw err;
});
