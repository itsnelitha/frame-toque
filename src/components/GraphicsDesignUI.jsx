import React from "react";

export function GraphicsDesignUI() {
  return (
    <div className="bg-purple-100 rounded-xl p-4 w-96 shadow-lg">
      <div className="flex justify-between mb-2">
        <span className="font-bold">Photoshop Mock</span>
        <button className="px-2 py-1 bg-purple-300 rounded">X</button>
      </div>
      <div className="flex gap-2">
        {/* Toolbar */}
        <div className="flex flex-col gap-2 bg-purple-200 p-2 rounded w-16">
          <button>🖌 Brush</button>
          <button>✏️ Pencil</button>
          <button>🔲 Shape</button>
        </div>
        {/* Canvas */}
        <div className="flex-1 bg-white h-48 border border-purple-300 rounded flex items-center justify-center">
          <span className="text-purple-400">Canvas Area</span>
        </div>
        {/* Layers */}
        <div className="flex flex-col gap-1 bg-purple-200 p-2 rounded w-24">
          <span className="font-semibold">Layers</span>
          <div className="bg-white p-1 rounded text-sm">Background</div>
          <div className="bg-white p-1 rounded text-sm">Logo</div>
          <div className="bg-white p-1 rounded text-sm">Text</div>
        </div>
      </div>
      <button className="mt-2 w-full bg-purple-400 text-white py-1 rounded">
        Apply AI Suggestion
      </button>
    </div>
  );
}
