import MenuDrawer from './MenuDrawer'
import ProfileModal from './ProfileModal'
import Header from './Header'
import Footer from './Footer'

import { useState } from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  function openProfile() {
    setMenuOpen(false)
    setProfileOpen(true)
  }

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        onProfileClick={openProfile}
      />

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onProfileClick={openProfile}
      />

      {profileOpen && (
        <ProfileModal onClose={() => setProfileOpen(false)} />
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
