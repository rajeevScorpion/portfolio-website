'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import { Project, Research, Academic } from '@/types'
import { Shell } from '@/components/ui'
import Link from 'next/link'

// Function to fetch projects from API
async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Function to fetch research from API
async function fetchResearch(): Promise<Research[]> {
  try {
    const response = await fetch('/api/research')
    if (!response.ok) {
      throw new Error('Failed to fetch research')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching research:', error)
    return []
  }
}

// Function to fetch academics from API
async function fetchAcademics(): Promise<Academic[]> {
  try {
    const response = await fetch('/api/academics')
    if (!response.ok) {
      throw new Error('Failed to fetch academics')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching academics:', error)
    return []
  }
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'research' | 'academics'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [research, setResearch] = useState<Research[]>([])
  const [academics, setAcademics] = useState<Academic[]>([])
  const [editingItem, setEditingItem] = useState<Project | Research | Academic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [projectsData, researchData, academicsData] = await Promise.all([
      fetchProjects(),
      fetchResearch(),
      fetchAcademics()
    ])
    setProjects(projectsData)
    setResearch(researchData)
    setAcademics(academicsData)
    setLoading(false)
  }

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      category: 'branding',
      cover: '',
      brief: '',
      images: [],
      image: '',
    }
    setEditingItem(newProject)
    setIsModalOpen(true)
  }

  const handleAddResearch = () => {
    const newResearch: Research = {
      id: Date.now().toString(),
      title: '',
      field: 'Generative AI',
      description: '',
      image: '',
      status: 'Planning',
      focus: '',
    }
    setEditingItem(newResearch)
    setIsModalOpen(true)
  }

  const handleAddAcademic = () => {
    const newAcademic: Academic = {
      id: Date.now().toString(),
      title: '',
      field: 'Computer Science',
      description: '',
      image: '',
      status: 'Draft',
      focus: '',
    }
    setEditingItem(newAcademic)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingItem(project)
    setIsModalOpen(true)
  }

  const handleEditResearch = (research: Research) => {
    setEditingItem(research)
    setIsModalOpen(true)
  }

  const handleEditAcademic = (academic: Academic) => {
    setEditingItem(academic)
    setIsModalOpen(true)
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await loadData()
        } else {
          alert('Failed to delete project')
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project')
      }
    }
  }

  const handleDeleteResearch = async (id: string) => {
    if (confirm('Are you sure you want to delete this research?')) {
      try {
        const response = await fetch(`/api/research?id=${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await loadData()
        } else {
          alert('Failed to delete research')
        }
      } catch (error) {
        console.error('Error deleting research:', error)
        alert('Failed to delete research')
      }
    }
  }

  const handleDeleteAcademic = async (id: string) => {
    if (confirm('Are you sure you want to delete this academic?')) {
      try {
        const response = await fetch(`/api/academics?id=${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await loadData()
        } else {
          alert('Failed to delete academic')
        }
      } catch (error) {
        console.error('Error deleting academic:', error)
        alert('Failed to delete academic')
      }
    }
  }

  const handleSaveItem = async (item: Project | Research | Academic) => {
    try {
      let endpoint = ''
      let method = 'POST'
      
      if ('brief' in item) {
        endpoint = '/api/projects'
        method = projects.some(p => p.id === item.id) ? 'PUT' : 'POST'
      } else if ('focus' in item && 'field' in item && item.field.includes('AI')) {
        endpoint = '/api/research'
        method = research.some(r => r.id === item.id) ? 'PUT' : 'POST'
      } else {
        endpoint = '/api/academics'
        method = academics.some(a => a.id === item.id) ? 'PUT' : 'POST'
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        await loadData()
        setIsModalOpen(false)
        setEditingItem(null)
      } else {
        alert('Failed to save item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Failed to save item')
    }
  }

  return (
    <Shell>
      {/* Admin Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0b0b0f]/70 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="cursor-pointer select-none text-sm font-semibold tracking-widest text-white">
            RK·Studio
          </Link>
          <nav className="flex items-center gap-1">
            <span className="rounded-xl px-3 py-2 text-sm text-gray-300 ring-1 ring-white/10">
              Admin Panel
            </span>
            <Link href="/" className="rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
              Back to Site
            </Link>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <div className="pt-20">
        <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Admin Dashboard</h1>
          <div className="flex items-center gap-4 mt-4">
            {[
              { key: 'projects', label: 'Projects' },
              { key: 'research', label: 'Research' },
              { key: 'academics', label: 'Academics' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'projects' | 'academics' | 'research')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#C7A86F] text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Item Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (activeTab === 'projects') handleAddProject();
              else if (activeTab === 'research') handleAddResearch();
              else if (activeTab === 'academics') handleAddAcademic();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">
              Add New {activeTab === 'projects' ? 'Project' : activeTab === 'research' ? 'Research' : 'Academic'}
            </span>
          </button>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading {activeTab}...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === 'projects' && projects.map((project) => (
              <div key={project.id} className="bg-[#1a1a1f] rounded-lg overflow-hidden border border-white/10">
                {project.cover && project.cover.trim() !== '' ? (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-3xl mb-2">🖼️</div>
                      <p className="text-xs">No Image</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-light mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">Category: {project.category}</p>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.brief}</p>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {activeTab === 'research' && research.map((item) => (
              <div key={item.id} className="bg-[#1a1a1f] rounded-lg overflow-hidden border border-white/10">
                {item.image && item.image.trim() !== '' ? (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-3xl mb-2">🔬</div>
                      <p className="text-xs">No Image</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-light mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">Field: {item.field}</p>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditResearch(item)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Edit Research"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResearch(item.id)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Delete Research"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {activeTab === 'academics' && academics.map((item) => (
              <div key={item.id} className="bg-[#1a1a1f] rounded-lg overflow-hidden border border-white/10">
                {item.image && item.image.trim() !== '' ? (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-3xl mb-2">📚</div>
                      <p className="text-xs">No Image</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-light mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">Field: {item.field}</p>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditAcademic(item)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Edit Academic"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAcademic(item.id)}
                      className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700 transition-all"
                      title="Delete Academic"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Item Edit Modal */}
      {isModalOpen && editingItem && (
        <ItemEditModal
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
        />
      )}
    </Shell>
  )
}

// Item Edit Modal Component
function ItemEditModal({ item, onSave, onCancel }: {
  item: Project | Research | Academic
  onSave: (item: Project | Research | Academic) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Project | Research | Academic>(item)
  const [uploading, setUploading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value || ''
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({
          ...prev,
          image: data.url
        }))
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isProject = 'brief' in formData
  const isResearch = 'focus' in formData && 'field' in formData && formData.field.includes('AI')
  const isAcademic = 'focus' in formData && 'field' in formData && !formData.field.includes('AI')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#0e0e13] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="sticky top-0 bg-[#0e0e13] border-b border-white/10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-light">
            {isProject ? 'Edit Project' : isResearch ? 'Edit Research' : 'Edit Academic'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
              required
            />
          </div>

          {isProject && (
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={(formData as Project).category}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
              >
                <option value="branding">Branding</option>
                <option value="3d">3D</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Field</label>
            <select
              name="field"
              value={('field' in formData ? formData.field : formData.category) || ''}
              onChange={handleInputChange}
              className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
            >
              {isProject && (
                <>
                  <option value="branding">Branding</option>
                  <option value="3d">3D</option>
                </>
              )}
              {isResearch && (
                <>
                  <option value="Generative AI">Generative AI</option>
                  <option value="AI Coding">AI Coding</option>
                  <option value="AI Integration in Design Curriculum">AI Integration in Design Curriculum</option>
                </>
              )}
              {isAcademic && (
                <>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Design">Design</option>
                  <option value="AI Research">AI Research</option>
                  <option value="Education">Education</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
            >
              {isProject && (
                <>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </>
              )}
              {isResearch && (
                <>
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planning">Planning</option>
                  <option value="Completed">Completed</option>
                </>
              )}
              {isAcademic && (
                <>
                  <option value="Published">Published</option>
                  <option value="In Review">In Review</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Draft">Draft</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <div className="space-y-2">
              <input
                type="url"
                name="image"
                value={'image' in formData ? formData.image : ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
                placeholder="https://example.com/image.jpg"
              />
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploading && <span className="text-sm text-gray-400">Uploading...</span>}
              </div>
              {'image' in formData && formData.image && formData.image.trim() !== '' && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                </div>
              )}
            </div>
          </div>

          {isProject && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Brief Description</label>
                <textarea
                  name="brief"
                  value={(formData as Project).brief}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F] h-24 resize-none"
                  required
                />
              </div>
            </>
          )}

          {!isProject && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={(formData as Research | Academic).description}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F] h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Focus Area</label>
                <input
                  type="text"
                  name="focus"
                  value={(formData as Research | Academic).focus}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
                  required
                />
              </div>

              {isAcademic && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Publication (Optional)</label>
                    <input
                      type="text"
                      name="publication"
                      value={(formData as Academic).publication || ''}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date (Optional)</label>
                    <input
                      type="text"
                      name="date"
                      value={(formData as Academic).date || ''}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A86F]"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Save {isProject ? 'Project' : isResearch ? 'Research' : 'Academic'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}