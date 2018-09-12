const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 800 });

  win.loadFile('public/index.html');
}

app.on('ready', createWindow);
