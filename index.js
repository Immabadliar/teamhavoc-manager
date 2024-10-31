const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    console.log('Creating main window...'); // Verbose logging
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile('./renderer/index.html').then(() => {
        console.log('Main window loaded successfully'); // Verbose logging
    }).catch((error) => {
        console.error('Failed to load main window:', error); // Verbose logging
    });
}

// Handling app lifecycle events
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('All windows closed, quitting application...'); // Verbose logging
        app.quit();
    }
});
