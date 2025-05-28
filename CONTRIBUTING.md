# Contributing to fleetcode

Thank you for your interest in contributing to **fleetcode**! We welcome contributions of all kinds, from bug reports and feature requests to code improvements and documentation updates.

---

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Style Guides](#style-guides)
- [Community & Support](#community--support)

---

## How to Contribute

1. **Fork the repository** and clone your fork locally.
2. **Create a new branch** for your work (`git checkout -b feature/my-feature`).
3. Make your changes, **add tests and documentation** if needed.
4. **Commit** your changes with clear messages.
5. **Push** your branch to your fork.
6. **Open a Pull Request** describing your changes and referencing any relevant issues.

---

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

---

## Development Setup

### Prerequisites

- **Node.js** (v18+)
- **npm**
- **Python** (3.8+)
- **pip**

### Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
pip install -r requirements.txt
```

### Running Locally

- **Frontend:** `npm run dev` (from `client/`)
- **Backend:** `uvicorn main:app --reload` (from `server/`)

---

## Making Changes

- Keep your changes focused and atomic.
- Update or add tests as needed.
- Document new features or changes in the relevant files.
- If your change affects the API, update or add OpenAPI docs/comment blocks.

---

## Pull Request Guidelines

- Fill out the pull request template.
- Reference related issues (`Closes #number`).
- Pass all CI checks.
- Assign appropriate reviewers if possible.
- Be prepared to discuss or revise your code based on feedback.

---

## Reporting Issues

- Search existing issues before opening a new one.
- Provide clear, descriptive titles and detailed information.
- Include steps to reproduce, expected behavior, and screenshots/logs if applicable.

---

## Feature Requests

- Open a new issue with the label `enhancement`.
- Provide a detailed description of the feature and its use case.

---

## Style Guides

### Frontend (React/JS/JSX)
- Use [ESLint](https://eslint.org/) to check code style.
- Prefer functional components and hooks.
- Use descriptive names for components and files.
- Keep components small and focused.

### Backend (Python)
- Follow [PEP8](https://pep8.org/) and use [Black](https://black.readthedocs.io/) for code formatting.
- Write docstrings for all public functions and classes.
- Use type hints where applicable.

---

## Community & Support

- For general questions, open a discussion or join our community channels if available.
- For urgent issues, mention a maintainer in your issue or PR.

---

Thank you for helping make **fleetcode** better!
