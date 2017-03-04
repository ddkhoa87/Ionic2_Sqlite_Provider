### Overview
Recently, Ionic 2 has re-organized its project structure. All the source code are relocated into the *src/* folder. In this folder, there are ***app***, ***pages*** and ***providers*** sub-folders:

<img src="photos/overview.png" alt="New project structure." width=15% height=15%/>

- ***app***: Listing of user-created and system-defined components. A component is similar to a class or package in other languages.
- ***pages***: Each page is equivalent to a screen users will see when using the app on mobile phone. Users can navigate back and forth among pages.
- ***providers***: Event handlers, error handlers, database..., which handle underlying processes that users won't see or interact on the phone.

For simplicity, this tutorial demonstrates with an one-page app having a button for adding a name from an input field into the database (Sqlite storage) and another button for refreshing the view to reflect the new update.

<img src="photos/homepage.png" width=40% height=40%/>

### Starting with a blank Ionic 2 project

All the steps to initiate a new Ionic 2 blank project to run on ios or android platform can be found everywhere.
```
ionic start SqliteStorage blank --v2
cd SqliteStorage
ionic platform add ios
```
To add SQLite plugin into the project:
```
ionic plugin add cordova-sqlite-storage
```
We are planning to use SQLite as a *provider*. A provider is just a class, but not something users can see on the screen. A class handling what can be seen and iteracted is called a *page*. A class providing additional underlying support such as database storage, error or event handling is listed as providers, or a service provider.

Generate a provider class by this command `ionic -g provider <class_source_file_name>`. I will name this file as *database*, for example, and its class inside will be auto-generated as *class Database* subsequently:
```
ionic -g provider database
```
Some sources explain that SQLite has not been supported in ios or android simulation on browser platform. It is recommended to run the emulation so that the SQLite is able to work properly.
```
ionic run ios -l -s -c
```
For the purpose of debugging, indicating `-l -s -c` will output log information onto the console and update the emulation as soon as a source file is saved. To target a specific device model, e.g. iPhone 6, add `--target="iphone-6"`.

### Initializing Sqlite Storage

Open the `src\providers\database.ts`, import neccessary modules:
```
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
```
*SQLite* is of course a must-have. The *Platform* is required for checking the readiness before opening a database for further access.

Declare a new SQLite storage variable:
```
private storage : SQLite;
```
Supply an additional parameter `platform: Platform` to the constructor:
```
constructor(public http: Http, platform: Platform)
```
Make sure the platform is ready beforehand:
```
platform.ready()
.then(() => {
    this.storage = new SQLite();
    console.log('Opening database.');
    this.storage.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then(() => {
        console.log('Opened database.');
        this.storage.executeSql('create table IF NOT EXISTS People(name VARCHAR(32))', {})
        .then(()=>{
            console.log('Created table.');
        });
    });
});
```
The SQLite code is straightforward and self-explaining. The `.then( (*some_variable*) => {*some_code*} );` is actually an anonymous function (or lambda abstraction in some languages) nested inside a *promise-based* syntax `.then(*do_something*);`. This is for dealing with asynchronicity in Javascript. Refer to other sources for more detail. [This post](http://blog.rangle.io/the-art-of-promise-based-architecture/) is also a good start.

### Initializing ***app.module***

The *src/app/app.module.ts* is like a management center for all modules being used in a project. Hence, it should know where the source code for a module is:
<img src="photos/app2provider.png" alt="Referring to database from app." width=15% height=15%/>
```
import { Database } from "../providers/database";
```
and the category of it. In this case, our *Database* class is a provider:
```
providers: [Database, *other providers*]
```
Note that the relative path to the source file omits *.ts*. Ionic 2 would know all the code are in *type-script*.

### Initializing ***home*** page

Our *home* page will take the name from user input and insert into database. Once the user clicks the Refresh View button, data retrieved from database will be listed on the screen for viewing. So, obviously, the *home* page needs to know the class providing this storage service and its source file location in the *src/pages/home/home.ts*:
<img src="photos/home2provider.png" alt="Referring to database from home." width=15% height=15%/>
```
import { Database } from "../../providers/database";
```

### And the rest
