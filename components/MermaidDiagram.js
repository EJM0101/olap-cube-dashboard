'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

export default function MermaidDiagram({ chart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render("mermaid-diagram", chart);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Erreur Mermaid :", err);
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">📐 Modèle OLAP</h2>
      <div ref={containerRef} />
    </div>
  );
}