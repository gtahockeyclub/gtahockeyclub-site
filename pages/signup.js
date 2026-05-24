import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function SignupPage() {

  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [role, setRole] = useState("player")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {

    if (!email || !password || !fullName) {
      alert("Please complete all required fields.")
      return
    }

    setLoading(true)

    const {
      data,
      error
    } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    const user = data.user

    if (user) {

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            email,
            full_name: fullName,
            phone,
            birth_year: birthYear || null,
            role
          }
        ])

      if (profileError) {
        console.log(profileError)
        alert(profileError.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)

    alert("Account created successfully.")

    router.push("/login")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}
      >

        <h1
          style={{
            fontSize: "32px",
            marginBottom: "30px",
            textAlign: "center",
            color: "#07152b"
          }}
        >
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Birth Year"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="player">Player</option>
          <option value="organizer">Organizer</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </div>
    </div>
  )
}

const styles = {

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#07152b",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }
}
