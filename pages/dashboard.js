export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b1220",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1
  style={{
    fontSize: "42px",
    marginBottom: "10px",
    color: "#facc15"
  }}
>
  Organizer Dashboard
</h1>
      <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
        Manage your GTA Hockey Club games and players.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
     <div
  style={{
    backgroundColor: "#111827",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #1f2937",
    boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
  }}
>
  <h2 style={{ marginBottom: "10px" }}>My Games</h2>

  <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
    View and manage your posted games.
  </p>

  <button
    style={{
      backgroundColor: "#facc15",
      color: "black",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    View Games
  </button>
</div>
        <div
          style={{
            backgroundColor: "#111827",
            padding: "25px",
            borderRadius: "12px"
          }}
        >
          <h2>Post Game</h2>
          <p>Create a new pickup hockey game.</p>
        </div>

       <div
  style={{
    backgroundColor: "#111827",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #1f2937",
    boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
  }}
>
  <h2 style={{ marginBottom: "10px" }}>Players</h2>

  <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
    Manage players and attendance.
  </p>

  <button
    style={{
      backgroundColor: "#facc15",
      color: "black",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Manage Players
  </button>
</div>

        <div
          style={{
            backgroundColor: "#111827",
            padding: "25px",
            borderRadius: "12px"
          }}
        >
          <h2>Payments</h2>
          <p>Track paid and unpaid players.</p>
        </div>
      </div>
    </div>
  )
}
