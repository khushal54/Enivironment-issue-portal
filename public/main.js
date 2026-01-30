// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(innerWidth, innerHeight);

const canvas = document.getElementById("canvas-container");
if(canvas) canvas.appendChild(renderer.domElement);

camera.position.z = 5;

function animate(){
 requestAnimationFrame(animate);
 renderer.render(scene, camera);
}
animate();

// Report Submit
document.getElementById("reportForm")?.addEventListener("submit", async e => {
 e.preventDefault();

 const data = {
  type: type.value,
  severity: severity.value,
  loc: loc.value,
  desc: desc.value
 };

 await fetch("/api/reports", {
  method: "POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify(data)
 });

 alert("Report Submitted!");
});

// Admin Load
async function loadReports(){
 const res = await fetch("/api/reports");
 const data = await res.json();

 document.getElementById("reports").innerHTML =
  data.map(r => `
   <div style="border:1px solid white;margin:10px;padding:10px">
    <h3>${r.type}</h3>
    <p>${r.loc}</p>
    <p>${r.desc}</p>
   </div>
  `).join("");
}
