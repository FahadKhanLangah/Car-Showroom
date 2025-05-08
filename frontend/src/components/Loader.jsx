import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-amber-500 border-dashed rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-amber-500 font-semibold">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
