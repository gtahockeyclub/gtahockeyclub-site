import { useState } from "react"

export default function JoinGameForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [playerType, setPlayerType] =
    useState("Skater")

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid #334155",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        marginBottom: "30px"
      }}
    >
      <h2
        style={{
          color: "#facc15",
          marginBottom: "20px"
        }}
      >
        Join This Game
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <select
        value={playerType}
        onChange={(e) =>
          setPlayerType(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white"
        }}
      >
        <option>Skater</option>
        <option>Goalie</option>
      </select>

      <button
        style={{
          width: "100%",
          backgroundColor: "#facc15",
          color: "black",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Join Game
      </button>
    </div>
  )
}
