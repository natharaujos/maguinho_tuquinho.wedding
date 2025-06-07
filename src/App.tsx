import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <main>
          <Home />
        </main>
      </div>
    </>
  );
}

export default App;
