import axios from 'axios'

const BASE = '/api'

export const incrementVisitor = () => axios.post(`${BASE}/visit`).catch(() => {})
export const getVisitorCount = () => axios.get(`${BASE}/visit/count`).then(r => r.data)
export const incrementResumeDownload = () => axios.post(`${BASE}/resume/download`).catch(() => {})
export const getResumeDownloadCount = () => axios.get(`${BASE}/resume/download/count`).then(r => r.data)
export const submitContact = (data) => axios.post(`${BASE}/contact`, data)
