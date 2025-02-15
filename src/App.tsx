import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/NavbarComponent/NavbarComponent";

function App() {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <main className="container mx-auto p-4 pt-20">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
