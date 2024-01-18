# LinkMart

This Project was deployed to: [LinkMart](https://linkmart.yt20chill.me)


Two dev branches (You may create as many sub-branches as you want)

- frontend
- backend

#### Initial setup:

```bash
# if you don't already have a local branch
git checkout -b {branch_name}
# set remote upstream to push/pull from branch
# right now remote has 2 branches for dev: frontend/backend
git pull -u origin {branch_name}
```

#### Update main branch without leaving current branch:

```bash
git fetch origin main
git merge origin/main
# Handle any conflicts manually
git push origin {current_branch}:main
```

Commit very often, push often

Happy coding 🥰

References

1. [Java Ulid-creator](https://github.com/f4b6a3/ulid-creator)
2. [Zustand](https://github.com/pmndrs/zustand): Global State Management Library
3. [DaisyUI](https://daisyui.com/) Frontend tailwinds utility classes
4. [React-Query](https://tanstack.com/query/v4/docs/react/quick-start): Fetch handler
