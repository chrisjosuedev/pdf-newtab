const { app, BrowserWindow, Menu } = require('electron')

const server = require('./app');


const templateMenu = [
  {
    label: 'Ajustes',
    submenu: [
      {
        label: 'Salir',
        accelerator: 'Ctrl+Q',
        click() {
          app.quit()
        }
      }
    ]
  }
]

const mainMenu = Menu.buildFromTemplate(templateMenu)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'PDF App'
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  //mainWindow.maximize()
  Menu.setApplicationMenu(mainMenu)
  
}

app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
  mainWindow.setSize(x, y);
  mainWindow.maximize()
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
  
});




