import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import electronDebug from "electron-debug";

const prod = process.env.NODE_ENV === "production";

let mainWindow: BrowserWindow | undefined;

electronDebug({});

function createWindow() {
  const window = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
  });

  if (!prod) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    );
  }

  window.webContents.on("did-finish-load", () => {
    window.show();
    window.focus();
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  window.on("closed", () => {
    mainWindow = undefined;
  });

  return window;
}

app.on("ready", async () => {
  if (!prod) {
    require("devtron").install();
    const installer = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
    await Promise.all(extensions.map(e => installer.default(installer[e], forceDownload)));
  }
  mainWindow = createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    mainWindow = createWindow();
  }
});
