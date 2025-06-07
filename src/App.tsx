import { Route, Routes, BrowserRouter } from "react-router-dom";
import GiftList from "./components/GiftList/GiftList";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import OurHistory from "./components/OurHistory/OurHistory";
import GiftCheckout from "./pages/GiftCheckout/GiftCheckout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20">
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <OurHistory />
                  <GiftList />
                </>
              }
            />
            <Route path="/gift/:id" element={<GiftCheckout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
