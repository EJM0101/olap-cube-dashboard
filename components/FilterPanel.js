import React from 'react';

export default function FilterPanel({ dimensions }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      {Object.entries(dimensions).map(([key, rows]) => (
        <div key={key} className="mb-4">
          <label className="block font-medium text-sm text-gray-700 mb-1 capitalize">
            {key}
          </label>
          <select className="w-full border rounded px-2 py-1">
            {rows.map((row, i) => (
              <option key={i}>{Object.values(row)[1]}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}