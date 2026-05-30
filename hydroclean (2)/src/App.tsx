import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Camera, ChevronLeft, Globe, Droplets, AlertCircle } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { MapDisplay } from './components/MapDisplay';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzePollutionImage } from './services/gemini';
import { sendTelegramAlert } from './services/telegram';
import { PlasticAnalysis } from './types';
import { Logo } from './components/Logo';
import { GlobeBackground } from './components/GlobeBackground';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<'home' | 'report'>('home');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PlasticAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    setIsLocating(true);
    setError(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        (err) => {
          setError("Failed to fetch location. Please enable permissions.");
          setIsLocating(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const handleImageSelected = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzePollutionImage(base64);
      setAnalysis(result);
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="atmosphere" />
      <GlobeBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
          {view === 'report' && <ChevronLeft className="text-white/50 hover:text-white transition-colors" />}
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setView('home')}
            className="hidden sm:block text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            Home
          </button>
          <div className="px-3 md:px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-[8px] md:text-[10px] font-bold text-brand-blue uppercase tracking-widest">
            V1.2 Beta
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center"
            >
              <div className="relative mb-12 group min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-blue/20 blur-[120px] rounded-full group-hover:bg-brand-blue/30 transition-all duration-700" />
                <div className="relative z-10">
                  <Logo size="lg" />
                </div>
              </div>
              
              <p className="max-w-2xl text-lg md:text-xl text-white/60 mb-12 leading-relaxed px-4">
                The world's first AI-powered platform for monitoring and reporting aquatic plastic pollution.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-6">
                <button
                  onClick={() => setView('report')}
                  className="w-full sm:w-auto px-10 py-5 bg-brand-blue hover:bg-brand-blue/80 rounded-full text-white font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-blue/20"
                >
                  Report Pollution
                </button>
                <button className="w-full sm:w-auto px-10 py-5 glass-card hover:bg-white/10 rounded-full text-white font-bold tracking-wide transition-all">
                  View Global Map
                </button>
              </div>

              <div className="mt-16 md:mt-24 grid grid-cols-2 gap-8 md:gap-12 text-left">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-brand-blue mb-1">1.2M+</div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-white/40">Bottles Reported</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-brand-blue mb-1">450</div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-white/40">Cleanup Teams</div>
                </div>
              </div>
              
              <div className="hidden md:flex absolute bottom-10 right-10 items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Monitoring Global Waters</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                  <Droplets size={12} />
                  AI-Powered Detection
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter">
                  Report <span className="text-brand-cyan italic">Pollution</span>
                </h2>
                <p className="max-w-2xl mx-auto text-white/50 text-base md:text-lg px-4">
                  Help protect aquatic ecosystems by reporting plastic pollution in rivers and coastal environments. Upload a photo and share the location for instant AI analysis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                <button
                  onClick={detectLocation}
                  disabled={isLocating}
                  className={cn(
                    "w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 glass-card hover:bg-white/10 rounded-2xl transition-all font-bold tracking-wide uppercase text-sm",
                    isLocating && "opacity-50"
                  )}
                >
                  <MapPin size={18} className="text-brand-cyan" />
                  {isLocating ? "Locating..." : "Detect Location"}
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 glass-card hover:bg-white/10 rounded-2xl transition-all font-bold tracking-wide uppercase text-sm">
                  <Camera size={18} className="text-brand-cyan" />
                  Direct Capture
                </button>
              </div>

              {location && (
                <div className="text-center text-white/40 font-mono text-sm">
                  Location detected: {location.lat.toFixed(4)} , {location.lng.toFixed(4)}
                </div>
              )}

              <ImageUploader onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center flex items-center justify-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {analysis && <AnalysisResult analysis={analysis} />}

              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight uppercase text-white/50">Location Context</h3>
                <MapDisplay location={location} intensity={analysis?.intensity} />
              </div>

              <div className="flex justify-center pt-8">
                <button
                  disabled={!analysis || !location || isAnalyzing}
                  onClick={() => {
                    if (analysis?.intensity === 'High' && location) {
                      sendTelegramAlert(location, analysis);
                      alert('High pollution intensity reported! Alert sent to Telegram map network.');
                    } else if (analysis) {
                      alert('Report submitted successfully! Thank you for helping clean our waters.');
                    }
                    setAnalysis(null);
                    setView('home');
                  }}
                  className="px-12 py-5 bg-brand-cyan hover:bg-brand-cyan/80 disabled:opacity-30 disabled:hover:scale-100 rounded-full text-black font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-cyan/20"
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
          © 2026 HYDROCLEAN VISION • AI FOR AQUATIC HEALTH
        </p>
      </footer>
    </div>
  );
}
