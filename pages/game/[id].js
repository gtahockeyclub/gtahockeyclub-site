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
  const [arenas, setArenas] = useState([])
  const [user, setUser] = useState(null)

  const skaters = signups.filter(
    (player) => player.player_type !== "Goalie"
  )

  const goalies = signups.filter(
    (player) => player.player_type === "Goalie"
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

const { data: arenaData, error: arenaError } = await supabase
  .from("arenas")
  .select("*")
    
console.log("ARENA ERROR:", arenaError)
console.log("ARENA DATA:", arenaData)

setArenas(arenaData || [])

console.log("ARENA ERROR:", arenaError)
console.log("ARENAS:", arenaData)
  }

  const handleUpdateGame = async () => {
    const { error } = await supabase
      .from("games")
      .update({
        arena: game.arena,
        game_date: game.game_date,
        game_time: game.game_time,
        level: game.level,
        max_players: game.max_players,
        team1_name: game.team1_name,
        team2_name: game.team2_name,
        cost: game.cost
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
  const getArenaDetails = (arenaName) => {
  return arenas.find((a) => a.name === arenaName)
}
  
const arenaDetails = getArenaDetails(game?.arena)
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
         <div style={{ marginBottom: "30px" }}>
  <a
    href="/dashboard"
    style={{
      color: "#facc15",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px"
    }}
  >
    ← Back to Dashboard
  </a>
</div>
       
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
            {arenaDetails?.address && (
  <p>{arenaDetails.address}</p>
)}

{arenaDetails?.google_maps_url && (
  <a
    href={arenaDetails.google_maps_url}
    target="_blank"
    rel="noreferrer"
  >
    Open in Google Maps
  </a>
)}

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
          <strong>Price:</strong> ${game?.cost || 0}
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

            <select
  value={game?.arena || ""}
  onChange={(e) =>
    setGame({
      ...game,
      arena: e.target.value
    })
  }
  style={styles.input}
>
  <option value="">Select Arena</option>

  {arenas.map((arena) => (
    <option
      key={arena.uuid}
      value={arena.name}
    >
      {arena.name} - {arena.city}
    </option>
  ))}
</select>

            <input
              type="date"
              value={game?.game_date || ""}
              onChange={(e) =>
                setGame({
                  ...game,
                  game_date: e.target.value
                })
              }
              style={styles.input}
            />

            <input
              type="time"
              value={game?.game_time || ""}
              onChange={(e) =>
                setGame({
                  ...game,
                  game_time: e.target.value
                })
              }
              style={styles.input}
            />

            <select
              value={game?.level || ""}
              onChange={(e) =>
                setGame({
                  ...game,
                  level: e.target.value
                })
              }
              style={styles.input}
            >
              <option value="">Select Skill Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Low-Mid">Low-Mid</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>

            <input
              value={game?.max_players || ""}
              onChange={(e) =>
                setGame({
                  ...game,
                  max_players: e.target.value
                })
              }
              placeholder="# of Skaters"
              style={styles.input}
            />

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
              value={game?.cost || ""}
              onChange={(e) =>
                setGame({
                  ...game,
                  cost: e.target.value
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

const styles = {
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px"
  }
}
