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

```javascript
{
  // The name of the project or module as it is in the parent project
  'root_name': 'my-sub-project',

  // Root is where your project is located. Change this if you're managing
  // a nested folder within another project.
  'root_path': '.',

  // Where the other independent project is located on your machine. Should 
  // be the top level of the project, but you can specify a sub-directory if
  // you know your project won't be moved to another folder.
  'parent_path': '/path',

  // This project defaults to managing the projects with Git. If you're not
  // using Git and would simply prefer to manage the projects without version
  // control then disable this flag.
  'git_operations': true,

  // Could add feature for managing default branches to ensure proper data
  'default_branch': false,
  
  // Before syncing or pushing to the partner project
  'perform_check': false,
}
```