import React from 'react';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  showAddButton = false,
  onAddClick,
  addButtonText = "Add New",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          )}
        </div>

        {showAddButton && onAddClick && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 dark:focus:ring-offset-gray-800 text-sm sm:text-base"
            onClick={onAddClick}
          >
            {addButtonText}
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
