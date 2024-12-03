import PropTypes from 'prop-types';
import { FormElements } from './FormElements';
import { themeColors } from '../../styles/theme';
import { toast } from 'react-toastify';

function RoleForm({
    role,
    onSubmit,
    onChange,
    permissions,
    modules,
    submitText = 'Submit',
    isLoading = false,
    readOnly=false
}) {
    const validateForm = () => {
        if (!role.name?.trim()) {
            return 'Role name is required';
        }
        if (!role.modules?.length) {
            return 'Please select at least one module';
        }
        if (!role.permissions?.length) {
            return 'Please select at least one permission';
        }
        return null;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4"  onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(e);
            }
          }}>
            <div>
                <label className={`block mb-2 ${themeColors.text.primary}`}>
                    Role Name
                </label>
                <input
                    type="text"
                    value={role.name}
                    readOnly={readOnly}
                    onChange={(e) => onChange({ ...role, name: e.target.value })}
                    className={`w-full p-2 rounded-md border ${themeColors.border.primary} 
                        ${themeColors.background.primary} ${themeColors.text.primary}`}
                    required
                />
            </div>

            <FormElements
                elementType="select"
                isMulti
                required
                label="Select Modules"
                value={role.modules}
                onChange={(selectedModules) => onChange({ ...role, modules: selectedModules })}
                options={modules}
                placeholder="Select modules..."
                className="w-full"
            />

            <div className="space-y-2">
                <h4 className="font-bold mb-2">Select Permissions:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    {permissions.map(permission => (
                        <FormElements
                            key={permission.id}
                            elementType="checkbox"
                            label={permission.description}
                            checked={role.permissions.includes(permission.name)}
                            onChange={(e) => {
                                const updatedPermissions = e.target.checked
                                    ? [...role.permissions, permission.name]
                                    : role.permissions.filter(p => p !== permission.name);
                                onChange({ ...role, permissions: updatedPermissions });
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <FormElements
                    elementType="button"
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded-md ${themeColors.button.primary}`}
                >
                    {isLoading ? 'Loading...' : submitText}
                </FormElements>
            </div>
        </form>
    );
}

RoleForm.propTypes = {
    role: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        roleType: PropTypes.string,
        modules: PropTypes.arrayOf(PropTypes.string),
        rolesData: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })),
        permissions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    permissions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    modules: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    submitText: PropTypes.string,
    isLoading: PropTypes.bool,
    readOnly: PropTypes.bool,
};

export default RoleForm; 