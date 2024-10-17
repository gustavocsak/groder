browser.runtime.onMessage.addListener((message) => {
  if (message.action === "formatCode") {
    const code = message.selectedText;
    const formattedCode = formatCode(code);
    alert(formattedCode);
  }
});

function formatCode(code) {
  return code.split("\n").map((line, index) => `${index + 1}: ${line}`).join("\n");
}
