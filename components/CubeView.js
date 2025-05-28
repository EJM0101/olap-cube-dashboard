import React from 'react';

export default function CubeView({ facts, dimensions }) {
  return (
    <div className="bg-white border p-4 rounded shadow min-h-[200px]">
      <h2 className="text-xl font-semibold mb-4">Vue du Cube</h2>
      {facts.length === 0 ? (
        <p className="text-gray-500">Aucune donnée de faits chargée</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(facts[0]).map((key, i) => (
                <th key={i} className="border px-3 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facts.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-t">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-3 py-1 border">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}