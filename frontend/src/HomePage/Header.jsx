function Header() {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid green",
        alignItems: "center",
        justifyContent: "space-between",
        height: "90px",
        padding: "10px 170px",
        fontFamily: "Poppins"
      }}
    >
      <div style={{ display: "flex", border: "1px solid green" }}>
        <p>000</p>
        <h2>Medium</h2>
      </div>
      <div>
        <button>Write</button>
        <button>Sign In</button>
        <button>Get Started</button>
      </div>
    </div>
  );
}

export default Header;
