import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  }
  
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }
  
  const Icon = icons[type]
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center p-4 border rounded-lg ${styles[type]} ${className}`}
      >
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Alert