document.getElementById("editor").addEventListener("input", function (e) {
  const text = this.innerText;

  // Convert Markdown checkboxes to HTML checkboxes
  const checkboxRegex = /\[(x| )\]/g;
  const newText = text.replace(checkboxRegex, (match, p1) => {
    const checked = p1 === "x" ? "checked" : "";
    return `<input type="checkbox" class="checkbox" ${checked}><span>`;
  });

  if (newText !== text) {
    this.innerHTML = newText;
  }
});
