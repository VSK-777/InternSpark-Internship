import React from 'react';
import { Mail, Edit2, Trash2 } from 'lucide-react';

const EmployeeCard = ({ employee, onEdit, onDelete, style }) => {
  const fName = employee.firstName || 'U';
  const lName = employee.lastName || 'U';
  const initials = `${fName.charAt(0)}${lName.charAt(0)}`.toUpperCase();
  
  const colors = ['#fecaca', '#fef08a', '#bbf7d0', '#bfdbfe', '#e9d5ff', '#fed7aa'];
  const colorIndex = (fName.charCodeAt(0) + lName.charCodeAt(0)) % colors.length;
  const avatarBg = colors[colorIndex] || colors[0];

  return (
    <div className="glass-panel employee-card" style={style}>
      <div className="card-header">
        <div className="card-user-info">
          <div className="avatar-box" style={{ background: avatarBg }}>
            {initials}
          </div>
          <div>
            <h3 className="user-name">{employee.firstName} {employee.lastName}</h3>
            <span className="user-id-badge">
              ID: EMP-{employee.id ? employee.id.toString().padStart(3, '0') : '000'}
            </span>
          </div>
        </div>
      </div>

      <div className="user-email-row">
        <Mail size={16} />
        <span>{employee.email}</span>
      </div>

      <div className="card-actions">
        <button onClick={onEdit} className="btn-icon" title="Edit">
          <Edit2 size={18} />
        </button>
        <button onClick={onDelete} className="btn-icon danger" title="Delete">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
