import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Scan.css';


function ScanQR() {
    const [scannerInitialized, setScannerInitialized] = useState(false);

    const startScanner = () => {
        const domReady = (fn) => {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                setTimeout(fn, 1);
            } else {
                document.addEventListener("DOMContentLoaded", fn);
            }
        };

        domReady(() => {
            const resultContainer = document.getElementById('you-qr-result');
            let lastResult;

            const onScanSuccess = (decodedText, decodedResult) => {
                if (lastResult !== decodedText) {
                    lastResult = decodedText;
                    resultContainer.innerHTML = `Scanned: ${decodedText}`;
                    window.location.href = decodedText; //ไว้วิ่งไปยัง url ของ qrcode
                }
            };

            const htmlscanner = new Html5QrcodeScanner(
                "my-qr-reader",
                { 
                    qrbox: 300, 
                    fps: 30,
                    rememberLastUsedCamera: true
                }
            );
            htmlscanner.render(onScanSuccess);
            setScannerInitialized(true);
        });
    };

    return (
        <div className="container">
        <div className="scan-container">
            <div className="you-qr-result">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div id="my-qr-reader" style={{ width: '300px', display: scannerInitialized ? 'block' : 'none' }}></div>
                </div>
                <center><div id="you-qr-result"></div></center>
                {!scannerInitialized && (
                    <center><button onClick={startScanner} className="scan-page-button">Start Scanning</button></center>
                )}
            </div>
        </div>
        </div>
    );
}

export default ScanQR;
