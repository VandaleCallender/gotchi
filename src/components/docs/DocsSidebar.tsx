import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Shield, Cpu, LineChart, Settings } from 'lucide-react';
import { docsConfig } from './docsConfig';

const DocsSidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="font-pixel text-lg mb-8 text-primary-600 dark:text-primary-400">
        Documentation
      </div>
      
      <nav className="space-y-8">
        {docsConfig.map((section) => (
          <div key={section.title}>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
              {section.title}
            </h5>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/docs/${item.slug}`}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {item.icon === 'book' && <Book className="w-4 h-4 mr-2" />}
                    {item.icon === 'shield' && <Shield className="w-4 h-4 mr-2" />}
                    {item.icon === 'cpu' && <Cpu className="w-4 h-4 mr-2" />}
                    {item.icon === 'chart' && <LineChart className="w-4 h-4 mr-2" />}
                    {item.icon === 'settings' && <Settings className="w-4 h-4 mr-2" />}
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;