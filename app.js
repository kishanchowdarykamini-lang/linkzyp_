const API_URL = "https://linkzyp-9d99.onrender.com";

function addLink() {
  const link = document.getElementById("linkInput").value;

  if (!link) {
    alert("Please enter a link");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: link })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Link added!");
      document.getElementById("linkInput").value = "";
    })
    .catch(err => console.log(err));
}
