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
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
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
            borderRadius: "12px"
          }}
        >
          <h2>My Games</h2>
          <p>View and manage your posted games.</p>
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
            borderRadius: "12px"
          }}
        >
          <h2>Players</h2>
          <p>Manage players and attendance.</p>
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
