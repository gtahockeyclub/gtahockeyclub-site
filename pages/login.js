import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.")
      return
    }

    setLoading(true)

   const {
  data,
  error
} = await supabase.auth.signInWithPassword({
  email,
  password
})

if (error) {
  setLoading(false)
  alert(error.message)
  return
}

const user = data.user

const { data: existingProfile } = await supabase
  .from("profiles")
  .select("id")
  .eq("id", user.id)
  .single()

if (!existingProfile) {
  await supabase.from("profiles").insert([
    {
      id: user.id,
      email: user.email,
      role: "player"
    }
  ])
}
    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push("/dashboard")
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
          maxWidth: "420px",
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
          Account Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "16px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "16px"
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "#07152b",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
          
        <p
          style={{
    marginTop: "20px",
    textAlign: "center",
    color: "#475569"
  }}
>
  Don’t have an account?{" "}
  <a
    href="/signup"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none"
    }}
  >
    Create Account
  </a>
</p>
      </div>
    </div>
  )
}
