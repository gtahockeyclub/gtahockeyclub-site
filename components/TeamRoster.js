export default function TeamRoster({
  displayName,
  roster,
  teamName
}) {
  const teamRoster = roster.filter(
    (p) => p.team === teamName
  )

  const goalie = teamRoster.find(
    (p) => p.player_type === "Goalie"
  )

  const skaters = teamRoster.filter(
    (p) => p.player_type !== "Goalie"
  )

  return (
    <div
    style={{
  background:
    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid #334155",
  boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
}}
    >
      <h3
       style={{
  marginBottom: "20px",
  color: "#facc15",
  fontSize: "22px",
  fontWeight: "bold",
  borderBottom: "1px solid #334155",
  paddingBottom: "12px"
}}
      >
        {displayName}
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <strong>Goalie</strong>

        <div
          style={{
            marginTop: "10px",
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "8px"
          }}
        >
          {goalie
            ? goalie.player_name
            : "Open Goalie Spot"}
        </div>
      </div>

      <div>
        <strong>Skaters</strong>

        <div style={{ marginTop: "10px" }}>
          {skaters.length === 0 ? (
            <div
              style={{
               : "white",
                padding: "12px",
                borderRadius: "8px"
              }}
            >
              No skaters yet
            </div>
          ) : (
            skaters.map((player) => (
              <div
                key={player.id}
                style={{
                 : "white",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              >
                {player.player_name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
