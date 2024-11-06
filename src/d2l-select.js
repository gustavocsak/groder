import { setScore, setFeedback } from "./grade.js";

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

function getEditor() {
  const rightPanel = getRightPanel();

  // <div class="d2l-htmleditor-label-flex-container">
  return rightPanel.children[1].children[0].shadowRoot.children[0].shadowRoot
    .children[0];
}

function getSaveDraftButton() {
  const main = getMainPanel();

  // <div id="footer-container">
  const footer = main.children[3].children[1].shadowRoot.children[0];

  const saveDraftButton = footer.children[1].children[0].shadowRoot.children[0];

  return saveDraftButton;
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
  setScore("", getScoreInput());
  setFeedback(getEditor(), "");

  clickButton("saveDraft");
}

export function setGrade(grade, config) {
  setScore(grade.score, getScoreInput());
  setFeedback(getEditor(), grade.feedback);

  clickButton("saveDraft", config.saveDraftDelay);
  clickButton("nextStudent", config.nextStudentDelay);
}
