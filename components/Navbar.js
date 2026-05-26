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
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}
      >

        <img
          src="/gtahockey-logo-clean.png.png"
          alt="GTA Hockey Club"
          style={{
            width: "70px",
            height: "70px",
            objectFit: "contain"
          }}
        />

        <div>

          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "900",
              letterSpacing: "1px"
            }}
          >
            <span style={{ color: "#0B1F3A" }}>GTA </span>
            <span style={{ color: "#D62828" }}>HOCKEY </span>
            <span style={{ color: "#0B1F3A" }}>CLUB</span>
          </h2>

          <p
            style={{
              margin: 0,
              color: "#667085",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "2px"
            }}
          >
            POST. CONNECT. PLAY.
          </p>

        </div>

      </div>

      <div
        style={{
          display: "flex",
          gap: "28px",
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

        {profile?.role === "organizer" && (
          <Link href="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}
      >

        {!user && (
          <Link href="/login">
            <button
              style={{
                background: "white",
                border: "2px solid #07152b",
                color: "#07152b",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

        <button
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Join Community
        </button>

      </div>

    </nav>
  )
}

const styles = {

  link: {
    color: "#07152b",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "15px"
  }

}
