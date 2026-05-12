import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function GameDetails() {
  const router = useRouter()
  const { id } = router.query

  const [game, setGame] = useState(null)
  const [signups, setSignups] = useState([])

  const skaters = signups.filter(
    (player) => !player.is_goalie
  )

  const goalies = signups.filter(
    (player) => player.is_goalie
  )
const skaterSpotsLeft =
  (game?.max_players || 0) - skaters.length

const goalieSpotsLeft =
  1 - goalies.length
  useEffect(() => {
    if (id) {
      loadGame()
    }
  }, [id])

  async function loadGame() {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", id)
      .single()

    if (!error) {
      setGame(data)
    }

    const { data: signupData } = await supabase
      .from("signups")
      .select("*")
      .eq("game_id", id)

    setSignups(signupData || [])
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          color: "#facc15",
          marginBottom: "10px"
        }}
      >
        Game Details
      </h1>

      <p style={{ color: "#cbd5e1", marginBottom: "40px" }}>
        Game ID: {id}
      </p>

      <div
        style={{
          backgroundColor: "white",
          color: "#111827",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Game Information
        </h2>

        <p>
          <strong>Arena:</strong> {game?.arena}
        </p>

        <p>
          <strong>Date:</strong> {game?.game_date}
        </p>

        <p>
          <strong>Time:</strong> {game?.game_time}
        </p>

        <p>
          <strong>Skill Level:</strong>{" "}
          {game?.skill_level || "N/A"}
        </p>

        <p>
          <strong>Price:</strong> ${game?.price || 0}
        </p>

        <button
          style={{
            marginTop: "30px",
            backgroundColor: "#facc15",
            color: "black",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Join Game
        </button>

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
             <p style={{ marginBottom: "20px" }}>
  <strong>Skater Spots Left:</strong> {skaterSpotsLeft}
  {" | "}
  <strong>Goalie Spots Left:</strong> {goalieSpotsLeft}
</p> 

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px"
            }}
          >
            <div>
              <h3 style={{ marginBottom: "15px" }}>
                Skaters
              </h3>

              {skaters.length === 0 ? (
                <p>No skaters yet.</p>
              ) : (
                skaters.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      backgroundColor: "#f3f4f6",
                      padding: "12px",
                      borderRadius: "10px",
                      marginBottom: "10px"
                    }}
                  >
                    {player.name}
                  </div>
                ))
              )}
            </div>

            <div>
              <h3 style={{ marginBottom: "15px" }}>
                Goalies
              </h3>

              {goalies.length === 0 ? (
                <p>No goalies yet.</p>
              ) : (
                goalies.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      backgroundColor: "#f3f4f6",
                      padding: "12px",
                      borderRadius: "10px",
                      marginBottom: "10px"
                    }}
                  >
                    {player.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
