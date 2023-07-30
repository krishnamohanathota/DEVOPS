## How to maintain multiple git accounts on a single machine

### Problem Statement

I have two git accounts, one is my personal account and another is my office account. I want to maintain both accounts on a single machine. I want to use my personal account for my personal projects and my office account for my office projects. I want to use my personal account by default for all my personal projects and my office account by default for all my office projects.

### Solution 1 :

#### Step 1: Generate SSH keys for both accounts

```bash
ssh-keygen -t rsa -C "
```

#### Step 2: Add the SSH keys to the respective accounts

#### Step 3: Create a config file in ~/.ssh directory

```bash
vi ~/.ssh/config
```

#### Step 4: Add the following content to the config file

```bash
# Personal account
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal

# Office account
Host github.com-office
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_office
```

### Solution 2 :

The idea is to segregate the repos on your machine into multiple directories by separating the profiles you want, and then define a .gitconfig file per profile.

#### Step 1: Create a directory for each profile

```bash
mkdir -p ~/git/personal
mkdir -p ~/git/office
```

#### Step 2: Create a .gitconfig file for each profile

```bash
touch ~/.gitconfig_personal
touch ~/.gitconfig_office
```

#### Step 3: Add the following content to the `~/.gitconfig_personal` file

```bash
[user]
    name = <your name>
    email = <your email>
```

#### Step 4: Add the following content to the `~/.gitconfig_office` file

```bash
[user]
    name = <your name>
    email = <your email>
```

#### Step 5: Create a global `~/.gitconfig` file & add the following content to it

```bash
touch ~/.gitconfig
```

```bash
[includeIf "gitdir:~/git/personal/"]
    path = ~/.gitconfig_personal

[includeIf "gitdir:~/git/office/"]
    path = ~/.gitconfig_office
```

#### Step 7: Clone your personal repos into the personal directory

```bash
cd ~/git/personal
git clone
```

#### Step 8: Clone your office repos into the office directory

```bash
cd ~/git/office
git clone
```

#### Step 9: Test the setup

```bash
cd ~/git/personal
git config user.name
git config user.email

cd ~/git/office
git config user.name
git config user.email
```

### List all variables set in config file, along with their values.

```bash
git config -l
```

### view all of your Git config settings

```bash
git config --list --show-origin
```
