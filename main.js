const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const {readdirSync, statSync} = require('fs');

// vars
let mainWindow;

// functions
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

// const createMenu = () => {
//   let menu = [
//     {
//       label: 'File',
//       submenu: [
//         {
//           label: 'Quit',
//           accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//           click() {
//             app.quit();
//           }
//         }
//       ]
//     }
//   ];
//
//   Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
// };

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    show: false,
    title: 'WebCam Project',
    icon: `file://${__dirname}/dist/webcam1/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(`file://${__dirname}/dist/webcam1/index.html`);

  // createMenu();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// events
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (mainWindow === null) {
    createWindow()
  }
});

// additional events
ipcMain.on('getFolder', (event, arg) => {
  const folders = getDirectories(arg);
  event.sender.send('getFolderResponse',
    encodeURIComponent(folders[folders.length - 1].trim())
  );
});

