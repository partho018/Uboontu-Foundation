'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Megaphone, Building2, Workflow, Droplets, Recycle, CalendarCheck, ClipboardList,
  Leaf, Heart, ArrowRight, HandshakeIcon, Users, TrendingDown, Globe,
  CheckCircle, ChevronRight, Target, ShieldCheck, Eye, Landmark, Flame, Smile,
  HeartHandshake, Quote, ChevronLeft, Globe2, Home as HomeIcon, Compass, ShieldAlert,
  Check, X, Sparkle, Wheat, Settings, Sparkles, FileText, Activity, BarChart3
} from 'lucide-react';
import ImpactCounters from '@/components/ImpactCounters';

// Client Images for Scrolling Referrals
const client1 = '/Clint/68db83d7e2ef5cee4c7c64ad_Client_Sofia Gouveia_916.avif';
const client2 = '/Clint/68db86d8ef94ad655fb9fd01_Client_Austin_916.avif';
const client3 = '/Clint/68db8732b22da6b432112dce_Client_Moshiur Rahman Radif_916.avif';
const client4 = '/Clint/68e51a2880009d309ccf8a30_Client_Jahnobi_916.avif';
const client5 = '/Clint/68e64d2785cf3cb4d1e5bcc1_Client_Dilicio_916.avif';
const client6 = '/Clint/6972023ccec47fa8734cf934_Client_Armen Avagyan _916.avif';
const client7 = '/Clint/697c78b3798750901911bb75_Client_Anika _916.avif';
const client8 = '/Clint/69a044959b8bba79e7629219_Client_Tanmee _916.avif';

// ─── SDG Grouped Data ───────────────────────────────────────────────────────
// ─── SDG Grouped Data ───────────────────────────────────────────────────────
const sdgGroups = [
  {
    number: 1,
    theme: 'No Poverty',
    color: '#e5243b',
    image: '/14 GOALS/img-goal-1.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-01.jpg',
    desc: 'End poverty in all its forms everywhere.',
    targets: 7,
    events: 157,
    publications: 51,
    actions: 1580,
  },
  {
    number: 3,
    theme: 'Good Health and Well-being',
    color: '#4c9f38',
    image: '/14 GOALS/img-goal-3.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-03.jpg',
    desc: 'Ensure healthy lives and promote well-being for all at all ages.',
    targets: 13,
    events: 79,
    publications: 50,
    actions: 1375,
  },
  {
    number: 5,
    theme: 'Gender Equality',
    color: '#ff3a21',
    image: '/14 GOALS/img-goal-5.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-05.jpg',
    desc: 'Achieve gender equality and empower all women and girls.',
    targets: 9,
    events: 117,
    publications: 49,
    actions: 1867,
  },
  {
    number: 6,
    theme: 'Clean Water and Sanitation',
    color: '#26b3c4',
    image: '/14 GOALS/img-goal-6.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-06.jpg',
    desc: 'Ensure availability and sustainable management of water and sanitation for all.',
    targets: 8,
    events: 321,
    publications: 38,
    actions: 1931,
  },
  {
    number: 7,
    theme: 'Affordable and Clean Energy',
    color: '#f2bc1c',
    image: '/14 GOALS/img-goal-7.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-07.jpg',
    desc: 'Ensure access to affordable, reliable, sustainable and modern energy for all.',
    targets: 5,
    events: 103,
    publications: 49,
    actions: 1103,
  },
  {
    number: 8,
    theme: 'Decent Work and Economic Growth',
    color: '#a21942',
    image: '/14 GOALS/img-goal-8.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-08.jpg',
    desc: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.',
    targets: 12,
    events: 142,
    publications: 51,
    actions: 2152,
  },
  {
    number: 9,
    theme: 'Industry, Innovation and Infrastructure',
    color: '#fd6925',
    image: '/14 GOALS/img-goal-9.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-09.jpg',
    desc: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.',
    targets: 8,
    events: 145,
    publications: 19,
    actions: 1183,
  },
  {
    number: 10,
    theme: 'Reduced Inequalities',
    color: '#dd1367',
    image: '/14 GOALS/img-goal-10.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-10.jpg',
    desc: 'Reduce inequality within and among countries.',
    targets: 10,
    events: 111,
    publications: 15,
    actions: 1092,
  },
  {
    number: 11,
    theme: 'Sustainable Cities and Communities',
    color: '#fd9d24',
    image: '/14 GOALS/img-goal-11.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-11.jpg',
    desc: 'Make cities and human settlements inclusive, safe, resilient and sustainable.',
    targets: 10,
    events: 156,
    publications: 25,
    actions: 1343,
  },
  {
    number: 12,
    theme: 'Responsible Consumption and Production',
    color: '#bf8d2c',
    image: '/14 GOALS/img-goal-12.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-12.jpg',
    desc: 'Ensure sustainable consumption and production patterns.',
    targets: 11,
    events: 68,
    publications: 19,
    actions: 1869,
  },
  {
    number: 13,
    theme: 'Climate Action',
    color: '#3f7e44',
    image: '/14 GOALS/img-goal-13.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-13.jpg',
    desc: 'Take urgent action to combat climate change and its impacts.',
    targets: 5,
    events: 93,
    publications: 40,
    actions: 2455,
  },
  {
    number: 14,
    theme: 'Life Below Water',
    color: '#0a97d9',
    image: '/14 GOALS/img-goal-14.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-14.jpg',
    desc: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.',
    targets: 10,
    events: 150,
    publications: 44,
    actions: 3379,
  },
  {
    number: 15,
    theme: 'Life on Land',
    color: '#56c02b',
    image: '/14 GOALS/img-goal-15.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-15.jpg',
    desc: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.',
    targets: 12,
    events: 62,
    publications: 35,
    actions: 1440,
  },
  {
    number: 17,
    theme: 'Partnerships for the Goals',
    color: '#19486a',
    image: '/14 GOALS/img-goal-17.jpg',
    iconImage: '/14 GOALS/E_SDG_Icons-17.jpg',
    desc: 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.',
    targets: 19,
    events: 392,
    publications: 85,
    actions: 2439,
  },
];

// ─── Featured Projects ───────────────────────────────────────────────────────
const projects = [
  {
    id: 'zerowaste',
    title: 'ZeroWaste Mission',
    tag: 'Circular Economy',
    icon: Globe2,
    color: '#3BB852',
    bg: '#EBF7EE',
    desc: 'Transforming corporate and municipal campuses into zero-waste ecosystems through scientific audit and circular processing.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'community',
    title: 'Community Development',
    tag: 'Social Upliftment',
    icon: HomeIcon,
    color: '#0d9488',
    bg: '#E0F7F4',
    desc: 'Empowering local neighborhoods and waste-pickers through capacity building, fair livelihoods, and dignity of labor.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tourism',
    title: 'Responsible Tourism',
    tag: 'Biodiversity Protection',
    icon: Compass,
    color: '#d97706',
    bg: '#FCF5E8',
    desc: 'Implementing eco-friendly waste policies and restoration programs in ecologically sensitive tourist hotspots.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'villages',
    title: 'Zero Waste Villages',
    tag: 'Rural Development',
    icon: ShieldAlert,
    color: '#3b82f6',
    bg: '#E8F2FF',
    desc: 'Developing sustainable waste segregation and organic composting systems inside rural gram panchayats.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
  },
];

const renderHeroImage = (className = "") => (
  <div className={`hero-right ${className}`}>
    <div className="hero-collage-wrapper">
      {/* Liquid glowing background blobs */}
      <div className="liquid-blob blob-green" />
      <div className="liquid-blob blob-teal" />
      
      {/* Rotating Circular Text Stamp */}
      <div className="circular-stamp-container">
        <svg viewBox="0 0 100 100" className="rotating-text-stamp" width="120" height="120">
          <path id="textCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
          <text fontSize="7.5" fontWeight="800" letterSpacing="1.2">
            <textPath href="#textCirclePath" fill="var(--primary)">
              • UBOONTU FOUNDATION • CIRCULAR ECONOMY • ZERO WASTE
            </textPath>
          </text>
        </svg>
        <div className="stamp-center-icon">
          <Leaf size={24} className="text-primary animate-pulse" />
        </div>
      </div>

      {/* Main Organic Blob Card */}
      <div className="collage-card card-main organic-blob-1 animate-float">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80" 
          alt="Eco Sprout Growth" 
          className="collage-img"
        />
        <div className="blob-card-caption">
          <span className="blob-caption-tag">Eco-Restore</span>
        </div>
      </div>

      {/* Secondary Organic Blob Card */}
      <div className="collage-card card-sub organic-blob-2 animate-float-delayed">
        <img 
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80" 
          alt="Vibrant Green Leaves" 
          className="collage-img"
        />
      </div>

      {/* Floating Glassmorphic Badge 1 */}
      <div className="floating-collage-badge badge-top-right animate-float">
        <div className="badge-icon-circle">
          <Recycle size={16} />
        </div>
        <div className="badge-text-group">
          <span className="badge-val">10k+ Tons</span>
          <span className="badge-lbl">Waste Processed</span>
        </div>
      </div>

      {/* Floating Glassmorphic Badge 2 */}
      <div className="floating-collage-badge badge-bottom-left animate-float-delayed">
        <div className="badge-icon-circle bg-teal">
          <Users size={16} />
        </div>
        <div className="badge-text-group">
          <span className="badge-val">2.5k+ Lives</span>
          <span className="badge-lbl">Safai Sathis Empowered</span>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const getSrc = (img) => (img && img.src ? img.src : img);
  const [activeImpactTab, setActiveImpactTab] = useState('ongoing');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const openDonate  = () => window.dispatchEvent(new Event('open-donate'));
  const openPartner = () => window.dispatchEvent(new Event('open-partner'));

  // ── What We Do ────────────────────────────────────────────────────────────
  const whatWeDo = [
    { title: 'Awareness and Advocacy',             icon: Megaphone,     color: '#3BB852', bg: 'rgba(59, 184, 82,0.12)', desc: 'Empowering citizens with environmental knowledge and waste separation advocacy.' },
    { title: 'Capacity Building of ULBs & PRIs',   icon: Building2,     color: '#0d9488', bg: 'rgba(13,148,136,0.12)', desc: 'Training municipalities and rural bodies for sustainable policy implementations.' },
    { title: 'Setting Up End to End SWM',          icon: Workflow,      color: '#d97706', bg: 'rgba(217,119,6,0.12)',  desc: 'Deploying complete, sustainable waste collection and processing systems.' },
    { title: 'Wet Waste Management',               icon: Droplets,      color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', desc: 'Scientific composting and bio-methanation of organic and kitchen waste.' },
    { title: 'Dry Waste Management',               icon: Recycle,       color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', desc: 'Segregating and recycling non-biodegradable plastics, paper, and metal.' },
    { title: 'Zero Waste Events',                  icon: CalendarCheck, color: '#ec4899', bg: 'rgba(236,72,153,0.12)', desc: 'Planning and auditing eco-friendly gatherings with zero waste footprint.' },
    { title: 'Research and Documentations',        icon: ClipboardList, color: '#64748b', bg: 'rgba(100,116,139,0.12)', desc: 'Generating data, case studies, and policy papers for circular systems.' },
  ];

  // ── Workflow Steps ─────────────────────────────────────────────────────────
  const workflowSteps = [
    { step: '01', title: 'Smart Collection',       desc: 'Organised, segregated door-to-door waste collection across residential and commercial zones.' },
    { step: '02', title: 'Decentralised MRF',      desc: 'Materials sorted at our recovery facilities into 40+ categories by trained Safai Sathis.' },
    { step: '03', title: 'Scientific Processing',  desc: 'Wet waste becomes compost; dry recyclables become clean industrial raw materials.' },
    { step: '04', title: 'Circular Reintegration', desc: 'Raw materials returned to factories, landfills shut down, zero-pollution models scaled.' },
  ];

  // ── Impact Tabs ────────────────────────────────────────────────────────────
  const ongoingCards = [
    { icon: Eye,         color: '#3BB852', bg: 'rgba(59, 184, 82,0.1)',  title: 'Manbhar Swach Programs in three States',      sub: '3 Active States', desc: 'Empowering local communities with localized waste collection, garbage segregation, and scientific sanitation systems. We build decentralised compost units and train households on wet and dry waste segregation workflows.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' },
    { icon: Landmark,    color: '#0d9488', bg: 'rgba(13,148,136,0.1)',  title: 'Partnership with 8 Municipal Corporations',    sub: '8 Corporations', desc: 'Working hand-in-hand with city administrations and municipal corporations to scale urban waste collection pipelines, sorting centers, and eco-friendly processing units to achieve zero-landfill goals.', image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80' },
    { icon: Settings,    color: '#d97706', bg: 'rgba(217,119,6,0.1)',   title: 'Bulk Waste Generator Management',              sub: 'Fully Compliant', desc: 'Helping large residential societies, hotels, IT parks, and corporate offices manage commercial waste at source under strict environmental compliance, offering auditing, sorting, and organic composting.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80' },
    { icon: Leaf,        color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  title: '1st MRF setup inside National Parks',          sub: '1st Eco MRF', desc: 'Pioneering eco-friendly recovery facilities in protected wildlife reserves, sorting tourist waste, preventing forest littering, and protecting local wildlife from hazardous non-biodegradable materials.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80' },
    { icon: CheckCircle, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', title: 'Seven Active Projects',                        sub: '7 Live Initiatives', desc: 'Running live initiatives across various districts to promote zero waste practices, composting setups, training programs, and plastic cleanup drives with local government bodies.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' },
  ];

  const socialCards = [
    { icon: Recycle,      color: '#3BB852', bg: 'rgba(59, 184, 82,0.1)', title: 'Circular Economy Promotion',   sub: 'Verified outcomes • Annual review', desc: 'Upcycling waste into premium compost and secondary raw resources to support local green manufacturing, stimulate green entrepreneurship, and significantly reduce total industrial carbon footprints.', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80' },
    { icon: HeartHandshake,color:'#0d9488', bg: 'rgba(13,148,136,0.1)', title: 'Public Health Improvement',    sub: 'Verified outcomes • Annual review', desc: 'Minimizing vector diseases and air pollution through cleaner neighborhoods, open dumping control, scientific composting of wet waste, and systematic dry waste collection systems.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80' },
    { icon: Flame,        color: '#d97706', bg: 'rgba(217,119,6,0.1)',  title: 'Landfill Waste Reduction',     sub: 'Verified outcomes • Annual review', desc: 'Diverting thousands of metric tons of organic and non-biodegradable waste from municipal landfills daily, recycling them into high-value organic compost and reusable materials.', image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80' },
    { icon: Users,        color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Community Participation',      sub: 'Verified outcomes • Annual review', desc: 'Mobilizing thousands of local citizens, corporate volunteers, and school children through interactive workshops, neighborhood cleanup drives, and direct environmental advocacy.', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80' },
  ];

  const behavioralCards = [
    { icon: Megaphone, color: '#3BB852', bg: 'rgba(59, 184, 82,0.1)', title: 'Community Awareness & Participation',         sub: 'Community-first • On-ground teams', desc: 'Conducting door-to-door counseling, community street plays, and local workshops to build environmentally conscious neighborhoods that champion zero-waste habits.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80' },
    { icon: Recycle,   color: '#0d9488', bg: 'rgba(13,148,136,0.1)', title: 'Improved Waste segregation at source',        sub: 'Community-first • On-ground teams', desc: 'Helping residents separate wet, dry, and sanitary waste correctly at the point of origin to maximize resource recovery and ensure safe, dignified working conditions for sorting teams.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' },
    { icon: Landmark,  color: '#d97706', bg: 'rgba(217,119,6,0.1)', title: 'Educational Engagement at Facilities',        sub: 'Community-first • On-ground teams', desc: 'Opening our material recovery and composting facilities to schools, colleges, and corporate groups for live visits to study scientific circular waste workflows firsthand.', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80' },
    { icon: Smile,     color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Reduction in Single use plastic consumption', sub: 'Community-first • On-ground teams', desc: 'Encouraging citizens to replace single-use plastics with sustainable cloth and jute bags through community distribution drives and local merchant partnerships.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
  ];

  // ── Impact Tabs List ───────────────────────────────────────────────────────
  const impactTabs = [
    { id: 'ongoing', label: 'Ongoing Projects', desc: "Live initiatives we're currently running.", icon: Workflow, cards: ongoingCards },
    { id: 'social', label: 'Social Indicators', desc: 'Measurable results for a sustainable future.', icon: HeartHandshake, cards: socialCards, footer: 'Verified outcomes • Annual review' },
    { id: 'behavioral', label: 'Behavioral Change', desc: 'Shaping communities for long-term change.', icon: Sparkles, cards: behavioralCards, footer: 'Community-first • On-ground teams' },
  ];
  const activeImpactObj = impactTabs.find(t => t.id === activeImpactTab) || impactTabs[0];



  return (
    <main>
      {/* ═══════════════════════════════════ HERO ════════════════════════════ */}
      <section id="home" className="hero">
        {/* Background grid and blobs */}
        <div className="hero-grid-overlay" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        {/* Floating background decorative shapes */}
        <div className="hero-bg-shapes">
          <div className="shape shape-ring shape-ring-1" />
          <div className="shape shape-ring shape-ring-2" />
          <div className="shape shape-ring shape-ring-3" />
          
          <div className="shape shape-float shape-leaf-1">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4l.5.3V18c0-3.3 2.7-6 6-6s6 2.7 6 6v2.7l.5-.3c2.7-1.8 4.5-4.9 4.5-8.4 0-5.5-4.5-10-10-10z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="shape shape-float shape-recycle-1">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4.5 9.5 2 12h5l-2.5-2.5zM22 12h-5l2.5 2.5 2.5-2.5zM12 2v5l2.5-2.5L12 2z" />
              <path d="M4.5 12c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5S16.1 4.5 12 4.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="shape shape-float shape-sparkle-1">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 3v18M3 12h18M12 3l3 4.5L12 12l-3-4.5L12 3zm0 9l3 4.5-3 4.5-3-4.5 3-4.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="shape shape-float shape-sparkle-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 3v18M3 12h18M12 3l3 4.5L12 12l-3-4.5L12 3zm0 9l3 4.5-3 4.5-3-4.5 3-4.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="container">
          <div className="hero-grid">
            {/* Left */}
            <div className="hero-content scroll-reveal reveal-fade-right duration-slow">
              <div className="hero-eyebrow-wrapper">
                <span className="hero-eyebrow glass-pill">
                  <Sparkle size={13} className="eyebrow-icon animate-pulse" />
                  Social Impact &amp; Sustainability
                </span>
              </div>

              <h1 className="hero-title">
                Transforming Waste into <span className="text-gradient-glow">Opportunity</span>
              </h1>

              <p className="hero-subtitle">Building Cleaner Communities Through Sustainable Waste Management</p>

              <p className="hero-body">
                Uboontu Foundation is a pioneering social impact organization driving the transition to zero-waste communities. Through scientific circular economy frameworks, localized recovery systems, and community empowerment, we build resilient, green ecosystems that champion environmental health and human dignity.
              </p>

              {renderHeroImage("hero-image-mobile")}

              <div className="hero-ctas">
                <Link href="/contact" className="cta-primary">
                  Partner With Us <ArrowRight size={16} className="cta-arrow" />
                </Link>
                <a href="#projects" className="cta-secondary">
                  Our Projects
                </a>
                <Link href="/get-involved/donate" className="cta-outline">
                  Donate Now
                </Link>
              </div>
            </div>

            {/* Right — stats sphere & dashboard widget */}
            {renderHeroImage("hero-image-desktop")}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ WHAT WE DO ══════════════════════════════ */}
      <section id="what-we-do" className="section what-we-do-section">
        <div className="container">
          <div className="section-header scroll-reveal reveal-fade-up">
            <span className="badge">What We Do</span>
            <h2>Our Core Services</h2>
            <p>Comprehensive systems and methodologies that build sustainable, zero-waste ecosystems for a greener tomorrow.</p>
          </div>

          <div className="wwd-grid">
            {whatWeDo.map((item, i) => {
              const Icon = item.icon;
              const displayIndex = i + 1;
              return (
                <div key={i} className={`wwd-card card glass-panel scroll-reveal reveal-fade-up delay-${(i % 4 + 1) * 100}`} style={{ '--ac': item.color }}>
                  <div className="wwd-card-glow" />
                  <div className="wwd-icon-row">
                    <div className="wwd-icon" style={{ background: item.bg, color: item.color }}>
                      <Icon size={26} strokeWidth={1.75} />
                    </div>
                    <span className="wwd-number">{displayIndex < 10 ? `0${displayIndex}` : displayIndex}</span>
                  </div>
                  <div className="wwd-card-content">
                    <h3 className="wwd-title">{item.title}</h3>
                    <p className="wwd-desc">{item.desc}</p>
                  </div>
                  <div className="wwd-card-footer">
                    <span className="wwd-explore">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SDGs ════════════════════════════════════ */}
      <section id="sdgs" className="section sdg-section">
        {/* Decorative background blobs */}
        <div className="sdg-bg-blob sdg-blob-tl" />
        <div className="sdg-bg-blob sdg-blob-br" />

        <div className="container">
          {/* Section Header */}
          <div className="sdg-header-split">
            <div className="sdg-header-left scroll-reveal reveal-fade-up">
              <span className="badge badge-accent">SDG Alignment</span>
              <h2>Sustainable Development Goals</h2>
              <p className="sdg-header-desc">
                Achieving the Sustainable Development Goals requires urgent action to address climate change, biodiversity loss, and waste. 
                Uboontu offers a unique opportunity to drive meaningful, cross-cutting impact across diverse sectors and communities.
              </p>
            </div>
          </div>

          <div className="sdg-workspace">
            {/* 6-Column SDG Cards Grid */}
            <div className="sdg-list">
              {sdgGroups.map((group, i) => (
                <div 
                  key={i} 
                  className={`sdg-card-item scroll-reveal reveal-fade-up delay-${(i + 1) * 100}`} 
                  style={{ '--group-color': group.color }}
                >
                  <div className="sdg-card-image-wrap">
                    <div 
                      className="sdg-card-bg-image" 
                      style={{ backgroundImage: `url("${group.image}")` }} 
                    />
                    <div className="sdg-card-overlay" />
                  </div>
                  
                  <div className="sdg-card-icon-container">
                    <img 
                      src={group.iconImage} 
                      alt={group.theme} 
                      className="sdg-card-icon-img" 
                    />
                    <div className={`sdg-card-icon-mask ${i + 1 >= 10 ? 'double-digit' : 'single-digit'} ${[6, 8, 9].includes(i + 1) ? 'extra-cover' : ''} ${[10, 12].includes(i + 1) ? 'shift-left' : ''} ${i + 1 === 5 ? 'shift-right' : ''} ${i + 1 === 8 ? 'shift-right-8' : ''}`}>
                      {i + 1}
                    </div>
                  </div>

                  <div className="sdg-card-hover-overlay">
                    <div className="sdg-hover-number">{i + 1}</div>
                    <div className="sdg-hover-content">
                      <h3 className="sdg-hover-title">Goal {i + 1}</h3>
                      <p className="sdg-hover-desc">{group.desc}</p>
                      <div className="sdg-hover-divider" />
                      <div className="sdg-hover-stats">
                        <div className="sdg-stat-item">
                          <span className="sdg-stat-val">{group.targets}</span>
                          <span className="sdg-stat-lbl">Targets</span>
                        </div>
                        <div className="sdg-stat-item">
                          <span className="sdg-stat-val">{group.events}</span>
                          <span className="sdg-stat-lbl">Events</span>
                        </div>
                        <div className="sdg-stat-item">
                          <span className="sdg-stat-val">{group.publications}</span>
                          <span className="sdg-stat-lbl">Publications</span>
                        </div>
                        <div className="sdg-stat-item">
                          <span className="sdg-stat-val">{group.actions}</span>
                          <span className="sdg-stat-lbl">Actions</span>
                        </div>
                      </div>
                      <div className="sdg-hover-btn">More info</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ END-TO-END SOLUTIONS (Workflow) ════════════════════ */}
      <section className="section bg-alt workflow-section">
        <div className="container">
          <div className="section-header scroll-reveal reveal-fade-up">
            <span className="badge badge-secondary">Solutions Flow</span>
            <h2>Providing End-to-End Waste Management Solutions</h2>
            <p>How we bridge the gap between waste generation and secondary raw material manufacturing.</p>
          </div>

          <div className="workflow-row">
            {workflowSteps.map((step, i) => (
              <div key={i} className={`wf-step scroll-reveal reveal-fade-left delay-${(i + 1) * 150}`}>
                <div className="wf-num">{step.step}</div>
                <h3 className="wf-title">{step.title}</h3>
                <p className="wf-desc">{step.desc}</p>
                {i < workflowSteps.length - 1 && (
                  <div className="wf-arrow"><ChevronRight size={20} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ IMPACT OPERATIONS ═══════════════════════════ */}
      <section id="impact" className="section">
        <div className="container">
          <div className="section-header scroll-reveal reveal-fade-up">
            <span className="badge badge-primary">Impact till 2025–26</span>
            <h2>Providing End-to-End Waste Management Solutions</h2>
          </div>

          {/* Tab Navigation */}
          <div className="impact-tabs-nav scroll-reveal reveal-zoom-in delay-100">
            {impactTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeImpactTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`impact-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveImpactTab(tab.id)}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="impact-image-grid scroll-reveal reveal-fade-up delay-200">
            {activeImpactObj.cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="impact-tile-card glass-panel" style={{ '--ac': card.color, '--ib': card.bg }}>
                  <div className="impact-card-img-wrapper">
                    <img src={card.image} alt={card.title} className="impact-tile-img" />
                  </div>
                  <div className="impact-tile-content">
                    {card.sub && (
                      <span className="impact-tile-badge">
                        <Icon size={14} className="impact-badge-icon" />
                        {card.sub}
                      </span>
                    )}
                    <h3 className="impact-tile-title">{card.title}</h3>
                    {card.desc && (
                      <p className="impact-tile-desc">{card.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Footer Note */}
          {activeImpactObj.footer && (
            <div className="section-footer-note-wrap">
              <span className="section-footer-badge">
                {activeImpactTab === 'social' ? (
                  <CheckCircle size={14} className="text-primary" />
                ) : (
                  <Users size={14} className="text-secondary" />
                )}
                {activeImpactObj.footer}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ SNAPSHOT COUNTERS ════════════════════════════ */}
      <section id="snapshot" className="section bg-alt">
        <div className="container">
          <ImpactCounters />
        </div>
      </section>

      {/* ═══════════════════════ FEATURED PROJECTS ═══════════════════════════ */}
      <section id="projects" className="fp-stack-section">
        <div className="fp-stack-content">
          <div className="section-header scroll-reveal reveal-fade-up" style={{ textAlign: 'left', alignItems: 'flex-start', margin: '0' }}>
            <span className="badge badge-accent">Portfolio</span>
            <h2 className="fp-stack-section-title" style={{ fontSize: '3rem', fontWeight: '850', color: 'var(--text-primary)', margin: '0' }}>Featured Projects</h2>
            <p className="fp-stack-section-desc" style={{ marginTop: '16px', maxWidth: '800px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Active initiatives driving local community circularity, clean cities, and worker dignity.</p>
          </div>

          <div className="fp-stack-grid">
            {projects.map((proj, i) => {
              const Icon = proj.icon;
              return (
                <div
                  key={proj.id}
                  className="fp-stack-card"
                  style={{ backgroundColor: proj.bg }}
                >
                  <div className="fp-stack-info">
                    <span className="fp-stack-category" style={{ color: proj.color }}>{proj.tag}</span>
                    <h3 className="fp-stack-title">
                      {proj.title}
                    </h3>
                    <p className="fp-stack-desc">{proj.desc}</p>

                    <Link href="/get-involved/donate" className="fp-stack-badge" style={{ backgroundColor: '#ffffff', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div className="fp-stack-btn-text" style={{ color: proj.color, fontSize: '15px' }}>Learn More</div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={proj.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fp-stack-arrow-icon">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12,5 19,12 12,19"></polyline>
                      </svg>
                    </Link>
                  </div>

                  <div className="fp-stack-visual">
                    <div className="fp-stack-visual-container">
                      <img src={proj.image} alt={proj.title} className="fp-stack-img" loading="lazy" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── REFERRALS SECTION ─── */}
      <section className="referral-section">
        <div className="referral-container">
          <span className="referral-badge">Voices of Impact</span>
          <h2 className="referral-title">Testimonials</h2>
          <p className="referral-subtitle">Feedback from our valued partners and community members.</p>
        </div>
        <div className="scrolling-container">
          <div className="marquee-wrapper">
            <div className="marquee-track track-left">
              {[client1, client2, client3, client4, client1, client2, client3, client4].map((img, i) => (
                <div className="scrolling-card" key={`r1-${i}`}>
                  <p className="scrolling-text">
                    &ldquo;Working with Uboontu was a great experience. They were responsible, communicative, and delivered excellent design work. Their team really understood our vision and translated it into a product that exceeded our expectations in every way possible.&rdquo;
                  </p>
                  <div className="scrolling-author">
                    <img src={getSrc(img)} alt="Client" className="author-img" loading="lazy" decoding="async" />
                    <div className="author-info">
                      <span className="author-name">{i % 4 === 0 ? "Sofia Gouveia" : i % 4 === 1 ? "Austin" : i % 4 === 2 ? "Moshiur Rahman" : "Jahnobi"}</span>
                      <span className="author-role">{i % 4 === 0 ? "Marketing Manager @ Voc AI" : "CEO @ TechFlow"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-wrapper">
            <div className="marquee-track track-right">
              {[client5, client6, client7, client8, client5, client6, client7, client8].map((img, i) => (
                <div className="scrolling-card" key={`r2-${i}`}>
                  <p className="scrolling-text">
                    &ldquo;Uboontu is a professional, reliable partner for end-to-end product builds. From clean, modern designs to seamless systems, they handled everything with total professionalism. I couldn&apos;t be happier with our collaboration on this complex project.&rdquo;
                  </p>
                  <div className="scrolling-author">
                    <img src={getSrc(img)} alt="Client" className="author-img" loading="lazy" decoding="async" />
                    <div className="author-info">
                      <span className="author-name">{i % 4 === 0 ? "Dilicio" : i % 4 === 1 ? "Armen Avagyan" : i % 4 === 2 ? "Anika" : "Tanmee"}</span>
                      <span className="author-role">{i % 4 === 1 ? "CEO & Co Founder @ Fraus" : "Founder @ Coinpulse"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-wrapper">
            <div className="marquee-track track-left">
              {[client3, client5, client1, client7, client3, client5, client1, client7].map((img, i) => (
                <div className="scrolling-card" key={`r3-${i}`}>
                  <p className="scrolling-text">
                    &ldquo;They translated our business goals into clean, aesthetic designs with total transparency. The team is patient, committed, and a highly recommended design partner for any company looking to elevate their digital presence significantly.&rdquo;
                  </p>
                  <div className="scrolling-author">
                    <img src={getSrc(img)} alt="Client" className="author-img" loading="lazy" decoding="async" />
                    <div className="author-info">
                      <span className="author-name">{i % 4 === 0 ? "Moshiur" : i % 4 === 1 ? "Dilicio" : i % 4 === 2 ? "Sofia" : "Anika"}</span>
                      <span className="author-role">Product Lead @ Innovate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="blogs-newsletter-section" style={{ paddingBottom: '120px', paddingTop: '30px' }}>
        <div className="blogs-newsletter-container">
          <div className="blogs-newsletter-banner" style={{ backgroundImage: `url('/image (2).webp')` }}>
            <span className="blogs-newsletter-badge">Newsletter</span>
            <h2 className="blogs-newsletter-title">
              Stay In The Loop And Keep Up <br className="desktop-only-br" />
              With Our <span className="elegant-serif">Green Initiatives</span>
            </h2>
            <p className="blogs-newsletter-subtitle">
              Be the first to hear about our latest waste management projects, community drives, and sustainability impact reports.
            </p>
            
            <div className="blogs-newsletter-avatars-row">
              <div className="blogs-newsletter-avatars">
                <img src="/40+.avif" alt="40+ Happy Clients" />
              </div>
            </div>

            {subscribed ? (
              <div style={{ color: '#D8FF84', fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>
                Thank you! You have subscribed successfully.
              </div>
            ) : (
              <form className="blogs-newsletter-form" onSubmit={handleSubscribe}>
                <div className="blogs-newsletter-input-wrapper">
                  <span className="blogs-newsletter-mail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Your email here"
                    className="blogs-newsletter-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="subscribe-submit-btn blogs-newsletter-btn">
                  Subscribe
                  <span className="arrow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
