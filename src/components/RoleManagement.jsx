import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRole, updateRole, deleteRole } from '../store/slices/rolesSlice';

function RoleManagement() {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.roles.roles);
  const permissions = useSelector(state => state.permissions.permissions);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: []
  });

  const handleAddRole = (e) => {
    e.preventDefault();
    dispatch(addRole(newRole));
    setNewRole({ name: '', permissions: [] });
  };

  const handleUpdateRole = (e) => {
    e.preventDefault();
    dispatch(updateRole(editingRole));
    setEditingRole(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      
      {/* Add Role Form */}
      <form onSubmit={handleAddRole} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <h4 className="font-bold mb-2">Permissions:</h4>
          {permissions.map(permission => (
            <label key={permission.id} className="block">
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission.name)}
                onChange={(e) => {
                  const updatedPermissions = e.target.checked
                    ? [...newRole.permissions, permission.name]
                    : newRole.permissions.filter(p => p !== permission.name);
                  setNewRole({ ...newRole, permissions: updatedPermissions });
                }}
              />
              <span className="ml-2">{permission.description}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Role
        </button>
      </form>

      {/* Roles List */}
      <div className="space-y-4">
        {roles.map(role => (
          <div key={role.id} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{role.name}</h3>
              <div>
                <button
                  onClick={() => setEditingRole(role)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteRole(role.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Permissions:</h4>
              <ul className="list-disc ml-4">
                {role.permissions.map(permission => (
                  <li key={permission}>
                    {permissions.find(p => p.name === permission)?.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleManagement;