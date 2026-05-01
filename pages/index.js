import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [playerType, setPlayerType] = useState('Skater')
  const [team, setTeam] = useState('Team 1')
  const [signups, setSignups] = useState([])

  const games = [
    {
      arena: "Richmond Hill Arena",
      date: "Tuesday",
      time: "9:30 PM",
      cost: "$20",
      spots: "20 max",
      level: "Recreational",
    },
    {
      arena: "Canlan York",
      date: "Thursday",
      time: "10:00 PM",
      cost: "$25",
      spots: "22 max",
      level: "Intermediate",
    },
  ]

  const loadSignups = async () => {
    const { data } = await supabase
      .from("game_signups")
      .select("*")
      .order("created_at", { ascending: true })

    setSignups(data || [])
  }

  useEffect(() => {
    loadSignups()
  }, [])

  const handleJoin = async (game) => {
    if (!name || !phone || !email) {
      alert("Please enter your name, phone, and email.")
      return
    }

    const teamRoster = signups.filter(
      (p) => p.game_id === game.arena && p.team === team
    )

    const goalieExists = teamRoster.some(
      (p) => p.player_type === "Goalie"
    )

    if (playerType === "Goalie" && goalieExists) {
      alert("Goalie spot already taken for this team.")
      return
    }

    const { error } = await supabase.from("game_signups").insert([
      {
        game_id: game.arena,
        game_name: game.arena + " - " + game.date + " " + game.time,
        player_name: name,
        phone: phone,
        email: email,
        player_type: playerType,
        team: team,
      },
    ])

    if (error) {
      alert("Error joining game")
      console.log(error)
    } else {
      alert("You are signed up!")
      setName("")
      setPhone("")
      setEmail("")
      setPlayerType("Skater")
      setTeam("Team 1")
      loadSignups()
    }
  }

  const renderTeamRoster = (roster, teamName) => {
    const teamRoster = roster.filter((p) => p.team === teamName)

    const goalie = teamRoster.find((p) => p.player_type === "Goalie")
    const skaters = teamRoster.filter((p) => p.player_type !== "Goalie")

    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          background: "#f7f7f7",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "5px" }}>
          {teamName}
        </h4>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#777" }}>
          Goalie first 🥅
        </p>

        <ol style={{ paddingLeft: "22px" }}>
          {/* Goalie slot */}
          <li style={{ fontWeight: "bold" }}>
            {goalie
              ? `🥅 ${goalie.player_name} (Goalie)`
              : "🥅 Open Goalie Spot"}
          </li>

          {/* Skaters */}
          {skaters.map((player) => (
            <li key={player.id}>{player.player_name}</li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#07152b",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/GTAHOCKEYCLUBBANNER.png"
          alt="Banner"
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "block",
          }}
        />
      </div>

      <div style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Upcoming Games</h2>

        {games.map((game, index) => {
          const roster = signups.filter(
            (p) => p.game_id === game.arena
          )

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                margin: "20px auto",
                maxWidth: "800px",
              }}
            >
              <h3>{game.arena}</h3>
              <p>{game.date} • {game.time}</p>
              <p>{game.cost}</p>
              <p>{roster.length} signed up • {game.spots}</p>

              {/* FORM */}
              <div style={{ marginTop: "15px" }}>
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />

                <input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />

                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />

                <select
                  value={playerType}
                  onChange={(e) => setPlayerType(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                >
                  <option>Skater</option>
                  <option>Goalie</option>
                </select>

                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                >
                  <option>Team 1</option>
                  <option>Team 2</option>
                </select>

                <button
                  onClick={() => handleJoin(game)}
                  style={{
                    background: "#e53935",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  Join Game
                </button>
              </div>

              {/* ROSTER */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >
                {renderTeamRoster(roster, "Team 1")}
                {renderTeamRoster(roster, "Team 2")}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
