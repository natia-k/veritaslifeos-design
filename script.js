(() => {
  const root = document.documentElement;
  const settingsTrigger = document.getElementById("settingsTrigger");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsClose = document.getElementById("settingsClose");
  const settingButtons = document.querySelectorAll(".setting-btn, .mini-setting-btn");
  const featureCards = document.querySelectorAll(".feature-card");
  const bento = document.querySelector(".bento");
  const workspaceTrigger = document.getElementById("workspaceTrigger");

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
    } else {
      syncButtons(setting, root.getAttribute(`data-${setting}`));
    }
  });

  settingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applySetting(button.dataset.setting, button.dataset.value);
    });
  });

  function openPanel() {
    if (!settingsPanel || !settingsTrigger) return;
    settingsPanel.hidden = false;
    settingsTrigger.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    if (!settingsPanel || !settingsTrigger) return;
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
      settingsPanel &&
      settingsTrigger &&
      !settingsPanel.hidden &&
      !settingsPanel.contains(event.target) &&
      !settingsTrigger.contains(event.target)
    ) {
      closePanel();
    }
  });

  featureCards.forEach((card) => {
    card.classList.add("reveal");

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 100);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  featureCards.forEach((card) => revealObserver.observe(card));

  if (bento && workspaceTrigger) {
    let workspaceMode = false;

    workspaceTrigger.addEventListener("click", () => {
      workspaceMode = !workspaceMode;
      bento.classList.toggle("workspace-mode", workspaceMode);
      workspaceTrigger.setAttribute("aria-pressed", String(workspaceMode));

      featureCards.forEach((card) => {
        card.draggable = workspaceMode;
      });
    });
  }
})();
