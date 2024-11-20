// code to select elements starting from:
// <div class="d2l-htmleditor-flex-container"> "editor"
export function getSourceCodeButton(editor) {
  // <div class="d2l-htmleditor-toolbar-actions">
  const toolbar =
    editor.children[1].children[0].children[0].children[0].shadowRoot
      .children[0].children[0];

  // d2l button element for source code
  return toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]')
    .shadowRoot.children[0];
}

export function getFeedbackElements(editor) {
  // <d2l-dialog>
  const dialog =
    editor.children[1].children[1].children[0].shadowRoot.children[0];
  const feedbackTextarea =
    dialog.children[0].children[0].children[1].children[1];
  const saveFeedbackButton = dialog.children[1].shadowRoot.children[0];

  return {
    feedbackTextarea,
    saveFeedbackButton,
  };
}

/**
 * Sets the input value to score
 * @param {number} score - value to input be set to
 * @param {HTMLElement} input - input element
 */
export function setScore(score, input) {
  input.value = score;
  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent);
  const changeEvent = new Event("change", { bubbles: true });
  input.dispatchEvent(changeEvent);
}

/**
 * Opens editor, sets and saves the feedback message
 * @param {HTMLElement} editor - D2L editor element
 * @param {string} feedback - message to feedback be set to
 */
export function setFeedback(editor, feedback) {
  const sourceCodeButton = getSourceCodeButton(editor);
  sourceCodeButton.click();

  setTimeout(() => {
    const { feedbackTextarea, saveFeedbackButton } =
      getFeedbackElements(editor);
    feedbackTextarea.textContent = feedback;
    saveFeedbackButton.click();
  }, 500);
}
