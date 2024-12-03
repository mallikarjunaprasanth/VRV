import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRole, updateRole, deleteRole } from '../../store/slices/rolesSlice';
import { Modal } from '../Common/Modal';
import { Tab } from '../Common/Tab';
import RoleForm from '../Common/RoleForm';
import { toast } from 'react-toastify';
import AssignPermissionsTab from './AssignPermissionsTab';
import PropTypes from 'prop-types';
import { themeColors } from '../../styles/theme';
import { BackIcon } from '../Common/BackIcon';
import { modules } from '../../assets/JsonFIles/JSON';

function RoleManagement() {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.roles);
  const users = useSelector(state => state.users.users);

  const permissions = useSelector(state => state.permissions.permissions);
  const [assignmentRole, setAssignmentRole] = useState({
    name: '',
    permissions: [],
    modules: [],
    rolesData: roles
  });

  const [editingRole, setEditingRole] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

 


  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(updateRole(editingRole));
      setEditingRole(null);
      setIsModalOpen(false);
      toast.success('Role updated successfully!');
    } catch {
      toast.error('Failed to update role');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    const isRoleInUse = users.some(user => user.roleId === roleId);

    if (isRoleInUse) {
      toast.error('This role cannot be deleted as it is assigned to one or more users');
      return;
    }

    setRoleToDelete(roleId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete !== null) {
      dispatch(deleteRole(roleToDelete));
      toast.success('Role deleted successfully');
    }
    setIsConfirmModalOpen(false);
    setRoleToDelete(null);
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(addRole(assignmentRole));
      setAssignmentRole({ name: '', permissions: [], modules: [], rolesData: roles });
      toast.success('Role created successfully!');
    } catch {
      toast.error('Failed to create role');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`p-6 max-w-4xl mx-auto ${themeColors.background.primary}`}>
      <div className='flex items-center justify-between mt-3'>
        <h2 className={`text-2xl font-bold mb-6 ${themeColors.text.primary}`}>
          Role Management
        </h2>
        <BackIcon />
      </div>

      <AssignPermissionsTab
        assignmentRole={assignmentRole}
        handleAddRole={handleAddRole}
        setAssignmentRole={setAssignmentRole}
        permissions={permissions}
        modules={modules}
        isLoading={isLoading}
        roles={roles}
        openEditModal={openEditModal}
        handleDeleteRole={handleDeleteRole}
      />

      {/* Edit Role Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingRole(null);
          setIsModalOpen(false);
        }}
      >
        <div className={themeColors.background.secondary}>
          <h3 className={`text-xl font-semibold mb-4 ${themeColors.text.primary}`}>
            Edit Role
          </h3>
          <RoleForm
            role={{ ...editingRole, rolesData: roles }}
            onSubmit={handleUpdateRole}
            onChange={setEditingRole}
            permissions={permissions}
            modules={modules}
            submitText="Update Role"
            isLoading={isLoading}
            readOnly={true}
          />
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <div className={`${themeColors.background.secondary} p-6 rounded-lg`}>
          <h3 className={`text-xl font-semibold mb-4 ${themeColors.text.primary}`}>
            Confirm Deletion
          </h3>
          <p className={`mb-6 ${themeColors.text.secondary}`}>
            Are you sure you want to delete this role?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className={`
                px-4 py-2 rounded-md
                ${themeColors.button.secondary}
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-400
              `}
            >
              No
            </button>
            <button
              onClick={confirmDeleteRole}
              className={`
                px-4 py-2 rounded-md
                ${themeColors.button.danger}
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-red-400
              `}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// PropTypes for the Modal component (if it's a custom component)
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

// PropTypes for the Tab component (if it's a custom component)
Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

// PropTypes for the RoleForm component (if it's a custom component)
RoleForm.propTypes = {
  role: PropTypes.shape({
    name: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string),
    modules: PropTypes.arrayOf(PropTypes.string),
    rolesData: PropTypes.array
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  submitText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

AssignPermissionsTab.defaultProps = {
  selectedRole: null,
  isLoading: false
};

export default RoleManagement;
