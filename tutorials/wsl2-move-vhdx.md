---
title: Move WSL2 vhdx
---

## The problem

- Your primary drive has low space
- WSL2 is consuming a lot of space

## Causes

- The vhdx is a no-shrinking file

## Solution

- Move the vhdx to another drive

## How

Execute this code i got from [here](https://github.com/microsoft/WSL/issues/4699#issuecomment-660104214)

```cmd
wsl --shutdown
wsl -l -v
wsl --export <DistroName> <PathToTarArchive>
wsl --unregister <DistroName>
wsl --import <DistroName> <PathToDistroNewDirectory> <PathToTarArchive>
wsl -l -v
```

## Example

![example](/images/wsl2-move-vhdx/2021-06-03-19-32-22.png)

Note you have to put the .tar, otherwise the access is denied at the beginning happens.

## Additionally clean docker vhdx space

- This space doesn't show in docker except in the troubleshoot page.
- Press Clean/Purge data

![purge docker](https://user-images.githubusercontent.com/505065/80283019-066b9c00-8715-11ea-9b5f-083beecd0829.png)
