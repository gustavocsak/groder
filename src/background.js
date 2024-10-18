browser.contextMenus.create(
  {
    id: "format-code",
    title: "Format selected code",
    contexts: ["selection"],
  },

);

browser.contextMenus.create(
  {
    id: "paste-formatted-code",
    title: "Paste and format code",
    contexts: ["editable"],
  }
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "format-code") {
    browser.tabs.sendMessage(tab.id, { action: "formatCode", selectedText: info.selectionText });
  }
  if (info.menuItemId === "paste-formatted-code") {
    navigator.clipboard.readText().then((clipboardCode => {
      browser.tabs.sendMessage(tab.id, { action: "pasteCode", clipboardCode });
    }));
  }
});
