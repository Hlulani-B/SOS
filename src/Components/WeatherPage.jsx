import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { VideoRecorder } from "./videoButton";
import { AudioRecorder } from "./audioButton";
import { SOSButton } from "./SOSButton";

const CITIES = {
  "Johannesburg": { temp: 24, condition: "Sunny", humidity: 35, wind: 14, icon: "☀️", action: "video" },
  "Cape Town": { temp: 18, condition: "Rainy", humidity: 78, wind: 28, icon: "🌧️", action: "sos" },
  "Durban": { temp: 27, condition: "Partly Cloudy", humidity: 65, wind: 10, icon: "⛅", action: "audio" },
  "London": { temp: 12, condition: "Overcast", humidity: 82, wind: 18, icon: "☁️", action: null },
  "New York": { temp: 21, condition: "Clear", humidity: 50, wind: 12, icon: "🌤️", action: null },
};

const ACTION_COLORS = {
  video: "#556b2f",
  sos: "#ff2d75",
  audio: "#eab308"
};

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState("London");
  const [searchInput, setSearchInput] = useState("");

  const weather = CITIES[selectedCity] || { temp: 22, condition: "Fair", humidity: 45, wind: 10, icon: "🌤️" };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const formatted = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();
    setSelectedCity(formatted);
    setSearchInput("");
  };

  // Shared chip look applied to both plain cities and the safety components
  const chip = (borderColor) => ({
    padding: "12px 22px",
    border: `1px solid ${borderColor}`,
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.15s ease"
  });

  const renderCityChip = (cityName) => {
    const city = CITIES[cityName];
    const isSelected = selectedCity === cityName;

    // Plain city - a normal button
    if (!city.action) {
      return (
        <button
          key={cityName}
          style={
            isSelected
              ? { ...chip("#1a1a1a"), background: "#1a1a1a", color: "#fff" }
              : { ...chip("#e5e5e5"), background: "#fff", color: "#1a1a1a" }
          }
          onClick={() => setSelectedCity(cityName)}
        >
          {cityName}
        </button>
      );
    }

    // Safety city - the user's component disguised as a city chip
    const color = ACTION_COLORS[city.action];
    const dot = (
      <span
        key="dot"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: isSelected ? "#fff" : color,
          flexShrink: 0
        }}
      />
    );

    const commonProps = {
      style: chip(color),
      onPress: () => setSelectedCity(cityName),
      idleColor: isSelected ? color : "#fff",
      idleTextColor: isSelected ? "#fff" : "#1a1a1a",
      activeColor: "#ff3b30",
      activeTextColor: "#fff"
    };

    if (city.action === "video") {
      return (
        <VideoRecorder key={cityName} {...commonProps}>
          {dot}{cityName}
        </VideoRecorder>
      );
    }
    if (city.action === "sos") {
      return (
        <SOSButton key={cityName} {...commonProps}>
          {dot}{cityName}
        </SOSButton>
      );
    }
    return (
      <AudioRecorder key={cityName} {...commonProps}>
        {dot}{cityName}
      </AudioRecorder>
    );
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>
      <SideMenu title="Weather" theme="light" />

      {/* Header */}
      <header className="weather-header" style={styles.header}>
        <div className="weather-header-inner" style={styles.headerInner}>
          <h1 className="weather-logo" style={styles.logo}>Weather</h1>
          <form onSubmit={handleSearch} className="weather-search" style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search city"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={styles.searchInput}
            />
          </form>
        </div>
      </header>

      {/* Current Conditions */}
      <section className="weather-current" style={styles.current}>
        <div style={styles.currentInner}>
          <div style={styles.cityName}>{selectedCity}</div>
          <div style={styles.tempRow}>
            <span className="icon" style={styles.icon}>{weather.icon}</span>
            <span className="temp" style={styles.temp}>{weather.temp}°</span>
          </div>
          <div style={styles.condition}>{weather.condition}</div>
          <div style={styles.details}>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Humidity</div>
              <div style={styles.detailValue}>{weather.humidity}%</div>
            </div>
            <div style={styles.detailDivider} />
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Wind</div>
              <div style={styles.detailValue}>{weather.wind} km/h</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section style={styles.citiesSection}>
        <h3 style={styles.sectionTitle}>Popular cities</h3>
        <div style={styles.chips}>
          {Object.keys(CITIES).map((city) => renderCityChip(city))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#fafafa",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#1a1a1a"
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
    gap: "24px",
    paddingLeft: "72px"
  },
  logo: {
    fontSize: "28px",
    fontWeight: 300,
    letterSpacing: "0.05em",
    margin: 0,
    color: "#1a1a1a"
  },
  searchForm: {
    flex: "0 1 320px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 18px",
    border: "1px solid #e5e5e5",
    borderRadius: "20px",
    background: "#f5f5f5",
    color: "#1a1a1a",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s"
  },
  current: {
    background: "#fff",
    borderBottom: "1px solid #e5e5e5",
    padding: "72px 24px",
    textAlign: "center"
  },
  currentInner: {
    maxWidth: "480px",
    margin: "0 auto"
  },
  cityName: {
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#666",
    marginBottom: "24px"
  },
  tempRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "8px"
  },
  icon: {
    fontSize: "72px",
    lineHeight: 1
  },
  temp: {
    fontSize: "96px",
    fontWeight: 200,
    color: "#1a1a1a",
    lineHeight: 1
  },
  condition: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "40px"
  },
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px"
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  detailDivider: {
    width: "1px",
    height: "36px",
    background: "#e5e5e5"
  },
  detailLabel: {
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#999"
  },
  detailValue: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1a1a1a"
  },
  citiesSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 24px 80px"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: 400,
    marginBottom: "24px",
    color: "#1a1a1a"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; -webkit-tap-highlight-color: transparent; }
  button:active { transform: scale(0.96); }
  input:focus { border-color: #bbb !important; background: #fff !important; }

  /* Mobile: stack the header below the hamburger, tighten the forecast */
  @media (max-width: 640px) {
    .weather-header { padding: 14px 16px !important; }
    .weather-header-inner {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 20px !important; /* search box starts below the 42px hamburger */
      padding-left: 0 !important;
    }
    .weather-logo { margin-left: 72px !important; } /* clears the fixed hamburger */
    .weather-search { flex: 1 1 auto !important; max-width: none !important; }
    .weather-current { padding: 44px 20px !important; }
    .temp { font-size: 72px !important; }
    .icon { font-size: 56px !important; }
  }
`;
