import React, { useState, useEffect } from 'react';
import { DashboardData, Category as CategoryType, Widget as WidgetType } from '../types';
import Category from './Category';
import SearchBar from './SearchBar';
import { initialData } from '../data/initialData';
import { Layout, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<DashboardData>(initialData);
  const [timeRange, setTimeRange] = useState('7');

  // Generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Handle removing a widget
  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId)
          };
        }
        return category;
      });
      
      return {
        ...prevData,
        categories: updatedCategories
      };
    });
  };

  // Handle adding a widget
  const handleAddWidget = (categoryId: string, name: string, content: string, type: string) => {
    const newWidget: WidgetType = {
      id: generateId(),
      name,
      content,
      type
    };

    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget]
          };
        }
        return category;
      });
      
      return {
        ...prevData,
        categories: updatedCategories
      };
    });
  };

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    const filteredCategories = data.categories.map(category => {
      const filteredWidgets = category.widgets.filter(widget => 
        widget.name.toLowerCase().includes(query) || 
        widget.content.toLowerCase().includes(query)
      );
      
      return {
        ...category,
        widgets: filteredWidgets
      };
    }).filter(category => category.widgets.length > 0);
    
    setFilteredData({
      categories: filteredCategories
    });
  }, [searchQuery, data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Layout className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="1">Last 1 day</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>
              <button className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add Widget
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {filteredData.categories.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No widgets found matching your search.</p>
          </div>
        ) : (
          filteredData.categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onRemoveWidget={handleRemoveWidget}
              onAddWidget={handleAddWidget}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Dashboard;