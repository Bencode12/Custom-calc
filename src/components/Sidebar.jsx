import './Sidebar.css'

const Sidebar = () => {
  const menuItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      label: 'Dashboard'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="14" y2="17" />
        </svg>
      ),
      label: 'Calculator',
      active: true
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      label: 'Functions'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      label: 'Notes'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      label: 'History'
    }
  ]

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="logo" aria-hidden="true">P</div>
        <span className="logo-text">Prism Calc</span>
      </div>

      <div className="sidebar-section-label">Workspace</div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
            role="button"
            tabIndex={0}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-avatar">B</div>
        <span>benjaminas</span>
      </div>
    </aside>
  )
}

export default Sidebar
