import plugin from "../plugin.json";
const settings = acode.require("settings");
const { editor } = editorManager;

const newAppSettings = {
  animation: "yes",
  autosave: 1000,
  fileBrowser: {
    showHiddenFiles: true,
    sortByName: false
  },
  fontSize: "10px",
  textWrap: false,
  softTab: true,
  tabSize: 2,
  retryRemoteFsAfterFail: true,
  linenumbers: true,
  formatOnSave: false,
  autoCorrect: true,
  openFileListPos: "header",
  quickTools: 1,
  quickToolsTriggerMode: "touch",
  editorFont: "Noto Mono",
  vibrateOnTap: true,
  fullscreen: false,
  floatingButton: false,
  liveAutoCompletion: true,
  showPrintMargin: true,
  printMargin: 120,
  scrollbarSize: 15,
  showSpaces: true,
  confirmOnExit: true,
  leftMargin: 50,
  checkFiles: true,
  keyboardMode: "NORMAL",
  rememberFiles: false,
  rememberFolders: false,
  diagonalScrolling: false,
  reverseScrolling: false,
  teardropTimeout: 3000,
  teardropSize: 20,
  scrollSpeed: "NORMAL",
  relativeLineNumbers: false,
  elasticTabstops: false,
  rtlText: false,
  hardWrap: false,
  useTextareaForIME: true,
  touchMoveThreshold: 0.25,
  quicktoolsItems: [
    7,
    0,
    2,
    3,
    4,
    5,
    6,
    32,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ],
  defaultFileEncoding: "UTF-8",
  inlineAutoCompletion: true,
  colorPreview: true,
  maxRetryCount: 3,
  showRetryToast: false,
  showSideButtons: true,
  showAnnotations: true,
  lineHeight: "1.36"
};

const newEditorSettings = {
  selectionStyle: "line",
  highlightActiveLine: true,
  highlightSelectedWord: true,
  cursorStyle: "ace",
  copyWithEmptySelection: true,
  navigateWithinSoftTabs: true,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  enableEmmet: true,
  useElasticTabstops: true,
};

class BetterAcode {
  init() {
    this.updateAppSettings();
    this.updateEditorSettings();
  };

  destroy() {};

  updateAppSettings() {
    return settings.update(newAppSettings);
  };

  updateEditorSettings() {
    return editor.setOptions(newEditorSettings);
  };
};

if (window.acode) {
  const betterAcode = new BetterAcode();
  acode.setPluginInit(plugin.id,
    async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
      betterAcode.baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl += '/';
      await betterAcode.init($page, cacheFile, cacheFileUrl);
    }
  );

  acode.setPluginUnmount(plugin.id, betterAcode.destroy.bind(betterAcode));
};