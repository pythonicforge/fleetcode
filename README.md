# fleetcode

A full-stack application blending a React frontend and Python FastAPI backend for collaborative coding, competitive programming, or coding interview-style practice.

Built during a hackathon, **fleetcode** aims to bring the thrill of real-time 1v1 competitive coding to life — think *LeetCode meets Chess.com*. Whether you're grinding interview prep, battling friends, or building your rating, fleetcode makes it fast, real-time, and fun.  

> No lobbies. No delays. Just code, compete, and climb.

This repository is organized into two main parts:

- **client/** – Frontend (React)
- **server/** – Backend (FastAPI/Python)

<br/>

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
- [Tech Stack](#tech-stack)
- [Directory Overview](#directory-overview)
- [Contributing](#contributing)
- [License](#license)

<br/>

## Project Structure

```
.
├── client/      # React frontend
│   ├── public/  # Static assets
│   ├── src/     # Source code (components, routes, etc.)
│   └── ...      # Configs, package.json, etc.
├── server/      # FastAPI backend
│   ├── routers/ # API endpoints (user, match, judge, etc.)
│   ├── schemas/ # Pydantic models
│   ├── services/# Business logic (judging, matchmaking, rating)
│   ├── utils/   # Utility modules
│   └── ...      # main.py, requirements.txt, etc.
├── README.md
```

<br/>

## Features

- **Real-time Coding**: Collaborative and competitive coding sessions.
- **Matchmaking**: Match users for coding duels or practice.
- **Code Judging**: Submit solutions and get automatic feedback.
- **User System**: User authentication and management.
- **Live Updates**: Sockets for real-time updates.
- **Leaderboard/Rating**: Track your progress and compete.

<br/>

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.8+
- [pip](https://pip.pypa.io/)
- [Vite](https://vitejs.dev/) (for frontend, installed via npm)
- (Optional) Docker

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pythonicforge/fleetcode.git
   cd fleetcode
   ```

2. **Install Client Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies:**
   ```bash
   cd ../server
   pip install -r requirements.txt
   ```
<br/>

## Development

### Running the Client

From the `client/` directory:
```bash
npm run dev
```
- Configured with Vite (`vite.config.js`)
- Main entry: `src/main.jsx`
- Protected routes, authentication, and main logic in `src/`

### Running the Server

From the `server/` directory:
```bash
uvicorn main:app --reload
```
- Main entry: `main.py`
- Routers define API endpoints (e.g., `routers/match.py`, `routers/submission.py`)
- Models in `schemas/`, business logic in `services/`, helpers in `utils/`

<br/>

## Tech Stack

- **Frontend**: React, Vite, JavaScript/JSX, CSS
- **Backend**: Python, FastAPI, Pydantic
- **Communication**: REST, WebSockets (for real-time features)
- **Other**: ESLint, Vercel config for deployment

<br/>

## Directory Overview

### Client

- `index.html`: Entry HTML.
- `src/`: App source code
  - `App.jsx`: Main React app component
  - `Protectedroute.jsx`: For protected routing
  - `components/`: UI components
- `public/`: Static assets (e.g., `vite.svg`)
- `package.json`, `package-lock.json`: NPM configs
- `eslint.config.js`: Linting
- `vite.config.js`: Vite setup
- `vercel.json`: Deployment config

See [client/](https://github.com/pythonicforge/fleetcode/tree/master/client) for all files.

### Server

- `main.py`: FastAPI app startup
- `requirements.txt`: Python dependencies
- `routers/`: API endpoints
  - `match.py`, `match_socket.py`, `submission.py`, `user.py`, `judge.py`
- `schemas/`: Pydantic models (`user.py`, `match.py`, `submission.py`, etc.)
- `services/`: Core logic (`judge_client.py`, `matchmaking.py`, `rating.py`, `supabase_client.py`)
- `utils/`: Helpers (`connection_manager.py`)

See [server/](https://github.com/pythonicforge/fleetcode/tree/master/server) for all files.

<br/>

## Contributing

Contributions are welcome! Please open issues or pull requests via GitHub.
- Follow standard code style (ESLint/Prettier for JS, Black for Python).
- Add documentation/comments to your code.
- Run tests and make sure code builds before submitting.

<br/>

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
