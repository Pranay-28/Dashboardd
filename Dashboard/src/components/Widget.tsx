import React from 'react';
import { Widget as WidgetType } from '../types';
import { X, PlusCircle, AlertCircle, BarChart, PieChart, Shield } from 'lucide-react';

interface WidgetProps {
  widget: WidgetType;
  onRemove: (id: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, onRemove }) => {
  // Different icon based on widget type
  const renderIcon = () => {
    switch (widget.type) {
      case 'chart':
        return <BarChart className="w-6 h-6 text-blue-500" />;
      case 'donut':
        return <PieChart className="w-6 h-6 text-green-500" />;
      case 'risk':
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case 'security':
        return <Shield className="w-6 h-6 text-red-500" />;
      case 'graph':
        return <BarChart className="w-6 h-6 text-gray-500" />;
      default:
        return <PlusCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  const renderContent = () => {
    // Convert content string to formatted content
    const contentLines = widget.content.split('\n');
    
    if (widget.type === 'chart' || widget.type === 'donut') {
      return (
        <div className="flex items-center justify-center h-24">
          {widget.type === 'donut' ? (
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-8 border-green-500 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">7455/8000</span>
              </div>
            </div>
          ) : (
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center text-blue-600">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs">Total</div>
              </div>
            </div>
          )}
          <div className="ml-4">
            {contentLines.map((line, index) => {
              const [status, count] = line.split('(');
              const cleanCount = count ? count.replace(')', '') : '';
              let color = 'bg-gray-200';
              
              if (status.trim().toLowerCase() === 'connected') color = 'bg-blue-500';
              if (status.trim().toLowerCase() === 'not connected') color = 'bg-gray-400';
              if (status.trim().toLowerCase() === 'failed') color = 'bg-red-500';
              if (status.trim().toLowerCase() === 'warning') color = 'bg-yellow-500';
              if (status.trim().toLowerCase() === 'passed') color = 'bg-green-500';
              if (status.trim().toLowerCase() === 'not available') color = 'bg-gray-400';
              
              return (
                <div key={index} className="flex items-center text-sm mb-1">
                  <span className={`w-3 h-3 ${color} rounded-full mr-2`}></span>
                  <span>{status.trim()}</span>
                  <span className="ml-1 text-gray-600">({cleanCount})</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (widget.type === 'risk' || widget.type === 'security') {
      // Render risk bar
      return (
        <div className="mt-2">
          {contentLines.map((line, index) => {
            const [level, count] = line.split('(');
            const cleanCount = count ? count.replace(')', '') : '';
            let color = 'bg-gray-200';
            
            if (level.trim().toLowerCase() === 'low') color = 'bg-green-500';
            if (level.trim().toLowerCase() === 'medium') color = 'bg-yellow-500';
            if (level.trim().toLowerCase() === 'high') color = 'bg-orange-500';
            if (level.trim().toLowerCase() === 'critical') color = 'bg-red-500';
            
            return (
              <div key={index} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className={`w-3 h-3 ${color} rounded-full mr-2`}></span>
                    <span>{level.trim()}</span>
                  </span>
                  <span className="text-gray-600">({cleanCount})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`${color} h-1.5 rounded-full`} 
                    style={{ width: `${Math.min(parseInt(cleanCount) * 5, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Default content display
      return (
        <div className="h-24 flex items-center justify-center text-gray-500 text-sm">
          {widget.content || 'No data available'}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {renderIcon()}
          <h3 className="font-medium ml-2 text-gray-800">{widget.name}</h3>
        </div>
        <button 
          onClick={() => onRemove(widget.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remove widget"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Widget;