import { Toaster } from "./components/ui/sonner";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <div>
      <Homepage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: "#059669",
            color: "#fff",
            borderRadius: "10px",
            border: "2px solid #047857",
            padding: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          },
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;
