import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
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
      loadSignups()
    }
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
                borderRadius: "10px",
                padding: "20px",
                margin: "20px auto",
                maxWidth: "600px",
              }}
            >
              <h3>{game.arena}</h3>
              <p>{game.date} • {game.time}</p>
              <p>{game.cost}</p>
              <p>{roster.length} signed up • {game.spots}</p>
              <p>Level: {game.level}</p>

              <input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
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
                }}
              />

              <button
                onClick={() => handleJoin(game)}
                style={{
                  background: "#e53935",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Join Game
              </button>

              <div style={{ marginTop: "20px" }}>
                <h4>Roster</h4>

                {roster.length === 0 ? (
                  <p>No players signed up yet.</p>
                ) : (
                  <ol>
                    {roster.map((player) => (
                      <li key={player.id}>
                        {player.player_name}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
