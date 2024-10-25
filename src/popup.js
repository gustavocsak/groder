document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optionsForm");
  const status = document.getElementById("status");

  browser.storage.local.get(["saveDraft", "nextStudent"], (result) => {
    document.getElementById("saveDraft").checked = result.saveDraft || false;
    document.getElementById("saveDraft").disabled = result.nextStudent;
    document.getElementById("nextStudent").checked =
      result.nextStudent || false;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("status");

    const saveDraft = document.getElementById("saveDraft").checked;
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
