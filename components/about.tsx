"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./animated-text";
import { useLanguage } from "./language-provider";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-secondary/30 dark:bg-secondary/10">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {t.about.title}
        </motion.h2>

        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          >
            <motion.div
              className="relative mx-auto h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                borderRadius: "40%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                borderRadius: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <Image
                src="/profil.jpg"
                alt="Nur Jagad Muhammad Dani"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />

              {/* Animated overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          >
            <motion.p
              className="mb-4 text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t.about.role}
            </motion.p>

            <div className="mb-6 text-muted-foreground">
              <AnimatedText
                text={t.about.p1}
                type="chars"
                once={false}
                delay={0.6}
              />
            </div>

            <motion.p
              className="mb-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {t.about.p2}
            </motion.p>
            <motion.p
              className="mb-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {t.about.p3}
            </motion.p>
            <motion.p
              className="mb-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {t.about.p4}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {["Web Development", "Photography", "Trader"].map(
                (skill, index) => (
                  <motion.span
                    key={skill}
                    className="relative overflow-hidden rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 20, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 -z-10 bg-primary/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    {skill}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
