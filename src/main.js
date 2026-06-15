import {
  Cesium3DTileset,
  Cesium3DTileStyle,
  Ion,
  Terrain,
  Viewer,
} from "cesium";

import "./style.css";

Ion.defaultAccessToken =
  import.meta.env.VITE_CESIUM_ION_TOKEN;

// Cesium-Karte mit Cesium World Terrain
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
  animation: false,
  timeline: false,
});

async function startApp() {
  try {
    const tileset =
      await Cesium3DTileset.fromIonAssetId(4943721);

    viewer.scene.primitives.add(tileset);
    const button =
  document.getElementById("toggleBuildings");

button.addEventListener("click", () => {
  tileset.show = !tileset.show;

  button.textContent = tileset.show
    ? "Gebäude ausblenden"
    : "Gebäude einblenden";
});const zoomButton =
  document.getElementById("zoomToBuildings");

zoomButton.addEventListener("click", async () => {
  await viewer.zoomTo(tileset);
});
    // Gelbe Testfarbe
    tileset.style = new Cesium3DTileStyle({
      color: 'color("yellow", 0.8)',
    });

    await viewer.zoomTo(tileset);
  } catch (error) {
    console.error(
      "Gebäudemodell konnte nicht geladen werden:",
      error,
    );
  }
}

startApp();