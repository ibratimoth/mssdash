import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // When the component mounts, set sidebar state depending on screen size
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false) // closed on mobile
      } else {
        setIsSidebarOpen(true) // open on desktop
      }
    }

    handleResize() // run once at start
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet /> {/* renders Dashboard, Requests, Settings */}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
