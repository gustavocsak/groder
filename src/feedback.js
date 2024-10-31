// code to select elements starting from:
// <div class="d2l-htmleditor-flex-container">

// for now accepting overallfeedback element as parameter
// TODO: find better way to implement this
// maybe not accept overallFeedback?
// quiz/assignment parameter?
export function getSourceCodeButton(overallFeedback) {
  //const overallFeedback = getOverallFeedback();

  // <div class="d2l-htmleditor-toolbar-actions">
  const toolbar =
    overallFeedback.children[1].children[0].children[0].children[0].shadowRoot
      .children[0].children[0];

  // d2l button element for source code
  return toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]')
    .shadowRoot.children[0];
}

// same for this
export function getFeedbackElements(overallFeedback) {
  //const overallFeedback = getOverallFeedback();
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
