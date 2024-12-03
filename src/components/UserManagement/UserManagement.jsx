import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../../store/slices/usersSlice';
import { FormElements } from '../Common/FormElements';
import { BackIcon } from '../Common/BackIcon';
import { themeColors } from '../../styles/theme';


function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const roles = useSelector(state => state.roles.roles);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roleId: '',
    status: 'active',
    password: ''   ,
    role: ''
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

    if (!user.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const formErrors = validateForm(newUser);

    if (Object.keys(formErrors).length === 0) {
      dispatch(addUser(newUser));
      setNewUser({
        name: '',
        email: '',
        roleId: '',
        status: 'active',
        password: '',
        role: ''
      });
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
      <div className={`${themeColors.background.modal} p-6 rounded-lg w-96`}>
        <h3 className={`text-xl font-bold mb-4 ${themeColors.text.primary}`}>Edit User</h3>
        <form 
          onSubmit={handleUpdateUser} 
          className="space-y-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleUpdateUser(e);
            }
          }}
        >
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
              type="password"
              placeholder="Password"
              value={editingUser.password || ''}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              error={errors.password}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className={`
                px-4 py-2 text-sm font-medium rounded-md
                ${themeColors.button.secondary}
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-400
              `}
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`
                px-4 py-2 text-sm font-medium rounded-md
                ${themeColors.button.danger}
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-red-400
              `}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`p-6 max-w-4xl mx-auto ${themeColors.background.primary}`}>
      <div className='flex items-center justify-between mt-3'>
        <h2 className={`text-3xl font-bold mb-6 ${themeColors.text.primary}`}>User Management</h2>
        <BackIcon />
      </div>
      <form onSubmit={handleAddUser} className={`${themeColors.background.secondary} p-6 rounded-lg shadow-md mb-8 space-y-4`}>
        <h3 className={`text-xl font-semibold mb-4 ${themeColors.text.primary}`}>Add New User</h3>
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
            value={newUser.roleId || ""}
            onChange={(e) => {
              const selectedRole = roles.find(role => role.id === Number(e.target.value));
              setNewUser({
                ...newUser,
                roleId: Number(e.target.value),
                role: selectedRole ? selectedRole.name : ''
              });
            }}
            options={roles.filter(role => role.name !== "Admin").map(role => ({
              value: role.id,
              label: role.name
            }))}
            placeholder="Select Role"
            error={errors.roleId}
          />
          <FormElements
            elementType="input"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            error={errors.password}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition duration-150 ease-in-out"
        >
          Add User
        </button>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className={`${themeColors.background.secondary} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`text-xl font-bold ${themeColors.text.primary}`}>{user.name}</h3>
                <p className={themeColors.text.secondary}>{user.email}</p>
                <p className={themeColors.text.muted}>Role: {user?.role}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 disabled:opacity-50 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => dispatch(deleteUser(user.id))}
                  disabled={user.role === "Admin" || user.disabled}
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