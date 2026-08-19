/* Makan Mana — web prototype
 * Vanilla JS, no build step, no dependencies.
 *
 * SETUP: Set your Google Maps Platform API key below.
 * Enable "Maps JavaScript API" and "Places API" at console.cloud.google.com.
 * Without a key, the app falls back to 120 curated restaurants from data.js.
 */

// ─── API KEY ─────────────────────────────────────────────────────────────────
const PLACES_API_KEY = "AIzaSyDyFLsAbioXlQiKXkyO5jJp_u3MjjL-EYI";

// ─── Load Maps JS SDK immediately if key is set ───────────────────────────────
if (PLACES_API_KEY) {
  const _s = document.createElement("script");
  _s.src = `https://maps.googleapis.com/maps/api/js?key=${PLACES_API_KEY}&libraries=places&callback=_onMapsReady`;
  _s.async = true;
  _s.defer = true;
  document.head.appendChild(_s);
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    authTagline: "Decide where to eat, in seconds.",
    signIn: "Sign in", signUp: "Sign up", createAccount: "Create account",
    namePlaceholder: "Your name", emailPlaceholder: "Email address",
    pwPlaceholder: "Password", newPwPlaceholder: "Password (min 8 chars)",
    errEnterCreds: "Enter email and password.",
    errWrongCreds: "Email or password is incorrect.",
    errEnterName: "Enter your name.",
    errBadEmail: "Enter a valid email.",
    errShortPw: "Password must be at least 8 characters.",
    errEmailExists: "Email already registered — sign in instead.",
    gettingLocation: "📍 Getting your location…",
    usingLocation: "Using your location",
    locationUnavailable: "📍 Location unavailable — using KL city centre. Tap to retry.",
    locationNoSupport: "📍 Location unavailable in this browser — using KL city centre.",
    tagline: "What are you craving?",
    mealLabel: "Meal",
    breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", supper: "Supper",
    budgetLabel: "Budget",
    under10: "Under RM10", midBudget: "RM10–30", highBudget: "RM30+",
    distanceLabel: "Preferred distance", anyDist: "Any distance",
    vibeLabel: "Vibe", pickAny: "(pick any)",
    quickBite: "Quick bite", sitDown: "Sit-down", liveMusic: "🎵 Live music", spicy: "Spicy",
    cravingLabel: "Or tell us directly", optional: "(optional)",
    cravingPlaceholder: "something with soup...",
    dietLabel: "Diet preference",
    dietNone: "No preference", dietNoPork: "No pork/lard", dietVeg: "Vegetarian",
    dietHint: "We're still building verified halal certification info, so for now this filters by whether a place is known to skip pork and lard. Open any place's detail page to see certification notes from fellow users.",
    modeLabel: "Mode",
    modeSurprise: "🎲 Surprise me", modeComfort: "🏠 Comfort pick",
    hintSurprise: "We'll push places you haven't tried yet higher up the feed, and tuck familiar picks lower down — good for breaking out of a rut.",
    hintComfort: "We'll happily resurface places you've already been and liked, alongside new ones — good for a reliable pick with less risk.",
    startBtn: "Start swiping",
    loadingPlaces: "Finding places near you…",
    startBtnCount: (n) => `Start swiping (${n})`,
    skipHint: "◀ skip", tapHint: "tap card for details", commitHint: "commit ▶",
    skipBtn: "✕ Skip", commitBtn: "✓ Let's go",
    photoCount: (n) => `📷 ${n} photos · tap for gallery`,
    detailsTitle: "Details",
    sectionAddress: "Address", sectionMenu: "Menu", sectionReviews: "Reviews",
    sectionCommunity: "Help other users — what do you know about this place?",
    viewOnMaps: "Menu not available · View on Google Maps",
    reportNoPork: "🚫🐖 No pork/lard", reportHalal: "🕌 Has halal certification", reportAlcohol: "🍺 Serves alcohol",
    reportDisclaimer: "These come from fellow users, not an official source yet — think of it as a helpful heads-up, not a guarantee. (In this early beta, reports reset each time you reload.)",
    reviewBy: "early tester",
    greatChoice: "Great choice! 🎉",
    navigateWith: "Navigate with",
    backToFeed: "Back to feed",
    driveMin: (mins) => `~${mins} min drive`,
    emptyTitle: "That's everything for now 🍽️",
    changePrefs: "Change preferences", viewHistory: "View history",
    emptyDefault: "You've seen all our picks for this search. Try a different craving, vibe, or budget, or check your history below.",
    emptyWiden: (dist) => `You've seen everything within ${dist} km. Widen the radius, or change what you're craving.`,
    widenBtn: (label) => `📍 Try ${label} instead`,
    historyTitle: "Places you've been",
    historyEmpty: "Nothing yet — places you commit to will show up here.",
    letsGo: "Let's go", gotIt: "Got it", signOut: "Sign out",
    earlyBeta: "Early beta", about: "About",
    welcomeGreet: (name) => `Hey ${name}! Welcome to Makan <span>Mana</span>`,
    welcomeP1: "Can't decide where to eat? Swipe through nearby picks and go — no more scrolling long lists.",
    welcomeP2: "We'll ask for your location so distances are real, not guessed. It's used only in your browser for this session, nothing is sent anywhere or stored.",
    welcomeP3: "This is an early beta: restaurant details are still being filled in and some info (like halal status) is reported by users rather than officially verified — we'd love to hear what you think.",
    aboutTitle: "Makan <span>Mana</span>",
    aboutSignedIn: (name, email) => `Signed in as <strong>${name}</strong> (${email})`,
    aboutP1: "Makan Mana helps you decide where to eat by swiping through nearby picks instead of scrolling endless lists.",
    aboutP2: "Your location is used only in this browser to calculate real distances — it isn't sent anywhere or stored.",
    aboutP3: "This is an early beta. Restaurant data is still being filled in, and info like halal status or pork/alcohol is reported by fellow users, not an official source yet. Thanks for trying it out — feedback is very welcome.",
  },
  bm: {
    authTagline: "Putuskan tempat makan, dalam beberapa saat.",
    signIn: "Log masuk", signUp: "Daftar", createAccount: "Buat akaun",
    namePlaceholder: "Nama anda", emailPlaceholder: "Alamat e-mel",
    pwPlaceholder: "Kata laluan", newPwPlaceholder: "Kata laluan (min 8 aksara)",
    errEnterCreds: "Masukkan e-mel dan kata laluan.",
    errWrongCreds: "E-mel atau kata laluan tidak betul.",
    errEnterName: "Masukkan nama anda.",
    errBadEmail: "Masukkan e-mel yang sah.",
    errShortPw: "Kata laluan mesti sekurang-kurangnya 8 aksara.",
    errEmailExists: "E-mel sudah berdaftar — log masuk.",
    gettingLocation: "📍 Mendapatkan lokasi anda…",
    usingLocation: "Menggunakan lokasi anda",
    locationUnavailable: "📍 Lokasi tidak tersedia — menggunakan pusat bandar KL. Ketik untuk cuba lagi.",
    locationNoSupport: "📍 Lokasi tidak tersedia dalam pelayar ini — menggunakan pusat bandar KL.",
    tagline: "Nak makan apa hari ni?",
    mealLabel: "Hidangan",
    breakfast: "Sarapan", lunch: "Tengah Hari", dinner: "Makan Malam", supper: "Supper",
    budgetLabel: "Bajet",
    under10: "Bawah RM10", midBudget: "RM10–30", highBudget: "RM30+",
    distanceLabel: "Jarak pilihan", anyDist: "Sebarang jarak",
    vibeLabel: "Suasana", pickAny: "(pilih mana-mana)",
    quickBite: "Makan cepat", sitDown: "Duduk santai", liveMusic: "🎵 Muzik live", spicy: "Pedas",
    cravingLabel: "Atau beritahu kami terus", optional: "(pilihan)",
    cravingPlaceholder: "sesuatu berkuah...",
    dietLabel: "Keutamaan pemakanan",
    dietNone: "Tiada keutamaan", dietNoPork: "Tiada babi/lard", dietVeg: "Vegetarian",
    dietHint: "Kami masih membangunkan maklumat sijil halal. Buat masa ini, penapis ini berdasarkan sama ada tempat itu diketahui tidak menggunakan babi atau lard.",
    modeLabel: "Mod",
    modeSurprise: "🎲 Kejutkan saya", modeComfort: "🏠 Pilihan biasa",
    hintSurprise: "Kami akan tunjukkan tempat yang belum anda cuba dahulu — sesuai untuk mencuba sesuatu yang baharu.",
    hintComfort: "Kami akan tunjukkan tempat yang anda suka bersama cadangan baharu — sesuai untuk pilihan yang lebih selamat.",
    startBtn: "Mula",
    loadingPlaces: "Mencari tempat berdekatan…",
    startBtnCount: (n) => `Mula (${n})`,
    skipHint: "◀ langkau", tapHint: "ketik untuk butiran", commitHint: "pilih ▶",
    skipBtn: "✕ Langkau", commitBtn: "✓ Jom pergi!",
    photoCount: (n) => `📷 ${n} foto · ketik untuk galeri`,
    detailsTitle: "Butiran",
    sectionAddress: "Alamat", sectionMenu: "Menu", sectionReviews: "Ulasan",
    sectionCommunity: "Bantu pengguna lain — apa yang anda tahu tentang tempat ini?",
    viewOnMaps: "Menu tidak tersedia · Lihat di Google Maps",
    reportNoPork: "🚫🐖 Tiada babi/lard", reportHalal: "🕌 Ada sijil halal", reportAlcohol: "🍺 Ada minuman beralkohol",
    reportDisclaimer: "Ini daripada pengguna lain, bukan sumber rasmi — anggap sebagai panduan sahaja, bukan jaminan.",
    reviewBy: "penguji awal",
    greatChoice: "Pilihan terbaik! 🎉",
    navigateWith: "Navigasi dengan",
    backToFeed: "Kembali ke senarai",
    driveMin: (mins) => `~${mins} minit memandu`,
    emptyTitle: "Itu sahaja buat masa ini 🍽️",
    changePrefs: "Tukar pilihan", viewHistory: "Lihat sejarah",
    emptyDefault: "Anda telah melihat semua cadangan kami. Cuba selera, suasana, atau bajet yang berbeza.",
    emptyWiden: (dist) => `Anda telah melihat semua pilihan dalam ${dist} km. Lebarkan radius atau tukar pilihan anda.`,
    widenBtn: (label) => `📍 Cuba ${label} pula`,
    historyTitle: "Tempat yang pernah anda lawati",
    historyEmpty: "Belum ada lagi — tempat yang anda pilih akan muncul di sini.",
    letsGo: "Jom!", gotIt: "Faham", signOut: "Log keluar",
    earlyBeta: "Beta awal", about: "Mengenai",
    welcomeGreet: (name) => `Hai ${name}! Selamat datang ke Makan <span>Mana</span>`,
    welcomeP1: "Tak tahu nak makan di mana? Swipe pilihan berdekatan dan pergi — tiada lagi tatal senarai panjang.",
    welcomeP2: "Kami akan meminta lokasi anda supaya jarak adalah tepat. Lokasi digunakan dalam pelayar anda sahaja untuk sesi ini.",
    welcomeP3: "Ini adalah beta awal: maklumat restoran masih dilengkapkan dan sesetengah info (seperti status halal) dilaporkan oleh pengguna, bukan disahkan secara rasmi.",
    aboutTitle: "Makan <span>Mana</span>",
    aboutSignedIn: (name, email) => `Log masuk sebagai <strong>${name}</strong> (${email})`,
    aboutP1: "Makan Mana membantu anda memutuskan tempat makan dengan swipe pilihan berdekatan, bukan tatal senarai panjang.",
    aboutP2: "Lokasi anda hanya digunakan dalam pelayar ini untuk mengira jarak sebenar — ia tidak dihantar atau disimpan.",
    aboutP3: "Ini adalah beta awal. Data restoran masih dilengkapkan, dan maklumat seperti status halal atau babi/alkohol dilaporkan oleh pengguna, bukan sumber rasmi. Terima kasih!",
  }
};

let currentLang = localStorage.getItem("mm_lang") || "en";

function t(key, ...args) {
  const val = (T[currentLang] && T[currentLang][key] !== undefined)
    ? T[currentLang][key]
    : (T.en[key] !== undefined ? T.en[key] : key);
  return typeof val === "function" ? val(...args) : val;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  updateModeHint();
  updateStartButton();
  const lb = document.getElementById("lang-btn");
  if (lb) lb.textContent = currentLang === "en" ? "BM" : "EN";
  document.documentElement.lang = currentLang === "bm" ? "ms" : "en";
  const statusEl = document.getElementById("location-status");
  if (statusEl && statusEl._area !== undefined && statusEl.classList.contains("granted")) {
    const area = statusEl._area;
    statusEl.textContent = `📍 ${t("usingLocation")}${area ? " · " + area : ""}`;
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("mm_lang", lang);
  applyTranslations();
}

// ─── State ────────────────────────────────────────────────────────────────────
// DEFAULT_COORDS defined in data.js

const prefs = {
  meal: "lunch",
  budget: 2,
  vibes: new Set(["quick-bite"]),
  craving: "",
  distance: "any",
  diet: "none",
  mode: "comfort",
};

let deck = [];
let currentIndex = 0;
let visitedIds = new Set();
let skippedIds = new Set();
let history = [];
let userCoords = null;
let nearbyRestaurants = [];        // restaurants fetched from Google Places

// Places API coordination
let _placesService = null;
let _mapsReady = false;
let _pendingGeoCoords = null;      // location resolved before SDK ready
let _nearbyFetchPending = false;

const DISTANCE_TIERS = ["2", "5", "10", "any"];

// ─── DOM helpers ──────────────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function showScreen(id) {
  $all(".screen").forEach((el) => el.classList.remove("active"));
  $(`#${id}`).classList.add("active");
  window.scrollTo(0, 0);
}

function priceLabel(tier) {
  if (tier === 1) return t("under10");
  if (tier === 2) return t("midBudget");
  if (tier === 3) return t("highBudget");
  return "";
}

// ─── Google Maps Places integration ──────────────────────────────────────────

// Called by Maps JS SDK when it's ready (callback= in script URL)
window._onMapsReady = () => {
  _placesService = new google.maps.places.PlacesService(document.createElement("div"));
  _mapsReady = true;
  // If geolocation resolved before SDK was ready, start fetch now
  if (_pendingGeoCoords) {
    const { lat, lng } = _pendingGeoCoords;
    _pendingGeoCoords = null;
    _triggerNearbyFetch(lat, lng);
  }
};

// Kick off the nearby restaurant fetch (coordinates come from geolocation)
function _triggerNearbyFetch(lat, lng) {
  if (!_placesService || _nearbyFetchPending) return;
  _nearbyFetchPending = true;
  updateStartButton();
  fetchNearbyRestaurants(lat, lng).then(places => {
    nearbyRestaurants = places;
    _nearbyFetchPending = false;
    updateStartButton();
  });
}

// Fetch up to 60 restaurants near lat/lng using Places Nearby Search
async function fetchNearbyRestaurants(lat, lng) {
  if (!_placesService) return [];
  const location = new google.maps.LatLng(lat, lng);
  const request = {
    location,
    radius: 5000,
    type: "restaurant",
  };
  const all = [];
  await new Promise((resolve) => {
    function handlePage(results, status, pagination) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        all.push(...results);
      }
      if (pagination && pagination.hasNextPage && all.length < 60) {
        setTimeout(() => pagination.nextPage(), 300);
      } else {
        resolve();
      }
    }
    _placesService.nearbySearch(request, handlePage);
  });
  return all.map(mapPlaceToRestaurant).filter(Boolean);
}

// Business name patterns that indicate non-restaurants slipping through Places API
const NON_FOOD_PATTERN = /\b(sdn\.?\s*bhd\.?|berhad|consulting|consultant|enterprise|holdings|management|services|agency|solutions|trading|hardware|pharmacy|clinic|hospital|bank|insurance|salon|spa|gym|fitness)\b/i;

// Map a Google Places result object to our restaurant schema
function mapPlaceToRestaurant(place) {
  if (!place.geometry?.location) return null;

  // Skip permanently closed businesses
  if (place.business_status === "CLOSED_PERMANENTLY") return null;

  const name = place.name || "";

  // Skip obvious non-restaurants that Google mis-tagged
  if (NON_FOOD_PATTERN.test(name)) return null;

  const types = place.types || [];
  return {
    id:               place.place_id,
    name,
    address:          place.vicinity || "",
    lat:              place.geometry.location.lat(),
    lng:              place.geometry.location.lng(),
    cuisine:          inferCuisine(types, name),
    priceTier:        place.price_level != null ? Math.max(1, Math.min(3, Math.round(place.price_level * 0.75) + 1)) : 2,
    noPorkLard:       inferNoPork(types, name),
    vegetarian:       types.includes("vegetarian_restaurant") || /vegeta/i.test(name),
    liveMusic:        false,
    hours:            place.opening_hours?.open_now ? "Open now" : "See Google Maps",
    meals:            ["breakfast", "lunch", "dinner", "supper"], // inclusive default
    vibes:            inferVibes(types, place.price_level),
    emoji:            emojiForTypes(types),
    gradient:         gradientFromId(place.place_id),
    menu:             [], // not available from Nearby Search
    review:           place.rating
                        ? `Rated ${place.rating}⭐ by ${(place.user_ratings_total || 0).toLocaleString()} Google Maps reviewers.`
                        : "No rating yet.",
    communityReports: { noPorkLard: 0, halalCert: 0, alcohol: 0 },
    _placePhotos:     (place.photos || []).slice(0, 5).map(p => p.getUrl({ maxWidth: 800 })),
    placeId:          place.place_id,
    rating:           place.rating || 0,
    _fromPlaces:      true,
  };
}

// ─── Places inference helpers ─────────────────────────────────────────────────

function inferCuisine(types, name) {
  const n = name.toLowerCase();
  if (/mamak|nasi kandar/i.test(name))        return "Mamak / Nasi Kandar";
  if (/nasi lemak/i.test(name))               return "Nasi Lemak";
  if (/roti canai|roti|murtabak/i.test(name)) return "Mamak / Roti";
  if (/satay/i.test(name))                    return "Satay / Grills";
  if (/banana leaf/i.test(name))              return "South Indian / Banana Leaf";
  if (/dim sum/i.test(name))                  return "Chinese / Dim Sum";
  if (/char kuey|char kway|hokkien mee/i.test(name)) return "Chinese / Char Kuey Teow";
  if (/bak kut teh/i.test(name))              return "Chinese / Bak Kut Teh";
  if (/kopitiam|kopi tiam|kopi|mamak/i.test(name)) return "Kopitiam";
  if (/sushi|japanese|ramen|udon/i.test(name)) return "Japanese";
  if (/korean|k-bbq|kbbq/i.test(name))       return "Korean";
  if (/thai|tomyam|tom yam/i.test(name))      return "Thai";
  if (/indian|tandoori|biryani|briyani/i.test(name)) return "Indian";
  if (/burger/i.test(name))                   return "Western / Burgers";
  if (/pizza/i.test(name))                    return "Western / Pizza";
  if (/steak|steakhouse/i.test(name))         return "Western / Steakhouse";
  if (/seafood|ketam|crab|prawn/i.test(name)) return "Seafood";
  if (/chinese|cantonese|hakka/i.test(name))  return "Chinese";
  if (/malay|melayu/i.test(name))             return "Malaysian";
  if (/vietnamese|pho|banh mi/i.test(name))   return "Vietnamese";
  if (/arabic|mandi|yemeni/i.test(name))      return "Arabic / Yemeni";
  if (types.includes("chinese_restaurant"))   return "Chinese";
  if (types.includes("indian_restaurant"))    return "Indian";
  if (types.includes("japanese_restaurant"))  return "Japanese";
  if (types.includes("thai_restaurant"))      return "Thai";
  if (types.includes("korean_restaurant"))    return "Korean";
  if (types.includes("italian_restaurant"))   return "Italian";
  if (types.includes("fast_food_restaurant")) return "Fast Food";
  if (types.includes("seafood_restaurant"))   return "Seafood";
  if (types.includes("vegetarian_restaurant")) return "Vegetarian";
  if (types.includes("cafe"))                 return "Cafe";
  if (types.includes("bar"))                  return "Bar / Western";
  if (types.includes("bakery"))               return "Bakery / Cafe";
  return "Restaurant";
}

function inferNoPork(types, name) {
  // Malay, Indian-Muslim, and mamak establishments typically don't serve pork
  if (/halal|muslim|malay|melayu|nasi|mamak|kandar|mandi|arabic|yemeni|briyani|biryani/i.test(name)) return true;
  if (/restoran\s+\w+\s*(bin|binti|md|mohd)/i.test(name)) return true;
  if (types.includes("indian_restaurant")) return true;
  if (types.includes("chinese_restaurant")) return false;
  if (types.includes("bar")) return false;
  return false;
}

function inferVibes(types, priceLevel) {
  const vibes = [];
  const price = priceLevel ?? 2;
  if (price <= 1) vibes.push("quick-bite");
  else vibes.push("sit-down");
  if (types.includes("bar") || types.includes("night_club")) {
    if (!vibes.includes("sit-down")) vibes.push("sit-down");
  }
  return vibes.length ? vibes : ["quick-bite"];
}

const TYPE_EMOJI = {
  japanese_restaurant: "🍣", korean_restaurant: "🥩", chinese_restaurant: "🥢",
  indian_restaurant: "🍛", thai_restaurant: "🌶️", italian_restaurant: "🍝",
  pizza_restaurant: "🍕", burger_restaurant: "🍔", seafood_restaurant: "🦐",
  vegetarian_restaurant: "🥗", cafe: "☕", bakery: "🥐", bar: "🍺",
  fast_food_restaurant: "🍟",
};
function emojiForTypes(types) {
  for (const type of types) {
    if (TYPE_EMOJI[type]) return TYPE_EMOJI[type];
  }
  return "🍽️";
}

const GRADIENTS = [
  "linear-gradient(135deg,#f97316,#dc2626)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#3b82f6,#2563eb)",
  "linear-gradient(135deg,#8b5cf6,#7c3aed)",
  "linear-gradient(135deg,#ec4899,#db2777)",
  "linear-gradient(135deg,#ef4444,#b91c1c)",
  "linear-gradient(135deg,#06b6d4,#0891b2)",
];
function gradientFromId(id) {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}

// ─── Photos ───────────────────────────────────────────────────────────────────
const WIKI = (f) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}`;

const CUISINE_PHOTOS = [
  { test: /nasi kandar/, photos: [WIKI("Nasi kandar.jpg"), WIKI("Nasi Kandar Penang.jpg"), WIKI("Roti canai and Teh Tarik, a typical Malaysian breakfast.jpg")] },
  { test: /nasi lemak/, photos: [WIKI("Nasi lemak on banana leaf.jpg"), WIKI("Nasi_Lemak_pack.jpg"), WIKI("Nasi Lemak Antarabangsa.jpg")] },
  { test: /mamak|roti canai/, photos: [WIKI("Roti canai and Teh Tarik, a typical Malaysian breakfast.jpg"), WIKI("Murtabak.jpg"), WIKI("Teh tarik.JPG"), WIKI("Maggi goreng.jpg")] },
  { test: /satay/, photos: [WIKI("Chicken satay 86.jpg"), WIKI("Satay chicken.jpg"), WIKI("Satay-bali.jpg")] },
  { test: /kopitiam|kaya toast|hainan coffee/, photos: [WIKI("Ya Kun Kaya Toast.JPG"), WIKI("Kopi O.jpg"), WIKI("Caffe latte (5665976602).jpg")] },
  { test: /banana leaf/, photos: [WIKI("Food served on Banana Leaf.jpg"), WIKI("Banana leaf rice.jpg"), WIKI("South Indian banana leaf rice.jpg")] },
  { test: /char kuey teow|char kway teow|hokkien mee/, photos: [WIKI("Char kway teow.jpg"), WIKI("Penang char kway teow.jpg"), WIKI("Hokkien Mee.jpg")] },
  { test: /dim sum/, photos: [WIKI("Dim Sum Breakfast.jpg"), WIKI("Dimsum (7235491694).jpg"), WIKI("Chinese dimsum.jpg")] },
  { test: /laksa/, photos: [WIKI("Penang Laksa.jpg"), WIKI("Assam laksa.jpg"), WIKI("Curry Laksa.jpg")] },
  { test: /bak kut teh/, photos: [WIKI("Bak Kut Teh, Singapore.JPG"), WIKI("Klang Bak Kut Teh.jpg")] },
  { test: /ramen/, photos: [WIKI("Tonkotsu ramen 2.jpg"), WIKI("Hakata tonkotsu ramen.jpg")] },
  { test: /sushi|japanese/, photos: [WIKI("Sushi platter.jpg"), WIKI("Salmon sashimi.jpg"), WIKI("Maki and Nigiri.jpg")] },
  { test: /burger/, photos: [WIKI("Cheeseburger.jpg"), WIKI("Smash burger with caramelized onion.jpg"), WIKI("Double cheeseburger.jpg")] },
  { test: /steak/, photos: [WIKI("Grilled steak with baked potato and gravy.jpg"), WIKI("Grilled Rib Eye Steak.jpg")] },
  { test: /pizza/, photos: [WIKI("Pizza slices with various toppings.jpg"), WIKI("Pepperoni pizza.jpg")] },
  { test: /pasta|italian/, photos: [WIKI("Spaghetti alla carbonara (32998643591).jpg"), WIKI("Spaghetti bolognese.jpg")] },
  { test: /chicken rice|hainan/, photos: [WIKI("Tian Tian Hainanese Chicken Rice, Singapore.JPG"), WIKI("Hainanese chicken rice.jpg")] },
  { test: /fried chicken|fast food/, photos: [WIKI("Fried-Chicken-Set.jpg"), WIKI("Fried chicken.jpg")] },
  { test: /thai|tom yam|tom yum/, photos: [WIKI("Tom yum goong-01.jpg"), WIKI("Pad Thai (1).jpg"), WIKI("Green curry.jpg"), WIKI("Mango sticky rice (Thailand).jpg")] },
  { test: /mandi|arabic|middle eastern|yemeni/, photos: [WIKI("Nasi Arab Mandy.jpg"), WIKI("Mandi Rice.jpg")] },
  { test: /korean/, photos: [WIKI("Korean BBQ-Galbisal-01.jpg"), WIKI("Bibimbap served in a stone pot.jpg"), WIKI("Korean fried chicken.jpg")] },
  { test: /vietnamese|banh mi|pho\b/, photos: [WIKI("Two mini banh mi Vietnamese sandwiches.jpg"), WIKI("Pho with meat.jpg")] },
  { test: /mexican|taco/, photos: [WIKI("01 Tacos al Pastor.jpg"), WIKI("Tex-mex tacos.jpg")] },
  { test: /steamboat|hotpot|mongolian/, photos: [WIKI("Hotpot.jpg"), WIKI("Steamboat food.jpg")] },
  { test: /dessert|cake|gelato|ice cream|cendol|ais kacang/, photos: [WIKI("Piece of cake bakery and café.jpg"), WIKI("Cendol (1).jpg"), WIKI("Ice kacang.jpg")] },
  { test: /cafe|coffee/, photos: [WIKI("Caffe latte (5665976602).jpg"), WIKI("Pour-over coffee.jpg"), WIKI("Flat white coffee.jpg")] },
  { test: /seafood|fish/, photos: [WIKI("Plated grilled fish (cropped).jpg"), WIKI("Chili crab.jpg"), WIKI("Asam pedas fish.jpg")] },
  { test: /indian|naan|curry/, photos: [WIKI("Cheese Naan.jpg"), WIKI("Butter chicken-edited.jpg"), WIKI("Dal makhani.jpg")] },
  { test: /rendang|padang|minang|indonesian|nyonya|peranakan/, photos: [WIKI("Nasi Padang With beef rendang.jpg"), WIKI("Beef rendang.jpg")] },
  { test: /western/, photos: [WIKI("Grilled steak with baked potato and gravy.jpg"), WIKI("Fish and chips.jpg")] },
  { test: /vegetarian|vegan/, photos: [WIKI("Vegetable curry (3587163023).jpg"), WIKI("Buddha bowl.jpg")] },
];

function getCuisinePhotos(r) {
  const haystack = `${r.cuisine} ${r.name}`.toLowerCase();
  const match = CUISINE_PHOTOS.find(e => e.test.test(haystack));
  const pool = match ? match.photos : [WIKI("Nasi lemak on banana leaf.jpg")];
  if (pool.length <= 1) return pool;
  const hash = r.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const start = hash % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)];
}

async function getPhotos(r) {
  if (r.photos?.length)       return r.photos;        // manual override in data.js
  if (r._placePhotos?.length) return r._placePhotos;  // from Google Places search
  return getCuisinePhotos(r);                          // cuisine-rotation fallback
}

async function loadCardPhoto(r, photoEl) {
  const photos = await getPhotos(r);
  if (!photos.length) return;
  const img = document.createElement("img");
  img.className = "dish-photo";
  img.alt = "Food photo";
  img.src = photos[0];
  img.addEventListener("load", () => {
    photoEl.classList.add("has-photo");
    if (photos.length > 1) {
      const cnt = photoEl.querySelector(".photo-count");
      if (cnt) cnt.style.display = "flex";
    }
  });
  img.addEventListener("error", () => img.remove());
  photoEl.prepend(img);
}

async function buildPhotoGallery(r, container) {
  const photos = await getPhotos(r);
  container.innerHTML = "";
  container.style.background = r.gradient;

  if (!photos.length) {
    container.innerHTML = `<div class="emoji-sticker">${r.emoji}</div>`;
    return;
  }

  const wrap = document.createElement("div");
  wrap.className = "gallery-wrap";

  const track = document.createElement("div");
  track.className = "gallery-track";
  photos.forEach(url => {
    const slide = document.createElement("div");
    slide.className = "gallery-slide";
    const img = document.createElement("img");
    img.className = "gallery-img";
    img.alt = "Restaurant photo";
    img.src = url;
    slide.appendChild(img);
    track.appendChild(slide);
  });
  wrap.appendChild(track);

  const badge = document.createElement("div");
  badge.className = "emoji-sticker emoji-badge";
  badge.textContent = r.emoji;
  wrap.appendChild(badge);

  let idx = 0;
  let dots = null;
  if (photos.length > 1) {
    dots = document.createElement("div");
    dots.className = "gallery-dots";
    photos.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "gallery-dot" + (i === 0 ? " active" : "");
      dots.appendChild(d);
    });
    wrap.appendChild(dots);
  }

  function goTo(n) {
    idx = Math.max(0, Math.min(n, photos.length - 1));
    track.style.transform = `translateX(${-idx * 100}%)`;
    if (dots) dots.querySelectorAll(".gallery-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  let tx = 0;
  track.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (dx < -40) goTo(idx + 1);
    else if (dx > 40) goTo(idx - 1);
  });
  let mx = 0, dragging = false;
  track.addEventListener("mousedown", e => { mx = e.clientX; dragging = true; e.preventDefault(); });
  track.addEventListener("mouseup", e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - mx;
    if (dx < -40) goTo(idx + 1);
    else if (dx > 40) goTo(idx - 1);
  });
  container.appendChild(wrap);
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
let currentUser = null;

function getUsers() {
  try { return JSON.parse(localStorage.getItem("mm_users") || "[]"); } catch { return []; }
}

function bootApp() {
  applyTranslations();
  showScreen("screen-prompt");
  requestLocation();
  if (!localStorage.getItem("mm_welcomed")) {
    showModal(welcomeHTML(), t("letsGo"));
    localStorage.setItem("mm_welcomed", "1");
  }
}

function initAuth() {
  try {
    const s = localStorage.getItem("mm_session");
    if (s) currentUser = JSON.parse(s);
  } catch {}
  applyTranslations();
  if (currentUser) { bootApp(); return; }
  showScreen("screen-auth");
}

$all(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $all(".auth-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    $all(".auth-form").forEach(f => f.classList.remove("active-form"));
    $(`#tab-${tab.dataset.tab}`).classList.add("active-form");
  });
});

$("#signin-btn").addEventListener("click", () => {
  const email = $("#signin-email").value.trim().toLowerCase();
  const pwd   = $("#signin-password").value;
  const errEl = $("#signin-error");
  errEl.textContent = "";
  if (!email || !pwd) { errEl.textContent = t("errEnterCreds"); return; }
  const user = getUsers().find(u => u.email === email && u.password === pwd);
  if (!user) { errEl.textContent = t("errWrongCreds"); return; }
  currentUser = { email: user.email, name: user.name };
  localStorage.setItem("mm_session", JSON.stringify(currentUser));
  bootApp();
});

$("#signup-btn").addEventListener("click", () => {
  const name  = $("#signup-name").value.trim();
  const email = $("#signup-email").value.trim().toLowerCase();
  const pwd   = $("#signup-password").value;
  const errEl = $("#signup-error");
  errEl.textContent = "";
  if (!name)                       { errEl.textContent = t("errEnterName");   return; }
  if (!email || !email.includes("@")) { errEl.textContent = t("errBadEmail"); return; }
  if (pwd.length < 8)              { errEl.textContent = t("errShortPw");     return; }
  const users = getUsers();
  if (users.find(u => u.email === email)) { errEl.textContent = t("errEmailExists"); return; }
  users.push({ email, name, password: pwd });
  localStorage.setItem("mm_users", JSON.stringify(users));
  currentUser = { email, name };
  localStorage.setItem("mm_session", JSON.stringify(currentUser));
  bootApp();
});

// ─── Welcome / About modal ────────────────────────────────────────────────────
function welcomeHTML() {
  const first = currentUser ? currentUser.name.split(" ")[0] : "there";
  return `
    <div class="modal-badge">${t("earlyBeta")}</div>
    <h2>${t("welcomeGreet", first)}</h2>
    <p>${t("welcomeP1")}</p>
    <p>${t("welcomeP2")}</p>
    <p>${t("welcomeP3")}</p>
  `;
}

function aboutHTML() {
  return `
    <div class="modal-badge">${t("about")}</div>
    <h2>${t("aboutTitle")}</h2>
    <p>${t("aboutSignedIn", currentUser?.name || "", currentUser?.email || "")}</p>
    <p>${t("aboutP1")}</p>
    <p>${t("aboutP2")}</p>
    <p>${t("aboutP3")}</p>
    <button id="signout-btn" class="btn btn-outline" style="margin-top:8px;">${t("signOut")}</button>
  `;
}

function showModal(html, closeLabel) {
  $("#modal-body").innerHTML = html;
  $("#modal-close").textContent = closeLabel || t("letsGo");
  $("#modal-overlay").classList.add("open");
  const signout = $("#signout-btn");
  if (signout) {
    signout.addEventListener("click", () => {
      localStorage.removeItem("mm_session");
      currentUser = null;
      hideModal();
      showScreen("screen-auth");
    });
  }
}
function hideModal() { $("#modal-overlay").classList.remove("open"); }
$("#modal-close").addEventListener("click", hideModal);
$("#modal-overlay").addEventListener("click", (e) => { if (e.target.id === "modal-overlay") hideModal(); });

// ─── Location ─────────────────────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceTo(r) {
  const origin = userCoords || DEFAULT_COORDS;
  return haversineKm(origin.lat, origin.lng, r.lat, r.lng);
}

async function fetchNeighborhood(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`,
      { headers: { "User-Agent": "MakanMana-prototype/1.0" } }
    );
    const d = await res.json();
    const a = d.address || {};
    return a.suburb || a.neighbourhood || a.city_district || a.town || a.village || "";
  } catch { return ""; }
}

function requestLocation() {
  const statusEl = $("#location-status");
  statusEl._area = "";
  if (!("geolocation" in navigator)) {
    statusEl.textContent = t("locationNoSupport");
    statusEl.classList.add("denied");
    return;
  }
  statusEl.textContent = t("gettingLocation");
  statusEl.classList.remove("granted", "denied");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      statusEl.textContent = `📍 ${t("usingLocation")}`;
      statusEl.classList.add("granted");
      statusEl.classList.remove("denied");

      // Trigger nearby restaurant fetch (handles race with SDK loading)
      if (PLACES_API_KEY) {
        if (_mapsReady) {
          _triggerNearbyFetch(pos.coords.latitude, pos.coords.longitude);
        } else {
          _pendingGeoCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        }
      }

      // Reverse geocode for neighborhood name
      fetchNeighborhood(pos.coords.latitude, pos.coords.longitude).then(area => {
        statusEl._area = area;
        if (area) statusEl.textContent = `📍 ${t("usingLocation")} · ${area}`;
      });
    },
    () => {
      userCoords = null;
      statusEl.textContent = t("locationUnavailable");
      statusEl.classList.add("denied");
      statusEl.classList.remove("granted");
    },
    { timeout: 8000 }
  );
}

$("#location-status").addEventListener("click", requestLocation);

// ─── Start button loading state ───────────────────────────────────────────────
function updateStartButton() {
  const btn = document.getElementById("start-swiping");
  if (!btn) return;
  if (_nearbyFetchPending) {
    btn.textContent = t("loadingPlaces");
    btn.disabled = true;
  } else if (nearbyRestaurants.length > 0) {
    const total = RESTAURANTS.length + nearbyRestaurants.length;
    btn.textContent = t("startBtnCount", total);
    btn.disabled = false;
  } else {
    btn.textContent = t("startBtn");
    btn.disabled = false;
  }
}

// ─── Chip / toggle wiring ─────────────────────────────────────────────────────
function setChipValue(group, value) {
  const row = $(`.chip-row[data-group="${group}"]`);
  if (!row) return;
  $all(".chip", row).forEach((c) => c.classList.toggle("active", c.dataset.value === String(value)));
  prefs[group] = group === "budget" ? Number(value) : String(value);
}

$all('.chip-row[data-mode="single"]').forEach((row) => {
  const group = row.dataset.group;
  row.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    setChipValue(group, chip.dataset.value);
  });
});

$all('.chip-row[data-mode="multi"]').forEach((row) => {
  row.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    chip.classList.toggle("active");
    const v = chip.dataset.value;
    if (chip.classList.contains("active")) prefs.vibes.add(v);
    else prefs.vibes.delete(v);
  });
});

$("#craving-text").addEventListener("input", (e) => {
  prefs.craving = e.target.value.trim().toLowerCase();
});

function updateModeHint() {
  const hint = $("#mode-hint");
  if (hint) hint.textContent = t(prefs.mode === "surprise" ? "hintSurprise" : "hintComfort");
}

$all(".mode-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $all(".mode-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    prefs.mode = btn.dataset.mode;
    updateModeHint();
  });
});
updateModeHint();

$("#profile-btn").addEventListener("click", () => showModal(aboutHTML(), t("gotIt")));

// ─── Language toggle ──────────────────────────────────────────────────────────
document.getElementById("lang-btn").addEventListener("click", () => {
  setLang(currentLang === "en" ? "bm" : "en");
});

// ─── Location label (from address string) ─────────────────────────────────────
const STREET_PREFIX = /^(jalan|lorong|persiaran|jln|lot\b|\d)/i;
function areaLabel(r) {
  if (r._fromPlaces) {
    // vicinity from Places is already a short local address — extract area portion
    const parts = (r.address || "").split(",").map(s => s.trim());
    return parts[parts.length - 1] || r.address;
  }
  const parts = r.address.split(",").map(s => s.trim());
  const pcIdx = parts.findIndex(p => /\b\d{5}\b/.test(p));
  if (pcIdx < 0) return parts[parts.length - 1];
  const candidate = parts[pcIdx - 1];
  if (candidate && !STREET_PREFIX.test(candidate)) return candidate;
  return parts[pcIdx].replace(/^\d{5}\s*/, "").trim();
}

// ─── Deck building ────────────────────────────────────────────────────────────
function buildDeck() {
  // Merge curated seed (data.js) + live Places results, deduplicate by name
  const seenNames = new Set(RESTAURANTS.map(r => r.name.toLowerCase()));
  const uniquePlaces = nearbyRestaurants.filter(r => !seenNames.has(r.name.toLowerCase()));
  const allRestaurants = [...RESTAURANTS, ...uniquePlaces];

  return allRestaurants
    .filter((r) => r.meals.includes(prefs.meal))
    .filter((r) => {
      if (prefs.diet === "no-pork-lard") return r.noPorkLard;
      if (prefs.diet === "vegetarian")   return r.vegetarian;
      return true;
    })
    .filter((r) => {
      if (prefs.distance === "any") return true;
      return distanceTo(r) <= Number(prefs.distance);
    })
    .map((r) => {
      let score = 0;
      score += 2 - Math.abs(r.priceTier - prefs.budget);
      prefs.vibes.forEach((v) => {
        if (r.vibes.includes(v)) score += 2;
        if (v === "live-music" && r.liveMusic) score += 3;
      });
      if (prefs.craving) {
        const haystack = [r.name, r.cuisine, ...r.menu.map(m => m.name)].join(" ").toLowerCase();
        prefs.craving.split(/\s+/).forEach(word => {
          if (word.length > 2 && haystack.includes(word)) score += 3;
        });
      }
      if (visitedIds.has(r.id))  score += prefs.mode === "surprise" ? -6 : 1;
      if (skippedIds.has(r.id))  score -= 4;
      // Slight bonus for higher-rated Places results
      if (r.rating) score += r.rating * 0.3;
      score += (5 - distanceTo(r)) * 0.2;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(x => x.r);
}

function startSwiping() {
  deck = buildDeck();
  currentIndex = 0;
  if (deck.length === 0) {
    renderEmptyScreen();
    showScreen("screen-empty");
    return;
  }
  showScreen("screen-feed");
  renderCurrentCard();
}

$("#start-swiping").addEventListener("click", startSwiping);
$("#back-to-prompt").addEventListener("click", () => showScreen("screen-prompt"));

// ─── Swipe feed ───────────────────────────────────────────────────────────────
function currentRestaurant() { return deck[currentIndex]; }

function dietBadges(r) {
  const badges = [];
  if (r.vegetarian) badges.push('<div class="badge">🥦 Vegetarian</div>');
  else if (r.noPorkLard) badges.push(`<div class="badge">🚫🐖 ${t("dietNoPork")}</div>`);
  if (r.communityReports.halalCert > 0) {
    badges.push(`<div class="badge">🕌 Halal cert. reported (${r.communityReports.halalCert})</div>`);
  }
  if (r.rating) badges.push(`<div class="badge">⭐ ${r.rating.toFixed(1)}</div>`);
  return badges.join("");
}

function renderCurrentCard() {
  const deckEl = $("#deck");
  deckEl.innerHTML = "";
  if (currentIndex >= deck.length) { renderEmptyScreen(); showScreen("screen-empty"); return; }

  const r = currentRestaurant();
  const card = document.createElement("div");
  card.className = "card";
  const photoCount = (r._placePhotos?.length || (r.photos?.length) || 1);
  card.innerHTML = `
    <div class="card-photo" style="background:${r.gradient}">
      <div class="emoji-sticker">${r.emoji}</div>
      ${photoCount > 1 ? `<div class="photo-count">${t("photoCount", photoCount)}</div>` : ""}
      <div class="stamp like">LET'S GO</div>
      <div class="stamp nope">SKIP</div>
    </div>
    <div class="card-name">${r.name}</div>
    <div class="badge-row">
      ${dietBadges(r)}
      ${r.liveMusic ? '<div class="badge">🎵 Live music</div>' : ""}
      <div class="badge">${priceLabel(r.priceTier)}</div>
    </div>
    <div class="card-meta">${r.cuisine} · 📍 ${areaLabel(r)} · ${distanceTo(r).toFixed(1)} km · ${r.hours}</div>
    <div class="menu-preview">
      ${r.menu.length
        ? r.menu.map(m => `<div><span>${m.name}</span><span>RM${m.price}</span></div>`).join("")
        : `<div style="color:var(--ink-soft);font-size:12px;">Tap card for more info</div>`}
    </div>
  `;
  loadCardPhoto(r, card.querySelector(".card-photo")); // async, non-blocking
  deckEl.appendChild(card);
  attachSwipeHandlers(card);
}

function attachSwipeHandlers(card) {
  const likeStamp = card.querySelector(".stamp.like");
  const nopeStamp = card.querySelector(".stamp.nope");
  let dragging = false, startX = 0, startY = 0, dx = 0, dy = 0;
  const SWIPE_THRESHOLD = 110, TAP_THRESHOLD = 6;

  function onDown(e) {
    dragging = true;
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX; startY = p.clientY;
    card.style.transition = "none";
  }
  function onMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    dx = p.clientX - startX; dy = p.clientY - startY;
    card.style.transform = `translate(${dx}px,${dy * 0.15}px) rotate(${dx / 18}deg)`;
    likeStamp.style.opacity = Math.max(0, Math.min(1, dx / 100));
    nopeStamp.style.opacity = Math.max(0, Math.min(1, -dx / 100));
    e.preventDefault();
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.style.transition = "transform .25s ease";
    if (Math.max(Math.abs(dx), Math.abs(dy)) < TAP_THRESHOLD) {
      card.style.transform = "translate(0,0) rotate(0)";
      openDetail();
    } else if (dx > SWIPE_THRESHOLD)  { flyOut(1);
    } else if (dx < -SWIPE_THRESHOLD) { flyOut(-1);
    } else {
      card.style.transform = "translate(0,0) rotate(0)";
      likeStamp.style.opacity = 0; nopeStamp.style.opacity = 0;
    }
    dx = 0; dy = 0;
  }
  function flyOut(dir) {
    card.style.transform = `translate(${dir * 600}px,-40px) rotate(${dir * 30}deg)`;
    card.style.opacity = "0";
    setTimeout(() => { if (dir > 0) commitCurrent(); else skipCurrent(); }, 200);
  }

  card.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  card.addEventListener("touchstart", onDown, { passive: true });
  card.addEventListener("touchmove", onMove, { passive: false });
  card.addEventListener("touchend", onUp);
  card._flyOut = flyOut;
}

$("#skip-btn").addEventListener("click",   () => { const c = $("#deck .card"); if (c?._flyOut) c._flyOut(-1); });
$("#commit-btn").addEventListener("click", () => { const c = $("#deck .card"); if (c?._flyOut) c._flyOut(1);  });

function skipCurrent()  { const r = currentRestaurant(); if (r) skippedIds.add(r.id); currentIndex++; renderCurrentCard(); }
function commitCurrent() {
  const r = currentRestaurant();
  visitedIds.add(r.id);
  history.unshift({ restaurant: r, whenLabel: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
  renderCommit(r);
  showScreen("screen-commit");
}

// ─── Detail screen ────────────────────────────────────────────────────────────
function openDetail() { renderDetail(currentRestaurant()); showScreen("screen-detail"); }

const REPORT_KEYS = { noPorkLard: "reportNoPork", halalCert: "reportHalal", alcohol: "reportAlcohol" };

function renderDetail(r) {
  const mapsPlaceUrl = r.placeId
    ? `https://www.google.com/maps/place/?q=place_id:${r.placeId}`
    : `https://www.google.com/maps/search/${encodeURIComponent(r.name + " " + r.address)}`;

  const menuHTML = r.menu.length
    ? r.menu.map(m => `<div class="detail-menu-item"><span>${m.name}</span><span>RM${m.price}</span></div>`).join("")
    : `<div style="font-size:12.5px;color:var(--ink-soft);">
        <a href="${mapsPlaceUrl}" target="_blank" rel="noopener" style="color:var(--accent);">${t("viewOnMaps")}</a>
       </div>`;

  const reviewHTML = r._fromPlaces
    ? `<div class="review-quote">${r.review}</div>`
    : `<div class="review-quote">"${r.review}" — ${t("reviewBy")}</div>`;

  $("#detail-content").innerHTML = `
    <div class="detail-photo" id="detail-gallery-container" style="background:${r.gradient}">
      <div class="emoji-sticker">${r.emoji}</div>
    </div>
    <div class="card-name">${r.name}</div>
    <div class="badge-row">
      ${dietBadges(r)}
      ${r.liveMusic ? '<div class="badge">🎵 Live music</div>' : ""}
      <div class="badge">${priceLabel(r.priceTier)}</div>
    </div>
    <div class="card-meta">${r.cuisine} · 📍 ${areaLabel(r)} · ${distanceTo(r).toFixed(1)} km · ${r.hours}</div>
    <div class="detail-block">
      <div class="detail-block-title">${t("sectionAddress")}</div>
      <div style="font-size:12.5px;">📍 ${r.address}</div>
    </div>
    <div class="detail-block">
      <div class="detail-block-title">${t("sectionMenu")}</div>
      ${menuHTML}
    </div>
    <div class="detail-block">
      <div class="detail-block-title">${t("sectionReviews")}</div>
      ${reviewHTML}
    </div>
    <div class="detail-block">
      <div class="detail-block-title">${t("sectionCommunity")}</div>
      <div class="report-row" data-restaurant="${r.id}">
        ${Object.keys(REPORT_KEYS).map(key => `
          <button class="report-chip" data-key="${key}">
            <span>${t(REPORT_KEYS[key])}</span>
            <span class="count">(${r.communityReports[key]})</span>
          </button>`).join("")}
      </div>
      <div style="font-size:9px;color:var(--ink-soft);margin-top:6px;">${t("reportDisclaimer")}</div>
    </div>
  `;

  buildPhotoGallery(r, $("#detail-gallery-container")); // async, non-blocking

  $(".report-row", $("#detail-content")).addEventListener("click", (e) => {
    const btn = e.target.closest(".report-chip");
    if (!btn || btn.classList.contains("reported")) return;
    const key = btn.dataset.key;
    r.communityReports[key] += 1;
    btn.classList.add("reported");
    btn.querySelector(".count").textContent = `(${r.communityReports[key]})`;
  });
}

$("#back-to-feed").addEventListener("click", () => showScreen("screen-feed"));
$("#detail-skip-btn").addEventListener("click", () => { showScreen("screen-feed"); skipCurrent(); });
$("#detail-commit-btn").addEventListener("click", commitCurrent);

// ─── Commit screen ────────────────────────────────────────────────────────────
function renderCommit(r) {
  buildPhotoGallery(r, $("#commit-photo")); // async, non-blocking
  $("#commit-name").textContent = r.name;
  const dKm = distanceTo(r);
  const driveMins = Math.max(2, Math.round(dKm * 3));
  $("#commit-meta").innerHTML = `${dKm.toFixed(1)} km · ${t("driveMin", driveMins)}<br>📍 ${r.address}`;

  const destination = r.placeId
    ? `place_id:${r.placeId}`
    : encodeURIComponent(`${r.name}, ${r.address}`);
  let mapsUrl = r.placeId
    ? `https://www.google.com/maps/place/?q=place_id:${r.placeId}`
    : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  if (userCoords && !r.placeId) mapsUrl += `&origin=${userCoords.lat},${userCoords.lng}`;
  $("#navigate-link-maps").href = mapsUrl;
  $("#navigate-link-waze").href = `https://www.waze.com/ul?ll=${r.lat},${r.lng}&navigate=yes`;
}

$("#back-to-feed-from-commit").addEventListener("click", () => { currentIndex++; showScreen("screen-feed"); renderCurrentCard(); });

// ─── Empty deck screen ────────────────────────────────────────────────────────
function renderEmptyScreen() {
  const distanceIdx = DISTANCE_TIERS.indexOf(prefs.distance);
  const canWiden = distanceIdx > -1 && distanceIdx < DISTANCE_TIERS.length - 1;
  const widenBtn = $("#widen-distance-btn");
  const copyEl   = $("#empty-copy");

  if (canWiden) {
    const nextTier  = DISTANCE_TIERS[distanceIdx + 1];
    const nextLabel = nextTier === "any" ? t("anyDist").toLowerCase() : `≤${nextTier} km`;
    copyEl.textContent    = t("emptyWiden", prefs.distance);
    widenBtn.textContent  = t("widenBtn", nextLabel);
    widenBtn.style.display = "flex";
    widenBtn.onclick = () => { setChipValue("distance", nextTier); startSwiping(); };
  } else {
    copyEl.textContent     = t("emptyDefault");
    widenBtn.style.display = "none";
    widenBtn.onclick       = null;
  }
}

$("#restart-btn").addEventListener("click", () => showScreen("screen-prompt"));
$("#empty-history-btn").addEventListener("click", () => { renderHistory(); showScreen("screen-history"); });

// ─── History screen ───────────────────────────────────────────────────────────
function renderHistory() {
  const el = $("#history-list");
  if (history.length === 0) {
    el.innerHTML = `<div class="history-empty">${t("historyEmpty")}</div>`;
    return;
  }
  el.innerHTML = history.map(h => `
    <div class="history-item">
      <div class="history-emoji" style="background:${h.restaurant.gradient}">${h.restaurant.emoji}</div>
      <div class="history-name">${h.restaurant.name}</div>
      <div class="history-when">${h.whenLabel}</div>
    </div>`).join("");
}

$("#back-from-history").addEventListener("click", () => showScreen("screen-prompt"));

// ─── Init ─────────────────────────────────────────────────────────────────────
initAuth();
