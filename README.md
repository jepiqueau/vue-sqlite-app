# vue-sqlite-app
Sample project that shows an integration of
 - [@capacitor-community/sqlite] (https://github.com/capacitor-community/sqlite)

 - [vue-sqlite-hook] (https://www.npmjs.com/package/vue-sqlite-hook)

in Vue App.


## Project

To start clone the project
```bash
git clone https://github.com/jepiqueau/vue-sqlite-app.git 
cd vue-qlite-app
git remote rm origin
npm install
cd electron
npm install
npm run postinstall
cd ..
```


To install the latest release of the ```@capacitor-community/sqlite``` plugin
and the latest release of ```vue-sqlite-hook``` 


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
