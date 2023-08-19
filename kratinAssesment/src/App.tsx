import './App.css'
import Home from './components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import VideoCall from './components/videocall/VideoCall'
import { SocketProvider } from './Context/SocketProvider'
import Room from './components/videocall/Room/Room'

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    <SocketProvider>

    <BrowserRouter>
      <Nav/>
      <div className='spacer'></div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/videocall' element={<VideoCall/>}/>
      <Route path='/room/:roomId' element={<Room/>}/>

    </Routes>

    </BrowserRouter>
    </SocketProvider>
    // </>
  )
}

export default App
