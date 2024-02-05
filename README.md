# Header Files Refactor

Header Files Refactor, an extension to seamlessly handle include directive refactoring in response to changes in header file directories. This extension is meticulously designed to enhance your development workflow by automatically updating include directives in two key scenarios:

1. **File Movement**: Effortlessly updates all relevant include directives when a file is relocated to a new directory.
2. **File Renaming**: Ensures that include directives accurately reflect the new name of a file.

## Key Features

- **Automated Refactoring**: Enjoy the convenience of automated include directive updates, eliminating the manual effort required during file movements or renamings.
- **Configurable Settings**: Tailor the extension to your project's needs with configurable settings, allowing you to exclude specific directories from refactoring and refine include paths for cleaner organization.

## Configurable Extension Settings

### Exclude Directories (`HeaderFilesRefactor.excludeDirs`)

Specify directories that the extension should bypass during the refactoring process. This is particularly handy for excluding external libraries or generated code directories that do not necessitate or should not undergo refactoring.

### Remove Directories from Path (`HeaderFilesRefactor.removeFolderFromPath`)

Define directories that should be omitted from the beginning of a path in include directives. This feature supports cleaner and more concise include paths, particularly beneficial for projects utilizing common base directories for header files.

Through its intuitive features and customizable settings, the Header Files Refactor extension aims to streamline the management of include directives in C/C++ projects. Elevate your development environment with automated and organized header file refactoring.
