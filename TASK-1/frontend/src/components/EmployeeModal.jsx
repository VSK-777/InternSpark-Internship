import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { createEmployee, updateEmployee } from '../api';

const EmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({ firstName: employee.firstName, lastName: employee.lastName, email: employee.email });
    } else {
      setFormData({ firstName: '', lastName: '', email: '' });
    }
    setError('');
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await createEmployee(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{employee ? 'Edit Employee' : 'New Employee'}</h2>
          <button onClick={onClose} className="btn-icon modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input 
              id="firstName"
              type="text" 
              required
              className="form-input"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input 
              id="lastName"
              type="text" 
              required
              className="form-input"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              id="email"
              type="email" 
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default EmployeeModal;
