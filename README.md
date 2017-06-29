# Seek and Sync
A tool for managing development between two independent projects. The tool is meant to be structure agnostic, 
where two development teams can manage their own workflows. The primary use case is when one project is a subset, and
the development workflow of the project is separate than that of the parent project.

# Not a Perfect World
Oftentimes when two different development teams ( often in external companies) do work and share modules or tooling,
cases arise when the project structure, tooling preference, or project structure changes. Usually these changes aren't
communicated. This tool exists to help quickly change the structure of how to projects are related and communicate.

In a simplistic way, this tool manages the git flow, and copy of work between the two projects.

# Usage
Install the package,

```
npm install seek-n-sync
```

Inside of your project, you will create a file that you will use to manage configuration and how you would like
to sync information between the other independent repositories.

Inside the root of the project create an `.snsrc` file. The file has the following structure,

```json
{
  // Root is where your project is located. Userul
  'root': '.',
  'partner': '/PARTNER_PROJECT_LOCATION',
  '
}
```