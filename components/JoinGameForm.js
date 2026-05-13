import { useState } from "react"
import { supabase } from "../lib/supabase"
export default function JoinGameForm({
  game,
  signups,
  loadGame
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [playerType, setPlayerType] =
    useState("Skater")
const [joining, setJoining] = useState(false)
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
    alert("Successfully joined game!")

    setName("")
    setPhone("")
    setEmail("")
    setPlayerType("Skater")

    await loadGame()
  }

  setJoining(false)
}
  return (
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
        Join This Game
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
  )
}
