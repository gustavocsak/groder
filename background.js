browser.contextMenus.create(
  {
    id: "format-code",
    title: "Format selected code",
    contexts: ["selection"],
  },
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "format-code") {
    browser.tabs.sendMessage(tab.id, { action: "formatCode", selectedText: info.selectionText });
  }
});
