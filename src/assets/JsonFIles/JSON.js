export const cards = [
    {
        title: 'User Management',
        description: 'Manage system users and their roles',
        link: '/users',
        icon: '👥',
        module: "user"
    },
    {
        title: 'Permissions',
        description: 'Configure roles and permissions',
        link: '/roles',
        icon: '🔑',
        module: "role"
    },

    {
        title: 'Products',
        description: 'View products',
        icon: '🛍️',
        module: "products",
        link: '/products',

    },
    {
        title: 'Reports',
        description: 'Generate and view reports',
        link: '/reports',
        icon: '📈',
        module: "reports"
    },
    {
        title: 'Settings',
        description: 'Configure system settings',
        link: '/settings',
        icon: '⚙️',
        module: "settings"
    },

];

export const modules = [
    { value: 'users', label: 'User Management' },
    { value: 'roles', label: 'Role Management' },
    { value: 'reports', label: 'Reports' },
    { value: 'settings', label: 'Settings' },
    { value: 'products', label: 'Products' },
];

export const loginUsers = [
    {
        id: 1,
        name: 'Prasanth',
        email: 'admin@example.com',
        password: 'admin123',
        roleId: 1,
        status: 'active',
        role: 'Admin',
        disabled: true,
    },
    {
        id: 2,
        name: 'Rajesh',
        email: 'editor@example.com',
        password: 'editor123',
        roleId: 2,
        status: 'active',
        role: 'Editor',
        disabled: true,

    },
    {
        id: 3,
        name: 'Babu',
        email: 'viewer@example.com',
        password: 'viewer123',
        roleId: 3,
        status: 'active',
        role: 'Viewer',
        disabled: true,

    },
]

export const items = [{
    id: 1,
    value: "Apple "
}, {
    id: 2,
    value: "Banana "
}, {
    id: 3,
    value: "Orange "
},
]
export const permissions = [
    { id: 1, name: 'read', description: 'Can read content' },
    { id: 2, name: 'write', description: 'Can create content' },
    { id: 3, name: 'edit', description: 'Can edit content' },
    { id: 4, name: 'delete', description: 'Can delete content' },
    { id: 5, name: 'all', description: 'Has all permissions' },
]

export const roles = [
    {
        id: 1,
        name: 'Admin',
        permissions: ['all'],
        roleType: 'Admin',
        modules: [ 'users', 'roles', 'reports', 'settings', 'products']
    },

    { id: 2, roleType: "Editor", name: 'Editor', permissions: ['read', 'write' ,"delete" ,"edit"], modules: [ 'reports', 'settings', 'products'] },
    { id: 3, roleType: "Viewer", name: 'Viewer', permissions: ['read'], modules: [  'reports', 'settings', 'products'] },
]
