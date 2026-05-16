export default function About() {
  return (
    <div
  style={{
    minHeight: "100vh",
    background: "#f3f5f8",
    padding: "40px 40px",
    fontFamily: "Arial, sans-serif",
    color: "#07152b"
  }}
>

<div
  style={{
    position: "relative",
    width: "100%",
    height: "520px",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>
  <img
    src="/about-hero.png"
    alt="About GTA Hockey Club"
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(45%)"
    }}
  />

  <div
    style={{
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      color: "white",
      padding: "20px"
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
        color: "#facc15"
      }}
    >
      POST. CONNECT. PLAY.
    </h2>
  </div>
</div> 

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px 0"
    }}
  >
               <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px"
          }}
        >
          About GTA Hockey Club
        </h1>

        <h2
          style={{
            color: "#facc15",
            marginBottom: "40px"
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
          Our goal is simple: Help players find more games and help
          organizers keep games full.
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
            marginTop: "50px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "22px"
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
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "25px"
  },

  sectionTitle: {
    marginTop: "50px",
    marginBottom: "20px",
    fontSize: "32px"
  },

  list: {
    paddingLeft: "25px",
    lineHeight: "2",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "30px"
  },

  card: {
    background: "#f8fafc",
    padding: "25px",
    borderRadius: "16px"
  }
}
