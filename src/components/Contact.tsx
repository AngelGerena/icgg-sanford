import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MAX_MESSAGE = 5000;

/**
 * Public contact form.
 *
 * Messages are stored in Supabase and surface in the portal Inbox. There is no
 * email step, so nothing can be lost to a spam folder. Failures are shown to
 * the visitor with their text preserved, and a direct mail link remains as a
 * manual fallback.
 */
const Contact = () => {
  const { t, isSpanish } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () =>
    formData.name.trim() !== '' &&
    isValidEmail(formData.email.trim()) &&
    formData.message.trim() !== '';

  const errorFor = (code: string) => {
    switch (code) {
      case 'name_required':
        return t('contact.errorName');
      case 'email_invalid':
        return t('contact.errorEmail');
      case 'message_required':
      case 'message_too_long':
        return t('contact.errorMessage');
      case 'rate_limited':
        return t('contact.errorRate');
      case 'network':
        return t('contact.errorNetwork');
      default:
        return t('contact.errorGeneric');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) { setError(t('contact.errorName')); return; }
    if (!isValidEmail(formData.email.trim())) { setError(t('contact.errorEmail')); return; }
    if (!formData.message.trim()) { setError(t('contact.errorMessage')); return; }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.ok) {
        setSent(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
      } else {
        // Text stays in the box so nothing typed is thrown away.
        setError(errorFor(data?.error ?? 'unknown'));
      }
    } catch {
      setError(errorFor('network'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.info')}</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-blue-700 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.address')}</h4>
                  <p className="text-gray-700">2560 S. Elm Ave.</p>
                  <p className="text-gray-700">Sanford, FL 32773</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.email')}</h4>
                  <p className="text-gray-700">info@icgg.us</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-purple-600 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.officeHours')}</h4>
                  <p className="text-gray-700">{t('contact.mondayFriday')}</p>
                  <p className="text-gray-700">{t('contact.saturday')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.sendMessage')}</h3>

            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1}
                  autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('contact.fullNamePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="(407) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.subject')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="prayer">{t('contact.prayer')}</option>
                    <option value="visit">{t('contact.visit')}</option>
                    <option value="ministry">{t('contact.ministryInfo')}</option>
                    <option value="counseling">{t('contact.counseling')}</option>
                    <option value="other">{t('contact.other')}</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg ${
                  isSubmitting || !isFormValid() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{isSpanish ? 'Enviando…' : 'Sending…'}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{error ? t('contact.retry') : t('contact.sendButton')}</span>
                  </>
                )}
              </button>
              
              {sent && (
                <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 flex gap-3" role="status">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-900">{t('contact.success')}</p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3" role="alert">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">{t('contact.errorTitle')}</p>
                    <p className="text-sm text-red-800 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Direct Email Link as Backup */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {t('contact.orEmail')}
                </p>
                <a
                  href="mailto:icggmedia@gmail.com"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                >
                  icggmedia@gmail.com
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div
          ref={mapRef}
          className={`mt-16 transition-all duration-1000 ${
            mapVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-6">
              <h3 className="text-3xl font-bold text-white text-center">{t('contact.directions')}</h3>
            </div>
            <div className="relative w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8527436897564!2d-81.30037682404614!3d28.77090637560451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7696c7b9c5555%3A0x7890e1f2a3b4c5d6!2s2560%20S%20Elm%20Ave%2C%20Sanford%2C%20FL%2032773!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="bg-gray-50 p-6 text-center">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=2560+S.+Elm+Ave,+Sanford,+FL+32773"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MapPin className="h-5 w-5" />
                <span>{t('contact.clickMaps')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;