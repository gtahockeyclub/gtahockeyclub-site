import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [games, setGames] = useState([])
  const [signups, setSignups] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [playerType, setPlayerType] = useState('Skater')
  const [team, setTeam] = useState('Team 1')

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
      .order("created_at", { ascending: true })

    setSignups(data || [])
  }

  useEffect(() => {
    loadGames()
    loadSignups()
  }, [])

  const handleJoin = async (game) => {
    if (!name || !phone || !email) {
      alert("Please enter your name, phone, and email.")
      return
    }

    const roster = signups.filter((p) => p.game_id === game.id)

    if (roster.length >= game.max_players) {
      alert("This game is full.")
      return
    }

    const teamRoster = roster.filter((p) => p.team === team)
    const goalieExists = teamRoster.some((p) => p.player_type === "Goalie")

    if (playerType === "Goalie" && goalieExists) {
      alert("Goalie spot already taken for this team.")
      return
    }

    const { error } = await supabase.from("game_signups").insert([
      {
        game_id: game.id,
        game_name: game.arena + " - " + game.game_date + " " + game.game_time,
        player_name: name,
        phone,
        email,
        player_type: playerType,
        team,
      },
    ])

    if (error) {
      alert("Error joining game.")
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

  const getTeamDisplayName = (game, teamName) => {
    return teamName === "Team 1" ? game.team1_name : game.team2_name
  }

  const renderTeamRoster = (roster, teamName, displayName) => {
    const teamRoster = roster.filter((p) => p.team === teamName)
    const goalie = teamRoster.find((p) => p.player_type === "Goalie")
    const skaters = teamRoster.filter((p) => p.player_type !== "Goalie")

    return (
      <div style={styles.teamBox}>
        <h4 style={styles.teamTitle}>{displayName}</h4>

        <ol style={styles.rosterList}>
          <li style={styles.goalieLine}>
            {goalie ? `🥅 ${goalie.player_name} (Goalie)` : "🥅 Open Goalie Spot"}
          </li>

          {skaters.map((player) => (
            <li key={player.id} style={styles.playerLine}>
              {player.player_name}
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.bannerWrap}>
        <img
          src="/GTAHOCKEYCLUBBANNER.png"
          alt="GTA Hockey Club Banner"
          style={styles.banner}
        />
      </div>

      <section style={styles.intro}>
        <h1 style={styles.mainTitle}>Find Pickup Hockey Games Across the GTA</h1>
        <p style={styles.mainText}>
          Join recreational games, view rosters, and reserve your spot in seconds.
        </p>
      </section>

      <section style={styles.gamesSection}>
        <h2 style={styles.sectionTitle}>Upcoming Games</h2>

        {games.length === 0 ? (
          <p style={{ textAlign: "center" }}>No games posted yet.</p>
        ) : (
          games.map((game) => {
            const roster = signups.filter((p) => p.game_id === game.id)
            const spotsLeft = game.max_players - roster.length
            const isFull = spotsLeft <= 0

            return (
              <div key={game.id} style={styles.gameCard}>
                <div style={styles.gameHeader}>
                  <div>
                    <h3 style={styles.arena}>{game.arena}</h3>
                    <p style={styles.gameInfo}>{game.game_date} • {game.game_time}</p>
                    <p style={styles.gameInfo}>{game.cost} • {game.level}</p>
                    <p style={styles.gameInfo}>
                      {game.team1_name} vs {game.team2_name}
                    </p>
                  </div>

                  <div style={isFull ? styles.fullBadge : styles.openBadge}>
                    {isFull ? "FULL" : `${spotsLeft} spots left`}
                  </div>
                </div>

                <div style={styles.signupBox}>
                  <h4 style={styles.signupTitle}>Join this game</h4>

                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                  />

                  <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                  />

                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />

                  <select
                    value={playerType}
                    onChange={(e) => setPlayerType(e.target.value)}
                    style={styles.input}
                  >
                    <option>Skater</option>
                    <option>Goalie</option>
                  </select>

                  <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    style={styles.input}
                  >
                    <option value="Team 1">{game.team1_name}</option>
                    <option value="Team 2">{game.team2_name}</option>
                  </select>

                  <button
                    onClick={() => handleJoin(game)}
                    disabled={isFull}
                    style={isFull ? styles.disabledButton : styles.joinButton}
                  >
                    {isFull ? "Game Full" : "Join Game"}
                  </button>
                </div>

                <div style={styles.rosterHeader}>
                  <h4 style={styles.rosterTitle}>Roster</h4>
                  <p style={styles.rosterCount}>{roster.length} / {game.max_players} signed up</p>
                </div>

                <div style={styles.rosterGrid}>
                  {renderTeamRoster(roster, "Team 1", getTeamDisplayName(game, "Team 1"))}
                  {renderTeamRoster(roster, "Team 2", getTeamDisplayName(game, "Team 2"))}
                </div>
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    background: "#f3f5f8",
    color: "#07152b",
  },
  bannerWrap: {
    width: "100%",
    backgroundColor: "#07152b",
    display: "flex",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    maxWidth: "1200px",
    display: "block",
  },
  intro: {
    background: "#07152b",
    color: "white",
    textAlign: "center",
    padding: "34px 20px",
  },
  mainTitle: {
    fontSize: "34px",
    margin: "0 0 10px",
  },
  mainText: {
    fontSize: "18px",
    margin: 0,
    color: "#d7e3f5",
  },
  gamesSection: {
    padding: "40px 18px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "28px",
  },
  gameCard: {
    background: "white",
    borderRadius: "16px",
    padding: "24px",
    margin: "24px auto",
    maxWidth: "900px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    border: "1px solid #e1e5eb",
  },
  gameHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    alignItems: "flex-start",
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "16px",
  },
  arena: {
    fontSize: "26px",
    margin: "0 0 8px",
  },
  gameInfo: {
    margin: "4px 0",
    color: "#42526b",
  },
  openBadge: {
    background: "#e9f7ef",
    color: "#187a3b",
    padding: "8px 12px",
    borderRadius: "999px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  fullBadge: {
    background: "#fdecea",
    color: "#b42318",
    padding: "8px 12px",
    borderRadius: "999px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  signupBox: {
    background: "#f7f9fc",
    padding: "18px",
    borderRadius: "12px",
    marginTop: "20px",
  },
  signupTitle: {
    marginTop: 0,
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "11px",
    marginBottom: "10px",
    border: "1px solid #ccd3dd",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "15px",
  },
  joinButton: {
    width: "100%",
    background: "#e53935",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  disabledButton: {
    width: "100%",
    background: "#999",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "not-allowed",
    fontSize: "16px",
  },
  rosterHeader: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rosterTitle: {
    fontSize: "22px",
    margin: 0,
  },
  rosterCount: {
    margin: 0,
    color: "#667085",
  },
  rosterGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "14px",
  },
  teamBox: {
    border: "1px solid #d8dee8",
    borderRadius: "12px",
    padding: "16px",
    background: "#fbfcfe",
  },
  teamTitle: {
    textAlign: "center",
    margin: "0 0 12px",
    fontSize: "20px",
    color: "#07152b",
    fontWeight: "bold",
  },
  rosterList: {
    paddingLeft: "24px",
    marginBottom: 0,
  },
  goalieLine: {
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#07152b",
  },
  playerLine: {
    marginBottom: "7px",
  },
}
