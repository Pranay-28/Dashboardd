import React from 'react';
import { Category as CategoryType } from '../types';
import Widget from './Widget';
import AddWidgetButton from './AddWidgetButton';

interface CategoryProps {
  category: CategoryType;
  onRemoveWidget: (categoryId: string, widgetId: string) => void;
  onAddWidget: (categoryId: string, name: string, content: string, type: string) => void;
}

const Category: React.FC<CategoryProps> = ({ 
  category, 
  onRemoveWidget,
  onAddWidget
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-3">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            onRemove={(widgetId) => onRemoveWidget(category.id, widgetId)} 
          />
        ))}
        <AddWidgetButton 
          categoryId={category.id}
          onAddWidget={onAddWidget}
        />
      </div>
    </div>
  );
};

export default Category;