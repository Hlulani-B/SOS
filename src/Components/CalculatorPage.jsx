import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { VideoRecorder } from "./videoButton";
import { AudioRecorder } from "./audioButton";
import { SOSButton } from "./SOSButton";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleOperator = (nextOp) => {
    const inputValue = parseFloat(display);
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }
    setWaitingForSecond(true);
    setOperator(nextOp);
  };

  const calculate = (first, second, op) => {
    if (op === "+") return first + second;
    if (op === "-") return first - second;
    if (op === "×") return first * second;
    if (op === "÷") return second !== 0 ? first / second : "Error";
    return second;
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  // Shared circular key look - applied to every button including the safety components
  const key = {
    width: "100%",               // fluid: fills its grid column at any screen width
    height: "min(76px, 22vw)",   // trims slightly on very narrow phones
    borderRadius: "50%",
    fontSize: "28px",
    fontWeight: 400,
    fontFamily: "inherit",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "filter 0.12s ease, background-color 0.15s ease"
  };

  const numKey = { ...key, background: "#333333", color: "#ffffff" };
  const funcKey = { ...key, background: "#a5a5a5", color: "#000000", fontSize: "24px", fontWeight: 500 };
  const opKey = { ...key, background: "#ff9f0a", color: "#ffffff", fontSize: "32px" };

  const zeroKey = {
    ...numKey,               // width 100% flows in from key -> spans its 2-column track
    gridColumn: "1 / span 2",
    justifyContent: "flex-start",
    paddingLeft: 30
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>
      <SideMenu title="Calculator" theme="dark" />

      <div className="calculator" style={styles.calculator}>
        <div className="calc-display" style={styles.display}>
          <span className="calc-display-text" style={styles.displayText}>{display}</span>
        </div>

        <div style={styles.grid}>
          <button style={funcKey} onClick={clear}>AC</button>
          <button style={funcKey} onClick={() => setDisplay(String(parseFloat(display) * -1))}>+/−</button>
          <button style={funcKey} onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
          <button style={opKey} onClick={() => handleOperator("÷")}>÷</button>

          {/* 7 = SOS component disguised as a calculator key */}
          <SOSButton
            style={key}
            idleColor="#ff2d75"
            idleTextColor="#ffffff"
            activeColor="#ff3b30"
            activeTextColor="#ffffff"
            onPress={() => inputDigit(7)}
          >
            7
          </SOSButton>
          <button style={numKey} onClick={() => inputDigit(8)}>8</button>
          {/* 9 = Audio component disguised as a calculator key */}
          <AudioRecorder
            style={key}
            idleColor="#eab308"
            idleTextColor="#1a1a1a"
            activeColor="#ff3b30"
            activeTextColor="#ffffff"
            onPress={() => inputDigit(9)}
          >
            9
          </AudioRecorder>
          <button style={opKey} onClick={() => handleOperator("×")}>×</button>

          <button style={numKey} onClick={() => inputDigit(4)}>4</button>
          <button style={numKey} onClick={() => inputDigit(5)}>5</button>
          <button style={numKey} onClick={() => inputDigit(6)}>6</button>
          <button style={opKey} onClick={() => handleOperator("-")}>−</button>

          <button style={numKey} onClick={() => inputDigit(1)}>1</button>
          <button style={numKey} onClick={() => inputDigit(2)}>2</button>
          {/* 3 = Video component disguised as a calculator key */}
          <VideoRecorder
            style={key}
            idleColor="#556b2f"
            idleTextColor="#ffffff"
            activeColor="#ff3b30"
            activeTextColor="#ffffff"
            onPress={() => inputDigit(3)}
          >
            3
          </VideoRecorder>
          <button style={opKey} onClick={() => handleOperator("+")}>+</button>

          <button style={zeroKey} onClick={() => inputDigit(0)}>0</button>
          <button style={numKey} onClick={inputDecimal}>.</button>
          <button style={opKey} onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#000000",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  calculator: {
    width: "100%",
    maxWidth: "380px",
    padding: "20px 20px 40px",
    boxSizing: "border-box"
  },
  display: {
    padding: "24px 12px 20px",
    textAlign: "right",
    minHeight: "110px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  displayText: {
    color: "#ffffff",
    fontSize: "72px",
    fontWeight: 300,
    wordBreak: "break-all",
    lineHeight: 1
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    width: "100%",
    maxWidth: "346px", // 4 x 76px keys + 3 x 14px gaps - the classic size
    margin: "0 auto"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; -webkit-tap-highlight-color: transparent; }
  button:active { filter: brightness(1.35); transform: none; }

  /* Mobile: keys are fluid (1fr columns), so only typography needs trimming */
  @media (max-width: 420px) {
    .calculator { padding: 16px 16px 32px !important; }
    .calc-display { min-height: 88px !important; padding: 16px 8px 14px !important; }
    .calc-display-text { font-size: 52px !important; }
  }
`;
