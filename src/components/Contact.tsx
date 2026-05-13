"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "../data/resume";

type FormState = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form,   setForm]   = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // mailto fallback (no backend needed)
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:mukulxyadav@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setTimeout(() => setStatus("sent"), 1000);
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label text-neutral-500 block mb-2">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Recruiter Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/7 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="label text-neutral-500 block mb-2">Your Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="hello@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/7 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="label text-neutral-500 block mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="I'd like to discuss an internship opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/7 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-sm resize-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className={`btn-primary w-full justify-center interactive ${
                  (status === "sending" || status === "sent") ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? "Opening mail client…" :
                 status === "sent"    ? "✓ Email draft opened" :
                 "Send Message"}
              </motion.button>
            </form>
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
            <div className="card p-6">
              <h3 className="heading-2 text-white mb-5">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-4 group interactive"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    ✉
                  </div>
                  <div>
                    <div className="label text-neutral-600">Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {resumeData.email}
                    </div>
                  </div>
                </a>
                <a
                  href={`tel:${resumeData.phone}`}
                  className="flex items-center gap-4 group interactive"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                    📱
                  </div>
                  <div>
                    <div className="label text-neutral-600">Phone</div>
                    <div className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                      +91 {resumeData.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="card p-6">
              <h3 className="heading-2 text-white mb-5">Find Me Online</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card px-4 py-3 text-center group interactive"
                  >
                    <div className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                      {s.label}
                    </div>
                    <div className="text-[10px] text-neutral-600 mt-0.5">↗ Visit</div>
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
