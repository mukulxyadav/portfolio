"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resume";
import confetti from "canvas-confetti";

type FormState = { name: string; email: string; message: string; honeypot: string };
type Status = "idle" | "sending" | "sent" | "error";
type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name" && !value.trim()) error = "Name is required";
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
    }
    if (name === "message" && !value.trim()) error = "Message cannot be empty";
    
    setFieldErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (status === "error") setStatus("idle");
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple rapid submissions (5 second cooldown)
    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
      setErrorMsg("Please wait a moment before sending another message.");
      setStatus("error");
      return;
    }

    // Honeypot check
    if (form.honeypot) {
      setStatus("sent"); // Silently fail for bots
      return;
    }

    // Validate all fields
    const isNameValid = validateField("name", form.name);
    const isEmailValid = validateField("email", form.email);
    const isMessageValid = validateField("message", form.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) return;
    
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("sent");
      setLastSubmissionTime(Date.now());
      setForm({ name: "", email: "", message: "", honeypot: "" });
      
      // Success animation
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ffffff']
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const socials = [
    { label: "GitHub",    href: resumeData.github,    icon: "github" },
    { label: "LinkedIn",  href: resumeData.linkedin,  icon: "linkedin" },
    { label: "LeetCode",  href: resumeData.leetcode,  icon: "code" },
    { label: "Twitter/X", href: resumeData.twitter,   icon: "twitter" },
  ];

  return (
    <section id="contact" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-eyebrow">Get in Touch</div>
          <h2 className="display-2 text-white">Contact Me</h2>
          <p className="body-lg max-w-lg mt-4">
            I&apos;m actively looking for internship opportunities. 
            Whether you have a question, project idea, or just want to say hi — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-400 ml-1">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={(e) => validateField("name", e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-5 py-4 rounded-2xl bg-white/5 border ${fieldErrors.name ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {fieldErrors.name && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-400 ml-1">
                          {fieldErrors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-400 ml-1">Your Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={(e) => validateField("email", e.target.value)}
                      placeholder="hello@example.com"
                      className={`w-full px-5 py-4 rounded-2xl bg-white/5 border ${fieldErrors.email ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {fieldErrors.email && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-400 ml-1">
                          {fieldErrors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-400 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={(e) => validateField("message", e.target.value)}
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className={`w-full px-5 py-4 rounded-2xl bg-white/5 border ${fieldErrors.message ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 resize-none`}
                  />
                  <AnimatePresence>
                    {fieldErrors.message && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-400 ml-1">
                        {fieldErrors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3"
                  >
                    <span>✗</span>
                    <span>{errorMsg}</span>
                    <button type="button" onClick={() => setStatus("idle")} className="ml-auto underline hover:text-white">Retry</button>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={`relative w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                    status === "sent" ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                  } ${(status === "sending") ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </motion.div>
                    ) : status === "sent" ? (
                      <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                        Message sent successfully 🚀
                      </motion.div>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* Decorative background glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct contact */}
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">Direct Contact</h3>
              <div className="space-y-5">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    ✉
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {resumeData.email}
                    </div>
                  </div>
                </a>
                <a
                  href={`tel:${resumeData.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                    📱
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Phone</div>
                    <div className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                      +91 {resumeData.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">Find Me Online</h3>
              <div className="grid grid-cols-2 gap-4">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass px-4 py-4 text-center group hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-2xl"
                  >
                    <div className="text-xs font-bold text-neutral-400 group-hover:text-white transition-colors">
                      {s.label}
                    </div>
                    <div className="text-[9px] text-neutral-600 mt-1 uppercase tracking-tighter">↗ Visit</div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
