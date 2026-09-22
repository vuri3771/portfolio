"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";

const roles = ["Frontend Developer", "React · Vue Engineer", "UI 문제 해결사"];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const child = {
  hidden: { opacity: 0.5, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const title = "안녕하세요, 김부희입니다.";

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AnimatedBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        <motion.span
          variants={child}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          현재 새로운 기회를 찾고 있어요
        </motion.span>

        <motion.h1
          variants={child}
          className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
        >
          {title.split(" ").map((word, i) => (
            <span key={i} className="mr-3 inline-block">
              {word}
            </span>
          ))}
        </motion.h1>

        {/* <motion.div
          variants={child}
          className="mt-4 flex h-10 items-center justify-center overflow-hidden text-xl font-semibold text-muted-foreground sm:text-2xl"
        >
          <RoleCycler roles={roles} />
        </motion.div> */}

        <motion.p
          variants={child}
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          공공기관 시스템부터 블록체인 게임 스튜디오까지, 7년 넘게 다양한 화면을
          만들어온 프론트엔드 개발자입니다. 큰 구조를 먼저 그리고, 작은
          디테일까지 놓치지 않고 완성합니다.
        </motion.p>

        <motion.div
          variants={child}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/works">
              작업물 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">
              <Mail className="mr-2 h-4 w-4" /> 자기소개 보기
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={child}
          className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-4 border-t border-border/60 pt-8"
        >
          {[
            { value: "7+", label: "년차" },
            { value: "29+", label: "프로젝트" },
            { value: "10", label: "회사 경험" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-gradient sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RoleCycler({ roles }: { roles: string[] }) {
  return (
    <div className="relative h-full w-full">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: roles.length * 1.8,
            repeat: Infinity,
            times: [0, 0.05, 0.22, 0.27],
            delay: i * 1.8,
            ease: "easeInOut",
          }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
}
