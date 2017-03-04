### Overview
Recently, Ionic 2 has re-organized its project structure. All the source code are put into the src/ folder. In this folder, there are ***app***, ***pages*** and ***providers*** sub-folders

<img src="photos/overview.png" alt="New project structure." width=10% height=10%/>

- ***app***: Listing of user-created and system-defined components. A component is similar to a class or package in other languages.
- ***pages***: Each page is equivalent to a screen you will see when using the app on mobile phone. User can navigate back and forth between pages.
- ***providers***: Event handlers, error handlers, database..., which handle underlying processes that user won't see on the phone.

In this tutorial, we'll create an app with only one page (for simplicity) having a button for adding a name into the database (Sqlite storage) and one for refreshing the view to reflect the new update.

<img src="photos/homepage.png" width=40% height=40%/>

### Start with a blank Ionic 2 project

I will not go into the detail how to initiate a new project in Ionic 2 using a blank template and add ios or android platform since you can find it everywhere.
```
ionic start SqliteStorage blank --v2
cd SqliteStorage
ionic platform add ios
```
Our main interest is Sqlite, we need to add this plugin into our project.
```
ionic plugin add cordova-sqlite-storage
```
We are planning to use Sqlite as a provider. A provider is just a class, but not something users can see on the screen. A class playing with what users can see and interact is called a *page*. A class providing additional underlying supporting such as database storage, error or event handling is listed as providers, like a service provider.
Generating a provider class with this command `ionic -g provider <class name>`. I will name this class as SqliteStorage, therefore:
```
ionic -g provider SqliteStorage
```
Some sources state that the Sqlite is not supported by ios or android simulation on browser platform. It is recommended to run with the emulation for the SQLite to work properly.
```
ionic run ios -l -s -c
```
For the purpose of debugging, specifing `-l -s -c` will output log information onto the console and restart the simulation as soon as a source file is saved. To target a specific device model, e.g. iPhone 6, add `--target="iphone-6"`.

### Initialize Sqlite Storage

Before starting the code,

### Initialize ***app.module***

### Initialize ***home*** page

### And the rest
