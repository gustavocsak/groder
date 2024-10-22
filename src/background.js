import { formatCode } from './format.js';

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

browser.contextMenus.create(
  {
    id: "set-grade",
    title: "Set student grade",
    contexts: ["page"],
  }
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "format-code") {
    browser.tabs.sendMessage(tab.id, { action: "formatCode", selectedText: info.selectionText });
  }
  if (info.menuItemId === "paste-formatted-code") {
    navigator.clipboard.readText().then(async (clipboardCode) => {
      const formattedCode = await formatCode(clipboardCode);
      browser.tabs.sendMessage(tab.id, { action: "pasteCode", formattedCode });
    });
  }
  if (info.menuItemId === "set-grade") {
    navigator.clipboard.readText().then((clipboardFeedback) => {
      const numberMatch = clipboardFeedback.match(/th>\s*Total\s*<\/th>\s*<th[^>]*>\s*(\d{1,3})\s*\//);
      const score = numberMatch[1];
      const grade = {
        score: score,
        feedback: clipboardFeedback,
      };
      console.log(grade);
      browser.tabs.sendMessage(tab.id, { action: "setGrade", grade: grade });
    });
  }
});
