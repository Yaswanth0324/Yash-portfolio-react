# CORS Testing Guide

To verify that the Spring Boot backend correctly handles CORS requests from the Vercel frontend, run the following commands:

### 1. Test CORS Preflight (OPTIONS request)
```bash
curl -v -X OPTIONS \
  -H "Origin: https://yash-portfolio-react-kappa.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  "https://portfolio-backend-wuqi.onrender.com/api/contact"
```
**Expected Output:** 
You should see an `HTTP/1.1 200 OK` response with the following headers:
- `Access-Control-Allow-Origin: https://yash-portfolio-react-kappa.vercel.app`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: content-type`
- `Vary: Origin`

### 2. Test Actual Request (POST request)
```bash
curl -v -X POST \
  -H "Origin: https://yash-portfolio-react-kappa.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}' \
  "https://portfolio-backend-wuqi.onrender.com/api/contact"
```
**Expected Output:** 
You should see an `HTTP/1.1 200 OK` response with the actual response data and the `Access-Control-Allow-Origin: https://yash-portfolio-react-kappa.vercel.app` header intact.
