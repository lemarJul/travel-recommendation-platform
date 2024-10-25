export const element = document.querySelector(".navbar_links");

export function init() {
  const navLinks = element.querySelectorAll("a");
  const ACTIVE = "active";
  const resetActive = () => {
    navLinks.forEach((link) => {
      link.classList.remove(ACTIVE);
    });
  };
  const setActive = (el) => {
    el.classList.add(ACTIVE);
  };
  navLinks.forEach((el) => {
    el.addEventListener("click", () => {
      resetActive();
      setActive(el);
    });
  });
}
