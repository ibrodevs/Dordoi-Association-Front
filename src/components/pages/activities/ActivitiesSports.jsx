import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, 
  Target, 
  Users, 
  Building, 
  Heart, 
  Award,
  Calendar,
  Star,
  ChevronRight,
  ExternalLink,
  Shield,
  Zap,
  PlayCircle,
  TrendingUp,
  Activity,
  Medal,
  Flame
} from 'lucide-react';

const ActivitiesSports = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { value: '12+', label: t('activities.sports.stats.championships') },
    { value: '2000+', label: t('activities.sports.stats.athletes') },
    { value: '50+', label: t('activities.sports.stats.events') },
    { value: '8+', label: t('activities.sports.stats.cups') }
  ]);

  // Загрузка данных из API
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setLoading(true);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Здесь можно добавить реальные API запросы
        // const data = await apiRequest(`sports/?lang=${lang}`);
        
        // Временные данные из перевода
        const fcRolesData = [
          {
            title: t('activities.sports.fcRoles.development'),
            icon: Trophy,
            gradient: "from-blue-500 to-blue-600"
          },
          {
            title: t('activities.sports.fcRoles.youthSupport'),
            icon: Users,
            gradient: "from-green-500 to-green-600"
          },
          {
            title: t('activities.sports.fcRoles.sportsCulture'),
            icon: Medal,
            gradient: "from-purple-500 to-purple-600"
          },
          {
            title: t('activities.sports.fcRoles.communityEngagement'),
            icon: Heart,
            gradient: "from-red-500 to-red-600"
          }
        ];

        const sportValuesData = [
          {
            title: t('activities.sports.values.healthyLifestyle'),
            icon: Heart,
            gradient: "from-red-500 to-pink-500"
          },
          {
            title: t('activities.sports.values.teamSpirit'),
            icon: Users,
            gradient: "from-blue-500 to-cyan-500"
          },
          {
            title: t('activities.sports.values.discipline'),
            icon: Shield,
            gradient: "from-green-500 to-emerald-500"
          },
          {
            title: t('activities.sports.values.willToWin'),
            icon: TrendingUp,
            gradient: "from-amber-500 to-orange-500"
          },
          {
            title: t('activities.sports.values.sportsSupport'),
            icon: Activity,
            gradient: "from-purple-500 to-violet-500"
          }
        ];

        const sportEventsData = [
          {
            title: t('activities.sports.events.festivals'),
            icon: Award,
            gradient: "from-yellow-500 to-orange-500"
          },
          {
            title: t('activities.sports.events.tournaments'),
            icon: Trophy,
            gradient: "from-blue-500 to-indigo-500"
          },
          {
            title: t('activities.sports.events.friendlyMatches'),
            icon: PlayCircle,
            gradient: "from-green-500 to-emerald-500"
          },
          {
            title: t('activities.sports.events.corporateCompetitions'),
            icon: Users,
            gradient: "from-purple-500 to-violet-500"
          }
        ];

        // Сохраняем данные в состояние
        // В реальном приложении здесь был бы setState
        
      } catch (error) {
        console.error('Error fetching sports data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsData();
  }, [i18n.language, t]);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">{t('activities.sports.hero.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('activities.sports.hero.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Бейдж */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 group"
            >
              <Trophy className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                {t('activities.sports.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('activities.sports.hero.title')}{" "}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {t('activities.sports.hero.titleHighlight')}
              </span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('activities.sports.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* О спортивной деятельности */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {t('activities.sports.about.title')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t('activities.sports.about.title')} —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {t('activities.sports.hero.titleHighlight')}
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  {t('activities.sports.about.description1')}
                </p>
                
                <p>
                  {t('activities.sports.about.description2')}
                </p>
              </div>
              
              {/* Ключевые показатели */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Trophy, text: t('activities.sports.kpi.professional'), gradient: 'from-blue-500 to-blue-600' },
                  { icon: Users, text: t('activities.sports.kpi.community'), gradient: 'from-green-500 to-green-600' },
                  { icon: Heart, text: t('activities.sports.kpi.health'), gradient: 'from-red-500 to-red-600' },
                  { icon: Activity, text: t('activities.sports.kpi.events'), gradient: 'from-purple-500 to-purple-600' }
                ].map((kpi, index) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.gradient}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{kpi.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Изображения/Иконки */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Trophy, gradient: 'from-blue-100 to-blue-200', color: 'text-blue-600' },
                  { icon: Users, gradient: 'from-green-100 to-green-200', color: 'text-green-600' },
                  { icon: Target, gradient: 'from-purple-100 to-purple-200', color: 'text-purple-600' },
                  { icon: Heart, gradient: 'from-rose-100 to-rose-200', color: 'text-rose-600' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${item.gradient} rounded-2xl aspect-square flex items-center justify-center group hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className={`w-16 h-16 ${item.color}`} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Профессиональный спорт: ФК "Дордой" */}
      <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">
                {t('activities.sports.professional.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('activities.sports.professional.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('activities.sports.professional.description1')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Текстовая часть */}
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('activities.sports.professional.description2')}
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://fc-dordoi.kg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                >
                  <span>{t('activities.sports.professional.clubWebsite')}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Достижения */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8" />
                <h4 className="text-2xl font-bold">{t('activities.sports.professional.achievements')}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">12+</div>
                  <div className="text-sm">{t('activities.sports.professional.championshipTitles')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">8+</div>
                  <div className="text-sm">{t('activities.sports.professional.countryCups')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Роль ФК "Дордой" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {t('activities.sports.fcRole.title')}
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('activities.sports.fcRole.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: t('activities.sports.fcRoles.development'),
                  icon: Trophy,
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  title: t('activities.sports.fcRoles.youthSupport'),
                  icon: Users,
                  gradient: "from-green-500 to-green-600"
                },
                {
                  title: t('activities.sports.fcRoles.sportsCulture'),
                  icon: Medal,
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  title: t('activities.sports.fcRoles.communityEngagement'),
                  icon: Heart,
                  gradient: "from-red-500 to-red-600"
                }
              ].map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${role.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {role.title}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Спортивные мероприятия */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
              <span className="text-green-600 text-sm font-semibold">
                {t('activities.sports.events.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('activities.sports.events.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('activities.sports.events.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('activities.sports.events.festivals'),
                icon: Award,
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                title: t('activities.sports.events.tournaments'),
                icon: Trophy,
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                title: t('activities.sports.events.friendlyMatches'),
                icon: PlayCircle,
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: t('activities.sports.events.corporateCompetitions'),
                icon: Users,
                gradient: "from-purple-500 to-violet-500"
              }
            ].map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-green-300/50"
                >
                  <div className="relative p-8">
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex-1"></div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-green-600 transition-colors duration-300">
                          {t('activities.sports.learnMore')}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                          <ChevronRight className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ценности спортивного направления */}
      <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-50 border border-rose-200 mb-6">
              <span className="text-rose-600 text-sm font-semibold">
                {t('activities.sports.values.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('activities.sports.values.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: t('activities.sports.values.healthyLifestyle'),
                icon: Heart,
                gradient: "from-rose-500 to-pink-500"
              },
              {
                title: t('activities.sports.values.teamSpirit'),
                icon: Users,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: t('activities.sports.values.discipline'),
                icon: Shield,
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: t('activities.sports.values.willToWin'),
                icon: TrendingUp,
                gradient: "from-amber-500 to-orange-500"
              },
              {
                title: t('activities.sports.values.sportsSupport'),
                icon: Activity,
                gradient: "from-purple-500 to-violet-500"
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group text-center bg-white rounded-2xl p-6 border border-slate-200 hover:border-rose-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {value.title}
                  </h4>
                </motion.div>
              );
            })}
          </div>

          
        </div>
      </section>
    </div>
  );
};

export default ActivitiesSports;