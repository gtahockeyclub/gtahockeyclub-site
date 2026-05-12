import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const [games, setGames] = useState([])

  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    async function closeGame(gameId) {
  const { error } = await supabase
    .from("games")
    .update({ is_active: false })
    .eq("id", gameId)

  if (!error) {
    loadGames()
  }
}
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("game_date", { ascending: true })

    if (!error) {
      setGames(data || [])
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
                style={{
                  backgroundColor: "white",
                  color: "#111827",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
                }}
              >
                <h3
  style={{
    minHeight: "50px",
    marginBottom: "15px"
  }}
>
  {game.arena}
</h3>

                <p>
                  {game.game_date} • {game.game_time}
                </p>

                <p>
  <strong>Skill:</strong> {game.skill_level || "N/A"}
</p>

<p>
  <strong>Price:</strong> ${game.price || 0}
</p>

<p>
  <strong>Spots:</strong> {game.max_players || 0}
</p>



<Link href={`/game/${game.id}`}>
  <button
    style={{
      marginTop: "15px",
      backgroundColor: "#facc15",
      color: "black",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "block"
    }}
  >
    Manage Game
  </button>
</Link>
      <div
  style={{
    marginTop: "40px",
    borderTop: "1px solid #d1d5db",
    paddingTop: "30px"
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Current Players
  </h2>

  <div
    style={{
      display: "grid",
      gap: "12px"
    }}
  >
    {signups.length === 0 ? (
      <p>No players joined yet.</p>
    ) : (
      signups.map((player) => (
        <div
          key={player.id}
          style={{
            backgroundColor: "#f3f4f6",
            padding: "14px",
            borderRadius: "10px"
          }}
        >
          <strong>{player.name}</strong>

          <div style={{ marginTop: "5px" }}>
            {player.is_goalie ? "Goalie" : "Player"}
          </div>
        </div>
      ))
    )}
  </div>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
