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
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>

      {/* HERO BANNER */}
      <section
        style={{
          minHeight: "520px",
          backgroundImage: "url('/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: "40px"
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.65)",
            padding: "24px",
            borderRadius: "10px",
            maxWidth: "600px",
            color: "white"
          }}
        >
          <h1 style={{ fontSize: "48px", margin: 0 }}>
            GTA Hockey Club
          </h1>

          <p style={{ fontSize: "22px", color: "#ffd42a", fontWeight: "bold" }}>
            Good people. Great games. Better hockey.
          </p>

          <p style={{ fontSize: "18px" }}>
            Find recreational pickup hockey games across the GTA. Organizers post games. Players join in.
          </p>

          <div style={{ marginTop: "20px" }}>
            <a
              href="#games"
              style={{
                background: "#e31b23",
                color: "white",
                padding: "12px 20px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "10px"
              }}
            >
              View Games
            </a>

            <a
              href="#organizers"
              style={{
                background: "#ffd42a",
                color: "#000",
                padding: "12px 20px",
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

      {/* VALUE SECTION */}
      <section style={{ padding: "50px 30px", background: "#0b1f3f", color: "white" }}>
        <h2 style={{ textAlign: "center", fontSize: "34px" }}>
          Find a Group. Get Out and Play.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "30px auto"
          }}
        >
          {[
            "Looking to get back into playing?",
            "New to the area?",
            "Want to meet new people?",
            "Just love the game?"
          ].map((text) => (
            <div
              key={text}
              style={{
                background: "#102b55",
                padding: "20px",
                borderRadius: "10px"
              }}
            >
              ✓ {text}
            </div>
          ))}
        </div>
      </section>

      {/* GAMES */}
      <section id="games" style={{ padding: "50px 30px", background: "#f4f4f4" }}>
        <h2 style={{ textAlign: "center", fontSize: "34px" }}>
          Upcoming Games
        </h2>

        <div style={{ maxWidth: "900px", margin: "30px auto", display: "grid", gap: "20px" }}>
          {games.map((game) => (
            <div
              key={game.arena}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ marginTop: 0 }}>{game.arena}</h3>
              <p>{game.date} • {game.time}</p>
              <p>{game.cost} • {game.spots}</p>
              <p>Level: {game.level}</p>

              <button
                style={{
                  background: "#e31b23",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  fontWeight: "bold"
                }}
              >
                Join Game
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ORGANIZERS */}
      <section id="organizers" style={{ padding: "50px 30px", background: "#ffd42a", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px" }}>
          Organizers Post Games. Players Join In.
        </h2>

        <p style={{ maxWidth: "700px", margin: "0 auto 20px" }}>
          Run weekly pickup hockey? Post your games, manage your roster, and grow your group.
        </p>

        <button
          style={{
            background: "#000",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            border: "none"
          }}
        >
          Organizer Access Coming Soon
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "20px", textAlign: "center", background: "#07152b", color: "white" }}>
        GTA Hockey Club • Community Driven. Hockey Focused.
      </footer>

    </div>
  );
}
