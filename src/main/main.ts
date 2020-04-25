import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow;

async function installExtensions() {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
}

async function createWindow() {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1800,
    webPreferences: {
      webSecurity: false,
      webviewTag: true,
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  } else {
    mainWindow.loadURL(`http://localhost:2003`);
  }

  // if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools();
    });
  // }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
