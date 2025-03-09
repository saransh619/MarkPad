const editor = document.getElementById("editor");

// Function to toggle placeholder visibility
const togglePlaceholder = () => {
  const placeholder = editor.getAttribute("data-placeholder");
  if (editor.innerText.trim() === "" || editor.innerHTML === "<br>") {
    editor.setAttribute("data-placeholder-visible", "true");
    editor.innerHTML = `<span style="color: #666; font-style: italic;">${placeholder}</span>`;
  } else {
    editor.removeAttribute("data-placeholder-visible");
  }
};

// Function to render Markdown
const renderMarkdown = () => {
  const text = editor.innerText;

  // Convert Markdown checkboxes to HTML checkboxes
  const checkboxRegex = /\[(x| )\]/g;
  const newText = text.replace(checkboxRegex, (match, p1) => {
    const checked = p1 === "x" ? "checked" : "";
    return `<input type="checkbox" class="checkbox" ${checked}><span>`;
  });

  if (newText !== text) {
    editor.innerHTML = newText;
  }
};

// Load saved note
chrome.storage.sync.get("note", (data) => {
  if (data.note) {
    editor.innerHTML = data.note;
  }
  togglePlaceholder(); // Show placeholder if editor is empty
});

// Auto-save note and handle placeholder
editor.addEventListener("input", () => {
  if (editor.getAttribute("data-placeholder-visible")) {
    editor.innerHTML = ""; // Clear placeholder text when user starts typing
    editor.removeAttribute("data-placeholder-visible");
  }
  renderMarkdown(); // Render Markdown
  chrome.storage.sync.set({ note: editor.innerHTML });
});

// Handle placeholder on focus
editor.addEventListener("focus", () => {
  if (editor.getAttribute("data-placeholder-visible")) {
    editor.innerHTML = ""; // Clear placeholder text when editor is focused
    editor.removeAttribute("data-placeholder-visible");
  }
});

// Handle placeholder on blur
editor.addEventListener("blur", () => {
  togglePlaceholder(); // Show placeholder if editor is empty
});

togglePlaceholder();
