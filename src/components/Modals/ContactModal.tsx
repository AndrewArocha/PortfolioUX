import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RedirectModal from "./RedirectModal";

type ContactModalProps = { 
  isOpen: boolean; 
  onClose: () => void; 
  onOpenResume?: () => void;
  onOpenAbout?: () => void;
  onOpenProjects?: () => void;
};

export default function ContactModal({ isOpen, onClose, onOpenResume, onOpenAbout, onOpenProjects }: ContactModalProps) {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  // THE FIX: State is properly declared inside the component body!
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-[40px] border border-white/10 bg-[#0f0f0f]/95 p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-teal-400" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
                      Let's <span className="text-orange-400">Connect</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-8">
                      Reach out across the net or send a direct encrypted transmission via the form.
                    </p>

                    <div className="space-y-4">
                      {/* LinkedIn Button */}
                      <button 
                        onClick={() => setRedirectUrl("https://www.linkedin.com/in/andres-hernandez-333b59282")}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group w-full text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#0077b5]/20 text-[#0077b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-[#0077b5] transition-colors">LinkedIn Profile</p>
                          <p className="text-xs text-white/40">Professional network & history</p>
                        </div>
                      </button>

                      {/* GitHub Button */}
                      <button 
                        onClick={() => setRedirectUrl("https://github.com/AndrewArocha")}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group w-full text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">GitHub Repositories</p>
                          <p className="text-xs text-white/40">Codebases & open source</p>
                        </div>
                      </button>

                      {/* Discord Button */}
                      <button 
                        onClick={() => setRedirectUrl("https://discord.com/users/1035044496410423336")}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group w-full text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-white group-hover:text-[#5865F2] transition-colors">Discord Connect</p>
                                  <p className="text-xs text-white/40">Casual networking & chat</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-4xl p-8">
                          {submitStatus === "success" ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">Transmission Sent</h3>
                              <p className="text-sm text-white/50">Your message has been successfully routed to my inbox. I will reply shortly.</p>
                            </motion.div>
                          ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                              <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1 pl-2">Designation (Name)</label>
                                <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 transition-colors" placeholder="John Doe" />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1 pl-2">Return Address (Email)</label>
                                <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 transition-colors" placeholder="john@example.com" />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1 pl-2">Message Payload</label>
                                <textarea required rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 transition-colors resize-none" placeholder="Hello, I'd like to talk about..." />
                              </div>
                              <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-white text-black font-semibold rounded-xl px-4 py-3 text-sm transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2">
                                {isSubmitting ? "Routing..." : "Send Message"}
                              </button>
                            </form>
                          )}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* THE FIX: Redirect Modal overlay wired securely with functions */}
              <RedirectModal 
                isOpen={!!redirectUrl} 
                onClose={() => setRedirectUrl(null)} 
                url={redirectUrl || ""} 
                onOpenResume={() => { setRedirectUrl(null); onClose(); if(onOpenResume) onOpenResume(); }}
                onOpenAbout={() => { setRedirectUrl(null); onClose(); if(onOpenAbout) onOpenAbout(); }}
                onOpenProjects={() => { setRedirectUrl(null); onClose(); if(onOpenProjects) onOpenProjects(); }}
              />
            </>
          );
        }