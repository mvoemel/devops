# Statistics about a Git Repository

## Amount of files in a repository

This command prints the amount of files inside a repository:

```bash
git ls-files | wc -l
```

## Amount of lines in a repository

This command prints the amount of lines in a repository:

```bash
git ls-files | xargs wc -l
```
