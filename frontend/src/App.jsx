import FormComponent from './FormComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<FormComponent/>} />
        </Routes>
      </Router> 
    )
}

export default App;
