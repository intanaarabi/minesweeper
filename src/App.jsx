
import './App.css'
import Board from './components/Board'
import ParticlesBackground from './components/Particles'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <Board></Board>
      </div>
      <ParticlesBackground/>
    </>
  )
}

export default App
