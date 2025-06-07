import GiftList from "./components/GiftList/GiftList";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import OurHistory from "./components/OurHistory/OurHistory";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <main>
          <Home />
          <OurHistory />
          <GiftList />
        </main>
      </div>
    </>
  );
}

export default App;
