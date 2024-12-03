import PropTypes from 'prop-types';

export const RoleShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string),
  modules: PropTypes.arrayOf(PropTypes.string),
  roleType: PropTypes.string
};

export const ModuleShape = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}; 