### Overview
Recently, Ionic 2 has re-organized its project structure. All the source code are put into the *src/* folder. In this folder, there are ***app***, ***pages*** and ***providers*** sub-folders

<img src="photos/overview.png" alt="New project structure." width=15% height=15%/>

- ***app***: Listing of user-created and system-defined components. A component is similar to a class or package in other languages.
- ***pages***: Each page is equivalent to a screen you will see when using the app on mobile phone. User can navigate back and forth between pages.
- ***providers***: Event handlers, error handlers, database..., which handle underlying processes that user won't see on the phone.

This tutorial demonstrates with an one-page app (for simplicity) having a button for adding a name from an input field into the database (Sqlite storage) and another button for refreshing the view to reflect the new update.

<img src="photos/homepage.png" width=40% height=40%/>

### Starting with a blank Ionic 2 project

All the steps to initiate a new project in Ionic 2 with a blank template and add ios or android platform can be found everywhere.
```
ionic start SqliteStorage blank --v2
cd SqliteStorage
ionic platform add ios
```
To add Sqlite plugin into the project:
```
ionic plugin add cordova-sqlite-storage
```
We are planning to use SQLite as a *provider*. A provider is just a class, but not something users can see on the screen. A class handling what can be seen and iteracted is called a *page*. A class providing additional underlying support such as database storage, error or event handling is listed as providers, like a service provider.

Generate a provider class by this command `ionic -g provider <class_name>`. I will name this class as SqliteStorage, for example, therefore:
```
ionic -g provider SqliteStorage
```
Some sources explain that the Sqlite has not been supported in ios or android simulation on browser platform. It is recommended to run with the emulation so that the SQLite is able to work properly.
```
ionic run ios -l -s -c
```
For the purpose of debugging, indicating `-l -s -c` will output log information onto the console and update the emulation as soon as a source file is saved. To target a specific device model, e.g. iPhone 6, add `--target="iphone-6"`.

### Initializing Sqlite Storage

Before starting the code,

### Initializing ***app.module***

### Initializing ***home*** page

### And the rest
