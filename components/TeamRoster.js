export default function TeamRoster({
  displayName,
  roster,
  teamName,
  isOrganizer,
  handleRemovePlayer,
  handleMovePlayer,
  handleTogglePaid
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
        <strong style={{ color: "white" }}>
          Goalie
        </strong>

        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#111827",
            color: "white",
            border: "1px solid #374151",
            padding: "12px",
            borderRadius: "8px"
          }}
        >
       {goalie ? (
  <>
    {goalie.player_name || goalie.name}

    {isOrganizer && (
      <div
        style={{
          marginTop: "8px",
          fontSize: "13px",
          color: "#4ade80"
        }}
      >
        FREE GOALIE
      </div>
    )}
  </>
) : (
  "Open Goalie Spot"
  )}
  </div>
      </div>

      <div>
        <strong style={{ color: "white" }}>
          Skaters
        </strong>

        <div style={{ marginTop: "10px" }}>
          {skaters.length === 0 ? (
            <div
              style={{
                backgroundColor: "#111827",
                color: "white",
                border: "1px solid #374151",
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
                  backgroundColor: "#111827",
                  color: "white",
                  border: "1px solid #374151",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              >
                {player.player_name || player.name}
{isOrganizer && (
  <div
    style={{
      display: "flex",
      gap: "8px",
      marginTop: "10px",
      flexWrap: "wrap"
    }}
  >
    <button
      onClick={() =>
        handleTogglePaid(player)
      }
      style={{
        backgroundColor: player.paid
          ? "#16a34a"
          : "#dc2626",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px"
      }}
    >
      {player.paid
        ? "PAID"
        : "UNPAID"}
    </button>

    <button
      onClick={() =>
        handleMovePlayer(
          player,
          roster
        )
      }
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px"
      }}
    >
      MOVE
    </button>

    <button
      onClick={() =>
        handleRemovePlayer(
          player.id,
          player.player_name
        )
      }
      style={{
        backgroundColor: "#111827",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px"
      }}
    >
      REMOVE
    </button>
  </div>
)}
{isOrganizer && (
  <div
    style={{
      marginTop: "8px",
      fontSize: "13px",
      color: player.paid
        ? "#4ade80"
        : "#f87171"
    }}
  >
    {player.paid ? "PAID" : "UNPAID"}
  </div>
)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
