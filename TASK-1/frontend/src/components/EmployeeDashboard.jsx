import React, { useState, useEffect } from 'react';
import { Users, Plus, Loader2 } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../api';
import EmployeeCard from './EmployeeCard';
import EmployeeModal from './EmployeeModal';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        alert('Failed to delete employee.');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveSuccess = () => {
    handleModalClose();
    fetchEmployees();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-title-wrapper">
          <div className="header-icon-box">
            <Users size={28} />
          </div>
          <div>
            <h1 className="header-title">Team Directory</h1>
            <p className="header-subtitle">Manage your workforce seamlessly</p>
          </div>
        </div>
        <button onClick={handleAdd} className="btn btn-primary">
          <Plus size={18} /> Add Employee
        </button>
      </header>

      {loading ? (
        <div className="loading-container">
          <Loader2 size={40} className="lucide-spin" />
        </div>
      ) : error ? (
        <div className="glass-panel error-panel">
          <p>{error}</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="glass-panel empty-state-panel">
          <Users size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No employees found</h3>
          <p className="empty-state-subtitle">Get started by adding a new team member.</p>
        </div>
      ) : (
        <div className="employee-grid">
          {employees.map((emp, index) => (
            <EmployeeCard 
              key={emp.id} 
              employee={emp} 
              onEdit={() => handleEdit(emp)} 
              onDelete={() => handleDelete(emp.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <EmployeeModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          employee={editingEmployee} 
          onSuccess={handleSaveSuccess} 
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
