# vue-datastoragesqlite-app
Sample project that shows an integration of
 - [capacitor-data-storage-sqlite] (https://github.com/jepiqueau/capacitor-data-storage-sqlite/blob/master/readme.md)

 - [vue-data-storage-sqlite-hook] (https://www.npmjs.com/package/vue-data-storage-sqlite-hook)

in Vue App.


## Project

To start clone the project
```bash
git clone https://github.com/jepiqueau/vue-datastoragesqlite-app.git 
cd vue-datastoragesqlite-app
git remote rm origin
npm install
cd electron
npm install
npm run postinstall
cd ..
```


To install the latest release of the ```capacitor-data-storage-sqlite``` plugin
and the latest release of ```vue-data-storage-sqlite-hook``` 


```bash
npm run update
npx cap sync
npx cap sync @capacitor-community/electron
npm run build
npx cap copy
npx cap copy web
npx cap copy @capacitor-community/electron
```

## Running the app

### BROWSER

```
npx cap serve
```

### IOS

```
npx cap open ios
```

### ANDROID

```
npx cap open android
```

### ELECTRON

```
npx cap open @capacitor-community/eletron
```
