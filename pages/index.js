import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../components/Navbar"

export default function Home() {

  const router = useRouter()

  const [games, setGames] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    const loadGames = async () => {

      const { data } = await supabase
        .from("games")
        .select("*")
        .eq("is_active", true)
        .order("game_date", { ascending: true })

      setGames(data || [])
    }

    loadGames()

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }

  }, [])

  return (
    <>

      <Navbar />

      <div style={styles.page}>

        <div style={styles.heroWrapper}>

          <section style={isMobile ? styles.heroMobile : styles.hero}>

            <div style={styles.heroLeft}>

              <h1 style={isMobile ? styles.heroTitleMobile : styles.heroTitle}>
                <span style={{ color: "#D62828" }}>POST.</span>
                <br />
                <span style={{ color: "#0B1F3A" }}>CONNECT.</span>
                <br />
                <span style={{ color: "#F4B400" }}>PLAY.</span>
              </h1>

              <h2 style={styles.heroSubtitle}>
                ONE HOCKEY COMMUNITY ACROSS THE GTA
              </h2>

              <p style={styles.heroText}>
                Built for players and organizers.
              </p>

              <div style={styles.heroButtons}>

                <button
                  style={styles.findGamesButton}
                  onClick={() => router.push("/find-games")}
                >
                  FIND GAMES
                </button>

                <button
                  style={styles.postGameButton}
                  onClick={() => router.push("/dashboard")}
                >
                  POST A GAME
                </button>

              </div>

              <div style={styles.statsRow}>

                <div style={styles.statBox}>
                  <h3 style={styles.statNumber}>48</h3>
                  <p style={styles.statLabel}>LIVE GAMES</p>
                </div>

                <div style={styles.statBox}>
                  <h3 style={styles.statNumber}>35+</h3>
                  <p style={styles.statLabel}>GTA ARENAS</p>
                </div>

                <div style={styles.statBox}>
                  <h3 style={styles.statNumber}>4200+</h3>
                  <p style={styles.statLabel}>ACTIVE PLAYERS</p>
                </div>

              </div>

            </div>

          </section>

        </div>

        <section
          style={
            isMobile
              ? styles.gamesSectionMobile
              : styles.gamesSection
          }
        >

          <h2
            style={
              isMobile
                ? styles.sectionTitleMobile
                : styles.sectionTitle
            }
          >
            Upcoming Games
          </h2>

          {games.length === 0 ? (

            <p style={{ textAlign: "center" }}>
              No upcoming games posted yet.
            </p>

          ) : (

            games.map((game) => (

              <div
                key={game.id}
                style={
                  isMobile
                    ? styles.gameCardMobile
                    : styles.gameCard
                }
              >

                <h3 style={styles.arena}>
                  {game.arena}
                </h3>

                <p style={styles.gameInfo}>
                  {game.game_date} • {game.game_time}
                </p>

                <p style={styles.gameInfo}>
                  {game.team1_name} vs {game.team2_name}
                </p>

                <div style={styles.signupBox}>

                  <button
                    style={styles.joinButton}
                    onClick={() => router.push(`/game/${game.id}`)}
                  >
                    View Game Details
                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      </div>

    </>
  )
}

const styles = {

  page: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    background: "#f3f5f8",
    color: "#07152b",
    width: "100%",
    overflowX: "hidden"
  },

  heroWrapper: {
    background: "#ffffff",
    paddingBottom: "20px"
  },

  hero: {
    display: "flex",
    alignItems: "center",
    minHeight: "700px",
    padding: "60px 80px",
    backgroundImage: 'url("/hero-hockey-bg.png.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },

  heroMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 22px 50px",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    backgroundImage: 'url("/hero-hockey-bg.png.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },

  heroLeft: {
    maxWidth: "620px",
    display: "flex",
    flexDirection: "column"
  },

  heroTitle: {
    fontSize: "96px",
    lineHeight: "0.88",
    margin: 0,
    fontWeight: "900"
  },

  heroTitleMobile: {
    fontSize: "58px",
    lineHeight: "0.92",
    margin: 0,
    fontWeight: "900"
  },

  heroSubtitle: {
    fontSize: "30px",
    marginTop: "28px",
    marginBottom: "10px",
    fontWeight: "900"
  },

  heroText: {
    fontSize: "18px",
    color: "#475467",
    marginBottom: "30px"
  },

  heroButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap"
  },

  findGamesButton: {
    background: "#D62828",
    color: "white",
    border: "none",
    padding: "16px 28px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  postGameButton: {
    background: "white",
    color: "#07152b",
    border: "2px solid #07152b",
    padding: "16px 28px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  statsRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "30px"
  },

  statBox: {
    background: "#f8fafc",
    padding: "16px 18px",
    borderRadius: "12px",
    flex: "1 1 120px",
    border: "1px solid #e5e7eb"
  },

  statNumber: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "900",
    color: "#07152b"
  },

  statLabel: {
    margin: "4px 0 0",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#667085"
  },

  gamesSection: {
    padding: "30px 18px 40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px"
  },

  gamesSectionMobile: {
    padding: "22px 10px 32px"
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "24px",
    gridColumn: "1 / -1"
  },

  sectionTitleMobile: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "18px"
  },

  gameCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb"
  },

  gameCardMobile: {
    background: "white",
    borderRadius: "14px",
    padding: "16px",
    maxWidth: "100%",
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    border: "1px solid #e1e5eb"
  },

  arena: {
    fontSize: "26px",
    margin: "0 0 8px"
  },

  gameInfo: {
    margin: "4px 0",
    color: "#42526b"
  },

  signupBox: {
    marginTop: "20px"
  },

  joinButton: {
    width: "100%",
    background: "#e53935",
    color: "white",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  }
}
