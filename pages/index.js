export default function Home() {
  const games = [
    {
      arena: "Richmond Hill Arena",
      date: "Tuesday",
      time: "9:30 PM",
      cost: "$20",
      spots: "10 / 20 spots filled",
      level: "Recreational",
    },
    {
      arena: "Canlan York",
      date: "Thursday",
      time: "10:00 PM",
      cost: "$25",
      spots: "14 / 22 spots filled",
      level: "Intermediate",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>

      {/* HERO BANNER */}
      <div
        style={{
          backgroundImage: "url('/GTAHOCKEYCLUBBANNER.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#07152b",
          height: "420px",
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Upcoming Games</h2>

        {games.map((game, index) => (
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
            <p>{game.spots}</p>
            <p>Level: {game.level}</p>

            <button
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
          </div>
        ))}
      </div>

    </div>
  );
}
