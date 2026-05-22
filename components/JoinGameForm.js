import { useState } from "react"
import { supabase } from "../lib/supabase"
export default function JoinGameForm({
  game,
  signups,
  loadGame,
  isOrganizer = false
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [playerType, setPlayerType] =
    useState("Skater")
const [joining, setJoining] = useState(false)
  const [confirmation, setConfirmation] =
  useState(null)
  async function handleJoin() {
  if (!name || !phone || !email) {
    alert("Please fill in all fields.")
    return
  }

  setJoining(true)

  const cleanEmail = email.trim().toLowerCase()

  const roster = signups || []

  const skaterRoster = roster.filter(
    (p) => p.player_type !== "Goalie"
  )

  const alreadySignedUp = roster.some(
    (p) =>
      p.email &&
      p.email.trim().toLowerCase() === cleanEmail
  )

  if (alreadySignedUp) {
    alert("You are already signed up.")
    setJoining(false)
    return
  }

  if (
    playerType === "Skater" &&
    skaterRoster.length >= game.max_players
  ) {
    alert("Game is full for skaters.")
    setJoining(false)
    return
  }

  const team1Count = roster.filter(
    (p) =>
      p.team === "Team 1" &&
      p.player_type !== "Goalie"
  ).length

  const team2Count = roster.filter(
    (p) =>
      p.team === "Team 2" &&
      p.player_type !== "Goalie"
  ).length

  let assignedTeam =
    team1Count <= team2Count
      ? "Team 1"
      : "Team 2"

  if (playerType === "Goalie") {
    const team1Goalie = roster.find(
      (p) =>
        p.team === "Team 1" &&
        p.player_type === "Goalie"
    )

    const team2Goalie = roster.find(
      (p) =>
        p.team === "Team 2" &&
        p.player_type === "Goalie"
    )

    if (!team1Goalie) {
      assignedTeam = "Team 1"
    } else if (!team2Goalie) {
      assignedTeam = "Team 2"
    } else {
      alert("Goalie spots are full.")
      setJoining(false)
      return
    }
  }

  const { error } = await supabase
    .from("game_signups")
    .insert([
      {
        game_id: game.id,
        game_name:
          game.arena +
          " - " +
          game.game_date +
          " " +
          game.game_time,
        player_name: name,
        phone,
        email: cleanEmail,
        player_type: playerType,
        team: assignedTeam,
        paid:
          playerType === "Goalie"
            ? true
            : false
      }
    ])

  if (error) {
    alert(error.message)
  } else {
    const displayTeam =
  assignedTeam === "Team 1"
    ? game.team1_name
    : game.team2_name

setConfirmation({
  arena: game.arena,
  date: game.game_date,
  time: game.game_time,
  team: displayTeam,
  playerType,
  playerName: name,
  organizerName: game.organizer_name,
  organizerEmail: game.organizer_email,
  cost: game.cost
})

    setName("")
    setPhone("")
    setEmail("")
    setPlayerType("Skater")

    await loadGame()
  }

  setJoining(false)
}
  return (
    <>
    <div
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid #334155",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        marginBottom: "30px"
      }}
    >
      <h2
        style={{
          color: "#facc15",
          marginBottom: "20px"
        }}
      >
        {isOrganizer ? "Add Player to Game" : "Join This Game"}
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <select
        value={playerType}
        onChange={(e) =>
          setPlayerType(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      >
        <option>Skater</option>
        <option>Goalie</option>
      </select>

      <button
  onClick={handleJoin}
  disabled={joining}
        style={{
          width: "100%",
          backgroundColor: "#facc15",
          color: "black",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {joining ? "Joining..." : "Join Game"}
      </button>
    </div>
{confirmation && (
  <div
    style={{
      marginTop: "20px",
      backgroundColor: "#dcfce7",
      padding: "20px",
      borderRadius: "12px",
      color: "#166534"
    }}
  >
    <h3 style={{ marginBottom: "12px" }}>
      Successfully Joined Game
    </h3>

    <p>
      <strong>Player:</strong>{" "}
      {confirmation.playerName}
    </p>

    <p>
      <strong>Team:</strong>{" "}
      {confirmation.team}
    </p>

    <p>
      <strong>Type:</strong>{" "}
      {confirmation.playerType}
    </p>

    <p>
      <strong>Date:</strong>{" "}
      {confirmation.date}
    </p>

    <p>
      <strong>Time:</strong>{" "}
      {confirmation.time}
    </p>

  {confirmation.playerType !== "Goalie" && (
  <>
    <p>
      <strong>Cost:</strong> $
      {confirmation.cost}
    </p>
{!isOrganizer && (
  <>
    <p style={{ marginTop: "12px" }}>
      Please send e-transfer to:
    </p>

    <strong>
      {confirmation.organizerEmail}
    </strong>
  </>
)}

</>
)}
  )
}
