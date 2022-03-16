import TopNav from "./components/TopNav";
import Rows from "./components/Rows";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return <div>
    <Router>
      <TopNav/>
      <Routes>
        <Route path='/' />
      </Routes>
    </Router>

    <Rows/>
    </div>;
}

export default App;
