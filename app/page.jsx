"use client";

import { useState } from "react";

export default function Home() {
  const [start, setStart] = useState("");
  const [addresses, setAddresses] = useState("");
  const [link, setLink] = useState("");

  const generarRuta = () => {
    const origen = encodeURIComponent(start);
    const destinos = addresses
      .split("\n")
      .map((dir) => dir.trim())
      .filter((dir) => dir.length > 0);

    if (destinos.length === 0 || !start) {
      alert("Completá el punto de partida y al menos una dirección.");
      return;
    }

    const destinoFinal = encodeURIComponent(destinos[destinos.length - 1]);
    const waypoints = destinos
      .slice(0, -1)
      .map((dir) => encodeURIComponent(dir))
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origen}&destination=${destinoFinal}&waypoints=${waypoints}&travelmode=driving`;

    setLink(url);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Optimizador de Rutas</h1>

      <label style={{ display: "block", marginTop: 20 }}>Punto de partida</label>
      <input
        type="text"
        placeholder="Ej: Carlos Tejedor y Alemania, Junín, Buenos Aires"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ display: "block", marginTop: 20 }}>Direcciones de entrega (una por línea)</label>
      <textarea
        rows={10}
        placeholder="Ej:\nAmeghino 163\nMalvinas Argentinas 305\n..."
        value={addresses}
        onChange={(e) => setAddresses(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <button onClick={generarRuta} style={{ marginTop: 20, padding: "10px 20px" }}>
        Generar link de ruta en Google Maps
      </button>

      {link && (
        <div style={{ marginTop: 20 }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Ver ruta en Google Maps
          </a>
        </div>
      )}
    </div>
  );
}