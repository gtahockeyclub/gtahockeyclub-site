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
    const { data, error } = await supabase
      .from("game_signups")
      .select("*")
      .order("created_at", { ascending: true })

    if (!error) {
      setSignups(data || [])
    }
  }

  useEffect(() => {
    loadSignups()
  }, [])

  const handleJoin = async (game) => {
    if (!name || !phone || !email) {
      alert("Please enter your name, phone, and email.")
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
      alert("There was an error joining the game.")
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
    const teamRoster = roster.filter((player) => player.team === teamName)
    const goalies = teamRoster.filter((player) => player.player_type === "Goalie")
    const skaters = teamRoster.filter((player) => player.player_type !== "Goalie")
    const orderedRoster = [...goalies, ...skaters]

    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          background: "#f7f7f7",
        }}
      >
        <h4 style={{ marginTop: 0, textAlign: "center" }}>{teamName}</h4>

        {orderedRoster.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No players yet</p>
        ) : (
          <ol style={{ paddingLeft: "22px" }}>
            {orderedRoster.map((player, index) => (
              <li key={player.id} style={{ marginBottom: "6px" }}>
                {index === 0 && player.player_type === "Goalie"
                  ? "🥅 "
                  : ""}
                {player.player_name}
                {player.player_type === "Goalie" ? " (Goalie)" : ""}
              </li>
            ))}
          </ol>
        )}
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
          alt="GTA Hockey Club Banner"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      <div style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px" }}>
          Upcoming Games
        </h2>

        {games.map((game, index) => {
          const roster = signups.filter((signup) => signup.game_id === game.arena)

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                margin: "20px auto",
                maxWidth: "800px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h3>{game.arena}</h3>
              <p>{game.date} • {game.time}</p>
              <p>{game.cost}</p>
              <p>{roster.length} signed up • {game.spots}</p>
              <p>Level: {game.level}</p>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <h4>Join this game</h4>

                <input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                />

                <input
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                />

                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                />

                <select
                  value={playerType}
                  onChange={(e) => setPlayerType(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Skater">Skater</option>
                  <option value="Goalie">Goalie</option>
                </select>

                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Team 1">Team 1</option>
                  <option value="Team 2">Team 2</option>
                </select>

                <button
                  onClick={() => handleJoin(game)}
                  style={{
                    background: "#e53935",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Join Game
                </button>
              </div>

              <div style={{ marginTop: "25px" }}>
                <h4 style={{ textAlign: "center" }}>Roster</h4>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {renderTeamRoster(roster, "Team 1")}
                  {renderTeamRoster(roster, "Team 2")}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
