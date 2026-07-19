<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>API · Orbit · Zentrum</title>

<style>
  body { background:#000; color:#0f0; font-family:Consolas; margin:0; overflow:hidden; }
  #panel {
    position:fixed; top:0; left:0; width:320px; height:100%;
    background:#111; border-right:1px solid #333; padding:15px; overflow-y:auto;
  }
  h1, h2 { color:#6cf; }
  pre { background:#000; border:1px solid #333; padding:10px; }
  .ok { color:#00ff88; }
  .warn { color:#ffcc00; }
  .err { color:#ff4444; }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="./API.system.js"></script>
<script src="./API.ghost.js"></script>
<script src="./API.raw"></script>
<script src="./API-6E→6D.tech-Engine.html"></script>
<script src="./API-Fusion-Matrix.html"></script>
<script src="./API-Meta-Drift-Monitor6D.html"></script>
<script src="./API-NC²□.sync-Visualizer.html"></script>

<script>
// ------------------------------------------------------
// VERIFY.html LADEN
// ------------------------------------------------------
async function loadVerify(){
  try{
    const res = await fetch("./verify.html");
    const text = await res.text();

    const readyMatch = text.match(/PORT siedelt sich dieses Mal unter: (.*)/);
    const argMode = readyMatch ? readyMatch[1].trim() : "N/A";

    const metaMatch = text.match(/LES‑Meta‑Vector([\s\S]*?)ARG/);
    const meta = metaMatch ? metaMatch[1].trim() : "N/A";

    document.getElementById("verifyMode").textContent = argMode;
    document.getElementById("verifyMeta").textContent = meta;
    document.getElementById("verifyStatus").textContent = "verify.html geladen ✓";
  }catch(e){
    document.getElementById("verifyStatus").textContent = "verify.html fehlt ✗";
    document.getElementById("verifyMode").textContent = "N/A";
    document.getElementById("verifyMeta").textContent = "N/A";
  }
}
</script>

</head>

<body onload="loadVerify()">

<div id="panel">
  <h1>API · Orbit · Zentrum</h1>

  <h2>VERIFY‑Status</h2>
  <pre id="verifyStatus">Lade verify.html…</pre>

  <h2>ARG‑Modus</h2>
  <pre id="verifyMode">…</pre>

  <h2>LES‑Meta‑Vector</h2>
  <pre id="verifyMeta">…</pre>

  <h2>Tech‑Cluster</h2>
  <pre>
NC² / NC²□ / NC²octa² / NC²octa³
6E→6D.tech / 6D‑Baum.raw
12e allin/allout
Fusion‑Matrix
Meta‑Drift
Visualizer
  </pre>
</div>

<script>
// ------------------------------------------------------
// THREE.js + OrbitHeatmap
// ------------------------------------------------------
window.addEventListener("ghostReady", () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 6;

    // API Orbit‑Heatmap laden
    API_OrbitHeatmap(scene);

    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});
</script>

</body>
</html>
