"use client"
import { useState } from "react"
import { Send, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/social-icons"

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("sent")
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-accent text-sm tracking-widest uppercase">05.</span>
        <h2 className="text-2xl font-bold text-foreground">Contact</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left — copy */}
        <div>
          <h3 className="text-3xl font-bold text-foreground text-balance mb-4">
            {"Let's connect."}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {"I'm open to senior engineering leadership roles, advisory positions, and collaborative FinTech or AI opportunities. Whether you have a project in mind or just want to talk tech — my inbox is open."}
          </p>

          <div className="space-y-4 mb-10">
            <a
              href="mailto:nitesh.ns19@gmail.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
            >
              <Mail size={16} className="shrink-0" />
              <span className="text-sm font-mono group-hover:underline underline-offset-4">
                nitesh.ns19@gmail.com
              </span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            {[
              { href: "https://github.com/niteshsingh19", icon: GithubIcon, label: "GitHub" },
              { href: "https://www.linkedin.com/in/niteshsingh19", icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "sent" ? (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
              <p className="text-accent font-semibold mb-1">Message sent!</p>
              <p className="text-muted-foreground text-sm">
                {"Thanks for reaching out — I'll get back to you soon."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-card border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-card border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-primary-foreground font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <span className="animate-pulse">Sending…</span>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
