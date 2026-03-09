import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  HardDrive,
  Leaf,
  Monitor,
  PhoneCall,
  Shield,
  ShoppingBag,
  Sprout,
  Star,
  Wifi,
  Wrench,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="gradient-hero noise-texture relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Decorative circles */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.14 255), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.14 155), transparent 70%)",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(oklch(1 0 0 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div custom={0} variants={fadeUp}>
              <Badge className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-white/10 text-white/80 border border-white/20 hover:bg-white/15">
                Serving the community since 2005
              </Badge>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
            >
              Pansare{" "}
              <span className="block md:inline">
                <span className="text-white/50">&</span>
              </span>{" "}
              <span className="block">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.75 0.12 255), oklch(0.75 0.12 155))",
                  }}
                >
                  More
                </span>
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Your trusted partner for technology and farming solutions. Expert
              computer services and quality agriculture supplies — all under one
              roof.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg px-8"
              >
                <Link to="/computer">
                  <Monitor className="w-4 h-4 mr-2" />
                  Computer Services
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
              >
                <Link to="/agriculture">
                  <Leaf className="w-4 h-4 mr-2" />
                  Agriculture
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Department Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Departments
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Two specialized divisions serving all your technology and farming
              needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Computer Department Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="gradient-computer p-8 md:p-10 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
                {/* BG decoration */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, white, transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle, white, transparent 70%)",
                    transform: "translate(-30%, 30%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                    <Monitor className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                    Computer Services
                  </h3>
                  <p className="text-white/75 text-base leading-relaxed mb-6 max-w-sm">
                    Expert repairs, networking solutions, software installation,
                    hardware upgrades, and IT support for homes and businesses.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      "Laptop Repair",
                      "Networking",
                      "Software Setup",
                      "Data Recovery",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10">
                  <Button
                    asChild
                    className="bg-white text-computer hover:bg-white/90 font-semibold group-hover:shadow-lg transition-shadow"
                  >
                    <Link to="/computer">
                      Explore Services{" "}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Agriculture Department Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="gradient-agriculture p-8 md:p-10 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
                {/* BG decoration */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, white, transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle, white, transparent 70%)",
                    transform: "translate(-30%, 30%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                    Agriculture Supplies
                  </h3>
                  <p className="text-white/75 text-base leading-relaxed mb-6 max-w-sm">
                    Premium seeds, fertilizers, pesticides, tools, and expert
                    farming advice to boost your agricultural productivity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Seeds", "Fertilizers", "Pesticides", "Farm Tools"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white border border-white/20"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="relative z-10">
                  <Button
                    asChild
                    className="bg-white text-agriculture hover:bg-white/90 font-semibold group-hover:shadow-lg transition-shadow"
                  >
                    <Link to="/agriculture">
                      Explore Products{" "}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Choose Pansare?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trusted by hundreds of local families and farmers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Shield,
                title: "Trusted Quality",
                desc: "All products sourced from reputed brands with guaranteed authenticity",
                color: "computer",
              },
              {
                icon: Clock,
                title: "Fast Service",
                desc: "Quick turnaround on repairs and same-day delivery for in-stock items",
                color: "agriculture",
              },
              {
                icon: Star,
                title: "Expert Advice",
                desc: "Decades of combined experience in computers and agriculture",
                color: "computer",
              },
              {
                icon: BookOpen,
                title: "Local Knowledge",
                desc: "Deep understanding of local farming conditions and tech needs",
                color: "agriculture",
              },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border border-border shadow-xs card-hover"
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
                    color === "computer"
                      ? "bg-computer-light"
                      : "bg-agriculture-light"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      color === "computer"
                        ? "text-computer"
                        : "text-agriculture"
                    }`}
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Quick Preview */}
      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Computer services preview */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-computer-light flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-computer" />
                </div>
                <h2 className="font-display text-2xl font-bold text-computer">
                  Computer Services
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: Wrench,
                    name: "Laptop & Desktop Repair",
                    desc: "Hardware diagnostics, screen replacement, keyboard repair",
                  },
                  {
                    icon: Wifi,
                    name: "Network & Internet Setup",
                    desc: "WiFi installation, router configuration, LAN setup",
                  },
                  {
                    icon: HardDrive,
                    name: "Data Recovery",
                    desc: "Recover lost files from damaged drives and devices",
                  },
                  {
                    icon: Monitor,
                    name: "Software Installation",
                    desc: "OS setup, antivirus, productivity software",
                  },
                ].map(({ icon: Icon, name, desc }) => (
                  <div
                    key={name}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-computer/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-computer-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-computer" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                  className="border-computer/40 text-computer hover:bg-computer-light"
                >
                  <Link to="/computer">
                    View All Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Agriculture services preview */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-agriculture-light flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-agriculture" />
                </div>
                <h2 className="font-display text-2xl font-bold text-agriculture">
                  Agriculture
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: Sprout,
                    name: "Quality Seeds",
                    desc: "High-yield hybrid and open-pollinated seeds for all crops",
                  },
                  {
                    icon: ShoppingBag,
                    name: "Fertilizers",
                    desc: "Organic and chemical fertilizers for maximum yield",
                  },
                  {
                    icon: Leaf,
                    name: "Pesticides & Herbicides",
                    desc: "Effective crop protection solutions",
                  },
                  {
                    icon: BookOpen,
                    name: "Farming Advisory",
                    desc: "Expert tips and seasonal farming guidance",
                  },
                ].map(({ icon: Icon, name, desc }) => (
                  <div
                    key={name}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-agriculture/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-agriculture-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-agriculture" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                  className="border-agriculture/40 text-agriculture hover:bg-agriculture-light"
                >
                  <Link to="/agriculture">
                    View Products <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 md:py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden gradient-hero noise-texture p-10 md:p-14 text-center">
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Need help? Get in touch.
              </h2>
              <p className="text-white/65 max-w-lg mx-auto mb-8">
                Whether it's a repair, a farming query, or a bulk order — we're
                here to help.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 shadow-lg"
              >
                <Link to="/contact">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
