import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { VideoRecorder } from "./videoButton";
import { AudioRecorder } from "./audioButton";
import { SOSButton } from "./SOSButton";

const PRODUCTS = [
  { id: 1, name: "Silk Midi Dress", price: "R2,499", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", action: "video" },
  { id: 2, name: "Cashmere Sweater", price: "R1,899", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80", action: "sos" },
  { id: 3, name: "Linen Blazer", price: "R3,299", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80", action: "audio" },
  { id: 4, name: "Leather Bag", price: "R4,599", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80", action: null },
];

export default function ClothingPage() {
  const [bag, setBag] = useState([]);

  const handleAddToBag = (product) => {
    setBag([...bag, product.id]);
  };

  // Shared button look - applied to the safety components too
  const productBtn = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  };

  const renderProductButton = (product) => {
    if (product.action === "video") {
      return (
        <VideoRecorder
          style={productBtn}
          text="Quick View"
          idleColor="#556b2f"
          idleTextColor="#ffffff"
          activeColor="#ff3b30"
          activeTextColor="#ffffff"
        />
      );
    }
    if (product.action === "sos") {
      return (
        <SOSButton
          style={productBtn}
          text="Quick View"
          idleColor="#ff2d75"
          idleTextColor="#ffffff"
          activeColor="#ff3b30"
          activeTextColor="#ffffff"
        />
      );
    }
    if (product.action === "audio") {
      return (
        <AudioRecorder
          style={productBtn}
          text="Quick View"
          idleColor="#eab308"
          idleTextColor="#1a1a1a"
          activeColor="#ff3b30"
          activeTextColor="#ffffff"
        />
      );
    }
    return (
      <button
        style={{ ...productBtn, background: "#1a1a1a", color: "#fff" }}
        onClick={() => handleAddToBag(product)}
      >
        {bag.includes(product.id) ? "Added ✓" : "Add to Bag"}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>
      <SideMenu title="Maison" theme="light" />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.logo}>Maison</h1>
          <div style={styles.bag}>
            Bag ({bag.length})
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h2 className="hero-title" style={styles.heroTitle}>Autumn Collection</h2>
          <p style={styles.heroSubtitle}>Timeless pieces for the modern wardrobe</p>
        </div>
      </section>

      {/* Products */}
      <section className="products" style={styles.products}>
        <h3 style={styles.sectionTitle}>New Arrivals</h3>
        <div className="grid" style={styles.grid}>
          {PRODUCTS.map((product) => (
            <div key={product.id} style={styles.card}>
              <img src={product.img} alt={product.name} style={styles.image} />
              <div style={styles.cardBody}>
                <h4 style={styles.productName}>{product.name}</h4>
                <p style={styles.productPrice}>{product.price}</p>
                {renderProductButton(product)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#fafafa",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e5e5",
    padding: "20px 24px",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "72px"
  },
  logo: {
    fontSize: "28px",
    fontWeight: "300",
    letterSpacing: "0.05em",
    margin: 0,
    color: "#1a1a1a"
  },
  bag: {
    padding: "8px 16px",
    background: "#f5f5f5",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500"
  },
  hero: {
    height: "400px",
    backgroundImage: "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center"
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "300",
    letterSpacing: "0.02em",
    margin: "0 0 12px 0"
  },
  heroSubtitle: {
    fontSize: "16px",
    fontWeight: "400",
    margin: 0,
    opacity: 0.9
  },
  products: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 24px"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "400",
    marginBottom: "32px",
    color: "#1a1a1a"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    transition: "transform 0.2s"
  },
  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover"
  },
  cardBody: {
    padding: "16px"
  },
  productName: {
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 8px 0",
    color: "#1a1a1a"
  },
  productPrice: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 16px 0"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; -webkit-tap-highlight-color: transparent; }
  button:active { transform: scale(0.98); }
  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr !important; }
    .hero { height: 260px !important; }
    .hero-title { font-size: 30px !important; }
    .products { padding: 40px 20px !important; }
  }
`;
