import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Curatorial Advisory',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Header */}
        <div className="py-6 sm:py-8 border-b border-surface-container max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Curatorial Concierge</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-normal mt-2">
            Atelier Liaison & Salon Inquiries
          </h1>
          <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-2 leading-relaxed">
            Whether you require bespoke framing dimensions for a heritage property, bulk curations for architectural studios, or provenance inquiries, our senior curators are at your disposal.
          </p>
        </div>

        {/* 2-Column Contact Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-8 sm:my-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container shadow-subtle w-full max-w-full">
            {submitted ? (
              <div className="py-10 sm:py-12 text-center space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-medium">
                  Inquiry Transmitted to Curator
                </h3>
                <p className="text-xs font-body text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. An atelier curator will review your docket and reply to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                      Patron Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anirban Mukherjee"
                      className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@gmail.com"
                      className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-surface text-on-surface text-xs font-label px-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary"
                  >
                    <option value="Curatorial Advisory">Curatorial Advisory & Frame Recommendations</option>
                    <option value="Bespoke Sizing">Custom Architectural Sizing (Oversized Plates)</option>
                    <option value="Institutional Orders">Interior Designer & Corporate Projects</option>
                    <option value="Order & Transit">Archival Order & Transit Docket Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Inquiry Details & Wall Specifications
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room lighting, preferred dimensions, or questions about particular artworks..."
                    className="w-full bg-surface text-on-surface text-xs font-body p-3.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Kolkata Atelier</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Atelier Address & Hours */}
          <div className="lg:col-span-5 space-y-6 w-full max-w-full">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container space-y-5 sm:space-y-6">
              <div className="space-y-1">
                <span className="font-bengali text-xs sm:text-sm text-primary">কলকাতা স্টুডিও ও সংগ্রহশালা</span>
                <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-normal">
                  PeekPage Atelier Studio
                </h3>
              </div>

              <div className="space-y-4 text-xs font-body text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-on-surface">Physical Address</span>
                    <p>Flat 4B, Heritage Mansions, 12 Southern Avenue, Lake Market, Kolkata, West Bengal 700029</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-on-surface">Concierge Hotline</span>
                    <p>+91 (033) 2466-8910 • Mon - Sat, 10 AM - 7 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-on-surface">Curatorial Desk</span>
                    <p>curator@peekpage.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-on-surface">Salon Visit Appointments</span>
                    <p>Private gallery viewing by prior appointment only.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
