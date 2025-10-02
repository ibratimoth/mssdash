import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, User, Bell, Shield, Palette } from 'lucide-react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Alert from '../components/UI/Alert'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    organization: 'Admin Dashboard Inc.'
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ]

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAlert({ type: 'success', message: 'Settings saved successfully!' })
      setLoading(false)
    }, 1000)
  }

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
              <Input
                label="Organization"
                name="organization"
                value={profileData.organization}
                onChange={handleProfileChange}
              />
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-slate-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">New Request Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when new requests are submitted</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-slate-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
                  <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-slate-600 rounded" />
              </div>
            </div>
          </div>
        )
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Security Settings</h3>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </div>
        )
      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Appearance Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="theme" value="light" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Light</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="theme" value="dark" className="mr-2" />
                    <span className="text-sm text-gray-700">Dark</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="theme" value="system" className="mr-2" />
                    <span className="text-sm text-gray-700">System</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </motion.div>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-slate-500 text-slate-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {renderTabContent()}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button onClick={handleSave} loading={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings