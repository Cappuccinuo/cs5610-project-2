# cs5610-project-2

## Setting up git

**Make sure you run this:**

```
git config --global push.default upstream
```

That makes it so that running `git push --force` doesn't overwrite the master branch.

## Quick Start

We keep a totally linear commit history - no merges, no diamond shapes in our commit history. We only do fast-forward merges on `master`.

### Start your work:
```bash
git pull
git checkout -b new-branch
# Do your work...
```

### When work finished:
```bash
git status
# check modified files
git add modified-files
git commit -m "commit notes"
```

### Before your code review:
```bash
$ git checkout 
$ git pull --rebase origin master
$ git checkout new-branch
$ git rebase master
# .. Resolve any conflicts followed with `git rebase --continue`
```

### After your code review:
```bash
$ git checkout master
$ git merge --ff-only new-branch
# Everything up to here has been local
# This is what lets others see your changes
$ git push origin master
```

## Test in development mode:
Under ccmonitor directory, run
```bash
mix phx.server
```
to start Phoenix server first.

Then under node_client directory, run
```bash
node js/app.js 
```
to start node client.

