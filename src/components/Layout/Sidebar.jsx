import { NavLink } from 'react-router-dom'
import { Home, FileText, Settings, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Requests', href: '/requests', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/5 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white shadow-lg z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 lg:mt-8">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      // Close only on small screens
                      if (window.innerWidth < 1024) {
                        onClose()
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                        ? 'bg-slate-100 text-slate-900 border-r-2 border-slate-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </motion.aside>
    </>
  )
}

export default Sidebar