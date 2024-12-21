import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
      <header className="container w-full mx-auto ">
        <Header></Header>
      </header>

      <main className="container mx-auto min-h-screen">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}

export default App
