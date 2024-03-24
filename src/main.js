import plugin from "../plugin.json";
const settings = acode.require("settings");
const { editor } = editorManager;

class AcodePlugin {
    async init() {
        editor.setOptions({
            selectionStyle: "line",
            highlightActiveLine: false,
            highlightSelectedWord: true,
            readOnly: false,
            cursorStyle: "ace",
            mergeUndoDeltas: true,
            behavioursEnabled: true,
            wrapBehavioursEnabled: true,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            useSoftTabs: true,
            navigateWithinSoftTabs: true,
            enableMultiselect: true,
            enableAutoIndent: true,
            enableKeyboardAccessibility: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });

        editor.renderer.setOptions({
            hScrollBarAlwaysVisible: false,
            vScrollBarAlwaysVisible: false,
            highlightGutterLine: false,
            animatedScroll: false,
            showInvisibles: true,
            showPrintMargin: false,
            printMarginColumn: 40,
            printMargin: false,
            fadeFoldWidgets: false,
            showFoldWidgets: false,
            showGutter: true,
            displayIndentGuides: false,
            highlightIndentGuides: false,
            fontSize: 10,
            scrollPastEnd: false,
            fixedWidthGutter: true,
            customScrollbar: false,
            hasCssTransforms: false,
            maxPixelHeight: 0,
            useSvgGutterIcons: false
        });

        editor.session.setOptions({
            firstLineNumber: 1,
            overwrite: false,
            newLineMode: "auto",
            useWorker: true,
            useSoftTabs: true,
            indentedSoftWrap: true,
            navigateWithinSoftTabs: true,
            tabSize: 2,
            wrap: "off",
            wrapMethod: "code",
            foldStyle: ["markbegin", "markbeginend", "manual"][0]
        });
    };
    
    async destroy() {}
};

if (window.acode) {
    const acodePlugin = new AcodePlugin();
    acode.setPluginInit(
        plugin.id,
        async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
            if (!baseUrl.endsWith("/")) {
                baseUrl += "/";
            }
            acodePlugin.baseUrl = baseUrl;
            await acodePlugin.init($page, cacheFile, cacheFileUrl);
        }
    );
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
};
