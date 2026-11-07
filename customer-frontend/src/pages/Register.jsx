import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Check,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || location.state?.from || '/account';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [selectedInterests, setSelectedInterests] = useState([
    'Cinema Classics',
    'Colonial Architecture',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Cinema Classics (Satyajit Ray)',
    'Colonial Architecture & Trams',
    'Literature & Tagore Calligraphy',
    'Modernist Folk (Jamini Roy)',
    'Battala 19th C. Letterpress',
  ];

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await register({
      ...formData,
      interests: selectedInterests,
    });
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 sm:py-16 bg-surface flex items-center justify-center w-full max-w-full overflow-x-hidden">
      <div className="max-w-lg w-full mx-auto px-4">
        
        <div className="p-6 sm:p-10 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-atelier space-y-5 sm:space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Peel page"
                className="h-10 mx-auto w-auto object-contain"
              />
            </Link>
            <span className="font-bengali text-xs sm:text-sm text-primary block">
              বাংলার ঐতিহ্য সংগ্রাহক সমাজ
            </span>
            <h1 className="font-headline text-2xl sm:text-3xl font-normal text-on-surface">
              Patron Guild Registration
            </h1>
            <p className="text-xs font-body text-on-surface-variant max-w-sm mx-auto">
              Register as an authorized patron of PeekPage for certified provenance dockets, early centenary drops, and private archival viewings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                Full Patron Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Smt. Nandita Ray"
                  className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="patron@gmail.com"
                    className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98301 23456"
                    className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                Vault Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                />
              </div>
            </div>

            {/* Curatorial Interest Tags */}
            <div className="pt-1">
              <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1.5">
                Select Your Archival Interests
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {interestOptions.map((opt) => {
                  const isSelected = selectedInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-label flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-xs'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privileges Strip */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low text-[10px] sm:text-[11px] font-label text-on-surface-variant space-y-1">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Patron Guild Privileges</span>
              </div>
              <p>• 48-Hour Priority Window on Numbered Limited Editions</p>
              <p>• Digital Certificate of Provenance stored permanently in your Dossier</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Registering Patron Docket...' : 'Complete Atelier Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-1 text-xs font-label text-on-surface-variant">
            <span>Already an authorized patron? </span>
            <Link to={`/login${location.search}`} className="text-primary font-bold hover:underline">
              Enter Existing Dossier
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
