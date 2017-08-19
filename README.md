# Seek and Sync
A tool for managing development between two independent projects. The tool is 
meant to be structure agnostic, where two development teams can manage their
own workflows.

The primary use case is when one project is a subset of a parent project where 
the development workflows or directory structures aren't convenient or possible
to merge.

# Not a Perfect World
Oftentimes when two different development teams ( often in external companies) 
do work and share modules or tooling, cases arise when the project structure,
tooling preference, or project structure changes. Usually these changes aren't
communicated. This tool exists to help developers manage project dependencies
when they can't necessary rely on communication from another team.

In a simplistic way, this tool manages the git flow, and copy of work between the
two projects.

# Usage
Install the package,

```
npm install seek-and-sync
```

Inside of your project, you will create a file that you will use to manage configuration
and how you would like to sync information between the other independent repositories.

Inside the root of the project create an `.snsrc` file. The file has the following structure,

```javascript
{
  // The name of the project or module as it is in the parent project
  "name": "my-project",

  // Relative path to where your project is located. Change this if you're managing
  // a nested folder within your own project.
  "path": ".",

  // Absolute path to the parent project on your machine. Should 
  // be the top level of the project, but you can specify a sub-directory if
  // you know your module won't be moved to place within the parent project.
  "parent_path": "/path",

  // Usually you'll be managing the status of the project where this plugin is installed,
  // so the default branch is whatever you're on.
  "parent_branch": false,

  // Provides an option for a revert call for non git directories. It only stores
  // the most recent sync operation. Disabled when git is available.
  "backup": false,

  // This project defaults to managing the projects with Git. If you're not
  // using Git and would simply prefer to manage the projects without version
  // control then set this flag to false.
  "git": true,

}
```

# Adding Tests
The testing mantra goes,
* Assert the return value of incoming queries
* Assert the direct public side effects of incoming commands
* Expect outgoing commands to be sent using mocks

# Project Implementation
