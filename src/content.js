import { getGradeInput, setFeedbackValue } from './d2l-select.js';

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
    const input = getGradeInput();
    input.value = message.gradePackage.grade;
    const event = new Event('input', {
      bubbles: true, // Allow the event to bubble up
      cancelable: true // Allow the event to be canceled
    });
    // Dispatch the event
    input.dispatchEvent(event);

    setFeedbackValue(message.gradePackage.feedback);
  }
});
