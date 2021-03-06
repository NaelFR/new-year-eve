import { Link, useLocation, matchPath } from 'react-router-dom';
import clsx from 'clsx';

export default function Nav() {
  const location = useLocation();

  // Find currently active item by checking
  // which tab route "matches" the current path
  const homeTabClassName = clsx('px-3 py-2 rounded-md text-sm font-medium', {
    'text-gray-300 hover:bg-gray-700 hover:text-white': !matchPath(
      location.pathname,
      '/',
    ).isExact,
    'bg-gray-900 text-white': matchPath(location.pathname, '/').isExact,
  });
  const forfeitTabClassName = clsx('px-3 py-2 rounded-md text-sm font-medium', {
    'text-gray-300 hover:bg-gray-700 hover:text-white': !matchPath(
      location.pathname,
      '/forfeits',
    ),
    'bg-gray-900 text-white': matchPath(location.pathname, '/forfeits'),
  });
  const adminTabClassName = clsx('px-3 py-2 rounded-md text-sm font-medium', {
    'text-gray-300 hover:bg-gray-700 hover:text-white': !matchPath(
      location.pathname,
      '/admin',
    ),
    'bg-gray-900 text-white': matchPath(location.pathname, '/admin'),
  });
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className={homeTabClassName}>
                  Home
                </Link>
                <Link to="/forfeits" className={forfeitTabClassName}>
                  Gages
                </Link>
                <Link to="/admin" className={adminTabClassName}>
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
