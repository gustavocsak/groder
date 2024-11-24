import {
  getSourceCodeButton,
  getFeedbackElements,
  setScore,
} from "./gradeUtils.js";

function getScoreFeedbackContainer() {
  const form = document.querySelector("#d2l_form");
  const container = form.querySelectorAll(":scope > div > div");
  return container[2];
}

function getScoreInput() {
  const container = getScoreFeedbackContainer();
  const inputContainer = container.querySelector("d2l-input-number");
  const input =
    inputContainer.shadowRoot.children[0].shadowRoot.querySelector(
      ".d2l-input",
    );
  return input;
}

function getBlankFeedbackArea() {
  const container = getScoreFeedbackContainer();
  const expandButton = container.querySelector(".d2l-hpg-opener");

  expandButton.focus();
  expandButton.click();

  return new Promise((resolve) => {
    setTimeout(() => {
      const preFeedback = container.querySelector(".d2l-offscreen");
      resolve(preFeedback);
    }, 500);
  });
}

function delayClickElement(element, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.focus();
      element.click();
      resolve();
    }, delay);
  });
}

function selectFeedback() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const container = getScoreFeedbackContainer();
      const pre = container.querySelector(".d2l-htmleditor-wc");
      const feedback = pre.shadowRoot.children[0];
      resolve(feedback);
    }, 500);
  });
}

async function getOverallFeedback() {
  const container = getScoreFeedbackContainer();
  const preFeedback = await getBlankFeedbackArea();
  preFeedback.focus();
  preFeedback.click();

  const overall = await selectFeedback(container);
  return overall;
}

async function setFeedbackValue(feedback) {
  const of = await getOverallFeedback();
  const sourceCodeButton = getSourceCodeButton(of);

  // click button to show dialog in page
  sourceCodeButton.click();

  // wait .5s for dialog to show up in DOM
  setTimeout(() => {
    const { feedbackTextarea, saveFeedbackButton } = getFeedbackElements(of);
    feedbackTextarea.textContent = feedback;
    saveFeedbackButton.click();
  }, 500);
}

export function setQuizGrade(grade) {
  setScore(grade.score, getScoreInput());
  setFeedbackValue(grade.feedback);
}
