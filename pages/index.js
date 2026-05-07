import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ORGANIZER_CODE = 'GTA2026'

export default function Home() {
  const [games, setGames] = useState([])
  const [arenas, setArenas] = useState([])
  const [signups, setSignups] = useState([])
  const [waitlist, setWaitlist] = useState([])
  const [showPostForm, setShowPostForm] = useState(false)
  const [unlockedGames, setUnlockedGames] = useState({})
  const [confirmation, setConfirmation] = useState(null)
  const [editingGameId, setEditingGameId] = useState(null)
  const [editData, setEditData] = useState({})
  const [isMobile, setIsMobile] = useState(false)

const [user, setUser] = useState(null)
const [authEmail, setAuthEmail] = useState('')
const [authPassword, setAuthPassword] = useState('')

const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [playerType, setPlayerType] = useState('Skater')
  const [team, setTeam] = useState('Team 1')

  const [manualName, setManualName] = useState('')
  const [manualPhone, setManualPhone] = useState('')
  const [manualEmail, setManualEmail] = useState('')
  const [manualPlayerType, setManualPlayerType] = useState('Skater')
  const [manualTeam, setManualTeam] = useState('Team 1')
  const [manualCode, setManualCode] = useState('')

  const [selectedArena, setSelectedArena] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [cost, setCost] = useState('')
  const [level, setLevel] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(20)
  const [team1Name, setTeam1Name] = useState('Team 1')
  const [team2Name, setTeam2Name] = useState('Team 2')
  const [organizer, setOrganizer] = useState('')
  const [organizerEmail, setOrganizerEmail] = useState('')
  const [organizerCode, setOrganizerCode] = useState('')

  const loadArenas = async () => {
    const { data } = await supabase
      .from('arenas')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })

    setArenas(data || [])
  }

  const loadGames = async () => {
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
      .from('games')
      .select('*')
      .eq('is_active', true)
      .gte('game_date', today)
      .order('game_date', { ascending: true })

    setGames(data || [])
  }

  const loadSignups = async () => {
    const { data } = await supabase
      .from('game_signups')
      .select('*')
      .order('created_at', { ascending: true })

    setSignups(data || [])
  }

  const loadWaitlist = async () => {
    const { data } = await supabase
      .from('game_waitlist')
      .select('*')
      .order('created_at', { ascending: true })

    setWaitlist(data || [])
  }

  useEffect(() => {
    loadArenas()
    loadGames()
    loadSignups()
    loadWaitlist()
    
supabase.auth.getUser().then(({ data }) => {
  setUser(data.user)
})
const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const refreshGameData = () => {
    loadGames()
    loadSignups()
    loadWaitlist()
  }
const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password: authPassword,
  })

  if (error) {
    alert(error.message)
  } else {
    setUser(data.user)
    alert('Logged in successfully.')
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  setUser(null)
  alert('Logged out.')
}
  const unlockOrganizerTools = (gameId) => {
    const code = prompt('Enter organizer code:')

    if (code !== ORGANIZER_CODE) {
      alert('Invalid organizer code.')
      return
    }

    setUnlockedGames({
      ...unlockedGames,
      [gameId]: true,
    })
  }

  const getArenaDetails = (arenaName) => {
    return arenas.find((a) => a.name === arenaName)
  }

  const getAvailableGoalieTeam = (roster) => {
    const team1Goalie = roster.some(
      (p) => p.team === 'Team 1' && p.player_type === 'Goalie'
    )

    const team2Goalie = roster.some(
      (p) => p.team === 'Team 2' && p.player_type === 'Goalie'
    )

    if (!team1Goalie) return 'Team 1'
    if (!team2Goalie) return 'Team 2'
    return null
  }

  const getSmallerSkaterTeam = (roster) => {
    const team1Skaters = roster.filter(
      (p) => p.team === 'Team 1' && p.player_type !== 'Goalie'
    ).length

    const team2Skaters = roster.filter(
      (p) => p.team === 'Team 2' && p.player_type !== 'Goalie'
    ).length

    return team1Skaters <= team2Skaters ? 'Team 1' : 'Team 2'
  }

  const createGoogleCalendarLink = (details) => {
    if (!details) return '#'

    const cleanDate = details.date || ''
    const cleanTime = details.time || '19:00'
    const start = new Date(`${cleanDate}T${cleanTime}`)
    const end = new Date(start.getTime() + 90 * 60 * 1000)

    const formatDate = (dateValue) => {
      return dateValue
        .toISOString()
        .replace(/[-:]/g, '')
        .split('.')[0] + 'Z'
    }

    const title = `GTA Hockey Club - ${details.arena}`
    const calendarDetails = [
      `Team: ${details.team}`,
      `Cost: ${details.playerType === 'Goalie' ? 'Goalies free' : details.cost}`,
      details.organizerEmail ? `E-transfer: ${details.organizerEmail}` : '',
      `Posted through GTA Hockey Club`,
    ]
      .filter(Boolean)
      .join('\n')

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatDate(start)}/${formatDate(end)}`,
      details: calendarDetails,
      location: details.arena,
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const copyPaymentDetails = async () => {
    if (!confirmation) return

    const paymentText = [
      'GTA Hockey Club Payment Details',
      `Player: ${confirmation.playerName}`,
      `Amount: ${confirmation.cost}`,
      `E-transfer to: ${confirmation.organizerEmail || 'Organizer email not provided'}`,
      `Arena: ${confirmation.arena}`,
      `Date: ${confirmation.date}`,
      `Time: ${confirmation.time}`,
      `Team: ${confirmation.team}`,
      'Message: GTA Hockey Club payment',
    ].join('\n')

    try {
      await navigator.clipboard.writeText(paymentText)
      alert('Payment details copied.')
    } catch (error) {
      alert('Could not copy payment details. Please copy them manually.')
      console.log(error)
    }
  }

  const handleEditGame = (game) => {
    setEditingGameId(game.id)
    setEditData({
      arena: game.arena,
      game_date: game.game_date,
      game_time: game.game_time,
      cost: game.cost,
      level: game.level,
      max_players: game.max_players,
      team1_name: game.team1_name,
      team2_name: game.team2_name,
    })
  }

  const handleCancelEdit = () => {
    setEditingGameId(null)
    setEditData({})
  }

  const handleUpdateGame = async () => {
    if (!editingGameId) return

    if (
      !editData.arena ||
      !editData.game_date ||
      !editData.game_time ||
      !editData.cost ||
      !editData.level ||
      !editData.max_players
    ) {
      alert('Please complete all edit fields.')
      return
    }

    const { error } = await supabase
      .from('games')
      .update({
        arena: editData.arena,
        game_date: editData.game_date,
        game_time: editData.game_time,
        cost: editData.cost,
        level: editData.level,
        max_players: Number(editData.max_players),
        team1_name: editData.team1_name || 'Team 1',
        team2_name: editData.team2_name || 'Team 2',
      })
      .eq('id', editingGameId)

    if (error) {
      alert('Error updating game.')
      console.log(error)
    } else {
      alert('Game updated.')
      setEditingGameId(null)
      setEditData({})
      loadGames()
    }
  }

  const handlePostGame = async () => {
    if (organizerCode !== ORGANIZER_CODE) {
      alert('Invalid organizer code.')
      return
    }

    const arenaDetails = arenas.find((a) => a.id === selectedArena)

    if (!arenaDetails || !date || !time || !cost || !level) {
      alert('Please select arena, date, time, cost, and skill level.')
      return
    }

    const { error } = await supabase.from('games').insert([
      {
        arena: arenaDetails.name,
        game_date: date,
        game_time: time,
        cost,
        level,
        max_players: Number(maxPlayers),
        team1_name: team1Name || 'Team 1',
        team2_name: team2Name || 'Team 2',
        organizer_name: organizer,
        organizer_email: organizerEmail,
        organizer_id: user.id,
      },
    ])

    if (error) {
      alert('Error posting game.')
      console.log(error)
    } else {
      alert('Game posted!')
      setSelectedArena('')
      setDate('')
      setTime('')
      setCost('')
      setLevel('')
      setMaxPlayers(20)
      setTeam1Name('Team 1')
      setTeam2Name('Team 2')
      setOrganizer('')
      setOrganizerEmail('')
      setOrganizerCode('')
      setShowPostForm(false)
      loadGames()
    }
  }

  const handleCloseGame = async (gameId) => {
    const confirmClose = confirm('Close this game and remove it from the public list?')
    if (!confirmClose) return

    const { error } = await supabase
      .from('games')
      .update({ is_active: false })
      .eq('id', gameId)

    if (error) {
      alert('Error closing game.')
      console.log(error)
    } else {
      alert('Game closed.')
      refreshGameData()
    }
  }

  const handleRemovePlayer = async (playerId, playerName) => {
    const confirmRemove = confirm(`Remove ${playerName} from the roster?`)
    if (!confirmRemove) return

    const { error } = await supabase
      .from('game_signups')
      .delete()
      .eq('id', playerId)

    if (error) {
      alert('Error removing player.')
      console.log(error)
    } else {
      alert('Player removed.')
      loadSignups()
    }
  }

  const handleMovePlayer = async (player, gameRoster) => {
    const newTeam = player.team === 'Team 1' ? 'Team 2' : 'Team 1'

    if (player.player_type === 'Goalie') {
      const goalieExistsOnNewTeam = gameRoster.some(
        (p) =>
          p.team === newTeam &&
          p.player_type === 'Goalie' &&
          p.id !== player.id
      )

      if (goalieExistsOnNewTeam) {
        alert('Cannot move goalie. The other team already has a goalie.')
        return
      }
    }

    const { error } = await supabase
      .from('game_signups')
      .update({ team: newTeam })
      .eq('id', player.id)

    if (error) {
      alert('Error moving player.')
      console.log(error)
    } else {
      alert(`${player.player_name} moved.`)
      loadSignups()
    }
  }

  const handleTogglePaid = async (player) => {
    if (player.player_type === 'Goalie') {
      alert('Goalies do not pay for pickup hockey.')
      return
    }

    const { error } = await supabase
      .from('game_signups')
      .update({ paid: !player.paid })
      .eq('id', player.id)

    if (error) {
      alert('Error updating payment.')
      console.log(error)
    } else {
      loadSignups()
    }
  }

  const handleJoinWaitlist = async (game) => {
    if (!name || !phone || !email) {
      alert('Please enter your name, phone, and email.')
      return
    }

    if (playerType === 'Goalie') {
      alert('Waitlist is currently for skaters only.')
      return
    }

    const cleanEmail = email.trim().toLowerCase()
    const roster = signups.filter((p) => p.game_id === game.id)
    const gameWaitlist = waitlist.filter((p) => p.game_id === game.id)

    const alreadySignedUp = roster.some(
      (p) => p.email && p.email.trim().toLowerCase() === cleanEmail
    )

    const alreadyWaitlisted = gameWaitlist.some(
      (p) => p.email && p.email.trim().toLowerCase() === cleanEmail
    )

    if (alreadySignedUp) {
      alert('You are already on the roster for this game.')
      return
    }

    if (alreadyWaitlisted) {
      alert('You are already on the waitlist for this game.')
      return
    }

    const { error } = await supabase.from('game_waitlist').insert([
      {
        game_id: game.id,
        game_name: game.arena + ' - ' + game.game_date + ' ' + game.game_time,
        player_name: name,
        phone,
        email: cleanEmail,
        player_type: 'Skater',
      },
    ])

    if (error) {
      alert('Error joining waitlist.')
      console.log(error)
    } else {
      setConfirmation({
        arena: game.arena,
        date: game.game_date,
        time: game.game_time,
        team: 'Waitlist',
        cost: game.cost,
        playerType: 'Waitlist',
        playerName: name,
        organizerName: game.organizer_name,
        organizerEmail: game.organizer_email,
      })

      alert('You have been added to the waitlist.')
      setName('')
      setPhone('')
      setEmail('')
      setPlayerType('Skater')
      setTeam('Team 1')
      loadWaitlist()
    }
  }

  const handleMoveFirstWaitlistToRoster = async (game, gameRoster, gameWaitlist) => {
    if (gameWaitlist.length === 0) {
      alert('No players on the waitlist.')
      return
    }

    const skaterRoster = gameRoster.filter((p) => p.player_type !== 'Goalie')

    if (skaterRoster.length >= game.max_players) {
      alert('This game is still full. Remove a skater first before moving someone from the waitlist.')
      return
    }

    const firstWaitlistPlayer = gameWaitlist[0]
    const assignedTeam = getSmallerSkaterTeam(gameRoster)

    const confirmMove = confirm(
      `Move ${firstWaitlistPlayer.player_name} from waitlist to ${assignedTeam === 'Team 1' ? game.team1_name : game.team2_name}?`
    )

    if (!confirmMove) return

    const { error: insertError } = await supabase.from('game_signups').insert([
      {
        game_id: game.id,
        game_name: game.arena + ' - ' + game.game_date + ' ' + game.game_time,
        player_name: firstWaitlistPlayer.player_name,
        phone: firstWaitlistPlayer.phone,
        email: firstWaitlistPlayer.email,
        player_type: 'Skater',
        team: assignedTeam,
        paid: false,
      },
    ])

    if (insertError) {
      alert('Error moving waitlist player to roster.')
      console.log(insertError)
      return
    }

    const { error: deleteError } = await supabase
      .from('game_waitlist')
      .delete()
      .eq('id', firstWaitlistPlayer.id)

    if (deleteError) {
      alert('Player was added to roster, but could not be removed from waitlist. Please remove them manually.')
      console.log(deleteError)
    } else {
      alert(`${firstWaitlistPlayer.player_name} was moved from waitlist to roster.`)
    }

    refreshGameData()
  }

  const handleJoin = async (game) => {
    if (!name || !phone || !email) {
      alert('Please enter your name, phone, and email.')
      return
    }

    const cleanEmail = email.trim().toLowerCase()
    const roster = signups.filter((p) => p.game_id === game.id)
    const skaterRoster = roster.filter((p) => p.player_type !== 'Goalie')

    const alreadySignedUp = roster.some(
      (p) => p.email && p.email.trim().toLowerCase() === cleanEmail
    )

    if (alreadySignedUp) {
      alert('You are already signed up for this game.')
      return
    }

    if (playerType === 'Skater' && skaterRoster.length >= game.max_players) {
      alert('This game is full for skaters. Please join the waitlist.')
      return
    }

    let assignedTeam = getSmallerSkaterTeam(roster)

    if (playerType === 'Goalie') {
      assignedTeam = getAvailableGoalieTeam(roster)

      if (!assignedTeam) {
        alert('Both goalie spots are already filled.')
        return
      }
    }

    const { error } = await supabase.from('game_signups').insert([
      {
        game_id: game.id,
        game_name: game.arena + ' - ' + game.game_date + ' ' + game.game_time,
        player_name: name,
        phone,
        email: cleanEmail,
        player_type: playerType,
        team: assignedTeam,
        paid: playerType === 'Goalie' ? true : false,
      },
    ])

    if (error) {
      alert('Error joining game.')
      console.log(error)
    } else {
      const displayTeam =
        assignedTeam === 'Team 1' ? game.team1_name : game.team2_name

      setConfirmation({
        arena: game.arena,
        date: game.game_date,
        time: game.game_time,
        team: displayTeam,
        cost: game.cost,
        playerType,
        playerName: name,
        organizerName: game.organizer_name,
        organizerEmail: game.organizer_email,
      })

      setName('')
      setPhone('')
      setEmail('')
      setPlayerType('Skater')
      setTeam('Team 1')
      loadSignups()
    }
  }

  const handleManualAddPlayer = async (game) => {
    if (manualCode !== ORGANIZER_CODE) {
      alert('Invalid organizer code.')
      return
    }

    if (!manualName) {
      alert('Please enter player name.')
      return
    }

    const roster = signups.filter((p) => p.game_id === game.id)
    const skaterRoster = roster.filter((p) => p.player_type !== 'Goalie')

    if (manualPlayerType === 'Skater' && skaterRoster.length >= game.max_players) {
      alert('This game is full for skaters.')
      return
    }

    const cleanManualEmail = manualEmail.trim().toLowerCase()

    if (cleanManualEmail) {
      const alreadySignedUp = roster.some(
        (p) => p.email && p.email.trim().toLowerCase() === cleanManualEmail
      )

      if (alreadySignedUp) {
        alert('This email is already signed up for this game.')
        return
      }
    }

    let assignedTeam = manualTeam

    if (manualPlayerType === 'Goalie') {
      assignedTeam = getAvailableGoalieTeam(roster)

      if (!assignedTeam) {
        alert('Both goalie spots are already filled.')
        return
      }
    }

    const { error } = await supabase.from('game_signups').insert([
      {
        game_id: game.id,
        game_name: game.arena + ' - ' + game.game_date + ' ' + game.game_time,
        player_name: manualName,
        phone: manualPhone,
        email: cleanManualEmail || 'manual-entry-' + Date.now() + '@noemail.local',
        player_type: manualPlayerType,
        team: assignedTeam,
        paid: manualPlayerType === 'Goalie' ? true : false,
      },
    ])

    if (error) {
      alert('Error adding player.')
      console.log(error)
    } else {
      alert('Player added!')
      setManualName('')
      setManualPhone('')
      setManualEmail('')
      setManualPlayerType('Skater')
      setManualTeam('Team 1')
      setManualCode('')
      loadSignups()
    }
  }

  const renderTeamRoster = (roster, teamName, displayName, toolsUnlocked) => {
    const teamRoster = roster.filter((p) => p.team === teamName)
    const goalie = teamRoster.find((p) => p.player_type === 'Goalie')
    const skaters = teamRoster.filter((p) => p.player_type !== 'Goalie')

    const playerActions = (player) => {
      if (!toolsUnlocked) return null

      const isGoalie = player.player_type === 'Goalie'

      return (
        <span style={isMobile ? styles.buttonGroupMobile : styles.buttonGroup}>
          {!isGoalie && (
            <button
              onClick={() => handleTogglePaid(player)}
              style={player.paid ? styles.unpaidButton : styles.paidButton}
            >
              {player.paid ? 'Mark Unpaid' : 'Mark Paid'}
            </button>
          )}

          <button onClick={() => handleMovePlayer(player, roster)} style={styles.moveButton}>
            Move
          </button>

          <button onClick={() => handleRemovePlayer(player.id, player.player_name)} style={styles.removeButton}>
            Remove
          </button>
        </span>
      )
    }

    const playerLabel = (player) => {
      const isGoalie = player.player_type === 'Goalie'

      return (
        <span>
          {player.player_name}
          {isGoalie ? ' (Goalie)' : ''}

          {!isGoalie && (
            <span style={player.paid ? styles.paidBadge : styles.unpaidBadge}>
              {player.paid ? 'Paid' : 'Unpaid'}
            </span>
          )}
        </span>
      )
    }

    return (
      <div style={styles.teamBox}>
        <h4 style={styles.teamTitle}>{displayName}</h4>

        <ol style={styles.rosterList}>
          <li style={styles.goalieLine}>
            {goalie ? (
              <span style={isMobile ? styles.playerRowMobile : styles.playerRow}>
                <span>🥅 {playerLabel(goalie)}</span>
                {playerActions(goalie)}
              </span>
            ) : (
              '🥅 Open Goalie Spot'
            )}
          </li>

          {skaters.map((player) => (
            <li key={player.id} style={styles.playerLine}>
              <span style={isMobile ? styles.playerRowMobile : styles.playerRow}>
                {playerLabel(player)}
                {playerActions(player)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.bannerWrap}>
        <img src="/GTAHOCKEYCLUBBANNER.png" alt="GTA Hockey Club Banner" style={styles.banner} />
      </div>

      <section style={isMobile ? styles.introMobile : styles.intro}>
        <h1 style={isMobile ? styles.mainTitleMobile : styles.mainTitle}>Find Pickup Hockey Games Across the GTA</h1>
        <p style={styles.mainText}>Join recreational games, view rosters, and reserve your spot in seconds.</p>
      </section>

      {confirmation && (
        <div style={isMobile ? styles.confirmationBoxMobile : styles.confirmationBox}>
          <h3 style={styles.confirmationTitle}>You’re In! 🏒</h3>

          <p><strong>Arena:</strong> {confirmation.arena}</p>
          <p><strong>Date:</strong> {confirmation.date}</p>
          <p><strong>Time:</strong> {confirmation.time}</p>
          <p><strong>Status:</strong> {confirmation.team}</p>
          <p><strong>Cost:</strong> {confirmation.playerType === 'Goalie' ? 'Goalies free' : confirmation.cost}</p>

          {confirmation.playerType !== 'Goalie' && confirmation.playerType !== 'Waitlist' && (
            <>
              <p style={styles.paymentReminder}>
                Please e-transfer the organizer to secure your spot.
              </p>

              {confirmation.organizerEmail ? (
                <p style={styles.etransferLine}>
                  <strong>E-transfer to:</strong> {confirmation.organizerEmail}
                </p>
              ) : (
                <p style={styles.etransferLine}>
                  Organizer e-transfer email was not provided. Please contact the organizer directly.
                </p>
              )}

              <button onClick={copyPaymentDetails} style={styles.copyButton}>
                Copy Payment Details
              </button>
            </>
          )}

          {confirmation.playerType === 'Waitlist' && (
            <p style={styles.waitlistNotice}>
              You are on the waitlist. The organizer will contact you if a spot opens.
            </p>
          )}

          {confirmation.playerType === 'Goalie' && (
            <p style={styles.paymentReminder}>
              You are confirmed as goalie. No payment required.
            </p>
          )}

          <a
            href={createGoogleCalendarLink(confirmation)}
            target="_blank"
            rel="noreferrer"
            style={styles.calendarButton}
          >
            Add to Calendar
          </a>

          <button
            onClick={() => setConfirmation(null)}
            style={styles.closeConfirmButton}
          >
            Close
          </button>
        </div>
      )}

      <section style={isMobile ? styles.organizerSectionMobile : styles.organizerSection}>
        {!user ? (
  <div style={isMobile ? styles.organizerCardMobile : styles.organizerCard}>
    <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>
      Organizer Login
    </h2>

    <input
      placeholder="Organizer Email"
      value={authEmail}
      onChange={(e) => setAuthEmail(e.target.value)}
      style={styles.input}
    />

    <input
      type="password"
      placeholder="Password"
      value={authPassword}
      onChange={(e) => setAuthPassword(e.target.value)}
      style={styles.input}
    />

    <button onClick={handleLogin} style={styles.postButton}>
      Login
    </button>
  </div>
) : (
  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
    <p>
      Logged in as <strong>{user.email}</strong>
    </p>

    <button onClick={handleLogout} style={styles.closeButton}>
      Logout
    </button>
  </div>
)}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            style={styles.toggleButton}
          >
            {showPostForm ? 'Close Organizer Panel' : 'Post a Game as Organizer'}
          </button>
        </div>

        {showPostForm && (
          <div style={isMobile ? styles.organizerCardMobile : styles.organizerCard}>
            <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Post a Game</h2>

            <div style={styles.formGrid}>
              <select value={selectedArena} onChange={(e) => setSelectedArena(e.target.value)} style={styles.input}>
                <option value="">Select Arena</option>
                {arenas.map((arena) => (
                  <option key={arena.id} value={arena.id}>
                    {arena.name} - {arena.city}
                  </option>
                ))}
              </select>

              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} />
              <input placeholder="Cost, example $20" value={cost} onChange={(e) => setCost(e.target.value)} style={styles.input} />

              <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.input}>
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Low-Mid">Low-Mid</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </select>

              <input placeholder="# of Skaters" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} style={styles.input} />
              <input placeholder="Team 1 Name" value={team1Name} onChange={(e) => setTeam1Name(e.target.value)} style={styles.input} />
              <input placeholder="Team 2 Name" value={team2Name} onChange={(e) => setTeam2Name(e.target.value)} style={styles.input} />
              <input placeholder="Organizer Name" value={organizer} onChange={(e) => setOrganizer(e.target.value)} style={styles.input} />
              <input placeholder="Organizer Email / E-transfer Email" value={organizerEmail} onChange={(e) => setOrganizerEmail(e.target.value)} style={styles.input} />
              <input placeholder="Organizer Code" type="password" value={organizerCode} onChange={(e) => setOrganizerCode(e.target.value)} style={styles.input} />
            </div>

            <button onClick={handlePostGame} style={styles.postButton}>
              Post Game
            </button>
          </div>
        )}
      </section>

      <section style={isMobile ? styles.gamesSectionMobile : styles.gamesSection}>
        <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Upcoming Games</h2>

        {games.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No upcoming games posted yet.</p>
        ) : (
          games.map((game) => {
            const roster = signups.filter((p) => p.game_id === game.id)
            const gameWaitlist = waitlist.filter((p) => p.game_id === game.id)
            const skaterRoster = roster.filter((p) => p.player_type !== 'Goalie')
            const goalieRoster = roster.filter((p) => p.player_type === 'Goalie')
            const skaterSpotsLeft = game.max_players - skaterRoster.length
            const isSkaterFull = skaterSpotsLeft <= 0
            const arenaDetails = getArenaDetails(game.arena)
            const paidCount = skaterRoster.filter((p) => p.paid).length
            const unpaidCount = skaterRoster.length - paidCount
            const toolsUnlocked = unlockedGames[game.id]

            return (
              <div key={game.id} style={isMobile ? styles.gameCardMobile : styles.gameCard}>
                <div style={isMobile ? styles.gameHeaderMobile : styles.gameHeader}>
                  <div>
                    <h3 style={isMobile ? styles.arenaMobile : styles.arena}>{game.arena}</h3>
                    <p style={styles.gameInfo}>{game.game_date} • {game.game_time}</p>

                    <div style={styles.gameMetaRow}>
                      <span style={styles.costBadge}>{game.cost}</span>
                      <span style={styles.levelBadge}>{game.level}</span>
                      {gameWaitlist.length > 0 && (
                        <span style={styles.waitlistBadge}>{gameWaitlist.length} waitlisted</span>
                      )}
                    </div>

                    <p style={styles.gameInfo}>{game.team1_name} vs {game.team2_name}</p>

                    {arenaDetails && (
                      <p style={styles.address}>
                        {arenaDetails.address}, {arenaDetails.city}, {arenaDetails.province}
                      </p>
                    )}

                    {arenaDetails?.google_maps_url && (
                      <a href={arenaDetails.google_maps_url} target="_blank" rel="noreferrer" style={styles.mapLink}>
                        Open in Google Maps
                      </a>
                    )}
                  </div>

                  <div style={isSkaterFull ? styles.fullBadge : styles.openBadge}>
                    {isSkaterFull ? 'SKATERS FULL' : `${skaterSpotsLeft} skater spots left`}
                  </div>
                </div>

                <div style={styles.organizerInfoBox}>
                  <p style={styles.organizerInfoLine}>
                    <strong>Organizer:</strong> {game.organizer_name || 'Organizer not listed'}
                  </p>

                  <p style={styles.organizerInfoLine}>
                    <strong>Payment:</strong> E-transfer details are shown after signup.
                  </p>

                  <p style={styles.organizerNote}>
                    Payment confirms your spot. Goalies are free.
                  </p>
                </div>

                <div style={styles.paymentSummary}>
                  <strong>Payment:</strong> {paidCount} skaters paid • {unpaidCount} skaters unpaid • Goalies free
                </div>

                <div style={styles.signupBox}>
                  <h4 style={styles.signupTitle}>Join this game</h4>

                  <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                  <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
                  <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />

                  <select value={playerType} onChange={(e) => setPlayerType(e.target.value)} style={styles.input}>
                    <option>Skater</option>
                    <option>Goalie</option>
                  </select>

                  {playerType === 'Skater' && !isSkaterFull && (
                    <p style={styles.goalieNote}>
                      Teams are automatically balanced for fairness.
                    </p>
                  )}

                  {playerType === 'Goalie' && (
                    <p style={styles.goalieNote}>
                      Goalies are automatically assigned to the first open goalie spot.
                    </p>
                  )}

                  {playerType === 'Skater' && isSkaterFull ? (
                    <button onClick={() => handleJoinWaitlist(game)} style={styles.waitlistButton}>
                      Join Waitlist
                    </button>
                  ) : (
                    <button onClick={() => handleJoin(game)} style={styles.joinButton}>
                      Join Game
                    </button>
                  )}
                </div>

                <div style={isMobile ? styles.rosterHeaderMobile : styles.rosterHeader}>
                  <h4 style={styles.rosterTitle}>Roster</h4>
                  <p style={styles.rosterCount}>
                    {skaterRoster.length} / {game.max_players} skaters • {goalieRoster.length} / 2 goalies
                  </p>
                </div>

                <div style={isMobile ? styles.rosterGridMobile : styles.rosterGrid}>
                  {renderTeamRoster(roster, 'Team 1', game.team1_name, toolsUnlocked)}
                  {renderTeamRoster(roster, 'Team 2', game.team2_name, toolsUnlocked)}
                </div>

                {!toolsUnlocked && (
                  <button onClick={() => unlockOrganizerTools(game.id)} style={styles.organizerToolsButton}>
                    Organizer Tools
                  </button>
                )}

                {toolsUnlocked && (
                  <>
                    {gameWaitlist.length > 0 && (
                      <div style={styles.waitlistBox}>
                        <h4 style={styles.signupTitle}>Waitlist</h4>
                        <ol style={styles.mobileFriendlyList}>
                          {gameWaitlist.map((player) => (
                            <li key={player.id}>
                              {player.player_name} • {player.email} • {player.phone}
                            </li>
                          ))}
                        </ol>

                        <button
                          onClick={() => handleMoveFirstWaitlistToRoster(game, roster, gameWaitlist)}
                          style={styles.promoteButton}
                        >
                          Move First Waitlist Player to Roster
                        </button>
                      </div>
                    )}

                    <button onClick={() => handleEditGame(game)} style={styles.editButton}>
                      Edit Game
                    </button>

                    {editingGameId === game.id && (
                      <div style={styles.editBox}>
                        <h4 style={styles.signupTitle}>Edit Game Details</h4>

                        <select value={editData.arena || ''} onChange={(e) => setEditData({ ...editData, arena: e.target.value })} style={styles.input}>
                          <option value="">Select Arena</option>
                          {arenas.map((arena) => (
                            <option key={arena.id} value={arena.name}>
                              {arena.name} - {arena.city}
                            </option>
                          ))}
                        </select>

                        <input type="date" value={editData.game_date || ''} onChange={(e) => setEditData({ ...editData, game_date: e.target.value })} style={styles.input} />
                        <input type="time" value={editData.game_time || ''} onChange={(e) => setEditData({ ...editData, game_time: e.target.value })} style={styles.input} />
                        <input placeholder="Cost" value={editData.cost || ''} onChange={(e) => setEditData({ ...editData, cost: e.target.value })} style={styles.input} />

                        <select value={editData.level || ''} onChange={(e) => setEditData({ ...editData, level: e.target.value })} style={styles.input}>
                          <option value="">Select Skill Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Low-Mid">Low-Mid</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advance">Advance</option>
                        </select>

                        <input placeholder="# of Skaters" value={editData.max_players || ''} onChange={(e) => setEditData({ ...editData, max_players: e.target.value })} style={styles.input} />
                        <input placeholder="Team 1 Name" value={editData.team1_name || ''} onChange={(e) => setEditData({ ...editData, team1_name: e.target.value })} style={styles.input} />
                        <input placeholder="Team 2 Name" value={editData.team2_name || ''} onChange={(e) => setEditData({ ...editData, team2_name: e.target.value })} style={styles.input} />

                        <button onClick={handleUpdateGame} style={styles.saveButton}>
                          Save Changes
                        </button>

                        <button onClick={handleCancelEdit} style={styles.cancelButton}>
                          Cancel Edit
                        </button>
                      </div>
                    )}

                    <div style={styles.manualBox}>
                      <h4 style={styles.signupTitle}>Organizer Manual Add Player</h4>

                      <input placeholder="Player name" value={manualName} onChange={(e) => setManualName(e.target.value)} style={styles.input} />
                      <input placeholder="Phone optional" value={manualPhone} onChange={(e) => setManualPhone(e.target.value)} style={styles.input} />
                      <input placeholder="Email optional" value={manualEmail} onChange={(e) => setManualEmail(e.target.value)} style={styles.input} />

                      <select value={manualPlayerType} onChange={(e) => setManualPlayerType(e.target.value)} style={styles.input}>
                        <option>Skater</option>
                        <option>Goalie</option>
                      </select>

                      {manualPlayerType === 'Skater' && (
                        <select value={manualTeam} onChange={(e) => setManualTeam(e.target.value)} style={styles.input}>
                          <option value="Team 1">{game.team1_name}</option>
                          <option value="Team 2">{game.team2_name}</option>
                        </select>
                      )}

                      {manualPlayerType === 'Goalie' && (
                        <p style={styles.goalieNote}>
                          Manual goalie add will use the first open goalie spot.
                        </p>
                      )}

                      <input placeholder="Organizer Code" type="password" value={manualCode} onChange={(e) => setManualCode(e.target.value)} style={styles.input} />

                      <button onClick={() => handleManualAddPlayer(game)} style={styles.manualButton}>
                        Add Player Manually
                      </button>
                    </div>

                    <button onClick={() => handleCloseGame(game.id)} style={styles.closeButton}>
                      Close Game
                    </button>
                  </>
                )}
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif', margin: 0, background: '#f3f5f8', color: '#07152b' },
  bannerWrap: { width: '100%', backgroundColor: '#07152b', display: 'flex', justifyContent: 'center' },
  banner: { width: '100%', maxWidth: '1200px', display: 'block' },

  intro: { background: '#07152b', color: 'white', textAlign: 'center', padding: '34px 20px' },
  introMobile: { background: '#07152b', color: 'white', textAlign: 'center', padding: '24px 14px' },

  mainTitle: { fontSize: '34px', margin: '0 0 10px' },
  mainTitleMobile: { fontSize: '24px', lineHeight: '30px', margin: '0 0 10px' },
  mainText: { fontSize: '18px', margin: 0, color: '#d7e3f5' },

  confirmationBox: { background: 'white', padding: '20px', borderRadius: '12px', maxWidth: '500px', margin: '20px auto', textAlign: 'center', boxShadow: '0 8px 22px rgba(0,0,0,0.1)', border: '2px solid #e53935' },
  confirmationBoxMobile: { background: 'white', padding: '16px', borderRadius: '12px', maxWidth: '92%', margin: '16px auto', textAlign: 'center', boxShadow: '0 8px 22px rgba(0,0,0,0.1)', border: '2px solid #e53935' },
  confirmationTitle: { marginBottom: '10px', color: '#07152b' },

  paymentReminder: { marginTop: '10px', fontWeight: 'bold', color: '#e53935' },
  etransferLine: { marginTop: '8px', fontWeight: 'bold', color: '#07152b', background: '#f7f9fc', padding: '10px', borderRadius: '8px' },
  waitlistNotice: { marginTop: '10px', fontWeight: 'bold', color: '#175cd3', background: '#eef4ff', padding: '10px', borderRadius: '8px' },

  copyButton: { marginTop: '10px', padding: '10px 18px', background: '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  calendarButton: { display: 'inline-block', marginTop: '14px', marginRight: '8px', padding: '10px 18px', background: '#187a3b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' },
  closeConfirmButton: { marginTop: '15px', padding: '10px 20px', background: '#07152b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },

  organizerSection: { padding: '34px 18px 10px' },
  organizerSectionMobile: { padding: '24px 10px 8px' },
  organizerCard: { background: 'white', borderRadius: '16px', padding: '24px', margin: '0 auto', maxWidth: '900px', boxShadow: '0 8px 22px rgba(0,0,0,0.08)', border: '1px solid #e1e5eb' },
  organizerCardMobile: { background: 'white', borderRadius: '14px', padding: '16px', margin: '0 auto', maxWidth: '100%', boxShadow: '0 8px 22px rgba(0,0,0,0.08)', border: '1px solid #e1e5eb' },

  toggleButton: { background: '#07152b', color: 'white', padding: '12px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', width: '100%', maxWidth: '360px' },

  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' },

  gamesSection: { padding: '30px 18px 40px' },
  gamesSectionMobile: { padding: '22px 10px 32px' },

  sectionTitle: { textAlign: 'center', fontSize: '32px', marginBottom: '24px' },
  sectionTitleMobile: { textAlign: 'center', fontSize: '24px', marginBottom: '18px' },

  gameCard: { background: 'white', borderRadius: '16px', padding: '24px', margin: '24px auto', maxWidth: '900px', boxShadow: '0 8px 22px rgba(0,0,0,0.08)', border: '1px solid #e1e5eb' },
  gameCardMobile: { background: 'white', borderRadius: '14px', padding: '16px', margin: '18px auto', maxWidth: '100%', boxShadow: '0 8px 22px rgba(0,0,0,0.08)', border: '1px solid #e1e5eb' },

  gameHeader: { display: 'flex', justifyContent: 'space-between', gap: '15px', alignItems: 'flex-start', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px' },
  gameHeaderMobile: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', borderBottom: '1px solid #e5e5e5', paddingBottom: '14px' },

  arena: { fontSize: '26px', margin: '0 0 8px' },
  arenaMobile: { fontSize: '21px', lineHeight: '26px', margin: '0 0 8px' },

  gameInfo: { margin: '4px 0', color: '#42526b' },
  gameMetaRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' },

  costBadge: { background: '#e9f7ef', color: '#187a3b', padding: '5px 10px', borderRadius: '999px', fontWeight: 'bold', fontSize: '13px' },
  levelBadge: { background: '#eef4ff', color: '#175cd3', padding: '5px 10px', borderRadius: '999px', fontWeight: 'bold', fontSize: '13px' },
  waitlistBadge: { background: '#fff8e6', color: '#92400e', padding: '5px 10px', borderRadius: '999px', fontWeight: 'bold', fontSize: '13px' },

  address: { margin: '8px 0 4px', color: '#667085', fontSize: '14px' },
  mapLink: { display: 'inline-block', marginTop: '4px', color: '#e53935', fontWeight: 'bold', textDecoration: 'none' },

  openBadge: { background: '#e9f7ef', color: '#187a3b', padding: '8px 12px', borderRadius: '999px', fontWeight: 'bold', whiteSpace: 'nowrap', textAlign: 'center' },
  fullBadge: { background: '#fdecea', color: '#b42318', padding: '8px 12px', borderRadius: '999px', fontWeight: 'bold', whiteSpace: 'nowrap', textAlign: 'center' },

  organizerInfoBox: { background: '#f7f9fc', padding: '12px', borderRadius: '10px', marginTop: '16px', border: '1px solid #e1e5eb' },
  organizerInfoLine: { margin: '4px 0', color: '#07152b', fontSize: '14px' },
  organizerNote: { margin: '8px 0 0', color: '#e53935', fontWeight: 'bold', fontSize: '14px' },

  paymentSummary: { background: '#eef4ff', color: '#175cd3', padding: '10px 12px', borderRadius: '10px', marginTop: '16px', fontSize: '14px' },

  signupBox: { background: '#f7f9fc', padding: '18px', borderRadius: '12px', marginTop: '20px' },
  manualBox: { background: '#fff8e6', padding: '18px', borderRadius: '12px', marginTop: '20px', border: '1px solid #ffe1a3' },
  editBox: { background: '#eef4ff', padding: '18px', borderRadius: '12px', marginTop: '20px', border: '1px solid #b7ccff' },
  waitlistBox: { background: '#fff8e6', padding: '18px', borderRadius: '12px', marginTop: '20px', border: '1px solid #ffe1a3' },

  signupTitle: { marginTop: 0, marginBottom: '12px' },

  input: { width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccd3dd', borderRadius: '8px', boxSizing: 'border-box', fontSize: '16px' },

  goalieNote: { background: '#eef4ff', color: '#175cd3', padding: '10px', borderRadius: '8px', fontSize: '14px', marginTop: 0 },

  postButton: { width: '100%', background: '#07152b', color: 'white', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '8px' },
  joinButton: { width: '100%', background: '#e53935', color: 'white', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  waitlistButton: { width: '100%', background: '#f59e0b', color: '#07152b', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  manualButton: { width: '100%', background: '#f59e0b', color: '#07152b', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  promoteButton: { width: '100%', background: '#187a3b', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '12px' },
  editButton: { marginTop: '20px', width: '100%', background: '#175cd3', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  saveButton: { width: '100%', background: '#187a3b', color: 'white', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '8px' },
  cancelButton: { width: '100%', background: '#667085', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '10px' },
  disabledButton: { width: '100%', background: '#999', color: 'white', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'not-allowed', fontSize: '16px' },
  organizerToolsButton: { marginTop: '20px', width: '100%', background: '#07152b', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  closeButton: { marginTop: '20px', width: '100%', background: '#444', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },

  rosterHeader: { marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  rosterHeaderMobile: { marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' },

  rosterTitle: { fontSize: '22px', margin: 0 },
  rosterCount: { margin: 0, color: '#667085' },

  rosterGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '14px' },
  rosterGridMobile: { display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginTop: '14px' },

  teamBox: { border: '1px solid #d8dee8', borderRadius: '12px', padding: '16px', background: '#fbfcfe' },
  teamTitle: { textAlign: 'center', margin: '0 0 12px', fontSize: '20px', color: '#07152b', fontWeight: 'bold' },

  rosterList: { paddingLeft: '24px', marginBottom: 0 },
  goalieLine: { fontWeight: 'bold', marginBottom: '8px', color: '#07152b' },
  playerLine: { marginBottom: '7px' },

  playerRow: { display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' },
  playerRowMobile: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' },

  buttonGroup: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  buttonGroupMobile: { display: 'flex', gap: '6px', flexWrap: 'wrap', width: '100%' },

  moveButton: { background: '#175cd3', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 9px', fontSize: '12px', cursor: 'pointer' },
  removeButton: { background: '#b42318', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 9px', fontSize: '12px', cursor: 'pointer' },
  paidButton: { background: '#187a3b', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 9px', fontSize: '12px', cursor: 'pointer' },
  unpaidButton: { background: '#667085', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 9px', fontSize: '12px', cursor: 'pointer' },

  paidBadge: { marginLeft: '8px', background: '#e9f7ef', color: '#187a3b', padding: '2px 6px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' },
  unpaidBadge: { marginLeft: '8px', background: '#fdecea', color: '#b42318', padding: '2px 6px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' },

  mobileFriendlyList: { paddingLeft: '20px', wordBreak: 'break-word' },
}
