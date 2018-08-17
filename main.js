const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadFile('public/index.html');
}

app.on('ready', createWindow);
