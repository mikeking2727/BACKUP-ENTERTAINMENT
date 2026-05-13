import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Video, 
  MessageCircle, 
  ChevronRight, 
  ArrowUpRight, 
  Layout, 
  Search, 
  ArrowUp,
  Instagram,
  Clock,
  Zap,
  BarChart3,
  Target,
  Mail,
  Smartphone
} from 'lucide-react';

// --- Components ---

const Logo = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const isSm = size === "sm";
  return (
    <div className="flex items-center group select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <img 
        src="/logo.png" 
        alt="BACKUP ENT" 
        className={`${isSm ? 'h-8' : 'h-12'} w-auto object-contain h-auto`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          (e.currentTarget.parentElement?.querySelector('.fallback-text') as HTMLElement).style.display = 'block';
        }}
      />
      <div className="fallback-text hidden font-display font-bold text-xl tracking-tighter uppercase whitespace-nowrap">
        BACKUP <span className="font-light opacity-50">ENT</span>
      </div>
    </div>
  );
};

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const KakaoIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.27 6.111l-.841 3.062c-.05.183.159.336.311.233l3.599-2.387c.218.016.442.026.661.026 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent'
      }`}
    >
      <Logo />
      
      <div className="hidden md:flex items-center gap-10">
        {['About', 'Business', 'Global'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link whitespace-nowrap">{item}</a>
        ))}
        <button className="px-6 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
          CONTACT
        </button>
      </div>
    </motion.nav>
  );
};

const AnimatedText = () => {
  const words = ['CREATOR', 'CONTENT', 'COMMERCE', 'GLOBAL'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative inline-grid text-center place-items-center">
      {/* Invisible placeholder for layout stability - using longest word's approximate width */}
      <span className="invisible pointer-events-none col-start-1 row-start-1 h-0 select-none">COMMERCE</span> 
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 text-brand-primary font-display font-black whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: React.ReactNode, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="bento-card group h-full"
    >
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
        <Icon size={24} className="transition-transform group-hover:rotate-12" />
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
      
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-all">
        <ArrowUpRight size={20} className="text-brand-primary" />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 -left-20 w-[40vw] h-[40vw] bg-brand-primary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
          className="absolute bottom-1/4 -right-20 w-[30vw] h-[30vw] bg-brand-secondary/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs tracking-widest text-white/60 mb-8 backdrop-blur-sm"
        >
          BACKUP ENT
        </motion.div>
        
        <h1 className="text-[16vw] sm:text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-12 flex flex-col items-center px-1 sm:px-4 w-full">
          <span className="text-white mb-1 sm:mb-4">GROWING WITH</span>
          <div className="flex items-center justify-center gap-0.5 sm:gap-4 text-white w-full">
            <span className="text-brand-primary opacity-30 text-[0.8em] flex-shrink-0">[</span>
            <div className="flex justify-center overflow-visible">
              <AnimatedText />
            </div>
            <span className="text-brand-primary opacity-30 text-[0.8em] flex-shrink-0">]</span>
          </div>
        </h1>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {['CREATOR', 'CONTENT', 'COMMERCE', 'GLOBAL'].map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-[10px] md:text-xs tracking-[0.3em] font-bold text-white/20 uppercase"
            >
              {item} {i < 3 && "·"}
            </motion.span>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12"
        >
          크리에이터와 함께 성장하는 글로벌 MCN 기업<br/>
          <span className="text-sm opacity-60">TikTok LIVE 기반의 콘텐츠 · 광고 · 커머스를 연결하는<br className="block sm:hidden" /> 통합형 크리에이터 비즈니스 플랫폼</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://open.kakao.com/o/sXNNb0zh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            크리에이터 지원하기
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a 
            href="https://open.kakao.com/o/sXNNb0zh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
          >
            비즈니스 문의하기
          </a>
        </motion.div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-white mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">ABOUT US</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
              새로운 크리에이터<br />
              <span className="text-white/40 font-light">생태계를 구축합니다</span>
            </h2>
            <div className="space-y-8 text-lg text-white/60 font-light leading-relaxed">
              <p>
                BACKUP ENT는<br className="block sm:hidden" />
                글로벌 숏폼 플랫폼 기반으로 크리에이터를<br className="block sm:hidden" />
                발굴하고 육성하며 수익화까지 연결하는<br className="block sm:hidden" />
                MCN 기업입니다.
              </p>
              <p>
                TikTok LIVE 중심의 라이브 방송, 콘텐츠,<br className="block sm:hidden" />
                광고, 커머스를 결합한 통합형 비즈니스<br className="block sm:hidden" />
                모델을 운영합니다.
              </p>
              <p>
                Xiaohongshu MCN 공식 파트너로<br className="block sm:hidden" />
                크리에이터분들의 중국 플랫폼 진출 및<br className="block sm:hidden" />
                브랜딩 확장을 지원합니다.
              </p>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-3xl border border-white/10 overflow-hidden relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Video size={80} className="text-white/20 group-hover:text-brand-primary/50 transition-colors duration-700" />
              </div>
              {/* Mock UI Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
                  <div>
                    <div className="w-24 h-2 bg-white/20 rounded mb-1.5" />
                    <div className="w-16 h-2 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Stat Floating */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -left-10 glass-card p-6 min-w-[200px]"
            >
              <div className="text-brand-primary text-3xl font-display font-bold mb-1">1M+</div>
              <div className="text-xs text-white/50 tracking-widest">ACTIVE FOLLOWERS</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Business = () => {
  const businesses = [
    {
      icon: TrendingUp,
      title: "TikTok LIVE 수익화",
      desc: <>라이브 방송 운영 지원, 시청자 후원 수익<br className="block sm:hidden" />극대화 및 맞춤형 전략 교육을 제공합니다.</>
    },
    {
      icon: Users,
      title: "크리에이터 매니지먼트",
      desc: "전문적인 발굴 시스템과 육성 컨설팅을 통해 지속 가능한 수익 구조를 설계합니다."
    },
    {
      icon: Layout,
      title: "콘텐츠 & 성장 전략",
      desc: <>숏폼 콘텐츠 기획부터 제작, 계정 성장<br className="block sm:hidden" />전략까지 멀티 플랫폼 확장을 지원합니다.</>
    },
    {
      icon: Smartphone,
      title: "라이브 커머스",
      desc: <>글로벌 상품 판매 연계 및<br className="block sm:hidden" /> 판매 성과 중심의<br className="block sm:hidden" /> 콘텐츠 제작 시스템을 운영합니다.</>
    },
    {
      icon: Target,
      title: "샤오홍슈 광고 & 마케팅",
      desc: <>SNS 바이럴,<br className="block sm:hidden" /> 숏폼/라이브 연계 광고를 통해<br className="block sm:hidden" /> 브랜드 가치를 극대화합니다.</>
    }
  ];

  return (
    <section id="business" className="py-32 bg-white/[0.02]">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">OUR BUSINESS</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              5가지 핵심 사업으로<br />크리에이터 생태계를 구축합니다
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full bg-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz, idx) => (
            <FeatureCard key={biz.title} {...biz} index={idx} />
          ))}
          {/* Join Us Card */}
          <motion.a 
            href="https://open.kakao.com/o/sXNNb0zh"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 bg-brand-primary flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-4">지금 당신의 가능성을<br />성장시키세요</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[200px]">
                BACKUP ENT와 함께할 역동적인 크리에이터를 찾습니다.
              </p>
            </div>
            <div className="flex items-center gap-2 font-bold relative z-10 mt-10">
              APPLY NOW <ArrowUpRight size={20} />
            </div>
            
            {/* Background Decorative */}
            <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Zap size={120} strokeWidth={1} />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const OperationFeatures = () => {
  const features = [
    { label: "01", title: "라이브 방송 중심 수익화", desc: "실시간 참여 기반 수익 모델 운영" },
    { label: "02", title: "데이터 기반 성장 관리", desc: "콘텐츠 성과 분석 및 성장 전략 제공" },
    { label: "03", title: "팬 기반 참여 시스템", desc: "팬 커뮤니티 및 후원 구조 구축" },
    { label: "04", title: "체계적인 교육 시스템", desc: "초보 크리에이터도 수익화 가능한 시스템" },
  ];

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-20 uppercase tracking-widest opacity-80">
          Data & System Driven Growth
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {features.map((f, i) => (
            <motion.div 
              key={f.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-brand-primary font-display font-black text-6xl opacity-10 absolute -top-10 -left-4">{f.label}</div>
              <h3 className="text-lg font-bold mb-3 relative z-10">{f.title}</h3>
              <p className="text-white/40 text-sm">{f.desc}</p>
              <div className="mt-6 w-full h-[1px] bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobalSection = () => {
  return (
    <section id="global" className="py-32 relative overflow-hidden bg-[#070707]">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 opacity-20"
              >
                <div className="w-full h-full border border-dashed border-white rounded-full flex items-center justify-center">
                   <Globe size={300} strokeWidth={0.5} />
                </div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-brand-primary rounded-full blur-[40px] animate-pulse" />
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-black"
                >
                  ASIA
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-brand-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">GLOBAL STRATEGY</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
              중국 시장을 시작으로<br className="block sm:hidden" />아시아 전역으로<br className="block sm:hidden" />확장합니다
            </h2>
            
            <div className="space-y-12">
              {[
                { title: "크리에이터 확보 및 육성", desc: <>글로벌 크리에이터 모집 및 맞춤형<br className="block sm:hidden" /> 콘텐츠 전략 운영</> },
                { title: "콘텐츠 성장 전략", desc: <>숏폼 중심 계정 성장 및 초기 계정<br className="block sm:hidden" /> 집중 육성 시스템</> },
                { title: "수익화 구조 구축", desc: <>브랜드 광고, 라이브 커머스,<br className="block sm:hidden" /> 콘텐츠 마케팅 연계</> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center text-brand-secondary text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <div className="text-white/40 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Ecosystem = () => {
  const steps = [
    { label: "CREATOR", icon: Users },
    { label: "CONTENT", icon: Video },
    { label: "ADVERTISEMENT", icon: BarChart3 },
    { label: "COMMERCE", icon: Smartphone }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Creator Business Ecosystem</h2>
        <p className="max-w-2xl mx-auto text-white/50 mb-20 font-light px-4">
          콘텐츠 제작에서 끝나지 않고 광고와<br className="block sm:hidden" /> 커머스까지 연결하여 지속 가능한<br className="block sm:hidden" /> 크리에이터 비즈니스를<br className="block sm:hidden" /> 구축합니다.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-12">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="w-full md:w-auto"
              >
                <div className="glass-card p-10 min-w-[180px] hover:border-brand-primary/50 transition-colors group cursor-default">
                  <step.icon size={40} className="mx-auto mb-6 opacity-30 group-hover:opacity-100 group-hover:text-brand-primary transition-all" />
                  <div className="text-sm font-bold tracking-widest">{step.label}</div>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="rotate-90 md:rotate-0">
                  <motion.div 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="opacity-20 hidden md:block" />
                    <ChevronRight className="opacity-20 md:hidden" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-32 bg-brand-primary">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              함께 성장할<br className="block sm:hidden" />크리에이터와<br className="block sm:hidden" />파트너를<br className="block sm:hidden" />기다립니다
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:rnwlsdn77@naver.com" className="flex items-center gap-3 bg-black/10 hover:bg-black/20 p-4 rounded-2xl transition-all min-w-[200px]">
                <Mail size={20} />
                <span className="font-medium">rnwlsdn77@naver.com</span>
              </a>
              <a 
                href="https://open.kakao.com/o/sXNNb0zh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-black/10 hover:bg-black/20 p-4 rounded-2xl transition-all min-w-[200px]"
              >
                <KakaoIcon size={20} />
                <span className="font-medium">카카오톡 채널 상담</span>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            {['크리에이터 지원', '광고/브랜드 문의', '파트너십 제안'].map((text) => (
              <a 
                key={text}
                href="https://open.kakao.com/o/sXNNb0zh"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-8 px-10 bg-black text-white rounded-3xl font-bold flex items-center justify-between hover:scale-[1.02] transition-transform active:scale-95"
              >
                <span className="text-2xl">{text}</span>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                  <ArrowUpRight size={24} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="sm" />
            </div>
            <p className="max-w-md text-white/40 text-sm leading-relaxed mb-8">
              글로벌 숏폼 플랫폼 기반으로 크리에이터를 발굴하고<br className="block md:hidden" />
              육성하며 지속 가능한 수익 모델을 설계하는<br className="block md:hidden" />
              통합형 크리에이터 비즈니스 플랫폼입니다.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/backup_ent?igsh=MW1qNzEzbXNuNjR0cg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@bu77000?_r=1&_t=ZS-96JgSIJiwhp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-all"
              >
                <TikTokIcon size={18} />
              </a>
              <a 
                href="https://open.kakao.com/o/sXNNb0zh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-all"
              >
                <KakaoIcon size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Sitemap</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#business" className="hover:text-white transition-colors">Business</a></li>
              <li><a href="#global" className="hover:text-white transition-colors">Global</a></li>
            </ul>
          </div>

          <div className="relative lg:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">BACKUP ENTERTAINMENT</h4>
            <div className="text-xs text-white/40 leading-relaxed space-y-1.5">
              <p>대표 ㅣ 김훈</p>
              <p>연락처 ㅣ 010-9821-2161</p>
              <p>이메일 ㅣ rnwlsdn77@naver.com</p>
              <p>사업자 등록번호 ㅣ 365-11-02798</p>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="absolute bottom-0 right-0 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-all"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/20 uppercase tracking-widest font-medium">
          <div>© 2026 BACKUP ENT. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased selection:bg-brand-primary selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Business />
        <OperationFeatures />

        {/* SECTION 05: Organization */}
        <section className="py-32 bg-white/[0.01]">
          <div className="container mx-auto px-8">
            <div className="text-center mb-20">
              <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">OUR ORGANIZATION</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">전문화된 팀 구조로<br className="block sm:hidden" />크리에이터 성장을<br className="block sm:hidden" />지원합니다</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { role: "운영팀", title: "크리에이터 관리 및 교육" },
                { role: "리크루팅팀", title: "크리에이터 영입 및 파트너십 구축" },
                { role: "콘텐츠팀", title: "콘텐츠 기획 및 방송 운영 지원" },
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="glass-card p-10 text-center group"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary transition-colors duration-500">
                    <Users size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{member.role}</h4>
                  <p className="text-white/40 text-sm">{member.title}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-12 text-white/30 text-sm italic font-light">
              크리에이터 확장에 따라 조직은 지속적으로<br className="block sm:hidden" /> 확대되고 있습니다.
            </p>
          </div>
        </section>

        <GlobalSection />

        {/* SECTION 07: WHY BACKUP */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-display font-bold mb-16 text-center">WHY BACKUP?</h2>
              <div className="space-y-4">
                {[
                  <>검증된 TikTok LIVE<br className="block sm:hidden" /> 수익화 모델</>,
                  <>다양한 크리에이터<br className="block sm:hidden" /> 운영 경험</>,
                  <>샤오홍슈 및 Felicity<br className="block sm:hidden" /> 파트너십 기반<br className="block sm:hidden" /> 글로벌 노하우</>,
                  <>체계적인 교육 시스템과<br className="block sm:hidden" /> 성장 구조</>,
                  <>콘텐츠 · 광고 · 커머스<br className="block sm:hidden" /> 통합 수익 모델</>
                ].map((point, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-colors"
                  >
                    <div className="text-brand-primary font-display font-bold text-2xl">0{i + 1}</div>
                    <div className="text-xl font-medium">{point}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Ecosystem />
        <Contact />
      </main>

      <Footer />

      {/* Persistent Floating Elements */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4"
          >
            <a 
              href="https://open.kakao.com/o/sXNNb0zh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
            >
              <KakaoIcon size={24} />
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-black/50 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            >
              <ArrowUp size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
