document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.querySelector("#printLesson");
  if (printButton) printButton.addEventListener("click", () => window.print());

  for (const library of document.querySelectorAll(".v2-material-library")) {
    const rail = library.querySelector("[data-material-rail]");
    const slides = [...library.querySelectorAll(":scope .v2-visual")];
    const position = library.querySelector("[data-material-position]");
    if (!rail || slides.length < 2) continue;

    const updatePosition = () => {
      const index = Math.max(0, Math.min(slides.length - 1, Math.round(rail.scrollLeft / Math.max(1, rail.clientWidth))));
      if (position) position.textContent = `${index + 1} / ${slides.length}`;
    };
    const move = (direction) => rail.scrollBy({ left: rail.clientWidth * direction, behavior: "smooth" });
    library.querySelector("[data-material-prev]")?.addEventListener("click", () => move(-1));
    library.querySelector("[data-material-next]")?.addEventListener("click", () => move(1));
    rail.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();
  }
});
