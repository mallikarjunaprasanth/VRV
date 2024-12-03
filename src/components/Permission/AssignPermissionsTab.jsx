import PropTypes from 'prop-types';
import RoleForm from '../Common/RoleForm';

function AssignPermissionsTab({
    assignmentRole,
    handleAddRole,
    setAssignmentRole,
    permissions,
    modules,
    isLoading,
    roles,
    selectedRole,
    openEditModal,
    handleDeleteRole
}) {
    return (
        <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <RoleForm
                    role={assignmentRole}
                    onSubmit={handleAddRole}
                    onChange={setAssignmentRole}
                    permissions={permissions}
                    modules={modules}
                    submitText="Create Role"
                    isLoading={isLoading}
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Existing Roles</h3>
                {roles.filter((x) => x.roleType != "Admin").map(role => (
                    <div
                        key={role.id}
                        className={`bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow
              ${selectedRole?.id === role.id ? 'ring-2 ring-blue-500' : ''}`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">{role.name}</h4>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                        {role.modules?.length || 0} modules
                                    </span>
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        {role.permissions?.length || 0} permissions
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2
                    ${selectedRole?.id === role.id
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                                    onClick={() => openEditModal(role)}
                                >
                                    {selectedRole?.id === role.id ? 'Currently Editing' : 'Edit'}
                                </button>
                                <button
                                    className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={() => handleDeleteRole(role.id)}
                                >
                                    Delete Role
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

AssignPermissionsTab.propTypes = {
    assignmentRole: PropTypes.shape({
        name: PropTypes.string.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.string),
        modules: PropTypes.arrayOf(PropTypes.string),
        rolesData: PropTypes.array
    }).isRequired,
    handleAddRole: PropTypes.func.isRequired,
    setAssignmentRole: PropTypes.func.isRequired,
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
    isLoading: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            roleType: PropTypes.string,
            modules: PropTypes.arrayOf(PropTypes.string),
            permissions: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    selectedRole: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    openEditModal: PropTypes.func.isRequired,
    handleDeleteRole: PropTypes.func.isRequired
};

export default AssignPermissionsTab; 