(function () {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-btn");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const productStage = document.getElementById("product-stage");
  const productWindow = document.getElementById("product-window");

  const modeContent = {
    personal: {
      eyebrow:
        "Private system for relationships, research, priorities, and execution",
      title:
        "Run life with\nclarity.\ncontrol.",
      subline:
        "A personal intelligence layer for trusted decisions, key relationships, research, and follow-through — unified in one deliberate interface.",
      priorityLabel: "Weekly priorities",
      priorityMetric: "3",
      priorityCopy: "critical priorities",
      priorityList: [
        ["Decision review", "Today"],
        ["Provider shortlist", "Live"],
        ["Escalation track", "2 pending"]
      ],
      researchLabel: "AI research",
      researchSub: "Signal quality",
      researchScore: "86",
      researchList: [
        ["3 vetted providers", "Verified"],
        ["2 reports summarized", "Fresh"]
      ],
      networkLabel: "Trusted network",
      networkLabel1: "Priority people",
      networkValue1: "12",
      networkLabel2: "Recent touchpoints",
      goalsLabel: "Goals",
      goalsCopy: "74% on track",
      goalsList: [
        ["Quarterly target", "On track"],
        ["Review cadence", "Weekly"]
      ],
      forumLabel: "Forum clusters",
      forumList: [
        ["Legal", "34 threads"],
        ["Career", "18 threads"],
        ["Family", "12 threads"]
      ],
      priorityProgress: "78%",
      researchProgress: "86%",
      goalsProgress: "74%"
    },
    business: {
      eyebrow:
        "Private operating layer for deal flow, executive networks, research, and KPIs",
      title:
        "Operate with\nclarity.\ncontrol.",
      subline:
        "A business intelligence layer for executive priorities, trusted relationships, market research, and measurable follow-through.",
      priorityLabel: "Executive priorities",
      priorityMetric: "5",
      priorityCopy: "active initiatives",
      priorityList: [
        ["Board prep", "Tomorrow"],
        ["Partner shortlist", "Live"],
        ["Hiring review", "3 open"]
      ],
      researchLabel: "Market research",
      researchSub: "Signal quality",
      researchScore: "91",
      researchList: [
        ["4 market briefs", "Updated"],
        ["2 vendor scans", "Live"]
      ],
      networkLabel: "Executive network",
      networkLabel1: "Key relationships",
      networkValue1: "18",
      networkLabel2: "Recent outreach",
      goalsLabel: "KPI tracking",
      goalsCopy: "81% on target",
      goalsList: [
        ["Quarterly KPI", "On track"],
        ["Review cadence", "Monday"]
      ],
      forumLabel: "Workstreams",
      forumList: [
        ["Pipeline", "22 items"],
        ["Hiring", "9 items"],
        ["Ops", "14 items"]
      ],
      priorityProgress: "82%",
      researchProgress: "91%",
      goalsProgress: "81%"
    }
  };

  function syncButtons(type, value) {
    const buttons = type === "theme" ? themeButtons : modeButtons;
    buttons.forEach((button) => {
      const match =
        type === "theme"
          ? button.dataset.theme === value
          : button.dataset.mode === value;

      button.classList.toggle("active", match);
    });
  }

  function setList(containerId, rows) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = rows
      .map(
        ([left, right]) =>
          `<div class="list__row"><span>${left}</span><span class="badge">${right}</span></div>`
      )
      .join("");
  }

  function setHeroTitle(text) {
    const heroTitle = document.getElementById("hero-title");
    const lines = text.split("\n");
    heroTitle.innerHTML = `${lines[0]}<span>${lines[1]}</span><span>${lines[2]}</span>`;
  }

  function applyModeContent(mode) {
    const c = modeContent[mode];

    document.getElementById("eyebrow-text").textContent = c.eyebrow;
    setHeroTitle(c.title);
    document.getElementById("hero-subline").textContent = c.subline;

    document.getElementById("module-priority-label").textContent = c.priorityLabel;
    document.getElementById("module-priority-metric").textContent = c.priorityMetric;
    document.getElementById("module-priority-copy").textContent = c.priorityCopy;
    document.getElementById("module-priority-progress").style.width = c.priorityProgress;

    document.getElementById("module-research-label").textContent = c.researchLabel;
    document.getElementById("module-research-sub").textContent = c.researchSub;
    document.getElementById("module-research-score").textContent = c.researchScore;
    document.getElementById("module-research-progress").style.width = c.researchProgress;

    document.getElementById("module-network-label").textContent = c.networkLabel;
    document.getElementById("network-label-1").textContent = c.networkLabel1;
    document.getElementById("network-value-1").textContent = c.networkValue1;
    document.getElementById("network-label-2").textContent = c.networkLabel2;

    document.getElementById("module-goals-label").textContent = c.goalsLabel;
    document.getElementById("module-goals-copy").textContent = c.goalsCopy;
    document.getElementById("module-goals-progress").style.width = c.goalsProgress;

    document.getElementById("module-forum-label").textContent = c.forumLabel;

    setList("module-priority-list", c.priorityList);
    setList("module-research-list", c.researchList);
    setList("module-goals-list", c.goalsList);
    setList("module-forum-list", c.forumList);
  }

  function setTheme(theme, save = true) {
    root.setAttribute("data-theme", theme);
    syncButtons("theme", theme);

    if (save) {
      localStorage.setItem("veritas-theme", theme);
    }
  }

  function setMode(mode, save = true) {
    root.setAttribute("data-mode", mode);
    syncButtons("mode", mode);
    applyModeContent(mode);

    if (save) {
      localStorage.setItem("veritas-mode", mode);
    }
  }

  const savedTheme = localStorage.getItem("veritas-theme");
  const savedMode = localStorage.getItem("veritas-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (prefersDark ? "dark" : "light"), false);
  setMode(savedMode || "personal", false);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.theme);
    });
  });

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setMode(button.dataset.mode);
    });
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  if (media.addEventListener) {
    media.addEventListener("change", (event) => {
      const storedTheme = localStorage.getItem("veritas-theme");
      if (!storedTheme) {
        setTheme(event.matches ? "dark" : "light", false);
      }
    });
  }

  if (window.innerWidth > 1180 && productStage && productWindow) {
    productStage.addEventListener("mousemove", (event) => {
      const rect = productStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateY = -8 + x * 7;
      const rotateX = 4 - y * 6;
      const translateX = x * 10;
      const translateY = y * -8;

      productWindow.style.transform =
        `perspective(1800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateX(${translateX}px) translateY(${translateY}px)`;
    });

    productStage.addEventListener("mouseleave", () => {
      productWindow.style.transform =
        "perspective(1800px) rotateY(-8deg) rotateX(4deg) translateX(0px) translateY(0px)";
    });
  }
})();
