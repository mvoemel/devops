# Contributing Guidelines

We appreciate your interest in contributing to this project! Whether you're fixing a bug, suggesting a feature, or improving documentation, your contributions are invaluable. Please read through these guidelines before you start to ensure a smooth and productive process for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Reporting Issues](#reporting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to making this project a harassment-free experience for everyone, and we expect all contributors to uphold these standards.

## Getting Started

### Fork and Clone the Repository

Start by [forking the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) to your own GitHub account. Once the repository is forked, clone your copy locally:

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

Create a new branch for your changes:

```bash
git checkout -b feature/new-feature
```

### Set Up Dependencies

Make sure to install all required dependencies as outlined in the project’s documentation or `README.md` file. This ensures that the development environment is properly configured for you to make contributions.

## Reporting Issues

We welcome detailed and clear issue reports. Before creating a new issue, please make sure you:

- **Check for existing issues**: Your issue might have already been reported. If so, comment on the existing issue if you have additional information.
- **Provide details**: When reporting an issue, provide as much detail as possible, including the version of the project you're using, steps to reproduce the problem, and any relevant logs or screenshots.
  If the issue is security-related, do not open a public issue. Instead, report it privately following the instructions in the [SECURITY.md](./SECURITY.md) file.

### Issue Types

- feature
- bug
- refactor
- task
- documentation
- test

## Submitting Pull Requests

We love pull requests! Here’s a quick guide to help you get started:

- **Work in small units**: It's better to create focused pull requests that solve one issue or introduce one feature rather than a large PR with multiple changes. This makes it easier to review.
- **Open an issue first**: For major changes, please open an issue to discuss the change before starting work. This ensures that your idea aligns with the project's goals.
- **Keep it clean**: Follow the project's coding style and guidelines. Avoid unnecessary refactoring unless it's part of the change.
- **Write tests**: If you’re adding new functionality, please write tests to cover your changes.
- **Update documentation**: If your change affects the project's functionality, ensure that the documentation reflects these changes.

When you're ready, push your changes to your fork:

```bash
git push origin feature/new-feature
```

Then submit a pull request from your fork to the main repository.

## Coding Standards

To maintain consistency and readability, we ask that you follow these coding standards:

- Follow the [style guide](./docs/guides/style.md) (if applicable).
- Use consistent indentation and avoid mixing spaces and tabs.
- Write meaningful variable and function names.
- Add comments where necessary, especially for complex code.
- Adhere to any project-specific style guides or linting rules.

## Commit Messages

Clear and concise commit messages make it easier to understand changes in the project history. Use the following guidelines:

1. Use the imperative mood for your commit message (e.g., "Add feature" instead of "Added feature").
2. Limit the subject line to 50 characters.
3. Provide additional details in the body of the commit message if needed. Wrap the body text at 72 characters.

Here’s an example format:

```
[TAG] Short summary of changes

Detailed explanation of the changes, reasons for them, and any
relevant information. Wrap lines at 72 characters if necessary.

Resolves: #123
```

### Commit Tags

| Keyword  | Explanation                              |
| -------- | ---------------------------------------- |
| BREAK    | breaking change                          |
| FEAT     | new feature or change to a feature       |
| FIX      | fix a bug                                |
| FORMAT   | code formatting, code comments           |
| DOCS     | changes to the documentation             |
| TEST     | add test cases or change tests           |
| MAINT    | maintenance files such as workflow files |
| REFACTOR | code refactor                            |

Examples:

```
FEAT(logger): support .txt Files
```

```
FIX: avoid deadlocks when using multiple players
```

```
TEST(driving): increased test coverage of driving function
```

```
REFACTOR(users): removed old Car.java implementation

Because of this and that, the Car Model was redesigned according to that.

Implements #69
```

```
MAINT: added en_UK.json
```
