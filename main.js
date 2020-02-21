const {app, BrowserWindow, ipcMain} = require('electron');
const {readdirSync, statSync} = require('fs');

const getDirectories = (source) => {
  return readdirSync(source, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .sort((a, b) => {
      return statSync(source + a.name).mtime.getTime() -
        statSync(source + b.name).mtime.getTime();
    })
    .map(dirent => {
      return dirent.name
    });
};

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 670,
    icon: `file://${__dirname}/dist/webcam1/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize();

  win.loadURL(`file://${__dirname}/dist/webcam1/index.html`);

  // uncomment below to open the DevTools.
  // win.webContents.openDevTools();

  // console.log('send');
  // const folders = getDirectories('D:\\RD\\2020\\1\\8');
  // win.webContents.send('getFolderResponse', folders[folders.length - 1]);
  // console.log('sent');

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
});


ipcMain.on('getFolder', (event, arg) => {
  const folders = getDirectories(arg);
  event.sender.send('getFolderResponse',
    encodeURIComponent(folders[folders.length - 1].trim())
  );
});
