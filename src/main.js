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
  showAnnotations: true
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
  useElasticTabstops: true
};

const $ = (e) => document.querySelector(".ace_editor");

class AcodePlugin {
  #oldLineHeight = $(".ace_editor").style["line-height"];
  async init() {
    this.updateAppSettings();
    this.updateEditorSettings();

    $(".ace_editor").style["line-height"] = "1.36rem";
  };

  updateAppSettings() {
    return settings.update(newAppSettings);
  };

  resetAppSettings() {
    //return Object.keys(newAppSettings).forEach((sett) => settings.reset(sett));
  };

  updateEditorSettings() {
    return editor.setOptions(newEditorSettings);
  };

  async destroy() {
    this.resetAppSettings();

    $(".ace_editor").style["line-height"] = this.#oldLineHeight;
  };
};

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(
    plugin.id,
    async (baseUrl, $page, {
      cacheFileUrl,
      cacheFile
    }) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(plugin.id,
    () => {
      acodePlugin.destroy();
    });
};