document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optionsForm");
  const status = document.getElementById("status");

  browser.storage.local.get(["saveDraft", "nextStudent"], (result) => {
    document.getElementById("saveDraft").value = result.saveDraft || "system";
    document.getElementById("nextStudent").checked =
      result.nextStudent || false;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("status");

    const saveDraft = document.getElementById("saveDraft").value;
    const nextStudent = document.getElementById("nextStudent").checked;

    browser.storage.local.set(
      {
        saveDraft: saveDraft,
        nextStudent: nextStudent,
      },
      () => {
        status.textContent = "Options saved.";
        setTimeout(() => {
          status.textContent = "";
        }, 1500);
      },
    );
  });

  const saveDraft = document.getElementById("saveDraft");
  const nextStudent = document.getElementById("nextStudent");

  nextStudent.addEventListener("change", () => {
    if (nextStudent.checked) {
      saveDraft.checked = true;
      saveDraft.disabled = true;
    } else {
      saveDraft.disabled = false;
    }
  });
});
