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

const contactLinks = [
  { label: "LinkedIn Profile", detail: "Professional background and projects", url: "https://www.linkedin.com/in/andres-hernandez-333b59282/" },
  { label: "GitHub Repositories", detail: "Source code and project documentation", url: "https://github.com/AndrewArocha" },
  { label: "Discord Connect", detail: "Casual networking and chat", url: "https://discord.com/users/1035044496410423336" },
];

export default function ContactModal({ isOpen, onClose, onOpenResume, onOpenAbout, onOpenProjects }: ContactModalProps) {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

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
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border border-white/10 bg-[#0f0f0f]/95 p-8 md:p-12 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-teal-400" />
              <h2 id="contact-title" className="text-4xl font-bold tracking-tight text-white mb-3">Let's <span className="text-orange-400">Connect</span></h2>
              <p className="text-white/70 text-base mb-8">Get in touch about front-end and React development opportunities.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {contactLinks.map(({ label, detail, url }) => (
                    <button
                      key={url}
                      onClick={() => setRedirectUrl(url)}
                      className="block w-full p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-teal-400 transition-colors text-left"
                    >
                      <span className="block text-base font-semibold text-white">{label}</span>
                      <span className="block text-sm text-white/60 mt-1">{detail}</span>
                    </button>
                  ))}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-4xl p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Email me directly</h3>
                  <p className="text-base text-white/70 mb-5">Tell me about your project or role, and include the best way to reach you.</p>
                  <a href="mailto:andrewarocha.dz@gmail.com" className="break-all text-base text-teal-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-400">andrewarocha.dz@gmail.com</a>
                  <p className="text-sm text-white/60 mt-5">The link opens your email app. You can also copy the address into your preferred email service.</p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close contact" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <RedirectModal
        isOpen={!!redirectUrl}
        onClose={() => setRedirectUrl(null)}
        url={redirectUrl || ""}
        onOpenResume={() => { setRedirectUrl(null); onClose(); onOpenResume?.(); }}
        onOpenAbout={() => { setRedirectUrl(null); onClose(); onOpenAbout?.(); }}
        onOpenProjects={() => { setRedirectUrl(null); onClose(); onOpenProjects?.(); }}
      />
    </>
  );
}
