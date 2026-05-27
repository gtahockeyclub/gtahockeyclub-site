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

    <div style={{
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1>GTA Hockey Club</h1>

      <p>
        Homepage working.
      </p>

            <p>
        Loaded: {loaded ? "YES" : "NO"}
      </p>

    </div>
  </>
)
}
