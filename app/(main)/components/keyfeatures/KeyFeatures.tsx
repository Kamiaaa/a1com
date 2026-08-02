import {
  Zap,
  Infinity as InfinityIcon,
  Wifi,
  Gauge,
  Headset,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import styles from "./KeyFeatures.module.css";

interface Feature {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    stat: "<100ms",
    title: "Full-fiber gigabit speeds",
    description:
      "Symmetrical upload and download over dedicated fiber, so backups and video calls never fight each other for bandwidth.",
  },
  {
    icon: InfinityIcon,
    stat: "Unlimited",
    title: "No data caps, no throttling",
    description:
      "Stream, game, and work from home as much as you want. We don't meter your connection or slow it down after a threshold.",
  },
  {
    icon: Wifi,
    stat: "Whole-home",
    title: "Mesh WiFi included",
    description:
      "Every plan ships with mesh hardware calibrated to your square footage, not just the room next to the router.",
  },
  {
    icon: Gauge,
    stat: "99.99%",
    title: "Uptime you can plan around",
    description:
      "Redundant fiber routes and automatic failover keep you online through construction cuts and equipment failures.",
  },
  {
    icon: Headset,
    stat: "<2 min",
    title: "A technician, not a script",
    description:
      "Local support answers fast and can see your line health in real time — no call centers, no reading from a script.",
  },
  {
    icon: Wrench,
    stat: "<Free",
    title: "Professional installation",
    description:
      "Certified technicians run the line, mount the equipment, and test every outlet before they leave. No self-install kits.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#05070C] py-12 sm:py-16">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          
          <h2 className="mt-5 text-6xl font-source font-semibold tracking-tight text-white sm:text-7xl">
            Internet that stays out of your way
          </h2>
          
        </div>

        {/* feature grid */}
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delay={i * 0.4} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  delay,
}: {
  feature: Feature;
  delay: number;
}) {
  const Icon = feature.icon;

  return (
    <div className="group relative rounded-2xl p-px">
      {/* faint always-on ring */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />

      {/* rotating comet border-beam */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <span
          className={`${styles.beamRotate} absolute -inset-[100%]`}
          style={{
            animationDelay: `${delay}s`,
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 82%, rgba(56,189,248,0.9) 90%, rgba(168,85,247,1) 95%, rgba(236,72,153,0.55) 97%, transparent 100%)",
          }}
        />
      </div>

      {/* card body */}
      <div className="relative flex h-full flex-col gap-4 rounded-2xl bg-[#0B0F17] p-6">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10">
            <Icon className="h-5 w-5 text-sky-300" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-xs tracking-wide text-slate-500">
            {feature.stat}
          </span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
