import React from "react";

const Loader: React.FC = () => (
  <div className="flex items-center justify-center my-8 space-x-2">
    <div
      className="inline-block w-10 h-10 rounded-full shadow-lg delay-50 bg-emerald-600 shadow-emerald-500/25 animate-pulse"
      role="status"
    />
  </div>
);

export default Loader;
