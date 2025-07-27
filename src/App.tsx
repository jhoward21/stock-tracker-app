"use client";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StockTracker from "./components/StockTracker";
import AboutMe from "./components/AboutMe";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
// import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page.css";
import "./stocks.css";

// const StockTracker = dynamic(() => import('./components/StockTracker'), {
//   ssr: false
// });

export default function Home() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            {/* Home Page */}
            <Route
              index
              element={
                <div>
                  <Header />
                  <Balance />
                  <IncomeExpenses />
                  <TransactionList />
                </div>
              }
            />
            {/* Redirect Expense Tracker to Home Page */}
            <Route
              path="/expense-tracker"
              element={
                <div>
                  <Header />
                  <Balance />
                  <IncomeExpenses />
                  <TransactionList />
                </div>
              }
            />
            {/* Stock Tracker */}
            <Route path="/stock-tracker" element={<StockTracker />} />
            {/* About Me */}
            <Route path="/about-me" element={<AboutMe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
