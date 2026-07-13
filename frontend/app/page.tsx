"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowSquareOut } from "@phosphor-icons/react";

export default function LandingPage() {
  return (
    <div className="bg-fedin-bg text-fedin-dark min-h-[100dvh] flex flex-col font-sans overflow-x-hidden relative">
      {/* Navigation */}
      <header className="w-full pt-8 px-6 flex justify-center z-50 relative">
        <div className="flex items-center gap-4">
          <nav className="glass-nav rounded-full px-8 py-3 flex items-center justify-between min-w-[450px]">
            <Link className="flex items-center gap-2 mr-8" href="/">
              <div className="flex gap-1">
                <div className="w-2 h-6 bg-black rounded-full transform -rotate-12"></div>
                <div className="w-2 h-4 bg-black rounded-full mt-2 transform -rotate-12"></div>
                <div className="w-2 h-5 bg-black rounded-full mt-1 transform -rotate-12"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">FedIn</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-semibold tracking-wide">
              <Link className="hover:opacity-70 transition-opacity" href="#features">FEATURES</Link>
              <Link className="hover:opacity-70 transition-opacity" href="#how-it-works">HOW IT WORKS</Link>
            </div>
          </nav>
          <Link 
            className="glass-nav rounded-full px-8 py-3 text-sm font-semibold tracking-wide hover:bg-white/40 transition-colors" 
            href="/login"
          >
            SIGN IN
          </Link>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center relative w-full max-w-7xl mx-auto min-h-[600px]">
        {/* Background Decor / Floating Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Left Device Mockup */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-72 h-[450px] glass-widget rounded-[2rem] p-4 flex flex-col gap-4 transform -rotate-12 float-slow opacity-80" style={{ "--rotation": "-12deg" } as any}>
            <div className="flex items-center gap-3 border-b border-white/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-white/50"></div>
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-white/50 rounded w-3/4"></div>
                <div className="h-2 bg-white/30 rounded w-1/2"></div>
              </div>
            </div>
            <div className="glass-widget-light rounded-xl p-3 flex flex-col gap-2">
              <div className="h-16 bg-black/5 rounded-lg w-full"></div>
              <div className="h-2 bg-black/10 rounded w-full"></div>
              <div className="h-2 bg-black/10 rounded w-4/5"></div>
            </div>
            <div className="glass-widget-light rounded-xl p-3 flex flex-col gap-2">
              <div className="h-10 bg-black/5 rounded-lg w-full"></div>
              <div className="h-2 bg-black/10 rounded w-full"></div>
              <div className="h-2 bg-black/10 rounded w-2/3"></div>
            </div>
            <div className="absolute -top-12 -right-8 glass-widget-light rounded-xl p-3 w-48 float-delayed">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-200"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-2 bg-black/10 rounded w-full"></div>
                  <div className="h-2 bg-black/10 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Device Mockup */}
          <div className="absolute right-[10%] top-1/2 -translate-y-[45%] w-72 h-[480px] glass-widget rounded-[2rem] p-4 flex flex-col gap-4 transform rotate-[15deg] float-medium opacity-80" style={{ "--rotation": "15deg" } as any}>
            <div className="flex justify-end gap-2 pb-2">
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
            </div>
            <div className="glass-widget-light rounded-xl p-4 flex flex-col gap-3">
              <div className="w-full h-24 bg-black/5 rounded-lg"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                <div className="h-2 bg-black/10 rounded w-24"></div>
              </div>
            </div>
            <div className="glass-widget-light rounded-xl p-3 flex flex-col gap-2 relative">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100"></div>
                <div className="space-y-1 flex-1 mt-1">
                  <div className="h-2 bg-black/10 rounded w-full"></div>
                  <div className="h-2 bg-black/10 rounded w-5/6"></div>
                </div>
              </div>
              <div className="absolute -left-16 bottom-4 glass-widget-light rounded-lg p-2 w-40 flex flex-col gap-2 transform -rotate-[5deg] float-slow">
                <div className="h-2 bg-black/10 rounded w-full"></div>
                <div className="h-2 bg-black/10 rounded w-1/2"></div>
              </div>
            </div>
            <div className="absolute -top-16 left-0 glass-widget-light rounded-xl p-3 w-52 flex gap-3 transform -rotate-[10deg] float-delayed">
              <div className="w-12 h-12 bg-black/5 rounded-lg shrink-0"></div>
              <div className="space-y-2 w-full mt-1">
                <div className="h-2 bg-black/10 rounded w-full"></div>
                <div className="h-2 bg-black/10 rounded w-4/5"></div>
                <div className="h-2 bg-black/10 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Content Area */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-16">
          <h1 className="text-5xl md:text-[64px] font-bold tracking-tight leading-tight mb-10 max-w-4xl text-zinc-900">
            AI-powered personalized newsfeed
          </h1>
          <Link 
            href="/login"
            className="bg-fedin-green hover:bg-fedin-green-hover text-white font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 btn-shadow"
          >
            Get Started for Free
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <motion.section 
        id="features" 
        className="w-full max-w-7xl mx-auto px-6 py-24 z-10 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Everything you need</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Our AI engine curates the perfect feed for your specific engineering interests, filtering out the noise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-widget-light p-8 rounded-[2rem] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/40">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Smart Personalization</h3>
            <p className="text-zinc-600 leading-relaxed">
              Our models learn your reading habits and preferences to prioritize content that matters most to you.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-widget-light p-8 rounded-[2rem] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/40">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Real-time Updates</h3>
            <p className="text-zinc-600 leading-relaxed">
              We ingest feeds constantly, ensuring you never miss a breaking story in your tech stack.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="glass-widget-light p-8 rounded-[2rem] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/40">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">AI Summaries</h3>
            <p className="text-zinc-600 leading-relaxed">
              Don't have time for a 20-minute read? Get the key takeaways instantly with auto-generated summaries.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        id="how-it-works"
        className="w-full max-w-5xl mx-auto px-6 py-24 z-10 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="glass-widget p-12 md:p-20 rounded-[3rem] text-center flex flex-col items-center border border-white/60">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 max-w-2xl">
            Stop scrolling through noise. Start reading signals.
          </h2>
          <p className="text-lg text-zinc-600 mb-10 max-w-xl">
            Join thousands of engineers who rely on FedIn to stay ahead of the curve without the cognitive overload.
          </p>
          <Link 
            href="/register"
            className="bg-fedin-green hover:bg-fedin-green-hover text-white font-medium py-4 px-10 rounded-full text-lg transition-all duration-300 btn-shadow"
          >
            Create Your Free Account
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-12 flex flex-col items-center z-10 relative border-t border-black/5 mt-12">
        <div className="flex gap-2 items-center mb-4 opacity-80">
          <div className="w-1.5 h-4 bg-black rounded-full transform -rotate-12"></div>
          <div className="w-1.5 h-3 bg-black rounded-full mt-1 transform -rotate-12"></div>
          <span className="text-sm font-bold tracking-tight">FedIn</span>
        </div>
        <div className="text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Stratum Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
