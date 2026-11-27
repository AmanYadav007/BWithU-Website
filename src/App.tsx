import { useState } from 'react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { AlwaysHere } from './sections/AlwaysHere'
import { AppPreview } from './sections/AppPreview'
import { Companions } from './sections/Companions'
import { FAQ } from './sections/FAQ'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Languages } from './sections/Languages'
import { Moments } from './sections/Moments'
import { PrivateByDesign } from './sections/PrivateByDesign'
import { TrustStrip } from './sections/TrustStrip'

export default function App() {
  const [faceId, setFaceId] = useState('aiko')

  return (
    <>
      <Background />
      <Nav faceId={faceId} />
      <main>
        <Hero onFace={setFaceId} />
        <TrustStrip />
        <AppPreview />
        <Companions />
        <HowItWorks />
        <AlwaysHere />
        <Languages />
        <PrivateByDesign />
        <Moments />
        <FAQ />
        <FinalCTA faceId={faceId} />
      </main>
      <Footer />
    </>
  )
}
