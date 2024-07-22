# Code of Conduct

## Commit agreement

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

### Examples

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

## Branches agreement

If a member wants to work on a feature, bug fix, etc., they must perform the following steps:

1. **Create and/or assign an issue**: Create and/or assign an issue to yourself and put it in the _In progress_ lane one
   the board.
1. **Create new branch**: Create new branch on the issue page from branch `dev` (e.g. `32-your-issue-title`).
1. **Changes committed**: Commit changes to the `32-your-issue-title` branch with the above-mentioned commit agreement.
1. **Create pull request**: When the change is completed, create a pull request.
1. **Review Pull Request**: Pull Request must be reviewed by at least two other members.
1. **Merge Pull Request**: After the pull request has been reviewed and approved, it can be merged into the `dev`
   branch.

In case of a release, the `dev` branch is merged into `main`.

## Issue types

- feature
- bug
- refactor
- task
- documentation
- test

## Board agreement

Following lanes are used in the Kanban board:

- **Backlog**: This lane represents tasks or issues that have been identified for future implementation but have not yet
  been scheduled for execution. It serves as a repository for ideas and requirements awaiting prioritization.
- **Ready**: Issues in this lane are prepared and prioritized for implementation. They have been analyzed, scoped, and
  are ready to be picked up by team members for execution.
- **In progress**: Tasks in this lane are currently being worked on by team members. Work-in-progress (WIP) limits are
  often applied to this lane to ensure that the team doesn't take on too much work simultaneously, thereby optimizing
  flow and productivity.
- **Postponed**: Issues in this lane were previously deemed important but have been deferred for various reasons, such
  as dependency issues, resource constraints, or changing priorities. They remain visible on the board for future
  consideration.
- **In Review**: Tasks that have been completed but require validation, testing, or feedback before being considered
  fully done are placed in this lane. They await approvals from other team members.
- **Done**: This lane signifies tasks that have been successfully completed and delivered. After a period of time the
  issues can be archived.

## Logger agreement

The following table shows the logging levels and the value corresponding to it:

| Level                   | Value             | Used for                          |
| ----------------------- | ----------------- | --------------------------------- |
| FINEST                  | 300               | Specialized Developer Information |
| FINER                   | 400               | Detailed Developer Information    |
| FINE                    | 500               | General Developer Information     |
| CONFIG                  | 700               | Configuration Information         |
| INFO                    | 800               | General Information               |
| WARNING                 | 900               | Potential Problem                 |
| SEVERE                  | 1000              | Represents serious failure        |
| OFF (Special Log Level) | Integer.MAX_VALUE | Turns off the logging             |
| ALL (Special Log Level) | Integer.MIN_VALUE | Captures everything               |

Examples:

```
Logger.getLogger(Database.class.getName()).log(Level.SEVERE, "Error connecting to database: " + e.getMessage());
```

```
// Defined at the top of the class
Logger logger = Logger.getLogger(ViewFactory.class.getName());

logger.log(Level.SEVERE, "Error creating new Scene: " + e.getMessage())
```
