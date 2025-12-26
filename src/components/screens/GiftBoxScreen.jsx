"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"
import ScreenContainer from "../ScreenContainer"
import confetti from "canvas-confetti"

export default function GiftBoxScreen({ onNext }) {
    const [openedGifts, setOpenedGifts] = useState([])

    const gifts = [
        {
            id: 1,
            emoji: "💝",
            title: "Promise 1",
            message: "I promise to always make you laugh, even on your hardest days. Your smile is my favorite sight in the world."
        },
        {
            id: 2,
            emoji: "🌹",
            title: "Promise 2",
            message: "I promise to love you more with each passing day, to support your dreams, and to be your biggest cheerleader."
        },
        {
            id: 3,
            emoji: "💕",
            title: "Promise 3",
            message: "I promise to remember the little things - your favorite coffee, the way you like your pillow, and how you smile when you're happy."
        },
        {
            id: 4,
            emoji: "✨",
            title: "Promise 4",
            message: "I promise to always choose you, in every moment, every day, for the rest of my life. You are my forever."
        }
    ]

    const handleGiftClick = (giftId) => {
        if (!openedGifts.includes(giftId)) {
            setOpenedGifts([...openedGifts, giftId])
            
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6b81', '#6a5acd', '#ff1493', '#9370db']
            })
        }
    }

    const allGiftsOpened = openedGifts.length === gifts.length

    return (
        <ScreenContainer>
            <div className="text-center max-w-5xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
                <motion.h1
                    className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-3 md:mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    My Promises To You 🎁
                </motion.h1>

                <motion.p
                    className="text-base md:text-xl text-pink-200 mb-6 md:mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Click each gift to reveal a special promise
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
                    {gifts.map((gift, index) => (
                        <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        >
                            {!openedGifts.includes(gift.id) ? (
                                <motion.div
                                    className="cursor-pointer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleGiftClick(gift.id)}
                                >
                                    <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 border-2 border-pink-400/30 shadow-xl h-full">
                                        <motion.div
                                            className="text-4xl md:text-6xl mb-1 md:mb-2"
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            🎁
                                        </motion.div>
                                        <p className="text-pink-300 text-xs md:text-sm">Click to open</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ rotateY: 0 }}
                                    animate={{ rotateY: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-pink-400/50 shadow-xl h-full"
                                >
                                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">{gift.emoji}</div>
                                    <h3 className="text-pink-300 font-semibold mb-1 md:mb-2 text-xs md:text-sm">{gift.title}</h3>
                                    <p className="text-gray-300 text-[10px] md:text-xs leading-relaxed">{gift.message}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {allGiftsOpened && (
                        <motion.button
                            onClick={onNext}
                            className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2 justify-center">
                                Continue <Sparkles className="w-4 md:w-5 h-4 md:h-5" />
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ScreenContainer>
    )
}
