import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {

    async function loadUser() {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      setUser(user)

      if (user) {

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        setProfile(profileData)
      }
    }

    loadUser()

  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <nav
      style={{
        width: "100%",
        background: "#07152b",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        GTA Hockey Club
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center"
        }}
      >

        <Link href="/" style={styles.link}>
          Home
        </Link>

        <Link href="/find-games" style={styles.link}>
          Find Games
        </Link>

        <Link href="/about" style={styles.link}>
          About
        </Link>

        {!user && (
          <Link href="/login" style={styles.link}>
            Login
          </Link>
        )}

        {profile?.role === "organizer" && (
          <Link href="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}

const styles = {

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px"
  },

  logoutButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}
