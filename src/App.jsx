import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/ui/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  // const handleClick = () => {
  //   setCount(count + 1);
  // };

  return (
    <>
      {/* Hero */}
      <Hero/>
    </>
  )
}

export default App;
