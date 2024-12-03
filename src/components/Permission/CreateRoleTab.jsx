import PropTypes from 'prop-types';
import { FormElements } from '../Common/FormElements';

function CreateRoleTab({ 
  creationRole, 
  setCreationRole, 
  handleAddRole, 
  roles, 
  handleDeleteRole 
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Create New Role</h3>
        <form onSubmit={handleAddRole} className="space-y-6">
          <div className="space-y-4">
            <FormElements
              elementType="input"
              type="text"
              label="Role Name"
              value={creationRole.name}
              onChange={(e) => setCreationRole({ ...creationRole, name: e.target.value })}
              placeholder="Enter role name..."
              className="w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-blue-600"
            >
              Create role
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {roles?.filter(role => role.roleType != 'Admin').map((data, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-lg font-bold">{data.name}</h4>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => handleDeleteRole(data.id)}
              >
                Delete Role
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CreateRoleTab.propTypes = {
  creationRole: PropTypes.shape({
    name: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string),
    modules: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setCreationRole: PropTypes.func.isRequired,
  handleAddRole: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      roleType: PropTypes.string
    })
  ).isRequired,
  handleDeleteRole: PropTypes.func.isRequired
};

export default CreateRoleTab; 