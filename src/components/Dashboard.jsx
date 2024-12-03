import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { themeColors } from '../styles/theme';
import { cards } from '../assets/JsonFIles/JSON';

function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const { roles } = useSelector(state => state.roles);

  const currentUserData = user;
  // Update isAdmin check
  const isAdmin = currentUserData?.user.role?.toLowerCase() === 'admin';

  const checkModule = (cards) => {
    if (!currentUserData) return false;
    if (isAdmin){
      return cards;
    }else{
      const userRole = roles.find(role => role.roleType === currentUserData.user.role);
      return cards.filter(card => userRole.modules.includes(card.module));
    }
  
  };

  return (
    <div className={`min-h-screen ${themeColors.background.primary}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${themeColors.text.primary}`}>
            Welcome to VRV Dashboard
          </h1>
         {isAdmin && <p className={themeColors.text.secondary}>
            Manage your resources and access all features from one place
          </p>}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {checkModule(cards)?.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className={`group block p-8 rounded-xl border ${themeColors.border.primary} 
                  ${themeColors.background.secondary} shadow-sm hover:shadow-xl 
                  transition duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg ${themeColors.background.primary} 
                    flex items-center justify-center transition-colors duration-200`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <h5 className={`text-xl font-bold tracking-tight ml-4 ${themeColors.text.primary}`}>
                    {card.title}
                  </h5>
                </div>
                <p className={`mb-4 min-h-[3rem] ${themeColors.text.secondary}`}>
                  {card.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                  <span className="text-sm font-semibold">Access Now</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;