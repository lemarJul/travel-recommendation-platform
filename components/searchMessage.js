const searchMessage = document.getElementById("searchMessage");

export function show(message) {
  searchMessage.textContent = message;
  searchMessage.style.display = "block";
  setTimeout(hide, 3000);
}

export function hide() {
  searchMessage.style.display = "none";
}
