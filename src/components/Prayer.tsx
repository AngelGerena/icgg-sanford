import React from 'react';
import { Heart, Calendar, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Prayer = () => {
  const { t } = useLanguage();

  return (
    <section id="prayer" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100" style={{background: 'linear-gradient(135deg, #faf5ff 0%, #e0e7ff 100%)'}}>
      <div className="container mx-auto px-4">
        {/* Enfoque de Oración Diaria Section - HIDDEN (may be used again later) */}
        {/*
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enfoque de Oración Diaria
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            "Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús." - 1 Tesalonicenses 5:16-18
          </p>
        </div>
        */}

        {/* Pastor's Daily Thoughts Section - HIDDEN (may be used again in the future) */}
        {/*
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://www.dropbox.com/scl/fi/xfsxaoe6m89k0odjld8yr/26DD5DE0-9F60-4FBC-8BD1-2897A675760E.JPEG?rlkey=1413t54ayowyip4xkfi8oxg6u&st=u1tqymkf&raw=1"
                    alt="Pastora Irene Familia"
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: '50% 20%' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-amber-300 hidden items-center justify-center">
                    <Heart className="h-8 w-8 text-amber-700" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Reflexión Diaria de la Pastora</h3>
                  <p className="text-amber-100">Pastora Irene Familia</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-semibold text-gray-800">
                    {new Date().toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-lg p-6 border border-amber-300 shadow-sm">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Heart className="h-5 w-5 text-amber-600 mr-2" />
                        Reflexión del Día
                      </h4>
                      <div className="space-y-4 text-gray-700">
                        <p className="leading-relaxed">
                          En la iglesia primitiva no se dice primero que crecían los hombres, sino que crecía la Palabra.
                        </p>
                        <p className="leading-relaxed">
                          Ese detalle no es menor: revela un principio espiritual eterno.
                        </p>
                        <p className="leading-relaxed">
                          La expansión del Reino no comienza con estructuras, estrategias o carisma humano, sino con el crecimiento de la Palabra de Dios en el corazón de las personas.
                        </p>
                        <p className="leading-relaxed">
                          Cuando la Palabra crece, el discípulo se multiplica. Cuando la Palabra es superficial, el discipulado se estanca. Cuando la Palabra es central, profunda y obedecida, el fruto es inevitable.
                        </p>
                        <p className="leading-relaxed">
                          Por eso, si alguna vez te has preguntado:
                        </p>
                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400 ml-4">
                          <p className="leading-relaxed italic">
                            ¿Por qué no me he multiplicado como discípulo?<br />
                            ¿Por qué mi vida espiritual parece estancada?
                          </p>
                        </div>
                        <p className="leading-relaxed">
                          Entonces no es tiempo de buscar nuevas técnicas, sino de examinar cuánto ha crecido la Palabra en ti. La multiplicación externa siempre es el resultado de una transformación interna.
                        </p>
                        <p className="leading-relaxed">
                          Los apóstoles lo entendieron claramente. En medio del crecimiento, las demandas y las tensiones internas, ellos tomaron una decisión estratégica y espiritual:
                        </p>
                        <p className="leading-relaxed font-semibold text-amber-800 bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                          Hechos de los Apóstoles 6:4 (RVR1960)<br />
                          "Y nosotros persistiremos en la oración y en el ministerio de la palabra."
                        </p>
                        <p className="leading-relaxed">
                          No dijeron: persistiremos en la administración, ni en resolver todos los problemas, sino en la oración y la Palabra. Porque sabían que cuando la Palabra es cuidada, ella cuida a la iglesia.
                        </p>
                        <p className="leading-relaxed">
                          El resultado fue claro y visible:
                        </p>
                        <p className="leading-relaxed font-semibold text-amber-800 bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                          Hechos 6:7 (RVR1960)<br />
                          "Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén; también muchos de los sacerdotes obedecían a la fe."
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="leading-relaxed">
                            <strong>Nota el orden:</strong>
                          </p>
                          <ol className="list-decimal ml-5 space-y-1">
                            <li>Crece la Palabra</li>
                            <li>Se multiplican los discípulos</li>
                            <li>Personas difíciles de alcanzar obedecen a la fe</li>
                          </ol>
                        </div>
                        <p className="leading-relaxed">
                          Más adelante, aun en medio de persecución, encarcelamientos y oposición espiritual, la Escritura no dice que la iglesia fue detenida, sino que:
                        </p>
                        <p className="leading-relaxed font-semibold text-amber-800 bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                          Hechos 12:24 (RVR1960)<br />
                          "Pero la palabra del Señor crecía y se multiplicaba."
                        </p>
                        <p className="leading-relaxed">
                          Y nuevamente, cuando el Evangelio confronta sistemas espirituales, culturales e idolátricos:
                        </p>
                        <p className="leading-relaxed font-semibold text-amber-800 bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                          Hechos 19:20 (RVR1960)<br />
                          "Así crecía y prevalecía poderosamente la palabra del Señor."
                        </p>
                        <p className="leading-relaxed">
                          La Palabra no solo crecía, prevalecía.<br />
                          No competía, no negociaba, no se adaptaba al error: dominaba espiritualmente.
                        </p>
                        <p className="leading-relaxed">
                          Este mismo principio se ve en el ministerio de Jesús. El Evangelio no resalta largas explicaciones psicológicas, sino la autoridad de su Palabra:
                        </p>
                        <p className="leading-relaxed font-semibold text-amber-800 bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                          Mateo 8:16 (RVR1960)<br />
                          "Y cuando llegó la noche, trajeron a él muchos endemoniados; y con la palabra echó fuera a los demonios, y sanó a todos los enfermos."
                        </p>
                        <p className="leading-relaxed">
                          Jesús no necesitó rituales extensos: una Palabra bastó para liberar, sanar y restaurar.
                        </p>
                        <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                          <h5 className="font-bold text-gray-900 mb-3 text-lg">Principio clave para hoy:</h5>
                          <ul className="space-y-2">
                            <li className="leading-relaxed">• Donde la Palabra crece, el pecado pierde dominio</li>
                            <li className="leading-relaxed">• Donde la Palabra crece, la fe se fortalece</li>
                            <li className="leading-relaxed">• Donde la Palabra crece, los discípulos se multiplican</li>
                          </ul>
                        </div>
                        <p className="leading-relaxed">
                          La pregunta no es si tenemos Biblia, sino:
                        </p>
                        <p className="leading-relaxed font-semibold text-lg text-gray-900">
                          ¿Está creciendo la Palabra en nosotros o solo está almacenada como información?
                        </p>
                        <p className="leading-relaxed">
                          Porque la Palabra que se recibe, pero no crece, no transforma. Pero la Palabra que habita, gobierna y se obedece, siempre produce vida, fruto y multiplicación.
                        </p>
                        <p className="leading-relaxed">
                          <em>Con amor pastoral,<br />
                          Pastora Irene Familia</em>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-800 text-sm">
                        <strong>Reflexiona:</strong> Toma un momento hoy para evaluar cómo está creciendo la Palabra de Dios en tu vida. No se trata solo de leer, sino de dejar que la Palabra habite, gobierne y transforme cada área de tu ser.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 border border-amber-300">
                  <p className="text-amber-800 font-semibold mb-2">
                    ¿Tienes una petición de oración especial?
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Compartir Petición de Oración</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Prayer Meeting Information - HIDDEN (may be used again later) */}
        {/*
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reunión de Oración Semanal</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-700" />
                  <span className="text-lg font-semibold text-gray-800">Todos los Miércoles</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-700" />
                  <span className="text-lg font-semibold text-gray-800">8:30 AM</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Un tiempo dedicado a la oración comunitaria, intercesión por nuestras familias,
                la iglesia, la comunidad y las naciones. Ven y únete a nosotros en oración.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-semibold text-sm">
                  📍 2560 S. Elm Ave. Sanford, FL 32773
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Peticiones de Oración</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                ¿Tienes una petición de oración? Nos encantaría orar contigo y por ti.
                Comparte tus necesidades con nuestra familia de fe.
              </p>
              <div className="space-y-4">
                <a
                  href="#contact"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                >
                  Enviar Petición de Oración
                </a>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800 text-sm">
                    <strong>Confidencialidad:</strong> Todas las peticiones son tratadas con respeto y confidencialidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

      </div>
    </section>
  );
};

export default Prayer;