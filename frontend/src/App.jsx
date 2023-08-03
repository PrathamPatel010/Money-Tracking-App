import FormComponent from './FormComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import SuccessPage from './SuccessPage';
function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<FormComponent/>} />
          <Route path="/SuccessPage" element={<SuccessPage/>} />
        </Routes>
      </Router> 
    )
}

export default App;
