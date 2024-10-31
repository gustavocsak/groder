import { getSourceCodeButton, getFeedbackElements } from "./feedback.js";

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

function getOverallFeedback() {
  const container = getScoreFeedbackContainer();
  const expandButton = container.querySelector(".d2l-hpg-opener");
  // clicking will expand feedback without buttons
  setTimeout(() => {
    expandButton.focus();
    expandButton.click();
  }, 500);

  // must find a tag to click again
  const preFeedback = container.querySelector(".d2l-offscreen");
  setTimeout(() => {
    preFeedback.focus();
    preFeedback.click();
  }, 500);

  // <div class="d2l-htmleditor-label-flex-container">
  const overall =
    container.querySelector(".d2l-htmleditor-wc").shadowRoot.children[0];
  // FIX: something going wrong with sourceCode button
  // seems like overall is not being properly selected
  return overall;
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

function setFeedbackValue(feedback) {
  const of = getOverallFeedback();
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
