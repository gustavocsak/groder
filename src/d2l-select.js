function getRightPanel() {
  const page = document.querySelector(".d2l-token-receiver");

  // <div id="evaluation-template">
  const main = page.shadowRoot.children[0].shadowRoot.children[0];

  // <div class="d2l-consistent-evaluation-right-panel"> 
  const right = main.children[2].children[0].shadowRoot.children[0];

  // <d2l-consistent-evaluation-right-panel-block>
  const rightPanel = right.querySelector(".d2l-consistent-evaluation-right-panel-evaluation").children[0].shadowRoot.children[0].children[0];
  return rightPanel;
}

function getScoreInput() {
  const rightPanel = getRightPanel();

  // <div class="d2l-grade-result-presentational-container">
  const overallGradeContainer = rightPanel.children[0].shadowRoot.children[0].shadowRoot.querySelector(".d2l-grade-result-presentational-container");

  // <div class="d2l-input-container">
  const inputContainer = overallGradeContainer.children[0].shadowRoot.children[0].children[0].children[0].children[0].shadowRoot.children[0].shadowRoot.children[0];

  const input = inputContainer.children[0].children[0];
  return input;
}

function getSourceCodeButton() {
  const rightPanel = getRightPanel();

  // <div class="d2l-htmleditor-label-flex-container">
  const bottomInput = rightPanel.children[1].children[0].shadowRoot.children[0].shadowRoot.children[0];

  // <div class="d2l-htmleditor-toolbar-actions">
  const toolbar = bottomInput.children[1].children[0].children[0].children[0].shadowRoot.children[0].children[0];

  // d2l button element for source code
  const sourceCodeButton = toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]').shadowRoot.children[0];
  return sourceCodeButton;
}

function getFeedbackElements() {
  const rightPanel = getRightPanel();

  // <div class="d2l-htmleditor-label-flex-container">
  const bottomInput = rightPanel.children[1].children[0].shadowRoot.children[0].shadowRoot.children[0];

  // <d2l-dialog>
  const dialog = bottomInput.children[1].children[1].children[0].shadowRoot.children[0];
  const feedbackTextarea = dialog.children[0].children[0].children[1].children[1];
  const saveFeedbackButton = dialog.children[1].shadowRoot.children[0];

  return {
    feedbackTextarea,
    saveFeedbackButton
  };
}

function getSaveDraftButton() {
  const page = document.querySelector(".d2l-token-receiver");

  // <div id="evaluation-template">
  const main = page.shadowRoot.children[0].shadowRoot.children[0];

  // <div id="footer-container">
  const footer = main.children[3].children[1].shadowRoot.children[0];

  const saveDraftButton = footer.children[1].children[0].shadowRoot.children[0];

  return saveDraftButton;
}

function setFeedbackValue(feedback) {
  const sourceCodeButton = getSourceCodeButton();

  // click button to show dialog in page 
  sourceCodeButton.click();

  // wait .5s for dialog to show up in DOM
  setTimeout(() => {
    const { feedbackTextarea, saveFeedbackButton } = getFeedbackElements();
    feedbackTextarea.textContent = feedback;
    saveFeedbackButton.click();
  }, 500);

}

function setScoreValue(score) {
  const input = getScoreInput();
  input.value = score;

  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);

  const changeEvent = new Event('change', { bubbles: true });
  input.dispatchEvent(changeEvent);
}

export function setGrade(grade) {
  setScoreValue(grade.score);
  setFeedbackValue(grade.feedback);

  const saveDraftButton = getSaveDraftButton();
  setTimeout(() => {
    saveDraftButton.focus();
    saveDraftButton.click();
  }, 1000);
}
