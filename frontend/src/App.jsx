import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import FormComponent from './Components/FormComponent';
import SuccessPage from './Components/SuccessPage';
import MainPage from './Components/MainPage';

function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<FormComponent/>} />
          <Route path="/SuccessPage/:email" element={<SuccessPage/>} />
          <Route path="/main" element={<MainPage/>}/>
        </Routes>
      </Router> 
    )
}

export default App;