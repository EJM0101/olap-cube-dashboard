import React, { useState } from 'react';
import Papa from 'papaparse';
import CubeView from '../components/CubeView';
import FilterPanel from '../components/FilterPanel';
import MermaidDiagram from '../components/MermaidDiagram'; // nouveau composant

export default function Home() {
  const [facts, setFacts] = useState([]);
  const [dimensions, setDimensions] = useState({});
  const [filteredFacts, setFilteredFacts] = useState([]);
  const [mermaidSchema, setMermaidSchema] = useState('');
  const [factTableName, setFactTableName] = useState('');

  const handleFilesUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const isFact = file.name.toLowerCase().startsWith("fact_");
          const baseName = file.name.split('.')[0];

          if (isFact) {
            setFacts(results.data);
            setFilteredFacts(results.data);
            setFactTableName(baseName);
          } else {
            setDimensions(prev => ({ ...prev, [baseName]: results.data }));
          }

          setTimeout(generateSchemaModel, 500);
        }
      });
    });
  };

  const handleFilterChange = (filters) => {
    const newFacts = facts.filter(row => {
      return Object.entries(filters).every(([dimensionKey, selectedId]) => {
        if (!selectedId) return true;
        const idColumn = `id_${dimensionKey}`;
        return String(row[idColumn]) === String(selectedId);
      });
    });
    setFilteredFacts(newFacts);
  };

  const generateSchemaModel = () => {
    if (!facts || facts.length === 0) return;

    const dimensionsOnly = Object.keys(dimensions).filter(name => name !== factTableName);
    const factKeys = Object.keys(facts[0]);

    let schema = `graph TD\n  A[Table de faits: ${factTableName || "Faits"}]`;

    dimensionsOnly.forEach(dim => {
      const foreignKey = `id_${dim}`;
      if (factKeys.includes(foreignKey)) {
        const dimLabel = `B_${dim}`;
        schema += ` --> ${dimLabel}[Dimension: ${dim}]`;
        schema += `\n  ${dimLabel} -->|clé primaire: id| A`;
      }
    });

    setMermaidSchema(schema);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        📊 OLAP Cube Dashboard
      </h1>

      <div className="bg-white p-6 rounded shadow-md mb-8">
        <p className="text-md mb-2">
          Bienvenue dans le tableau de bord OLAP interactif. Cette application permet d'explorer dynamiquement des données organisées selon une modélisation multidimensionnelle (étoile ou flocon), typique des entrepôts de données.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>📁 Importez vos fichiers <strong>.csv</strong> représentant la table de faits (commençant par <code>fact_</code>) et les tables de dimensions.</li>
          <li>🔗 Le système détecte automatiquement les clés de jointure (ex: <code>id_station_police</code>).</li>
          <li>🎛️ Utilisez les filtres dynamiques pour explorer vos données par dimension.</li>
          <li>🧱 Une modélisation Mermaid du cube OLAP est générée automatiquement.</li>
        </ul>
      </div>

      <div className="mb-6">
        <input
          type="file"
          multiple
          accept=".csv"
          onChange={handleFilesUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <FilterPanel dimensions={dimensions} onFilterChange={handleFilterChange} />
        <div className="md:col-span-3">
          <CubeView facts={filteredFacts} dimensions={dimensions} />
        </div>
      </div>

      {mermaidSchema && (
        <MermaidDiagram chart={mermaidSchema} />
      )}
    </div>
  );
}