import React from "react";

export function VideoEditorUI() {
  return (
    <div className="bg-emerald-100 rounded-xl p-4 w-96 shadow-lg">
      <div className="flex justify-between mb-2">
        <span className="font-bold">Premiere Pro Mock</span>
        <button className="px-2 py-1 bg-emerald-300 rounded">X</button>
      </div>
      <div className="flex flex-col gap-2">
        {/* Video preview */}
        <div className="bg-white border border-emerald-300 rounded h-32 flex items-center justify-center">
          <span className="text-emerald-400">Video Preview</span>
        </div>
        {/* Timeline */}
        <div className="bg-emerald-200 h-24 rounded p-2 flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="bg-white w-16 h-4 rounded"></div>
            <div className="bg-white w-12 h-4 rounded"></div>
            <div className="bg-white w-20 h-4 rounded"></div>
          </div>
          <span className="text-sm text-emerald-500">Timeline Tracks</span>
        </div>
        {/* Controls */}
        <div className="flex justify-between mt-2">
          <button className="bg-emerald-400 text-white py-1 px-3 rounded">Play</button>
          <button className="bg-emerald-400 text-white py-1 px-3 rounded">Pause</button>
          <button className="bg-emerald-400 text-white py-1 px-3 rounded">Export</button>
        </div>
      </div>
    </div>
  );
}
