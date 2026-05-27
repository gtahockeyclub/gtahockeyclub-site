import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"

export default function Home() {

  const [games, setGames] = useState([])

 useEffect(() => {

  async function loadGames() {

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("is_active", true)
      .order("game_date", { ascending: true })

    if (!error && data) {
      setGames(data)
    }
  }

  loadGames()

}, [])

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "700px",
          backgroundImage: 'url("/hero-hockey-bg.png.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "60px",
          boxSizing: "border-box"
        }}
      >

        <div
          style={{
            maxWidth: "650px"
          }}
        >

          <h1
            style={{
              fontSize: "96px",
              lineHeight: "0.9",
              margin: 0,
              fontWeight: "900"
            }}
          >

            <span style={{ color: "#D62828" }}>
              POST.
            </span>

            <br />

            <span style={{ color: "#0B1F3A" }}>
              CONNECT.
            </span>

            <br />

            <span style={{ color: "#F4B400" }}>
              PLAY.
            </span>

          </h1>

          <h2
            style={{
              fontSize: "36px",
              marginTop: "30px",
              marginBottom: "10px",
              color: "#07152b"
            }}
          >
            ONE HOCKEY COMMUNITY ACROSS THE GTA
          </h2>

          <p
            style={{
              fontSize: "20px",
              color: "#374151"
            }}
          >
            Built for players and organizers.
          </p>

        </div>

      </div>

      <div
        style={{
          padding: "60px 40px",
          background: "#f3f5f8"
        }}
      >

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "40px",
            color: "#07152b"
          }}
        >
          Upcoming Games
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >

          <div style={styles.gameCard}>

            <div style={styles.skillBadge}>
              Intermediate
            </div>

            <h3 style={styles.gameArena}>
              Chesswood Arena
            </h3>

            <p style={styles.gameInfo}>
              Friday • 9:00 PM
            </p>

            <p style={styles.gameInfo}>
              12 / 16 Skaters
            </p>

            <button
  style={styles.joinButton}
  onClick={() => alert("Game signup system coming next")}
>
  Join Game
</button>

          </div>

          <div style={styles.gameCard}>

            <div style={styles.skillBadge}>
              Beginner
            </div>

            <h3 style={styles.gameArena}>
              Scotiabank Pond
            </h3>

            <p style={styles.gameInfo}>
              Saturday • 7:30 PM
            </p>

            <p style={styles.gameInfo}>
              10 / 16 Skaters
            </p>

            <button style={styles.joinButton}>
              Join Game
            </button>

          </div>

        </div>

      </div>

    </>
  )
}

const styles = {

  gameCard: {
    background: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
  },

  skillBadge: {
    display: "inline-block",
    background: "#e53935",
    color: "white",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "18px"
  },

  gameArena: {
    margin: 0,
    marginBottom: "12px",
    color: "#07152b"
  },

  gameInfo: {
    color: "#667085",
    marginBottom: "10px"
  },

  joinButton: {
    width: "100%",
    background: "#e53935",
    color: "white",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px"
  }

}
