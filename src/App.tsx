import { useState } from 'react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { FAQ } from './sections/FAQ'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { Privacy } from './sections/Privacy'
import { Strip } from './sections/Strip'

export default function App() {
  const [faceId, setFaceId] = useState('aiko')

  return (
    <>
      <Background />
      <Nav faceId={faceId} />
      <main>
        <Hero onFace={setFaceId} />
        <Strip />
        <Privacy />
        <FinalCTA faceId={faceId} />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
