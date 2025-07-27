"use client";
import React, { useEffect, useState } from "react";

type StockValues = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

type StockData = {
  meta?: {
    symbol: string;
    timestamp: string;
  };
  values?: StockValues[];
};

type StocksState = {
  [key: string]: StockData | null;
};

type LastUpdatedState = {
  [key: string]: string | null;
};

function StockTracker() {
  const [stocks, setStocks] = useState<StocksState>({
    AAPL: null,
    NVDA: null,
    TSLA: null,
    AMZN: null,
    APP: null,
    PLTR: null,
    GOOGL: null,
    VOO: null,
    SPY: null,
    WMT: null,
  }); // Setting the initial state of our values.
  const [lastUpdated, setLastUpdated] = useState<LastUpdatedState>({
    AAPL: null,
    NVDA: null,
    TSLA: null,
    AMZN: null,
    APP: null,
    PLTR: null,
    GOOGL: null,
    VOO: null,
    SPY: null,
    WMT: null,
  }); // Setting the state for current updates. "stocks" returns an array of data from the API, setStocks is the function to update that data/state.
  // const [errorMessage, setErrorMessage] = useState(""); // Setting inital state for error message.

  useEffect(() => {
    // Using useEffect to connect to external source or an external API
    const stockSymbols = [ // These are the stocks we want to connect to. 
      "AAPL",
      "NVDA",
      "TSLA",
      "AMZN",
      "APP",
      "PLTR",
      "GOOGL",
      "VOO",
      "SPY",
      "WMT",
    ]; // Array of Stocks to grab data from

    stockSymbols.forEach((symbol) => { // For each of the stocks fetch the current data using the forEach method.
      fetch(
        `https://api.twelvedata.com/time_series?apikey=36c6d04c0f9e484183f9bf0f1376d474&interval=1min&symbol=${symbol}`
      )
       
        .then((res) => res.json()) // Converting the response to JSON
        .then((stocks) => {
          console.log(`${symbol} Data:`, stocks); // Returning the stocks data to the console.
          setStocks((prev) => ({ ...prev, [symbol]: stocks })); // Updating the state of the stocks value.
          setLastUpdated((prev) => ({
            ...prev,
            [symbol]: stocks?.meta?.timestamp,
          }));
        })
        .catch((error) =>
          console.error(`Unable to grab ${symbol} stock data`, error)
        ); // Error handling if unable to grab API data.
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.keys(stocks).forEach((symbol) => {
        if (stocks[symbol]) {
          const script = document.createElement("script");
          script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
          script.async = true;
          script.innerHTML = `{
            "symbol": "${symbol}",
            "width": "100%",
            "height": "200",
            "locale": "en",
            "dateRange": "1D",
            "colorTheme": "dark",
            "isTransparent": false,
            "autosize": true,
            "largeChartUrl": ""
          }`;
          const container = document.getElementById(`tradingview_${symbol}`);
          if (container) {
            container.innerHTML = ""; // Clear existing widgets
            container.appendChild(script);
          }
        }
      });
    }
  }, [stocks]);  

  function refreshStock(symbol: string) { // Function for grabbing new stock info.
    fetch(
      `https://api.twelvedata.com/time_series?apikey=36c6d04c0f9e484183f9bf0f1376d474&interval=1min&symbol=${symbol}`
    )
      .then((res) => res.json())
      .then((stocks) => {
        console.log(`${symbol} Data Updated:`, stocks);
        if (stocks?.meta?.timestamp === lastUpdated[symbol]) { // Checking the markets time.
          alert(`No new updates for ${symbol}. The market might be closed.`); // Sending an alert if the markets are closed.
        } else {
          setStocks((prev) => ({ ...prev, [symbol]: stocks })); // Other sending stock api updates when the user uses the refresh button.
          setLastUpdated((prev) => ({
            ...prev,
            [symbol]: stocks?.meta?.timestamp,
          }));
        }
      })
      .catch((error) =>
        console.error(`Unable to refresh ${symbol} data`, error) // Simple error handling.
      );
  }

  return (
    <>
      <div className="stocks-container">
        {Object.keys(stocks).map(
          (symbol) =>
            stocks[symbol] && (
              <div key={symbol}>
                <div className="stock-card">
                  <div className="tradingview-widget-container">
                    <div id={`tradingview_${symbol}`}></div>
                  </div>
                  <h2>{stocks[symbol]?.meta?.symbol}</h2>
                  {stocks[symbol]?.values?.map((entry, index) => (
                    <ul key={index}>
                      <li>Date and Time: {entry.datetime}</li> {/* Used to help display data by using curly braces {}, these accpet values like strings and numbers. */}
                      <li>Open: {entry.open}</li>
                      <li>High: {entry.high}</li>
                      <li>Low: {entry.low}</li>
                      <li>Close: {entry.close}</li>
                    </ul>
                  ))}
                </div>
                <button
                  className="btn btn-primary button"
                  onClick={() => refreshStock(symbol)}
                >
                  Refresh {symbol} Data
                </button>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default StockTracker;
