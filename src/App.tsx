import { useState } from 'react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { FAQ } from './sections/FAQ'
import { Faces } from './sections/Faces'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { Hinglish } from './sections/Hinglish'
import { Privacy } from './sections/Privacy'
import { useGreeting } from './lib/useGreeting'

export default function App() {
  const [faceId, setFaceId] = useState('aiko')
  const greeting = useGreeting()

  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero faceId={faceId} greeting={greeting} />
        <Hinglish faceId={faceId} greeting={greeting} />
        <Faces faceId={faceId} onPick={setFaceId} greeting={greeting} />
        <Privacy />
        <FinalCTA faceId={faceId} />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
