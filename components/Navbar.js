import Link from "next/link"

export default function Navbar() {

  return (

    <nav
      style={{
        width: "100%",
        background: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        borderBottom: "1px solid #e5e7eb"
      }}
    >

      <div
        style={{
          fontSize: "28px",
          fontWeight: "900",
          color: "#07152b"
        }}
      >
        GTA Hockey Club
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center"
        }}
      >

        <Link href="/" style={styles.link}>
          Home
        </Link>

        <Link href="/find-games" style={styles.link}>
          Find Games
        </Link>

        <Link href="/about" style={styles.link}>
          About
        </Link>

      </div>

    </nav>
  )
}

const styles = {

  link: {
    color: "#07152b",
    textDecoration: "none",
    fontWeight: "bold"
  }

}
