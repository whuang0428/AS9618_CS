const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#lesson-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".table-scroll").forEach((scroller) => {
  scroller.addEventListener("scroll", () => scroller.classList.add("has-scrolled"), { once: true });
});
