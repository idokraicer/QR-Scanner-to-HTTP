import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  const webhookUrl = "https://hook.eu2.make.com/5vldkxaz43gcda9c2dq5nnps4iofisd9";
  // Data to be sent in the request
  let data = {
    barcode: decodedText
  };
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}
function loadScanner() {
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function App() {
  useEffect(() => {
    loadScanner();
  });
  return (
    <div className="App">
      <header className="App-header">
        Hey
        <div id="reader" width="600px"></div>
      </header>

    </div>
  );
}

export default App;
