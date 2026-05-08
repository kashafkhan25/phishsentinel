# Phalanx AI: Real-Time Phishing Detection & Threat Intelligence Platform
## Project Blueprint (Updated Implementation Version)

---

# 🧠 Project Overview

Phalanx AI is a real-time phishing URL detection and threat intelligence platform that analyzes URLs using a hybrid system:

- Lightweight frontend dashboard (multi-page HTML system)
- Node.js backend API layer
- High-performance C++ detection engine
- Optional threat intelligence APIs (VirusTotal / Safe Browsing)

The system evaluates URLs in real time and classifies them as:
- SAFE
- SUSPICIOUS
- DANGEROUS

with explainable security reasoning.

---

# 🏗️ System Architecture

## Core Flow

User Input (Frontend)
↓
Node.js Express API (/api/scan)
↓
C++ Detection Engine Execution
↓
Threat Intelligence APIs (optional enrichment)
↓
JSON Response
↓
Frontend Dashboard Update (Real-time UI)

---

# 🌐 Technology Stack

## Frontend
- Multi-page HTML (Stitch-generated UI)
- TailwindCSS (design system)
- Vanilla JavaScript (DOM + API handling)
- Fetch API (backend communication)
- CSS animations for cyber UI effects

## Backend
- Node.js + Express.js
- REST API architecture
- SSE (Server-Sent Events) for real-time logs
- child_process module for executing C++ engine

## Core Detection Engine
- C++ (standalone executable)
- High-performance heuristic analysis engine

## Optional Intelligence APIs
- VirusTotal API
- Google Safe Browsing API

---

# 🧠 C++ Detection Engine

## Purpose
Perform fast, deterministic phishing analysis using heuristics and statistical methods.

---

## Modules

### 1. URL Parser
- Extract protocol (http/https)
- Extract domain, subdomain
- Detect IP-based URLs

---

### 2. Feature Extraction
Detect suspicious indicators:

- Presence of keywords:
  login, verify, bank, password, secure, update
- URL length anomalies
- Number of subdomains
- Special characters (@, %, hex encoding)

---

### 3. Entropy Analysis
- Shannon Entropy calculation on domain
- Detect randomly generated phishing domains

---

### 4. Heuristic Scoring Engine

Weighted scoring model:

Example weights:
- HTTP instead of HTTPS → +15
- Suspicious keyword → +20
- High entropy → +25
- IP-based URL → +30
- Excessive subdomains → +15

Final output:
- Risk score (0–100)
- Classification label
- Reason list

---

### 5. Output Format

C++ engine returns JSON:

```json
{
  "score": 87,
  "status": "DANGEROUS",
  "reasons": [
    "High entropy detected",
    "Suspicious keyword: login",
    "Non-HTTPS connection"
  ]
}