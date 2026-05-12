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
        backgroundColor: "#f3f4f6",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#111827"
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
                backgroundColor: "white",
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
                  backgroundColor: "white",
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
