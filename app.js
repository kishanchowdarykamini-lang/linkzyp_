const API_URL = "https://linkzyp-9d99.onrender.com";

// Load token
const token = localStorage.getItem("token");
if (!token) {
    alert("Please login first!");
    window.location.href = "index.html"; // redirect to login page
}

function addLink() {
  const link = document.getElementById("linkInput").value.trim();

  if (!link) {
    alert("Please enter a link");
    return;
  }

  fetch(`${API_URL}/links/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ url: link })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Link added!");
        document.getElementById("linkInput").value = "";
        // Optionally reload links if you have a display section
        if (typeof loadLinks === "function") loadLinks();
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error("Network error:", err);
      alert("Unable to connect to backend");
    });
}

