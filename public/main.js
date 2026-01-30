document.getElementById("reportForm").addEventListener("submit", async e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, location })
  });

  const data = await res.json();
  alert(data.message);
});
