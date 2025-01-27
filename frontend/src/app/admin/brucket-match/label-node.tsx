/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';

const LabelNode: React.FC<{ data: { label: string; onChangeLabel: (label: string) => void } }> = ({ data }) => {
  return (
    <div
      className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      {/* Input Handle */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-700" />
      
      {/* Label Input */}
      <input
        type="text"
        value={data.label}
        onChange={(e) => data.onChangeLabel(e.target.value)}
        className="w-full bg-transparent text-center text-lg font-medium text-gray-800 focus:outline-none"
      />
      
      {/* Output Handle */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-700" />
    </div>
  );
};

export default LabelNode;
