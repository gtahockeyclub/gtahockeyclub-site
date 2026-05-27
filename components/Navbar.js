import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

  const [user, setUser] = useState(null)

  useEffect(() => {

    async function loadUser() {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      setUser(user)
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
        background: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        borderBottom: "1px solid #e5e7eb"
      }}
    >

      <div
        style={{
          fontSize: "28px",
          fontWeight: "900",
          color: "#07152b"
        }}
      >
        GTA Hockey Club
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
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

        {user && (
          <Link href="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

      </div>

      <div>

        {!user ? (

          <Link href="/login">

            <button
              style={styles.loginButton}
            >
              Login
            </button>

          </Link>

        ) : (

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
    color: "#07152b",
    textDecoration: "none",
    fontWeight: "bold"
  },

  loginButton: {
    background: "white",
    border: "2px solid #07152b",
    color: "#07152b",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  logoutButton: {
    background: "#dc2626",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  }

}
