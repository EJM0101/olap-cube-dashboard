import React, { useState } from 'react';

export default function FilterPanel({ dimensions, onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (dimensionKey, selectedId) => {
    const updatedFilters = {
      ...selectedFilters,
      [dimensionKey]: selectedId
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Filtres par dimensions</h2>

      {Object.entries(dimensions).map(([key, rows]) => {
        if (!rows || rows.length === 0) return null;

        const headers = Object.keys(rows[0]);
        const idKey = headers[0];
        const displayKey = headers[1];

        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
              {key.replace('_', ' ')}
            </label>
            <select
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              onChange={(e) => handleFilterChange(key, e.target.value)}
              defaultValue=""
            >
              <option value="">-- Tous --</option>
              {rows.map((row, i) => (
                <option key={i} value={row[idKey]}>
                  {row[displayKey]}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}