import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  isSpanish: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  // Navigation
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.about': { es: 'Acerca de', en: 'About' },
  'nav.prayer': { es: 'Oración', en: 'Prayer' },
  'nav.live': { es: 'En Vivo', en: 'Live' },
  'nav.services': { es: 'Servicios', en: 'Services' },
  'nav.ministries': { es: 'Ministerios', en: 'Ministries' },
  'nav.events': { es: 'Eventos', en: 'Events' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'nav.giving': { es: 'Diezmos y Ofrendas', en: 'Giving' },
  
  // Hero Section
  'hero.title': { es: 'I.C.G.G.', en: 'I.C.G.G.' },
  'hero.subtitle': { es: 'Iglesia Cristiana Gracia y Gloria', en: 'Grace and Glory Christian Church' },
  'hero.welcome': { es: 'Bienvenidos a nuestra familia de fe', en: 'Welcome to our family of faith' },
  'hero.welcomeEn': { es: 'Welcome to our family of faith', en: 'Bienvenidos a nuestra familia de fe' },
  'hero.joinUs': { es: 'Únete a Nosotros', en: 'Join Us' },
  'hero.viewServices': { es: 'Nuestro Servicios', en: 'View Services' },
  
  // About Section
  'about.title': { es: 'Acerca de Nosotros', en: 'About Us' },
  'about.description': { es: 'Somos una comunidad de fe comprometida con compartir el amor de Cristo y servir a nuestra comunidad en Sanford, Florida.', en: 'We are a faith community committed to sharing the love of Christ and serving our community in Sanford, Florida.' },
  'about.mission': { es: 'Nuestra Misión', en: 'Our Mission' },
  'about.missionText1': { es: 'En I.C.G.G., creemos en el poder transformador del evangelio de Jesucristo. Nuestra misión es crear un ambiente donde las familias puedan crecer espiritualmente, encontrar comunidad auténtica y servir a otros con amor.', en: 'At I.C.G.G., we believe in the transforming power of the gospel of Jesus Christ. Our mission is to create an environment where families can grow spiritually, find authentic community, and serve others with love.' },
  'about.missionText2': { es: 'Nos dedicamos a predicar la Palabra de Dios con fidelidad, discipular a los creyentes en su fe, y alcanzar nuestra comunidad con el mensaje de esperanza y salvación.', en: 'We are dedicated to preaching God\'s Word faithfully, discipling believers in their faith, and reaching our community with the message of hope and salvation.' },
  'about.love': { es: 'Amor', en: 'Love' },
  'about.loveDesc': { es: 'Amamos a Dios y a nuestro prójimo', en: 'We love God and our neighbor' },
  'about.community': { es: 'Comunidad', en: 'Community' },
  'about.communityDesc': { es: 'Construimos relaciones auténticas', en: 'We build authentic relationships' },
  'about.word': { es: 'Palabra', en: 'Word' },
  'about.wordDesc': { es: 'Enseñamos la Biblia con fidelidad', en: 'We teach the Bible faithfully' },
  'about.faith': { es: 'Fe', en: 'Faith' },
  'about.faithDesc': { es: 'Vivimos por fe en Cristo Jesús', en: 'We live by faith in Christ Jesus' },
  
  // Live Stream Section
  'live.title': { es: 'Transmisión En Vivo', en: 'Live Stream' },
  'live.description': { es: 'Únete a nosotros en línea para nuestros servicios en vivo', en: 'Join us online for our live services' },
  'live.serviceTitle': { es: 'Servicio En Vivo', en: 'Live Service' },
  'live.followFacebook': { es: 'Síguenos en Facebook', en: 'Follow us on Facebook' },
  'live.followDescription': { es: 'Aquí puedes ver nuestras últimas publicaciones, fotos de eventos y anuncios importantes', en: 'Here you can see our latest posts, event photos and important announcements' },
  'live.cantSee': { es: '¿No puedes ver las publicaciones? Visita nuestra página directamente', en: 'Can\'t see the posts? Visit our page directly' },
  'live.viewFacebook': { es: 'Ver en Facebook', en: 'View on Facebook' },
  'live.announcements': { es: 'Anuncios', en: 'Announcements' },
  'live.announcementsDesc': { es: 'Recibe notificaciones sobre eventos especiales y actividades', en: 'Receive notifications about special events and activities' },
  'live.events': { es: 'Eventos', en: 'Events' },
  'live.eventsDesc': { es: 'Mantente informado sobre próximos eventos y actividades', en: 'Stay informed about upcoming events and activities' },
  'live.photos': { es: 'Fotos', en: 'Photos' },
  'live.photosDesc': { es: 'Ve fotos de nuestros servicios y eventos especiales', en: 'View photos from our services and special events' },
  'live.cantAttend': { es: '¿No puedes asistir en persona?', en: 'Can\'t attend in person?' },
  'live.cantAttendDesc': { es: '¡No te preocupes! Puedes unirte a nosotros en línea durante nuestros servicios en vivo', en: 'Don\'t worry! You can join us online during our live services' },
  'live.scheduleInfo': { es: 'Nuestras transmisiones en vivo están disponibles todos los domingos a las 10:00 AM y jueves a las 7:30 PM.', en: 'Our live streams are available every Sunday at 10:00 AM and Thursday at 7:30 PM.' },
  'live.experienceInfo': { es: 'Experimenta la adoración y la enseñanza desde la comodidad de tu hogar.', en: 'Experience worship and teaching from the comfort of your home.' },
  'live.sunday': { es: 'Domingo', en: 'Sunday' },
  'live.thursday': { es: 'Jueves', en: 'Thursday' },
  'live.mainService': { es: 'Servicio Principal', en: 'Main Service' },
  'live.bibleStudy': { es: 'Estudio Bíblico', en: 'Bible Study' },
  'live.prayerPraise': { es: 'Oración y Alabanza', en: 'Prayer and Praise' },
  'live.liveLabel': { es: 'EN VIVO', en: 'LIVE' },
  
  // Services Section
  'services.title': { es: 'Horarios de Servicios', en: 'Service Times' },
  'services.description': { es: 'Te invitamos a acompañarnos en nuestros servicios de adoración y enseñanza', en: 'We invite you to join us for our worship and teaching services' },
  'services.sunday': { es: 'Domingo', en: 'Sunday' },
  'services.thursday': { es: 'Jueves', en: 'Thursday' },
  'services.friday': { es: 'Viernes', en: 'Friday' },
  'services.mainService': { es: 'Servicio Principal', en: 'Main Service' },
  'services.bibleStudy': { es: 'Estudio Bíblico', en: 'Bible Study' },
  'services.prayerPraise': { es: 'Oración y Alabanza', en: 'Prayer and Praise' },
  'services.youthService': { es: 'Servicio de Jóvenes', en: 'Youth Service' },
  'services.worshipWord': { es: 'Adoración y Palabra', en: 'Worship and Word' },
  'services.location': { es: 'Nuestra Ubicación', en: 'Our Location' },
  'services.locationDesc': { es: '¡Ven y únete a nuestra familia de fe! Todos son bienvenidos.', en: 'Come and join our family of faith! Everyone is welcome.' },
  
  // Ministries Section
  'ministries.title': { es: 'Nuestros Ministerios', en: 'Our Ministries' },
  'ministries.description': { es: 'Ofrecemos diversos ministerios para servir a toda la familia y la comunidad', en: 'We offer various ministries to serve the entire family and community' },
  'ministries.adults': { es: 'Ministerio de Adultos', en: 'Adult Ministry' },
  'ministries.adultsDesc': { es: 'Grupos de estudio bíblico y compañerismo para adultos de todas las edades', en: 'Bible study groups and fellowship for adults of all ages' },
  'ministries.children': { es: 'Ministerio Infantil', en: 'Children\'s Ministry' },
  'ministries.childrenDesc': { es: 'Educación cristiana y actividades para niños de 0-12 años', en: 'Christian education and activities for children ages 0-12' },
  'ministries.worship': { es: 'Ministerio de Alabanza', en: 'Worship Ministry' },
  'ministries.worshipDesc': { es: 'Coro, músicos y equipo de sonido para la adoración congregacional', en: 'Choir, musicians and sound team for congregational worship' },
  'ministries.compassion': { es: 'Ministerio de Compasión', en: 'Compassion Ministry' },
  'ministries.compassionDesc': { es: 'Servicio a la comunidad, ayuda a necesitados y obras de misericordia', en: 'Community service, helping the needy and works of mercy' },
  'ministries.youth': { es: 'Ministerio de Jóvenes', en: 'Youth Ministry' },
  'ministries.youthDesc': { es: 'Actividades, estudios bíblicos y eventos especiales para adolescentes', en: 'Activities, Bible studies and special events for teenagers' },
  'ministries.family': { es: 'Grupos Familiares', en: 'Family Groups' },
  'ministries.familyDesc': { es: 'Reuniones en hogares para estudio bíblico y comunión íntima', en: 'Home meetings for Bible study and intimate fellowship' },
  'ministries.singles': { es: 'Ministerio de Solteros', en: 'Singles Ministry' },
  'ministries.singlesDesc': { es: 'Actividades, estudios bíblicos y compañerismo para jóvenes adultos solteros', en: 'Activities, Bible studies and fellowship for single young adults' },
  'ministries.marriage': { es: 'Ministerio de Matrimonios', en: 'Marriage Ministry' },
  'ministries.marriageDesc': { es: 'Fortalecimiento de matrimonios a través de estudios bíblicos y retiros', en: 'Strengthening marriages through Bible studies and retreats' },
  'ministries.men': { es: 'Ministerio de Caballeros', en: 'Men\'s Ministry' },
  'ministries.menDesc': { es: 'Reuniones de hombres para crecimiento espiritual y compañerismo cristiano', en: 'Men\'s meetings for spiritual growth and Christian fellowship' },
  'ministries.women': { es: 'Ministerio de Damas', en: 'Women\'s Ministry' },
  'ministries.womenDesc': { es: 'Estudios bíblicos y actividades especiales para mujeres de todas las edades', en: 'Bible studies and special activities for women of all ages' },
  'ministries.media': { es: 'Ministerio de Media', en: 'Media Ministry' },
  'ministries.mediaDesc': { es: 'Equipo de fotografía, video, sonido, redes sociales y tecnología para documentar y compartir la obra de Dios', en: 'Photography, video, sound, social media and technology team to document and share God\'s work' },
  'ministries.missions': { es: 'Ministerio de Misiones', en: 'Missions Ministry' },
  'ministries.missionsDesc': { es: 'Apoyo a misioneros locales e internacionales, viajes misioneros y evangelización global', en: 'Support for local and international missionaries, mission trips and global evangelization' },
  'ministries.evangelism': { es: 'Ministerio de Evangelismo', en: 'Evangelism Ministry' },
  'ministries.evangelismDesc': { es: 'Alcance comunitario, evangelización personal y eventos de testimonio para compartir el evangelio', en: 'Community outreach, personal evangelism and testimony events to share the gospel' },
  'ministries.pastor': { es: 'Nuestra Pastora', en: 'Our Pastor' },
  'ministries.pastorTitle': { es: 'Pastora Principal', en: 'Lead Pastor' },
  'ministries.pastorDesc': { es: 'Con años de experiencia en el ministerio pastoral, la Pastora Irene Familia ha dedicado su vida a servir a Dios y a su pueblo. Su corazón pastoral y su compromiso con la enseñanza bíblica han sido fundamentales en el crecimiento y desarrollo espiritual de nuestra congregación.', en: 'With years of experience in pastoral ministry, Pastor Irene Familia has dedicated her life to serving God and His people. Her pastoral heart and commitment to biblical teaching have been fundamental in the spiritual growth and development of our congregation.' },
  
  // Events Section
  'events.title': { es: '¡Acompañanos!', en: 'Upcoming Events' },
  'events.description': { es: 'Mantente conectado con todas nuestras actividades y eventos especiales', en: 'Stay connected with all our activities and special events' },
  'events.calendarTitle': { es: 'Calendario de Eventos', en: 'Events Calendar' },
  'events.calendarDescription': { es: 'Mantente informado sobre nuestros próximos eventos y actividades especiales', en: 'Stay informed about our upcoming events and special activities' },
  'events.stayInformed': { es: '¡Mantente Informado!', en: 'Stay Informed!' },
  'events.newsletter': { es: 'Suscríbete a nuestro boletín para recibir actualizaciones sobre eventos y actividades', en: 'Subscribe to our newsletter to receive updates about events and activities' },
  'events.emailPlaceholder': { es: 'Tu correo electrónico', en: 'Your email address' },
  'events.subscribe': { es: 'Suscribirse', en: 'Subscribe' },
  
  // Contact Section
  'contact.title': { es: 'Contáctanos', en: 'Contact Us' },
  'contact.description': { es: 'Estamos aquí para servirte. No dudes en contactarnos para cualquier pregunta o necesidad', en: 'We are here to serve you. Don\'t hesitate to contact us for any questions or needs' },
  'contact.info': { es: 'Información de Contacto', en: 'Contact Information' },
  'contact.address': { es: 'Dirección', en: 'Address' },
  'contact.email': { es: 'Correo Electrónico', en: 'Email' },
  'contact.officeHours': { es: 'Horarios de Oficina', en: 'Office Hours' },
  'contact.mondayFriday': { es: 'Lunes - Viernes: 9:00 AM - 5:00 PM', en: 'Monday - Friday: 9:00 AM - 5:00 PM' },
  'contact.saturday': { es: 'Sábado: 10:00 AM - 2:00 PM', en: 'Saturday: 10:00 AM - 2:00 PM' },
  'contact.sendMessage': { es: 'Envíanos un Mensaje', en: 'Send us a Message' },
  'contact.fullName': { es: 'Nombre Completo', en: 'Full Name' },
  'contact.fullNamePlaceholder': { es: 'Tu nombre completo', en: 'Your full name' },
  'contact.emailPlaceholder': { es: 'tu@email.com', en: 'your@email.com' },
  'contact.phone': { es: 'Teléfono', en: 'Phone' },
  'contact.subject': { es: 'Asunto', en: 'Subject' },
  'contact.selectSubject': { es: 'Selecciona un asunto', en: 'Select a subject' },
  'contact.prayer': { es: 'Petición de Oración', en: 'Prayer Request' },
  'contact.visit': { es: 'Quiero Visitar la Iglesia', en: 'I Want to Visit the Church' },
  'contact.ministryInfo': { es: 'Información sobre Ministerios', en: 'Ministry Information' },
  'contact.counseling': { es: 'Consejería Pastoral', en: 'Pastoral Counseling' },
  'contact.other': { es: 'Otro', en: 'Other' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.messagePlaceholder': { es: 'Comparte tu mensaje, petición de oración, o cualquier pregunta que tengas...', en: 'Share your message, prayer request, or any questions you have...' },
  'contact.sendButton': { es: 'Enviar Mensaje', en: 'Send Message' },
  'contact.directions': { es: 'Cómo Llegar', en: 'How to Get Here' },
  'contact.clickMaps': { es: 'Haz clic para abrir en Google Maps', en: 'Click to open in Google Maps' },
  
  // Giving Section
  'giving.title': { es: 'Diezmos y Ofrendas', en: 'Tithes and Offerings' },
  'giving.verse': { es: '"Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." - 2 Corintios 9:7', en: '"Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7' },
  'giving.gratitude': { es: 'Dar con Gratitud', en: 'Give with Gratitude' },
  'giving.generosity': { es: 'Tu generosidad ayuda a expandir el Reino de Dios y bendecir a nuestra comunidad', en: 'Your generosity helps expand God\'s Kingdom and bless our community' },
  'giving.zelleDesc': { es: 'Envía tu diezmo u ofrenda directamente desde tu banco usando Zelle', en: 'Send your tithe or offering directly from your bank using Zelle' },
  'giving.zelleOfficial': { es: 'Ir a Zelle Oficial', en: 'Go to Official Zelle' },
  'giving.sendTo': { es: 'Enviar a:', en: 'Send to:' },
  'giving.instructions': { es: 'Instrucciones:', en: 'Instructions:' },
  'giving.step1': { es: '1. Abre tu app bancaria', en: '1. Open your banking app' },
  'giving.step2': { es: '2. Selecciona Zelle', en: '2. Select Zelle' },
  'giving.step3': { es: '3. Usa el email: Give@encadena.org', en: '3. Use email: Give@encadena.org' },
  'giving.step4': { es: '4. Ingresa el monto', en: '4. Enter the amount' },
  'giving.step5': { es: '5. En el memo escribe "Diezmo" u "Ofrenda"', en: '5. In memo write "Tithe" or "Offering"' },
  'giving.tithelyDesc': { es: 'Plataforma segura para dar con tarjeta de débito, crédito o cuenta bancaria', en: 'Secure platform to give with debit card, credit card or bank account' },
  'giving.giveNow': { es: 'Dar Ahora con Tithe.ly', en: 'Give Now with Tithe.ly' },
  'giving.paymentOptions': { es: 'Opciones de pago:', en: 'Payment options:' },
  'giving.debitCredit': { es: '• Tarjeta de débito/crédito', en: '• Debit/credit card' },
  'giving.bankTransfer': { es: '• Transferencia bancaria (ACH)', en: '• Bank transfer (ACH)' },
  'giving.oneTimeRecurring': { es: '• Dar una sola vez o recurrente', en: '• One-time or recurring giving' },
  'giving.secure': { es: '• 100% seguro y encriptado', en: '• 100% secure and encrypted' },
  'giving.whyGive': { es: '¿Por qué damos?', en: 'Why do we give?' },
  'giving.obedience': { es: 'Obediencia a Dios', en: 'Obedience to God' },
  'giving.obedienceDesc': { es: 'Damos porque Dios nos ha dado primero y es un acto de obediencia y adoración.', en: 'We give because God has given to us first and it is an act of obedience and worship.' },
  'giving.support': { es: 'Apoyo al Ministerio', en: 'Ministry Support' },
  'giving.supportDesc': { es: 'Nuestras ofrendas sostienen la obra del ministerio y las actividades de la iglesia.', en: 'Our offerings sustain the work of ministry and church activities.' },
  'giving.blessing': { es: 'Bendición a Otros', en: 'Blessing Others' },
  'giving.blessingDesc': { es: 'Ayudamos a los necesitados y apoyamos las misiones locales e internacionales.', en: 'We help those in need and support local and international missions.' },
  'giving.disclaimer': { es: 'Todas las donaciones son procesadas de forma segura. Para preguntas sobre donaciones, contacta a nuestra oficina.', en: 'All donations are processed securely. For questions about donations, contact our office.' },
  
  // Facebook Page Feed Section
  'facebook.title': { es: 'Síguenos en Facebook!', en: 'Follow us on Facebook!' },
  'facebook.description': { es: 'Mantente conectado con todas nuestras actividades y eventos especiales a través de Facebook', en: 'Stay connected with all our activities and special events through Facebook' },
 'facebook.followDescription': { es: 'Únete a nuestra comunidad en Facebook para ver fotos de nuestros servicios, recibir actualizaciones de eventos, y mantenerte conectado con la familia de I.C.G.G.', en: 'Join our Facebook community to see photos from our services, receive event updates, and stay connected with the I.C.G.G. family.' },
 'facebook.followButton': { es: 'Seguir en Facebook', en: 'Follow on Facebook' },
  
  // Events Section - Specific Events
  'events.prayer': { es: 'Oración', en: 'Prayer' },
  'events.everyWednesday': { es: 'Todos los Miércoles', en: 'Every Wednesday' },
  'events.prayerDesc': { es: 'Un tiempo dedicado a la oración comunitaria, intercesión y búsqueda de la presencia de Dios. Ven y únete a nosotros en Oración. Te Esperamos', en: 'A time dedicated to community prayer, intercession and seeking God\'s presence. Come and join us in Prayer. We are waiting for you' },
  'events.weekly': { es: 'Semanal', en: 'Weekly' },
  'events.artsSchool': { es: 'ICGG ARTS SANFORD SCHOOL', en: 'ICGG ARTS SANFORD SCHOOL' },
  'events.artsSept13': { es: 'Sábado, 13 de Septiembre', en: 'Saturday, Sept 13th' },
  'events.artsSchoolDesc': { es: 'Escuela de artes de ICGG en Sanford. Un programa especial para desarrollar talentos artísticos y creativos en un ambiente cristiano. Se reúne el segundo sábado de cada mes.', en: 'ICGG arts school in Sanford. A special program to develop artistic and creative talents in a Christian environment. Meets on the second Saturday of each month.' },
  'events.special': { es: 'Especial', en: 'Special' },
  'events.everyThursday': { es: 'Todos los Jueves', en: 'Every Thursday' },
  'events.everySunday': { es: 'Todos los Domingos', en: 'Every Sunday' },
  'events.celebration': { es: 'Celebración', en: 'Celebration' },
  'events.bibleStudyThursdays': { es: 'Estudio Bíblico todos los Jueves', en: 'Bible Study every Thursday' },
  'events.upsideDownSeries': { es: 'Serie Nueva - Upside Down - Pastora Irene Familia', en: 'New Series - Upside Down - Pastor Irene Familia' },
  'events.bibleStudyDesc': { es: 'Nueva serie de estudio bíblico "Upside Down" dirigida por la Pastora Irene Familia. Un tiempo de profundización en la Palabra de Dios.', en: 'New Bible study series "Upside Down" led by Pastor Irene Familia. A time of deepening in God\'s Word.' },
  'events.sundayService': { es: 'Servicio de Domingo', en: 'Sunday Service' },
  'events.sept14th': { es: '14 de Septiembre', en: 'Sept 14th' },
  'events.sundayServiceDesc': { es: 'Nuestro servicio principal de adoración dominical con predicación, alabanza y comunión.', en: 'Our main Sunday worship service with preaching, praise and communion.' },
  
  // Footer
  'footer.description': { es: 'Una iglesia comprometida con predicar el evangelio, discipular creyentes y servir a nuestra comunidad con el amor de Cristo. Todos son bienvenidos en nuestra familia de fe.', en: 'A church committed to preaching the gospel, discipling believers and serving our community with the love of Christ. Everyone is welcome in our family of faith.' },
  'footer.quickLinks': { es: 'Enlaces Rápidos', en: 'Quick Links' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.serviceHours': { es: 'Horarios de Servicios', en: 'Service Hours' },
  'footer.sunday': { es: 'Domingo:', en: 'Sunday:' },
  'footer.thursday': { es: 'Jueves:', en: 'Thursday:' },
  'footer.friday': { es: 'Viernes:', en: 'Friday:' },
  'footer.copyright': { es: '© 2025 I.C.G.G. Iglesia Cristiana Gracia y Gloria. Todos los derechos reservados.', en: '© 2025 I.C.G.G. Grace and Glory Christian Church. All rights reserved.' },
  'footer.privacy': { es: 'Política de Privacidad', en: 'Privacy Policy' },
  'footer.terms': { es: 'Términos de Uso', en: 'Terms of Use' },
  'footer.designedBy': { es: 'Site designed by Finesse Media LLC', en: 'Site designed by Finesse Media LLC' }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isSpanish, setIsSpanish] = useState(true);

  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return isSpanish ? translation.es : translation.en;
  };

  return (
    <LanguageContext.Provider value={{ isSpanish, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};