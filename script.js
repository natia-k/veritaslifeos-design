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
    // feature card mouse glow
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  // staggered reveal on scroll
  const revealCards = document.querySelectorAll(".feature-card");
  revealCards.forEach((card) => card.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const cards = [...revealCards];
          const staggerIndex = cards.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, staggerIndex * 90);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealCards.forEach((card) => observer.observe(card));
    const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.classList.add("reveal");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = (x - centerX) / centerX;
      const offsetY = (y - centerY) / centerY;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      card.style.setProperty("--rotate-y", `${offsetX * 3.5}deg`);
      card.style.setProperty("--rotate-x", `${offsetY * -3}deg`);

      card.style.setProperty("--icon-x", `${offsetX * 10}px`);
      card.style.setProperty("--icon-y", `${offsetY * 10}px`);

      card.style.setProperty("--content-x", `${offsetX * 8}px`);
      card.style.setProperty("--content-y", `${offsetY * 8}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rotate-y", `0deg`);
      card.style.setProperty("--rotate-x", `0deg`);
      card.style.setProperty("--icon-x", `0px`);
      card.style.setProperty("--icon-y", `0px`);
      card.style.setProperty("--content-x", `0px`);
      card.style.setProperty("--content-y", `0px`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const allCards = [...featureCards];
          const staggerIndex = allCards.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, staggerIndex * 110);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  featureCards.forEach((card) => observer.observe(card));
})();
