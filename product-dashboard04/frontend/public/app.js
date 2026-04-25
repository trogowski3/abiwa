const list = document.getElementById("list");
const form = document.getElementById("form");

function load() {
  fetch("/api/items")
    .then(r => r.json())
    .then(data => {
      list.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        list.appendChild(li);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("/api/items", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: document.getElementById("name").value })
  }).then(() => load());
});

load();
