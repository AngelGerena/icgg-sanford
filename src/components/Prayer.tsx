import React, { useState } from 'react';
import { Heart, Send, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MAX_MESSAGE = 5000;

/**
 * Public prayer request form.
 *
 * Two things matter more here than anywhere else on the site: the person must
 * never be left wondering whether their request went through, and consent to
 * share must be explicit rather than assumed. Failures are surfaced with the
 * message preserved, so nothing a person wrote is ever thrown away by an error.
 */
const Prayer = () => {
  const { t, isSpanish } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    website: '', // honeypot — hidden from people, tempting to bots
  });
  const [anonymous, setAnonymous] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const errorFor = (code: string) => {
    switch (code) {
      case 'message_required':
      case 'message_too_long':
        return t('prayer.errorMessage');
      case 'email_invalid':
        return t('prayer.errorEmail');
      case 'rate_limited':
        return t('prayer.errorRate');
      case 'network':
        return t('prayer.errorNetwork');
      default:
        return t('prayer.errorGeneric');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.message.trim()) {
      setError(t('prayer.errorMessage'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/prayer-request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            fullName: anonymous ? '' : formData.fullName,
            email: anonymous ? '' : formData.email,
            phone: anonymous ? '' : formData.phone,
            message: formData.message,
            website: formData.website,
            anonymous,
            consent,
            is_shared: consent,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.ok) {
        setIsSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', message: '', website: '' });
        setAnonymous(false);
        setConsent(false);
      } else {
        // The message stays in the box on purpose. Nobody should have to
        // rewrite something difficult because our server hiccuped.
        setError(errorFor(data?.error ?? 'unknown'));
      }
    } catch {
      setError(errorFor('network'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const remaining = MAX_MESSAGE - formData.message.length;

  return (
    <section id="prayer" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('prayer.title')}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('prayer.subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('prayer.thankYou')}</h3>
                <p className="text-gray-600 text-lg">{t('prayer.thankYouMessage')}</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-amber-700 font-semibold underline underline-offset-4"
                >
                  {isSpanish ? 'Enviar otra petición' : 'Send another request'}
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('prayer.formTitle')}</h3>
                  <p className="text-gray-600">{t('prayer.formDescription')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot. Hidden from people and from screen readers. */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-gray-800">{t('prayer.anonymous')}</span>
                      <span className="block text-sm text-gray-500 mt-1">{t('prayer.anonymousHelp')}</span>
                    </span>
                  </label>

                  {!anonymous && (
                    <>
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('prayer.fullName')}
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder={t('prayer.fullNamePlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('prayer.email')}{' '}
                          <span className="font-normal text-gray-400">({t('prayer.optional')})</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder={t('prayer.emailPlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('prayer.phone')}{' '}
                          <span className="font-normal text-gray-400">({t('prayer.optional')})</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder={t('prayer.phonePlaceholder')}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('prayer.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={MAX_MESSAGE}
                      rows={6}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder={t('prayer.messagePlaceholder')}
                    ></textarea>
                    {formData.message.length > MAX_MESSAGE - 500 && (
                      <p className="text-xs text-gray-400 mt-2 text-right">
                        {remaining} {t('prayer.charsLeft')}
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-gray-800">{t('prayer.consent')}</span>
                      <span className="block text-sm text-gray-500 mt-1">{t('prayer.consentHelp')}</span>
                    </span>
                  </label>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex gap-3">
                    <Lock className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900">
                      <strong>{t('prayer.confidentiality')}</strong> {t('prayer.confidentialityMessage')}
                    </p>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900">{t('prayer.errorTitle')}</p>
                        <p className="text-sm text-red-800 mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>
                      {isSubmitting
                        ? t('prayer.sending')
                        : error
                        ? t('prayer.retry')
                        : t('prayer.submit')}
                    </span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prayer;
