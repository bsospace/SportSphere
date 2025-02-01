import React from "react";

interface LiveBadgeProps {
  title: string;
  children?: React.ReactNode;
}

const LiveBadge: React.FC<LiveBadgeProps> = ({ title, children }) => {
  return (
    <div className="relative p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
          </span>
          <p>Live</p>
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default LiveBadge;
