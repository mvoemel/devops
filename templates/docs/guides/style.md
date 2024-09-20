# Code Style Guide

This guide outlines the coding conventions and best practices used in this project. Consistency in code style helps make the codebase easier to read, understand, and maintain.

## Table of Contents

- [General Guidelines](#general-guidelines)
- [Naming Conventions](#naming-conventions)
- [Code Formatting](#code-formatting)
- [Comments](#comments)
- [File Structure](#file-structure)
- [Testing Guidelines](#testing-guidelines)

## General Guidelines

- Prioritize **readability** over cleverness.
- Follow the **[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)** principle (Don't Repeat Yourself).
- Stick to the **Single Responsibility Principle**: every function, class, or module should do one thing well.

## Naming Conventions

- Use `camelCase` for function and variable names:

  ```js
  let userName = "John";
  function getUserProfile() {}
  ```

- Use `PascalCase` for class and constructor names:

  ```js
  class UserProfile {}
  ```

- Constants should be in `UPPER_SNAKE_CASE`:

  ```js
  const MAX_RETRIES = 5;
  ```

- Filenames should be lowercase and use hyphens:
  ```
  user-profile.js
  ```

## Code Formatting

- Indentation should use **spaces**, not tabs, with an indentation level of **2 spaces**.
- Lines should wrap at **80 characters**.
- Always use **semicolons** in JavaScript code.
- Curly braces `{}` should be used even for single-line blocks:
  ```js
  if (isValid) {
    return true;
  }
  ```

### Example for different languages:

#### JavaScript

- Use arrow functions where appropriate:
  ```js
  const add = (a, b) => a + b;
  ```

#### Python

- Use 4 spaces for indentation:
  ```python
  def get_user_profile():
      return {}
  ```

#### Markdown

- Use proper headers for Markdown files:
  ```markdown
  # Title (h1)

  ## Subtitle (h2)

  ### Section (h3)
  ```

## Comments

- Write meaningful comments that explain **why** a piece of code exists, not **what** it does.
- For complex logic, explain the intent:

  ```js
  // This function handles the edge cases for user input validation
  ```

- Use `TODO:` and `FIXME:` annotations for future improvements:
  ```js
  // TODO: Refactor this function for better readability
  ```

## File Structure

Keep files organized by functionality. For example:

`/src /components /services /utils /tests /docs`

## Testing Guidelines

- All code should be accompanied by **unit tests**.
- Test names should clearly describe the tested behavior:

  ```js
  it("should return user profile when user is logged in", () => {
    // test code here
  });
  ```

- Use **descriptive assertions**:
  ```js
  expect(result).toEqual(expectedValue);
  ```

---

By following this style guide, we aim to maintain a high standard of code quality that is both consistent and easy to work with. If you're unsure about any guideline, feel free to ask!
