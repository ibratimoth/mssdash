import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Plus } from 'lucide-react'
import RequestTable from '../components/RequestTable'
import SearchBar from '../components/SearchBar'
import Button from '../components/UI/Button'
import Alert from '../components/UI/Alert'
import { getRequests } from '../api'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await getRequests() // call your backend
      if (res.data && res.data.data) {
        const mappedRequests = res.data.data.map((req, index) => ({
          id: index + 1,
          name: req.full_name,
          email: req.email,
          organization: req.organisation, // matches backend
          services: req.service.map(s => s.name),
          date: req.createdAt,
        }))
        setRequests(mappedRequests)
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch requests' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    if (!searchTerm) {
      setFilteredRequests(requests)
      return
    }

    const filtered = requests.filter(request => {
      const searchLower = searchTerm.toLowerCase()
      const servicesText = Array.isArray(request.services) 
        ? request.services.join(' ').toLowerCase()
        : request.services.toLowerCase()
      
      return (
        request.name.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.organization.toLowerCase().includes(searchLower) ||
        servicesText.includes(searchLower)
      )
    })
    
    setFilteredRequests(filtered)
    setCurrentPage(1)
  }

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Organization', 'Services', 'Date'],
      ...filteredRequests.map(req => [
        req.id,
        req.name,
        req.email,
        req.organization,
        Array.isArray(req.services) ? req.services.join('; ') : req.services,
        req.date,
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'requests.csv'
    a.click()
    window.URL.revokeObjectURL(url)
    
    setAlert({ type: 'success', message: 'Requests exported successfully!' })
  }

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Requests</h1>
          <p className="text-gray-600">Manage and track all submitted requests</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Request
          </Button>
        </div>
      </motion.div>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name, email, organization, or services..."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <RequestTable 
          requests={paginatedRequests}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </div>
  )
}

export default Requests
