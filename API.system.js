// ------------------------------------------------------
// NC² ALIGN → ORBIT HEATMAP KOPPLUNG
// ------------------------------------------------------

function API_OrbitHeatmap(scene) {

    const group = new THREE.Group();
    scene.add(group);

    // Orbit‑Tiles erzeugen
    API.geo.forEach((g, i) => {
        const geo = new THREE.PlaneGeometry(0.5, 0.5);
        const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0, 0, 0),
            transparent: true,
            opacity: 0.8
        });

        const tile = new THREE.Mesh(geo, mat);
        tile.position.set((i % 6) - 3, Math.floor(i / 6) - 2, 0);
        group.add(tile);
    });

    // NC²‑Align‑Daten
    const align = GHOST.nc2.align.default;

    // Live‑Update
    function updateOrbitHeatmap() {

        const axisNC2 = align.axis_nc2;     // □
        const axisOcta = align.axis_octa;   // octa³
        const pulse = align.pulse;          // NC² Pulse
        const error = align.error;          // NC² Error

        // Fraktal‑Level aus Achsen
        const fractal = API.achse.reduce((a,b)=>a+(parseInt(b.level||0)),0) / API.achse.length;

        // Drift‑Level
        const drift = API.achse.reduce((a,b)=>a+(parseInt(b.drift||0)),0) / API.achse.length;

        group.children.forEach((tile, i) => {

            // Farbe abhängig von NC² Align
            const baseHue = axisNC2 === "□" ? 0.6 : 0.3;   // Blau vs Grün
            const octaBoost = axisOcta === "octa³" ? 0.2 : 0;

            const hue = baseHue + octaBoost + fractal / 200;

            tile.material.color.setHSL(hue, 1, 0.5);

            // Pulsation abhängig von NC² Pulse
            tile.scale.set(
                1 + Math.sin(Date.now() / 300) * (pulse === "NC².pulse" ? 0.2 : 0),
                1 + Math.sin(Date.now() / 300) * (pulse === "NC².pulse" ? 0.2 : 0),
                1
            );

            // Warnung bei NC² Error
            if (error === "NC².error") {
                tile.material.color.setHSL(0, 1, 0.5); // Rot
                tile.material.opacity = 0.9;
            } else {
                tile.material.opacity = 0.8;
            }

            // Drift beeinflusst Rotation
            group.rotation.z = drift / 50;
        });
    }

    setInterval(updateOrbitHeatmap, 100);
}
