/**
 * Returns main element in d2l assignment page
 */
function getMainPanel() {
  const page = document.querySelector(".d2l-token-receiver");
  // <div id="evaluation-template">
  return page.shadowRoot.children[0].shadowRoot.children[0];
}

/**
 * Returns right panel in d2l assignment page
 * contains overall score and overall feedback areas
 */
function getRightPanel() {
  const main = getMainPanel();

  // <div class="d2l-consistent-evaluation-right-panel">
  const right = main.children[2].children[0].shadowRoot.children[0];

  // <d2l-consistent-evaluation-right-panel-block>
  return right.querySelector(
    ".d2l-consistent-evaluation-right-panel-evaluation",
  ).children[0].shadowRoot.children[0].children[0];
}

function getScoreInput() {
  const rightPanel = getRightPanel();

  // <div class="d2l-grade-result-presentational-container">
  const overallGradeContainer =
    rightPanel.children[0].shadowRoot.children[0].shadowRoot.querySelector(
      ".d2l-grade-result-presentational-container",
    );

  // <div class="d2l-input-container">
  const inputContainer =
    overallGradeContainer.children[0].shadowRoot.children[0].children[0]
      .children[0].children[0].shadowRoot.children[0].shadowRoot.children[0];

  return inputContainer.children[0].children[0];
}

function getOverallFeedback() {
  const rightPanel = getRightPanel();

  // <div class="d2l-htmleditor-label-flex-container">
  return rightPanel.children[1].children[0].shadowRoot.children[0].shadowRoot
    .children[0];
}

function getSourceCodeButton() {
  const overallFeedback = getOverallFeedback();

  // <div class="d2l-htmleditor-toolbar-actions">
  const toolbar =
    overallFeedback.children[1].children[0].children[0].children[0].shadowRoot
      .children[0].children[0];

  // d2l button element for source code
  return toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]')
    .shadowRoot.children[0];
}

function getFeedbackElements() {
  const overallFeedback = getOverallFeedback();
  // <d2l-dialog>
  const dialog =
    overallFeedback.children[1].children[1].children[0].shadowRoot.children[0];
  const feedbackTextarea =
    dialog.children[0].children[0].children[1].children[1];
  const saveFeedbackButton = dialog.children[1].shadowRoot.children[0];

  return {
    feedbackTextarea,
    saveFeedbackButton,
  };
}

function getSaveDraftButton() {
  const main = getMainPanel();

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

  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent);

  const changeEvent = new Event("change", { bubbles: true });
  input.dispatchEvent(changeEvent);
}

function getNextStudentButton() {
  const main = getMainPanel();

  // <d2l-navigation-immersive>
  const nav = main.children[0].children[0].shadowRoot.children[0].children[0];

  return nav.children[2].shadowRoot.children[2].shadowRoot.children[0];
}

function clickButton(buttonType, delay = 1000) {
  let button;
  if (buttonType === "saveDraft") {
    button = getSaveDraftButton();
  } else if (buttonType === "nextStudent") {
    button = getNextStudentButton();
  } else {
    return;
  }

  setTimeout(() => {
    button.focus();
    button.click();
  }, delay);
}

export function resetGrade() {
  setScoreValue("");
  setFeedbackValue("");

  clickButton("saveDraft");
}

export function setGrade(grade, config) {
  setScoreValue(grade.score);
  setFeedbackValue(grade.feedback);

  clickButton("saveDraft", config.saveDraftDelay);
  clickButton("nextStudent", config.nextStudentDelay);
}
