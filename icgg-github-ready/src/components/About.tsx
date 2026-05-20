import React from 'react';
import { Heart, Users, Book, Cross } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/feetwash.jpg"
              alt="Lavatorio de Pies - Nuestra Tradición de Servicio"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission')}</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('about.missionText1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.missionText2')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('about.love')}</h4>
            <p className="text-gray-600">{t('about.loveDesc')}</p>
          </div>

          <div className="text-center group">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 transition-colors">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('about.community')}</h4>
            <p className="text-gray-600">{t('about.communityDesc')}</p>
          </div>

          <div className="text-center group">
            <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-700 transition-colors">
              <Book className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('about.word')}</h4>
            <p className="text-gray-600">{t('about.wordDesc')}</p>
          </div>

          <div className="text-center group">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 transition-colors">
              <Cross className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('about.faith')}</h4>
            <p className="text-gray-600">{t('about.faithDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;