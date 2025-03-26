import { FaBold } from "react-icons/fa";

export default function UnderConstruction() {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center"
        }}>
            <h1 style={{ fontSize: "30px", fontStyle: "Bold" }}>🚧 Under uppbyggnad 🚧</h1>
            <p style={{ paddingBottom: "20px" }}>Gör dig redo för en ny shoppingupplevelse på Åland, Sverige och Finland!.</p>

            <img src="/assets/images/eubild.png" alt="EU Bild" width={"900px"} />
        </div>
    );
}
