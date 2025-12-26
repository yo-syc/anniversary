"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import ScreenContainer from "../ScreenContainer"

export default function IntroScreen({ onNext }) {
    const [easterEggFound, setEasterEggFound] = useState(false)

    const handleEasterEgg = () => {
        if (!easterEggFound) {
            setEasterEggFound(true)
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ff6b81', '#6a5acd', '#ff1493', '#9370db']
            })
        }
    }

    return (
        <ScreenContainer>
            <div className="text-center max-w-2xl mx-auto">
                {/* Main heading with romantic animation */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-pink-400 mb-4 text-balance"
                    >
                        It's Our Special Day
                    </motion.h1>
                </motion.div>

                {/* Cute gif placeholder - Secret Easter Egg */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.div
                        onClick={handleEasterEgg}
                        className="w-36 h-36 md:w-40 md:h-40 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-pink-400/30 cursor-pointer relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src="/gifs/intro.gif"
                            alt="Cute romantic illustration"
                            className="w-28 md:w-32 object-cover"
                        />
                        {easterEggFound && (
                            <motion.div
                                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                You found me! 🎉
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-12 text-pretty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    I made something special for you...
                </motion.p>

                {/* Start button */}
                <motion.button
                    onClick={onNext}
                    className="group relative px-8 py-4 bg-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Button glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                            background: [
                                "linear-gradient(45deg, #ff6b81, #6a5acd)",
                                "linear-gradient(45deg, #6a5acd, #ff6b81)",
                                "linear-gradient(45deg, #ff6b81, #6a5acd)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />

                    <span className="relative z-10 flex items-center gap-2">
                        Start Our Journey ✨
                    </span>
                </motion.button>
            </div>
        </ScreenContainer>
    )
}
