import { getTodayDate } from '@/app/utils/DateFunctions';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  task?: Task | null;
}

const EditTaskModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdate, task }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate.split('T')[0])
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      onUpdate({ id: task.id, title, dueDate });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border"
            placeholder="Task Title"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mb-4 p-2 border"
            min={getTodayDate()}
          />
          <div className="flex justify-end space-x-2">
            <Button type="submit" className="hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded">
              Update Task
            </Button>
            <Button className="text-white bg-red-500 hover:bg-red-600" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
