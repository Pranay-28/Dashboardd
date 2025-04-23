import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddWidgetFormProps {
  onSubmit: (name: string, content: string, type: string) => void;
  onCancel: () => void;
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('chart');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onSubmit(name, content, type);
      setName('');
      setContent('');
    }
  };

  return (
    <div className="w-full p-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-800">Add New Widget</h3>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter widget name"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="chart">Chart</option>
            <option value="donut">Donut Chart</option>
            <option value="risk">Risk Assessment</option>
            <option value="security">Security Issues</option>
            <option value="graph">Graph</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            rows={3}
            placeholder="Enter widget content (use new lines for multiple items)"
            required
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Format: "Status (Count)" on each line.<br/>
            Example: "Connected (2)\nNot Connected (3)"
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Widget
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWidgetForm;