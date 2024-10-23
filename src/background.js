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
    contexts: ["all"],
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
    handleSetGrade(tab);
  }
});

browser.commands.onCommand.addListener((command) => {
  console.log(`command received: ${command}`);
  if (command === "set-grade") {
    console.log(`inside set-grade command`);
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        handleSetGrade(tabs[0]);
      }
    });
  }
});

function handleSetGrade(tab) {
  navigator.clipboard.readText().then((clipboardFeedback) => {
    try {
      const numberMatch = clipboardFeedback.match(/th>\s*Total\s*<\/th>\s*<th[^>]*>\s*(\d{1,3}(?:\.\d)?)\s*\//);

      if (!numberMatch) {
        throw new Error("Unable to extract score from feedback in clipboard");
      }

      const score = numberMatch[1];
      const grade = {
        score: score,
        feedback: clipboardFeedback,
      };
      if (tab) {
        browser.tabs.sendMessage(tab.id, { action: "setGrade", grade: grade });
      }
    } catch (error) {
      alert(`Feedback error: ${error.message}`);
    }
  });
}
