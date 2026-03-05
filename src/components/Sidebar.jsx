import './Sidebar.css'

const Sidebar = () => {
  const menuItems = [
    { icon: '📁', label: 'Files' },
    { icon: '💬', label: 'Chats' },
    { icon: '🔢', label: 'Calculator', active: true }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">P</div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-avatar">B</div>
        <span>benjaminas.petronis@gmail.com</span>
      </div>
    </aside>
  )
}

export default Sidebar
