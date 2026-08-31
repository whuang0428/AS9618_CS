document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.querySelector("#printLesson");
  if (printButton) printButton.addEventListener("click", () => window.print());
});
