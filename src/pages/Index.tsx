import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Bot,
  Users,
  Lightbulb,
  TrendingUp,
  Code,
  Heart,
  MessageCircle,
  Github,
  FileText,
  ChevronRight,
  RefreshCw,
  Globe,
  Target,
  Sparkles,
  Shield,
  ExternalLink,
  CheckCircle,
  Diamond,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              EVIA{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ecosystem
              </span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#projects"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Проекты
            </a>
            <a
              href="#principles"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Принципы
            </a>
            <a
              href="#team"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Команда
            </a>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-6"
            >
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Присоединиться
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-700"
          >
            <nav className="py-4 space-y-2">
              <a
                href="#projects"
                className="block py-2 text-gray-300 hover:text-blue-400"
              >
                Проекты
              </a>
              <a
                href="#principles"
                className="block py-2 text-gray-300 hover:text-blue-400"
              >
                Принципы
              </a>
              <a
                href="#team"
                className="block py-2 text-gray-300 hover:text-blue-400"
              >
                Команда
              </a>
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-blue-400 font-medium"
              >
                Присоединиться
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center">
      <div className="container mx-auto px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-6 py-2 text-lg mb-8">
              🌱 Экосистема будущего
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight"
          >
            EVIA
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-200 mb-12 leading-relaxed"
          >
            Экосистема проектов для запуска и масштабирования импакт-инициатив
            на стыке{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              технологий
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              предпринимательства
            </span>{" "}
            и{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              личной эволюции
            </span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold border-0 shadow-xl"
            >
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Присоединиться к экосистеме
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-10 py-4 text-lg font-semibold"
            >
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Узнать больше о проектах
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              "#Импакт-предпринимательство",
              "#Web3",
              "#БирюзовыеПрактики",
              "#Инновации",
              "#СпиральнаяДинамика",
              "#ИнновационноеМышление",
            ].map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-gray-400 border-gray-600 hover:border-blue-500 hover:text-blue-400 px-4 py-2 text-sm transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "EVIA Studio",
      subtitle: "Студия поддержки микробизнеса",
      description:
        "Студия поддержки микробизнеса и креативных команд, которые запускают авторские продукты. AI-маркетинг, автоматизация продаж, MVP-воронки.",
      mission: "Ускорение выхода на рынок для креативных предпринимателей",
      partners: [
        {
          role: "Инвестор",
          description:
            "💸 Инвестиции от 500 т.р. за долю 15–30% в EVIA Studio — проект поддержки авторских и креативных проектов.",
          level: "",
        },
      ],
      url: "evia-plum.vercel.app",
      icon: <Zap className="h-8 w-8 text-pink-400" />,
      gradient: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
    },
    {
      title: "EVIA.AI",
      subtitle: "Модульная AI-платформа",
      description:
        "Модульная AI-платформа для автоматизации бизнес-функций в МСБ. Кастомные агенты (GPT+LangChain), база знаний, AI-аналитика.",
      mission: "Демократизация AI-технологий для малого бизнеса",
      partners: [
        {
          role: "PR-стратег / Коммуникатор",
          description: "Медиа-стратегии, партнёрства, брендинг",
          level: "Senior+",
        },
        {
          role: "Инвестор-партнер",
          description:
            "💸 От 1 млн. ₽ за долю 15–50% в AI-инфраструктуре для малого бизнеса.",
          level: "",
        },
      ],
      url: "https://neon-den5-q4vp.vercel.app/",
      icon: <Bot className="h-8 w-8 text-blue-400" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "EVIA Club",
      subtitle: "Синдицирование проектов",
      description:
        "Синдицирование проектов от $100/мес. Поиск, проверка и поддержка команд на стадии идеи и MVP.",
      mission: "Создание экосистемы взаимной поддержки предпринимателей",
      partners: [
        {
          role: "Импакт-инвестор",
          description:
            "Со-архитекто модели инвестирования, управление сделками",
          level: "Expert",
        },
        {
          role: "Микро-инвесторы / Члены клуба",
          description: "💵 Участие в проверенных проектах от $100 в месяц.",
          level: "",
        },
      ],
      icon: <Users className="h-8 w-8 text-green-400" />,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      title: "EVIA DAO",
      subtitle: "Децентрализованное сообщество",
      description:
        "Исследовательско-образовательное пространство и децентрализованное сообщество. Образование, этика, исследование, co-creation.",
      mission: "Место для осознанных лидеров, меняющих мир",
      partners: [
        {
          role: "Архитектор DAO",
          description: "Построение системы управления, культуры",
          level: "Expert",
        },
        {
          role: "Советник по стратегии DAO(мыслитель, социолог)",
          description: "🧭 Культурная и этическая направленность DAO.",
          level: "Expert",
        },
        {
          role: "Импакт-инвестор",
          description:
            "💰 Настройка фонда DAO и системы распределения капиталов.",
          level: "",
        },
        {
          role: "Комьюнити-лидер",
          description: "🌱 Контент-стратегия, развитие сообщества, фасилитация",
          level: "Senior",
        },
      ],
      url: "eviaai.ru",
      icon: <Lightbulb className="h-8 w-8 text-orange-400" />,
      gradient: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Направления и партнёрства
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-4">
            Четыре взаимосвязанных проекта, где ищем исключительные таланты для
            создания будущего
          </p>
          <p className="text-lg text-blue-400 font-semibold">
            Присоединяйтесь к команде мирового уровня
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`h-full bg-gray-900/50 backdrop-blur-sm border ${project.borderColor} hover:border-opacity-80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} border ${project.borderColor} flex items-center justify-center`}
                    >
                      {project.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-white">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-gray-400 font-medium">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                    <p className="text-sm font-medium text-blue-400 mb-2">
                      &nbsp;Миссия проекта:
                    </p>
                    <p className="text-sm text-gray-300">{project.mission}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-semibold text-green-400">
                        Открытые позиции для талантов:
                      </p>
                    </div>
                    <div className="space-y-3">
                      {project.partners.map((partner, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800/30 p-3 rounded-lg border border-gray-700/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-white">
                              {partner.role}
                            </h4>
                            {partner.level && (
                              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                {partner.level}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">
                            {partner.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔗 Перейти к проекту: {project.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}

                  <div className="pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 text-sm"
                    >
                      <a
                        href="https://t.me/igorgorbulev"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Обсудить участие
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PrinciplesSection = () => {
  const principles = [
    {
      title: "Бирюзовые практики",
      description: "Самоуправление, эволюционное предназначение, целостность",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      cardBg: "from-blue-500/20 to-indigo-500/30",
      borderColor: "border-blue-300/50",
    },
    {
      title: "Спиральная динамика",
      description: "Эволюция уровней сознания и интеграция ценностей",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
      cardBg: "from-blue-400/20 to-cyan-400/30",
      borderColor: "border-blue-300/50",
    },
    {
      title: "Web3 & DAO",
      description:
        "Прозрачность, доверие, децентрализация к��к основа новой экономики",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-teal-50 to-emerald-100",
      cardBg: "from-teal-400/20 to-emerald-400/30",
      borderColor: "border-teal-300/50",
    },
    {
      title: "Импакт-предпринимательство",
      description: "Технологии ради значимых изменений в мире",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-red-50 to-pink-100",
      cardBg: "from-red-400/20 to-pink-400/30",
      borderColor: "border-red-300/50",
    },
    {
      title: "Инновационное мышление",
      description:
        "Нестандартные идеи и оригинальные решения. Гибкость и Открытость новому",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-100",
      cardBg: "from-yellow-400/20 to-orange-400/30",
      borderColor: "border-yellow-300/50",
    },
    {
      title: "Эволюция через со-творчество",
      description:
        "Коллективное развитие и творческое мышление. Создаём не продукты, а эволюционные среды",
      icon: <Diamond className="h-8 w-8 text-emerald-500" />,
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
      cardBg: "from-purple-400/20 to-pink-400/30",
      borderColor: "border-purple-300/50",
    },
  ];

  return (
    <section id="principles" className="py-20 bg-slate-900">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Принципы
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Философия, которая лежит в основе всех наших проектов
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* First row - 3 cards */}
            {principles.slice(0, 3).map((principle, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`h-full ${principle.bgColor} backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${principle.cardBg} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {principle.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - 3 cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          >
            {principles.slice(3, 6).map((principle, index) => (
              <motion.div key={index + 3} variants={fadeInUp}>
                <Card
                  className={`h-full ${principle.bgColor} backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${principle.cardBg} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {principle.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Игорь Горбулев",
      role: "CEO & Founder",
      bio: "13+ лет в бизнесе, 2 реализованных проекта, успешный exit (Energiatrend.ru). Оборот 300+ млн ₽",
      initials: "ИГ",
      telegramLink: "https://t.me/freesion_1",
    },
    {
      name: "Дмитрий Филатов",
      role: "Ментор • Технологический стратег",
      bio: "Основатель Topface, Playneta, Cryptobots. 150+ млн пользователей",
      initials: "ДФ",
      telegramLink: "https://t.me/fil100",
    },
  ];

  return (
    <section
      id="team"
      className="py-20"
      style={{
        background:
          "linear-gradient(135deg, #2D1B69 0%, #8B5CF6 50%, #2D1B69 100%)",
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Команда
          </h2>
          <p className="text-lg text-gray-300">
            Опытные предприниматели и продуктологи, создающие будущее вместе
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <div
                className="rounded-xl hover:scale-[1.02] transition-all duration-300 p-8 text-center"
                style={{ backgroundColor: "rgba(17, 16, 43, 0.95)" }}
              >
                {/* Avatar with gradient */}
                <div className="w-[120px] h-[120px] mx-auto mb-6">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #a84be4 0%, #4b7ac6 50%, #3ddc84 100%)",
                    }}
                  >
                    <span
                      className="text-[22px] font-bold text-white"
                      style={{ fontFamily: "Inter" }}
                    >
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm font-medium text-blue-400 mb-4">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Telegram Link */}
                <div className="flex justify-center">
                  <a
                    href={member.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const InvestmentSection = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Инвестиционная возможность
          </h2>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  1 млн ₽
                </h3>
                <p className="text-gray-400 text-sm">Объём инвестиций</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2 text-white">EVIA.AI</h3>
                <p className="text-gray-400 text-sm">Основной фокус</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  SAFE/DAO
                </h3>
                <p className="text-gray-400 text-sm">Гибридный формат</p>
              </div>
            </div>

            <p className="text-lg mb-8 leading-relaxed text-gray-300">
              Ускорить рост платформы EVIA.AI, расширить студийные мощности и
              запустить первые синдикаты
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-300">Участие в росте</span>
              </div>
              <div className="flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-300">Ранний доступ</span>
              </div>
              <div className="flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-300">
                  Влияние на развитие
                </span>
              </div>
              <div className="flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-300">
                  Эксклюзивное комьюнити
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 px-8 py-3 text-lg font-semibold shadow-xl"
            >
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Обсудить инвестиции
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const roles = [
    "Со-архитекторы",
    "Визионеры",
    "Технари",
    "Фасилитаторы",
    "Менторы",
    "Инвесторы",
  ];

  return (
    <section
      id="join"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Присоединяйся к экосистеме будущего
            </h2>
          </div>

          <p className="text-xl text-gray-300 mb-12">
            Мы ищем со-архитекторов, визионеров, технарей, фасилитаторов,
            менторов и инвесторов
          </p>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {roles.map((role, index) => (
                <Badge
                  key={index}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:border-emerald-400 px-4 py-2 transition-colors"
                >
                  {role}
                </Badge>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-3 text-lg font-semibold border-0 shadow-xl"
            >
              <a
                href="https://t.me/igorgorbulev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Написать в Telegram: @igorgorbulev
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-8">
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            © EVIA 2025. Осознанные технологии для будущего.
          </p>

          <div className="flex justify-center space-x-6">
            <a
              href="https://t.me/igorgorbulev"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FileText className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <PrinciplesSection />
      <TeamSection />
      <InvestmentSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
