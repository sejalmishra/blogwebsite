import { MediumLogo } from "phosphor-react"

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
      <div style={{ display: "flex", border: "1px solid green", alignItems: "center",width: "15.7%", justifyContent: "space-between" }}>
       <MediumLogo size={70} weight="fill" color="black"/>
        <h1 style={{fontSize: "45px", fontWeight: "900", letterSpacing: "-0.8px"}}>Medium</h1>
      </div>
      <div style={{ display: "flex", border: "1px solid green", alignItems: "center",width: "20%", justifyContent: "space-between" }}>
        <button>Write</button>
        <button>Sign In</button>
        <button>Get Started</button>
      </div>
    </div>
  );
}

export default Header;
