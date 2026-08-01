import React, { useState, useMemo, useRef } from "react";
import {
  Search, MapPin, Bell, MessageCircle, ShoppingCart, User, X, ChevronRight,
  ChevronDown, Home as HomeIcon, Store, Building2, Wrench, GraduationCap,
  Landmark, Bus, Truck, Megaphone, Briefcase, Star, CheckCircle2, Plus,
  Minus, ArrowLeft, LayoutDashboard, Package, Users, Receipt, TrendingUp,
  ShieldCheck, Settings, LogOut, Filter, Grid3x3, List as ListIcon, Map as MapIcon,
  Scissors, Car, Droplets, Zap, AlertTriangle, Clock, Calendar, CreditCard,
  Smartphone, Banknote, ChevronLeft, BarChart3, Boxes, Handshake, FileText,
  Eye, EyeOff, Lock, Sparkles, Building, BadgeCheck, Wallet,
  Navigation, Footprints, Satellite, Layers,
  Pencil, Trash2, Inbox, UserCheck, Power,
  Upload, UploadCloud, Target, Calculator, FileCheck2, Sun, Moon
} from "lucide-react";

/* ============================================================
   KENYAN TRADE — interactive prototype
   Parent: Mountlion Marketing Company → Oscarian Express → Kenyan Trade
   Demo-only, local state, no backend.
   ============================================================ */

const BRAND = {
  emerald: "#0B6B4F",
  forest: "#064E3B",
  gold: "#D4A72C",
  goldLight: "#F4E3A1",
  white: "#FFFFFF",
  bg: "#F8FAF9",
  text: "#17221E",
  textSub: "#64748B",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#DC2626",
  info: "#2563EB",
};

const KES = (n) => "KSh " + n.toLocaleString("en-KE");

/* ---------------- Demo data ---------------- */

const LOCATION = {
  continent: "Africa",
  country: "Kenya",
  region: "Nairobi County",
  city: "Nairobi",
  regionLabel: "County",
};

const LOCATION_TREE = {
  Africa: {
    Kenya: { regionLabel: "County", regions: { "Nairobi County": ["Nairobi", "Kasarani"], "Kiambu County": ["Thika", "Ruiru"], "Mombasa County": ["Mombasa", "Nyali"] } },
    Nigeria: { regionLabel: "State", regions: { Lagos: ["Ikeja", "Lekki"] } },
  },
  "North America": {
    "United States": { regionLabel: "State", regions: { California: ["Los Angeles", "San Francisco"], Texas: ["Austin", "Houston"] } },
    Canada: { regionLabel: "Province", regions: { Ontario: ["Toronto", "Ottawa"] } },
  },
  Europe: {
    "United Kingdom": { regionLabel: "Region/County", regions: { London: ["Camden", "Hackney"] } },
  },
  Asia: {
    India: { regionLabel: "State", regions: { Maharashtra: ["Mumbai", "Pune"] } },
  },
};

const CATEGORIES = [
  { id: "market", label: "Marketplace", icon: Store, view: "marketplace" },
  { id: "houses", label: "Real Estate", icon: Building2, view: "houses" },
  { id: "super", label: "Supermarket", icon: Boxes, view: "marketplace" },
  { id: "beauty", label: "Beauty & Barber", icon: Scissors, view: "services" },
  { id: "food", label: "Food", icon: Store, view: "marketplace" },
  { id: "transport", label: "Transport", icon: Bus, view: "transport" },
  { id: "jobs", label: "Jobs", icon: Briefcase, view: "jobs" },
  { id: "education", label: "Education", icon: GraduationCap, view: "education" },
  { id: "helb", label: "HELB & Student", icon: FileText, view: "education" },
  { id: "finance", label: "Banking & Finance", icon: Landmark, view: "finance" },
  { id: "health", label: "Health", icon: Wrench, view: "services" },
  { id: "delivery", label: "Delivery", icon: Truck, view: "delivery" },
  { id: "ads", label: "Advertising", icon: Megaphone, view: "advertising" },
  { id: "bizos", label: "Business Management", icon: LayoutDashboard, view: "business" },
];

/* ---------------- Language / i18n ----------------
   Lightweight EN/SW dictionary + t() helper. Fully translated: navigation,
   home hero, categories, bottom nav, footer, common actions, and the Jobs
   board. Other deeper screens (Marketplace, Business OS, Owner Center, etc.)
   remain English-only for now — the toggle and dictionary are built to be
   extended to them incrementally. */

const STRINGS = {
  en: {
    "nav.home": "Home", "nav.marketplace": "Marketplace", "nav.houses": "Real Estate",
    "nav.services": "Services", "nav.business": "Business OS", "nav.education": "Education",
    "nav.finance": "Finance", "nav.transport": "Transport", "nav.delivery": "Delivery", "nav.jobs": "Jobs",
    "bottomnav.home": "Home", "bottomnav.search": "Search", "bottomnav.market": "Market",
    "bottomnav.business": "Business", "bottomnav.profile": "Profile",
    "hero.title1": "Everything Kenya,", "hero.title2": "one platform.",
    "hero.subtitle": "Discover trusted businesses, products, homes, services, opportunities, and everyday solutions in one place.",
    "hero.search": "What are you looking for today?",
    "hero.exploreServices": "Explore Services", "hero.startSelling": "Start Selling", "hero.manageBusiness": "Manage Your Business",
    "category.market": "Marketplace", "category.houses": "Real Estate", "category.super": "Supermarket",
    "category.beauty": "Beauty & Barber", "category.food": "Food", "category.transport": "Transport",
    "category.jobs": "Jobs", "category.education": "Education", "category.helb": "HELB & Student",
    "category.finance": "Banking & Finance", "category.health": "Health", "category.delivery": "Delivery",
    "category.ads": "Advertising", "category.bizos": "Business Management",
    "common.seeAll": "See all", "common.backHome": "Back to home", "common.addToCart": "Add to cart",
    "common.save": "Save", "common.bookNow": "Book Now", "common.chat": "Chat", "common.search": "Search",
    "common.cancel": "Cancel", "common.saveChanges": "Save changes",
    "footer.marketplace": "Marketplace", "footer.realestate": "Real Estate", "footer.services": "Services",
    "footer.businessos": "Business OS", "footer.advertising": "Advertising", "footer.owner": "Owner Center", "footer.jobs": "Jobs",
    "jobs.title": "Jobs", "jobs.subtitle": "Find work across Kenya, or hire verified talent for your business.",
    "jobs.browse": "Browse Jobs", "jobs.myApplications": "My Applications", "jobs.postJob": "Post a Job",
    "jobs.searchPlaceholder": "Search job title or company", "jobs.allCategories": "All categories", "jobs.allTypes": "All types",
    "jobs.allLocations": "All locations", "jobs.applyNow": "Apply now", "jobs.uploadCV": "Upload your CV",
    "jobs.coverNote": "Cover note (optional)", "jobs.submitApplication": "Submit application",
    "jobs.applicationSubmitted": "Application submitted", "jobs.noApplications": "You haven't applied to any jobs yet.",
    "jobs.postJobTitle": "Post a job", "jobs.jobTitleLabel": "Job title", "jobs.companyLabel": "Company name",
    "jobs.categoryLabel": "Category", "jobs.typeLabel": "Job type", "jobs.locationLabel": "Location",
    "jobs.salaryLabel": "Salary range (KSh/month)", "jobs.descriptionLabel": "Job description",
    "jobs.postButton": "Post job", "jobs.posted": "Posted", "jobs.applicants": "applicants",
    "jobs.noJobs": "No jobs match those filters yet.", "jobs.myPostedJobs": "Your posted jobs",
    "jobs.noPostedJobs": "You haven't posted any jobs yet.",
  },
  sw: {
    "nav.home": "Nyumbani", "nav.marketplace": "Soko", "nav.houses": "Mali Isiyohamishika",
    "nav.services": "Huduma", "nav.business": "Mfumo wa Biashara", "nav.education": "Elimu",
    "nav.finance": "Fedha", "nav.transport": "Usafiri", "nav.delivery": "Uwasilishaji", "nav.jobs": "Kazi",
    "bottomnav.home": "Nyumbani", "bottomnav.search": "Tafuta", "bottomnav.market": "Soko",
    "bottomnav.business": "Biashara", "bottomnav.profile": "Wasifu",
    "hero.title1": "Kenya Yote,", "hero.title2": "jukwaa moja.",
    "hero.subtitle": "Gundua biashara zinazoaminika, bidhaa, nyumba, huduma, fursa, na masuluhisho ya kila siku mahali pamoja.",
    "hero.search": "Unatafuta nini leo?",
    "hero.exploreServices": "Angalia Huduma", "hero.startSelling": "Anza Kuuza", "hero.manageBusiness": "Simamia Biashara Yako",
    "category.market": "Soko", "category.houses": "Mali Isiyohamishika", "category.super": "Duka Kuu",
    "category.beauty": "Urembo & Kinyozi", "category.food": "Chakula", "category.transport": "Usafiri",
    "category.jobs": "Kazi", "category.education": "Elimu", "category.helb": "HELB na Wanafunzi",
    "category.finance": "Benki na Fedha", "category.health": "Afya", "category.delivery": "Uwasilishaji",
    "category.ads": "Matangazo", "category.bizos": "Usimamizi wa Biashara",
    "common.seeAll": "Ona zote", "common.backHome": "Rudi Nyumbani", "common.addToCart": "Ongeza kwenye kikapu",
    "common.save": "Hifadhi", "common.bookNow": "Weka Nafasi", "common.chat": "Ongea", "common.search": "Tafuta",
    "common.cancel": "Ghairi", "common.saveChanges": "Hifadhi mabadiliko",
    "footer.marketplace": "Soko", "footer.realestate": "Mali Isiyohamishika", "footer.services": "Huduma",
    "footer.businessos": "Mfumo wa Biashara", "footer.advertising": "Matangazo", "footer.owner": "Kituo cha Mmiliki", "footer.jobs": "Kazi",
    "jobs.title": "Kazi", "jobs.subtitle": "Tafuta kazi kote Kenya, au ajiri wataalamu waliohakikiwa kwa biashara yako.",
    "jobs.browse": "Tazama Kazi", "jobs.myApplications": "Maombi Yangu", "jobs.postJob": "Tangaza Kazi",
    "jobs.searchPlaceholder": "Tafuta jina la kazi au kampuni", "jobs.allCategories": "Aina zote", "jobs.allTypes": "Aina zote za kazi",
    "jobs.allLocations": "Maeneo yote", "jobs.applyNow": "Omba sasa", "jobs.uploadCV": "Pakia CV yako",
    "jobs.coverNote": "Ujumbe wa maombi (si lazima)", "jobs.submitApplication": "Tuma ombi",
    "jobs.applicationSubmitted": "Ombi limetumwa", "jobs.noApplications": "Bado hujaomba kazi yoyote.",
    "jobs.postJobTitle": "Tangaza kazi", "jobs.jobTitleLabel": "Jina la kazi", "jobs.companyLabel": "Jina la kampuni",
    "jobs.categoryLabel": "Aina ya kazi", "jobs.typeLabel": "Muda wa kazi", "jobs.locationLabel": "Mahali",
    "jobs.salaryLabel": "Mshahara (KSh/mwezi)", "jobs.descriptionLabel": "Maelezo ya kazi",
    "jobs.postButton": "Tangaza kazi", "jobs.posted": "Ilitangazwa", "jobs.applicants": "waombaji",
    "jobs.noJobs": "Hakuna kazi zinazolingana na vichujio hivyo.", "jobs.myPostedJobs": "Kazi ulizotangaza",
    "jobs.noPostedJobs": "Bado hujatangaza kazi yoyote.",
  },
};

const PRODUCTS = [
  { id: "p1", name: "Samsung Galaxy A15 128GB", price: 18500, category: "Phones", seller: "Tech Hub Nairobi", location: "Nairobi CBD", rating: 4.6, verified: true, img: "📱" },
  { id: "p2", name: "Double Door Fridge 220L", price: 42000, category: "Home", seller: "Mama Njeri General Store", location: "Kasarani", rating: 4.4, verified: true, img: "🧊" },
  { id: "p3", name: "Office Desk & Chair Set", price: 15800, category: "Furniture", seller: "Thika Furniture World", location: "Thika", rating: 4.2, verified: false, img: "🪑" },
  { id: "p4", name: "Maize Flour 50kg (Wholesale)", price: 3200, category: "Food", seller: "Kilimo Agrovet", location: "Kiambu", rating: 4.8, verified: true, img: "🌽" },
  { id: "p5", name: "Toyota Axio 2014", price: 950000, category: "Vehicles", seller: "Mombasa Road Motors", location: "Nairobi", rating: 4.5, verified: true, img: "🚗" },
  { id: "p6", name: "Leather Office Shoes", price: 3500, category: "Fashion", seller: "Biashara Fashions", location: "Ngara", rating: 4.1, verified: false, img: "👞" },
];

const HOUSES = [
  { id: "h1", title: "2BR Apartment, Kilimani", price: 45000, period: "month", beds: 2, baths: 2, type: "Apartment", location: "Kilimani, Nairobi", distance: "2.3 km", agent: "Nairobi Homes Ltd", verified: true, img: "🏢" },
  { id: "h2", title: "3BR Bungalow, Ruiru", price: 6500000, period: "sale", beds: 3, baths: 2, type: "House", location: "Ruiru, Kiambu", distance: "18 km", agent: "Kiambu Realty", verified: true, img: "🏡" },
  { id: "h3", title: "Bedsitter, Kasarani", price: 9500, period: "month", beds: 1, baths: 1, type: "Bedsitter", location: "Kasarani, Nairobi", distance: "5.1 km", agent: "Direct Owner", verified: false, img: "🏠" },
  { id: "h4", title: "Commercial Shop, Thika Road", price: 32000, period: "month", beds: 0, baths: 1, type: "Shop", location: "Thika Road", distance: "9 km", agent: "TR Properties", verified: true, img: "🏬" },
  { id: "h5", title: "Serviced Office, Westlands", price: 85000, period: "month", beds: 0, baths: 2, type: "Office", location: "Westlands, Nairobi", distance: "4.6 km", agent: "Nairobi Homes Ltd", verified: true, img: "🏙️" },
  { id: "h6", title: "1/4 Acre Land, Kitengela", price: 2400000, period: "sale", beds: 0, baths: 0, type: "Land", location: "Kitengela, Kajiado", distance: "31 km", agent: "TR Properties", verified: false, img: "📐" },
  { id: "h7", title: "4BR Maisonette, Nyali", price: 12500000, period: "sale", beds: 4, baths: 3, type: "House", location: "Nyali, Mombasa", distance: "480 km", agent: "Coastal Estates", verified: true, img: "🏡" },
  { id: "h8", title: "Studio Apartment, South B", price: 18000, period: "month", beds: 0, baths: 1, type: "Apartment", location: "South B, Nairobi", distance: "6.8 km", agent: "Direct Owner", verified: false, img: "🏢" },
];

const REAL_ESTATE_AGENTS = [
  { id: "a1", name: "Nairobi Homes Ltd", type: "Agency", location: "Kilimani, Nairobi", phone: "0722 xxx xxx", listings: 14, rating: 4.7, verified: true },
  { id: "a2", name: "Kiambu Realty", type: "Agency", location: "Kiambu", phone: "0733 xxx xxx", listings: 9, rating: 4.5, verified: true },
  { id: "a3", name: "TR Properties", type: "Independent agent", location: "Thika Road, Nairobi", phone: "0711 xxx xxx", listings: 6, rating: 4.2, verified: false },
  { id: "a4", name: "Coastal Estates", type: "Agency", location: "Nyali, Mombasa", phone: "0700 xxx xxx", listings: 11, rating: 4.6, verified: true },
];

const SERVICES = [
  { id: "s1", name: "Faiza Beauty Salon & Spa", category: "Salon", location: "Westlands", distance: "1.2 km", rating: 4.7, verified: true, open: true, price: "From KSh 500", icon: Scissors },
  { id: "s2", name: "Njoro Kinyozi", category: "Kinyozi", location: "Kasarani", distance: "3.4 km", rating: 4.5, verified: true, open: true, price: "From KSh 150", icon: Scissors },
  { id: "s3", name: "SwiftFix Mechanics", category: "Mechanic", location: "Industrial Area", distance: "6.7 km", rating: 4.3, verified: true, open: false, price: "From KSh 1,000", icon: Car },
  { id: "s4", name: "AquaFlow Plumbers", category: "Plumber", location: "South B", distance: "4.0 km", rating: 4.6, verified: false, open: true, price: "From KSh 800", icon: Droplets },
  { id: "s5", name: "BrightVolt Electricians", category: "Electrician", location: "Embakasi", distance: "7.2 km", rating: 4.4, verified: true, open: true, price: "From KSh 700", icon: Zap },
];

const STAFF = ["Any available", "Grace M.", "Kevin O.", "Amina W."];
const TIMESLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

const BUSINESSES = [
  { id: "b1", name: "Mama Njeri General Store", branch: "Kasarani" },
  { id: "b2", name: "Mama Njeri Salon", branch: "Kasarani" },
  { id: "b3", name: "Nairobi Branch", branch: "CBD" },
  { id: "b4", name: "Mombasa Branch", branch: "Nyali" },
];

const BUSINESS_STATS = {
  b1: { today: 85400, week: 412000, month: 1680000, expenses: 32500, lowStock: 8, pendingSupplier: 75000, pendingDeliveries: 4 },
  b2: { today: 24500, week: 138000, month: 560000, expenses: 12000, lowStock: 2, pendingSupplier: 15000, pendingDeliveries: 1 },
  b3: { today: 61200, week: 298000, month: 1120000, expenses: 41000, lowStock: 5, pendingSupplier: 40000, pendingDeliveries: 2 },
  b4: { today: 33800, week: 176000, month: 690000, expenses: 22000, lowStock: 3, pendingSupplier: 20000, pendingDeliveries: 3 },
};

const INVENTORY = [
  { id: "i1", name: "Maize Flour 2kg", sku: "MF-002", stock: 42, min: 15, buy: 180, sell: 230, supplier: "Kilimo Agrovet" },
  { id: "i2", name: "Cooking Oil 1L", sku: "CO-001", stock: 6, min: 10, buy: 260, sell: 330, supplier: "Golden Oils Ltd" },
  { id: "i3", name: "Sugar 2kg", sku: "SG-002", stock: 18, min: 12, buy: 210, sell: 260, supplier: "Mumias Distributors" },
  { id: "i4", name: "Bread (White)", sku: "BR-100", stock: 5, min: 10, buy: 55, sell: 70, supplier: "Festive Bakers" },
];

const SUPPLIERS = [
  { id: "sp1", name: "Kilimo Agrovet", contact: "0722 xxx xxx", location: "Kiambu", totalPurchased: 420000, totalPaid: 345000, balance: 75000, last: "2026-07-18" },
  { id: "sp2", name: "Golden Oils Ltd", contact: "0733 xxx xxx", location: "Nairobi", totalPurchased: 210000, totalPaid: 210000, balance: 0, last: "2026-07-10" },
  { id: "sp3", name: "Festive Bakers", contact: "0711 xxx xxx", location: "Thika", totalPurchased: 96000, totalPaid: 81000, balance: 15000, last: "2026-07-20" },
];

const EXPENSES_SEED = [
  { id: "e1", category: "Rent", amount: 20000, date: "2026-07-01", by: "Owner", method: "Bank" },
  { id: "e2", category: "Electricity", amount: 4500, date: "2026-07-05", by: "Accountant", method: "M-Pesa" },
  { id: "e3", category: "Transport", amount: 3200, date: "2026-07-14", by: "Manager", method: "Cash" },
];

const AI_INSIGHTS = [
  "Sales increased 18% this month.",
  "Cooking Oil 1L stock may run out soon.",
  "Supplier B offers a lower price on Sugar 2kg.",
  "Highest sales occur from 5 PM to 8 PM.",
  "Expenses increased faster than revenue this week.",
  "Maize Flour 2kg is the best seller.",
];

const PAYMENT_DESTINATIONS = [
  { id: "pd1", type: "M-Pesa Till", masked: "Till •••• 214", primary: true, status: "Active" },
  { id: "pd2", type: "Paybill", masked: "Paybill •••• 908", primary: false, status: "Active" },
  { id: "pd3", type: "Bank Account", masked: "KCB •••• 4471", primary: false, status: "Active" },
  { id: "pd4", type: "Payment Gateway", masked: "Gateway •••• A2", primary: false, status: "Disabled" },
];

const ROLES = [
  "Platform Owner", "Super Admin", "Admin", "Moderator", "Business Owner", "General Manager",
  "Branch Manager", "Accountant", "Salesperson", "Cashier", "Warehouse Manager",
  "Delivery Staff", "Customer Support", "Customer",
];

const MY_PROPERTIES_SEED = [
  { id: "mp1", title: "2BR Apartment, Kilimani", price: 45000, period: "month", beds: 2, baths: 2, type: "Apartment", location: "Kilimani, Nairobi", description: "Bright 2 bedroom apartment with parking, backup water and 24hr security.", status: "Active", verification: "Verified", inquiries: 5, img: "🏢" },
  { id: "mp2", title: "Bedsitter, Kasarani", price: 9500, period: "month", beds: 1, baths: 1, type: "Bedsitter", location: "Kasarani, Nairobi", description: "Cozy bedsitter close to Kasarani stage, tarmac access.", status: "Active", verification: "Pending review", inquiries: 2, img: "🏠" },
  { id: "mp3", title: "Land Parcel, Ruiru (1/8 acre)", price: 1800000, period: "sale", beds: 0, baths: 0, type: "Land", location: "Ruiru, Kiambu", description: "Ready title deed, near tarmac, ideal for residential development.", status: "Draft", verification: "Not submitted", inquiries: 0, img: "📐" },
];

const MY_PRODUCTS_SEED = [
  { id: "mpr1", name: "Samsung Galaxy A15 128GB", price: 18500, stock: 12, category: "Phones", status: "Active", img: "📱" },
  { id: "mpr2", name: "Double Door Fridge 220L", price: 42000, stock: 3, category: "Home", status: "Active", img: "🧊" },
];

const MY_SERVICES_SEED = [
  { id: "ms1", name: "Faiza Beauty Salon & Spa", category: "Salon", price: "From KSh 500", hours: "9:00 AM – 7:00 PM", open: true, status: "Active", inquiries: 8 },
];

const JOB_CATEGORIES = ["Sales", "Logistics", "Finance", "Beauty", "Technology", "Agriculture", "Hospitality", "Construction", "Customer Service"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const JOBS_SEED = [
  { id: "j1", title: "Sales Executive", company: "Kilimo Agrovet", location: "Kiambu", type: "Full-time", category: "Sales", salaryMin: 25000, salaryMax: 35000, posted: "2 days ago", verified: true, applicants: 6, mine: false, description: "Drive sales of agricultural inputs to farmers and retailers across Kiambu County. Requires a motorbike license and 1+ years in field sales." },
  { id: "j2", title: "Delivery Rider", company: "Oscarian Express", location: "Nairobi", type: "Full-time", category: "Logistics", salaryMin: 18000, salaryMax: 25000, posted: "1 day ago", verified: true, applicants: 14, mine: false, description: "Pick up and deliver parcels across Nairobi using a company-provided motorbike. Smartphone and valid riding license required." },
  { id: "j3", title: "Accountant", company: "Nairobi Homes Ltd", location: "Nairobi", type: "Full-time", category: "Finance", salaryMin: 45000, salaryMax: 60000, posted: "5 days ago", verified: true, applicants: 9, mine: false, description: "Manage rent collection reconciliation, supplier payments and monthly financial reports for a growing property agency." },
  { id: "j4", title: "Salon Assistant", company: "Faiza Beauty Salon & Spa", location: "Westlands, Nairobi", type: "Part-time", category: "Beauty", salaryMin: 12000, salaryMax: 18000, posted: "1 week ago", verified: false, applicants: 3, mine: false, description: "Support senior stylists with wash, blow-dry and client preparation. Training provided for the right candidate." },
  { id: "j5", title: "Software Developer (Remote)", company: "Tech Hub Nairobi", location: "Remote / Nairobi", type: "Contract", category: "Technology", salaryMin: 80000, salaryMax: 150000, posted: "3 days ago", verified: true, applicants: 22, mine: false, description: "Build and maintain e-commerce storefronts for our retail clients. React and Node.js experience required." },
  { id: "j6", title: "Farm Supervisor", company: "Rift Valley Growers", location: "Nakuru", type: "Full-time", category: "Agriculture", salaryMin: 30000, salaryMax: 40000, posted: "4 days ago", verified: true, applicants: 5, mine: false, description: "Oversee day-to-day operations on a 40-acre horticulture farm, including labour scheduling and irrigation planning." },
];

const MAP_ORIGIN = { x: 50, y: 88, label: "You" };

const MAP_DESTINATIONS = [
  { id: "d1", name: "Tech Hub Nairobi", type: "Electronics shop", x: 28, y: 38, distance: "2.1 km", drive: "8 min", walk: "26 min", transit: "15 min" },
  { id: "d2", name: "Faiza Beauty Salon", type: "Salon", x: 62, y: 55, distance: "3.4 km", drive: "12 min", walk: "41 min", transit: "20 min" },
  { id: "d3", name: "Kilimani Apartments", type: "Houses", x: 78, y: 28, distance: "5.0 km", drive: "17 min", walk: "58 min", transit: "25 min" },
  { id: "d4", name: "KCB Bank Kasarani", type: "Bank", x: 38, y: 66, distance: "1.6 km", drive: "6 min", walk: "20 min", transit: "10 min" },
];

/* ---------------- Small UI helpers ---------------- */

function Badge({ children, tone = "emerald" }) {
  const tones = {
    emerald: { bg: "#E7F3EE", color: BRAND.emerald },
    gold: { bg: "#FBF3DC", color: "#8A6B10" },
    error: { bg: "#FCE8E6", color: BRAND.error },
    info: { bg: "#E8EFFC", color: BRAND.info },
    slate: { bg: "#F1F5F9", color: BRAND.textSub },
  };
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: t.bg, color: t.color }}
    >
      {children}
    </span>
  );
}

function StatusTag({ status }) {
  // status: "live" | "demo" | "integration" | "planned"
  const map = {
    live: { icon: "🟢", label: "Live", color: "#166534" },
    demo: { icon: "🟡", label: "Demo / simulated", color: "#92400E" },
    integration: { icon: "🔵", label: "Ready for integration", color: "#1E40AF" },
    planned: { icon: "⚪", label: "Planned", color: "#475569" },
  };
  const s = map[status] || map.demo;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ borderColor: "#EAF0EC", color: s.color }}>
      <span>{s.icon}</span> {s.label}
    </span>
  );
}

function Verified({ small }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: BRAND.emerald }}>
      <BadgeCheck size={small ? 12 : 14} /> Verified
    </span>
  );
}

function PrimaryButton({ children, onClick, className = "", full, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.98] hover:brightness-110 ${full ? "w-full" : ""} ${className}`}
      style={{ background: BRAND.emerald }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, className = "", full, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition active:scale-[0.98] ${full ? "w-full" : ""} ${className}`}
      style={{ borderColor: "#D8E3DE", color: BRAND.text }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function GoldButton({ children, onClick, className = "", icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition active:scale-[0.98] hover:brightness-105 ${className}`}
      style={{ background: BRAND.gold, color: BRAND.forest }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function UploadBar({ files, setFiles, accept = "image/*", multiple = true, label = "photos", hint }) {
  const inputRef = useRef(null);

  const simulateUpload = (id) => {
    const timer = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id || f.progress >= 100) return f;
          const next = Math.min(100, f.progress + Math.random() * 22 + 12);
          return { ...f, progress: next };
        })
      );
    }, 220);
    setTimeout(() => clearInterval(timer), 3000);
  };

  const onPick = (e) => {
    const picked = Array.from(e.target.files || []);
    const items = picked.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      sizeKB: Math.max(1, Math.round(file.size / 1024)),
      progress: 0,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      isDoc: !file.type.startsWith("image/"),
    }));
    setFiles((prev) => [...prev, ...items]);
    items.forEach((it) => simulateUpload(it.id));
    e.target.value = "";
  };

  const remove = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={onPick} className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed p-5 text-xs font-semibold transition hover:bg-slate-50"
        style={{ borderColor: "#B7D6C6", color: BRAND.emerald }}
      >
        <UploadCloud size={20} />
        Upload {label}
        {hint && <span className="text-[10px] font-normal" style={{ color: BRAND.textSub }}>{hint}</span>}
      </button>

      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-2.5 rounded-xl border p-2" style={{ borderColor: "#EAF0EC" }}>
              {f.url ? (
                <img src={f.url} alt={f.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: BRAND.bg }}>
                  <FileText size={16} color={BRAND.emerald} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-semibold" style={{ color: BRAND.text }}>{f.name}</span>
                  <span className="shrink-0 text-[10px] font-semibold" style={{ color: f.progress >= 100 ? BRAND.success : BRAND.textSub }}>
                    {f.progress >= 100 ? "Uploaded" : `${Math.round(f.progress)}%`}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#EAF0EC" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${f.progress}%`, background: f.progress >= 100 ? BRAND.success : `linear-gradient(90deg, ${BRAND.emerald}, ${BRAND.gold})` }}
                  />
                </div>
                <div className="mt-0.5 text-[10px]" style={{ color: BRAND.textSub }}>{f.sizeKB} KB</div>
              </div>
              {f.progress >= 100 ? (
                <CheckCircle2 size={16} color={BRAND.success} className="shrink-0" />
              ) : null}
              <button type="button" onClick={() => remove(f.id)} className="shrink-0 rounded-full p-1 hover:bg-slate-100">
                <X size={13} color={BRAND.textSub} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-md"} max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ color: BRAND.text, fontFamily: "Fraunces, serif" }}>{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        {eyebrow && <div className="mb-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: BRAND.gold }}>{eyebrow}</div>}
        <h2 className="text-xl font-bold" style={{ color: BRAND.text, fontFamily: "Fraunces, serif" }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, tone = "emerald", icon: Icon }) {
  const toneColor = { emerald: BRAND.emerald, error: BRAND.error, gold: "#8A6B10", info: BRAND.info }[tone];
  return (
    <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "#E7EEEA" }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: BRAND.textSub }}>{label}</span>
        {Icon && <Icon size={16} color={toneColor} />}
      </div>
      <div className="text-lg font-bold" style={{ color: toneColor, fontFamily: "Fraunces, serif" }}>{value}</div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function KenyanTradeApp() {
  const [view, setView] = useState("home");
  const [prevView, setPrevView] = useState("home");
  const [toast, setToast] = useState(null);

  // Language (EN/SW) — see STRINGS dictionary above
  const [lang, setLang] = useState("en");
  const t = (k) => (STRINGS[lang] && STRINGS[lang][k]) || STRINGS.en[k] || k;

  // Theme — scoped dark mode: affects page chrome (header, footer, backgrounds,
  // page titles) rather than every inline-styled card. Labelled honestly in the UI.
  const [dark, setDark] = useState(false);
  const theme = dark
    ? { bg: "#0E1613", card: "#152019", border: "#243830", text: "#F1F5F3", sub: "#9FB3AA", headerBg: "#0E1613" }
    : { bg: BRAND.bg, card: "#FFFFFF", border: "#EAF0EC", text: BRAND.text, sub: BRAND.textSub, headerBg: "#FFFFFF" };

  const goto = (v) => {
    setPrevView(view);
    setView(v);
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Location
  const [location, setLocation] = useState(LOCATION);
  const [locationOpen, setLocationOpen] = useState(false);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Cart
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 none,1 review,2 payment,3 confirmed
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id);
      if (found) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
    notify(`${product.name} added to cart`);
  };
  const changeQty = (id, delta) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)).filter((i) => i.qty > 0));
  };

  // Product detail
  const [activeProduct, setActiveProduct] = useState(null);

  // Houses
  const [activeHouse, setActiveHouse] = useState(null);

  // Services + booking
  const [activeService, setActiveService] = useState(null);
  const [booking, setBooking] = useState(null); // {service, staff, date, time, step}

  // Notifications / messages / profile
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Business OS state
  const [activeBusiness, setActiveBusiness] = useState("b1");
  const [bizTab, setBizTab] = useState("dashboard");
  const [inventory, setInventory] = useState(INVENTORY);
  const [suppliers, setSuppliers] = useState(SUPPLIERS);
  const [expenses, setExpenses] = useState(EXPENSES_SEED);
  const [sales, setSales] = useState([]);
  const [newSaleOpen, setNewSaleOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const stats = BUSINESS_STATS[activeBusiness];

  // Owner center
  const [ownerAuthed, setOwnerAuthed] = useState(false);
  const [ownerTab, setOwnerTab] = useState("overview");
  const [destinations, setDestinations] = useState(PAYMENT_DESTINATIONS);

  // Manage listings (agents / landlords / sellers / service providers)
  const [manageTab, setManageTab] = useState("properties");
  const [myProperties, setMyProperties] = useState(MY_PROPERTIES_SEED);
  const [myProducts, setMyProducts] = useState(MY_PRODUCTS_SEED);
  const [myServices, setMyServices] = useState(MY_SERVICES_SEED);
  const [propertyForm, setPropertyForm] = useState(null); // null | 'new' | listing object
  const [productForm, setProductForm] = useState(null);
  const [serviceForm, setServiceForm] = useState(null);
  const [inquiriesFor, setInquiriesFor] = useState(null);
  const [identityVerification, setIdentityVerification] = useState("unverified"); // unverified | pending | verified
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  // Jobs board
  const [jobs, setJobs] = useState(JOBS_SEED);
  const [applications, setApplications] = useState([]);
  const [jobsTab, setJobsTab] = useState("browse");
  const [activeJob, setActiveJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [jobForm, setJobForm] = useState(null); // null | 'new' | job object

  const filteredProducts = useMemo(() => {
    if (!query) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  /* ---------------- Header ---------------- */

  function Header() {
    return (
      <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: theme.border, background: dark ? "rgba(14,22,19,0.95)" : "rgba(255,255,255,0.95)" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button onClick={() => goto("home")} className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-bold" style={{ background: `linear-gradient(135deg, ${BRAND.emerald}, ${BRAND.forest})` }}>
              KT
            </div>
            <span className="hidden sm:block text-base font-bold" style={{ color: theme.text, fontFamily: "Fraunces, serif" }}>
              Kenyan Trade<span className="align-top text-[9px]">™</span>
            </span>
          </button>

          <button
            onClick={() => setLocationOpen(true)}
            className="hidden md:flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold shrink-0"
            style={{ borderColor: theme.border, color: theme.text }}
          >
            <MapPin size={13} color={BRAND.emerald} />
            {location.city}, {location.country}
            <ChevronDown size={13} />
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-sm text-left"
            style={{ background: dark ? "#1B2620" : BRAND.bg, color: theme.sub, border: `1px solid ${theme.border}` }}
          >
            <Search size={16} />
            {t("hero.search")}
          </button>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium shrink-0">
            {[
              ["nav.home", "home"], ["nav.marketplace", "marketplace"], ["nav.houses", "houses"], ["nav.services", "services"],
              ["nav.business", "business"], ["nav.jobs", "jobs"], ["nav.education", "education"], ["nav.finance", "finance"], ["nav.transport", "transport"], ["nav.delivery", "delivery"],
            ].map(([key, v]) => (
              <button key={v} onClick={() => goto(v)} className="rounded-lg px-2.5 py-1.5 hover:bg-slate-50" style={{ color: view === v ? BRAND.emerald : theme.text }}>
                {t(key)}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-1 rounded-full border p-0.5 shrink-0" style={{ borderColor: theme.border }}>
            <button onClick={() => setLang("en")} className="rounded-full px-2 py-1 text-[11px] font-bold" style={{ background: lang === "en" ? BRAND.emerald : "transparent", color: lang === "en" ? "white" : theme.text }}>EN</button>
            <button onClick={() => setLang("sw")} className="rounded-full px-2 py-1 text-[11px] font-bold" style={{ background: lang === "sw" ? BRAND.emerald : "transparent", color: lang === "sw" ? "white" : theme.text }}>SW</button>
          </div>
          <button onClick={() => setDark((d) => !d)} className="hidden sm:flex rounded-full border p-2 shrink-0" style={{ borderColor: theme.border }}>
            {dark ? <Sun size={15} color={BRAND.gold} /> : <Moon size={15} color={theme.text} />}
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <IconBtn onClick={() => setNotifOpen(true)} icon={Bell} badge={3} />
            <IconBtn onClick={() => setMsgOpen(true)} icon={MessageCircle} badge={1} />
            <IconBtn onClick={() => setCartOpen(true)} icon={ShoppingCart} badge={cart.length || null} />
            <IconBtn onClick={() => setProfileOpen(true)} icon={User} />
          </div>
        </div>
      </header>
    );
  }

  function IconBtn({ icon: Icon, onClick, badge }) {
    return (
      <button onClick={onClick} className="relative rounded-full p-2 hover:bg-slate-100">
        <Icon size={19} color={BRAND.text} />
        {badge ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: BRAND.error }}>
            {badge}
          </span>
        ) : null}
      </button>
    );
  }

  function BottomNav() {
    const items = [
      ["bottomnav.home", "home", HomeIcon], ["bottomnav.search", "search", Search], ["bottomnav.market", "marketplace", Store],
      ["bottomnav.business", "business", LayoutDashboard], ["bottomnav.profile", "profile", User],
    ];
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t py-2 lg:hidden" style={{ borderColor: theme.border, background: theme.card }}>
        {items.map(([key, v, Icon]) => (
          <button
            key={v}
            onClick={() => (v === "search" ? setSearchOpen(true) : v === "profile" ? setProfileOpen(true) : goto(v))}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <Icon size={20} color={view === v ? BRAND.emerald : theme.sub} />
            <span className="text-[10px] font-semibold" style={{ color: view === v ? BRAND.emerald : theme.sub }}>{t(key)}</span>
          </button>
        ))}
      </div>
    );
  }

  /* ---------------- HOME ---------------- */

  function HomeView() {
    return (
      <div>
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${BRAND.forest}, ${BRAND.emerald})` }}>
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: "rgba(212,167,44,0.18)", color: BRAND.goldLight }}>
              <Sparkles size={12} /> Mountlion AI™ · Kenyan Trade Business™ now live
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl font-bold leading-tight text-white" style={{ fontFamily: "Fraunces, serif" }}>
              {t("hero.title1")} <span style={{ color: BRAND.goldLight }}>{t("hero.title2")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base" style={{ color: "#DCEAE4" }}>
              {t("hero.subtitle")}
            </p>
            <button
              onClick={() => setSearchOpen(true)}
              className="mx-auto mt-7 flex max-w-lg items-center gap-2 rounded-full bg-white px-5 py-3.5 text-left text-sm text-slate-500 shadow-lg"
            >
              <Search size={17} color={BRAND.emerald} />
              {t("hero.search")}
            </button>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <GoldButton icon={Wrench} onClick={() => goto("services")}>{t("hero.exploreServices")}</GoldButton>
              <button onClick={() => goto("manage")} className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {t("hero.startSelling")}
              </button>
              <button onClick={() => goto("business")} className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {t("hero.manageBusiness")}
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionHeader eyebrow="Browse" title="Categories" />
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => goto(c.view)} className="flex flex-col items-center gap-2 rounded-2xl border p-3 text-center hover:shadow-md transition" style={{ borderColor: theme.border, background: theme.card }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#E7F3EE" }}>
                  <c.icon size={19} color={BRAND.emerald} />
                </div>
                <span className="text-[11px] font-semibold leading-tight" style={{ color: theme.text }}>{t(`category.${c.id}`)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <SectionHeader eyebrow="Near you" title={`Featured in ${location.city}`} action={<button onClick={() => goto("marketplace")} className="flex items-center gap-1 text-sm font-semibold" style={{ color: BRAND.emerald }}>See all <ChevronRight size={15} /></button>} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <SectionHeader eyebrow="Popular" title="Services near you" action={<button onClick={() => goto("services")} className="flex items-center gap-1 text-sm font-semibold" style={{ color: BRAND.emerald }}>See all <ChevronRight size={15} /></button>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.slice(0, 3).map((s) => <ServiceCard key={s.id} s={s} />)}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <SectionHeader eyebrow="Homes" title="Real estate" action={<button onClick={() => goto("houses")} className="flex items-center gap-1 text-sm font-semibold" style={{ color: BRAND.emerald }}>See all <ChevronRight size={15} /></button>} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HOUSES.slice(0, 4).map((h) => <HouseCard key={h.id} h={h} />)}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: `linear-gradient(120deg, ${BRAND.forest}, ${BRAND.emerald})` }}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: BRAND.goldLight }}>Advertise with us</div>
              <div className="text-xl font-bold" style={{ fontFamily: "Fraunces, serif" }}>Put your business in front of buyers today</div>
            </div>
            <GoldButton icon={Megaphone} onClick={() => goto("advertising")}>Create Advertisement</GoldButton>
          </div>
        </section>

        <MapPreview />
      </div>
    );
  }

  function MapPreview() {
    const [mapMode, setMapMode] = useState("map"); // 'map' | 'satellite'
    const [selectedId, setSelectedId] = useState(null);
    const [travelMode, setTravelMode] = useState("drive"); // 'drive' | 'walk' | 'transit'
    const dest = MAP_DESTINATIONS.find((d) => d.id === selectedId);

    const satellite = mapMode === "satellite";
    const bg = satellite
      ? "radial-gradient(circle at 30% 30%, #2f5a3d, #16351f 60%), radial-gradient(circle at 70% 75%, #3c6b46, transparent 55%)"
      : "linear-gradient(135deg,#EFF6F1,#E3EFE7)";

    const eta = dest ? { drive: dest.drive, walk: dest.walk, transit: dest.transit }[travelMode] : null;

    return (
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <SectionHeader
          eyebrow="Around you"
          title="Map preview"
          action={
            <div className="flex items-center gap-1 rounded-full border p-1" style={{ borderColor: "#DCE7E1", background: "white" }}>
              <button
                onClick={() => setMapMode("map")}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: !satellite ? BRAND.emerald : "transparent", color: !satellite ? "white" : BRAND.text }}
              >
                <Layers size={13} /> Map
              </button>
              <button
                onClick={() => setMapMode("satellite")}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: satellite ? BRAND.emerald : "transparent", color: satellite ? "white" : BRAND.text }}
              >
                <Satellite size={13} /> Satellite
              </button>
            </div>
          }
        />

        <div className="relative h-64 overflow-hidden rounded-2xl border" style={{ borderColor: "#EAF0EC", background: bg }}>
          {!satellite && (
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#D8E6DE 1px, transparent 1px), linear-gradient(90deg, #D8E6DE 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          )}
          {satellite && (
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
          )}

          {/* Route line */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="routeArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={satellite ? "#F4E3A1" : BRAND.emerald} />
              </marker>
            </defs>
            {dest && (
              <line
                x1={MAP_ORIGIN.x} y1={MAP_ORIGIN.y} x2={dest.x} y2={dest.y}
                stroke={satellite ? "#F4E3A1" : BRAND.emerald}
                strokeWidth="1.1"
                strokeDasharray="3,2.5"
                markerEnd="url(#routeArrow)"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* Origin pin */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${MAP_ORIGIN.x}%`, top: `${MAP_ORIGIN.y}%` }}>
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white shadow" style={{ background: BRAND.info }} />
            <div className="mt-1 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-bold shadow" style={{ background: "white", color: BRAND.text, position: "relative", left: "50%" }}>You</div>
          </div>

          {/* Destination pins */}
          {MAP_DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id === selectedId ? null : d.id)}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <MapPin size={selectedId === d.id ? 30 : 24} color={satellite ? "#FFFFFF" : BRAND.emerald} fill={selectedId === d.id ? BRAND.gold : (satellite ? BRAND.emerald : BRAND.gold)} />
            </button>
          ))}

          <div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow" style={{ color: BRAND.text }}>
            {location.city}, {location.region}
          </div>
        </div>

        {/* Directions panel */}
        <div className="mt-3 rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
          {!dest ? (
            <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.textSub }}>
              <Navigation size={14} color={BRAND.emerald} /> Tap a pin on the map to get directions and estimated travel time.
            </div>
          ) : (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold" style={{ color: BRAND.text }}>Directions to {dest.name}</div>
                  <div className="text-[11px]" style={{ color: BRAND.textSub }}>{dest.type} · {dest.distance}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{eta}</div>
                  <div className="text-[10px]" style={{ color: BRAND.textSub }}>estimated time</div>
                </div>
              </div>
              <div className="flex gap-2">
                {[["drive", "Driving", Car], ["walk", "Walking", Footprints], ["transit", "Transit", Bus]].map(([id, label, Icon]) => (
                  <button
                    key={id}
                    onClick={() => setTravelMode(id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold"
                    style={{ borderColor: travelMode === id ? BRAND.emerald : "#DCE7E1", background: travelMode === id ? "#E7F3EE" : "white", color: travelMode === id ? BRAND.emerald : BRAND.text }}
                  >
                    <Icon size={13} /> {label} · {{ drive: dest.drive, walk: dest.walk, transit: dest.transit }[id]}
                  </button>
                ))}
              </div>
              <GhostButton className="mt-3 w-full !py-2 text-xs" onClick={() => notify(`Directions to ${dest.name} opened`)}>Start navigation</GhostButton>
            </div>
          )}
        </div>
      </section>
    );
  }

  function ProductCard({ p }) {
    return (
      <div className="group rounded-2xl border bg-white p-3 hover:shadow-md transition" style={{ borderColor: "#EAF0EC" }}>
        <button onClick={() => setActiveProduct(p)} className="block w-full text-left">
          <div className="mb-3 flex h-28 items-center justify-center rounded-xl text-5xl" style={{ background: BRAND.bg }}>{p.img}</div>
          <div className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: BRAND.text }}>{p.name}</div>
          <div className="mt-1 text-base font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(p.price)}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px]" style={{ color: BRAND.textSub }}>
            <MapPin size={11} /> {p.location} · <Star size={11} fill={BRAND.gold} color={BRAND.gold} /> {p.rating}
          </div>
          {p.verified && <div className="mt-1"><Verified small /></div>}
        </button>
        <div className="mt-3 flex gap-2">
          <GhostButton className="flex-1 !px-2 !py-2 text-xs" onClick={() => notify(`Saved ${p.name}`)}>Save</GhostButton>
          <PrimaryButton className="flex-1 !px-2 !py-2 text-xs" onClick={() => addToCart(p)}>Add to cart</PrimaryButton>
        </div>
      </div>
    );
  }

  function ServiceCard({ s }) {
    return (
      <button onClick={() => setActiveService(s)} className="text-left rounded-2xl border bg-white p-4 hover:shadow-md transition" style={{ borderColor: "#EAF0EC" }}>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#E7F3EE" }}>
            <s.icon size={19} color={BRAND.emerald} />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: BRAND.text }}>{s.name}</div>
            <div className="text-[11px]" style={{ color: BRAND.textSub }}>{s.category}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px]" style={{ color: BRAND.textSub }}>
          <span className="flex items-center gap-1"><MapPin size={11} /> {s.location} · {s.distance}</span>
          <Badge tone={s.open ? "emerald" : "error"}>{s.open ? "Open" : "Closed"}</Badge>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-semibold"><Star size={12} fill={BRAND.gold} color={BRAND.gold} /> {s.rating}</span>
          <span className="text-xs font-semibold" style={{ color: BRAND.emerald }}>{s.price}</span>
        </div>
      </button>
    );
  }

  function HouseCard({ h }) {
    return (
      <button onClick={() => setActiveHouse(h)} className="text-left rounded-2xl border bg-white p-3 hover:shadow-md transition" style={{ borderColor: "#EAF0EC" }}>
        <div className="relative mb-3 flex h-28 items-center justify-center rounded-xl text-5xl" style={{ background: BRAND.bg }}>
          {h.img}
          {h.verified && <div className="absolute top-2 right-2"><Badge tone="emerald">Verified</Badge></div>}
        </div>
        <div className="text-sm font-semibold line-clamp-1" style={{ color: BRAND.text }}>{h.title}</div>
        <div className="mt-1 text-base font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>
          {KES(h.price)}{h.period === "month" ? "/mo" : ""}
        </div>
        <div className="mt-1 text-[11px]" style={{ color: BRAND.textSub }}>{h.location} · {h.distance}</div>
        {h.beds > 0 && <div className="mt-1 text-[11px]" style={{ color: BRAND.textSub }}>{h.beds} bed · {h.baths} bath · {h.type}</div>}
      </button>
    );
  }

  /* ---------------- MARKETPLACE ---------------- */

  function MarketplaceView() {
    const [layout, setLayout] = useState("grid");
    const cats = ["All", "Electronics", "Phones", "Fashion", "Home", "Furniture", "Vehicles", "Food"];
    const [cat, setCat] = useState("All");
    const list = filteredProducts.filter((p) => cat === "All" || p.category === cat);
    return (
      <PageShell title="Marketplace" subtitle="Buy and sell products across Kenya, from anywhere.">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: cat === c ? BRAND.emerald : "#DCE7E1", background: cat === c ? "#E7F3EE" : "white", color: cat === c ? BRAND.emerald : BRAND.text }}>
              {c}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setLayout("grid")} className="rounded-lg p-2" style={{ background: layout === "grid" ? "#E7F3EE" : "white", border: "1px solid #DCE7E1" }}><Grid3x3 size={15} color={BRAND.emerald} /></button>
            <button onClick={() => setLayout("list")} className="rounded-lg p-2" style={{ background: layout === "list" ? "#E7F3EE" : "white", border: "1px solid #DCE7E1" }}><ListIcon size={15} color={BRAND.emerald} /></button>
          </div>
        </div>
        <div className={layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
          {list.map((p) => layout === "grid" ? <ProductCard key={p.id} p={p} /> : <ProductRow key={p.id} p={p} />)}
        </div>
      </PageShell>
    );
  }

  function ProductRow({ p }) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border bg-white p-3" style={{ borderColor: "#EAF0EC" }}>
        <button onClick={() => setActiveProduct(p)} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl" style={{ background: BRAND.bg }}>{p.img}</button>
        <button onClick={() => setActiveProduct(p)} className="flex-1 text-left">
          <div className="text-sm font-semibold" style={{ color: BRAND.text }}>{p.name}</div>
          <div className="text-[11px]" style={{ color: BRAND.textSub }}>{p.seller} · {p.location}</div>
        </button>
        <div className="text-right">
          <div className="text-sm font-bold" style={{ color: BRAND.emerald }}>{KES(p.price)}</div>
          <button onClick={() => addToCart(p)} className="mt-1 text-[11px] font-semibold" style={{ color: BRAND.gold }}>+ Add to cart</button>
        </div>
      </div>
    );
  }

  function ProductDetailModal() {
    const p = activeProduct;
    if (!p) return null;
    return (
      <Modal open={!!p} onClose={() => setActiveProduct(null)} title="Product details" wide>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex h-52 items-center justify-center rounded-2xl text-8xl" style={{ background: BRAND.bg }}>{p.img}</div>
          <div>
            <h4 className="text-lg font-bold" style={{ color: BRAND.text }}>{p.name}</h4>
            <div className="mt-1 text-2xl font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(p.price)}</div>
            <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: BRAND.textSub }}>
              <Star size={13} fill={BRAND.gold} color={BRAND.gold} /> {p.rating} rating {p.verified && <Verified small />}
            </div>
            <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "#EAF0EC" }}>
              <div className="text-xs font-semibold" style={{ color: BRAND.text }}>{p.seller}</div>
              <div className="flex items-center gap-1 text-[11px] mt-0.5" style={{ color: BRAND.textSub }}><MapPin size={11} /> {p.location}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <GhostButton icon={MessageCircle} full onClick={() => notify("Chat opened with seller")}>Chat</GhostButton>
              <PrimaryButton icon={ShoppingCart} full onClick={() => { addToCart(p); }}>Add to cart</PrimaryButton>
            </div>
            <GoldButton className="mt-2 w-full" onClick={() => { addToCart(p); setActiveProduct(null); setCartOpen(true); setCheckoutStep(1); }}>Buy now</GoldButton>
          </div>
        </div>
      </Modal>
    );
  }

  function CartDrawer() {
    return (
      <Modal open={cartOpen} onClose={() => { setCartOpen(false); setCheckoutStep(0); }} title={checkoutStep === 0 ? "Your cart" : checkoutStep === 1 ? "Review order" : checkoutStep === 2 ? "Payment" : "Order confirmed"}>
        {checkoutStep === 0 && (
          <>
            {cart.length === 0 ? (
              <div className="py-10 text-center text-sm" style={{ color: BRAND.textSub }}>Your cart is empty.</div>
            ) : (
              <div className="space-y-3">
                {cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 rounded-xl border p-2.5" style={{ borderColor: "#EAF0EC" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl" style={{ background: BRAND.bg }}>{i.img}</div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold" style={{ color: BRAND.text }}>{i.name}</div>
                      <div className="text-xs font-bold" style={{ color: BRAND.emerald }}>{KES(i.price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(i.id, -1)} className="rounded-full border p-1"><Minus size={12} /></button>
                      <span className="w-4 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => changeQty(i.id, 1)} className="rounded-full border p-1"><Plus size={12} /></button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t pt-3 text-sm font-bold" style={{ borderColor: "#EAF0EC" }}>
                  <span>Total</span><span style={{ color: BRAND.emerald }}>{KES(cartTotal)}</span>
                </div>
                <PrimaryButton full onClick={() => setCheckoutStep(1)}>Proceed to checkout</PrimaryButton>
              </div>
            )}
          </>
        )}
        {checkoutStep === 1 && (
          <div className="space-y-3">
            {cart.map((i) => (
              <div key={i.id} className="flex justify-between text-sm"><span>{i.name} × {i.qty}</span><span className="font-semibold">{KES(i.price * i.qty)}</span></div>
            ))}
            <div className="flex justify-between border-t pt-3 text-sm font-bold" style={{ borderColor: "#EAF0EC" }}><span>Total</span><span style={{ color: BRAND.emerald }}>{KES(cartTotal)}</span></div>
            <div className="rounded-xl border p-3 text-xs" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>
              Delivery to: {location.city}, {location.region} — Standard delivery (1–3 days)
            </div>
            <PrimaryButton full onClick={() => setCheckoutStep(2)}>Continue to payment</PrimaryButton>
          </div>
        )}
        {checkoutStep === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: BRAND.text }}>Kenyan Trade Pay™</span>
              <StatusTag status="demo" />
            </div>
            {[["M-Pesa", Smartphone], ["Airtel Money", Smartphone], ["Card", CreditCard], ["Cash on delivery", Banknote]].map(([label, Icon]) => (
              <button key={label} onClick={() => { setCheckoutStep(3); }} className="flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:border-emerald-400" style={{ borderColor: "#EAF0EC" }}>
                <Icon size={18} color={BRAND.emerald} />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        )}
        {checkoutStep === 3 && (
          <div className="py-6 text-center">
            <CheckCircle2 size={48} color={BRAND.success} className="mx-auto mb-3" />
            <div className="text-base font-bold" style={{ color: BRAND.text }}>Order confirmed!</div>
            <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>Order #KT-{Math.floor(10000 + Math.random() * 89999)} · Track in Orders</div>
            <div className="mt-4 rounded-xl border p-3 text-left text-xs space-y-1" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex justify-between"><span>Order placed</span><CheckCircle2 size={14} color={BRAND.success} /></div>
              <div className="flex justify-between text-slate-400"><span>Preparing</span><Clock size={14} /></div>
              <div className="flex justify-between text-slate-400"><span>Out for delivery</span><Clock size={14} /></div>
              <div className="flex justify-between text-slate-400"><span>Delivered</span><Clock size={14} /></div>
            </div>
            <PrimaryButton className="mt-4" onClick={() => { setCart([]); setCheckoutStep(0); setCartOpen(false); }}>Done</PrimaryButton>
          </div>
        )}
      </Modal>
    );
  }

  /* ---------------- GENERAL REAL ESTATE MANAGEMENT ---------------- */

  function HousesView() {
    const [reTab, setReTab] = useState("browse");
    const tabs = [
      ["browse", "Browse", HomeIcon],
      ["hunting", "House Hunting", Target],
      ["land", "Land & Commercial", Building2],
      ["management", "Property Management", Wrench],
      ["agents", "Agents & Agencies", Users],
      ["valuation", "Valuation", Calculator],
    ];
    return (
      <PageShell title="General Real Estate Management" subtitle="Buy, rent, hunt for homes, manage rentals, and connect with verified agents — all in one place.">
        <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border p-4" style={{ borderColor: "#EAF0EC", background: "#FBFDFC" }}>
          <div className="text-xs" style={{ color: BRAND.textSub }}>Are you a landlord or agent? List your property, upload photos and documents, and manage inquiries in one place.</div>
          <PrimaryButton icon={Plus} onClick={() => { goto("manage"); setManageTab("properties"); setPropertyForm("new"); }}>List your property</PrimaryButton>
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto pb-1">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setReTab(id)} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold" style={{ background: reTab === id ? BRAND.emerald : "white", color: reTab === id ? "white" : BRAND.text, border: "1px solid #DCE7E1" }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {reTab === "browse" && <REBrowse />}
        {reTab === "hunting" && <REHouseHunting />}
        {reTab === "land" && <RELandCommercial />}
        {reTab === "management" && <REPropertyManagement />}
        {reTab === "agents" && <REAgents />}
        {reTab === "valuation" && <REValuation />}
      </PageShell>
    );
  }

  function REBrowse() {
    const [type, setType] = useState("All");
    const [purpose, setPurpose] = useState("All");
    const [minBeds, setMinBeds] = useState(0);
    const [maxPrice, setMaxPrice] = useState(20000000);

    const residential = HOUSES.filter((h) => ["Apartment", "House", "Bedsitter"].includes(h.type));
    const filtered = residential.filter((h) =>
      (type === "All" || h.type === type) &&
      (purpose === "All" || (purpose === "Rent" && h.period === "month") || (purpose === "Sale" && h.period === "sale")) &&
      h.beds >= minBeds &&
      h.price <= maxPrice
    );

    return (
      <div>
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            {["All", "Rent", "Sale"].map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            {["All", "Apartment", "House", "Bedsitter"].map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={minBeds} onChange={(e) => setMinBeds(+e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 0 ? "Any beds" : `${n}+ bed`}</option>)}
          </select>
          <select value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            {[50000, 100000, 500000, 2000000, 8000000, 20000000].map((p) => <option key={p} value={p}>Up to {KES(p)}</option>)}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No listings match those filters yet.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((h) => <HouseCard key={h.id} h={h} />)}
          </div>
        )}
      </div>
    );
  }

  function REHouseHunting() {
    const [prefs, setPrefs] = useState({ purpose: "Rent", budget: 60000, beds: 2, area: "" });
    const [matches, setMatches] = useState(null);
    const set = (k, v) => setPrefs({ ...prefs, [k]: v });

    const runMatch = () => {
      const results = HOUSES.filter((h) => {
        const purposeOk = prefs.purpose === "Rent" ? h.period === "month" : h.period === "sale";
        const priceOk = h.price <= prefs.budget * 1.15;
        const bedsOk = prefs.beds === 0 || h.beds >= prefs.beds;
        const areaOk = !prefs.area || h.location.toLowerCase().includes(prefs.area.toLowerCase());
        return purposeOk && priceOk && bedsOk && areaOk;
      }).map((h) => {
        let score = 55;
        if (h.price <= prefs.budget) score += 20;
        if (prefs.area && h.location.toLowerCase().includes(prefs.area.toLowerCase())) score += 15;
        if (prefs.beds && h.beds === prefs.beds) score += 10;
        return { ...h, match: Math.min(99, score) };
      }).sort((a, b) => b.match - a.match);
      setMatches(results);
    };

    return (
      <div>
        <div className="mb-5 rounded-2xl border bg-white p-5" style={{ borderColor: "#EAF0EC" }}>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ color: BRAND.text }}>
            <Target size={16} color={BRAND.emerald} /> Tell us what you're house hunting for
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Purpose</span>
              <select value={prefs.purpose} onChange={(e) => set("purpose", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
                {["Rent", "Buy"].map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Preferred area</span>
              <input value={prefs.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. Kilimani, Nairobi" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Budget {prefs.purpose === "Rent" ? "(per month)" : ""}</span>
              <input type="range" min={prefs.purpose === "Rent" ? 5000 : 500000} max={prefs.purpose === "Rent" ? 200000 : 15000000} step={prefs.purpose === "Rent" ? 5000 : 100000} value={prefs.budget} onChange={(e) => set("budget", +e.target.value)} className="w-full" />
              <div className="text-sm font-semibold" style={{ color: BRAND.emerald }}>{KES(prefs.budget)}</div>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Bedrooms</span>
              <select value={prefs.beds} onChange={(e) => set("beds", +e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
                {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 0 ? "Any" : `${n}+`}</option>)}
              </select>
            </label>
          </div>
          <PrimaryButton className="mt-4" icon={Search} onClick={runMatch}>Find matches</PrimaryButton>
        </div>

        {matches && (
          matches.length === 0 ? (
            <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No matches yet — try widening your budget or area.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {matches.map((h) => (
                <div key={h.id} className="relative">
                  <div className="absolute -top-2 left-2 z-10"><Badge tone="gold">{h.match}% match</Badge></div>
                  <HouseCard h={h} />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  }

  function RELandCommercial() {
    const items = HOUSES.filter((h) => ["Land", "Office", "Shop", "Commercial"].includes(h.type));
    return (
      <div>
        <div className="mb-4 text-xs" style={{ color: BRAND.textSub }}>Land parcels, offices, shops and commercial spaces for business and investment.</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((h) => <HouseCard key={h.id} h={h} />)}
        </div>
      </div>
    );
  }

  function REPropertyManagement() {
    const [form, setForm] = useState({ address: "", service: "Full management", notes: "" });
    const [submitted, setSubmitted] = useState(false);
    const services = [
      { title: "Rent collection", desc: "We collect rent on your behalf and remit it directly, on time.", icon: Wallet },
      { title: "Maintenance coordination", desc: "Tenants raise requests; we coordinate vetted, verified contractors.", icon: Wrench },
      { title: "Tenant screening", desc: "Background and reference checks before any tenant moves in.", icon: UserCheck },
      { title: "Full management", desc: "End-to-end: marketing, tenants, rent, maintenance and reporting.", icon: Building2 },
    ];
    return (
      <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#E7F3EE" }}><s.icon size={16} color={BRAND.emerald} /></div>
              <div className="text-sm font-bold mb-1" style={{ color: BRAND.text }}>{s.title}</div>
              <div className="text-[11px]" style={{ color: BRAND.textSub }}>{s.desc}</div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <div className="max-w-lg rounded-2xl border bg-white p-5" style={{ borderColor: "#EAF0EC" }}>
            <div className="text-sm font-bold mb-3">Request property management</div>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Property address</span>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Service needed</span>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
                  {services.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Notes</span>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
              </label>
              <PrimaryButton full disabled={!form.address} onClick={() => form.address && setSubmitted(true)}>Request management</PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="max-w-lg rounded-2xl border p-5 text-center" style={{ borderColor: "#EAF0EC" }}>
            <CheckCircle2 size={40} color={BRAND.success} className="mx-auto mb-2" />
            <div className="font-bold text-sm">Request received</div>
            <div className="text-xs mt-1" style={{ color: BRAND.textSub }}>A property manager will contact you within 24 hours about {form.address}.</div>
          </div>
        )}
      </div>
    );
  }

  function REAgents() {
    const [expanded, setExpanded] = useState(null);
    const agent = REAL_ESTATE_AGENTS.find((a) => a.id === expanded);
    return (
      <div>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {REAL_ESTATE_AGENTS.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-white" style={{ background: BRAND.emerald }}>{a.name[0]}</div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: BRAND.text }}>{a.name} {a.verified && <Verified small />}</div>
                  <div className="text-[11px]" style={{ color: BRAND.textSub }}>{a.type} · {a.location}</div>
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1"><Star size={12} fill={BRAND.gold} color={BRAND.gold} /> {a.rating}</span>
                <span style={{ color: BRAND.textSub }}>{a.listings} active listings</span>
              </div>
              <div className="flex gap-2">
                <GhostButton className="flex-1 !py-2 text-xs" icon={MessageCircle} onClick={() => notify(`Chat opened with ${a.name}`)}>Contact</GhostButton>
                <GhostButton className="flex-1 !py-2 text-xs" icon={Building2} onClick={() => setExpanded(expanded === a.id ? null : a.id)}>
                  {expanded === a.id ? "Hide listings" : "View listings"}
                </GhostButton>
              </div>
            </div>
          ))}
        </div>
        {agent && (
          <div>
            <div className="mb-2 text-xs font-semibold" style={{ color: BRAND.textSub }}>{agent.name} — active listings</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {HOUSES.filter((h) => h.agent === agent.name).map((h) => <HouseCard key={h.id} h={h} />)}
            </div>
          </div>
        )}
      </div>
    );
  }

  function REValuation() {
    const [form, setForm] = useState({ address: "", type: "Apartment", size: "", purpose: "Sale" });
    const [result, setResult] = useState(null);
    const set = (k, v) => setForm({ ...form, [k]: v });

    const estimate = () => {
      if (!form.address || !form.size) return;
      const base = { Apartment: 6500000, House: 9000000, Bedsitter: 2200000, Land: 1800000, Office: 12000000, Shop: 5000000 }[form.type] || 5000000;
      const sizeFactor = Math.max(0.6, Math.min(2.4, Number(form.size) / 1000));
      const est = Math.round((base * sizeFactor) / 50000) * 50000;
      setResult({ low: Math.round(est * 0.9), high: Math.round(est * 1.12) });
    };

    return (
      <div className="max-w-lg">
        <div className="mb-4 flex items-start gap-2 rounded-xl border p-3 text-xs" style={{ borderColor: "#F4E3A1", background: "#FBF3DC", color: "#8A6B10" }}>
          <AlertTriangle size={14} className="mt-0.5 shrink-0" /> This is a rough, automated demo estimate — not a certified valuation. Certified valuations require a licensed valuer site visit.
        </div>
        <div className="space-y-3 rounded-2xl border bg-white p-5" style={{ borderColor: "#EAF0EC" }}>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Property address</span>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Property type</span>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
                {["Apartment", "House", "Bedsitter", "Land", "Office", "Shop"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Size (sq. ft.)</span>
              <input value={form.size} onChange={(e) => set("size", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Purpose</span>
            <select value={form.purpose} onChange={(e) => set("purpose", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {["Sale", "Rent", "Mortgage"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <PrimaryButton full icon={Calculator} disabled={!form.address || !form.size} onClick={estimate}>Get estimate</PrimaryButton>
        </div>
        {result && (
          <div className="mt-4 rounded-2xl border p-5 text-center" style={{ borderColor: "#EAF0EC", background: "#E7F3EE" }}>
            <div className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Estimated value range</div>
            <div className="mt-1 text-xl font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(result.low)} – {KES(result.high)}</div>
          </div>
        )}
      </div>
    );
  }

  function HouseDetailModal() {
    const h = activeHouse;
    const [inquirySent, setInquirySent] = useState(false);
    if (!h) return null;
    return (
      <Modal open={!!h} onClose={() => { setActiveHouse(null); setInquirySent(false); }} title={h.title} wide>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex h-44 items-center justify-center rounded-2xl text-7xl" style={{ background: BRAND.bg }}>{h.img}</div>
            <div className="mt-3 h-32 rounded-xl" style={{ background: "linear-gradient(135deg,#EFF6F1,#E3EFE7)" }}>
              <div className="flex h-full items-center justify-center text-xs font-semibold" style={{ color: BRAND.textSub }}>
                <MapPin size={14} className="mr-1" color={BRAND.emerald} /> Map preview — {h.location}
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(h.price)}{h.period === "month" ? "/mo" : ""}</div>
            <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>{h.location} · {h.distance} away</div>
            {h.beds > 0 && <div className="mt-2 flex gap-3 text-xs font-semibold" style={{ color: BRAND.text }}><span>{h.beds} bed</span><span>{h.baths} bath</span><span>{h.type}</span></div>}
            {h.verified && <div className="mt-2"><Verified small /></div>}
            <div className="mt-3 rounded-xl border p-3 text-xs" style={{ borderColor: "#EAF0EC" }}>Listed by <span className="font-semibold">{h.agent}</span></div>
            {!inquirySent ? (
              <>
                <div className="mt-3 flex gap-2">
                  <GhostButton icon={MessageCircle} full onClick={() => notify("Chat opened with agent")}>Chat</GhostButton>
                  <GhostButton icon={Star} full onClick={() => notify("Saved listing")}>Save</GhostButton>
                </div>
                <PrimaryButton full className="mt-2" onClick={() => setInquirySent(true)}>Send inquiry</PrimaryButton>
              </>
            ) : (
              <div className="mt-3 rounded-xl p-3 text-xs font-semibold" style={{ background: "#E7F3EE", color: BRAND.emerald }}>
                <CheckCircle2 size={14} className="inline mr-1" /> Inquiry sent to {h.agent}. They'll respond via chat.
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }

  /* ---------------- SERVICES / BOOKING ---------------- */

  function ServicesView() {
    return (
      <PageShell title="Services & Bookings" subtitle="Salons, mechanics, plumbers, electricians and more — book instantly.">
        <div className="mb-4 flex items-center justify-between rounded-2xl border p-4" style={{ borderColor: "#EAF0EC", background: "#FBFDFC" }}>
          <div className="text-xs" style={{ color: BRAND.textSub }}>Run a service business? List it, set your hours and pricing, and take bookings.</div>
          <PrimaryButton icon={Plus} onClick={() => { goto("manage"); setManageTab("services"); setServiceForm("new"); }}>List your service</PrimaryButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => <ServiceCard key={s.id} s={s} />)}
        </div>
      </PageShell>
    );
  }

  function ServiceDetailModal() {
    const s = activeService;
    if (!s) return null;
    return (
      <Modal open={!!s} onClose={() => setActiveService(null)} title={s.name} wide>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#E7F3EE" }}><s.icon size={20} color={BRAND.emerald} /></div>
          <div>
            <div className="text-sm font-bold">{s.category}</div>
            <div className="flex items-center gap-1 text-xs" style={{ color: BRAND.textSub }}><MapPin size={11} /> {s.location} · {s.distance}</div>
          </div>
          {s.verified && <div className="ml-auto"><Verified small /></div>}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
          <div className="rounded-lg border p-2" style={{ borderColor: "#EAF0EC" }}><Star size={13} fill={BRAND.gold} color={BRAND.gold} className="mx-auto mb-1" />{s.rating} rating</div>
          <div className="rounded-lg border p-2" style={{ borderColor: "#EAF0EC" }}><Clock size={13} className="mx-auto mb-1" color={BRAND.emerald} />{s.open ? "Open now" : "Closed"}</div>
          <div className="rounded-lg border p-2" style={{ borderColor: "#EAF0EC" }}><Banknote size={13} className="mx-auto mb-1" color={BRAND.emerald} />{s.price}</div>
        </div>
        <div className="flex gap-2 mb-3">
          <GhostButton icon={MessageCircle} full onClick={() => notify("Chat opened")}>Chat</GhostButton>
        </div>
        <PrimaryButton full icon={Calendar} onClick={() => { setBooking({ service: s, staff: STAFF[0], date: "", time: "", step: 1 }); setActiveService(null); }}>
          Book Now
        </PrimaryButton>
      </Modal>
    );
  }

  function BookingModal() {
    if (!booking) return null;
    const b = booking;
    const set = (patch) => setBooking({ ...b, ...patch });
    return (
      <Modal open={!!booking} onClose={() => setBooking(null)} title={`Book — ${b.service.name}`}>
        {b.step === 1 && (
          <div className="space-y-3">
            <div className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Choose staff</div>
            <div className="grid grid-cols-2 gap-2">
              {STAFF.map((st) => (
                <button key={st} onClick={() => set({ staff: st })} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: b.staff === st ? BRAND.emerald : "#DCE7E1", background: b.staff === st ? "#E7F3EE" : "white", color: b.staff === st ? BRAND.emerald : BRAND.text }}>
                  {st}
                </button>
              ))}
            </div>
            <PrimaryButton full onClick={() => set({ step: 2 })}>Continue</PrimaryButton>
          </div>
        )}
        {b.step === 2 && (
          <div className="space-y-3">
            <div className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Choose date</div>
            <input type="date" value={b.date} onChange={(e) => set({ date: e.target.value })} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            <div className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Choose time</div>
            <div className="grid grid-cols-3 gap-2">
              {TIMESLOTS.map((t) => (
                <button key={t} onClick={() => set({ time: t })} className="rounded-xl border p-2 text-xs font-semibold" style={{ borderColor: b.time === t ? BRAND.emerald : "#DCE7E1", background: b.time === t ? "#E7F3EE" : "white", color: b.time === t ? BRAND.emerald : BRAND.text }}>
                  {t}
                </button>
              ))}
            </div>
            <PrimaryButton full disabled={!b.date || !b.time} onClick={() => b.date && b.time && set({ step: 3 })}>Continue</PrimaryButton>
          </div>
        )}
        {b.step === 3 && (
          <div className="space-y-3">
            <div className="rounded-xl border p-3 text-xs space-y-1" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex justify-between"><span>Service</span><span className="font-semibold">{b.service.name}</span></div>
              <div className="flex justify-between"><span>Staff</span><span className="font-semibold">{b.staff}</span></div>
              <div className="flex justify-between"><span>Date</span><span className="font-semibold">{b.date}</span></div>
              <div className="flex justify-between"><span>Time</span><span className="font-semibold">{b.time}</span></div>
              <div className="flex justify-between"><span>Est. price</span><span className="font-semibold">{b.service.price}</span></div>
            </div>
            <div className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Payment method (demo)</div>
            <div className="grid grid-cols-2 gap-2">
              {["M-Pesa", "Pay at venue"].map((m) => (
                <button key={m} onClick={() => set({ step: 4 })} className="rounded-xl border p-2.5 text-xs font-semibold hover:border-emerald-400" style={{ borderColor: "#DCE7E1" }}>{m}</button>
              ))}
            </div>
          </div>
        )}
        {b.step === 4 && (
          <div className="py-6 text-center">
            <CheckCircle2 size={44} color={BRAND.success} className="mx-auto mb-3" />
            <div className="text-base font-bold">Booking confirmed!</div>
            <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>{b.service.name} · {b.date} at {b.time} with {b.staff}</div>
            <PrimaryButton className="mt-4" onClick={() => setBooking(null)}>Done</PrimaryButton>
          </div>
        )}
      </Modal>
    );
  }

  /* ---------------- JOBS ---------------- */

  function JobsView() {
    const tabs = [
      ["browse", t("jobs.browse"), Briefcase],
      ["applications", t("jobs.myApplications"), Inbox],
      ["post", t("jobs.postJob"), Plus],
    ];
    return (
      <PageShell title={`Kenyan Trade™ — ${t("jobs.title")}`} subtitle={t("jobs.subtitle")}>
        <div className="mb-5 flex items-center gap-2">
          <StatusTag status="demo" />
          <span className="text-[11px]" style={{ color: BRAND.textSub }}>Matching shown here is a transparent, criteria-based demo — not an automated hiring decision.</span>
        </div>
        <div className="mb-6 flex gap-1 overflow-x-auto pb-1">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setJobsTab(id)} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold" style={{ background: jobsTab === id ? BRAND.emerald : "white", color: jobsTab === id ? "white" : BRAND.text, border: "1px solid #DCE7E1" }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
        {jobsTab === "browse" && <JobsBrowse />}
        {jobsTab === "applications" && <JobsMyApplications />}
        {jobsTab === "post" && <JobsPost />}
      </PageShell>
    );
  }

  function JobCard({ job }) {
    return (
      <button onClick={() => setActiveJob(job)} className="w-full rounded-2xl border bg-white p-4 text-left hover:shadow-md transition" style={{ borderColor: "#EAF0EC" }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: BRAND.text }}>{job.title} {job.verified && <Verified small />}</div>
            <div className="mt-0.5 text-xs" style={{ color: BRAND.textSub }}>{job.company} · {job.location}</div>
          </div>
          <Badge tone="slate">{job.type}</Badge>
        </div>
        <div className="mt-2 text-sm font-bold" style={{ color: BRAND.emerald }}>{KES(job.salaryMin)} – {KES(job.salaryMax)}/mo</div>
        <div className="mt-2 flex items-center justify-between text-[11px]" style={{ color: BRAND.textSub }}>
          <span>{job.category}</span>
          <span>{t("jobs.posted")} {job.posted}</span>
        </div>
      </button>
    );
  }

  function JobsBrowse() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All");
    const filtered = jobs.filter((j) =>
      (!keyword || j.title.toLowerCase().includes(keyword.toLowerCase()) || j.company.toLowerCase().includes(keyword.toLowerCase())) &&
      (category === "All" || j.category === category) &&
      (type === "All" || j.type === type)
    );
    return (
      <div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 rounded-xl border p-2.5 sm:col-span-1" style={{ borderColor: "#DCE7E1" }}>
            <Search size={14} color={BRAND.textSub} />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={t("jobs.searchPlaceholder")} className="flex-1 text-sm outline-none" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            <option value="All">{t("jobs.allCategories")}</option>
            {JOB_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#DCE7E1" }}>
            <option value="All">{t("jobs.allTypes")}</option>
            {JOB_TYPES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>{t("jobs.noJobs")}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        )}
      </div>
    );
  }

  function JobsMyApplications() {
    return (
      <div>
        {applications.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>{t("jobs.noApplications")}</div>
        ) : (
          <div className="space-y-2">
            {applications.map((a) => (
              <div key={a.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: BRAND.text }}>{a.jobTitle}</div>
                    <div className="text-[11px]" style={{ color: BRAND.textSub }}>{a.company} · Applied {a.appliedAt}</div>
                  </div>
                  <Badge tone="gold">{a.status}</Badge>
                </div>
                {a.cvName && <div className="mt-2 flex items-center gap-1.5 text-[11px]" style={{ color: BRAND.textSub }}><FileText size={12} /> {a.cvName}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function JobsPost() {
    const mine = jobs.filter((j) => j.mine);
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm font-bold" style={{ color: BRAND.text }}>{t("jobs.myPostedJobs")}</div>
          <PrimaryButton icon={Plus} onClick={() => setJobForm("new")}>{t("jobs.postJob")}</PrimaryButton>
        </div>
        {mine.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>{t("jobs.noPostedJobs")}</div>
        ) : (
          <div className="space-y-2">
            {mine.map((j) => (
              <div key={j.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: BRAND.text }}>{j.title}</div>
                    <div className="text-[11px]" style={{ color: BRAND.textSub }}>{j.location} · {j.type} · {j.applicants} {t("jobs.applicants")}</div>
                  </div>
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Pencil} onClick={() => setJobForm(j)}>Edit</GhostButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function JobDetailModal() {
    const j = activeJob;
    if (!j) return null;
    return (
      <Modal open={!!j} onClose={() => setActiveJob(null)} title={j.title} wide>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="slate">{j.type}</Badge>
          <Badge tone="slate">{j.category}</Badge>
          {j.verified && <Verified small />}
        </div>
        <div className="text-xs" style={{ color: BRAND.textSub }}>{j.company} · {j.location}</div>
        <div className="mt-1 text-xl font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(j.salaryMin)} – {KES(j.salaryMax)}/mo</div>
        <p className="mt-3 text-sm" style={{ color: BRAND.text }}>{j.description}</p>
        <div className="mt-3 flex items-center justify-between text-[11px]" style={{ color: BRAND.textSub }}>
          <span>{t("jobs.posted")} {j.posted}</span>
          <span>{j.applicants} {t("jobs.applicants")}</span>
        </div>
        <PrimaryButton full icon={Briefcase} className="mt-4" onClick={() => { setApplyingJob(j); setActiveJob(null); }}>{t("jobs.applyNow")}</PrimaryButton>
      </Modal>
    );
  }

  function ApplyModal() {
    const j = applyingJob;
    const [cv, setCv] = useState([]);
    const [note, setNote] = useState("");
    const [name, setName] = useState("");
    if (!j) return null;
    return (
      <Modal open={!!j} onClose={() => setApplyingJob(null)} title={`${t("jobs.applyNow")} — ${j.title}`}>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Full name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.uploadCV")} ({cv.length})</span>
            <UploadBar files={cv} setFiles={setCv} accept="application/pdf,.doc,.docx" multiple={false} label="your CV" hint="PDF or Word document" />
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.coverNote")}</span>
            <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <PrimaryButton
            full
            disabled={!name}
            onClick={() => {
              if (!name) return;
              setApplications((list) => [{ id: "app" + Date.now(), jobId: j.id, jobTitle: j.title, company: j.company, cvName: cv[0]?.name || null, note, status: "Submitted", appliedAt: "Just now" }, ...list]);
              setJobs((list) => list.map((x) => x.id === j.id ? { ...x, applicants: x.applicants + 1 } : x));
              notify(t("jobs.applicationSubmitted"));
              setApplyingJob(null);
            }}
          >
            {t("jobs.submitApplication")}
          </PrimaryButton>
        </div>
      </Modal>
    );
  }

  function JobFormModal() {
    const editing = jobForm && jobForm !== "new" ? jobForm : null;
    const [f, setF] = useState(editing || { title: "", company: "", category: JOB_CATEGORIES[0], type: JOB_TYPES[0], location: "", salaryMin: "", salaryMax: "", description: "" });
    const [logo, setLogo] = useState([]);
    if (!jobForm) return null;
    const set = (k, v) => setF({ ...f, [k]: v });
    return (
      <Modal open={!!jobForm} onClose={() => setJobForm(null)} title={t("jobs.postJobTitle")} wide>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.jobTitleLabel")}</span>
            <input value={f.title} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.companyLabel")}</span>
            <input value={f.company} onChange={(e) => set("company", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.locationLabel")}</span>
            <input value={f.location} onChange={(e) => set("location", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.categoryLabel")}</span>
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {JOB_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.typeLabel")}</span>
            <select value={f.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {JOB_TYPES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Minimum salary (KSh/mo)</span>
            <input value={f.salaryMin} onChange={(e) => set("salaryMin", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Maximum salary (KSh/mo)</span>
            <input value={f.salaryMax} onChange={(e) => set("salaryMax", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{t("jobs.descriptionLabel")}</span>
            <textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div className="sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Company logo ({logo.length})</span>
            <UploadBar files={logo} setFiles={setLogo} accept="image/*" multiple={false} label="company logo" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <GhostButton full onClick={() => setJobForm(null)}>{t("common.cancel")}</GhostButton>
          <PrimaryButton
            full
            disabled={!f.title || !f.company || !f.location}
            onClick={() => {
              if (!f.title || !f.company || !f.location) return;
              const payload = { ...f, salaryMin: Number(f.salaryMin) || 0, salaryMax: Number(f.salaryMax) || 0 };
              if (editing) {
                setJobs((list) => list.map((x) => x.id === editing.id ? { ...x, ...payload } : x));
                notify("Job updated");
              } else {
                setJobs((list) => [{ id: "j" + Date.now(), posted: "Just now", verified: false, applicants: 0, mine: true, ...payload }, ...list]);
                notify(t("jobs.postButton"));
              }
              setJobForm(null);
            }}
          >
            {editing ? t("common.saveChanges") : t("jobs.postButton")}
          </PrimaryButton>
        </div>
      </Modal>
    );
  }

  /* ---------------- SIMPLE DIRECTORY VIEWS ---------------- */

  function EducationView() {
    const items = [
      { name: "University of Nairobi", type: "University", note: "Public university · Multiple campuses" },
      { name: "Strathmore University", type: "University", note: "Private university · Nairobi" },
      { name: "Nairobi Technical Training Institute", type: "TVET", note: "Technical & vocational training" },
      { name: "HELB — Loan Applications", type: "Student Services", note: "Official info via helb.co.ke" },
      { name: "HEF — Higher Education Financing", type: "Student Services", note: "Official info via government portal" },
    ];
    return (
      <PageShell title="Education & Student Services" subtitle="Universities, colleges, TVET, scholarships and HELB/HEF information.">
        <div className="rounded-xl border p-3 mb-4 text-xs flex items-center gap-2" style={{ borderColor: "#F4E3A1", background: "#FBF3DC", color: "#8A6B10" }}>
          <AlertTriangle size={14} /> Kenyan Trade is not HELB or a government agency — always confirm official details on the official government site.
        </div>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.name} className="flex items-center justify-between rounded-xl border bg-white p-3" style={{ borderColor: "#EAF0EC" }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: BRAND.text }}>{it.name}</div>
                <div className="text-[11px]" style={{ color: BRAND.textSub }}>{it.note}</div>
              </div>
              <Badge tone="slate">{it.type}</Badge>
            </div>
          ))}
        </div>
      </PageShell>
    );
  }

  function FinanceView() {
    const items = [
      { name: "KCB Bank — Kasarani Branch", type: "Bank", hours: "8:30 AM – 4:00 PM", loc: "Kasarani" },
      { name: "Equity Bank — CBD Branch", type: "Bank", hours: "8:30 AM – 4:30 PM", loc: "Nairobi CBD" },
      { name: "Stima SACCO", type: "SACCO", hours: "8:00 AM – 5:00 PM", loc: "Parklands" },
      { name: "Faulu Microfinance", type: "Microfinance", hours: "8:30 AM – 4:00 PM", loc: "Eastleigh" },
      { name: "Britam Insurance", type: "Insurance", hours: "8:00 AM – 5:00 PM", loc: "Upper Hill" },
    ];
    return (
      <PageShell title="Banking & Finance Directory" subtitle="Banks, ATMs, SACCOs, microfinance and insurance near you.">
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.name} className="flex items-center justify-between rounded-xl border bg-white p-3" style={{ borderColor: "#EAF0EC" }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: BRAND.text }}>{it.name}</div>
                <div className="text-[11px] flex items-center gap-2" style={{ color: BRAND.textSub }}><MapPin size={11} /> {it.loc} · <Clock size={11} /> {it.hours}</div>
              </div>
              <GhostButton className="!px-3 !py-1.5 text-xs">Directions</GhostButton>
            </div>
          ))}
        </div>
      </PageShell>
    );
  }

  function TransportView() {
    const routes = [
      { name: "Route 46 — CBD to Kasarani", eta: "8 min", status: "On time" },
      { name: "Route 24 — CBD to Ruiru", eta: "15 min", status: "Delayed" },
      { name: "Route 100 — CBD to Thika", eta: "22 min", status: "On time" },
    ];
    return (
      <PageShell title="Transport" subtitle="Matatu stages, routes, taxis and car hire.">
        <div className="space-y-2">
          {routes.map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-xl border bg-white p-3" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex items-center gap-3">
                <Bus size={18} color={BRAND.emerald} />
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-[11px]" style={{ color: BRAND.textSub }}>ETA {r.eta}</div>
                </div>
              </div>
              <Badge tone={r.status === "On time" ? "emerald" : "gold"}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </PageShell>
    );
  }

  function DeliveryView() {
    const [tracking, setTracking] = useState(false);
    const steps = ["Requested", "Accepted", "Picked Up", "In Transit", "Delivered"];
    const [step, setStep] = useState(2);
    return (
      <PageShell title="Oscarian Express Delivery" subtitle="Send parcels anywhere, tracked end to end.">
        {!tracking ? (
          <div className="max-w-md space-y-3">
            <Field label="Pickup location" defaultValue="Nairobi CBD" />
            <Field label="Destination" defaultValue="Mombasa" />
            <Field label="Parcel details" defaultValue="Documents, 1kg" />
            <div className="rounded-xl border p-3 flex justify-between text-sm" style={{ borderColor: "#EAF0EC" }}>
              <span>Delivery fee</span><span className="font-bold" style={{ color: BRAND.emerald }}>KSh 650</span>
            </div>
            <PrimaryButton full icon={Truck} onClick={() => setTracking(true)}>Request delivery</PrimaryButton>
          </div>
        ) : (
          <div className="max-w-md">
            <div className="mb-4 text-sm font-semibold">Tracking #OE-88213</div>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  {i <= step ? <CheckCircle2 size={18} color={BRAND.success} /> : <Clock size={18} color="#CBD5E1" />}
                  <span className={i <= step ? "text-sm font-semibold" : "text-sm text-slate-400"}>{s}</span>
                </div>
              ))}
            </div>
            {step < 4 && <GhostButton className="mt-4" onClick={() => setStep((s) => Math.min(4, s + 1))}>Simulate next update</GhostButton>}
          </div>
        )}
      </PageShell>
    );
  }

  function Field({ label, defaultValue }) {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{label}</span>
        <input defaultValue={defaultValue} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
      </label>
    );
  }

  function AdvertisingView() {
    const [form, setForm] = useState({ title: "", category: "Marketplace", budget: 1000, duration: 7, type: "Featured product" });
    const [created, setCreated] = useState(false);
    return (
      <PageShell title="Kenyan Trade Ads™" subtitle="Promote your business, products or listings across Kenyan Trade.">
        <div className="mb-4"><StatusTag status="demo" /></div>        {!created ? (
          <div className="max-w-lg space-y-3">
            <Field label="Ad title" defaultValue="" />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Ad type</span>
              <select className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {["Featured business", "Featured product", "Sponsored listing", "Homepage banner", "Location-based promotion"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Budget (KSh)</span>
              <input type="range" min="500" max="20000" step="500" value={form.budget} onChange={(e) => setForm({ ...form, budget: +e.target.value })} className="w-full" />
              <div className="text-sm font-semibold" style={{ color: BRAND.emerald }}>{KES(form.budget)}</div>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Duration (days)</span>
              <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            </label>
            <PrimaryButton full icon={Megaphone} onClick={() => setCreated(true)}>Create advertisement</PrimaryButton>
          </div>
        ) : (
          <div className="max-w-lg rounded-2xl border p-5 text-center" style={{ borderColor: "#EAF0EC" }}>
            <CheckCircle2 size={40} color={BRAND.success} className="mx-auto mb-2" />
            <div className="font-bold text-sm">Advertisement submitted for review</div>
            <div className="text-xs mt-1" style={{ color: BRAND.textSub }}>{form.type} · Budget {KES(form.budget)} · {form.duration} days</div>
            <GhostButton className="mt-4" onClick={() => setCreated(false)}>Create another</GhostButton>
          </div>
        )}
      </PageShell>
    );
  }

  function PageShell({ title, subtitle, children }) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={() => goto("home")} className="mb-3 flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.textSub }}>
          <ArrowLeft size={13} /> Back to home
        </button>
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: BRAND.text, fontFamily: "Fraunces, serif" }}>{title}</h1>
          {subtitle && <p className="mt-1 text-sm" style={{ color: BRAND.textSub }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    );
  }

  /* ---------------- BUSINESS OS ---------------- */

  function BusinessOSView() {
    const tabs = [
      ["dashboard", "Dashboard", LayoutDashboard], ["sales", "Sales", Receipt], ["inventory", "Inventory", Package],
      ["suppliers", "Suppliers", Handshake], ["expenses", "Expenses", Wallet], ["employees", "Employees", Users],
      ["reports", "Reports", BarChart3], ["settings", "Settings", Settings],
    ];
    const biz = BUSINESSES.find((b) => b.id === activeBusiness);
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={() => goto("home")} className="mb-3 flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.textSub }}>
          <ArrowLeft size={13} /> Back to home
        </button>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: BRAND.gold }}>Kenyan Trade Business OS</div>
            <h1 className="text-2xl font-bold" style={{ color: BRAND.text, fontFamily: "Fraunces, serif" }}>{biz.name}</h1>
          </div>
          <select value={activeBusiness} onChange={(e) => setActiveBusiness(e.target.value)} className="rounded-xl border px-3 py-2.5 text-sm font-semibold" style={{ borderColor: "#DCE7E1" }}>
            {BUSINESSES.map((b) => <option key={b.id} value={b.id}>{b.name} — {b.branch}</option>)}
          </select>
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto pb-1">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setBizTab(id)} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold" style={{ background: bizTab === id ? BRAND.emerald : "white", color: bizTab === id ? "white" : BRAND.text, border: "1px solid #DCE7E1" }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {bizTab === "dashboard" && <BizDashboard />}
        {bizTab === "sales" && <BizSales />}
        {bizTab === "inventory" && <BizInventory />}
        {bizTab === "suppliers" && <BizSuppliers />}
        {bizTab === "expenses" && <BizExpenses />}
        {bizTab === "employees" && <BizEmployees />}
        {bizTab === "reports" && <BizReports />}
        {bizTab === "settings" && <BizSettings />}
      </div>
    );
  }

  function BizDashboard() {
    const profit = stats.today - stats.expenses;
    return (
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Today's sales" value={KES(stats.today)} icon={TrendingUp} />
          <StatCard label="Monthly revenue" value={KES(stats.month)} icon={BarChart3} />
          <StatCard label="Expenses" value={KES(stats.expenses)} tone="error" icon={Wallet} />
          <StatCard label="Est. profit today" value={KES(profit)} tone="gold" icon={Sparkles} />
          <StatCard label="Low stock items" value={stats.lowStock} tone="error" icon={AlertTriangle} />
          <StatCard label="Pending supplier payments" value={KES(stats.pendingSupplier)} tone="gold" icon={Handshake} />
          <StatCard label="Pending deliveries" value={stats.pendingDeliveries} tone="info" icon={Truck} />
          <StatCard label="Products sold today" value={sales.length || 12} icon={Package} />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <SectionHeader title="Mountlion AI™ Business Insights" />
          <StatusTag status="demo" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {AI_INSIGHTS.map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border p-3 text-xs" style={{ borderColor: "#EAF0EC", background: "#FBFDFC" }}>
              <Sparkles size={14} color={BRAND.gold} className="mt-0.5 shrink-0" />
              <span style={{ color: BRAND.text }}>{s}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <PrimaryButton icon={Plus} onClick={() => setNewSaleOpen(true)}>New sale</PrimaryButton>
          <GhostButton icon={Plus} onClick={() => setAddProductOpen(true)}>Add product</GhostButton>
          <GhostButton icon={Plus} onClick={() => setAddSupplierOpen(true)}>Add supplier</GhostButton>
          <GhostButton icon={Plus} onClick={() => setAddExpenseOpen(true)}>Add expense</GhostButton>
        </div>
      </div>
    );
  }

  function BizSales() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Sales" />
          <PrimaryButton icon={Plus} onClick={() => setNewSaleOpen(true)}>New sale</PrimaryButton>
        </div>
        {sales.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No sales recorded yet in this session. Click "New sale" to record one.</div>
        ) : (
          <div className="space-y-2">
            {sales.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border bg-white p-3 text-sm" style={{ borderColor: "#EAF0EC" }}>
                <div>
                  <div className="font-semibold">{s.product} × {s.qty}</div>
                  <div className="text-[11px]" style={{ color: BRAND.textSub }}>{s.payment} · {s.time}</div>
                </div>
                <div className="font-bold" style={{ color: BRAND.emerald }}>{KES(s.total)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function BizInventory() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Inventory" />
          <PrimaryButton icon={Plus} onClick={() => setAddProductOpen(true)}>Add product</PrimaryButton>
        </div>
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#EAF0EC" }}>
          <table className="w-full text-sm">
            <thead style={{ background: BRAND.bg }}>
              <tr className="text-left text-xs" style={{ color: BRAND.textSub }}>
                <th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Stock</th><th className="p-3">Buy</th><th className="p-3">Sell</th><th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((it) => (
                <tr key={it.id} className="border-t" style={{ borderColor: "#EAF0EC" }}>
                  <td className="p-3 font-semibold">{it.name}</td>
                  <td className="p-3">{it.sku}</td>
                  <td className="p-3">{it.stock}</td>
                  <td className="p-3">{KES(it.buy)}</td>
                  <td className="p-3">{KES(it.sell)}</td>
                  <td className="p-3">{it.stock <= it.min ? <Badge tone="error">Low stock</Badge> : <Badge tone="emerald">In stock</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function BizSuppliers() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Suppliers" />
          <PrimaryButton icon={Plus} onClick={() => setAddSupplierOpen(true)}>Add supplier</PrimaryButton>
        </div>
        <div className="space-y-2">
          {suppliers.map((s) => (
            <div key={s.id} className="rounded-xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-[11px]" style={{ color: BRAND.textSub }}>{s.location} · {s.contact}</div>
                </div>
                {s.balance > 0 ? <Badge tone="error">Balance {KES(s.balance)}</Badge> : <Badge tone="emerald">Fully paid</Badge>}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div><div style={{ color: BRAND.textSub }}>Purchased</div><div className="font-semibold">{KES(s.totalPurchased)}</div></div>
                <div><div style={{ color: BRAND.textSub }}>Paid</div><div className="font-semibold">{KES(s.totalPaid)}</div></div>
                <div><div style={{ color: BRAND.textSub }}>Last purchase</div><div className="font-semibold">{s.last}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BizExpenses() {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Expenses" />
          <PrimaryButton icon={Plus} onClick={() => setAddExpenseOpen(true)}>Add expense</PrimaryButton>
        </div>
        <div className="mb-3 text-sm font-semibold">Total this month: <span style={{ color: BRAND.error }}>{KES(total)}</span></div>
        <div className="space-y-2">
          {expenses.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl border bg-white p-3 text-sm" style={{ borderColor: "#EAF0EC" }}>
              <div>
                <div className="font-semibold">{e.category}</div>
                <div className="text-[11px]" style={{ color: BRAND.textSub }}>{e.date} · {e.by} · {e.method}</div>
              </div>
              <div className="font-bold" style={{ color: BRAND.error }}>{KES(e.amount)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BizEmployees() {
    return (
      <div>
        <SectionHeader title="Employees & permissions" />
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: "Grace Muthoni", role: "Branch Manager" },
            { name: "Kevin Otieno", role: "Cashier" },
            { name: "Amina Wanjiru", role: "Warehouse Manager" },
            { name: "Peter Kamau", role: "Accountant" },
          ].map((e) => (
            <div key={e.name} className="flex items-center gap-3 rounded-xl border bg-white p-3" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ background: BRAND.emerald }}>{e.name[0]}</div>
              <div>
                <div className="text-sm font-semibold">{e.name}</div>
                <Badge tone="slate">{e.role}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BizReports() {
    const rows = [
      { label: "Sales", val: KES(stats.month) },
      { label: "Expenses", val: KES(stats.expenses * 4) },
      { label: "Profit", val: KES(stats.month - stats.expenses * 4) },
    ];
    return (
      <div>
        <SectionHeader title="Reports & analytics" />
        <div className="mb-4 flex gap-2 text-xs">
          {["Today", "This week", "This month", "This year", "Custom"].map((f) => (
            <button key={f} className="rounded-full border px-3 py-1.5 font-semibold" style={{ borderColor: "#DCE7E1" }}>{f}</button>
          ))}
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "#EAF0EC" }}>
          <div className="flex items-end gap-3 h-40 mb-4">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${BRAND.emerald}, ${BRAND.forest})` }} />
            ))}
          </div>
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between border-t py-2 text-sm" style={{ borderColor: "#EAF0EC" }}>
              <span style={{ color: BRAND.textSub }}>{r.label}</span><span className="font-bold">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BizSettings() {
    return (
      <div>
        <SectionHeader title="Settings" />
        <div className="grid sm:grid-cols-2 gap-3">
          {["Business profile", "Branches", "Tax settings", "Payment methods", "Notifications", "Data & backups"].map((s) => (
            <button key={s} className="flex items-center justify-between rounded-xl border bg-white p-3 text-sm font-semibold" style={{ borderColor: "#EAF0EC" }}>
              {s} <ChevronRight size={15} color={BRAND.textSub} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  function NewSaleModal() {
    const [product, setProduct] = useState(inventory[0]?.id || "");
    const [qty, setQty] = useState(1);
    const [payment, setPayment] = useState("Cash");
    const [step, setStep] = useState(1);
    const item = inventory.find((i) => i.id === product);
    const total = item ? item.sell * qty : 0;
    return (
      <Modal open={newSaleOpen} onClose={() => { setNewSaleOpen(false); setStep(1); }} title="New sale">
        {step === 1 && (
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Product/service</span>
              <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
                {inventory.map((i) => <option key={i.id} value={i.id}>{i.name} — {KES(i.sell)}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="rounded-full border p-2"><Minus size={14} /></button>
                <span className="font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="rounded-full border p-2"><Plus size={14} /></button>
              </div>
            </label>
            <div className="flex justify-between text-sm font-bold border-t pt-3" style={{ borderColor: "#EAF0EC" }}><span>Total</span><span style={{ color: BRAND.emerald }}>{KES(total)}</span></div>
            <PrimaryButton full onClick={() => setStep(2)}>Continue to payment</PrimaryButton>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-2">
            {["Cash", "M-Pesa", "Airtel Money", "Bank", "Card", "Credit"].map((m) => (
              <button key={m} onClick={() => setPayment(m)} className="flex w-full items-center justify-between rounded-xl border p-3 text-sm font-semibold" style={{ borderColor: payment === m ? BRAND.emerald : "#DCE7E1", background: payment === m ? "#E7F3EE" : "white", color: payment === m ? BRAND.emerald : BRAND.text }}>
                {m} {payment === m && <CheckCircle2 size={15} />}
              </button>
            ))}
            <PrimaryButton full onClick={() => {
              setSales((s) => [{ product: item.name, qty, total, payment, time: "Just now" }, ...s]);
              setInventory((inv) => inv.map((i) => i.id === product ? { ...i, stock: Math.max(0, i.stock - qty) } : i));
              notify("Sale recorded");
              setNewSaleOpen(false); setStep(1); setQty(1);
            }}>Complete sale</PrimaryButton>
          </div>
        )}
      </Modal>
    );
  }

  function AddProductModal() {
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [buy, setBuy] = useState("");
    const [sell, setSell] = useState("");
    const [stock, setStock] = useState("");
    return (
      <Modal open={addProductOpen} onClose={() => setAddProductOpen(false)} title="Add product">
        <div className="space-y-3">
          <Field label="Product name" defaultValue="" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="SKU" defaultValue="" />
            <Field label="Opening stock" defaultValue="" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Buying price (KSh)" defaultValue="" />
            <Field label="Selling price (KSh)" defaultValue="" />
          </div>
          <PrimaryButton full onClick={() => {
            setInventory((inv) => [{ id: "i" + Date.now(), name: "New product", sku: "NEW-" + Math.floor(Math.random() * 900), stock: 20, min: 10, buy: 100, sell: 150, supplier: "—" }, ...inv]);
            notify("Product added to inventory");
            setAddProductOpen(false);
          }}>Save product</PrimaryButton>
        </div>
      </Modal>
    );
  }

  function AddSupplierModal() {
    return (
      <Modal open={addSupplierOpen} onClose={() => setAddSupplierOpen(false)} title="Add supplier">
        <div className="space-y-3">
          <Field label="Supplier name" defaultValue="" />
          <Field label="Phone number" defaultValue="" />
          <Field label="Location" defaultValue="" />
          <PrimaryButton full onClick={() => {
            setSuppliers((s) => [{ id: "sp" + Date.now(), name: "New Supplier", contact: "07xx xxx xxx", location: "—", totalPurchased: 0, totalPaid: 0, balance: 0, last: "—" }, ...s]);
            notify("Supplier added");
            setAddSupplierOpen(false);
          }}>Save supplier</PrimaryButton>
        </div>
      </Modal>
    );
  }

  function AddExpenseModal() {
    return (
      <Modal open={addExpenseOpen} onClose={() => setAddExpenseOpen(false)} title="Add expense">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Category</span>
            <select className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {["Rent", "Electricity", "Water", "Salaries", "Transport", "Internet", "Repairs", "Marketing", "Taxes", "Other"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <Field label="Amount (KSh)" defaultValue="" />
          <PrimaryButton full onClick={() => {
            setExpenses((e) => [{ id: "e" + Date.now(), category: "Other", amount: 1500, date: "2026-07-22", by: "You", method: "Cash" }, ...e]);
            notify("Expense recorded");
            setAddExpenseOpen(false);
          }}>Save expense</PrimaryButton>
        </div>
      </Modal>
    );
  }

  /* ---------------- MANAGE LISTINGS (agents / landlords / sellers / providers) ---------------- */

  function VerifyBanner() {
    const map = {
      unverified: { text: "Verify your identity to list properties and services as a trusted, verified agent.", tone: "gold", cta: "Verify identity" },
      pending: { text: "Your verification is under review. This usually takes 1–2 business days.", tone: "info", cta: null },
      verified: { text: "You're a verified seller. Verified listings get more inquiries.", tone: "emerald", cta: null },
    };
    const m = map[identityVerification];
    return (
      <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border p-4" style={{ borderColor: "#EAF0EC", background: identityVerification === "verified" ? "#E7F3EE" : "#FBFDFC" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: identityVerification === "verified" ? BRAND.emerald : "#EFEADB" }}>
            <UserCheck size={16} color={identityVerification === "verified" ? "white" : BRAND.gold} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: BRAND.gold }}>Kenyan Trade Verify™</div>
            <div className="text-xs" style={{ color: BRAND.text }}>{m.text}</div>
          </div>
        </div>
        {m.cta && <GoldButton className="!py-2 !px-4 text-xs shrink-0" onClick={() => setVerifyModalOpen(true)}>{m.cta}</GoldButton>}
      </div>
    );
  }
  function ManageCenterView() {
    const tabs = [
      ["properties", "Properties", Building2, myProperties.length],
      ["products", "Products", Package, myProducts.length],
      ["services", "Services", Wrench, myServices.length],
    ];
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={() => goto("home")} className="mb-3 flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.textSub }}>
          <ArrowLeft size={13} /> Back to home
        </button>
        <div className="mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: BRAND.gold }}>Seller & Agent Center</div>
          <h1 className="text-2xl font-bold" style={{ color: BRAND.text, fontFamily: "Fraunces, serif" }}>My listings & services</h1>
          <p className="mt-1 text-sm" style={{ color: BRAND.textSub }}>Add, edit and manage everything you list on Kenyan Trade — properties, products and bookable services.</p>
        </div>

        <VerifyBanner />

        <div className="mb-6 flex gap-1 overflow-x-auto pb-1">
          {tabs.map(([id, label, Icon, count]) => (
            <button key={id} onClick={() => setManageTab(id)} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold" style={{ background: manageTab === id ? BRAND.emerald : "white", color: manageTab === id ? "white" : BRAND.text, border: "1px solid #DCE7E1" }}>
              <Icon size={13} /> {label} <span className="opacity-70">({count})</span>
            </button>
          ))}
        </div>

        {manageTab === "properties" && <ManageProperties />}
        {manageTab === "products" && <ManageProducts />}
        {manageTab === "services" && <ManageServices />}
      </div>
    );
  }

  function ListingStatusBadge({ status }) {
    const tone = status === "Active" ? "emerald" : status === "Draft" ? "slate" : "gold";
    return <Badge tone={tone}>{status}</Badge>;
  }

  function VerificationBadge({ v }) {
    if (v === "Verified") return <Badge tone="emerald">Verified</Badge>;
    if (v === "Pending review") return <Badge tone="gold">Pending review</Badge>;
    return <Badge tone="slate">Not submitted</Badge>;
  }

  function ManageProperties() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Your property listings" />
          <PrimaryButton icon={Plus} onClick={() => setPropertyForm("new")}>Add property</PrimaryButton>
        </div>
        {myProperties.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No properties listed yet.</div>
        ) : (
          <div className="space-y-3">
            {myProperties.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl" style={{ background: BRAND.bg }}>{p.img}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-bold" style={{ color: BRAND.text }}>{p.title}</div>
                      <ListingStatusBadge status={p.status} />
                      <VerificationBadge v={p.verification} />
                    </div>
                    <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>{p.location} · {p.type}{p.beds ? ` · ${p.beds} bed · ${p.baths} bath` : ""}</div>
                    <div className="mt-1 text-sm font-bold" style={{ color: BRAND.emerald }}>{KES(p.price)}{p.period === "month" ? "/mo" : ""}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Pencil} onClick={() => setPropertyForm(p)}>Edit</GhostButton>
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Inbox} onClick={() => setInquiriesFor({ type: "property", name: p.title, count: p.inquiries })}>
                    Inquiries {p.inquiries ? `(${p.inquiries})` : ""}
                  </GhostButton>
                  <GhostButton
                    className="!px-3 !py-1.5 text-xs"
                    icon={Power}
                    onClick={() => setMyProperties((list) => list.map((x) => x.id === p.id ? { ...x, status: x.status === "Active" ? "Draft" : "Active" } : x))}
                  >
                    {p.status === "Active" ? "Deactivate" : "Activate"}
                  </GhostButton>
                  {p.verification === "Not submitted" && (
                    <GhostButton className="!px-3 !py-1.5 text-xs" icon={ShieldCheck} onClick={() => { setMyProperties((list) => list.map((x) => x.id === p.id ? { ...x, verification: "Pending review" } : x)); notify("Submitted for verification"); }}>
                      Submit for verification
                    </GhostButton>
                  )}
                  <button className="ml-auto flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.error }} onClick={() => setMyProperties((list) => list.filter((x) => x.id !== p.id))}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function ManageProducts() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Your product listings" />
          <PrimaryButton icon={Plus} onClick={() => setProductForm("new")}>Add product</PrimaryButton>
        </div>
        {myProducts.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No products listed yet.</div>
        ) : (
          <div className="space-y-3">
            {myProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: BRAND.bg }}>{p.img}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-bold" style={{ color: BRAND.text }}>{p.name}</div>
                    <ListingStatusBadge status={p.status} />
                  </div>
                  <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>{p.category} · {p.stock} in stock</div>
                  <div className="mt-1 text-sm font-bold" style={{ color: BRAND.emerald }}>{KES(p.price)}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Pencil} onClick={() => setProductForm(p)}>Edit</GhostButton>
                  <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.error }} onClick={() => setMyProducts((list) => list.filter((x) => x.id !== p.id))}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function ManageServices() {
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <SectionHeader title="Your bookable services" />
          <PrimaryButton icon={Plus} onClick={() => setServiceForm("new")}>Add service</PrimaryButton>
        </div>
        {myServices.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-sm" style={{ borderColor: "#EAF0EC", color: BRAND.textSub }}>No services listed yet.</div>
        ) : (
          <div className="space-y-3">
            {myServices.map((s) => (
              <div key={s.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-bold" style={{ color: BRAND.text }}>{s.name}</div>
                  <ListingStatusBadge status={s.status} />
                  <Badge tone={s.open ? "emerald" : "error"}>{s.open ? "Open now" : "Closed"}</Badge>
                </div>
                <div className="mt-1 text-xs" style={{ color: BRAND.textSub }}>{s.category} · {s.hours}</div>
                <div className="mt-1 text-sm font-bold" style={{ color: BRAND.emerald }}>{s.price}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Pencil} onClick={() => setServiceForm(s)}>Edit</GhostButton>
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Inbox} onClick={() => setInquiriesFor({ type: "service", name: s.name, count: s.inquiries })}>
                    Inquiries {s.inquiries ? `(${s.inquiries})` : ""}
                  </GhostButton>
                  <GhostButton className="!px-3 !py-1.5 text-xs" icon={Power} onClick={() => setMyServices((list) => list.map((x) => x.id === s.id ? { ...x, open: !x.open } : x))}>
                    {s.open ? "Mark closed" : "Mark open"}
                  </GhostButton>
                  <button className="ml-auto flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.error }} onClick={() => setMyServices((list) => list.filter((x) => x.id !== s.id))}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function PropertyFormModal() {
    const editing = propertyForm && propertyForm !== "new" ? propertyForm : null;
    const [f, setF] = useState(editing || { title: "", type: "Apartment", period: "month", price: "", beds: "", baths: "", location: "", description: "" });
    const [photos, setPhotos] = useState([]);
    const [docs, setDocs] = useState([]);
    if (!propertyForm) return null;
    const set = (k, v) => setF({ ...f, [k]: v });
    return (
      <Modal open={!!propertyForm} onClose={() => setPropertyForm(null)} title={editing ? "Edit property" : "Add property"} wide>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Title</span>
            <input value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. 2BR Apartment, Kilimani" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Property type</span>
            <select value={f.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {["Apartment", "House", "Bedsitter", "Land", "Office", "Shop", "Commercial"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Listing for</span>
            <select value={f.period} onChange={(e) => set("period", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              <option value="month">Rent (per month)</option>
              <option value="sale">Sale</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Price (KSh)</span>
            <input value={f.price} onChange={(e) => set("price", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Location</span>
            <input value={f.location} onChange={(e) => set("location", e.target.value)} placeholder="Area, Town/City" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Bedrooms</span>
            <input value={f.beds} onChange={(e) => set("beds", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Bathrooms</span>
            <input value={f.baths} onChange={(e) => set("baths", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Description</span>
            <textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Photos ({photos.length})</span>
            <UploadBar files={photos} setFiles={setPhotos} accept="image/*" label="property photos" hint="At least 3 clear photos recommended · JPG or PNG" />
          </div>
          <div className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Ownership / title documents ({docs.length})</span>
            <UploadBar files={docs} setFiles={setDocs} accept="image/*,application/pdf" label="title deed or ownership documents" hint="Used for verification only — never shown publicly" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <GhostButton full onClick={() => setPropertyForm(null)}>Cancel</GhostButton>
          <PrimaryButton
            full
            disabled={!f.title || !f.price || !f.location}
            onClick={() => {
              if (!f.title || !f.price || !f.location) return;
              const payload = { ...f, price: Number(f.price) || 0, beds: Number(f.beds) || 0, baths: Number(f.baths) || 0, photoCount: photos.length, docCount: docs.length, img: f.type === "Land" ? "📐" : f.type === "Shop" || f.type === "Commercial" ? "🏬" : "🏠" };
              if (editing) {
                setMyProperties((list) => list.map((x) => x.id === editing.id ? { ...x, ...payload } : x));
                notify("Property listing updated");
              } else {
                setMyProperties((list) => [{ id: "mp" + Date.now(), status: "Draft", verification: "Not submitted", inquiries: 0, ...payload }, ...list]);
                notify("Property listed as draft — submit for verification when ready");
              }
              setPropertyForm(null);
            }}
          >
            {editing ? "Save changes" : "Save listing"}
          </PrimaryButton>
        </div>
      </Modal>
    );
  }

  function ProductFormModal() {
    const editing = productForm && productForm !== "new" ? productForm : null;
    const [f, setF] = useState(editing || { name: "", price: "", stock: "", category: "General Products" });
    const [photos, setPhotos] = useState([]);
    if (!productForm) return null;
    const set = (k, v) => setF({ ...f, [k]: v });
    return (
      <Modal open={!!productForm} onClose={() => setProductForm(null)} title={editing ? "Edit product" : "Add product"}>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Product name</span>
            <input value={f.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Category</span>
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {["Electronics", "Phones", "Fashion", "Home", "Furniture", "Vehicles", "Agriculture", "Food", "Beauty", "Hardware", "Books", "General Products"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Price (KSh)</span>
              <input value={f.price} onChange={(e) => set("price", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Stock quantity</span>
              <input value={f.stock} onChange={(e) => set("stock", e.target.value)} type="number" className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
            </label>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Product photos ({photos.length})</span>
            <UploadBar files={photos} setFiles={setPhotos} accept="image/*" label="product photos" hint="Clear photos on a plain background sell faster" />
          </div>
          <div className="flex gap-2">
            <GhostButton full onClick={() => setProductForm(null)}>Cancel</GhostButton>
            <PrimaryButton
              full
              disabled={!f.name || !f.price}
              onClick={() => {
                if (!f.name || !f.price) return;
                const payload = { name: f.name, category: f.category, price: Number(f.price) || 0, stock: Number(f.stock) || 0, photoCount: photos.length };
                if (editing) {
                  setMyProducts((list) => list.map((x) => x.id === editing.id ? { ...x, ...payload } : x));
                  notify("Product updated");
                } else {
                  setMyProducts((list) => [{ id: "mpr" + Date.now(), status: "Active", img: "🛍️", ...payload }, ...list]);
                  notify("Product listed on the marketplace");
                }
                setProductForm(null);
              }}
            >
              {editing ? "Save changes" : "Save product"}
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    );
  }

  function ServiceFormModal() {
    const editing = serviceForm && serviceForm !== "new" ? serviceForm : null;
    const [f, setF] = useState(editing || { name: "", category: "Salon", price: "", hours: "9:00 AM – 6:00 PM" });
    const [photos, setPhotos] = useState([]);
    if (!serviceForm) return null;
    const set = (k, v) => setF({ ...f, [k]: v });
    return (
      <Modal open={!!serviceForm} onClose={() => setServiceForm(null)} title={editing ? "Edit service" : "Add service"}>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Business / service name</span>
            <input value={f.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Category</span>
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {["Salon", "Kinyozi", "Carwash", "Mechanic", "Plumber", "Electrician", "Cleaner", "Photographer", "Designer", "Lawyer", "Accountant", "Tutor", "Repair services"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Starting price (e.g. "From KSh 500")</span>
            <input value={f.price} onChange={(e) => set("price", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Opening hours</span>
            <input value={f.hours} onChange={(e) => set("hours", e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Logo & work photos ({photos.length})</span>
            <UploadBar files={photos} setFiles={setPhotos} accept="image/*" label="logo or photos" hint="Show your storefront, workspace, or past work" />
          </div>
          <div className="flex gap-2">
            <GhostButton full onClick={() => setServiceForm(null)}>Cancel</GhostButton>
            <PrimaryButton
              full
              disabled={!f.name || !f.price}
              onClick={() => {
                if (!f.name || !f.price) return;
                const payload = { name: f.name, category: f.category, price: f.price, hours: f.hours, photoCount: photos.length };
                if (editing) {
                  setMyServices((list) => list.map((x) => x.id === editing.id ? { ...x, ...payload } : x));
                  notify("Service updated");
                } else {
                  setMyServices((list) => [{ id: "ms" + Date.now(), status: "Active", open: true, inquiries: 0, ...payload }, ...list]);
                  notify("Service listed — clients can now book you");
                }
                setServiceForm(null);
              }}
            >
              {editing ? "Save changes" : "Save service"}
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    );
  }

  function InquiriesModal() {
    if (!inquiriesFor) return null;
    const demoMessages = [
      { from: "Wanjiku K.", text: "Hi, is this still available? Can I view it this week?", time: "2 hrs ago" },
      { from: "David M.", text: "What's the last price, is it negotiable?", time: "1 day ago" },
      { from: "Susan A.", text: "Do you accept M-Pesa for the deposit?", time: "3 days ago" },
    ].slice(0, Math.max(1, Math.min(3, inquiriesFor.count || 1)));
    return (
      <Modal open={!!inquiriesFor} onClose={() => setInquiriesFor(null)} title={`Inquiries — ${inquiriesFor.name}`}>
        {inquiriesFor.count === 0 ? (
          <div className="py-8 text-center text-sm" style={{ color: BRAND.textSub }}>No inquiries yet. Verified, complete listings get more messages.</div>
        ) : (
          <div className="space-y-2">
            {demoMessages.map((m, i) => (
              <div key={i} className="rounded-xl border p-3" style={{ borderColor: "#EAF0EC" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{m.from}</span>
                  <span className="text-[10px]" style={{ color: BRAND.textSub }}>{m.time}</span>
                </div>
                <div className="mt-1 text-xs" style={{ color: BRAND.text }}>{m.text}</div>
                <button className="mt-2 text-[11px] font-semibold" style={{ color: BRAND.emerald }} onClick={() => notify(`Chat opened with ${m.from}`)}>Reply</button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    );
  }

  function VerifyIdentityModal() {
    const [name, setName] = useState("");
    const [idNo, setIdNo] = useState("");
    const [phone, setPhone] = useState("");
    const [idDocs, setIdDocs] = useState([]);
    return (
      <Modal open={verifyModalOpen} onClose={() => setVerifyModalOpen(false)} title="Verify your identity">
        <div className="space-y-3">
          <div className="rounded-xl border p-3 text-xs flex items-start gap-2" style={{ borderColor: "#F4E3A1", background: "#FBF3DC", color: "#8A6B10" }}>
            <ShieldCheck size={14} className="mt-0.5 shrink-0" /> Verification helps buyers and tenants trust that your listings are genuine. Documents are reviewed securely and never shown publicly.
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Full legal name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>National ID / Passport number</span>
            <input value={idNo} onChange={(e) => setIdNo(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Phone number</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }} />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>ID document ({idDocs.length})</span>
            <UploadBar files={idDocs} setFiles={setIdDocs} accept="image/*,application/pdf" label="ID or passport scan" hint="A clear photo or PDF scan of both sides" />
          </div>
          <PrimaryButton
            full
            disabled={!name || !idNo || !phone}
            onClick={() => {
              if (!name || !idNo || !phone) return;
              setIdentityVerification("pending");
              setVerifyModalOpen(false);
              notify("Verification submitted — under review");
            }}
          >
            Submit for review
          </PrimaryButton>
        </div>
      </Modal>
    );
  }

  /* ---------------- OWNER CENTER ---------------- */

  function OwnerCenterEntry() {
    const [pin, setPin] = useState("");
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border p-6 text-center" style={{ borderColor: "#EAF0EC" }}>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: BRAND.forest }}>
            <Lock size={20} color={BRAND.goldLight} />
          </div>
          <h2 className="text-lg font-bold" style={{ fontFamily: "Fraunces, serif" }}>Mountlion Owner Center</h2>
          <p className="mt-1 text-xs" style={{ color: BRAND.textSub }}>Private owner control system. Restricted access — demo authorization only.</p>
          <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter demo access PIN (any digits)" className="mt-4 w-full rounded-xl border p-2.5 text-center text-sm" style={{ borderColor: "#DCE7E1" }} />
          <PrimaryButton full className="mt-3" icon={ShieldCheck} onClick={() => pin.length > 0 && setOwnerAuthed(true)}>Authorize access</PrimaryButton>
          <button onClick={() => goto("home")} className="mt-3 text-xs font-semibold" style={{ color: BRAND.textSub }}>Cancel</button>
        </div>
      </div>
    );
  }

  function OwnerCenterView() {
    if (!ownerAuthed) return <OwnerCenterEntry />;
    const tabs = [
      "Overview", "Platform Revenue", "Advertising Revenue", "Marketplace Revenue", "Booking Revenue",
      "Delivery Revenue", "Payment Destinations", "Platform Settings", "User Management", "Business Management",
      "Verification", "Reports", "Audit Logs", "Security Controls", "Sessions", "Account Settings",
    ];
    return (
      <div style={{ background: BRAND.forest, minHeight: "70vh" }}>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: BRAND.goldLight }}>Private · Platform Property</div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Fraunces, serif" }}>Mountlion Owner Center</h1>
              <div className="text-xs mt-1" style={{ color: "#B8CFC5" }}>Platform Owner: Oscarian Express</div>
            </div>
            <button onClick={() => { setOwnerAuthed(false); goto("home"); }} className="flex items-center gap-1 rounded-xl border border-white/30 px-3 py-2 text-xs font-semibold text-white">
              <LogOut size={13} /> Exit
            </button>
          </div>

          <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setOwnerTab(t)} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ background: ownerTab === t ? BRAND.gold : "rgba(255,255,255,0.06)", color: ownerTab === t ? BRAND.forest : "white" }}>
                {t}
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-5">
            {ownerTab === "Overview" && (
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <StatCard label="Total users" value="128,430" icon={Users} />
                  <StatCard label="Total businesses" value="9,214" icon={Building} />
                  <StatCard label="Active listings" value="41,006" icon={Package} />
                  <StatCard label="Platform revenue (month)" value={KES(4820000)} tone="gold" icon={TrendingUp} />
                </div>
                <div className="rounded-xl border p-4 text-xs flex items-center gap-2" style={{ borderColor: "#EAF0EC", background: "#F8FAF9", color: BRAND.textSub }}>
                  <ShieldCheck size={14} color={BRAND.emerald} /> All sensitive actions require backend authorization in production. This screen uses local demo data only.
                </div>
              </div>
            )}
            {["Platform Revenue", "Advertising Revenue", "Marketplace Revenue", "Booking Revenue", "Delivery Revenue"].includes(ownerTab) && (
              <div>
                <SectionHeader title={ownerTab} />
                <div className="flex items-end gap-3 h-40 mb-4">
                  {[30, 55, 40, 70, 50, 85, 65, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${BRAND.gold}, #B8860B)` }} />
                  ))}
                </div>
                <div className="text-2xl font-bold" style={{ color: BRAND.emerald, fontFamily: "Fraunces, serif" }}>{KES(Math.floor(500000 + Math.random() * 2000000))}</div>
                <div className="text-xs" style={{ color: BRAND.textSub }}>This month, demo figure</div>
              </div>
            )}
            {ownerTab === "Payment Destinations" && (
              <div>
                <SectionHeader title="Payment destinations" action={<PrimaryButton icon={Plus} onClick={() => notify("Destination form opened (demo)")}>Add destination</PrimaryButton>} />
                <div className="space-y-2">
                  {destinations.map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-xl border p-3" style={{ borderColor: "#EAF0EC" }}>
                      <div>
                        <div className="text-sm font-semibold flex items-center gap-2">{d.type} {d.primary && <Badge tone="gold">Primary</Badge>}</div>
                        <div className="text-[11px]" style={{ color: BRAND.textSub }}>{d.masked}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge tone={d.status === "Active" ? "emerald" : "slate"}>{d.status}</Badge>
                        {!d.primary && <GhostButton className="!px-2 !py-1 text-[11px]" onClick={() => { setDestinations((ds) => ds.map((x) => ({ ...x, primary: x.id === d.id }))); notify("Primary destination updated"); }}>Set primary</GhostButton>}
                        <GhostButton className="!px-2 !py-1 text-[11px]" onClick={() => { setDestinations((ds) => ds.map((x) => x.id === d.id ? { ...x, status: x.status === "Active" ? "Disabled" : "Active" } : x)); }}>{d.status === "Active" ? "Disable" : "Enable"}</GhostButton>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px]" style={{ color: BRAND.textSub }}>Demo masked information only. Real credentials are never stored or shown in frontend code.</div>
              </div>
            )}
            {ownerTab === "User Management" && (
              <div>
                <SectionHeader title="Roles & permissions" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {ROLES.map((r) => (
                    <div key={r} className="flex items-center justify-between rounded-lg border p-2.5 text-xs font-semibold" style={{ borderColor: "#EAF0EC" }}>
                      {r} <ChevronRight size={13} color={BRAND.textSub} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ownerTab === "Audit Logs" && (
              <div>
                <SectionHeader title="Audit logs" />
                <div className="space-y-2 text-xs">
                  {[
                    { who: "Grace M. (Branch Manager)", action: "Recorded sale #4471", when: "2 min ago" },
                    { who: "Owner", action: "Updated primary payment destination", when: "1 hr ago" },
                    { who: "Kevin O. (Cashier)", action: "Logged in from new device", when: "3 hrs ago" },
                    { who: "System", action: "Low stock alert triggered — Cooking Oil 1L", when: "5 hrs ago" },
                  ].map((l, i) => (
                    <div key={i} className="flex justify-between rounded-lg border p-2.5" style={{ borderColor: "#EAF0EC" }}>
                      <span><span className="font-semibold">{l.who}</span> — {l.action}</span>
                      <span style={{ color: BRAND.textSub }}>{l.when}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!["Overview", "Platform Revenue", "Advertising Revenue", "Marketplace Revenue", "Booking Revenue", "Delivery Revenue", "Payment Destinations", "User Management", "Audit Logs"].includes(ownerTab) && (
              <div className="py-10 text-center text-sm" style={{ color: BRAND.textSub }}>
                {ownerTab} — demo module. Data isolated per tenant; all writes would be backend-authorized in production.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- SEARCH / LOCATION / DRAWERS ---------------- */

  function SearchModal() {
    const results = query ? filteredProducts : [];
    const suggestions = ["2 bedroom house in Nairobi", "barber near me", "buy fridge", "HELB information", "job in Nairobi", "bank near me", "matatu to CBD", "send parcel to Mombasa"];
    return (
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search Kenyan Trade" wide>
        <div className="flex items-center gap-2 rounded-xl border p-2.5 mb-3" style={{ borderColor: "#DCE7E1" }}>
          <Search size={16} color={BRAND.textSub} />
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “2 bedroom house in Nairobi”" className="flex-1 text-sm outline-none" />
        </div>
        {!query && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "#DCE7E1", color: BRAND.textSub }}>{s}</button>
            ))}
          </div>
        )}
        {query && (
          <div>
            <div className="mb-2 flex gap-2 text-[11px]">
              {["Products", "Businesses", "Real Estate", "Services"].map((f) => <Badge key={f} tone="slate">{f}</Badge>)}
            </div>
            {results.length === 0 ? (
              <div className="py-8 text-center text-sm" style={{ color: BRAND.textSub }}>No results for "{query}" yet — try another term.</div>
            ) : (
              <div className="space-y-2">
                {results.map((p) => (
                  <button key={p.id} onClick={() => { setActiveProduct(p); setSearchOpen(false); }} className="flex w-full items-center gap-3 rounded-xl border p-2.5 text-left" style={{ borderColor: "#EAF0EC" }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xl" style={{ background: BRAND.bg }}>{p.img}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="text-[11px]" style={{ color: BRAND.textSub }}>{p.location}</div>
                    </div>
                    <div className="text-sm font-bold" style={{ color: BRAND.emerald }}>{KES(p.price)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    );
  }

  function LocationModal() {
    const [continent, setContinent] = useState(location.continent);
    const [country, setCountry] = useState(location.country);
    const [region, setRegion] = useState(location.region);
    const countryData = LOCATION_TREE[continent]?.[country];
    return (
      <Modal open={locationOpen} onClose={() => setLocationOpen(false)} title="Choose your location">
        <button
          onClick={() => { setLocation(LOCATION); setLocationOpen(false); notify("Using approximate location"); }}
          className="mb-4 flex w-full items-center gap-2 rounded-xl p-3 text-left text-sm font-semibold" style={{ background: "#E7F3EE", color: BRAND.emerald }}
        >
          <MapPin size={16} /> Use approximate location automatically
        </button>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Continent</span>
            <select value={continent} onChange={(e) => { setContinent(e.target.value); setCountry(Object.keys(LOCATION_TREE[e.target.value])[0]); }} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {Object.keys(LOCATION_TREE).map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {Object.keys(LOCATION_TREE[continent]).map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: BRAND.textSub }}>{countryData?.regionLabel || "Region"}</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" style={{ borderColor: "#DCE7E1" }}>
              {Object.keys(countryData?.regions || {}).map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <PrimaryButton full onClick={() => {
            const city = countryData?.regions[region]?.[0] || "";
            setLocation({ continent, country, region, city, regionLabel: countryData?.regionLabel });
            setLocationOpen(false);
            notify(`Location set to ${city}, ${country}`);
          }}>Save location</PrimaryButton>
        </div>
      </Modal>
    );
  }

  function NotifModal() {
    const items = [
      { t: "Your order #KT-48213 is out for delivery", time: "5 min ago" },
      { t: "New message from Faiza Beauty Salon", time: "1 hr ago" },
      { t: "Low stock alert: Cooking Oil 1L", time: "3 hrs ago" },
    ];
    return (
      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications">
        <div className="space-y-2">
          {items.map((n, i) => (
            <div key={i} className="rounded-xl border p-3 text-sm" style={{ borderColor: "#EAF0EC" }}>
              <div>{n.t}</div>
              <div className="mt-1 text-[11px]" style={{ color: BRAND.textSub }}>{n.time}</div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  function MsgModal() {
    return (
      <Modal open={msgOpen} onClose={() => setMsgOpen(false)} title="Kenyan Trade Connect™">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: BRAND.textSub }}>Text chat shown below. Voice/video calling requires Connect integration.</span>
          <StatusTag status="demo" />
        </div>
        <div className="space-y-2">
          {[["Faiza Beauty Salon", "Your booking is confirmed for 2:00 PM"], ["Tech Hub Nairobi", "Yes, the phone is still available"]].map(([name, msg], i) => (
            <button key={i} className="flex w-full items-center gap-3 rounded-xl border p-3 text-left" style={{ borderColor: "#EAF0EC" }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-white" style={{ background: BRAND.emerald }}>{name[0]}</div>
              <div>
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-[11px]" style={{ color: BRAND.textSub }}>{msg}</div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    );
  }

  function ProfileModal() {
    return (
      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} title="Your account">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white" style={{ background: BRAND.emerald }}>J</div>
          <div>
            <div className="text-sm font-bold">Jane Wanjiku</div>
            <div className="text-[11px]" style={{ color: BRAND.textSub }}>jane@example.com</div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between rounded-xl border p-2.5" style={{ borderColor: "#EAF0EC" }}>
          <span className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Language</span>
          <div className="flex items-center gap-1 rounded-full border p-0.5" style={{ borderColor: "#DCE7E1" }}>
            <button onClick={() => setLang("en")} className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: lang === "en" ? BRAND.emerald : "transparent", color: lang === "en" ? "white" : BRAND.text }}>EN</button>
            <button onClick={() => setLang("sw")} className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: lang === "sw" ? BRAND.emerald : "transparent", color: lang === "sw" ? "white" : BRAND.text }}>SW</button>
          </div>
        </div>
        <div className="mb-3 flex items-center justify-between rounded-xl border p-2.5" style={{ borderColor: "#EAF0EC" }}>
          <span className="text-xs font-semibold" style={{ color: BRAND.textSub }}>Theme</span>
          <button onClick={() => setDark((d) => !d)} className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: "#DCE7E1" }}>
            {dark ? <Sun size={12} color={BRAND.gold} /> : <Moon size={12} color={BRAND.text} />} {dark ? "Dark" : "Light"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {[["Orders", ShoppingCart], ["Bookings", Calendar], ["Saved items", Star], ["Reviews", Star], ["Payments", CreditCard], ["Settings", Settings]].map(([label, Icon]) => (
            <button key={label} className="flex items-center gap-2 rounded-xl border p-2.5 text-xs font-semibold" style={{ borderColor: "#EAF0EC" }}>
              <Icon size={14} color={BRAND.emerald} /> {label}
            </button>
          ))}
        </div>
        <GhostButton full icon={Briefcase} onClick={() => { setProfileOpen(false); goto("jobs"); }}>{t("nav.jobs")}</GhostButton>
        <GhostButton full icon={Pencil} className="mt-2" onClick={() => { setProfileOpen(false); goto("manage"); }}>My listings & services</GhostButton>
        <GhostButton full icon={LayoutDashboard} className="mt-2" onClick={() => { setProfileOpen(false); goto("business"); }}>Manage your business</GhostButton>
        <GhostButton full icon={ShieldCheck} className="mt-2" onClick={() => { setProfileOpen(false); goto("owner"); }}>Mountlion Owner Center™</GhostButton>
      </Modal>
    );
  }

  /* ---------------- FOOTER ---------------- */

  function Footer() {
    if (view === "owner") return null;
    return (
      <footer className="border-t mt-8 pb-16 lg:pb-0" style={{ borderColor: theme.border, background: theme.card }}>
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs" style={{ color: theme.sub }}>
          <div className="mb-3 flex flex-wrap gap-4 font-semibold">
            <button onClick={() => goto("marketplace")}>{t("footer.marketplace")}</button>
            <button onClick={() => goto("houses")}>{t("footer.realestate")}</button>
            <button onClick={() => goto("services")}>{t("footer.services")}</button>
            <button onClick={() => goto("jobs")}>{t("footer.jobs")}</button>
            <button onClick={() => goto("business")}>{t("footer.businessos")}</button>
            <button onClick={() => goto("advertising")}>{t("footer.advertising")}</button>
            <button onClick={() => goto("owner")}>{t("footer.owner")}</button>
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px]">
            <StatusTag status="live" /> <StatusTag status="demo" /> <StatusTag status="integration" /> <StatusTag status="planned" />
          </div>
          <div>© 2026 Oscarian Express. Kenyan Trade™ is platform property. All rights reserved.</div>
          <div>Mountlion Owner Center™ · Platform Property</div>
          <div className="mt-1">Kenyan Trade™ is operated by Kenyan Trade Business™, powered by Mountlion AI™, a product of Oscarian Express, under Mountlion Marketing Company.</div>
        </div>
      </footer>
    );
  }

  /* ---------------- RENDER ---------------- */

  const viewMap = {
    home: HomeView, marketplace: MarketplaceView, houses: HousesView, services: ServicesView,
    education: EducationView, finance: FinanceView, transport: TransportView, delivery: DeliveryView,
    advertising: AdvertisingView, business: BusinessOSView, owner: OwnerCenterView, manage: ManageCenterView,
    jobs: JobsView,
  };
  const CurrentView = viewMap[view] || HomeView;

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      {view !== "owner" && <Header />}
      <CurrentView />
      <Footer />
      {view !== "owner" && <BottomNav />}

      {/* Modals */}
      <SearchModal />
      <LocationModal />
      <NotifModal />
      <MsgModal />
      <ProfileModal />
      <CartDrawer />
      <ProductDetailModal />
      <HouseDetailModal />
      <ServiceDetailModal />
      <BookingModal />
      <NewSaleModal />
      <AddProductModal />
      <AddSupplierModal />
      <AddExpenseModal />
      <PropertyFormModal />
      <ProductFormModal />
      <ServiceFormModal />
      <InquiriesModal />
      <VerifyIdentityModal />
      <JobDetailModal />
      <ApplyModal />
      <JobFormModal />

      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg" style={{ background: BRAND.forest }}>
          {toast}
        </div>
      )}
    </div>
  );
}
