import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import FormComponent from './Components/FormComponent';
import SuccessPage from './Components/SuccessPage';
import MainPage from './Components/MainPage';
const base_url = process.env.REACT_APP_FRONTEND_BASE_URI;

function App() {
    return(
      <Router>
        <Routes>
          <Route path={`${base_url}`} element={<FormComponent/>} />
          <Route path={`${base_url}/SuccessPage/:email`} element={<SuccessPage/>} />
          <Route path={`${base_url}/main`} element={<MainPage/>}/>
        </Routes>
      </Router> 
    )
}

export default App;