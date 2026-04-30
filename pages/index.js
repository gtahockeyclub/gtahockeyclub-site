export default function Home() {
  const games = [
    {
      arena: "Richmond Hill Arena",
      date: "Tuesday",
      time: "9:30 PM",
      cost: "$20",
      spots: "10 / 20 spots filled",
      level: "Recreational"
    },
    {
      arena: "Canlan York",
      date: "Thursday",
      time: "10:00 PM",
      cost: "$25",
      spots: "14 / 22 spots filled",
      level: "Intermediate"
    }
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, background: "#07152b", color: "white" }}>
      <section
        style={{
          minHeight: "520px",
          backgroundImage: "linear-gradient(rgba(3,10,25,0.65), rgba(3,10,25,0.8)), url('/gtahc-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "40px"
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <h1 style={{ fontSize: "58px", margin: 0, lineHeight: 1 }}>
            GTA Hockey Club
          </h1>

          <p style={{ fontSize: "28px", color: "#ffd42a", fontWeight: "bold", marginTop: "16px" }}>
            Good people. Great games. Better hockey.
          </p>

          <p style={{ fontSize: "20px", lineHeight: 1.5, maxWidth: "580px" }}>
            Find recreational pickup hockey games across the GTA. Organizers post games. Players join in. All levels welcome.
          </p>

          <div style={{ marginTop: "28px" }}>
            <a
              href="#games"
              style={{
                background: "#e31b23",
                color: "white",
                padding: "14px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "12px"
              }}
            >
              View Games
            </a>

            <a
              href="#organizers"
              style={{
                background: "#ffd42a",
                color: "#07152b",
                padding: "14px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Post a Game
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "50px 40px", background: "#0b1f3f" }}>
        <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "30px" }}>
          Find a Group. Get Out and Play.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            "Looking to get back into playing?",
            "New to the area?",
            "Want to meet new people?",
            "Just love the game?"
          ].map((text) => (
            <div key={text} style={{ background: "#102b55", padding: "22px", borderRadius: "10px", border: "1px solid #244a82" }}>
              <p style={{ fontSize: "18px", margin: 0 }}>✓ {text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="games" style={{ padding: "50px 40px", background: "white", color: "#07152b" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center" }}>Upcoming Games</h2>

        <div style={{ maxWidth: "900px", margin: "30px auto", display: "grid", gap: "18px" }}>
          {games.map((game) => (
            <div key={game.arena} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: "26px", marginTop: 0 }}>{game.arena}</h3>
              <p><strong>{game.date}</strong> at {game.time}</p>
              <p>{game.cost} • {game.spots}</p>
              <p>Level: {game.level}</p>
              <button style={{ background: "#e31b23", color: "white", border: 0, padding: "12px 20px", borderRadius: "6px", fontWeight: "bold" }}>
                Join Game
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="organizers" style={{ padding: "50px 40px", background: "#ffd42a", color: "#07152b", textAlign: "center" }}>
        <h2 style={{ fontSize: "34px" }}>Organizers Post Games. Players Join In.</h2>
        <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto 24px" }}>
          Run weekly pickup hockey? GTA Hockey Club gives organizers a simple place to post games, manage rosters, track spots, and grow their group.
        </p>
        <button style={{ background: "#07152b", color: "white", border: 0, padding: "14px 24px", borderRadius: "6px", fontWeight: "bold" }}>
          Organizer Access Coming Soon
        </button>
      </section>

      <footer style={{ padding: "24px", textAlign: "center", background: "#061124", color: "white" }}>
        GTA Hockey Club • Community Driven. Hockey Focused.
      </footer>
    </div>
  );
}
