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

To check the status of the repository

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
```

### git commit

To commit changes to local repository

```bash
git commit -m "GIT commands" --author="Krishna Mohan Athota <krishnamohan.athota@gmail.com>"

[main eb3c81d] GIT commands
 Author: Krishna Mohan Athota <krishnamohan.athota@gmail.com>
 4 files changed, 77 insertions(+)
 create mode 100644 git/README.md
 create mode 100644 git/images/git-folder.png
 create mode 100644 git/images/git-status.png
```

### git push

To push changes to remote repository

```bash
git push origin main

Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 10 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 457.73 KiB | 38.14 MiB/s, done.
Total 8 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/krishnamohanathota/DEVOPS.git
   fab0045..eb3c81d  main -> main
```
