import { useState } from 'react'
import './index.css'
import Frame from './Frame.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Frame />
    </>
  )
}

export default App
