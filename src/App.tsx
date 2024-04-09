import * as React from 'react'
import {NoCSSPage} from "./nocss/NoCSSPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Suspense} from "react";

export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<NoCSSPage/>}/>
          <Route path="/controls" element={<NoCSSPage/>}/>
          <Route path="*" element={<Navigate replace to="/"/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
