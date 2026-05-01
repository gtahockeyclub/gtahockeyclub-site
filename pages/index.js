import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [games, setGames] = useState([])
  const [signups, setSignups] = useState([])

  // Player form
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [playerType, setPlayerType] = useState('Skater')
  const [team, setTeam] = useState('Team 1')

  // Organizer form
  const [arena, setArena] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [cost, setCost] = useState('')
  const [level, setLevel] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(20)
  const [team1Name, setTeam1Name] = useState('Team 1')
  const [team2Name, setTeam2Name] = useState('Team 2')
  const [organizer, setOrganizer] = useState('')

  const loadGames = async () => {
    const { data } = await supabase
      .from("games")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true })

    setGames(data || [])
  }

  const loadSignups = async () => {
    const { data } = await supabase
      .from("game_signups")
      .select("*")

    setSignups(data || [])
  }

  useEffect(() => {
    loadGames()
    loadSignups()
  }, [])

  const handlePostGame = async () => {
    if (!arena || !date || !time) {
      alert("Please fill required fields")
      return
    }

    const { error } = await supabase.from("games").insert([
      {
        arena,
        game_date: date,
        game_time: time,
        cost,
        level,
        max_players: maxPlayers,
        team1_name: team1Name,
        team2_name: team2Name,
        organizer_name: organizer,
      },
    ])

    if (error) {
      alert("Error posting game")
      console.log(error)
    } else {
      alert("Game posted!")
      setArena('')
      setDate('')
      setTime('')
      setCost('')
      setLevel('')
      setTeam1Name('Team 1')
      setTeam2Name('Team 2')
      setOrganizer('')
      loadGames()
    }
  }

  const handleJoin = async (game) => {
    const roster = signups.filter((p) => p.game_id === game.id)

    if (roster.length >= game.max_players) {
      alert("Game full")
      return
    }

    const { error } = await supabase.from("game_signups").insert([
      {
        game_id: game.id,
        game_name: game.arena,
        player_name: name,
        phone,
        email,
        player_type: playerType,
        team,
      },
    ])

    if (!error) {
      setName('')
      setPhone('')
      setEmail('')
      loadSignups()
    }
  }

  const renderRoster = (roster, game, teamName) => {
    const players = roster.filter((p) => p.team === teamName)
    const goalie = players.find((p) => p.player_type === "Goalie")
    const skaters = players.filter((p) => p.player_type !== "Goalie")

    const displayName =
      teamName === "Team 1" ? game.team1_name : game.team2_name

    return (
      <div style={styles.teamBox}>
        <h4>{displayName}</h4>
        <ol>
          <li>{goalie ? "🥅 " + goalie.player_name : "🥅 Open"}</li>
          {skaters.map((p) => (
            <li key={p.id}>{p.player_name}</li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <h1>GTA Hockey Club</h1>

      {/* Organizer Form */}
      <div style={styles.card}>
        <h2>Post a Game</h2>

        <input placeholder="Arena" value={arena} onChange={(e) => setArena(e.target.value)} />
        <input placeholder="Day" value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
        <input placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
        <input placeholder="Max Players" value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} />
        <input placeholder="Team 1 Name" value={team1Name} onChange={(e) => setTeam1Name(e.target.value)} />
        <input placeholder="Team 2 Name" value={team2Name} onChange={(e) => setTeam2Name(e.target.value)} />
        <input placeholder="Organizer Name" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />

        <button onClick={handlePostGame}>Post Game</button>
      </div>

      {/* Games */}
      {games.map((game) => {
        const roster = signups.filter((p) => p.game_id === game.id)

        return (
          <div key={game.id} style={styles.card}>
            <h3>{game.arena}</h3>
            <p>{game.game_date} • {game.game_time}</p>
            <p>{game.team1_name} vs {game.team2_name}</p>

            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <select value={playerType} onChange={(e) => setPlayerType(e.target.value)}>
              <option>Skater</option>
              <option>Goalie</option>
            </select>

            <select value={team} onChange={(e) => setTeam(e.target.value)}>
              <option value="Team 1">{game.team1_name}</option>
              <option value="Team 2">{game.team2_name}</option>
            </select>

            <button onClick={() => handleJoin(game)}>Join</button>

            <div style={{ display: "flex", gap: "20px" }}>
              {renderRoster(roster, game, "Team 1")}
              {renderRoster(roster, game, "Team 2")}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  page: { padding: 20, fontFamily: "Arial" },
  card: { border: "1px solid #ccc", padding: 20, marginBottom: 20 },
  teamBox: { flex: 1, border: "1px solid #ddd", padding: 10 }
}
