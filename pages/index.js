import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
export default function Home() {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
  <>
    <Navbar />

    <div
  style={{
    minHeight: "700px",
    backgroundImage: 'url("/hero-hockey-bg.png.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    padding: "60px",
    boxSizing: "border-box"
  }}
>

  <div
    style={{
      maxWidth: "650px"
    }}
  >

    <h1
      style={{
        fontSize: "96px",
        lineHeight: "0.9",
        margin: 0,
        fontWeight: "900"
      }}
    >
      <span style={{ color: "#D62828" }}>
        POST.
      </span>

      <br />

      <span style={{ color: "#0B1F3A" }}>
        CONNECT.
      </span>

      <br />

      <span style={{ color: "#F4B400" }}>
        PLAY.
      </span>
    </h1>

    <h2
      style={{
        fontSize: "36px",
        marginTop: "30px",
        marginBottom: "10px",
        color: "#07152b"
      }}
    >
      ONE HOCKEY COMMUNITY ACROSS THE GTA
    </h2>

    <p
      style={{
        fontSize: "20px",
        color: "#374151"
      }}
    >
      Built for players and organizers.
    </p>

  </div>

</div>
  </>
)
}
