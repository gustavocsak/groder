document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optionsForm");
  const status = document.getElementById("status");

  browser.storage.local.get(
    ["saveDraft", "nextStudent", "saveDraftDelay", "nextStudentDelay"],
    (result) => {
      document.getElementById("saveDraft").checked = result.saveDraft || false;
      document.getElementById("saveDraft").disabled = result.nextStudent;
      document.getElementById("nextStudent").checked =
        result.nextStudent || false;
      document.getElementById("saveDraftDelay").value =
        result.saveDraftDelay || 1000;
      document.getElementById("nextStudentDelay").value =
        result.nextStudentDelay || 1000;
    },
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("status");

    const saveDraft = document.getElementById("saveDraft").checked;
    const nextStudent = document.getElementById("nextStudent").checked;
    const saveDraftDelay = document.getElementById("saveDraftDelay").value;
    const nextStudentDelay = document.getElementById("nextStudentDelay").value;

    browser.storage.local.set(
      {
        saveDraft: saveDraft,
        nextStudent: nextStudent,
        saveDraftDelay: saveDraftDelay,
        nextStudentDelay: nextStudentDelay,
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
