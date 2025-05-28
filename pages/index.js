import React, { useState } from 'react';
import Papa from 'papaparse';
import CubeView from '../components/CubeView';
import FilterPanel from '../components/FilterPanel';

export default function Home() {
  const [facts, setFacts] = useState([]);
  const [dimensions, setDimensions] = useState({});

  const handleFilesUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const isFactTable = file.name.toLowerCase().includes('fact');
          if (isFactTable) {
            setFacts(results.data);
          } else {
            const key = file.name.split('.')[0];
            setDimensions(prev => ({ ...prev, [key]: results.data }));
          }
        }
      });
    });
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Cube OLAP Interactif
      </h1>
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept=".csv"
          onChange={handleFilesUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        <FilterPanel dimensions={dimensions} />
        <div className="md:col-span-3">
          <CubeView facts={facts} dimensions={dimensions} />
        </div>
      </div>
    </div>
  );
}