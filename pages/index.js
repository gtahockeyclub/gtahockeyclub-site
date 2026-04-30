export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* Banner */}
      <div style={{
        backgroundImage: "url('/gtahc-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        <h1 style={{ fontSize: "48px", background: "rgba(0,0,0,0.5)", padding: "10px 20px" }}>
          GTA Hockey Club
        </h1>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <p>Good people. Great games. Better hockey.</p>
      </div>

      {/* Games Section */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Upcoming Games</h2>

        <div style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h3>Richmond Hill Arena</h3>
          <p>Tuesday 9:30 PM</p>
          <p>$20 • 10 / 20 spots filled</p>
          <button>Join Game</button>
        </div>

      </div>

    </div>
  );
}
