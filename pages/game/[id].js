import { useRouter } from "next/router"

export default function GameDetails() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          color: "#facc15",
          marginBottom: "10px"
        }}
      >
        Game Details
      </h1>

      <p style={{ color: "#cbd5e1", marginBottom: "40px" }}>
        Game ID: {id}
      </p>

      <div
        style={{
          backgroundColor: "white",
          color: "#111827",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Game Information</h2>

        <p>Arena:</p>
        <p>Date:</p>
        <p>Time:</p>
        <p>Skill Level:</p>
        <p>Price:</p>

        <button
          style={{
            marginTop: "30px",
            backgroundColor: "#facc15",
            color: "black",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Join Game
        </button>
      </div>
    </div>
  )
}
