# Contributing to x-cli

We welcome contributions to `x-cli`! This document outlines the guidelines and processes for contributing to this project. By participating, you agree to abide by our [Code of Conduct](RULES_OF_CONDUCT.md).

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning Your Fork](#cloning-your-fork)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Testing](#testing)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request (PR)](#creating-a-pull-request-pr)
- [Code Style and Linting](#code-style-and-linting)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code of Conduct](#code-of-conduct)

## How to Contribute

We appreciate all contributions, including bug fixes, documentation improvements, and new features. Here are the general steps:

1.  **Fork** the repository.
2.  **Clone** your forked repository.
3.  **Create a new branch** for your changes.
4.  **Make your changes**, ensuring they follow the project's code style.
5.  **Test your changes** thoroughly.
6.  **Commit your changes** with clear and descriptive messages.
7.  **Push your changes** to your fork.
8.  **Create a Pull Request (PR)** to the main repository.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ioncakephper/cli-metadata-extractor.git
    cd cli-metadata-extractor
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Development Workflow

### Forking the Repository

Go to the `x-cli` GitHub repository and click the "Fork" button in the top right corner.

### Cloning Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/cli-metadata-extractor.git
cd cli-metadata-extractor
```
Replace `YOUR_USERNAME` with your GitHub username.

### Creating a Branch

Always create a new branch for your work. Use a descriptive name that indicates the purpose of your changes (e.g., `feature/add-new-parser`, `bugfix/fix-async-issue`, `docs/update-readme`).

```bash
git checkout -b feature/your-feature-name
```

### Making Changes

Implement your changes in your new branch. Remember to follow the existing code style and conventions.

### Testing

Before submitting a Pull Request, ensure all tests pass and add new tests for your changes.

To run tests:
```bash
npm test
# or
yarn test
```

### Committing Changes

Commit your changes with clear and concise commit messages. A good commit message explains *what* was changed and *why*.

```bash
git add .
git commit -m "feat: Add new CLI metadata parsing logic"
```
We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Pushing Changes

Push your changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

### Creating a Pull Request (PR)

1.  Go to your forked repository on GitHub.
2.  You should see a "Compare & pull request" button. Click it.
3.  Fill out the pull request template with a clear title and description of your changes.
4.  Submit your pull request.

Our team will review your PR, provide feedback, and merge it once it's approved.

## Code Style and Linting

We use ESLint and Prettier for code style and formatting. Please ensure your code adheres to these standards. You can run the linting and formatting commands locally:

```bash
npm run lint
npm run format
```

## Reporting Bugs

If you find a bug, please open an issue on our [GitHub Issues page](https://github.com/ioncakephper/cli-metadata-extractor/issues). When reporting a bug, please include:

-   A clear and concise description of the bug.
-   Steps to reproduce the behavior.
-   Expected behavior.
-   Actual behavior.
-   Screenshots or error messages, if applicable.
-   Your environment details (Node.js version, OS, etc.).

## Suggesting Enhancements

If you have an idea for a new feature or an enhancement, please open an issue on our [GitHub Issues page](https://github.com/ioncakephper/cli-metadata-extractor/issues). Describe your suggestion clearly and explain why you think it would be beneficial to the project.

## Code of Conduct

Please note that all contributors are expected to adhere to our [Code of Conduct](RULES_OF_CONDUCT.md). Please read it to understand the expected behavior in our community.