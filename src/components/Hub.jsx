import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hub.css'

const SAMPLE_PROJECTS = [
  {
    id: 1,
    name: 'New Project',
    created: '2h',
  },
  {
    id: 2,
    name: 'New Project',
    created: '2d',
  },
  {
    id: 3,
    name: 'On the Differential Geometry of Ideal Rocket Trajectories: A Foundational Manifold-Theoretic Framework for Optimal Propulsion in Vacuum',
    created: '9d',
  },
  {
    id: 4,
    name: 'Determinant of the i + j Matrix',
    created: '13d',
  },
]

const Hub = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [showImportMenu, setShowImportMenu] = useState(false)

  const filteredProjects = SAMPLE_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProjectClick = (project) => {
    navigate('/calculator')
  }

  return (
    <div className="hub">
      <div className="hub-header">
        <h1 className="hub-title">Your Projects</h1>
        <div className="hub-actions">
          <div className="hub-search">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>

          <div className="import-wrapper">
            <button
              className="import-btn"
              onClick={() => setShowImportMenu(!showImportMenu)}
            >
              Import
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showImportMenu && (
              <div className="import-dropdown">
                <button className="import-option" onClick={() => setShowImportMenu(false)}>
                  Import archive (.zip, .tar.gz)
                </button>
                <button className="import-option" onClick={() => setShowImportMenu(false)}>
                  Import Folder
                </button>
              </div>
            )}
          </div>

          <button className="new-btn" onClick={() => navigate('/calculator')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New
          </button>
        </div>
      </div>

      <div className="hub-table">
        <div className="table-header">
          <div className="table-col name-col">
            Name
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </div>
          <div className="table-col created-col">
            Created
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div className="table-body">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="table-row"
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project)}
            >
              <div className="table-col name-col">
                <div className="project-thumbnail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="1" />
                    <line x1="8" y1="7" x2="16" y2="7" />
                    <line x1="8" y1="11" x2="16" y2="11" />
                    <line x1="8" y1="15" x2="12" y2="15" />
                  </svg>
                </div>
                <span className="project-name">{project.name}</span>
              </div>
              <div className="table-col created-col">
                <span className="project-time">{project.created}</span>
                <button
                  className="project-menu"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="More options"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hub
