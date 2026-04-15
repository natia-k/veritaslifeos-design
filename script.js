(() => {
  const root = document.documentElement;
  const settingsTrigger = document.getElementById("settingsTrigger");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsClose = document.getElementById("settingsClose");
  const settingButtons = document.querySelectorAll(".setting-btn, .mini-setting-btn");

  function syncButtons(setting, value) {
    document.querySelectorAll(`[data-setting="${setting}"]`).forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.value === value);
    });
  }

  function applySetting(setting, value, save = true) {
    root.setAttribute(`data-${setting}`, value);
    syncButtons(setting, value);

    if (save) {
      localStorage.setItem(`veritas-${setting}`, value);
    }
  }

  ["theme", "mode", "accent", "density"].forEach((setting) => {
    const saved = localStorage.getItem(`veritas-${setting}`);
    if (saved) {
      applySetting(setting, saved, false);
    }
  });

  settingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applySetting(button.dataset.setting, button.dataset.value);
    });
  });

  function openPanel() {
    settingsPanel.hidden = false;
    settingsTrigger.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    settingsPanel.hidden = true;
    settingsTrigger.setAttribute("aria-expanded", "false");
  }

  settingsTrigger?.addEventListener("click", () => {
    if (settingsPanel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  settingsClose?.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !settingsPanel.hidden &&
      !settingsPanel.contains(event.target) &&
      !settingsTrigger.contains(event.target)
    ) {
      closePanel();
    }
  });
})();
