export function getRightPanel() {
  const page = document.querySelector(".d2l-token-receiver");
  console.log("test");
  // main will have <div id="evaluation-template">
  const main = page.shadowRoot.children[0].shadowRoot.children[0];

  // right will have <div class="d2l-consistent-evaluation-right-panel"> 
  const right = main.children[2].children[0].shadowRoot.children[0];

  // <d2l-consistent-evaluation-right-panel-block>
  const rightPanel = right.querySelector(".d2l-consistent-evaluation-right-panel-evaluation").children[0].shadowRoot.children[0].children[0];

  return rightPanel;
}

export function getGradeInput() {
  
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

  // d2l element for source code
  const sourceCodeButton = toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]').shadowRoot.children[0];

  return sourceCodeButton;
}

function getFeedbackTextarea() {
  const rightPanel = getRightPanel();

  // <div class="d2l-htmleditor-label-flex-container">
  const bottomInput = rightPanel.children[1].children[0].shadowRoot.children[0].shadowRoot.children[0];

  // <d2l-dialog>
  console.log(bottomInput.children[1].children[1]);
  const dialog = bottomInput.children[1].children[1].children[0].shadowRoot.children[0];

  const innerTextArea = dialog.children[0].children[0].children[1].children[1];

  return innerTextArea;
}

export function setFeedbackValue(feedback) {
  const sourceCodeButton = getSourceCodeButton();

  // click button to show dialog in page 
  sourceCodeButton.click();
  //console.log(feedback)
  const feedbackTextarea = getFeedbackTextarea();

  feedbackTextarea.textContent = "test";

}
