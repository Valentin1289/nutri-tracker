import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import SearchByNameResult from "./components/SearchByNameResult";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import MyProfile from "./components/MyProfile";
import { useAtom } from "jotai";
import state from "./components/AtomStates";
import ProgressList from "./components/ProgressList";
import ConsumedList from "./components/ConsumedList";

function App() {
  const [showMyProfile] = useAtom(state.showMyProfile);
  const [showDiary] = useAtom(state.showDiary);
  
  return (
    <>
      <Navbar />
      {showDiary ? (
        <div className="diary-container">
          <ConsumedList />
          <ProgressList />
        </div>
      ) : (
        <div className="App">
          {showMyProfile ? (
            <MyProfile />
          ) : (
            <div>
              <SearchByNameResult />
              <ProductDetails />
            </div>
          )}

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
