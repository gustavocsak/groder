export function getRightPanel() {
  const page = document.querySelector(".d2l-token-receiver");

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

  // FIX: d2l-dialog not found after clicking source button
  // FIX: (d2l-htmleditor-sourcecode-dialog not found)

  // <d2l-dialog>
  const dialog = bottomInput.children[1].children[1].children[0].shadowRoot.children[0];

  const innerTextArea = dialog.children[0].children[0].children[1].children[1];

  return innerTextArea;
}

function waitForFeedbackTextarea() {
  return new Promise((resolve, reject) => {
    const checkTextarea = () => {
      const feedbackTextarea = getFeedbackTextarea();
      
      // Check if the textarea is available
      if (feedbackTextarea) {
        resolve(feedbackTextarea);
      } else {
        // Check again in a short time
        requestAnimationFrame(checkTextarea);
      }
    };
    
    // Start checking
    setTimeout(checkTextarea, 1000);
    
  });
}

export function setFeedbackValue(feedback) {
  const sourceCodeButton = getSourceCodeButton();

  // click button to show dialog in page 
  sourceCodeButton.click();

  waitForFeedbackTextarea().then(feedbackTextArea => {
    console.log(feedbackTextArea);
    setTimeout(() => {
        feedbackTextArea.innerHTML = "test"; // Change this to .innerHTML if necessary

        // Optionally, focus on the div after updating its content
        feedbackTextArea.focus();

        // Dispatch an input event to notify any listeners
        const inputEvent = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        feedbackTextArea.dispatchEvent(inputEvent);
      }, 1000);
  });


}
