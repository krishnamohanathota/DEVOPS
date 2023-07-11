## git commands

### Areas overview

Working Tree

- Current state of files on your filesystem
- Directory tree on your filesystem, that is associated with a git repository

Staging area (Index)

- Files that are staged and ready to be committed
- Area that you can use to prepare commits / temporarily save your work

![](images/git-status.png)
![](images/git-folder.png)

### git init

This command creates an empty Git repository - basically a .git directory with subdirectories for objects, refs/heads, refs/tags, and template files. An initial HEAD file that references the HEAD of the master branch is also created.

```bash
git init
```

### git status

```bash
git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	git/

no changes added to commit (use "git add" and/or "git commit -a")
```

```
git add README.md
git add git
```

````bash

```bash
git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   README.md
	new file:   git/README.md
	new file:   git/images/git-folder.png
	new file:   git/images/git-status.png
````
