// App.js

import React, { useState } from 'react';
import './Transfer.css';

const employees = [
  { id: 1, name: 'Hp', status: 'used', itemId: 'qw09876' },
  { id: 2, name: 'Chair', status: 'slitely userd', itemId: 'kj76543' },
  { id: 3, name: 'Desktop', status: 'new', itemId: 'gd34567' },
  { id: 4, name: 'Marker', status: 'new', itemId: 'sd876545' },
];

function Transfer() {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleEmployeeSelect = (event) => {
    const { value } = event.target;
    if (selectedEmployees.includes(value)) {
      setSelectedEmployees(selectedEmployees.filter(emp => emp !== value));
    } else {
      setSelectedEmployees([...selectedEmployees, value]);
    }
  }

  return (
    <div className="container">
      <h1>Items List</h1>
      <ul className="employee-list">
        {employees.map(employee => (
          <li key={employee.id} className={selectedEmployees.includes(String(employee.id)) ? 'selected' : ''}>
            <label>
              <input type="checkbox" value={employee.id} onChange={handleEmployeeSelect}/>
              <span>{employee.name}</span>
              <span>{employee.status}</span>
              <span>{employee.itemId}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transfer;