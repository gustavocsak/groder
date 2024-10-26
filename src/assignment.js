class Assignment {
  constructor() {
    this.mainPanel = this.getMainPanel();
    this.rightPanel = this.getRightPanel();
    this.scoreInput = this.getScoreInput();
    this.sourceCodeButton = this.getSourceCodeButton();
    this.saveDraftButton = this.getSaveDraftButton();
    this.feedback = this.getFeedbackElements();
  }

  /**
   * Gets the main element from a d2l assignment page
   */
  getMainPanel() {
    const page = document.querySelector(".d2l-token-receiver");

    // <div id="evaluation-template">
    return page.shadowRoot.children[0].shadowRoot.children[0];
  }

  /**
   * Gets the right panel from a d2l assignment
   * It contains the Overall score and feedback
   */
  getRightPanel() {
    // <div class="d2l-consistent-evaluation-right-panel">
    const right = this.mainPanel.children[2].children[0].shadowRoot.children[0];

    // <d2l-consistent-evaluation-right-panel-block>
    return right.querySelector(
      ".d2l-consistent-evaluation-right-panel-evaluation",
    ).children[0].shadowRoot.children[0].children[0];
  }

  /**
   * Gets the overall score input element
   */
  getScoreInput() {
    // <div class="d2l-grade-result-presentational-container">
    const scoreContainer =
      this.rightPanel.children[0].shadowRoot.children[0].shadowRoot.querySelector(
        ".d2l-grade-result-presentational-container",
      );

    // <div class="d2l-input-container">
    const inputContainer =
      scoreContainer.children[0].shadowRoot.children[0].children[0].children[0]
        .children[0].shadowRoot.children[0].shadowRoot.children[0];

    return inputContainer.children[0].children[0];
  }

  /**
   * Gets the overall feedback element
   * contains the textarea and all buttons
   */
  getOverallFeedback() {
    // <div class="d2l-htmleditor-label-flex-container">
    return this.rightPanel.children[1].children[0].shadowRoot.children[0]
      .shadowRoot.children[0];
  }

  /**
   * Gets the source code button in the overall feedback element
   */
  getSourceCodeButton() {
    const overallFeedback = getOverallFeedback();

    // <div class="d2l-htmleditor-toolbar-actions">
    const toolbar =
      overallFeedback.children[1].children[0].children[0].children[0].shadowRoot
        .children[0].children[0];

    // d2l button element for source code
    return toolbar.querySelector('d2l-htmleditor-button[cmd="d2l-source-code"]')
      .shadowRoot.children[0];
  }

  /**
   * Gets the feedback elements after popup for source code is displayed
   * It contains the textarea where HTML can be added
   * and the save feedback button
   */
  getFeedbackElements() {
    const overallFeedback = getOverallFeedback();

    // <d2l-dialog>
    const dialog =
      overallFeedback.children[1].children[1].children[0].shadowRoot
        .children[0];

    const textarea = dialog.children[0].children[0].children[1].children[1];
    const saveButton = dialog.children[1].shadowRoot.children[0];

    return {
      textarea,
      saveButton,
    };
  }

  /**
   * Gets save draft button at d2l assignment footer
   */
  getSaveDraftButton() {
    // <div id="footer-container">
    const footer = this.main.children[3].children[1].shadowRoot.children[0];

    return footer.children[1].children[0].shadowRoot.children[0];
  }

  setScoreValue(score) {
    this.scoreInput.value = score;

    const inputEvent = new Event("input", { bubbles: true });
    this.input.dispatchEvent(inputEvent);

    const changeEvent = new Event("change", { bubbles: true });
    this.input.dispatchEvent(changeEvent);
  }
}
