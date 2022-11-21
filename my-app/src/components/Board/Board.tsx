import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "../Header/Header";

function Board() {
  return (
    <BrowserRouter>
        <div>
        
         <Header />
          <Routes>
            <Route path="/" element={<div>Logar</div>}></Route>
            <Route path="/game" element={<> game </>}></Route>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default Board;
