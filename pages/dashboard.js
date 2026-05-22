import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const [games, setGames] = useState([])

  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("is_active", true)
      .order("game_date", { ascending: true })

    if (!error) {
      setGames(data || [])
    }
  }

  async function closeGame(gameId) {
    const { error } = await supabase
      .from("games")
      .update({ is_active: false })
      .eq("id", gameId)

    if (!error) {
      loadGames()
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
          color: "#facc15"
        }}
      >
        Organizer Dashboard
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          marginBottom: "40px"
        }}
      >
        Manage your GTA Hockey Club games and players.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "50px"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid #1f2937",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            color: "#111827"
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>My Games</h2>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            View and manage your posted games.
          </p>

          <button
            style={{
              backgroundColor: "#facc15",
              color: "black",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            View Games
          </button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid #1f2937",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            color: "#111827"
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Post Game</h2>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Create a new pickup hockey game.
          </p>

          <button
            style={{
              backgroundColor: "#facc15",
              color: "black",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Create Game
          </button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid #1f2937",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            color: "#111827"
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Players</h2>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Manage players and attendance.
          </p>

          <button
            style={{
              backgroundColor: "#facc15",
              color: "black",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Manage Players
          </button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid #1f2937",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            color: "#111827"
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Payments</h2>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Track paid and unpaid players.
          </p>

          <button
            style={{
              backgroundColor: "#facc15",
              color: "black",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            View Payments
          </button>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h2 style={{ marginBottom: "20px", color: "white" }}>
          My Active Games
        </h2>

        {games.length === 0 ? (
          <p>No games found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px"
            }}
          >
            {games.map((game) => (
              <div
           
  key={game.id}
  style={styles.gameCard}
>
  <div style={styles.gameCardTop}>
    <div>
      <h2 style={styles.gameArena}>
        {game.arena}
      </h2>

      <div style={styles.gameDate}>
        {game.game_date} • {game.game_time}
      </div>
    </div>

    <div style={styles.skillBadge}>
      {game.level || "All Levels"}
    </div>
  </div>

  <div style={styles.teamMatchup}>
    {game.team1_name || "Team 1"} vs{" "}
    {game.team2_name || "Team 2"}
  </div>

  <div style={styles.gameStatsRow}>
    <div style={styles.statPill}>
      ${game.price || 0}
    </div>

    <div style={styles.statPill}>
      {game.max_players || 20} Spots
    </div>
  </div>

  <div style={styles.buttonRow}>
    <Link href={`/game/${game.id}`}>
      <button style={styles.manageButton}>
        Manage Game
      </button>
    </Link>

    <button
      onClick={() => closeGame(game.id)}
      style={styles.closeButton}
    >
      Close Game
    </button>
  </div>
</div>   
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
const styles = {
  gameCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "24px",
    color: "white"
  },

  gameCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  gameArena: {
    fontSize: "28px",
    marginBottom: "8px"
  },

  gameDate: {
    opacity: 0.8
  },

  skillBadge: {
    background: "#facc15",
    color: "#07152b",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "bold"
  },

  teamMatchup: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  gameStatsRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px"
  },

  statPill: {
    background: "rgba(255,255,255,0.12)",
    padding: "10px 16px",
    borderRadius: "999px"
  },

  buttonRow: {
    display: "flex",
    gap: "12px"
  },

  manageButton: {
    backgroundColor: "#facc15",
    color: "black",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  closeButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}
