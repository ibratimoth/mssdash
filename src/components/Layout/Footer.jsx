const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          © 2024 Admin Dashboard. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-2 sm:mt-0">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer