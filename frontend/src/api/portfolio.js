import axios from 'axios'

// In production (Vercel), VITE_API_BASE_URL points to the Render backend.
// In local dev, falls back to '/api' which Vite proxies to localhost:8080.
const BASE = (import.meta.env.VITE_API_BASE_URL || '') + '/api'

export const incrementVisitor = () => axios.post(`${BASE}/visit`).catch(() => {})
export const getVisitorCount = () => axios.get(`${BASE}/visit/count`).then(r => r.data)
export const incrementResumeDownload = () => axios.post(`${BASE}/resume/download`).catch(() => {})
export const getResumeDownloadCount = () => axios.get(`${BASE}/resume/download/count`).then(r => r.data)
export const submitContact = (data) => axios.post(`${BASE}/contact`, data)
