export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>GTA Hockey Club</h1>
      <p>Good People. Great Games. Better Hockey.</p>

      <h2>Upcoming Games</h2>

      <div style={{ border: "1px solid #ccc", padding: 20, marginTop: 20 }}>
        <h3>Richmond Hill Arena</h3>
        <p>Tuesday 9:30 PM</p>
        <p>$20 • 10 / 20 spots filled</p>
        <button>Join Game</button>
      </div>
    </div>
  );
}
