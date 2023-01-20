import "./App.css";
import QrCode from "qrcode.react";
// import QrReader from "react-qr-scanner";
import QrReader from "modern-react-qr-reader";
import { useRef, useState } from "react";

function App() {
  const qrRef = useRef();
  const [url, setUrl] = useState("asek");
  const bgColor = "#FFFFFF";
  const qrColor = "#000000";
  const imgCustom = "logo192.png";

  const downloadQR = (e) => {
    e.preventDefault();
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrImg = qrCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrImg;
    link.download = "qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const delay = 100;
  const [result, setResult] = useState();

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  // const previewStyle = {
  //   height: 240,
  //   width: 320,
  // };

  // const [isFront, setIsFront] = useState(false);
  // const handleCamera = () => {
  //   setIsFront(!isFront);
  // };

  return (
    <div className="App">
      <h1>
        QRCODE GENERATOR
        <br />
        IN NUTSHELL
      </h1>
      <div className="input-container">
        <h2>Input your link here</h2>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="..."
        />
      </div>
      <div ref={qrRef} className="qr-container">
        <QrCode
          size={250}
          value={url ? url : "https://travolgi.com"}
          bgColor={bgColor}
          fgColor={qrColor}
          level="H"
          includeMargin
          imageSettings={{
            src: imgCustom,
            height: 45,
            width: 45,
            excavate: true,
          }}
        />
      </div>

      <form onSubmit={downloadQR}>
        <button type="submit" className="download">
          Download
        </button>
      </form>
      <div className="scanner">
        {/* <button onClick={handleCamera}>
          {isFront ? "Front" : "Back"} Camera
        </button> */}
        {!result && (
          <QrReader
            delay={delay}
            style={{ width: "100%" }}
            onError={handleError}
            onScan={handleScan}
            // constraints={{
            //   facingMode: { exact: isFront ? "user" : "environment" },
            // }}
            // constraints={{ facingMode: isFront ? "front" : "rear" }}
            // facingMode={isFront ? "front" : "rear"}
            // facingMode={isFront ? "user" : "environment"}
          />
        )}
        <p>Hasil Scan : {result}</p>
      </div>
    </div>
  );
}

export default App;
