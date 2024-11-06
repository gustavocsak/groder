import { getSourceCodeButton, getFeedbackElements } from "./grade.js";

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

  // clicking will expand feedback without buttons
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
  //await delayClickElement(preFeedback, 1000);
  preFeedback.focus();
  preFeedback.click();

  const overall = await selectFeedback(container);
  return overall;

  // FIX: something going wrong with sourceCode button
  // seems like overall is not being properly selected
}

// same as assignment.js
// TODO: move to lib file
function setScoreValue(score) {
  const input = getScoreInput();
  input.value = score;

  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent);

  const changeEvent = new Event("change", { bubbles: true });
  input.dispatchEvent(changeEvent);
}

async function setFeedbackValue(feedback) {
  const of = await getOverallFeedback();
  console.log(of);
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
  setScoreValue(grade.score);
  setFeedbackValue(grade.feedback);
}
