"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import AnniversaryScreen from "@/components/screens/AnniversaryScreen"
import GiftBoxScreen from "@/components/screens/GiftBoxScreen"
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen"
import MessageScreen from "@/components/screens/MessageScreen"

export default function AnniversaryApp() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const goToIntro = () => setCurrentScreen("intro")
  const goToAnniversary = () => setCurrentScreen("anniversary")
  const goToGiftBox = () => setCurrentScreen("giftbox")
  const goToGallery = () => setCurrentScreen("gallery")
  const goToMessage = () => setCurrentScreen("message")
  const startAgain = () => setCurrentScreen("loader")

  useEffect(() => {
    // Create and play audio when component mounts
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Auto-play was prevented. User interaction needed.")
          setIsMuted(true)
        })
      }
    }

    // Try to play immediately
    playAudio()

    // Also try to play on any user interaction
    const handleInteraction = () => {
      playAudio()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
        setIsMuted(false)
      } else {
        audioRef.current.pause()
        setIsMuted(true)
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute/Unmute Button */}
      <motion.button
        onClick={toggleMute}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-full p-3 border border-white/20 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        {currentScreen === "loader" && <LoaderScreen key="loader" onComplete={goToIntro} />}
        {currentScreen === "intro" && <IntroScreen key="intro" onNext={goToAnniversary} />}
        {currentScreen === "anniversary" && <AnniversaryScreen key="anniversary" onNext={goToGiftBox} />}
        {currentScreen === "giftbox" && <GiftBoxScreen key="giftbox" onNext={goToGallery} />}
        {currentScreen === "gallery" && <PhotoGalleryScreen key="gallery" onNext={goToMessage} />}
        {currentScreen === "message" && <MessageScreen key="message" onStartAgain={startAgain} />}
      </AnimatePresence>
    </div>
  )
}
