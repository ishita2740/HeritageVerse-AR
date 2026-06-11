'use client';

import { Mail, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-20 bg-background scroll-mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Get in <span className="text-secondary">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to join our mission to preserve heritage?
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Email Us Card */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-8 shadow-sm hover:border-secondary transition-colors group">
            <div className="inline-flex rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 p-3 group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors mb-4">
              <Mail className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">
              Get in touch with our team for any inquiries or collaboration opportunities.
            </p>
            <a href="mailto:hello@heritageverse.com" className="text-secondary font-medium hover:underline">
              hello@heritageverse.com
            </a>
          </div>

          {/* Connect With Us Card */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-8 shadow-sm hover:border-secondary transition-colors group">
            <div className="inline-flex rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 p-3 group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors mb-4">
              <MessageSquare className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">
              Follow us on social media for updates, heritage stories, and community events.
            </p>
            <div className="flex gap-3">
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-7 9-7z" /></svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" /></svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 7v10m-3-3h6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
