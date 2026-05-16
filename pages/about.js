export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/about-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        padding: "60px 40px",
        fontFamily: "Arial, sans-serif",
        color: "white"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.68)",
          zIndex: 1
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "10px",
            fontWeight: "900"
          }}
        >
          About GTA Hockey Club
        </h1>

        <h2
          style={{
            fontSize: "28px",
            letterSpacing: "4px",
            color: "#facc15",
            marginBottom: "50px"
          }}
        >
          POST. CONNECT. PLAY.
        </h2>

        <p style={styles.paragraph}>
          GTA Hockey Club was created to bring together players,
          goalies, organizers, and the local hockey community
          across Toronto and the GTA.
        </p>

        <p style={styles.paragraph}>
          What started as a simple way to help players find pickup
          and shinny hockey has grown into a community built around
          one thing — keeping the game going.
        </p>

        <p style={styles.paragraph}>
          Whether you're looking for a late-night shinny game, a
          competitive skate, or players to fill your roster, GTA
          Hockey Club helps connect the hockey community in one
          place.
        </p>

        <p style={styles.paragraph}>
          We believe hockey should be:
        </p>

        <ul style={styles.list}>
          <li>Easy to access</li>
          <li>Fun and organized</li>
          <li>Respectful and welcoming</li>
          <li>Built around community</li>
        </ul>

        <p style={styles.paragraph}>
          Our goal is simple:
          Help players find more games and help organizers keep
          games full.
        </p>

        <p style={styles.paragraph}>
          From beginners to experienced players, all skill levels
          are welcome.
        </p>

        <h2 style={styles.sectionTitle}>
          Built for Players and Organizers
        </h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Players Can</h3>

            <ul style={styles.list}>
              <li>Find pickup and shinny games across the GTA</li>
              <li>Connect with local hockey communities</li>
              <li>Play on their own schedule</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h3>Organizers Can</h3>

            <ul style={styles.list}>
              <li>Share and promote upcoming games</li>
              <li>Reach more players</li>
              <li>Build stronger hockey communities</li>
            </ul>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>
          More Than Just Hockey
        </h2>

        <p style={styles.paragraph}>
          GTA Hockey Club is about more than filling spots on the
          ice.
        </p>

        <p style={styles.paragraph}>
          It’s about:
        </p>

        <ul style={styles.list}>
          <li>Building friendships</li>
          <li>Supporting local organizers</li>
          <li>Growing the game</li>
          <li>Creating a positive hockey experience for everyone</li>
        </ul>

        <p style={styles.paragraph}>
          As the community continues to grow, we’re building new
          tools and features to make it even easier for players and
          organizers to connect.
        </p>

        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px"
          }}
        >
          One hockey community.
          <br />
          Built by hockey people, for hockey people.
        </div>
      </div>
    </div>
  )
}

const styles = {
  paragraph: {
    fontSize: "20px",
    lineHeight: "1.9",
    marginBottom: "28px",
    maxWidth: "1000px"
  },

  sectionTitle: {
    marginTop: "60px",
    marginBottom: "25px",
    fontSize: "38px",
    color: "#facc15"
  },

  list: {
    paddingLeft: "28px",
    lineHeight: "2",
    marginBottom: "30px",
    fontSize: "19px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "30px"
  },

  card: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    padding: "28px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.18)"
  }
}
