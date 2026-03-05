import { useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHub = location.pathname === '/'

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="sidebar-top-left">
          {/* OpenAI-style flower logo */}
          <button className="logo-btn" aria-label="Home" onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 14.5 5.5 14.5 8.5C14.5 10.4 13.4 12 12 12C10.6 12 9.5 10.4 9.5 8.5C9.5 5.5 12 2 12 2Z" fill="currentColor" opacity="0.9"/>
              <path d="M22 12C22 12 18.5 14.5 15.5 14.5C13.6 14.5 12 13.4 12 12C12 10.6 13.6 9.5 15.5 9.5C18.5 9.5 22 12 22 12Z" fill="currentColor" opacity="0.9"/>
              <path d="M12 22C12 22 9.5 18.5 9.5 15.5C9.5 13.6 10.6 12 12 12C13.4 12 14.5 13.6 14.5 15.5C14.5 18.5 12 22 12 22Z" fill="currentColor" opacity="0.9"/>
              <path d="M2 12C2 12 5.5 9.5 8.5 9.5C10.4 9.5 12 10.6 12 12C12 13.4 10.4 14.5 8.5 14.5C5.5 14.5 2 12 2 12Z" fill="currentColor" opacity="0.9"/>
              <path d="M19.07 4.93C19.07 4.93 16.24 7.05 14.12 8.17C12.48 9.04 11.04 9.04 10.59 8.17C10.13 7.3 10.75 6.05 12.17 4.93C14.12 3.38 17.66 2.34 19.07 4.93Z" fill="currentColor" opacity="0.6"/>
              <path d="M19.07 19.07C19.07 19.07 16.95 16.24 15.83 14.12C14.96 12.48 14.96 11.04 15.83 10.59C16.7 10.13 17.95 10.75 19.07 12.17C20.62 14.12 21.66 17.66 19.07 19.07Z" fill="currentColor" opacity="0.6"/>
              <path d="M4.93 19.07C4.93 19.07 7.76 16.95 9.88 15.83C11.52 14.96 12.96 14.96 13.41 15.83C13.87 16.7 13.25 17.95 11.83 19.07C9.88 20.62 6.34 21.66 4.93 19.07Z" fill="currentColor" opacity="0.6"/>
              <path d="M4.93 4.93C4.93 4.93 7.05 7.76 8.17 9.88C9.04 11.52 9.04 12.96 8.17 13.41C7.3 13.87 6.05 13.25 4.93 11.83C3.38 9.88 2.34 6.34 4.93 4.93Z" fill="currentColor" opacity="0.6"/>
            </svg>
          </button>
        </div>
        <div className="sidebar-top-right">
          <button className="icon-btn" aria-label="New document">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M9 2v4h6V2" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${isHub ? '' : ''}`}
          onClick={() => navigate('/')}
        >
          All Projects
        </button>
        <button
          className={`nav-item ${isHub ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          Your Projects
        </button>
        <button
          className="nav-item"
          onClick={() => navigate('/')}
        >
          Shared with you
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">B</div>
        <span className="user-email">benjaminas.petronis@gmail.com</span>
        <button className="footer-status" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
