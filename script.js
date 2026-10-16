// Mobile navigation
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Business-area cards: clicking a card updates the detail panel.
const businessDetails = {
  customer: {
    title: "Customer Experience: Make every visit memorable",
    text: "Explore ways to make arrival, finding seats, ordering food, and enjoying the event easier and more welcoming for every fan."
  },
  marketing: {
    title: "Marketing: Build lasting fan connections",
    text: "Think about stories, events, social content, and community partnerships that could introduce new fans and keep existing fans interested."
  },
  technology: {
    title: "Technology: Make game day easier",
    text: "Consider useful digital experiences such as clear event information, mobile-friendly services, accessible navigation, or interactive fan activities."
  },
  operations: {
    title: "Operations: Help everything run smoothly",
    text: "Look at crowd flow, staffing, queues, communication, and how teams can coordinate services before, during, and after an event."
  },
  growth: {
    title: "Business Growth: Create sustainable value",
    text: "Explore ideas that benefit fans and the organization, then consider cost, feasibility, partnerships, and how results could be measured."
  }
};

const businessCards = document.querySelectorAll(".business-card");
const detailTitle = document.querySelector("#detailTitle");
const detailText = document.querySelector("#detailText");

businessCards.forEach((card) => {
  card.addEventListener("click", () => {
    const detail = businessDetails[card.dataset.area];
    businessCards.forEach((item) => item.setAttribute("aria-pressed", String(item === card)));
    detailTitle.textContent = detail.title;
    detailText.textContent = detail.text;
  });
});

// Hypothetical challenge questions: selecting one suggests a useful next step.
const questionTips = [
  "Ask a few younger fans what they enjoy, then compare their answers. Avoid assuming everyone wants the same thing.",
  "Map the fan journey from planning a visit to leaving the arena. Look for confusing, expensive, inaccessible, or time-consuming steps.",
  "Research which digital channels your audience already uses. Think about privacy, accessibility, and making the experience simple.",
  "Consider interactive activities, community events, behind-the-scenes content, or ways for fans to participate. Test a small idea first.",
  "Choose a measurable result, such as participation, satisfaction feedback, repeat engagement, or time saved. Compare results before and after a test."
];

const questionButtons = document.querySelectorAll(".question-item");
const questionDetail = document.querySelector("#questionDetail");

questionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    questionButtons.forEach((item) => item.setAttribute("aria-expanded", String(item === button)));
    questionDetail.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = "A way to explore it: ";
    const answer = document.createElement("span");
    answer.textContent = questionTips[index];

    questionDetail.append(heading, answer);
    questionButtons.forEach((item) => {
      item.querySelector("b").textContent = item === button ? "−" : "+";
    });
  });
});

// Student idea planner: create a summary from the user's own answers.
const ideaForm = document.querySelector("#ideaForm");
const ideaOutput = document.querySelector("#ideaOutput");
const summaryText = document.querySelector("#summaryText");
const copySummary = document.querySelector("#copySummary");

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = [
    { title: "Problem to solve", value: document.querySelector("#problem").value.trim() },
    { title: "Proposed solution", value: document.querySelector("#solution").value.trim() },
    { title: "How to measure success", value: document.querySelector("#measure").value.trim() }
  ];

  summaryText.replaceChildren();

  answers.forEach((answer) => {
    const section = document.createElement("section");
    section.className = "summary-section";

    const heading = document.createElement("h4");
    heading.textContent = answer.title;

    const paragraph = document.createElement("p");
    // textContent displays user-entered text safely instead of interpreting it as HTML.
    paragraph.textContent = answer.value;

    section.append(heading, paragraph);
    summaryText.append(section);
  });

  ideaOutput.hidden = false;
  ideaOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copySummary.addEventListener("click", async () => {
  const text = [...summaryText.querySelectorAll(".summary-section")]
    .map((section) => `${section.querySelector("h4").textContent}\n${section.querySelector("p").textContent}`)
    .join("\n\n");

  try {
    await navigator.clipboard.writeText(text);
    copySummary.textContent = "Copied!";
  } catch {
    // Fallback for browsers that block clipboard access.
    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "absolute";
    temporary.style.left = "-9999px";
    document.body.append(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    copySummary.textContent = copied ? "Copied!" : "Select and copy the summary";
  }

  window.setTimeout(() => {
    copySummary.textContent = "Copy summary";
  }, 2200);
});
