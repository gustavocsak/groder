import { setGrade, resetGrade } from "./d2l-select.js";

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "formatCode") {
    const code = message.selectedText;
    const formattedCode = formatCode(code);
    alert(formattedCode);
  }
  if (message.action === "pasteCode") {
    const code = message.formattedCode;
    alert(code);
  }
  if (message.action === "setGrade") {
    browser.storage.local
      .get(["saveDraftDelay", "nextStudentDelay"])
      .then((result) => {
        setGrade(message.grade, result);
      });
  }
  if (message.action === "resetGrade") {
    resetGrade();
  }
});
