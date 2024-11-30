import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../store/slices/usersSlice';
import { FormElements } from './Common/FormElements';
import { BackIcon } from './Common/BackIcon';

function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const roles = useSelector(state => state.roles.roles);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roleId: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  const validateForm = (user) => {
    const newErrors = {};

    if (!user.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!user.roleId) {
      newErrors.roleId = 'Role is required';
    }

    return newErrors;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const formErrors = validateForm(newUser);

    if (Object.keys(formErrors).length === 0) {
      dispatch(addUser(newUser));
      setNewUser({ name: '', email: '', roleId: '', status: 'active' });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const formErrors = validateForm(editingUser);

    if (Object.keys(formErrors).length === 0) {
      dispatch(updateUser(editingUser));
      setEditingUser(null);
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const renderEditForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <div>
            <FormElements
              type="text"
              placeholder="Name"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              error={errors.name}
            />
          </div>
          <div>
            <FormElements
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              error={errors.email}
            />
          </div>
          <div>
            <FormElements
              type='select'
              value={editingUser.roleId}
              onChange={(e) => setEditingUser({ ...editingUser, roleId: Number(e.target.value) })}
              options={roles.map(role => ({
                value: role.id,
                label: role.name
              }))}
              placeholder="Select Role"
              error={errors.roleId}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className='flex items-center justify-between mt-3'>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 ">User Management</h2>
        <BackIcon />
      </div>
      <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormElements
            elementType="input"
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            error={errors.name}
          />
          <FormElements
            elementType="input"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            error={errors.email}
          />
          <FormElements
            elementType='select'
            value={newUser.roleId}
            onChange={(e) => setNewUser({ ...newUser, roleId: Number(e.target.value) })}
            options={roles.map(role => ({
              value: role.id,
              label: role.name
            }))}
            placeholder="Select Role"
            error={errors.roleId}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-green-600"
        >
          Add User
        </button>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500">Role: {roles.find(role => role.id === user.roleId)?.name}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                  onClick={() => dispatch(deleteUser(user.id))}
                  disabled={user.role === "Admin"}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingUser && renderEditForm()}
    </div>
  );
}

export default UserManagement;