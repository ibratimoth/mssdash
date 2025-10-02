import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, FileText, TrendingUp, Clock } from 'lucide-react'
import { getRequests } from '../api'

const Dashboard = () => {
  const stats = [
    { name: 'Total Requests', value: '2,651', change: '+4.75%', icon: FileText, color: 'bg-blue-500' },
    { name: 'Active Users', value: '1,234', change: '+54.02%', icon: Users, color: 'bg-green-500' },
    { name: 'Growth Rate', value: '12.5%', change: '+2.1%', icon: TrendingUp, color: 'bg-purple-500' },
    { name: 'Avg Response Time', value: '2.4h', change: '-12.3%', icon: Clock, color: 'bg-orange-500' },
  ]

  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        setLoading(true)
        const res = await getRequests()
        if (res.data && res.data.data) {
          // Map backend response to the shape the table expects
          const mappedRequests = res.data.data.map((req, index) => ({
            number: index + 1, // incremental number if needed
            name: req.full_name,
            email: req.email,
            service: req.service.map(s => s.name).join(', '),
            date: new Date(req.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
          }))
          setRecentRequests(mappedRequests)
        }
      } catch (error) {
        console.error('Failed to fetch recent requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentRequests()
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your requests.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-600">Loading recent requests...</td>
                </tr>
              ) : (
                recentRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
