import React, { useState, useEffect, useRef } from 'react';
import { DashboardData, Widget as WidgetType } from '../types';
import { Search, X } from 'lucide-react';

interface WidgetSearchProps {
  data: DashboardData;
  onSelectWidget: (widget: WidgetType) => void;
}

const WidgetSearch: React.FC<WidgetSearchProps> = ({ data, onSelectWidget }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<WidgetType[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Collect all widgets from all categories
  const getAllWidgets = (): WidgetType[] => {
    return data.categories.flatMap(category => 
      category.widgets.map(widget => ({
        ...widget,
        categoryName: category.name
      }))
    );
  };

  // Filter widgets based on search query
  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allWidgets = getAllWidgets();
    
    const filteredWidgets = allWidgets.filter(widget => 
      widget.name.toLowerCase().includes(query) || 
      widget.content.toLowerCase().includes(query)
    );
    
    setResults(filteredWidgets);
  }, [searchQuery, data]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search all widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => {
              setSearchQuery('');
              setResults([]);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm">
          {results.map((widget) => (
            <div
              key={widget.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectWidget(widget);
                setIsOpen(false);
                setSearchQuery('');
              }}
            >
              <div className="font-medium">{widget.name}</div>
              <div className="text-xs text-gray-500">
                {(widget as any).categoryName}
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && searchQuery && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-4 text-sm text-center text-gray-500">
          No widgets found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default WidgetSearch;