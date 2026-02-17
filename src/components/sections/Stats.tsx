"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { FolderOpen, Clock, MapPin, ThumbsUp } from "lucide-react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  index,
}: {
  icon: typeof FolderOpen;
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("animated-visible");
          }, index * 100);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="animated-section animated-up text-center">
      <div className="w-14 h-14 bg-mkn-red/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-mkn-red/20">
        <Icon className="w-6 h-6 text-mkn-red" />
      </div>
      <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-foreground mb-1">
        <CountUp end={value} suffix={suffix} />
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { icon: FolderOpen, value: 50, suffix: "+", label: t("projects") },
    { icon: Clock, value: 5, suffix: "+", label: t("yearsExperience") },
    { icon: MapPin, value: 100, suffix: "%", label: t("allBelgium") },
    { icon: ThumbsUp, value: 100, suffix: "%", label: t("satisfaction") },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
