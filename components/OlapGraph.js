'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function OlapGraph({ factName, dimensions, factKeys }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    svg.attr("viewBox", [0, 0, width, height]);

    const nodes = [{ id: factName, type: 'fact' }];
    const links = [];

    Object.keys(dimensions).forEach(dim => {
      const foreignKey = `id_${dim}`;
      if (factKeys.includes(foreignKey)) {
        nodes.push({ id: dim, type: 'dimension' });
        links.push({ source: factName, target: dim });
      }
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#ccc")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 25)
      .attr("fill", d => d.type === "fact" ? "#6366f1" : "#a7f3d0")
      .call(drag(simulation));

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("dy", 4);

    simulation.on("tick", () => {
      node.attr("cx", d => d.x).attr("cy", d => d.y);
      label.attr("x", d => d.x).attr("y", d => d.y);
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    });

    function drag(simulation) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [factName, dimensions, factKeys]);

  return (
    <div className="mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-indigo-700">📐 Modèle OLAP (graphe D3)</h2>
      <svg ref={ref} width="100%" height="400"></svg>
    </div>
  );
}