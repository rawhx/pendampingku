import { motion, useReducedMotion } from 'motion/react';

const BLOB_SIZE = 350;

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function SplashScreen() {
    const text = 'Welcome';
    const shouldReduceMotion = useReducedMotion();

    const blobs = [
        {
            color: 'var(--color-blue-light-active)',
            x: 155,
            y: -125,
            delay: 0.55,
            breath: 5.5,
        },
        {
            color: 'color-mix(in srgb, var(--color-blue-normal) 50%, transparent)',
            x: 85,
            y: 115,
            delay: 0.45,
            breath: 6.5,
        },
        {
            color: 'var(--color-blue-normal)',
            x: -120,
            y: -60,
            delay: 0.35,
            breath: 6,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="fixed inset-0 z-50 overflow-hidden bg-white-light-hover"
        >
            <div className="flex h-full w-full items-center justify-center">
                <div className="relative flex aspect-square w-[min(90vw,680px)] items-center justify-center">
                    {blobs.map((blob, index) => (
                        <motion.div
                            key={index}
                            className="pointer-events-none absolute inset-0"
                            initial={{ rotate: shouldReduceMotion ? 0 : -140 }}
                            animate={{ rotate: 0 }}
                            transition={
                                shouldReduceMotion
                                    ? { duration: 0 }
                                    : {
                                          delay: blob.delay,
                                          duration: 2.6,
                                          ease: EASE_OUT,
                                      }
                            }
                        >
                            <motion.div
                                className="absolute inset-0"
                                animate={
                                    shouldReduceMotion
                                        ? { rotate: 0 }
                                        : { rotate: 360 }
                                }
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : {
                                              duration: 14,
                                              repeat: Infinity,
                                              ease: 'linear',
                                          }
                                }
                            >
                                <motion.div
                                    className="absolute"
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        scale: 0.55,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: blob.x,
                                        y: blob.y,
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0 }
                                            : {
                                                  delay: blob.delay,
                                                  x: {
                                                      type: 'spring',
                                                      stiffness: 38,
                                                      damping: 15,
                                                      mass: 1.1,
                                                  },
                                                  y: {
                                                      type: 'spring',
                                                      stiffness: 38,
                                                      damping: 15,
                                                      mass: 1.1,
                                                  },
                                                  scale: {
                                                      duration: 1.8,
                                                      ease: EASE_OUT,
                                                  },
                                                  opacity: {
                                                      duration: 0.9,
                                                      ease: 'easeOut',
                                                  },
                                              }
                                    }
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        width: BLOB_SIZE,
                                        height: BLOB_SIZE,
                                        marginLeft: -BLOB_SIZE / 2,
                                        marginTop: -BLOB_SIZE / 2,
                                        willChange: 'transform, opacity',
                                    }}
                                >
                                    <motion.div
                                        className="h-full w-full"
                                        animate={
                                            shouldReduceMotion
                                                ? { scale: 1 }
                                                : { scale: [1, 1.07, 0.96, 1] }
                                        }
                                        transition={
                                            shouldReduceMotion
                                                ? { duration: 0 }
                                                : {
                                                      delay: 2.2,
                                                      duration: blob.breath,
                                                      repeat: Infinity,
                                                      ease: 'easeInOut',
                                                  }
                                        }
                                        style={{
                                            borderRadius: 300,
                                            background: blob.color,
                                            filter: 'blur(50px)',
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}

                    <h1 className="relative z-10 flex text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {text.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: 'blur(8px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                transition={{
                                    delay: 0.9 + 0.055 * index,
                                    duration: 0.9,
                                    ease: EASE_OUT,
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>
                </div>
            </div>
        </motion.div>
    );
}