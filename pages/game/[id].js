import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import TeamRoster from "../../components/TeamRoster"
import JoinGameForm from "../../components/JoinGameForm"

export default function GameDetails() {
  const router = useRouter()
  const { id } = router.query

  const [game, setGame] = useState(null)
  const [signups, setSignups] = useState([])
  const [user, setUser] = useState(null)

  const skaters = signups.filter(
  (player) =>
    player.player_type !== "Goalie"
)

const goalies = signups.filter(
  (player) =>
    player.player_type === "Goalie"
)

  const skaterSpotsLeft =
    (game?.max_players || 0) - skaters.length

  const goalieSpotsLeft =
    1 - goalies.length
  const isOrganizer =
  game?.organizer_id === user?.id
useEffect(() => {
  checkUser()
}, [])

async function checkUser() {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  setUser(user)
}
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
      .from("game_signups")
      .select("*")
      .eq("game_id", id)

    setSignups(signupData || [])
  }

const handleUpdateGame = async () => {
  const { error } = await supabase
    .from("games")
    .update({
      team1_name: game.team1_name,
      team2_name: game.team2_name,
      price: game.price
    })
    .eq("id", game.id)

  if (error) {
    alert(error.message)
  } else {
    alert("Game updated successfully.")
    loadGame()
  }
}

const handleRemovePlayer = async (
  playerId,
  playerName
  
const handleRemovePlayer = async (
  playerId,
  playerName
) => {

  const confirmRemove = confirm(
    `Remove ${playerName} from the roster?`
  )

  if (!confirmRemove) return

  const { error } = await supabase
    .from("game_signups")
    .delete()
    .eq("id", playerId)

  if (error) {
    alert("Error removing player.")
    console.log(error)
  } else {
    alert("Player removed.")
    loadGame()
  }

}
const handleMovePlayer = async (
  player,
  gameRoster
) => {

  const newTeam =
    player.team === "Team 1"
      ? "Team 2"
      : "Team 1"

  if (player.player_type === "Goalie") {

    const goalieExistsOnNewTeam =
      gameRoster.some(
        (p) =>
          p.team === newTeam &&
          p.player_type === "Goalie" &&
          p.id !== player.id
      )

    if (goalieExistsOnNewTeam) {
      alert(
        "Cannot move goalie. The other team already has a goalie."
      )
      return
    }
  }

  const { error } = await supabase
    .from("game_signups")
    .update({ team: newTeam })
    .eq("id", player.id)

  if (error) {
    alert("Error moving player.")
    console.log(error)
  } else {
    alert(`${player.player_name} moved.`)
    loadGame()
  }

}

const handleTogglePaid = async (
  player
) => {

  if (player.player_type === "Goalie") {
    alert(
      "Goalies do not pay for pickup hockey."
    )
    return
  }

  const response = await supabase
    .from("game_signups")
    .update({
      paid: !player.paid
    })
    .eq("id", player.id)
    .select()

  const error = response.error

  if (error) {
    alert(error.message)
    console.log(error)
  } else {
    loadGame()
  }

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
{isOrganizer && (
  <div
    style={{
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #d1d5db"
    }}
  >
    <h3
      style={{
        marginBottom: "20px",
        color: "#111827"
      }}
    >
      Edit Game Information
    </h3>

    <input
      value={game?.team1_name || ""}
      onChange={(e) =>
        setGame({
          ...game,
          team1_name: e.target.value
        })
      }
      placeholder="Team 1 Name"
      style={styles.input}
    />

    <input
      value={game?.team2_name || ""}
      onChange={(e) =>
        setGame({
          ...game,
          team2_name: e.target.value
        })
      }
      placeholder="Team 2 Name"
      style={styles.input}
    />

    <input
      value={game?.price || ""}
      onChange={(e) =>
        setGame({
          ...game,
          price: e.target.value
        })
      }
      placeholder="Price"
      style={styles.input}
    />

    <button
      onClick={handleUpdateGame}
      style={{
        marginTop: "15px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save Changes
    </button>
  </div>
)}
       <JoinGameForm
  game={game}
  signups={signups}
  loadGame={loadGame}
/>

        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid #d1d5db",
            paddingTop: "30px"
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Team Rosters
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
            <TeamRoster
              displayName={game?.team1_name || "Team 1"}
              roster={signups}
              teamName="Team 1"
              isOrganizer={isOrganizer}
              handleRemovePlayer={handleRemovePlayer}
              handleMovePlayer={handleMovePlayer}
              handleTogglePaid={handleTogglePaid}
            />

            <TeamRoster
              displayName={game?.team2_name || "Team 2"}
              roster={signups}
              teamName="Team 2"
              isOrganizer={isOrganizer}
              handleRemovePlayer={handleRemovePlayer}
              handleMovePlayer={handleMovePlayer}
              handleTogglePaid={handleTogglePaid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
