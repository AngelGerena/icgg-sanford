import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmissionWithFallback();
  };

  const handleFormSubmission = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Use the deployed Supabase function URL
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Fallback to direct Supabase function if the proxy doesn't exist
      if (!response.ok && response.status === 404) {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Supabase is not configured');

        const supabaseResponse = await fetch(`${SUPABASE_URL}/functions/v1/contact-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData)
        });
        
        if (supabaseResponse.ok) {
          setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send message');
        }
      } else if (response.ok) {
        setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitMessage('Hubo un error enviando tu mensaje. Por favor envía un email directamente a info@icgg.us o llámanos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           isValidEmail(formData.email) &&
           formData.subject.trim() && 
           formData.message.trim();
  };

  // Alternative simple email sending function as fallback
  const sendEmailDirectly = async () => {
    const subject = encodeURIComponent(`Contacto desde ICGG.us: ${formData.subject}`);
    const body = encodeURIComponent(`
Nombre: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Teléfono: ${formData.phone}` : ''}

Mensaje:
${formData.message}
    `);

    const mailtoLink = `mailto:icggmedia@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleFormSubmissionWithFallback = async () => {
    if (!isFormValid()) {
      setSubmitMessage('Por favor completa todos los campos requeridos con información válida.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto. Bendiciones!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (window.confirm('El formulario no pudo ser enviado. ¿Te gustaría abrir tu cliente de email para enviar el mensaje directamente?')) {
        sendEmailDirectly();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const originalHandleFormSubmission = async () => {
    try {
      // For development/testing, we'll simulate the email being sent
      console.log('Contact form submission:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Hubo un error enviando tu mensaje. Por favor intenta de nuevo o contactanos directamente.');
    }
  };

  const oldHandleFormSubmission = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Hubo un error enviando tu mensaje. Por favor intenta de nuevo o contactanos directamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.info')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-700 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.address')}</h4>
                  <p className="text-gray-700">2560 S. Elm Ave.</p>
                  <p className="text-gray-700">Sanford, FL 32773</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.email')}</h4>
                  <p className="text-gray-700">info@icgg.us</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
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
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.sendMessage')}</h3>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
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
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('contact.sendButton')}</span>
                  </>
                )}
              </button>
              
              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${
                  submitMessage.includes('Gracias') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <p className="text-sm">{submitMessage}</p>
                </div>
              )}
              
              {/* Direct Email Link as Backup */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  ¿Prefieres enviarnos un email directamente?
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
        <div className="mt-16">
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl shadow-lg p-8 group">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">{t('contact.directions')}</h3>
            <div 
              className="bg-blue-600 rounded-lg h-64 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=2560+S.+Elm+Ave,+Sanford,+FL+32773', '_blank')}
            >
              <div className="text-center px-4">
                <MapPin className="h-12 w-12 text-white group-hover:text-orange-400 mx-auto mb-4 transition-colors duration-300" />
                <p className="text-lg text-white group-hover:text-orange-400 font-medium transition-colors duration-300">
                  2560 S. Elm Ave.
                </p>
                <p className="text-lg text-white group-hover:text-orange-400 font-medium transition-colors duration-300">
                  Sanford, FL 32773
                </p>
                <p className="text-blue-200 group-hover:text-orange-200 mt-2 transition-colors duration-300">
                  {t('contact.clickMaps')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
