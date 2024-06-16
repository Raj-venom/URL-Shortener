import './App.css'
import { Outlet } from 'react-router-dom'


function App() {


  return (
    <>
      <div className='bg-zinc-900 w-full h-screen flex justify-center items-center'>

        <Outlet />
      </div>
    </>
  )
}

export default App
