import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Routes, Route, Link } from "react-router-dom";
import Thank from './Thank';
import Input from './Input';



function App() {
  let routes = useRoutes([
    { path: "/", element: <Input /> },
    { path: "/thank/:id", element: <Thank /> },
  ]);
  return routes;

//   return (
//     <>
// <Routes>
//   <Route path='/' element={<Input/>}></Route>
//   <Route path='/thank/:id' element={<Thank/>}></Route>
// </Routes>
//     </>
//   );
}

export default App;
