import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import AddWidgetForm from './AddWidgetForm';

interface AddWidgetButtonProps {
  categoryId: string;
  onAddWidget: (categoryId: string, name: string, content: string, type: string) => void;
}

const AddWidgetButton: React.FC<AddWidgetButtonProps> = ({ categoryId, onAddWidget }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center min-h-[150px] transition-all duration-200 hover:shadow-lg relative">
      {isFormVisible ? (
        <AddWidgetForm 
          onSubmit={(name, content, type) => {
            onAddWidget(categoryId, name, content, type);
            setIsFormVisible(false);
          }}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <button 
          onClick={() => setIsFormVisible(true)}
          className="text-blue-500 hover:text-blue-700 transition-colors flex flex-col items-center p-4"
        >
          <PlusCircle className="w-8 h-8 mb-2" />
          <span className="text-sm font-medium">Add Widget</span>
        </button>
      )}
    </div>
  );
};

export default AddWidgetButton;