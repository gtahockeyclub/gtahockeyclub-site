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
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, background: "#07152b" }}>
      <img
        src="/GTAHOCKEYCLUBBANNER.png"
        alt="GTA Hockey Club Banner"
        style={{
          width: "100%",
          height: "auto",
          display: "block"
        }}
      />

      <section style={{ padding: "40px 24px", color: "white", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", margin: "0 0 10px" }}>
          GTA Hockey Club
        </h1>

        <p style={{ color: "#ffd42a", fontSize: "22px", fontWeight: "bold" }}>
          Good people. Great games. Better hockey.
        </p>

        <p style={{ maxWidth: "720px", margin: "0 auto", fontSize: "18px", lineHeight: "1.5" }}>
          Find recreational pickup hockey games across the GTA. Organizers post games. Players join in.
        </p>
      </section>

      <section style={{ padding: "40px 24px", background: "#ffffff", color: "#07152b" }}>
        <h2 style={{ textAlign: "center", fontSize: "34px" }}>
          Upcoming Games
        </h2>

        <div style={{ maxWidth: "900px", margin: "30px auto", display: "grid", gap: "20px" }}>
          {games.map((game) => (
            <div
              key={game.arena}
              style={{
                background: "#f7f7f7",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #ddd"
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "26px" }}>{game.arena}</h3>
              <p><strong>{game.date}</strong> • {game.time}</p>
              <p>{game.cost} • {game.spots}</p>
              <p>Level: {game.level}</p>

              <button
                style={{
                  background: "#e31b23",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Join Game
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 24px", background: "#ffd42a", color: "#07152b", textAlign: "center" }}>
        <h2>Organizers Post Games. Players Join In.</h2>
        <p>Run weekly pickup hockey? Post games, manage your roster, and grow your group.</p>
        <button
          style={{
            background: "#07152b",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          Organizer Access Coming Soon
        </button>
      </section>

      <footer style={{ padding: "20px", textAlign: "center", color: "white" }}>
        GTA Hockey Club • Community Driven. Hockey Focused.
      </footer>
    </div>
  );
}
