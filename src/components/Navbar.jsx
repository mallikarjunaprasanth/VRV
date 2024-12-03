import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { toggleTheme } from '../store/slices/toggleTheme';
import { themeColors } from '../styles/theme';

function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const roles = useSelector(state => state.roles.roles) || [];
    const userRole = roles.find(role => role?.id === user?.roleId);
    const darkMode = useSelector(state => state.theme.darkMode);

    const dispatch = useDispatch();

    // Add state for mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Add theme toggle handler
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    // Add this inside the Desktop User Menu section, before the user/login buttons
    const themeToggleButton = (
        <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-lg ${themeColors.text.muted} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            aria-label="Toggle theme"
        >
            {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                    />
                </svg>
            )}
        </button>
    );

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow-sm ${themeColors.background.navbar} ${themeColors.border.primary}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo/Home Link */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                VRV
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {user && (
                                <>
                                    {userRole?.permissions?.includes('all') && (
                                        <>
                                            <Link
                                                to="/users"
                                                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                            >
                                                Users
                                            </Link>
                                            <Link
                                                to="/roles"
                                                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                            >
                                                Roles
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop User Menu */}
                    <div className="hidden sm:flex items-center space-x-4">
                        {themeToggleButton}
                        {user ? (
                            <div className="ml-3 relative flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-lg font-semibold">
                                            {user.name?.charAt(0)?.toUpperCase() || '👤'}
                                        </span>
                                    </div>
                                    <span className={`font-medium ${themeColors.text.primary}`}>{user.user.role}</span>
                                    <span className={themeColors.text.muted}>({user.user?.name})</span>
                                </div>
                                <button
                                    onClick={() => {
                                        toast.success('Logout Successfully', {
                                            theme: 'colored'
                                        });
                                        dispatch(logout());
                                        navigate('/login');
                                    }}
                                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className={`px-4 py-3 border-t ${themeColors.border.primary}`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-sm ${themeColors.text.muted}`}>
                                Theme
                            </span>
                            {themeToggleButton}
                        </div>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        {user && userRole?.permissions?.includes('all') && (
                            <>
                                <Link
                                    to="/users"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Users
                                </Link>
                                <Link
                                    to="/roles"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Roles
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Mobile User Menu */}
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="flex items-center px-4 space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-lg font-semibold">
                                        {user.name?.charAt(0)?.toUpperCase() || '👤'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-base font-medium text-gray-800">{user.user.role}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.user.name || 'No Role'}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        toast.success('Logout Successfully', {
                                            theme: 'colored'
                                        });
                                        dispatch(logout());
                                        navigate('/login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-4">
                                <Link
                                    to="/login"
                                    className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;