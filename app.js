/* ==========================================================================
   REBUILT PRESENTATION SYSTEM JAVASCRIPT - INTERACTIVE ENGINE
   ========================================================================== */

const TIERS = {
  bronze: { label: 'Bronze (1x)', mult: 1.0, color: '#CD7F32', bg: '#FDF3E8', nextThreshold: 500, nextName: 'Silver' },
  silver: { label: 'Silver (1.5x)', mult: 1.5, color: '#888780', bg: '#F5F5F5', nextThreshold: 2000, nextName: 'Gold' },
  gold: { label: 'Gold (2x)', mult: 2.0, color: '#BA7517', bg: '#FFF8DC', nextThreshold: 5000, nextName: 'Platinum' },
  platinum: { label: 'Platinum (3x)', mult: 3.0, color: '#185FA5', bg: '#EEF2FF', nextThreshold: null, nextName: null }
};

const TIERS_B2B = {
  inactive: { label: 'Inactive (0%)', mult: 0.0, color: '#dc2626', bg: '#fee2e2', nextThreshold: 100000, nextName: 'Silver' },
  silver: { label: 'Silver (1%)', mult: 1.0, color: '#475569', bg: '#f1f5f9', nextThreshold: 500000, nextName: 'Gold' },
  gold: { label: 'Gold (2%)', mult: 2.0, color: '#b45309', bg: '#fef3c7', nextThreshold: 1000000, nextName: 'Platinum' },
  platinum: { label: 'Platinum (3%)', mult: 3.0, color: '#6d28d9', bg: '#ede9fe', nextThreshold: null, nextName: null }
};

// State trackers
let initialized = {};
let activeTheme = 'dark';
let activeMode = 'b2c';
let activePage = 'tech-presentation';

// Global tab routing
function showPage(id) {
  activePage = id;
  const PAGES = ['tech-presentation', 'journey', 'formula', 'step-formula', 'earn-events', 'tier-upgrade', 'redemption', 'engagement', 'renewal'];
  PAGES.forEach(p => {
    const pageEl = document.getElementById('page-' + p);
    const tabEl = document.getElementById('tab-' + p);
    if (pageEl) pageEl.classList.toggle('active', p === id);
    if (tabEl) tabEl.classList.toggle('active', p === id);
  });
  if (!initialized[id]) {
    initialized[id] = true;
    initPage(id);
  }
}
window.showPage = showPage;

function updatePageHeaders(mode) {
  const headers = {
    'tech-presentation': {
      b2c: { title: "Presenter Deck — B2C Customer Journey", sub: "Manoj Kumar ke end-to-end user actions aur points flows ko step-by-step presentation view mein samjhein." },
      b2b: { title: "Presenter Deck — B2B Partner Journey", sub: "4 partners (RizTech, Mega, ProBuild, SwiftTrade) ke end-to-end journeys aur calculations ko slides view mein samjhein." }
    },
    'journey': {
      b2c: { title: "Customer Journey — End to End", sub: "Customer aata hai — 11 systems kaise kaam karte hain saath mein (Hindi/English)" },
      b2b: { title: "Partner Journey — End to End", sub: "B2B Partner onboarding se rebate payout tak — 11 systems kaise sync mein kaam karte hain" }
    },
    'formula': {
      b2c: { title: "Points Formula Calculator", sub: "Live formula — order amount, rate, multiplier se points calculate karo" },
      b2b: { title: "Performance Score Calculator", sub: "Quarterly Revenue, YoY Growth, Order Frequency, Payments aur Training se scorecard calculate karo" }
    },
    'step-formula': {
      b2c: { title: "Points Formula — Step by Step Hindi", sub: "Ek ek step mein samjho — order se points tak ka poora safar" },
      b2b: { title: "Quarterly Scorecard — Step by Step Hindi", sub: "Partner case select karke quarterly score aur rebate breakdown check karein" }
    },
    'earn-events': {
      b2c: { title: "All 17 Earn Events — End to End", sub: "Har earn event ka flow, formula aur systems — Hindi mein examine karo" },
      b2b: { title: "All 6 B2B Partner Milestones", sub: "Sales target met, on-time payments, training certifications etc. — flow aur rewards Hindi mein examine karo" }
    },
    'tier-upgrade': {
      b2c: { title: "Tier Upgrade Flow — Hindi", sub: "Bronze → Silver → Gold → Platinum — 5 steps evaluation walkthrough" },
      b2b: { title: "Tier Evaluation System — B2B", sub: "Sales targets aur Performance Score metrics — upgrade aur risk management rules" }
    },
    'redemption': {
      b2c: { title: "Redemption + Tier Upgrade — Hindi", sub: "Points redeem karna aur tier upgrade — dono flows live calculator aur order cancellations refund ke saath" },
      b2b: { title: "Rebate & MDF Allocation + Returns SAGA", sub: "Net sales rebate rates, co-marketing MDF funds, aur returns clawback rollback flow" }
    },
    'engagement': {
      b2c: { title: "Customer Engagement & Gamification", sub: "12 strategies — Gamification, Personalization, Community, Surprise, Churn prevent" },
      b2b: { title: "Partner Engagement & Co-Marketing", sub: "8 B2B strategies — MDF co-funding, joint business planning, certifications, referrals, payment incentives" }
    },
    'renewal': {
      b2c: { title: "Renewal & Expiry Flow — Hindi", sub: "Points expiry, Tier renewal, Membership renewal — teeno scenarios" },
      b2b: { title: "Renewal & Expiry Flow — B2B", sub: "Rebate credits expiry, Annual tier validation, aur Contract renewal scenarios" }
    }
  };

  // Update tabs
  const tabJourney = document.getElementById('tab-journey');
  if (tabJourney) tabJourney.innerHTML = mode === 'b2c' ? '<i class="ti ti-route"></i>Customer Journey' : '<i class="ti ti-route"></i>Partner Journey';
  
  const tabFormula = document.getElementById('tab-formula');
  if (tabFormula) tabFormula.innerHTML = mode === 'b2c' ? '<i class="ti ti-calculator"></i>Points Formula' : '<i class="ti ti-calculator"></i>Performance Score';
  
  const tabStepFormula = document.getElementById('tab-step-formula');
  if (tabStepFormula) tabStepFormula.innerHTML = mode === 'b2c' ? '<i class="ti ti-stairs"></i>Step-by-Step' : '<i class="ti ti-stairs"></i>Quarterly Breakdown';
  
  const tabEarnEvents = document.getElementById('tab-earn-events');
  if (tabEarnEvents) tabEarnEvents.innerHTML = mode === 'b2c' ? '<i class="ti ti-gift"></i>Earn Events (17)' : '<i class="ti ti-gift"></i>Partner Milestones (6)';
  
  const tabTierUpgrade = document.getElementById('tab-tier-upgrade');
  if (tabTierUpgrade) tabTierUpgrade.innerHTML = mode === 'b2c' ? '<i class="ti ti-arrow-up-circle"></i>Tier Upgrade' : '<i class="ti ti-arrow-up-circle"></i>Tier Evaluation';
  
  const tabRedemption = document.getElementById('tab-redemption');
  if (tabRedemption) tabRedemption.innerHTML = mode === 'b2c' ? '<i class="ti ti-coin"></i>Redemption' : '<i class="ti ti-coin"></i>Rebate & MDF';
  
  const tabEngagement = document.getElementById('tab-engagement');
  if (tabEngagement) tabEngagement.innerHTML = mode === 'b2c' ? '<i class="ti ti-heart"></i>Engagement' : '<i class="ti ti-heart"></i>Partner Engagement';

  // Update page headers
  Object.keys(headers).forEach(id => {
    const page = document.getElementById('page-' + id);
    if (!page) return;
    const titleEl = page.querySelector('.ph-title');
    const subEl = page.querySelector('.ph-sub');
    if (titleEl && headers[id][mode]) titleEl.textContent = headers[id][mode].title;
    if (subEl && headers[id][mode]) subEl.textContent = headers[id][mode].sub;
  });
}

function setMode(mode) {
  activeMode = mode;
  const b2cBtn = document.getElementById('mode-b2c');
  const b2bBtn = document.getElementById('mode-b2b');
  if (b2cBtn) b2cBtn.classList.toggle('active', mode === 'b2c');
  if (b2bBtn) b2bBtn.classList.toggle('active', mode === 'b2b');
  document.documentElement.setAttribute('data-mode', mode);
  
  const logoText = document.querySelector('.logo span');
  if (logoText) {
    logoText.textContent = mode === 'b2c' ? 'B2C Loyalty' : 'B2B Partner Loyalty';
  }

  updatePageHeaders(mode);
  
  // Re-initialize active page
  initialized = {};
  initialized[activePage] = true;
  initPage(activePage);
}
window.setMode = setMode;

function initPage(id) {
  if (id === 'tech-presentation') initTechPresentation();
  else if (id === 'journey') initJourney();
  else if (id === 'formula') initFormula();
  else if (id === 'step-formula') initStepFormula();
  else if (id === 'earn-events') initEarnEvents();
  else if (id === 'tier-upgrade') initTierUpgrade();
  else if (id === 'redemption') initRedemption();
  else if (id === 'engagement') initEngagement();
  else if (id === 'renewal') initRenewal();
}

window.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  initPage('tech-presentation'); // Load tech-presentation tab by default
});

function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    activeTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', activeTheme);
  });
}

// Global Tier Controls helper
function makeTierCtrl(prefix, onchange, currentTier) {
  return `
    <div class="sect-label">Tier choose karo (Earning Multiplier)</div>
    <div class="tier-ctrl">
      ${['bronze', 'silver', 'gold', 'platinum'].map(k => `
        <button class="tier-btn ${k === currentTier ? 'sel' : ''}" 
                id="${prefix}-tb-${k}" 
                onclick="${onchange}('${k}')" 
                style="${k === currentTier ? `background:${TIERS[k].color}; border-color:${TIERS[k].color}; color:#fff;` : ''}">
          ${k.charAt(0).toUpperCase() + k.slice(1)} ${TIERS[k].mult}x
        </button>
      `).join('')}
      <span style="font-size:11px; color:var(--text-muted); margin-left:8px;">
        Active Multiplier: <strong id="${prefix}-tier-lbl" style="color:var(--text-main)">${TIERS[currentTier].label}</strong>
      </span>
    </div>
  `;
}

function updateTierBtns(prefix, selectedTier, callback) {
  ['bronze', 'silver', 'gold', 'platinum'].forEach(k => {
    const btn = document.getElementById(`${prefix}-tb-${k}`);
    if (!btn) return;
    if (k === selectedTier) {
      btn.classList.add('sel');
      btn.style.background = TIERS[k].color;
      btn.style.borderColor = TIERS[k].color;
      btn.style.color = '#fff';
    } else {
      btn.classList.remove('sel');
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }
  });
  const lbl = document.getElementById(`${prefix}-tier-lbl`);
  if (lbl) lbl.textContent = TIERS[selectedTier].label;
  callback();
}

// ==========================================================================
// PAGE 0: PRESENTER DECK (SIMPLE B2C MANOJ KUMAR JOURNEY)
// ==========================================================================
let presSlideIndex = 0;
const PRES_SLIDES = [
  {
    title: "B2C Loyalty Lifecycle: Manoj Kumar's Journey",
    short: "01. Executive Pitch",
    category: "WELCOME OVERVIEW",
    objective: "Maximize Customer Lifetime Value (CLV) & Retention",
    cx: "Manoj signs up, completes reviews/referrals, shops, upgrades to Silver, redeems points, and cancels orders with auto-refunds.",
    description: "End-to-end B2C customer journey showing how entry points, profiles, earn engines, and campaigns coordinate to drive retention.",
    math: "CLV = (Average Order Value × Purchase Frequency) × Lifespan",
    html: `
      <div class="pres-diagram" style="text-align:center; padding: 20px; min-height: 180px; flex-direction:column; justify-content:center; gap: 10px;">
        <div style="font-size: 50px; animation: heartbeat 2s infinite alternate;">👑</div>
        <h4 style="color:var(--color-cyan); font-family:var(--font-display); font-size:22px; font-weight:800; margin:0;">Manoj Kumar's Journey</h4>
        <p style="font-size:12px; color:var(--text-muted); margin:0;">B2C Loyalty Lifecycle Framework</p>
      </div>
    `,
    script: "Why are we building this? To increase CLV and retain customers long term."
  },
  {
    title: "Program Discovery (Entry Point Acquisition)",
    short: "02. Program Discovery",
    category: "1. ACQUISITION",
    objective: "Minimize Customer Acquisition Cost (CAC) via Social/Counter QR",
    cx: "Manoj counter par promo poster aur QR code dekhta hai: 'Get 100 Welcome Points instantly on Registration!' aur scan karta hai.",
    description: "Captures the entry channel source (e.g. In-store QR) to verify conversion tracking and attribute ROI per channel.",
    math: "Source Channel = 'In-Store_QR' | Campaign ID = 'WELCOME_100'",
    html: `
      <div class="pres-diagram" style="justify-content:center; align-items:center; gap:20px; padding: 15px; min-height: 180px;">
        <div style="text-align:center; background:rgba(6, 182, 212, 0.08); border:2px dashed var(--color-cyan); border-radius:12px; padding:15px; width:130px;">
          <div style="font-size:32px; margin-bottom:4px;">📱</div>
          <strong style="font-size:10px; color:#fff; display:block;">QR Code Scan</strong>
          <span style="font-size:8px; color:var(--text-muted);">In-Store Counter</span>
        </div>
        <div style="font-size:20px; color:var(--text-muted);"><i class="ti ti-arrow-narrow-right"></i></div>
        <div style="text-align:center; background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:12px; width:140px; box-shadow:var(--glow-cyan);">
          <div style="font-size:10px; font-weight:bold; color:var(--color-cyan); margin-bottom:4px;">PROMO PAGE</div>
          <div style="font-size:12px; font-weight:bold; color:#fff;">Get 100 Points</div>
          <div style="font-size:8px; color:var(--text-muted); margin-top:2px;">Sign up instantly</div>
        </div>
      </div>
    `,
    script: "Customer discovers our loyalty program — via Instagram, app, referral link."
  },
  {
    title: "CAC — Customer Acquisition Cost",
    short: "03. CAC Analysis",
    category: "1. ACQUISITION METRICS",
    objective: "Minimize Customer Acquisition Cost (CAC) and Maximize CLV Return",
    cx: "Loyalty program reduces ad spend by turning existing customers into organic acquisition channels.",
    description: "Loyalty module enables direct referrals, user-generated reviews, and organic social shares to cut down marketing CAC.",
    math: "CAC = Spend ÷ New Customers | ROI = CLV (RM 9,600) ÷ CAC | Target: CLV > CAC",
    html: `
      <div style="display:flex; flex-direction:column; gap:6px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">Interactive CAC & CLV Simulator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px; color:var(--text-main);">Marketing Spend</label>
          <input type="range" id="sim-slideCAC-spend" min="1000" max="20000" step="500" value="10000" oninput="simSlideCACCalc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:65px; text-align:right;" id="sim-slideCAC-spend-v">RM 10,000</span>
        </div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px; color:var(--text-main);">New Customers</label>
          <input type="range" id="sim-slideCAC-customers" min="10" max="500" step="10" value="100" oninput="simSlideCACCalc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:65px; text-align:right;" id="sim-slideCAC-customers-v">100 custs</span>
        </div>
        <div class="sim-grid" style="grid-template-columns: 1fr 1fr; gap:6px; font-size:11px; margin-top:4px;">
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">Average CAC</div><div class="sc-v" style="font-size:11px; color:var(--color-cyan); font-weight:bold;" id="sim-slideCAC-out-cac">RM 100</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">Manoj CLV</div><div class="sc-v" style="font-size:11px; color:#fff; font-weight:bold;">RM 9,600</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">ROI (CLV/CAC)</div><div class="sc-v" style="font-size:11px; color:var(--color-teal); font-weight:bold;" id="sim-slideCAC-out-roi">96.0x return</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center;" id="sim-slideCAC-status-wrap"><div id="sim-slideCAC-status" style="font-size:10px; font-weight:bold; color:var(--color-teal);">Profitable Business ✅</div></div>
        </div>
      </div>
    `,
    script: "CAC tells us how much we spend to acquire one customer — our loyalty module reduces CAC by turning existing customers into our best marketing channel through referrals, reviews and social sharing."
  },
  {
    title: "Manoj Registers & Customer 360 Card Creation",
    short: "04. Profile Registration",
    category: "2. ONBOARDING",
    objective: "Capture Zero-Party Demographics & Profile Creation",
    cx: "Manoj mobile par registration page par Name, Phone number aur Birthdate daal kar submit karta hai aur membership card pata hai.",
    description: "Database initializes a Customer 360 record, allocates unique Loyalty ID, and flags status as ACTIVE under Bronze level.",
    math: "Loyalty ID = LYL-MK998 | Initial Status = ACTIVE | Starting Tier = Bronze",
    html: `
      <div class="pres-diagram" style="justify-content:center; align-items:center; gap:10px; padding: 15px; min-height: 180px;">
        <div style="text-align:center; background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:12px; width:190px; position:relative; box-shadow:var(--glow-cyan);">
          <div style="position:absolute; top:-8px; right:8px; background:var(--color-cyan); color:#000; font-size:7px; font-weight:bold; padding:1px 4px; border-radius:10px;">LOYALTY CARD</div>
          <div style="font-size:8px; color:var(--text-muted); text-align:left; margin-bottom:3px;">B2C Loyalty Club</div>
          <div style="font-size:13px; font-weight:bold; color:#fff; text-align:left;">Manoj Kumar</div>
          <div style="font-size:10px; font-family:monospace; color:var(--color-cyan); text-align:left; margin-top:2px;">ID: LYL-MK998</div>
          <div style="font-size:8px; color:var(--text-muted); text-align:left; margin-top:8px; border-top:1px solid var(--border-color); padding-top:4px; display:flex; justify-content:space-between;">
            <span>Tier: Bronze</span>
            <span>Balance: 0 pts</span>
          </div>
        </div>
      </div>
    `,
    script: "Customer registers — profile is created in our system."
  },
  {
    title: "Welcome Bonus Delights Manoj (Instant Hook)",
    short: "05. Welcome Onboarding",
    category: "3. WELCOME CAMPAIGN",
    objective: "Increase App Open Rates & Drive Onboarding Loyalty Loop",
    cx: "Registration poora hote hi Manoj ko WhatsApp par welcome greeting aur account wallet mein instant +100 points milte hain.",
    description: "Welcome Campaign automation dispatches Points Engine deposit ledger write and launches WhatsApp API webhook greeting.",
    math: "Wallet Balance = 0 (Base) + 100 (Welcome Gift) = 100 pts (RM 1.00 Value)",
    html: `
      <div class="pres-diagram" style="flex-direction:column; gap:10px; padding: 15px; min-height: 180px;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin:0 auto; background:var(--bg-main); border:1px solid var(--border-color); padding:8px 12px; border-radius:8px;">
          <span style="font-size:11px; color:var(--text-muted);">Manoj Wallet Balance:</span>
          <strong style="color:var(--color-teal); font-size:14px; display:flex; align-items:center; gap:4px;"><i class="ti ti-coin" style="color:var(--color-amber);"></i> 100 points</strong>
        </div>
        <div style="background:#075E54; border-radius:8px; padding:8px 12px; width:100%; max-width:320px; margin:0 auto; font-size:10.5px; text-align:left; color:#fff; line-height:1.35;">
          <div style="font-size:7px; font-weight:bold; color:#25D366; margin-bottom:2px; display:flex; align-items:center; gap:3px;"><i class="ti ti-brand-whatsapp"></i> WhatsApp Onboarding Alert</div>
          "Swagat hai, Manoj! 🎁 Account join karne par humne aapke wallet mein +100 points credit kar diye hain."
        </div>
      </div>
    `,
    script: "100 welcome points are credited automatically on registration."
  },
  {
    title: "Manoj's First Purchase (Points Calculation)",
    short: "06. First Purchase",
    category: "4. POINTS ACCRUAL",
    objective: "Stimulate First Purchase Conversion & High Basket Size",
    cx: "Manoj skincare items billing counter par khareedta hai: subtotal RM 200. Bronze speed (1x) se calculations chalti hain.",
    description: "Accrual engine reads subtotal price, fetches configuration multiplier settings, and runs point math calculation.",
    math: "RM 200 (Spend) × 1 pt/RM (Rate) × 1.0 (Bronze Multiplier) = +200 points",
    html: `
      <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">Interactive Math Simulator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Spend (RM)</label>
          <input type="range" id="sim-slide5-spend" min="10" max="500" step="10" value="200" oninput="simSlide5Calc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:60px; text-align:right;" id="sim-slide5-spend-v">RM 200</span>
        </div>
        <div style="display:flex; gap:10px; justify-content:center; align-items:center; font-family:var(--font-display); font-size:12px; margin-top:4px;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; text-align:center;">
            <span style="font-size:8px; color:var(--text-muted); display:block;">Spend</span>
            <strong id="sim-slide5-out-spend">RM 200</strong>
          </div>
          <div>×</div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; text-align:center;">
            <span style="font-size:8px; color:var(--text-muted); display:block;">Bronze Rate</span>
            <strong style="color:var(--color-amber);">1 pt/RM</strong>
          </div>
          <div>=</div>
          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); padding:4px 8px; border-radius:6px; text-align:center;">
            <span style="font-size:8px; color:var(--color-teal); display:block;">Earned Points</span>
            <strong style="color:var(--color-teal);" id="sim-slide5-out-pts">+200 pts</strong>
          </div>
        </div>
      </div>
    `,
    script: "First order placed — points earned instantly via earn engine."
  },
  {
    title: "Manoj refers friend Rahul (Organic Acquisition)",
    short: "07. Friend Referral",
    category: "5. ADVOCACY REFERRAL",
    objective: "Drive Viral Organic Signup Loops to Minimize Ad Spends",
    cx: "Manoj app referral link link WhatsApp par dost Rahul ko share karta hai. Rahul register hote hi Manoj ko +50 points bonus milte hain.",
    description: "Referral campaign listens to invite conversions, runs distinct referee verification, and credits referrer points.",
    math: "Wallet Balance = 300 (Previous) + 50 (Referral bonus) = 350 points",
    html: `
      <div class="pres-diagram" style="justify-content:space-around; align-items:center; padding: 15px; min-height: 180px; gap:8px;">
        <div style="text-align:center; background:var(--bg-main); border:1px solid var(--border-color); padding:8px; border-radius:8px; width:100px;">
          <div style="font-size:20px;">👨 Manoj</div>
          <span style="font-size:8px; color:var(--color-cyan); font-weight:bold;">Shared Link</span>
        </div>
        <div style="font-size:16px; color:var(--text-muted);"><i class="ti ti-share-2"></i></div>
        <div style="text-align:center; background:rgba(6,182,212,0.05); border:1px dashed var(--border-color); padding:8px; border-radius:8px; width:100px;">
          <div style="font-size:20px;">👦 Rahul</div>
          <span style="font-size:8px; color:var(--color-teal); font-weight:bold;">Signed Up</span>
        </div>
        <div style="font-size:16px; color:var(--text-muted);"><i class="ti ti-arrow-narrow-right"></i></div>
        <div style="text-align:center; background:rgba(16,185,129,0.08); border:1px solid var(--color-teal); padding:8px; border-radius:8px; width:90px;">
          <div style="font-size:9px; font-weight:bold; color:var(--color-teal);">Referral</div>
          <strong style="color:var(--color-teal); font-size:12px;">+50 pts</strong>
        </div>
      </div>
    `,
    script: "Manoj refers a friend — both get bonus points."
  },
  {
    title: "Product Review Submission (Engagement)",
    short: "08. Product Review",
    category: "6. APP ENGAGEMENT",
    objective: "Generate Authentic User Reviews & Enrich User Profiles",
    cx: "Manoj purchase cosmetics par app mein 5-star comments feedback post reviews complete submit karta hai.",
    description: "App Hub listens to reviews write, validates verified checkout matching, and credits engagement bonus points.",
    math: "Wallet Balance = 350 (Previous) + 20 (Review Reward) = 370 points",
    html: `
      <div class="pres-diagram" style="flex-direction:column; gap:8px; padding: 15px; min-height: 180px; justify-content:center;">
        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:8px; padding:8px 12px; width:100%; max-width:320px; margin:0 auto; text-align:left;">
          <div style="color:var(--color-amber); font-size:12px; margin-bottom:2px;">⭐⭐⭐⭐⭐</div>
          <p style="font-size:10.5px; color:var(--text-main); font-style:italic; margin:0;">"Super cosmetics! Very smooth on skin."</p>
          <span style="font-size:7px; color:var(--text-muted); display:block; margin-top:2px;">- Manoj Kumar (Verified Purchase)</span>
        </div>
        <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); color:var(--color-teal); font-size:10.5px; font-weight:bold; border-radius:20px; padding:3px 12px; display:inline-block;">
          ✨ Product Review Bonus: +20 points added!
        </div>
      </div>
    `,
    script: "Manoj writes a review — earn event triggered, points credited."
  },
  {
    title: "Instagram Product Share (Social Integration)",
    short: "09. Social Share",
    category: "7. SOCIAL ADVOCACY",
    objective: "Acquire Secondary Organic Exposure via Customer Networks",
    cx: "Manoj app ke unique hooks share target click Instagram post tag complete karta hai.",
    description: "Webhook captures Instagram social tag post validation and updates ledger points credit.",
    math: "Wallet Balance = 370 (Previous) + 15 (Social Share Reward) = 385 points",
    html: `
      <div class="pres-diagram" style="justify-content:center; align-items:center; gap:16px; padding: 15px; min-height: 180px;">
        <div style="text-align:center; background:#E1306C; color:#fff; border-radius:12px; padding:10px 15px; width:140px; font-family:var(--font-display);">
          <div style="font-size:22px; margin-bottom:2px;"><i class="ti ti-brand-instagram"></i></div>
          <strong style="font-size:10px;">Instagram Share</strong>
          <span style="font-size:8px; opacity:0.8; display:block;">Verified</span>
        </div>
        <div style="font-size:18px; color:var(--text-muted);"><i class="ti ti-arrow-narrow-right"></i></div>
        <div style="text-align:center; background:rgba(16,185,129,0.08); border:1px solid var(--color-teal); border-radius:12px; padding:10px; width:120px;">
          <div style="font-size:8px; color:var(--color-teal); font-weight:bold;">Points Added</div>
          <strong style="font-size:16px; color:var(--color-teal);">+15 pts</strong>
          <span style="font-size:8px; color:var(--text-muted); display:block; margin-top:2px;">Total: 385 pts</span>
        </div>
      </div>
    `,
    script: "Manoj shares on social media — social share earn event fires."
  },
  {
    title: "Cumulative 500+ Points: Silver Status Upgrade",
    short: "10. Silver Upgrade",
    category: "8. TIER UPGRADE",
    objective: "Drive Customer Loyalty Lock-in & Elevate Retention Metrics",
    cx: "Manoj RM 150 ka aur checkout spent karta hai (earns 150 points). Lifetime points 535 cross hotey hi Tier upgraded to Silver.",
    description: "Evaluation scan detects cumulative lifetime target points 500 threshold, upgrades tier status fields to Silver.",
    math: "Lifetime Points = 385 + 150 = 535 pts (> 500 limit) | Status = Upgraded to Silver",
    html: `
      <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">Interactive Tier Milestone Simulator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Lifetime Pts</label>
          <input type="range" id="sim-slide9-points" min="0" max="1000" step="50" value="535" oninput="simSlide9Calc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:60px; text-align:right;" id="sim-slide9-points-v">535 pts</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-display); font-size:11px; margin-top:4px;">
          <div style="background:var(--bg-main); border:2px solid var(--color-cyan); padding:8px 12px; border-radius:8px; width:100%; text-align:center; box-shadow:var(--glow-cyan); transition:all 0.3s;" id="sim-slide9-card">
            <div style="font-size:8px; color:var(--text-muted);">Manoj Membership Card Level</div>
            <strong style="font-size:13px; color:var(--color-cyan);" id="sim-slide9-card-tier">Silver Elite</strong>
            <span style="font-size:9.5px; display:block; margin-top:2px;" id="sim-slide9-card-mult">1.5x speed multiplier active</span>
          </div>
        </div>
      </div>
    `,
    script: "Manoj crosses 500 lifetime points — tier engine upgrades him to Silver."
  },
  {
    title: "Shopping as a Silver Member (Earning Boost)",
    short: "11. Silver Earning",
    category: "9. ACCRUAL SPEED BOOST",
    objective: "Leverage Multipliers to Drive Customer Lifetime Value (CLV)",
    cx: "Manoj skincare products RM 100 spent check complete karta hai. Multipliers speed 1.5x active hone se +150 points credit active.",
    description: "Multiplier boosts earning rates: Silver members get 50% extra points, driving higher repeat orders frequency.",
    math: "Points Earned = RM 100 spent × 1 pt/RM × 1.5x Multiplier = +150 points",
    html: `
      <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">Interactive Earning Speed Calculator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Spend (RM)</label>
          <input type="range" id="sim-slide10-spend" min="10" max="500" step="10" value="100" oninput="simSlide10Calc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:60px; text-align:right;" id="sim-slide10-spend-v">RM 100</span>
        </div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Select Tier</label>
          <select id="sim-slide10-tier" onchange="simSlide10Calc()" style="background:var(--bg-main); border:1px solid var(--border-color); color:#fff; font-size:11px; padding:3px 6px; border-radius:4px; flex:1; cursor:pointer;">
            <option value="bronze">Bronze (1.0x)</option>
            <option value="silver" selected>Silver (1.5x)</option>
            <option value="gold">Gold (2.0x)</option>
            <option value="platinum">Platinum (3.0x)</option>
          </select>
        </div>
        <div style="display:flex; gap:10px; justify-content:center; align-items:center; font-family:var(--font-display); font-size:12px; margin-top:4px;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; text-align:center; flex:1;">
            <span style="font-size:8px; color:var(--text-muted); display:block;">Spend</span>
            <strong id="sim-slide10-out-spend">RM 100</strong>
          </div>
          <div>×</div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; text-align:center; flex:1;">
            <span style="font-size:8px; color:var(--text-muted); display:block;">Multiplier</span>
            <strong id="sim-slide10-out-mult" style="color:var(--color-cyan);">1.5x</strong>
          </div>
          <div>=</div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:4px 8px; border-radius:6px; text-align:center; flex:1; box-shadow:var(--glow-cyan);">
            <span style="font-size:8px; color:var(--color-cyan); display:block;">Earned</span>
            <strong style="color:var(--color-cyan);" id="sim-slide10-out-pts">+150 pts</strong>
          </div>
        </div>
      </div>
    `,
    script: "Now Manoj earns at 1.5x multiplier instead of 1x."
  },
  {
    title: "Points Redemption (Checkout Discount)",
    short: "12. Redemption Start",
    category: "10. POINTS REDEMPTION",
    objective: "Promote Point Burning to Decrease Financial Accrued Liabilities",
    cx: "Manoj checkout cart order subtotal value RM 100 load checks. Wallet has 685 points. Manoj options tick select.",
    description: "App checks available wallet balance, matches conversion settings, and prompts cash discount checkout options.",
    math: "Conversion Rules: 100 points = RM 1.00 Discount cash value",
    html: `
      <div class="pres-diagram" style="justify-content:center; align-items:center; gap:20px; padding: 15px; min-height: 180px;">
        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:12px; width:200px; box-shadow:var(--glow-purple);">
          <div style="font-size:9px; color:var(--text-muted); margin-bottom:3px;">Checkout Billing Page</div>
          <div style="font-size:13px; font-weight:bold; color:#fff; display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>Cart Total:</span>
            <span>RM 100.00</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px; background:rgba(99,102,241,0.08); border:1px solid var(--color-primary); padding:5px 8px; border-radius:6px; margin-top:8px;">
            <input type="checkbox" checked disabled>
            <span style="font-size:10px; color:#fff; font-weight:bold;">Redeem 600 pts</span>
          </div>
          <div style="font-size:8px; color:var(--text-muted); margin-top:3px;">
            (Available: 685 points)
          </div>
        </div>
      </div>
    `,
    script: "Manoj redeems points at checkout — discount applied."
  },
  {
    title: "Applying the 20% Redemption Capping Guardrail",
    short: "13. Redemption Cap",
    category: "11. REDEMPTION LIMITS",
    objective: "Protect Brand Gross Margin via Cart Redemption Caps",
    cx: "System enforces 20% max cart discount limit. Manoj redeems 600 points (RM 6.00 off). Payable bill drops to RM 94.00.",
    description: "Redemption capped at 20% subtotal value. Wallet debits 600 pts, lifetime points remain same so tier level status safe.",
    math: "Max discount cap = RM 100 × 20% = RM 20 (2,000 pts limit) | Redeemed: 600 pts (RM 6.00 off)",
    html: `
      <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">Interactive Redemption Capping Simulator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Cart Total (RM)</label>
          <input type="range" id="sim-slide11-total" min="10" max="500" step="10" value="100" oninput="simSlide11Calc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:60px; text-align:right;" id="sim-slide11-total-v">RM 100</span>
        </div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Wallet Points</label>
          <input type="range" id="sim-slide11-wallet" min="0" max="3000" step="50" value="685" oninput="simSlide11Calc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-teal); min-width:60px; text-align:right;" id="sim-slide11-wallet-v">685 pts</span>
        </div>
        <div class="sim-grid" style="grid-template-columns: 1fr 1fr; gap:6px; font-size:11px; margin-top:4px;">
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px;">Max Cap (20%)</div><div class="sc-v" style="font-size:11px; color:var(--color-coral);" id="sim-slide11-out-cap">RM 20.00</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px;">Points Used</div><div class="sc-v" style="font-size:11px; color:var(--color-teal);" id="sim-slide11-out-pts">600 pts</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px;">Discount Cash</div><div class="sc-v" style="font-size:11px; color:var(--color-teal);" id="sim-slide11-out-disc">RM 6.00</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px;">Final Payable</div><div class="sc-v" style="font-size:11px; color:#fff;" id="sim-slide11-out-payable">RM 94.00</div></div>
        </div>
      </div>
    `,
    script: "Max 20% of order value can be redeemed — cap enforced."
  },
  {
    title: "Stockout Order Cancellation: Points Refund",
    short: "14. Cancel & Refund",
    category: "12. ERROR COMPENSATIONS",
    objective: "Preserve Customer Trust & Guarantee Seamless Error Recoveries",
    cx: "Item out-of-stock hotey hi system order cancel completes. Wallet automatically receives points refund: +600 points back.",
    description: "Transaction failure triggers compensation: reversing point debits, restoring points balance wallet instantly.",
    math: "Wallet balance = 85 (Remaining) + 600 (Compensation Refund) = 685 points",
    html: `
      <div class="pres-diagram" style="flex-direction:column; gap:10px; padding: 15px; min-height: 180px; justify-content:center;">
        <div style="display:flex; justify-content:space-around; align-items:center; width:100%; max-width:340px; margin:0 auto;">
          <div style="text-align:center; opacity:0.6;">
            <div style="font-size:20px;">🛒</div>
            <div style="font-size:8px; margin-top:2px;">Order Placed</div>
          </div>
          <div style="color:var(--color-coral); font-size:16px;"><i class="ti ti-arrow-right"></i></div>
          <div style="text-align:center; background:rgba(244, 63, 94, 0.08); border:1px solid var(--color-coral); padding:5px 8px; border-radius:8px;">
            <div style="font-size:20px;">🚨</div>
            <div style="font-size:8px; font-weight:bold; color:var(--color-coral); margin-top:2px;">Out of Stock</div>
          </div>
          <div style="color:var(--color-teal); font-size:16px;"><i class="ti ti-arrow-right"></i></div>
          <div style="text-align:center; background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); padding:5px 8px; border-radius:8px;">
            <div style="font-size:20px;">🪙</div>
            <div style="font-size:8px; font-weight:bold; color:var(--color-teal); margin-top:2px;">Refunded +600</div>
          </div>
        </div>
      </div>
    `,
    script: "Manoj cancels order — redeemed points auto-refunded to wallet."
  },
  {
    title: "Weekly Missions & Challenges (Gamification)",
    short: "15. Mission Bonus",
    category: "13. GAMIFICATION",
    objective: "Drive Recurring Habits & Elevate Purchase Frequencies",
    cx: "Manoj weekly mission completes: 'Make 2 orders of RM 50+ in a week.' Gets +200 bonus points. Balance goes to 885.",
    description: "Mission engine verifies order frequencies, checks threshold spend limits, and awards bonus points on goal completes.",
    math: "Wallet Balance = 685 (Previous) + 200 (Weekly Mission Bonus) = 885 points",
    html: `
      <div class="pres-diagram" style="flex-direction:column; justify-content:center; align-items:center; gap:6px; padding: 15px; min-height: 180px;">
        <div style="font-size:28px; animation: heartbeat 1.5s infinite alternate;">🏆</div>
        <strong style="font-size:12px; color:#fff;">Mission: "Double Order Shopper"</strong>
        <div style="background:rgba(16, 185, 129, 0.12); border:1px solid var(--color-teal); color:var(--color-teal); border-radius:20px; padding:3px 12px; font-size:10.5px; font-weight:bold;">
          🎯 Status: Completed! +200 points credited.
        </div>
      </div>
    `,
    script: "Manoj completes a weekly challenge — bonus points credited."
  },
  {
    title: "Birthday celebration & Surprise Drops",
    short: "16. Birthday & Surprise",
    category: "14. SURPRISE & DELIGHT",
    objective: "Improve Brand Sentiment & Emotional Customer Retention",
    cx: "Manoj gets automatically +100 points on birthday and +50 points as a surprise weekend drop. Wallet: 1035 points.",
    description: "Daily scanner sweeps database DOB fields. Campaign engine triggers random surprise points drops to target segments.",
    math: "Wallet balance = 885 + 100 (Birthday Gift) + 50 (Surprise drop) = 1,035 points",
    html: `
      <div class="pres-diagram" style="flex-direction:column; justify-content:center; align-items:center; gap:8px; padding: 15px; min-height: 180px;">
        <div style="font-size:32px; animation: heartbeat 1.5s infinite alternate;">🎂</div>
        <div style="font-weight:bold; font-size:13px; color:#fff;">Happy Birthday & surprise drop!</div>
        <div style="background:rgba(245, 158, 11, 0.12); border:1px solid var(--color-amber); color:var(--color-amber); border-radius:20px; padding:4px 12px; font-size:10.5px; font-weight:bold;">
          🎁 Rewards Credited: +100 Birthday pts + 50 Surprise pts
        </div>
      </div>
    `,
    script: "On Manoj's birthday — double earning rate activated automatically."
  },
  {
    title: "Manoj goes Inactive: Dormancy Tagging",
    short: "17. Dormancy Warning",
    category: "15. CHURN PREVENT",
    objective: "Track Churn Indicators & Automate Reactivation Triggers",
    cx: "Manoj 45 din tak shopping nahi karta. Segmentation tag automatically updates from ACTIVE to DORMANT.",
    description: "Inactivity scanner checks days since last transaction. Dormant tag change launches campaign winbacks flows.",
    math: "Inactivity Days = 45 | Segment = 'DORMANT' | Reactivation Campaign active",
    html: `
      <div class="pres-diagram" style="justify-content:center; align-items:center; gap:12px; padding: 15px; min-height: 180px;">
        <div style="text-align:center; background:rgba(244,63,94,0.08); border:1px solid var(--color-coral); border-radius:12px; padding:10px; width:110px;">
          <div style="font-size:24px; margin-bottom:3px;">⏰</div>
          <span style="font-size:9px; font-weight:bold; color:var(--color-coral); display:block;">45 Days Inactive</span>
        </div>
        <div style="font-size:16px; color:var(--text-muted);"><i class="ti ti-arrow-right"></i></div>
        <div style="text-align:left; background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:10px 12px; flex:1;">
          <strong style="color:var(--color-amber); font-size:10px;">Cohort updates:</strong>
          <span style="font-size:11px; color:var(--text-main); display:block; margin-top:2px;">User tag changed to DORMANT. Winback active.</span>
        </div>
      </div>
    `,
    script: "Manoj inactive for X days — win-back campaign triggered."
  },
  {
    title: "Points Expiry Warnings (WhatsApp Nudge)",
    short: "18. Expiry Nudge",
    category: "16. LOSS AVERSION",
    objective: "Use Loss-Aversion Messaging to Drive Reactivations",
    cx: "Manoj ko WhatsApp nudge warning milti hai: 'Manoj, RM 10.35 cash equivalent values points expire hone wale hain, shop now!'",
    description: "Loss aversion prompts users to checkout. System dispatches warnings at Day -30, -7 reminders before points clear.",
    math: "Points At Risk = 1,035 pts (RM 10.35 value) | Warning trigger = Day -30 from Expiry",
    html: `
      <div style="background:#075E54; border-radius:10px; padding:10px 14px; width:100%; max-width:320px; margin:0 auto; font-size:11px; text-align:left; color:#fff; line-height:1.4; box-shadow:0 4px 10px rgba(0,0,0,0.15);">
        <div style="font-size:8px; font-weight:bold; color:#25D366; margin-bottom:3px; display:flex; align-items:center; gap:3px;"><i class="ti ti-brand-whatsapp"></i> WhatsApp Expiry Warning</div>
        "Urgent: Manoj! ⏰ Your 1035 points (value RM 10.35) are expiring in 30 days. Use them on your next order before they disappear!"
      </div>
    `,
    script: "Manoj's points about to expire — urgent notification sent."
  },
  {
    title: "Points Expired & Tier Status Grace Buffer",
    short: "19. Expiry & Grace",
    category: "17. EXPIRY & GRACE",
    objective: "Clean Financial Liabilities while Protecting Tier Status Value",
    cx: "12 mahine tak shopping na hone par points zero ho jate hain. Par Silver tier status 30-day grace protection period mein chala jata hai.",
    description: "Cron scheduler resets points balance = 0, writes EXPIRED_TX. Silver tier status enters 30-day buffer to retain perks.",
    math: "Unused Points = 0 (Expired) | Tier Status = Silver Elite (Locked under 30-day Grace Period)",
    html: `
      <div class="pres-diagram" style="flex-direction:column; gap:10px; padding: 15px; min-height: 180px; justify-content:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin:0 auto; background:var(--bg-main); border:1px solid var(--border-color); padding:8px; border-radius:8px;">
          <span style="font-size:11px; color:var(--text-muted);">Points Wallet:</span>
          <strong style="color:var(--color-coral); font-size:13px;">0 points (Expired)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin:0 auto; background:var(--bg-main); border:1px solid var(--border-color); padding:8px; border-radius:8px;">
          <span style="font-size:11px; color:var(--text-muted);">Status Protection:</span>
          <strong style="color:var(--color-cyan); font-size:13px;">Silver Tier (30-day Grace)</strong>
        </div>
      </div>
    `,
    script: "Points expired — grace period given before final cancellation."
  }
];

const PRES_SLIDES_B2B = [
  {
    title: "B2B Partner Loyalty Lifecycle: 4 Journeys",
    short: "01. Executive Pitch",
    category: "WELCOME OVERVIEW",
    objective: "Maximize Partner Lifetime Value (PLV) & Retention",
    cx: "Partners register, complete certifications, make purchases, upgrade tiers, earn rebates, and coordinate returns.",
    description: "End-to-end B2B partner loyalty journey showing how score calculators, rebate disbursements, and audits drive retention.",
    math: "PLV = (Average Order Value × Purchase Frequency) × Retention Lifespan",
    html: `
      <div class="pres-diagram" style="text-align:center; padding: 20px; min-height: 180px; flex-direction:column; justify-content:center; gap: 10px;">
        <div style="font-size: 50px; animation: heartbeat 2s infinite alternate;">🤝</div>
        <h4 style="color:var(--color-cyan); font-family:var(--font-display); font-size:20px; font-weight:800; margin:0;">B2B Partner Loyalty Program</h4>
        <p style="font-size:12px; color:var(--text-muted); margin:0;">End-to-End Visual Flow & Calculations</p>
      </div>
    `,
    script: "Good morning/afternoon everyone. Today I will present our complete B2B Partner Loyalty Module — end to end. We will follow our 4 partner journeys to demonstrate the performance score card, rebate system, and tier upgrade/downgrade logic."
  },
  {
    title: "4-Tier Partner System Overview",
    short: "02. Tier Requirements",
    category: "TIER REQUIREMENTS",
    objective: "Define Clear Performance & Revenue Thresholds for Partner Growth",
    cx: "Partners are evaluated quarterly and placed in Inactive, Silver, Gold, or Platinum based on sales and performance score.",
    description: "Platinum gets 3% rebate + RM 5k MDF. Gold gets 2% rebate + RM 2k MDF. Silver gets 1% rebate. Inactive gets 0% rebate.",
    math: "Platinum: RM 1M+ & Score >= 850 | Gold: RM 500K+ & Score >= 700 | Silver: RM 100K+ & Score >= 500",
    html: `
      <div class="pres-diagram" style="display:flex; flex-direction:column; gap:6px; padding: 12px; min-height: 180px; justify-content:center; font-size:10px; width:100%;">
        <div style="display:flex; gap:6px; justify-content:space-around;">
          <div style="background:rgba(109,40,217,0.1); border:1px solid #6d28d9; padding:5px; border-radius:6px; width:70px; text-align:center;">
            <strong style="color:#6d28d9; display:block;">Platinum</strong>
            <span>RM 1M+<br>Rebate: 3%</span>
          </div>
          <div style="background:rgba(180,83,9,0.1); border:1px solid #b45309; padding:5px; border-radius:6px; width:70px; text-align:center;">
            <strong style="color:#b45309; display:block;">Gold</strong>
            <span>RM 500K+<br>Rebate: 2%</span>
          </div>
          <div style="background:rgba(71,85,105,0.1); border:1px solid #475569; padding:5px; border-radius:6px; width:70px; text-align:center;">
            <strong style="color:#475569; display:block;">Silver</strong>
            <span>RM 100K+<br>Rebate: 1%</span>
          </div>
          <div style="background:rgba(220,38,38,0.1); border:1px solid #dc2626; padding:5px; border-radius:6px; width:70px; text-align:center;">
            <strong style="color:#dc2626; display:block;">Inactive</strong>
            <span>Below 100K<br>Rebate: 0%</span>
          </div>
        </div>
      </div>
    `,
    script: "Humare partners ko unki annual purchase aur performance ke basis par 4 tiers mein divide kiya jata hai. Platinum ko high status milta hai with 3% rebate aur RM 5,000 marketing funds (MDF)."
  },
  {
    title: "B2B CAC — Customer Acquisition Cost",
    short: "03. CAC Analysis",
    category: "B2B ACQUISITION METRICS",
    objective: "Minimize B2B Acquisition Spend and Maximize Lifetime Value",
    cx: "Self-service partner portal reduces onboarding and support cost, directly lowering CAC.",
    description: "Track partner acquisition cost against their lifetime purchase value to ensure long term profitability.",
    math: "CAC = (Sales Team Cost + Onboarding Spend) ÷ New Partners Acquired | PLV Target > CAC",
    html: `
      <div style="display:flex; flex-direction:column; gap:6px; width:100%; max-width:340px; margin:0 auto;">
        <div class="sect-label" style="margin-bottom:2px;">B2B CAC & Partner Value Simulator</div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Marketing/Sales Spend</label>
          <input type="range" id="sim-slideCAC-spend" min="5000" max="100000" step="5000" value="50000" oninput="simSlideCACCalc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:65px; text-align:right;" id="sim-slideCAC-spend-v">RM 50,000</span>
        </div>
        <div class="ctrl-row" style="margin-bottom:4px;">
          <label style="min-width:110px; font-size:11px;">Partners Acquired</label>
          <input type="range" id="sim-slideCAC-customers" min="5" max="50" step="1" value="10" oninput="simSlideCACCalc()" style="flex:1;">
          <span style="font-family:monospace; font-size:11px; font-weight:bold; color:var(--color-cyan); min-width:65px; text-align:right;" id="sim-slideCAC-customers-v">10 partners</span>
        </div>
        <div class="sim-grid" style="grid-template-columns: 1fr 1fr; gap:6px; font-size:11px; margin-top:4px;">
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">Partner CAC</div><div class="sc-v" style="font-size:11px; color:var(--color-cyan); font-weight:bold;" id="sim-slideCAC-out-cac">RM 5,000</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">Partner PLV</div><div class="sc-v" style="font-size:11px; color:#fff; font-weight:bold;">RM 250,000</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color);"><div class="sc-l" style="font-size:8px; margin-bottom:1px; color:var(--text-muted);">ROI (PLV/CAC)</div><div class="sc-v" style="font-size:11px; color:var(--color-teal); font-weight:bold;" id="sim-slideCAC-out-roi">50.0x return</div></div>
          <div class="sim-cell" style="padding:6px; background:var(--bg-main); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center;" id="sim-slideCAC-status-wrap"><div id="sim-slideCAC-status" style="font-size:10px; font-weight:bold; color:var(--color-teal);">Profitable Business ✅</div></div>
        </div>
      </div>
    `,
    script: "B2B Partner acquisition is expensive due to sales cycles. Loyalty portals and partner-get-partner programs reduce CAC. Humara goal hai ki PLV (Partner Lifetime Value) hamesha CAC se zyada ho."
  },
  {
    title: "Partner Performance Score (1,000 Points)",
    short: "04. Scoring Formula",
    category: "SCORE CARD",
    objective: "Align Partner Rewards with Comprehensive Purchase & Behavior KPIs",
    cx: "System aggregates revenue, growth, frequency, payment, and training scores every quarter.",
    description: "Weighted components translate to a single partner score, deciding the tier for next quarter.",
    math: "Score = (Rev × 400) + (Growth × 200) + (Freq × 150) + (Pay × 150) + (Train × 100)",
    html: `
      <div style="display:flex; flex-direction:column; gap:5px; font-size:10.5px; width:100%;">
        <div style="display:flex; justify-content:space-between; background:rgba(6,182,212,0.06); padding:4px 8px; border-radius:4px; border-left:2px solid var(--color-cyan);">
          <span>Revenue (40% Weight):</span><strong style="color:var(--color-cyan);">Max 400 pts</strong>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(16,185,129,0.06); padding:4px 8px; border-radius:4px; border-left:2px solid var(--color-teal);">
          <span>YoY Growth (20% Weight):</span><strong style="color:var(--color-teal);">Max 200 pts</strong>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(245,158,11,0.06); padding:4px 8px; border-radius:4px; border-left:2px solid var(--color-amber);">
          <span>Order Frequency (15% Weight):</span><strong style="color:var(--color-amber);">Max 150 pts</strong>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(99,102,241,0.06); padding:4px 8px; border-radius:4px; border-left:2px solid var(--color-primary);">
          <span>Payment Discipline (15% Weight):</span><strong style="color:var(--color-primary);">Max 150 pts</strong>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(244,63,94,0.06); padding:4px 8px; border-radius:4px; border-left:2px solid var(--color-coral);">
          <span>Training Completion (10% Weight):</span><strong style="color:var(--color-coral);">Max 100 pts</strong>
        </div>
      </div>
    `,
    script: "Partner Score sirf sales par depend nahi karta. Isme YoY growth, order frequency, bill time par pay karna (Payment discipline), aur staff product training modules poora karna bhi shamil hai."
  },
  {
    title: "Partner 1: RizTech Solutions — Inactive to Silver",
    short: "05. RizTech Journey",
    category: "INACTIVE TO SILVER",
    objective: "Re-Engage Dormant Partners and Incentivize Baseline Purchase Targets",
    cx: "RizTech increases quarterly purchases, YoY growth explodes +50%, upgrading from Inactive to Silver.",
    description: "Evaluation Score reaches 602. Silver status unlocked, earning a 1% rebate of RM 560.",
    math: "Score = 373 (Rev) + 100 (Growth) + 114 (Freq) + 140 (Pay) + 75 (Train) = 602 pts | Rebate = RM 42,000 × 1% + (Welcome silver credit) = RM 560",
    html: `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:10px; padding:10px; font-size:10.5px; text-align:left; width:100%;">
        <div style="font-weight:bold; color:var(--color-cyan); margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>RizTech Solutions Sdn Bhd</span>
          <span style="color:#888780;">Silver Tier 🥈</span>
        </div>
        <div style="font-size:9.5px; color:var(--text-muted); margin-bottom:6px;">IT Reseller — Kuala Lumpur | Score: 602 / 1,000</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-bottom:6px;">
          <div style="background:rgba(255,255,255,0.02); padding:3px 6px; border-radius:4px;">Sales: RM 42,000</div>
          <div style="background:rgba(255,255,255,0.02); padding:3px 6px; border-radius:4px;">Growth: +50%</div>
          <div style="background:rgba(255,255,255,0.02); padding:3px 6px; border-radius:4px;">Freq: 38/50 orders</div>
          <div style="background:rgba(255,255,255,0.02); padding:3px 6px; border-radius:4px;">Pay On-time: 28/30</div>
        </div>
        <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); color:var(--color-teal); padding:4px 8px; border-radius:6px; font-weight:bold; font-size:11px; text-align:center;">
          🎉 Upgrade Confirmed! Rebate Paid: RM 560
        </div>
      </div>
    `,
    script: "Humara pehla partner journey hai RizTech Solutions. Yeh pehle Inactive stage pe the. Q1 evaluation mein inka total score 602 aaya jiski wajah se inko Silver tier par upgrade kiya gaya aur RM 560 ka cash rebate mila."
  },
  {
    title: "Partner 2: Mega Distributors — Silver Maintained",
    short: "06. Mega Journey",
    category: "SILVER MAINTAINED",
    objective: "Identify Growth Obstacles & Formulate Action Plans to Unlock Next Tier",
    cx: "Mega Distributors stable at Silver tier, but slower YoY growth (+8.3%) blocks Gold upgrade.",
    description: "Score: 679/1,000 (Needed 700+ for Gold). System triggers warning alerts and staff training reminders.",
    math: "Score = 367 (Rev) + 17 (Growth) + 119 (Freq) + 126 (Pay) + 50 (Train) = 679 pts | Rebate = RM 78,000 × 1% + loyalty bonus = RM 840",
    html: `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:10px; padding:10px; font-size:10.5px; text-align:left; width:100%;">
        <div style="font-weight:bold; color:var(--color-cyan); margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>Mega Distributors Bhd</span>
          <span style="color:#888780;">Silver Tier (Stable) 🥈</span>
        </div>
        <div style="font-size:9.5px; color:var(--text-muted); margin-bottom:6px;">Penang Electronics | Score: 679 / 1,000 (Gold: 700+)</div>
        <div style="background:rgba(245,158,11,0.08); border:1px solid var(--color-amber); padding:5px 8px; border-radius:6px; font-size:9.5px; color:var(--color-amber); margin-bottom:6px;">
          ⚠️ Blockers: Growth too slow (+8.3%) & Low training completion (5/10).
        </div>
        <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); color:#fff; padding:4px 8px; border-radius:6px; font-weight:bold; font-size:11px; text-align:center;">
          Rebate Paid: RM 840 | Training Alert Sent!
        </div>
      </div>
    `,
    script: "Mega Distributors stable hain Silver tier par. Inka score 679 hai. Inko Gold tier ke liye sirf 21 points aur chahiye the. Problem growth slow hona aur staff training incomplete hona hai."
  },
  {
    title: "Partner 3: ProBuild Supply — Gold to Platinum",
    short: "07. ProBuild Journey",
    category: "GOLD TO PLATINUM",
    objective: "Reward Elite Performance and Partner Co-Investment",
    cx: "ProBuild Supply hits consecutive strong quarters (Q2: 921, Q3: 978), securing Platinum upgrade.",
    description: "Earns 3% rebate (RM 10,200) + RM 5,000 MDF marketing budget + Concierge VIP Support.",
    math: "Score = 400 (Rev) + 182 (Growth) + 148 (Freq) + 148 (Pay) + 100 (Train) = 978 pts | Rebate = RM 340,000 × 3% = RM 10,200",
    html: `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:10px; padding:10px; font-size:10.5px; text-align:left; width:100%;">
        <div style="font-weight:bold; color:#6d28d9; margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>ProBuild Supply Sdn Bhd</span>
          <span style="color:#6d28d9;">Platinum Tier 💎</span>
        </div>
        <div style="font-size:9.5px; color:var(--text-muted); margin-bottom:6px;">Johor Bahru Construction | Score: 978 / 1,000</div>
        <div style="background:rgba(109,40,217,0.08); border:1px solid #6d28d9; padding:6px; border-radius:6px; font-size:9.5px; color:#c084fc; margin-bottom:6px;">
          💎 Elite Privileges Activated: Concierge support + VIP events access.
        </div>
        <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); color:var(--color-teal); padding:4px 8px; border-radius:6px; font-weight:bold; font-size:10.5px; text-align:center;">
          Rebate: RM 10,200 | MDF Fund Allocated: RM 5,000
        </div>
      </div>
    `,
    script: "ProBuild Supply ne outstanding performance show kiya. Q2 aur Q3 dono quarters mein 900+ score kiya, isliye 2-quarter rule se ye Platinum tier par upgrade ho gaye. Inhe RM 10,200 rebate aur RM 5,000 co-marketing budget (MDF) mila."
  },
  {
    title: "Partner 4: SwiftTrade Corp — Gold to Silver",
    short: "08. SwiftTrade Journey",
    category: "GOLD TO SILVER",
    objective: "Trigger Automated Early Alerts on Credit and Engagement Failures",
    cx: "SwiftTrade sales drop, payment discipline collapses (46.7% paid on time), triggering a downgrade.",
    description: "Consecutive misses (Q3: 511, Q4: 442) lead to tier drop. Lost MDF, rebate rate reduced to 1%.",
    math: "Score = 281 (Rev) + 0 (Growth) + 71 (Freq) + 70 (Pay) + 20 (Train) = 442 pts | Rebate = RM 95,000 × 1% = RM 950",
    html: `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:10px; padding:10px; font-size:10.5px; text-align:left; width:100%;">
        <div style="font-weight:bold; color:var(--color-coral); margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>SwiftTrade Corp Sdn Bhd</span>
          <span style="color:var(--color-coral);">Downgraded to Silver 🥈</span>
        </div>
        <div style="font-size:9.5px; color:var(--text-muted); margin-bottom:6px;">Selangor FMCG | Score: 442 / 1,000</div>
        <div style="background:rgba(244,63,94,0.08); border:1px solid var(--color-coral); padding:6px; border-radius:6px; font-size:9.5px; color:var(--color-coral); margin-bottom:6px;">
          ❌ Penalties: Priority support removed. MDF RM 2,000 lost. Rebate rate dropped.
        </div>
        <div style="background:rgba(245,158,11,0.08); border:1px solid var(--color-amber); color:var(--color-amber); padding:4px 8px; border-radius:6px; font-weight:bold; font-size:10.5px; text-align:center;">
          Root Cause: Payment discipline collapsed (46.7% on-time)
        </div>
      </div>
    `,
    script: "SwiftTrade Corp ka Gold se Silver downgrade ho gaya. Q3 aur Q4 do lagatar quarters mein inhone target miss kiya. Sabse badi problem payment rules break karna tha (sirf 46.7% invoices time pe pay kiye)."
  },
  {
    title: "Complete 4-Partner Journey Comparison",
    short: "09. Comparisons",
    category: "PERFORMANCE METRICS",
    objective: "Audit and Optimize Overall Program Health and ROI",
    cx: "Compare partner scores, tier transitions, and quarterly payouts side by side.",
    description: "Visual matrix showing 2 upgrades, 1 maintained, and 1 downgrade across different business domains.",
    math: "Total Payout = sum(RM 560 + RM 840 + RM 10,200 + RM 950) = RM 12,550",
    html: `
      <div style="overflow-x:auto; width:100%;">
        <table style="width:100%; border-collapse:collapse; font-size:9.5px; text-align:left; color:#fff;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color); color:var(--text-muted);">
              <th style="padding:4px;">Partner</th>
              <th style="padding:4px;">Start</th>
              <th style="padding:4px;">End</th>
              <th style="padding:4px;">Score</th>
              <th style="padding:4px;">Rebate</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <td style="padding:4px;">RizTech</td>
              <td style="padding:4px; color:var(--color-coral);">Inactive</td>
              <td style="padding:4px; color:#888780;">Silver</td>
              <td style="padding:4px;">602</td>
              <td style="padding:4px; color:var(--color-teal);">RM 560</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <td style="padding:4px;">Mega Dist</td>
              <td style="padding:4px; color:#888780;">Silver</td>
              <td style="padding:4px; color:#888780;">Silver</td>
              <td style="padding:4px;">679</td>
              <td style="padding:4px; color:var(--color-teal);">RM 840</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <td style="padding:4px;">ProBuild</td>
              <td style="padding:4px; color:#b45309;">Gold</td>
              <td style="padding:4px; color:#6d28d9;">Platinum</td>
              <td style="padding:4px;">978</td>
              <td style="padding:4px; color:var(--color-teal);">RM 10,200</td>
            </tr>
            <tr>
              <td style="padding:4px;">SwiftTrade</td>
              <td style="padding:4px; color:#b45309;">Gold</td>
              <td style="padding:4px; color:#888780;">Silver</td>
              <td style="padding:4px;">442</td>
              <td style="padding:4px; color:var(--color-teal);">RM 950</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    script: "Charo partners ka side-by-side comparison. ProBuild Platinum ban gaya, RizTech Silver tak badh gaya, Mega stable raha aur SwiftTrade financial terms violations ki wajah se niche gir gaya."
  },
  {
    title: "Tier Upgrade & Downgrade Decision Flow",
    short: "10. Decision Rules",
    category: "LOYALTY ENGINE RULES",
    objective: "Enforce Quarterly Validation Logic to Prevent Status Abuse",
    cx: "Tiers are updated only after 2 consecutive quarters of performance confirmation.",
    description: "Saves business from paying high rebate rates for one-time spikes and protects partners from instant demotion.",
    math: "Quarters evaluated = 2 consecutive | Condition: Both scores >= target milestone",
    html: `
      <div class="pres-diagram" style="justify-content:space-around; align-items:center; padding:12px; min-height:180px; font-size:10px; gap:4px; width:100%;">
        <div style="text-align:center; background:var(--bg-main); border:1px solid var(--border-color); padding:6px; border-radius:6px; width:90px;">
          <strong>Score Checked</strong><br>Quarter End
        </div>
        <div style="font-size:14px; color:var(--text-muted);"><i class="ti ti-arrow-right"></i></div>
        <div style="text-align:center; background:rgba(6,182,212,0.08); border:1px dashed var(--color-cyan); padding:6px; border-radius:6px; width:110px;">
          <strong>2 Consecutive Quarters?</strong><br>Yes / No
        </div>
        <div style="font-size:14px; color:var(--text-muted);"><i class="ti ti-arrow-right"></i></div>
        <div style="text-align:center; background:rgba(16,185,129,0.08); border:1px solid var(--color-teal); padding:6px; border-radius:6px; width:90px;">
          <strong>Status Updated</strong><br>Rebate Unlocked
        </div>
      </div>
    `,
    script: "Humare system mein tier upgrade/downgrade instant nahi hota. Yeh tabhi hota hai jab koi partner lagatar 2 quarters tak high ya low score maintain kare. Isse brand aur partner dono safe rehte hain."
  },
  {
    title: "Complete End-to-End Partner Journey",
    short: "11. 20 Stages",
    category: "PARTNER LIFE CYCLE",
    objective: "Map and Manage Every Interaction Point to Retain High-Value Resellers",
    cx: "Resellers go through discovery, legal setup, score tracking, rebate claims, and VIP advocacy.",
    description: "Three main phases: Acquisition (0-3M), Growth (3-12M), and Maturity (12M+).",
    math: "Stages = 20 | Phases = 3 (Acquisition, Growth, Maturity)",
    html: `
      <div class="pres-diagram" style="flex-direction:column; gap:6px; justify-content:center; align-items:stretch; padding:10px; min-height:180px; font-size:10px; width:100%;">
        <div style="display:flex; justify-content:space-between; background:rgba(6, 182, 212, 0.08); padding:5px 8px; border-radius:4px;">
          <strong style="color:var(--color-cyan);">Acquisition (0-3 Months)</strong>
          <span>Discovery, Registration, Profile Setup, Welcome</span>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(16, 185, 129, 0.08); padding:5px 8px; border-radius:4px;">
          <strong style="color:var(--color-teal);">Growth (3-12 Months)</strong>
          <span>Orders, Scoring, Training, Payments, Auditing</span>
        </div>
        <div style="display:flex; justify-content:space-between; background:rgba(109, 40, 217, 0.08); padding:5px 8px; border-radius:4px;">
          <strong style="color:#c084fc;">Maturity (12+ Months)</strong>
          <span>Rebates, MDF Campaigns, Referrals, Renewal, Advocacy</span>
        </div>
      </div>
    `,
    script: "Partner life cycle ke 20 stages ko acquisition, growth aur maturity phases mein split kiya gaya hai. Har phase mein system automation triggers check kiye jate hain."
  },
  {
    title: "Program Summary Dashboard",
    short: "12. Dashboard",
    category: "PROGRAM DASHBOARD",
    objective: "Gain Real-Time Visibility on Loyalty Program Expenses & Partner Tiers",
    cx: "View all partner performances at a single glance with smart recommendations.",
    description: "Program metrics: 4 total partners, average performance score 675, quarterly payout RM 12,550.",
    math: "Avg Score = 675 | Total MDF = RM 5,000 (ProBuild) | Total Rebates = RM 12,550",
    html: `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:10px; padding:10px; font-size:10px; text-align:left; width:100%;">
        <div style="font-weight:bold; color:#fff; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin-bottom:6px; display:flex; justify-content:space-between;">
          <span>Program Dashboard Overview</span>
          <span style="color:var(--color-teal);">Healthy ROI ✅</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:6px;">
          <div style="background:rgba(255,255,255,0.02); padding:5px; border-radius:4px; text-align:center;">
            <span style="font-size:7px; color:var(--text-muted); display:block;">Active Partners</span>
            <strong>4</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); padding:5px; border-radius:4px; text-align:center;">
            <span style="font-size:7px; color:var(--text-muted); display:block;">Average Score</span>
            <strong>675 / 1000</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); padding:5px; border-radius:4px; text-align:center;">
            <span style="font-size:7px; color:var(--text-muted); display:block;">Quarterly Rebates</span>
            <strong>RM 12,550</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); padding:5px; border-radius:4px; text-align:center;">
            <span style="font-size:7px; color:var(--text-muted); display:block;">Total MDF Allocation</span>
            <strong>RM 5,000</strong>
          </div>
        </div>
        <div style="font-size:8px; color:var(--text-muted); text-align:center;">Next evaluation run scheduled in 14 days</div>
      </div>
    `,
    script: "Summary dashboard program health track karne ke liye hai. Yeh metrics batate hain ki hamare dynamic program mein resources kis tarah distribute ho rahe hain."
  },
  {
    title: "Complete B2B Formula Reference Summary",
    short: "13. Formulas",
    category: "FORMULA REFERENCE",
    objective: "Standardize Mathematical Logic Across All B2B Loyalty Engine Calculators",
    cx: "Refer to scoring, rebate rates, CAC formulas, and retention rate calculations.",
    description: "Provides formula reference overview of all calculations.",
    math: "Score = sum(KPIs) | Rebate = Net Sales × Rebate% | CAC = Spend ÷ Partners",
    html: `
      <div style="display:flex; flex-direction:column; gap:4px; font-size:10px; text-align:left; width:100%;">
        <div style="padding:4px; background:rgba(6,182,212,0.05); border:1px solid rgba(6,182,212,0.15); border-radius:4px;">
          <strong style="color:var(--color-cyan);">Performance Score:</strong> (Rev×40%) + (Growth×20%) + (Freq×15%) + (Pay×15%) + (Train×10%)
        </div>
        <div style="padding:4px; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); border-radius:4px;">
          <strong style="color:var(--color-teal);">Disbursed Rebate:</strong> Net Sales × Tier Base% (+ 0.5% bonus if Score >= 900)
        </div>
        <div style="padding:4px; background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.15); border-radius:4px;">
          <strong style="color:var(--color-amber);">B2B CAC:</strong> (Sales Costs + Marketing + Onboarding) / New Partners
        </div>
      </div>
    `,
    script: "B2B Loyalty Engine ke core formulas yahan compiled hain. Inn mathematically aligned metrics se system transparent aur logic-driven banta hai."
  }
];

function initTechPresentation() {
  renderSlide();
}

function renderSlide() {
  const container = document.getElementById('presentation-wrap');
  if (!container) return;

  const slides = activeMode === 'b2c' ? PRES_SLIDES : PRES_SLIDES_B2B;
  const total = slides.length;
  if (presSlideIndex >= total) presSlideIndex = 0;
  const s = slides[presSlideIndex];

  // Render header titles inside current active tab page
  const pageHeaderTitle = document.querySelector('#page-tech-presentation .ph-title');
  const pageHeaderSub = document.querySelector('#page-tech-presentation .ph-sub');
  if (pageHeaderTitle && pageHeaderSub) {
    if (activeMode === 'b2c') {
      pageHeaderTitle.textContent = "Presenter Deck — B2C Customer Journey";
      pageHeaderSub.textContent = "Manoj Kumar ke end-to-end user actions aur points flows ko step-by-step presentation view mein samjhein.";
    } else {
      pageHeaderTitle.textContent = "Presenter Deck — B2B Partner Journey";
      pageHeaderSub.textContent = "4 partners (RizTech, Mega, ProBuild, SwiftTrade) ke end-to-end journeys aur calculations ko slides view mein samjhein.";
    }
  }

  // Render a split screen layout
  container.innerHTML = `
    <div class="pres-layout">
      <!-- Left sidebar slide navigator -->
      <div class="pres-slide-nav" style="max-height: 580px;">
        <div class="sect-label" style="margin-bottom:6px; padding-left:4px;">Journey Slides</div>
        ${slides.map((slide, idx) => `
          <button class="pres-slide-link ${idx === presSlideIndex ? 'active' : ''}" onclick="presJump(${idx})">
            <span style="font-family:monospace; opacity:0.6;">${String(idx + 1).padStart(2, '0')}</span>
            <span style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap; flex:1;">${slide.short.replace(/^\d+\.\s*/, '')}</span>
          </button>
        `).join('')}
      </div>

      <!-- Right Column: Active Slide & Presenter Notes -->
      <div class="pres-slide-content">
        <!-- Projector Card Screen -->
        <div class="pres-card" style="position:relative; overflow:hidden; background:linear-gradient(135deg, rgba(22, 28, 45, 0.8), rgba(15, 23, 42, 0.95)); border:2px solid rgba(6, 182, 212, 0.35); box-shadow:var(--glow-cyan), var(--shadow-main); padding:24px; min-height:440px; border-radius:16px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s ease;">
          
          <!-- Slide Top Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:12px;">
            <span style="font-size:9px; font-weight:700; color:var(--color-cyan); text-transform:uppercase; letter-spacing:0.1em; background:rgba(6, 182, 212, 0.1); padding:3px 8px; border-radius:20px;">
              ${s.category}
            </span>
            <span style="font-size:10.5px; font-family:monospace; color:var(--text-muted);">
              Slide ${presSlideIndex + 1} of ${total}
            </span>
          </div>

          <!-- Slide Content Split Screen Area -->
          <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:12px;">
            <h2 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#fff; text-align:center; margin-bottom:6px;">
              ${s.title}
            </h2>
            
            <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:stretch;">
              <!-- Left Side: Interactive Screen Mockup -->
              <div style="flex:1.2; min-width:270px; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:12px; padding:16px; display:flex; flex-direction:column; justify-content:center; min-height:180px;">
                ${s.html}
              </div>
              
              <!-- Right Side: Professional Lifecycle Details -->
              <div style="flex:1; min-width:230px; display:flex; flex-direction:column; gap:8px; text-align:left;">
                <div>
                  <span style="font-size:8px; font-weight:700; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; background:rgba(99,102,241,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                    Business Objective
                  </span>
                  <div style="font-size:11px; font-weight:bold; color:#fff;">${s.objective}</div>
                </div>
                
                <div>
                  <span style="font-size:8px; font-weight:700; color:var(--color-cyan); text-transform:uppercase; letter-spacing:0.06em; background:rgba(6,182,212,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                    ${activeMode === 'b2c' ? "Manoj's Experience (CX)" : "Partner Dynamics (CX)"}
                  </span>
                  <div style="font-size:11px; color:var(--text-main); line-height:1.45;">${s.cx}</div>
                </div>

                <div>
                  <span style="font-size:8px; font-weight:700; color:var(--color-teal); text-transform:uppercase; letter-spacing:0.06em; background:rgba(16,185,129,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                    System Operations
                  </span>
                  <div style="font-size:10.5px; color:var(--text-muted); line-height:1.4;">${s.description}</div>
                </div>

                <div>
                  <span style="font-size:8px; font-weight:700; color:var(--color-amber); text-transform:uppercase; letter-spacing:0.06em; background:rgba(245,158,11,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                    Math & Rule Calculations
                  </span>
                  <div style="font-family:monospace; font-size:10.5px; color:var(--color-amber); background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.05); padding:4px 8px; border-radius:6px; margin-top:2px;">
                    ${s.math}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide Navigation Controls -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
            <button onclick="presGo(-1)" ${presSlideIndex === 0 ? 'disabled' : ''} style="background-color:rgba(255,255,255,0.05); border:1px solid var(--border-color); color:#fff; padding:6px 14px; border-radius:8px; font-size:11px; font-weight:600; cursor:pointer; transition:all 0.2s;">
              ← Previous
            </button>
            
            <!-- Slide dots index indicator -->
            <div style="display:flex; gap:6px;">
              ${slides.map((_, idx) => `
                <span style="width:6px; height:6px; border-radius:50%; background:${idx === presSlideIndex ? 'var(--color-cyan)' : 'rgba(255,255,255,0.15)'}; display:inline-block;"></span>
              `).join('')}
            </div>

            <button class="pres-btn-accent" onclick="presGo(1)" style="background:var(--color-cyan) !important; color:#000 !important; font-weight:700; border:none; padding:6px 14px; border-radius:8px; font-size:11px; cursor:pointer; transition:all 0.2s;">
              ${presSlideIndex === total - 1 ? 'Start Over ↺' : 'Next Slide →'}
            </button>
          </div>
        </div>

        <!-- Presenter Script Notes (Visible only to the presenter) -->
        <div class="pres-notes-box" style="background:rgba(99, 102, 241, 0.08); border-left:4px solid var(--color-primary); padding:14px; border-radius:12px; margin-top:8px;">
          <div class="script-title" style="font-size:9px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
            <i class="ti ti-microphone" style="font-size:13px;"></i> Presenter Talk Script
          </div>
          <div class="script-text" style="font-size:12px; line-height:1.65; color:var(--text-main); font-style:italic;">
            "${s.script}"
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind dynamic interactive simulators instantly if matching
  if (activeMode === 'b2c') {
    if (presSlideIndex === 2) {
      window.simSlideCACCalc = () => {
        const spend = parseInt(document.getElementById('sim-slideCAC-spend').value);
        const customers = parseInt(document.getElementById('sim-slideCAC-customers').value);
        document.getElementById('sim-slideCAC-spend-v').textContent = 'RM ' + spend.toLocaleString();
        document.getElementById('sim-slideCAC-customers-v').textContent = customers + ' customers';
        const cac = Math.round(spend / customers);
        document.getElementById('sim-slideCAC-out-cac').textContent = 'RM ' + cac;
        const clv = 9600;
        const roi = (clv / cac).toFixed(1);
        document.getElementById('sim-slideCAC-out-roi').textContent = roi + 'x return';
        const statusEl = document.getElementById('sim-slideCAC-status');
        if (clv > cac) {
          statusEl.innerHTML = '<span style="color:var(--color-teal); font-weight:bold;">Profitable Business ✅</span>';
        } else {
          statusEl.innerHTML = '<span style="color:var(--color-coral); font-weight:bold;">Losing Money ❌</span>';
        }
      };
      window.simSlideCACCalc();
    }
    if (presSlideIndex === 5) {
      window.simSlide5Calc = () => {
        const val = parseInt(document.getElementById('sim-slide5-spend').value);
        document.getElementById('sim-slide5-spend-v').textContent = 'RM ' + val;
        document.getElementById('sim-slide5-out-spend').textContent = 'RM ' + val;
        document.getElementById('sim-slide5-out-pts').textContent = '+' + val + ' pts';
      };
      window.simSlide5Calc();
    }
    if (presSlideIndex === 9) {
      window.simSlide9Calc = () => {
        const pts = parseInt(document.getElementById('sim-slide9-points').value);
        document.getElementById('sim-slide9-points-v').textContent = pts + ' pts';
        const cardTier = document.getElementById('sim-slide9-card-tier');
        const cardMult = document.getElementById('sim-slide9-card-mult');
        const card = document.getElementById('sim-slide9-card');
        if (pts >= 500) {
          cardTier.textContent = 'Silver Elite';
          cardMult.textContent = '1.5x speed multiplier active';
          card.style.borderColor = 'var(--color-cyan)';
          card.style.boxShadow = 'var(--glow-cyan)';
        } else {
          cardTier.textContent = 'Bronze Member';
          cardMult.textContent = '1.0x baseline speed active';
          card.style.borderColor = 'var(--border-color)';
          card.style.boxShadow = 'none';
        }
      };
      window.simSlide9Calc();
    }
    if (presSlideIndex === 10) {
      window.simSlide10Calc = () => {
        const val = parseInt(document.getElementById('sim-slide10-spend').value);
        const tier = document.getElementById('sim-slide10-tier').value;
        const mults = { bronze: 1.0, silver: 1.5, gold: 2.0, platinum: 3.0 };
        const m = mults[tier];
        document.getElementById('sim-slide10-spend-v').textContent = 'RM ' + val;
        document.getElementById('sim-slide10-out-spend').textContent = 'RM ' + val;
        document.getElementById('sim-slide10-out-mult').textContent = m + 'x';
        document.getElementById('sim-slide10-out-pts').textContent = '+' + Math.round(val * m) + ' pts';
      };
      window.simSlide10Calc();
    }
    if (presSlideIndex === 12) {
      window.simSlide11Calc = () => {
        const total = parseInt(document.getElementById('sim-slide11-total').value);
        const wallet = parseInt(document.getElementById('sim-slide11-wallet').value);
        const maxDiscount = total * 0.20;
        const maxPts = Math.round(maxDiscount * 100);
        const ptsDeducted = Math.min(wallet, maxPts);
        const discountVal = ptsDeducted / 100;
        const payable = total - discountVal;

        document.getElementById('sim-slide11-total-v').textContent = 'RM ' + total;
        document.getElementById('sim-slide11-wallet-v').textContent = wallet + ' pts';
        document.getElementById('sim-slide11-out-cap').textContent = 'RM ' + maxDiscount.toFixed(2) + ' (' + maxPts.toLocaleString() + ' pts)';
        document.getElementById('sim-slide11-out-pts').textContent = ptsDeducted.toLocaleString() + ' pts';
        document.getElementById('sim-slide11-out-disc').textContent = 'RM ' + discountVal.toFixed(2);
        document.getElementById('sim-slide11-out-payable').textContent = 'RM ' + payable.toFixed(2);
      };
      window.simSlide11Calc();
    }
  } else {
    // B2B mode simulators
    if (presSlideIndex === 2) {
      window.simSlideCACCalc = () => {
        const spend = parseInt(document.getElementById('sim-slideCAC-spend').value);
        const customers = parseInt(document.getElementById('sim-slideCAC-customers').value);
        document.getElementById('sim-slideCAC-spend-v').textContent = 'RM ' + spend.toLocaleString();
        document.getElementById('sim-slideCAC-customers-v').textContent = customers + ' partners';
        const cac = Math.round(spend / customers);
        document.getElementById('sim-slideCAC-out-cac').textContent = 'RM ' + cac.toLocaleString();
        const clv = 250000;
        const roi = (clv / cac).toFixed(1);
        document.getElementById('sim-slideCAC-out-roi').textContent = roi + 'x return';
        const statusEl = document.getElementById('sim-slideCAC-status');
        if (clv > cac) {
          statusEl.innerHTML = '<span style="color:var(--color-teal); font-weight:bold;">Profitable Business ✅</span>';
        } else {
          statusEl.innerHTML = '<span style="color:var(--color-coral); font-weight:bold;">Losing Money ❌</span>';
        }
      };
      window.simSlideCACCalc();
    }
  }
}

window.presGo = (d) => {
  const slides = activeMode === 'b2c' ? PRES_SLIDES : PRES_SLIDES_B2B;
  if (presSlideIndex + d >= 0 && presSlideIndex + d < slides.length) {
    presSlideIndex += d;
    renderSlide();
  } else if (presSlideIndex + d === slides.length) {
    presSlideIndex = 0;
    renderSlide();
  }
};

window.presJump = (idx) => {
  const slides = activeMode === 'b2c' ? PRES_SLIDES : PRES_SLIDES_B2B;
  if (idx >= 0 && idx < slides.length) {
    presSlideIndex = idx;
    renderSlide();
  }
};
function initTechLeadPitch() {
  renderTlp();
}

function renderTlp() {
  const container = document.getElementById('tech-lead-pitch-wrap');
  if (!container) return;

  const TLP_STEPS = [
    {
      title: "Step 1: App Discovery & Reg (Module 1, 2, 4, 11)",
      short: "Discovery & Signup",
      desc: "Manoj Kumar signs up for the B2C Loyalty program on his mobile app.",
      script: "Tech Lead ko bolen: 'Sir, Manoj brand mobile app pe signup submit karta hai. Edge Ingress Gateway request pick karke rate-limits verify karega. DB writes process hotey hi, unique Loyalty ID LYL-MK998 initialize ho jayegi in Customer 360 database, aur sub-5ms read speeds provide karne ke liye hum Redis cache-aside slot populate kar denge.'",
      services: [
        { name: "1 Entry Points", role: "Active - mobile entry session capture" },
        { name: "2 Customer 360", role: "Active - DB records initialization" },
        { name: "4 Enrollment", role: "Active - LYL ID generation & activation" },
        { name: "11 Settings & Config", role: "Active - default Bronze constants rules" },
        { name: "5 Points Engine", role: "Passive" },
        { name: "6 Tier Engine", role: "Passive" }
      ],
      apiContract: {
        endpoint: "POST /v1/enrollment/register",
        payload: {
          customer_name: "Manoj Kumar",
          mobile: "+60 11-2345-6789",
          birthdate: "1995-11-25",
          source_channel: "MobileApp_QR"
        },
        response: {
          status: "SUCCESS",
          loyalty_id: "LYL-MK998",
          tier: "BRONZE",
          points_balance: 0,
          created_at: "2026-06-22T17:45:00Z"
        },
        sql: "INSERT INTO customers (customer_id, name, phone, dob, tier) VALUES ('LYL-MK998', 'Manoj Kumar', '+601123456789', '1995-11-25', 'BRONZE');\nINSERT INTO wallets (wallet_id, customer_id, balance) VALUES ('W-MK998', 'LYL-MK998', 0);"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Manoj Registration Form Mockup</div>
          <div class="ctrl-row">
            <label>Full Name</label>
            <input type="text" id="tlp-reg-name" value="Manoj Kumar" style="background:var(--bg-main); border:1px solid var(--border-color); padding:5px 8px; border-radius:4px; color:#fff; flex:1;">
          </div>
          <div class="ctrl-row">
            <label>Mobile No.</label>
            <input type="text" id="tlp-reg-phone" value="+60 11-2345-6789" style="background:var(--bg-main); border:1px solid var(--border-color); padding:5px 8px; border-radius:4px; color:#fff; flex:1;">
          </div>
          <button onclick="tlpRunReg()" style="width:100%; padding:8px; border-radius:6px; background:var(--color-primary); color:#fff; cursor:pointer; font-weight:600; border:none; margin-top:8px;">
            Register & Warmup Cache
          </button>
          <div id="tlp-reg-out" class="pitch-code-block" style="display:none; max-height:150px; overflow-y:auto;"></div>
        </div>
      `
    },
    {
      title: "Step 2: Dynamic Cohort & Welcome (Module 3, 5, 8, 9)",
      short: "Welcome Automation",
      desc: "Segmentation engine tags Manoj and automation dispatches welcome points.",
      script: "Tech Lead ko bolen: 'Manoj signup hotey hi background job cohort update kar deti hai and Manoj tag dynamic segment tag New Customer mein update ho jata hai. Automation engine Kafka event customer.enrolled verify karke subscribe checks run karta hai, points engine instant credit event trigger karta hai aur WhatsApp microservice queue message template process ho jati hai.'",
      services: [
        { name: "3 Segmentation", role: "Active - tags profile as 'New Customer'" },
        { name: "8 Automation", role: "Active - subscribes to enrollment event rules" },
        { name: "9 Campaigns", role: "Active - WhatsApp webhook payload dispatcher" },
        { name: "5 Points Engine", role: "Active - processes welcome bonus points +100" },
        { name: "2 Customer 360", role: "Passive" },
        { name: "6 Tier Engine", role: "Passive" }
      ],
      apiContract: {
        endpoint: "POST /v1/points/credit",
        payload: {
          loyalty_id: "LYL-MK998",
          event_type: "WELCOME_BONUS",
          points_value: 100,
          description: "Signup registration welcome gift"
        },
        response: {
          status: "CREDITED",
          loyalty_id: "LYL-MK998",
          new_balance: 100,
          ledger_id: "LEDG-99881"
        },
        kafkaEvent: "TOPIC: customer.events.enrolled\nPAYLOAD: {\"loyalty_id\":\"LYL-MK998\",\"action\":\"welcome_trigger\",\"bonus_pts\":100}"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Welcome Automation Engine</div>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-main); padding:10px 14px; border-radius:6px; border:1px solid var(--border-color); margin-bottom:10px;">
            <span style="font-size:12px; color:var(--text-muted);">Manoj Wallet Status:</span>
            <strong style="color:var(--color-teal); font-size:16px;" id="tlp-welcome-bal">0 pts</strong>
          </div>
          <button onclick="tlpRunWelcome()" id="tlp-welcome-btn" style="width:100%; padding:8px; border-radius:6px; background:var(--color-teal); color:#fff; cursor:pointer; font-weight:600; border:none;">
            Trigger Welcome Automation Event
          </button>
          <div id="tlp-welcome-msg" class="pitch-code-block" style="display:none; color:var(--color-teal);"></div>
        </div>
      `
    },
    {
      title: "Step 3: First Purchase & Points Engine (Module 5, 11)",
      short: "Order Points Accrual",
      desc: "Manoj places RM 200 order. Points Engine runs base calculation formula.",
      script: "Tech Lead ko bolen: 'Manoj jab RM 200 ki order purchase checkout karta hai, Points Engine config settings table se active rates read karta hai. Bronze tier (1.0x multiplier) coordinate parameters execute hotey hain. Formula is: RM 200 × 1 pt/RM base rate × 1.0x Bronze = 200 points. Ledger updates database append-only records write synchronize completed.'",
      services: [
        { name: "5 Points Engine", role: "Active - calculates subtotal accrual points" },
        { name: "11 Settings & Config", role: "Active - supplies current rate configs (1 pt/RM)" },
        { name: "2 Customer 360", role: "Active - purchase history and balance fields write" },
        { name: "6 Tier Engine", role: "Passive - monitors points, checks thresholds" }
      ],
      apiContract: {
        endpoint: "POST /v1/points/calculate",
        payload: {
          loyalty_id: "LYL-MK998",
          order_id: "ORD-7711",
          subtotal: 200.00,
          currency: "MYR",
          tier_multiplier: 1.0
        },
        response: {
          points_calculated: 200,
          rate_applied: "1.0 pt/RM",
          multiplier_applied: 1.0,
          wallet_balance_after: 300
        },
        sql: "BEGIN;\nINSERT INTO wallet_ledger (ledger_id, wallet_id, tx_type, points, order_id) VALUES ('L-7711', 'W-MK998', 'EARN', 200, 'ORD-7711');\nUPDATE wallets SET balance = balance + 200, lifetime_points_earned = lifetime_points_earned + 200 WHERE customer_id = 'LYL-MK998';\nCOMMIT;"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Earning Accrual Calculator Sandbox</div>
          <div class="ctrl-row">
            <label>Order Amount (RM)</label>
            <input type="range" id="tlp-earn-sub" min="10" max="500" step="10" value="200" oninput="tlpCalcEarn()" style="flex:1;">
            <span class="ctrl-val">RM <span id="tlp-earn-sub-v">200</span></span>
          </div>
          <div class="ctrl-row">
            <label>Points Rate per RM</label>
            <input type="range" id="tlp-earn-rate" min="1" max="5" step="0.5" value="1" oninput="tlpCalcEarn()" style="flex:1;">
            <span class="ctrl-val"><span id="tlp-earn-rate-v">1.0</span> pt</span>
          </div>
          <div class="ctrl-row">
            <label>Active Tier</label>
            <select id="tlp-earn-tier" onchange="tlpCalcEarn()" style="background:var(--bg-main); border:1px solid var(--border-color); padding:5px 8px; border-radius:4px; color:#fff; flex:1;">
              <option value="bronze">Bronze (1.0x)</option>
              <option value="silver">Silver (1.5x)</option>
              <option value="gold">Gold (2.0x)</option>
              <option value="platinum">Platinum (3.0x)</option>
            </select>
          </div>
          <div class="formula-box" style="margin-top:10px; background:var(--bg-main);">
            <div class="f-eq" id="tlp-earn-eq" style="font-size:12px;"></div>
            <div class="f-note" id="tlp-earn-note" style="font-size:11px; margin-top:4px;"></div>
          </div>
        </div>
      `
    },
    {
      title: "Step 4: Crossing Silver Tier Milestone (Module 6, 8, 9)",
      short: "Tier Milestone Upgrade",
      desc: "Cumulative points cross Silver boundary (500 pts). Dynamic upgrade triggers.",
      script: "Tech Lead ko bolen: 'Sir, lifetime points counter monitor hotey hi upgrades evaluation trigger hota hai. Manoj jaise hi 500 lifetime limit cross karke 600 points reaches, Tier Engine automated DB updates run karta hai. Status changes to Silver tier Elite, update multiplier rules dynamically to 1.5x in cache registry, aur custom WhatsApp alert broadcast runs.'",
      services: [
        { name: "6 Tier Engine", role: "Active - scans points, updates tier level status" },
        { name: "8 Automation", role: "Active - upgrades triggers workflows initialization" },
        { name: "9 Campaigns", role: "Active - congratulations dispatch handler" },
        { name: "2 Customer 360", role: "Active - updates current tier level to Silver" }
      ],
      apiContract: {
        endpoint: "POST /v1/tiers/evaluate",
        payload: {
          loyalty_id: "LYL-MK998",
          trigger_event: "ledger_write",
          current_lifetime_pts: 600
        },
        response: {
          status: "UPGRADED",
          previous_tier: "BRONZE",
          new_tier: "SILVER",
          multiplier: 1.5,
          timestamp: "2026-06-22T17:45:05Z"
        },
        sql: "UPDATE customer_tiers SET tier_name = 'SILVER', multiplier = 1.5, updated_at = NOW() WHERE customer_id = 'LYL-MK998';"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Milestone Upgrade Simulator</div>
          <div class="ctrl-row">
            <label>Lifetime Points Earned</label>
            <input type="range" id="tlp-tier-life" min="0" max="6000" step="50" value="600" oninput="tlpCalcTier()" style="flex:1;">
            <span class="ctrl-val"><span id="tlp-tier-life-v">600</span> pts</span>
          </div>
          <div style="margin-top:10px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
              <span id="tlp-tier-badge" style="font-weight:bold; color:var(--color-cyan);">Silver Tier Active</span>
              <span id="tlp-tier-progress-lbl" style="color:var(--text-muted);">600 / 2,000 pts to Gold</span>
            </div>
            <div class="bar-wrap"><div class="bar-fill" id="tlp-tier-bar" style="width:10%"></div></div>
            <div style="font-size:11px; color:var(--color-teal); text-align:center; margin-top:8px;" id="tlp-tier-msg"></div>
          </div>
        </div>
      `
    },
    {
      title: "Step 5: Redemption Checkout & 20% Capping (Module 7, 5)",
      short: "Redemption & 20% Cap",
      desc: "Manoj redeems points on RM 100 checkout, cap rules evaluated.",
      script: "Tech Lead ko bolen: 'Redemption logic safe limits locks protect karti hai. Manoj checkout RM 100 pe cart values check rules triggers. 20% capping constraints: max RM 20 discount allow checks. Manoj has 600 points (RM 6 discount value) which is below cap limit, so all 600 points redeem hotey hain, final payable drops to RM 94. Wallet balance is 0, par points lifetime value is still 600, keeping Silver multiplier status active.'",
      services: [
        { name: "7 Rewards Catalog", role: "Active - voucher verification & order cap rules checks" },
        { name: "5 Points Engine", role: "Active - ledger debits process validations" },
        { name: "2 Customer 360", role: "Active - preserves lifetime points, decreases wallet balance" }
      ],
      apiContract: {
        endpoint: "POST /v1/rewards/redeem",
        payload: {
          loyalty_id: "LYL-MK998",
          order_id: "ORD-9911",
          order_subtotal: 100.00,
          points_to_redeem: 600
        },
        response: {
          status: "SUCCESS",
          discount_applied: 6.00,
          points_deducted: 600,
          payable_remainder: 94.00,
          remaining_points_balance: 0
        },
        rules: "capping_ratio = 0.20; points_to_cash_ratio = 100:1"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Redemption Capping Calculator Sandbox</div>
          <div class="ctrl-row">
            <label>Order Subtotal (RM)</label>
            <input type="range" id="tlp-red-sub" min="10" max="400" step="10" value="100" oninput="tlpCalcRed()" style="flex:1;">
            <span class="ctrl-val">RM <span id="tlp-red-sub-v">100</span></span>
          </div>
          <div class="ctrl-row">
            <label>Manoj Wallet Points</label>
            <input type="range" id="tlp-red-wallet" min="0" max="3000" step="50" value="600" oninput="tlpCalcRed()" style="flex:1;">
            <span class="ctrl-val"><span id="tlp-red-wallet-v">600</span> pts</span>
          </div>
          <div class="sim-grid" style="margin-top:10px; font-size:11px;">
            <div class="sim-cell"><div class="sc-l">Max Cap Discount</div><div class="sc-v" id="tlp-red-cap-out">RM 20.00</div></div>
            <div class="sim-cell"><div class="sc-l">Points Deducted</div><div class="sc-v" id="tlp-red-pts-out">600 pts</div></div>
            <div class="sim-cell"><div class="sc-l">Discount Value</div><div class="sc-v" id="tlp-red-disc-out">RM 6.00</div></div>
            <div class="sim-cell"><div class="sc-l">Payable Subtotal</div><div class="sc-v" id="tlp-red-pay-out">RM 94.00</div></div>
          </div>
        </div>
      `
    },
    {
      title: "Step 6: SAGA Transaction & Stockout Rollback (Module 8, 5, 10)",
      short: "SAGA Rollback In Action",
      desc: "Distributed transaction fail recovery triggers Saga rollback logic.",
      script: "Tech Lead ko bolen: 'Sir, eventually consistent systems mein resilient database writes execution vital hai. Manoj redemption request approve hotey hi catalog voucher stockout alert fire hota hai. SAGA Coordinator transactional failure intercept karke SQL rollback updates execute karega, and points wallets balance checks instantly refund completes.'",
      services: [
        { name: "8 Automation", role: "Active - intercepts checkout failure logs, launches rollback workflows" },
        { name: "5 Points Engine", role: "Active - restores points balance to wallet (+600)" },
        { name: "10 Analytics", role: "Active - logs failure telemetry and transaction rollback events" }
      ],
      apiContract: {
        endpoint: "POST /v1/saga/rollback",
        payload: {
          transaction_id: "TXN-77881",
          loyalty_id: "LYL-MK998",
          rollback_reason: "catalog_stockout",
          points_to_restore: 600
        },
        response: {
          status: "ROLLBACK_COMPLETE",
          loyalty_id: "LYL-MK998",
          restored_points: 600,
          current_balance: 600
        },
        sql: "UPDATE wallets SET balance = balance + 600 WHERE customer_id = 'LYL-MK998';\nINSERT INTO wallet_ledger (ledger_id, wallet_id, tx_type, points, description) VALUES ('L-ROLL-99', 'W-MK998', 'REFUND', 600, 'Saga Compensation Rollback - Stockout');"
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Saga Rollback Execution Terminal</div>
          <div class="formula-box" style="background:#05070a; min-height:100px; font-family:monospace; font-size:11px; color:#a5d6ff; padding:10px;">
            <div id="tlp-saga-terminal">
              <span style="color:var(--text-muted); font-style:italic;">No active rollbacks. Click button below to trigger stockout failure event.</span>
            </div>
          </div>
          <button onclick="tlpRunSaga()" id="tlp-saga-btn" style="width:100%; padding:8px; border-radius:6px; background:var(--color-coral); color:#fff; cursor:pointer; font-weight:600; border:none; margin-top:10px;">
            Simulate Catalog Stockout (Trigger Rollback)
          </button>
        </div>
      `
    },
    {
      title: "Step 7: Expiration Cron & Grace Renewals (Module 11, 8, 9)",
      short: "Expiry & Grace Buffers",
      desc: "Annual points expiry scans and grace status downgrade buffers.",
      script: "Tech Lead ko bolen: 'Sir, cron scheduler roz checks run karta hai and 12-month TTL exceed hone pe points expire coordinates. Expiry reminders (Day -30, -7) dispatches automated alerts. Annual tier review time status downgrade transitions checks soft thresholds buffers provide coordinates, including a 30-day grace extensions.'",
      services: [
        { name: "11 Settings & Config", role: "Active - stores points TTL parameters (365 days)" },
        { name: "8 Automation", role: "Active - executes daily midnight cron checking updates" },
        { name: "9 Campaigns", role: "Active - schedules pre-expiry message notifications warning channels" }
      ],
      apiContract: {
        cronjob: "0 0 * * * (daily_midnight_sweep)",
        payload: {
          scan_parameters: "wallets where points_age >= 365 days",
          grace_period_days: 30,
          action: "points_expiration_warning_dispatch"
        },
        response: {
          expired_wallets_swept: 142,
          warnings_issued: 890,
          status: "CRON_COMPLETE"
        }
      },
      sandbox: `
        <div class="pitch-sandbox-card">
          <div class="sect-label">Grace Period Status Downgrade Mock</div>
          <div style="background:var(--bg-main); padding:10px; border-radius:6px; border:1px solid var(--border-color); font-size:12px; line-height:1.65; margin-bottom:10px;">
            <div><strong>Member Status:</strong> LYL-MK998 (Silver)</div>
            <div><strong>Annual Renewal Points:</strong> 420 / 500 points (Silver Target)</div>
            <div style="color:var(--color-amber);"><strong>Result:</strong> Silver evaluation missed (80 pts gap).</div>
          </div>
          <button onclick="tlpRunRenewal()" style="width:100%; padding:8px; border-radius:6px; background:var(--color-amber); color:#fff; cursor:pointer; font-weight:600; border:none;">
            Run Tier Renewal Sweep
          </button>
          <div id="tlp-renewal-out" class="pitch-code-block" style="display:none; color:var(--color-amber);"></div>
        </div>
      `
    }
  ];

  const currentStepData = TLP_STEPS[tlpCurStep];

  // Render HTML Structure
  container.innerHTML = `
    <div class="pres-layout">
      <!-- Left sidebar with 7 journey steps -->
      <div class="pres-slide-nav" style="max-height: 560px;">
        <div class="sect-label" style="margin-bottom:6px; padding-left:4px;">Manoj's Journey Steps</div>
        ${TLP_STEPS.map((s, idx) => `
          <button class="pres-slide-link ${idx === tlpCurStep ? 'active' : ''}" onclick="tlpJump(${idx})">
            <span style="font-family:monospace; opacity:0.6;">${idx + 1}</span>
            <span style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap; flex:1;">${s.short}</span>
          </button>
        `).join('')}
      </div>

      <!-- Right column details with interactive tabbed card -->
      <div class="pres-slide-content">
        <div class="pres-card">
          <div class="pres-slide-header">
            <div>
              <span class="sect-label" style="margin-bottom:2px;">TECH LEAD PITCH WALKTHROUGH</span>
              <h3 style="font-family:var(--font-display); font-size:18px; color:#fff;">${currentStepData.title}</h3>
            </div>
            <span class="pres-slide-num">Step ${tlpCurStep + 1} of ${TLP_STEPS.length}</span>
          </div>

          <p style="font-size:12.5px; color:var(--text-muted); line-height:1.5; margin:10px 0 16px;">
            ${currentStepData.desc}
          </p>

          <!-- Pitch Tabs (Script, Services, API Contract, Live Sandbox) -->
          <div class="pitch-tabs-row">
            <button class="pitch-tab-btn ${tlpActiveTab === 'script' ? 'active' : ''}" onclick="tlpSetActiveTab('script')">
              <i class="ti ti-microphone"></i> Talk Track
            </button>
            <button class="pitch-tab-btn ${tlpActiveTab === 'services' ? 'active' : ''}" onclick="pitchSetActiveTab('services')">
              <i class="ti ti-server-cog"></i> 11 Modules
            </button>
            <button class="pitch-tab-btn ${tlpActiveTab === 'contract' ? 'active' : ''}" onclick="pitchSetActiveTab('contract')">
              <i class="ti ti-code"></i> API & Data
            </button>
            <button class="pitch-tab-btn ${tlpActiveTab === 'sandbox' ? 'active' : ''}" onclick="pitchSetActiveTab('sandbox')">
              <i class="ti ti-play-card"></i> Live Sandbox
            </button>
          </div>

          <div class="pitch-tab-content">
            <!-- Script Tab -->
            <div id="tlp-tab-script" style="display:${tlpActiveTab === 'script' ? 'block' : 'none'}">
              <div class="pres-notes-box" style="margin-top:0;">
                <div class="script-title">
                  <i class="ti ti-microphone"></i> Tech Lead Pitch Script (Pitch like a Pro)
                </div>
                <div class="script-text">
                  "${currentStepData.script}"
                </div>
              </div>
              <div style="margin-top:14px; background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:12px; border-radius:8px;">
                <h4 style="font-size:12px; font-family:var(--font-display); color:#fff; margin-bottom:6px;">Key architectural takeaways to highlight:</h4>
                <ul style="font-size:11.5px; color:var(--text-muted); padding-left:14px; line-height:1.6;">
                  <li>Ensures sub-second latency targets at checkout lines.</li>
                  <li>Decoupled messaging (Kafka) handles heavy workloads without DB contention.</li>
                  <li>Strict append-only ledgers protect financial transaction history values.</li>
                </ul>
              </div>
            </div>

            <!-- Services Tab -->
            <div id="tlp-tab-services" style="display:${tlpActiveTab === 'services' ? 'block' : 'none'}">
              <div class="sect-label">Microservices Activation Metrics</div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${currentStepData.services.map(s => `
                  <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-field); border:1px solid ${s.role.includes('Active') ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)'}; padding:8px 12px; border-radius:6px; font-size:12px;">
                    <strong style="color:${s.role.includes('Active') ? 'var(--color-teal)' : 'var(--text-muted)'};">${s.name}</strong>
                    <span style="font-size:11px; font-family:monospace; color:${s.role.includes('Active') ? 'var(--color-teal)' : 'var(--text-muted)'};">${s.role}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- API Contract Tab -->
            <div id="tlp-tab-contract" style="display:${tlpActiveTab === 'contract' ? 'block' : 'none'}">
              <div class="sect-label">API Payload / Event Contracts</div>
              <div style="font-family:monospace; font-size:10.5px; color:var(--text-muted);">
                <div style="margin-bottom:6px;"><strong>Endpoint:</strong> <code style="color:var(--color-cyan);">${currentStepData.apiContract.endpoint || currentStepData.apiContract.cronjob}</code></div>
                
                ${currentStepData.apiContract.payload ? `
                  <div style="margin-top:6px;">Request Payload:</div>
                  <pre class="pitch-code-block">${JSON.stringify(currentStepData.apiContract.payload, null, 2)}</pre>
                ` : ''}

                ${currentStepData.apiContract.response ? `
                  <div style="margin-top:6px;">Response Payload:</div>
                  <pre class="pitch-code-block">${JSON.stringify(currentStepData.apiContract.response, null, 2)}</pre>
                ` : ''}

                ${currentStepData.apiContract.sql ? `
                  <div style="margin-top:6px;">PostgreSQL Schema Writes:</div>
                  <pre class="pitch-code-block" style="color:#d4a773;">${currentStepData.apiContract.sql}</pre>
                ` : ''}

                ${currentStepData.apiContract.kafkaEvent ? `
                  <div style="margin-top:6px;">Kafka Queue Broadcast Event:</div>
                  <pre class="pitch-code-block" style="color:var(--color-teal);">${currentStepData.apiContract.kafkaEvent}</pre>
                ` : ''}
              </div>
            </div>

            <!-- Live Sandbox Tab -->
            <div id="tlp-tab-sandbox" style="display:${tlpActiveTab === 'sandbox' ? 'block' : 'none'}">
              ${currentStepData.sandbox}
            </div>
          </div>

          <!-- Controls panel -->
          <div class="pres-controls-row" style="margin-top:20px;">
            <button onclick="tlpGo(-1)" ${tlpCurStep === 0 ? 'disabled' : ''}>← Previous</button>
            <span style="font-size:11px; font-family:monospace; color:var(--text-muted);">
              Play with Sandboxes inside each step!
            </span>
            <button class="pres-btn-accent" onclick="tlpGo(1)">
              ${tlpCurStep === TLP_STEPS.length - 1 ? 'Start Over ↺' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tech Lead Q&A Blueprint / Cheat Sheet (Accordion Accordion) -->
    <div class="pitch-qa-section">
      <h3 style="font-family:var(--font-display); font-size:16px; color:#fff; margin-bottom:12px;">
        <i class="ti ti-help-circle"></i> Tech Lead Q&A Cheat Sheet (Common Hard Questions Answered)
      </h3>
      
      <div class="pitch-accordion-item" id="tlp-qa-1">
        <button class="pitch-accordion-trigger" onclick="tlpToggleQa(1)">
          <span>1. Concurrency: Multiple checkout lines pe double-spending of points kaise prevent hota hai?</span>
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="pitch-accordion-content">
          Sir, hum concurrency control dynamic row-level updates levels pe lock checks manage karte hain. Wallets updates transaction processing time PostgreSQL db mein <strong>FOR UPDATE row lock</strong> apply karta hai. Concurrent double spending requests check filters fail details return entries database consistency protect rakhte hain. Iske alawa points logs write actions append-only ledger schema maintain karte hain so audit trials stay clean.
        </div>
      </div>

      <div class="pitch-accordion-item" id="tlp-qa-2">
        <button class="pitch-accordion-trigger" onclick="tlpToggleQa(2)">
          <span>2. Reliability: Agar order checkout database write complete hotey hi Loyalty system crash ho jaye?</span>
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="pitch-accordion-content">
          Checkout service and Loyalty service closely decoupled hain using <strong>Kafka Event Broker</strong>. Checkout completes hotey hi order.placed event message stream queue publish hotey hain. Agar loyalty databases down check parameters occur alerts details status logs message brokers handle records buffer store state secure coordinates, recovery complete alerts updates consume completed sync parameters.
        </div>
      </div>

      <div class="pitch-accordion-item" id="tlp-qa-3">
        <button class="pitch-accordion-trigger" onclick="tlpToggleQa(3)">
          <span>3. Performance: POS checkout lanes aur Mobile app status check limits SLA levels kya hain?</span>
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="pitch-accordion-content">
          High traffic peaks checks shielding parameters protect settings values. status details read operations bypass target db direct <strong>Redis Cluster Cache-Aside patterns</strong> endpoints queries resolve. Cache hits ratio metrics target 94%+ standard performance response latency registers <strong>sub-5 milliseconds</strong> speeds, direct databases queries bypass.
        </div>
      </div>

      <div class="pitch-accordion-item" id="tlp-qa-4">
        <button class="pitch-accordion-trigger" onclick="tlpToggleQa(4)">
          <span>4. Integrity: Admin ya internal program manager points value settings database changes live update checks kaise hote hain?</span>
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="pitch-accordion-content">
          Admin portal configs modify rules keys (e.g. base_points_rate). changes DB updates write updates broadcast invalidation hooks send alerts. In-memory engine catches cache reload event triggers immediately and pulls newly validated rates, compiling adjustments dynamically without any deployment downtime or service restarts.
        </div>
      </div>
    </div>
  `;

  // Render inner sandboxes states when tabs load
  if (tlpActiveTab === 'sandbox') {
    if (tlpCurStep === 2) tlpCalcEarn();
    if (tlpCurStep === 3) tlpCalcTier();
    if (tlpCurStep === 4) tlpCalcRed();
    if (tlpCurStep === 5) tlpRenderSagaLogs();
  }
}

// Global functions exposed to window for TLP
window.tlpJump = (idx) => {
  tlpCurStep = idx;
  renderTlp();
};

window.tlpGo = (d) => {
  const stepsCount = 7;
  if (tlpCurStep + d >= 0 && tlpCurStep + d < stepsCount) {
    tlpCurStep += d;
    renderTlp();
  } else if (tlpCurStep + d === stepsCount) {
    tlpCurStep = 0;
    renderTlp();
  }
};

window.pitchSetActiveTab = (tab) => {
  tlpActiveTab = tab;
  renderTlp();
};

window.tlpSetActiveTab = (tab) => {
  tlpActiveTab = tab;
  renderTlp();
};

window.tlpToggleQa = (id) => {
  const el = document.getElementById(`tlp-qa-${id}`);
  if (el) {
    el.classList.toggle('open');
  }
};

// Sandbox Handlers
window.tlpRunReg = () => {
  const name = document.getElementById('tlp-reg-name').value;
  const phone = document.getElementById('tlp-reg-phone').value;
  const out = document.getElementById('tlp-reg-out');
  out.style.display = 'block';
  out.innerHTML = `<span style="color:var(--color-teal);">[17:46:12] SQL Write: INSERT INTO customers (customer_id, name) VALUES ('LYL-MK998', '${name}');</span><br>` +
                  `<span style="color:var(--color-cyan);">[17:46:12] Cache set: Redis Key member:LYL-MK998 initialized.</span><br>` +
                  `<span style="color:#fff;">[17:46:12] Response: { "status": "SUCCESS", "loyalty_id": "LYL-MK998", "tier": "BRONZE" }</span>`;
};

window.tlpRunWelcome = () => {
  const bal = document.getElementById('tlp-welcome-bal');
  const btn = document.getElementById('tlp-welcome-btn');
  const msg = document.getElementById('tlp-welcome-msg');
  
  btn.disabled = true;
  btn.textContent = 'Processing automation...';
  
  setTimeout(() => {
    bal.textContent = '100 pts';
    btn.disabled = false;
    btn.textContent = 'Trigger Welcome Automation Event';
    msg.style.display = 'block';
    msg.innerHTML = `[17:46:40] Event customer.enrolled received.<br>` +
                    `[17:46:41] Points Engine credits +100 welcome bonus pts.<br>` +
                    `[17:46:41] Dispatching WhatsApp payload to API: "Welcome Manoj Kumar..."`;
  }, 1000);
};

window.tlpCalcEarn = () => {
  const sub = parseInt(document.getElementById('tlp-earn-sub').value);
  const rate = parseFloat(document.getElementById('tlp-earn-rate').value);
  const tierKey = document.getElementById('tlp-earn-tier').value;
  
  document.getElementById('tlp-earn-sub-v').textContent = sub;
  document.getElementById('tlp-earn-rate-v').textContent = rate.toFixed(1);
  
  const mult = { bronze: 1.0, silver: 1.5, gold: 2.0, platinum: 3.0 }[tierKey];
  const pts = Math.round(sub * rate * mult);
  
  document.getElementById('tlp-earn-eq').innerHTML = 
    `RM ${sub} × ${rate.toFixed(1)} rate × <span style="color:var(--color-cyan);">${mult}x</span> = <strong style="color:var(--color-teal);">${pts} points</strong>`;
  document.getElementById('tlp-earn-note').textContent = `Manoj adds ${pts} points to his account balance.`;
};

window.tlpCalcTier = () => {
  const pts = parseInt(document.getElementById('tlp-tier-life').value);
  document.getElementById('tlp-tier-life-v').textContent = pts.toLocaleString();
  
  let tier = 'Bronze';
  let mult = '1.0x';
  let next = 'Silver';
  let nextThreshold = 500;
  let color = '#CD7F32';
  let pct = 0;

  if (pts >= 5000) {
    tier = 'Platinum'; mult = '3.0x'; next = null; color = 'var(--color-primary)'; pct = 100;
  } else if (pts >= 2000) {
    tier = 'Gold'; mult = '2.0x'; next = 'Platinum'; nextThreshold = 5000; color = 'var(--color-amber)'; pct = Math.round((pts - 2000)/3000 * 100);
  } else if (pts >= 500) {
    tier = 'Silver'; mult = '1.5x'; next = 'Gold'; nextThreshold = 2000; color = 'var(--color-cyan)'; pct = Math.round((pts - 500)/1500 * 100);
  } else {
    tier = 'Bronze'; mult = '1.0x'; next = 'Silver'; nextThreshold = 500; color = '#CD7F32'; pct = Math.round(pts/500 * 100);
  }

  const badge = document.getElementById('tlp-tier-badge');
  badge.textContent = `${tier} Tier Active (${mult})`;
  badge.style.color = color;
  
  const bar = document.getElementById('tlp-tier-bar');
  bar.style.width = `${pct}%`;
  bar.style.backgroundColor = color;
  
  const progressLbl = document.getElementById('tlp-tier-progress-lbl');
  if (next) {
    progressLbl.textContent = `${pts.toLocaleString()} / ${nextThreshold.toLocaleString()} pts to ${next}`;
    document.getElementById('tlp-tier-msg').innerHTML = `Needs ${(nextThreshold - pts).toLocaleString()} pts for next status bump.`;
  } else {
    progressLbl.textContent = `${pts.toLocaleString()} pts`;
    document.getElementById('tlp-tier-msg').textContent = `Max tier level reached!`;
  }
};

window.tlpCalcRed = () => {
  const sub = parseInt(document.getElementById('tlp-red-sub').value);
  const bal = parseInt(document.getElementById('tlp-red-wallet').value);
  
  document.getElementById('tlp-red-sub-v').textContent = sub;
  document.getElementById('tlp-red-wallet-v').textContent = bal.toLocaleString();
  
  const maxRm = +(sub * 0.20).toFixed(2);
  const maxPts = Math.round(maxRm * 100);
  
  const ptsDeducted = Math.min(bal, maxPts);
  const discountVal = +(ptsDeducted / 100).toFixed(2);
  const payable = sub - discountVal;

  document.getElementById('tlp-red-cap-out').textContent = `RM ${maxRm.toFixed(2)} (${maxPts.toLocaleString()} pts)`;
  document.getElementById('tlp-red-pts-out').textContent = `${ptsDeducted.toLocaleString()} pts`;
  document.getElementById('tlp-red-disc-out').textContent = `RM ${discountVal.toFixed(2)}`;
  document.getElementById('tlp-red-pay-out').textContent = `RM ${payable.toFixed(2)}`;
};

window.tlpRunSaga = () => {
  if (tlpSagaRunning) return;
  tlpSagaRunning = true;
  
  const term = document.getElementById('tlp-saga-terminal');
  const btn = document.getElementById('tlp-saga-btn');
  
  btn.disabled = true;
  btn.textContent = 'Simulating rollback...';
  
  tlpSagaLogs = [
    `[17:47:01] 🛒 Checkout checkout reservation confirmed: debit 600 pts.`,
    `[17:47:02] 🚨 ERROR: Catalog db reports out-of-stock on Coupon code.`,
    `[17:47:03] ⚡ SAGA Coordinator triggers compensating transaction for LYL-MK998...`,
    `[17:47:04] ⚙️ DB write: UPDATE wallets SET balance = balance + 600 WHERE customer_id = 'LYL-MK998';`,
    `[17:47:05] ✅ SAGA Compensating rollback succeeded. Balance restored to 600 pts.`
  ];
  
  term.innerHTML = '';
  let lineIdx = 0;
  
  function addLine() {
    if (lineIdx < tlpSagaLogs.length) {
      const log = tlpSagaLogs[lineIdx];
      let color = '#fff';
      if (log.includes('ERROR') || log.includes('🚨')) color = 'var(--color-coral)';
      else if (log.includes('SAGA') || log.includes('⚙️')) color = 'var(--color-amber)';
      else if (log.includes('SUCCESS') || log.includes('✅')) color = 'var(--color-teal)';
      
      term.innerHTML += `<div style="color:${color}; margin-bottom:4px;">${log}</div>`;
      lineIdx++;
      setTimeout(addLine, 800);
    } else {
      tlpSagaRunning = false;
      btn.disabled = false;
      btn.textContent = 'Simulate Catalog Stockout (Trigger Rollback)';
    }
  }
  
  addLine();
};

window.tlpRenderSagaLogs = () => {
  const term = document.getElementById('tlp-saga-terminal');
  if (term && tlpSagaLogs.length > 0) {
    term.innerHTML = tlpSagaLogs.map(log => {
      let color = '#fff';
      if (log.includes('ERROR') || log.includes('🚨')) color = 'var(--color-coral)';
      else if (log.includes('SAGA') || log.includes('⚙️')) color = 'var(--color-amber)';
      else if (log.includes('SUCCESS') || log.includes('✅')) color = 'var(--color-teal)';
      return `<div style="color:${color}; margin-bottom:4px;">${log}</div>`;
    }).join('');
  }
};

window.tlpRunRenewal = () => {
  const out = document.getElementById('tlp-renewal-out');
  out.style.display = 'block';
  out.innerHTML = `[17:48:10] Annual tier sweep evaluation running...<br>` +
                  `[17:48:11] Member LYL-MK998: Silver qualification not met (needs 500 pts, has 420 pts).<br>` +
                  `[17:48:11] ⚠️ TRIGGER DOWNGRADE: Silver → Bronze status initialized.<br>` +
                  `[17:48:12] 🛡️ GRACE PERIOD ACTIVATED: 30-day buffer extends active Silver benefits.<br>` +
                  `[17:48:12] WhatsApp Alert: "Manoj, 30 days are left to secure your Silver status! Earn 80 points to retain."`;
};


// ==========================================================================
// PAGE 1: CUSTOMER JOURNEY
// ==========================================================================
function initJourney() {
  const b2cSteps = [
      {
        num: "1",
        name: "Entry Point & Acquisition",
        what: "This is the door. Customer finds us.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Ad / Referral Link Scan</strong><br><span style="font-size:8px; color:var(--text-muted);">Instagram / WhatsApp / QR</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Session Context Check</strong><br><span style="font-size:8px; color:var(--color-cyan);">Save Channel Source</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>CAC Attribution</strong><br><span style="font-size:8px; color:var(--text-muted);">ROI Tracked per Channel</span>
            </div>
          </div>
        `,
        formula: "CAC = Total Marketing Spend ÷ Total New Customers Acquired",
        lbl: [
          "Customer clicks referral link",
          "System saves WHERE they came from (Instagram, Google, WhatsApp)",
          "This source is tagged to their profile forever",
          "Analytics team tracks which channel gives best customers"
        ],
        script: "When a customer enters our loyalty system, 11 modules work like a ladder — each one passes data to the next. Let me walk through each rung. Rung 1: Entry Point & Acquisition. This is the door where the customer finds us. The customer clicks a referral link, the system saves where they came from (like Instagram or WhatsApp), and tags this source to their profile forever. The marketing team tracks this via the CAC formula: Marketing Spend divided by Customers Acquired."
      },
      {
        num: "2",
        name: "Customer 360",
        what: "Customer registers — a full 360 profile is created.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Demographics Submission</strong><br><span style="font-size:8px; color:var(--text-muted);">Name, Phone, DOB, Address</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Unique Customer ID</strong><br><span style="font-size:8px; color:var(--color-cyan);">LYL-MK998 Created</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Unified Profile Sync</strong><br><span style="font-size:8px; color:var(--text-muted);">Customer 360 Database Write</span>
            </div>
          </div>
        `,
        formula: "Profile Score = Basic (40%) + DOB (+20%) + Phone (+20%) + Addr (+20%)",
        lbl: [
          "Every field Manoj fills = richer profile",
          "DOB stored → Birthday earn event enabled",
          "Phone verified → SMS campaigns enabled",
          "100% profile → Profile Complete earn event fires → points credited"
        ],
        script: "Rung 2: Customer 360. When Manoj registers, a full 360 profile is created in our system. Every field Manoj fills makes a richer profile. The DOB is stored to enable birthday earn events, the phone number is verified to enable SMS campaigns, and once the profile completeness score reaches 100%, a profile completion bonus is triggered."
      },
      {
        num: "3",
        name: "Segmentation Engine",
        what: "System puts Manoj in the right bucket immediately.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>New Profile Created</strong><br><span style="font-size:8px; color:var(--text-muted);">Triggers Cohort Scanner</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Evaluate Cohorts</strong><br><span style="font-size:8px; color:var(--color-cyan);">Read channel, device, location</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Cohort Segment Assigned</strong><br><span style="font-size:8px; color:var(--text-muted);">'Social Referral' Bucket</span>
            </div>
          </div>
        `,
        formula: "Segment Score = Entry Channel + Behaviour Tags + Purchase History",
        lbl: [
          "Manoj came via Instagram → tagged as 'Social Referral' segment",
          "This segment gets a special welcome campaign",
          "As Manoj shops more → segment updates automatically",
          "Segments feed into Campaign Engine (Module 9)"
        ],
        script: "Rung 3: Segmentation Engine. The system silently puts Manoj into the right segment immediately based on his entry channel, location, and device type. Since Manoj came via Instagram, he is tagged as 'Social Referral' segment, which gets a special welcome campaign. As he shops more, his segment will update dynamically."
      },
      {
        num: "4",
        name: "Enrollment Engine",
        what: "Manoj officially joins the loyalty program.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Enrollment Trigger</strong><br><span style="font-size:8px; color:var(--text-muted);">Segment & Profile validated</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Welcome Credit</strong><br><span style="font-size:8px; color:var(--color-teal);">+100 welcome points credited</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Active Bronze Level</strong><br><span style="font-size:8px; color:var(--text-muted);">Initial Wallet Activated</span>
            </div>
          </div>
        `,
        formula: "Welcome Points = Config Setting (default: 100 pts)\nTier Default = Bronze (0 pts required)",
        lbl: [
          "Enrollment creates Manoj's loyalty wallet",
          "100 welcome points auto-credited",
          "Bronze tier assigned",
          "Welcome email sent with loyalty card / QR code",
          "Manoj is now officially in the program"
        ],
        script: "Rung 4: Enrollment Engine. Manoj officially joins the program. Enrollment creates his loyalty wallet, credits 100 welcome points automatically, assigns him the default Bronze tier, and dispatches a welcome notification containing his new loyalty card."
      },
      {
        num: "5",
        name: "Points Engine",
        what: "The calculator — every rupee Manoj spends becomes points.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Capture Subtotal</strong><br><span style="font-size:8px; color:var(--text-muted);">Exclude tax & delivery</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Apply Formulas</strong><br><span style="font-size:8px; color:var(--color-cyan);">Subtotal × Rate × Multiplier</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Write to Wallet Ledger</strong><br><span style="font-size:8px; color:var(--text-muted);">Instant point credit sync</span>
            </div>
          </div>
        `,
        formula: "Points = Order Amount (RM) × Points Rate × Tier Multiplier",
        lbl: [
          "Order placed → subtotal captured (NO tax, NO delivery)",
          "Points rate applied (configured by admin)",
          "Tier multiplier applied based on current tier (Bronze: 1x, Silver: 1.5x, Gold: 2x, Platinum: 3x)",
          "Points land in wallet instantly and ledger records transaction"
        ],
        script: "Rung 5: Points Engine. The points engine is the calculator: every dollar spent is converted into points. It captures the subtotal of the order, applies the base points rate and Manoj's tier multiplier, and credits his wallet instantly while recording the transaction in the ledger."
      },
      {
        num: "6",
        name: "Tier Engine",
        what: "Checks if Manoj deserves a promotion — every single time he earns.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Read Lifetime Points</strong><br><span style="font-size:8px; color:var(--text-muted);">Ignore redemptions</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Threshold check</strong><br><span style="font-size:8px; color:var(--color-cyan);">Silver: 500 | Gold: 2000 | Plat: 5000</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Upgraded Status DB write</strong><br><span style="font-size:8px; color:var(--text-muted);">Activate multiplier & send alert</span>
            </div>
          </div>
        `,
        formula: "Lifetime Points = EARN ONLY | Wallet Points = Can go up and down",
        lbl: [
          "Runs automatically after EVERY points deposit",
          "Checks lifetime points counter (which is never reduced by redemptions)",
          "Upgrades tier status fields in database immediately when threshold crossed",
          "Next transaction automatically uses the upgraded tier multiplier rate"
        ],
        script: "Rung 6: Tier Engine. Checks if Manoj deserves a promotion every single time he earns points. It reads his permanent Lifetime Points counter (which never decreases). If it crosses 500, he is upgraded to Silver, unlocking a 1.5x multiplier on his next orders."
      },
      {
        num: "7",
        name: "Rewards Catalog",
        what: "The menu — what can Manoj do with his points?",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Open Rewards Panel</strong><br><span style="font-size:8px; color:var(--text-muted);">Fetch eligible deals list</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Apply 20% capping rule</strong><br><span style="font-size:8px; color:var(--color-cyan);">Enforce safety margin caps</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Burn points at checkout</strong><br><span style="font-size:8px; color:var(--text-muted);">Debit wallet (Lifetime safe)</span>
            </div>
          </div>
        `,
        formula: "Max Redeemable = Order Subtotal × 20% cap\nPayable Amount = Subtotal - Discount Applied",
        lbl: [
          "Displays catalog filtered by Manoj's tier and wallet balance",
          "Enforces the 20% order subtotal discount cap to protect profit margins",
          "Reduces Wallet points balance only, keeping Lifetime points safe",
          "Enables instant points burn discount at billing checkout"
        ],
        script: "Rung 7: Rewards Catalog. The menu of what rewards and discounts Manoj can redeem. During checkout, Manoj can choose to redeem his points. The system applies the 20% cap limit (e.g. max RM 40 off on a RM 200 bill), deducts the burned points from his wallet, but leaves his lifetime points untouched to preserve his tier status."
      },
      {
        num: "8",
        name: "Automation Engine",
        what: "The robot — sends the right message at the right time automatically.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Listen to System Events</strong><br><span style="font-size:8px; color:var(--text-muted);">Points Earned, Tier Upgrade, DOB</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Match Automation Rules</strong><br><span style="font-size:8px; color:var(--color-cyan);">Select message template</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Trigger messaging send</strong><br><span style="font-size:8px; color:var(--text-muted);">WhatsApp / Email / App Push</span>
            </div>
          </div>
        `,
        formula: "Trigger Rules (e.g. Points expiring in 30 days → send Expiry Alert)",
        lbl: [
          "Listens for all events in real time",
          "Selects the correct message templates dynamically",
          "Personalizes messages with Manoj's name, points values, and dates",
          "Sends via the most effective channel: App Push, WhatsApp, or SMS"
        ],
        script: "Rung 8: Automation Engine. The robot that sends the right messages at the right time. It listens for system triggers: when Manoj earns points, gets upgraded, is inactive for 30 days, or when his points are about to expire, it dispatches personalized alerts via WhatsApp, SMS, or Push notifications."
      },
      {
        num: "9",
        name: "Campaigns Engine",
        what: "Special promotions and bonus offers for Manoj.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Create Campaign rules</strong><br><span style="font-size:8px; color:var(--text-muted);">Double Points, Spend Milestones</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Match Segment Cohort</strong><br><span style="font-size:8px; color:var(--color-cyan);">Filter eligible users</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Apply Campaign bonus</strong><br><span style="font-size:8px; color:var(--text-muted);">Write promo ledger entries</span>
            </div>
          </div>
        `,
        formula: "Double Points: Points = Normal × 2 | Spend Milestone: IF spend >= RM 500 → +1,000 pts",
        lbl: [
          "Admin creates targeted marketing campaigns for segments",
          "Double Points: base points multiplied by 2",
          "Spend Milestones: flat rewards for crossing monthly targets",
          "Referrals: dual reward points for both referrer and referee"
        ],
        script: "Rung 9: Campaigns Engine. Special marketing promotions. Admin can create 'Double Points Weekend' or birthday multiplier campaigns. When Manoj falls into the target segment and shops during the active campaign window, the system automatically awards him the promotional bonus points."
      },
      {
        num: "10",
        name: "Analytics Engine",
        what: "The brain — tracks everything, shows what's working.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Collect transaction logs</strong><br><span style="font-size:8px; color:var(--text-muted);">Pushes, points, upgrades, redemptions</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Calculate program metrics</strong><br><span style="font-size:8px; color:var(--color-cyan);">CLV, Redemption rate, Churn risk</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Update real-time dashboard</strong><br><span style="font-size:8px; color:var(--text-muted);">Insights for campaign creation</span>
            </div>
          </div>
        `,
        formula: "CLV = Average Spend × Frequency × Lifespan\nRedemption Rate = Points Redeemed ÷ Points Issued × 100",
        lbl: [
          "Aggregates system-wide data on points issuance and redemptions",
          "Calculates Customer Lifetime Value (CLV) and retention percentages",
          "Identifies churn risks by flagging inactive accounts",
          "Feeds insights back to segmentation and campaign engines to close the loop"
        ],
        script: "Rung 10: Analytics Engine. The brain of the platform. It aggregates all purchase logs, wallet balances, and campaign results in real-time. It calculates key metrics like CLV and ROI, displays them on dashboard panels, and feeds churn risks back into the segmentation engine to prompt retention offers."
      },
      {
        num: "11",
        name: "Settings & Configuration",
        what: "The control panel — admin controls all rules from here.",
        flow: `
          <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Login to Control Panel</strong><br><span style="font-size:8px; color:var(--text-muted);">Admin settings UI</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
              <strong>Update settings registry</strong><br><span style="font-size:8px; color:var(--color-cyan);">Modify values (rate, cap, thresholds)</span>
            </div>
            <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
            <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
              <strong>Instant execution update</strong><br><span style="font-size:8px; color:var(--text-muted);">Engines pull new variables</span>
            </div>
          </div>
        `,
        formula: "points_rate = 1.0 pt/RM | redemption_cap = 20% | silver_threshold = 500",
        lbl: [
          "Enables admins to configure points parameters in real time",
          "Altering variables immediately propagates to all active services",
          "Eliminates technical downtime: adjustments are instantly validated",
          "Empowers marketing managers to self-serve rules without IT help"
        ],
        script: "Rung 11: Settings & Configuration. The control panel. Admins can log in and change rules like the welcome bonus amount, points rate, tier thresholds, or capping percentage. Once updated, all engines pull the new rules instantly without requiring developers or deployments."
      },
      {
        num: "",
        name: "Complete Ladder Flow Map",
        what: "Summary map of the 11 modules working as a unified flow.",
        flow: `
          <div style="max-height: 180px; overflow-y: auto; padding: 4px; display:flex; flex-direction:column; gap:4px; font-size:9.5px; text-align:left; width:100%;">
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">1. Entry Point:</strong> <span>Capture discovery channel & track CAC.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">2. Customer 360:</strong> <span>Initialize unified demographics record.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">3. Segmentation:</strong> <span>Cohort bucket mapping by behavior.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">4. Enrollment:</strong> <span>Loyalty wallet creation & welcome reward.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">5. Points Engine:</strong> <span>Accrual calculation: Spend × Rate × Multiplier.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">6. Tier Engine:</strong> <span>Compare lifetime points against thresholds.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">7. Rewards:</strong> <span>Checkout point burn & 20% capping rule.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">8. Automation:</strong> <span>Listen & dispatch transactional notifications.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">9. Campaigns:</strong> <span>Execute multipliers & targeted promotions.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">10. Analytics:</strong> <span>Real-time dashboard telemetry & CLV tracking.</span></div>
            <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">11. Settings:</strong> <span>Control panel values registry rules settings.</span></div>
          </div>
        `,
        formula: "Loop: Acquisition → Engagement → Retention → Upgraded Tiers → Higher CLV",
        lbl: [
          "11 systems link together like a cascade",
          "Every output triggers the next system rung",
          "Drives customer engagement automatically",
          "Secures long term business profitability"
        ],
        script: "To summarize: when a customer enters our loyalty system, these 11 modules work like a ladder — each one passes data to the next, building a loops that drives customer lifecycle values."
      },
      {
        num: "",
        name: "Quick Summary Cheat Sheet",
        what: "Cheat sheet overview of all systems for presentation reference.",
        flow: `
          <div style="max-height: 180px; overflow-y: auto; width:100%;">
            <table style="width:100%; border-collapse:collapse; font-size:9px; text-align:left; line-height:1.2;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-color); color:var(--color-cyan);">
                  <th style="padding:2px;">System</th>
                  <th style="padding:2px;">One Line Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">1. Entry Point</td><td style="padding:2px; color:var(--text-muted);">Tracks which channel brought the customer</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">2. Customer 360</td><td style="padding:2px; color:var(--text-muted);">Full profile — name, DOB, phone, history</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">3. Segmentation</td><td style="padding:2px; color:var(--text-muted);">Groups customers by behaviour and source</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">4. Enrollment</td><td style="padding:2px; color:var(--text-muted);">Joins loyalty program, gets welcome points</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">5. Points Engine</td><td style="padding:2px; color:var(--text-muted);">Amount × Rate × Multiplier = Points</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">6. Tier Engine</td><td style="padding:2px; color:var(--text-muted);">Lifetime points → Bronze/Silver/Gold/Platinum</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">7. Rewards</td><td style="padding:2px; color:var(--text-muted);">What can I redeem? Max 20% cap per order</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">8. Automation</td><td style="padding:2px; color:var(--text-muted);">Right message, right time, automatically</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">9. Campaigns</td><td style="padding:2px; color:var(--text-muted);">Double points, bonus events, referral chains</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">10. Analytics</td><td style="padding:2px; color:var(--text-muted);">CLV, redemption rate, churn risk, ROI</td></tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">11. Settings</td><td style="padding:2px; color:var(--text-muted);">Admin control panel for all rules</td></tr>
              </tbody>
            </table>
          </div>
        `,
        formula: "Complete 11 modules reference card",
        lbl: [
          "1. Entry Point, 2. Customer 360, 3. Segmentation",
          "4. Enrollment, 5. Points Engine, 6. Tier Engine",
          "7. Rewards, 8. Automation, 9. Campaigns",
          "10. Analytics, 11. Settings & Config"
        ],
        script: "Here is a quick summary table of all 11 systems: from Entry Point to Settings & Configuration, for fast reference during QA."
      }
    ];

  const b2bSteps = [
    {
      num: "1",
      name: "Entry Point & Acquisition",
      what: "Partner onboarding entry tracking via portal or referral.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Onboarding Portal / API</strong><br><span style="font-size:8px; color:var(--text-muted);">Partner Registration Page</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Onboarding Source Verified</strong><br><span style="font-size:8px; color:var(--color-cyan);">Save Channel Source</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>CAC Attribution Check</strong><br><span style="font-size:8px; color:var(--text-muted);">Finance computes partner CAC</span>
          </div>
        </div>
      `,
      formula: "CAC = (Sales Team Cost + Onboarding Spend) ÷ New Partners Acquired",
      lbl: [
        "Partner applies through onboarding portal or referral link",
        "System captures partner source channel (e.g. reseller portal)",
        "Source channel is permanently attached to partner account",
        "Finance tracks partner onboarding cost and computes ROI"
      ],
      script: "Rung 1: Entry Point & Acquisition. Partner program mein entry track karne ke liye link scan ya portal check hota hai. CAC is calculated as sales/marketing spend divided by acquired partners."
    },
    {
      num: "2",
      name: "Partner 360",
      what: "Aggregated database view of partner profile and credentials.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Company KYC Verification</strong><br><span style="font-size:8px; color:var(--text-muted);">Tax documents & corporate info</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Unique Partner ID</strong><br><span style="font-size:8px; color:var(--color-cyan);">PTN-RT098 Created</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Partner 360 Database Sync</strong><br><span style="font-size:8px; color:var(--text-muted);">Sync profile, bank, credit limit</span>
          </div>
        </div>
      `,
      formula: "KYC Score = Profile (40%) + Business Reg (30%) + Bank Verify (30%)",
      lbl: [
        "Partner submits business registration, tax documents, and bank info",
        "System checks credentials and assigns a unique Partner ID",
        "Profile details are saved to the Partner 360 database",
        "Enables targeted co-marketing, tiers, and training"
      ],
      script: "Rung 2: Partner 360. Partner profile details aur verified status check. KYC details, tax info, bank details aggregate ho kar single unified schema mein store hote hain."
    },
    {
      num: "3",
      name: "B2B Segmentation",
      what: "Categorize partners dynamically based on industry and target markets.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Industry Verticals Scan</strong><br><span style="font-size:8px; color:var(--text-muted);">Reseller / Distributor / Integrator</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Dynamic Volume Cohort</strong><br><span style="font-size:8px; color:var(--color-cyan);">Direct Distributor vs Sub-Reseller</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Target Terms Assigned</strong><br><span style="font-size:8px; color:var(--text-muted);">Custom rebate rates setup</span>
          </div>
        </div>
      `,
      formula: "Segment Tag = f(Vertical, Region, Target Volume)",
      lbl: [
        "Analysis of industry vertical (e.g., IT reseller, FMCG distributor)",
        "Cohort bucket assigned (e.g. Mega Distributor, Small Reseller)",
        "Tailors rebate structures and co-marketing campaigns",
        "Segment is updated dynamically based on quarterly purchase behavior"
      ],
      script: "Rung 3: B2B Segmentation. Partners ko industry vertical (jaise electronics, constructions) aur expected volume ke aadhar par segments mein categorize kiya jata hai."
    },
    {
      num: "4",
      name: "Enrollment Engine",
      what: "Partner is officially activated and enrolled in the loyalty scheme.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Sign Partner Agreement</strong><br><span style="font-size:8px; color:var(--text-muted);">Digital signing of terms & conditions</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Active Status Set</strong><br><span style="font-size:8px; color:var(--color-teal);">Rebate Wallet & Ledger initialized</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Base Tier Evaluation</strong><br><span style="font-size:8px; color:var(--text-muted);">Active Silver (1%) or Inactive (0%) set</span>
          </div>
        </div>
      `,
      formula: "Status = ACTIVE | Initial Earning Multiplier = 0.0x or 1.0x",
      lbl: [
        "Partner reviews and digitally signs partner program agreement",
        "Ledger account and rebate wallet are created",
        "Initial tier level is assigned based on onboarding revenue projections",
        "Access to partner loyalty portal is unlocked"
      ],
      script: "Rung 4: Enrollment Engine. Agreement digital sign hote hi account ledger status updates to ACTIVE. Base tier multiplier (Silver/Inactive) allocate ho jata hai."
    },
    {
      num: "5",
      name: "Performance Scoring",
      what: "Calculate partner performance score (max 1000) every quarter.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Collect KPI Metrics</strong><br><span style="font-size:8px; color:var(--text-muted);">Revenue, Growth, Freq, Pay, Train</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Scoring Formula Run</strong><br><span style="font-size:8px; color:var(--color-cyan);">Weights applied (Revenue 40%, Growth 20%)</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Quarterly Performance Score</strong><br><span style="font-size:8px; color:var(--text-muted);">Score recorded (e.g. 978 / 1,000)</span>
          </div>
        </div>
      `,
      formula: "Score = (Rev×400) + (Growth×200) + (Freq×150) + (Pay×150) + (Train×100)",
      lbl: [
        "Tracks actual revenue vs quarterly target",
        "Computes Year-over-Year revenue growth",
        "Monitors order frequency, payment timeliness, and training certifications",
        "Combines these 5 metrics into a single score out of 1000"
      ],
      script: "Rung 5: Performance Scoring. Quarterly evaluation run hone par 5 params evaluate hote hain: Revenue, growth, frequency, payment ontime record, aur training completed modules."
    },
    {
      num: "6",
      name: "Tier Upgrades & Evaluation",
      what: "Determine partner tier level based on revenue and performance score.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Score & Revenue Audited</strong><br><span style="font-size:8px; color:var(--text-muted);">Evaluate vs Silver/Gold/Plat limits</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Apply 2-Quarter Rule</strong><br><span style="font-size:8px; color:var(--color-cyan);">2 consecutive qtrs target meeting check</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Tier Allocation Confirmed</strong><br><span style="font-size:8px; color:var(--text-muted);">Upgrade to Platinum or Downgrade to Silver</span>
          </div>
        </div>
      `,
      formula: "Tier = f(Score, Revenue, Consecutive Quarters)",
      lbl: [
        "Reads quarterly score and actual sales revenue",
        "Compares against Silver (500 pts, RM 100k), Gold (700 pts, RM 500k), Platinum (850 pts, RM 1M)",
        "Requires 2 consecutive quarters of meeting target to upgrade",
        "Missing threshold for 2 consecutive quarters triggers a downgrade"
      ],
      script: "Rung 6: Tier Upgrades & Evaluation. Tier levels score aur sales ke rules se decide hote hain. Upgrade ya downgrade karne ke liye 2 consecutive quarters evaluate hote hain."
    },
    {
      num: "7",
      name: "Rebates & MDF Allocation",
      what: "Calculate quarterly rebate payouts and marketing fund credits.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Read active tier rebate %</strong><br><span style="font-size:8px; color:var(--text-muted);">Platinum 3% | Gold 2% | Silver 1%</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--color-teal); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Apply high score bonus</strong><br><span style="font-size:8px; color:var(--color-teal);">Score >= 900 -> +0.5% rebate bonus</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>MDF & Rebate Credit</strong><br><span style="font-size:8px; color:var(--text-muted);">MDF allocated (Gold: 2k, Plat: 5k)</span>
          </div>
        </div>
      `,
      formula: "Rebate = Sales × Tier Rate% (+0.5% if Score >= 900) | MDF = Flat Tier Reward",
      lbl: [
        "Checks partner tier to get base rebate % (Silver 1%, Gold 2%, Platinum 3%)",
        "Multiplies net quarterly sales by rebate %",
        "Applies +0.5% rebate bonus if performance score is >= 900",
        "Allocates MDF (RM 2k for Gold, RM 5k for Platinum) to partner balance"
      ],
      script: "Rung 7: Rebates & MDF Allocation. Dynamic rebate amount calculate hokar partner wallet mein add hota hai. Platinum/Gold tiers ko co-marketing funds (MDF) bhi release kiye jaate hain."
    },
    {
      num: "8",
      name: "Returns Saga Rollback",
      what: "Handle product returns and claw back disbursed rebates using saga pattern.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Return Initiated</strong><br><span style="font-size:8px; color:var(--text-muted);">Returned goods value logged</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(220, 38, 38, 0.08); border:1px solid var(--color-coral); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Clawback Calculation</strong><br><span style="font-size:8px; color:var(--color-coral);">Clawback = Return Value × paid rebate rate</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Saga Rollback Ledger Write</strong><br><span style="font-size:8px; color:var(--text-muted);">Wallet debited & credit note created</span>
          </div>
        </div>
      `,
      formula: "Clawback Rebate = Returned Item Value × Earned Rebate%",
      lbl: [
        "Customer/partner initiates a return of previously sold inventory",
        "Saga orchestrator logs return event and finds original sales transaction",
        "Computes the rebate and growth bonus portion that was paid on the returned goods",
        "Issue debit note or deduct points/cash from partner's wallet"
      ],
      script: "Rung 8: Returns Saga Rollback. Product return hone par SAGA pattern orchestrator execute hota hai. Payout kiya hua rebate calculation reverse roll back kiya jata hai to avoid fraud."
    },
    {
      num: "9",
      name: "Co-Marketing Campaigns",
      what: "Co-fund local marketing campaigns with partners using MDF.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Campaign Request Submission</strong><br><span style="font-size:8px; color:var(--text-muted);">Details, budget and target market</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>MDF Balance Check</strong><br><span style="font-size:8px; color:var(--color-cyan);">Approved up to available MDF balance</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Event execution & ROI check</strong><br><span style="font-size:8px; color:var(--text-muted);">Lead conversion tracking active</span>
          </div>
        </div>
      `,
      formula: "MDF Claim Approved = MIN(Requested Budget, MDF Balance)",
      lbl: [
        "Partner submits a proposal for a local advertising or exhibition campaign",
        "System checks MDF balance and approves funding",
        "Campaign runs, and co-marketing leads are tracked",
        "ROI is evaluated at the end of the campaign"
      ],
      script: "Rung 9: Co-Marketing Campaigns. Partners co-marketing budget proposal submit karte hain. Platform MDF balance check karke local lead campaigns fund karta hai."
    },
    {
      num: "10",
      name: "Partner Referrals",
      what: "Reward partners for bringing in new clients or sub-resellers.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Referral Link Shared</strong><br><span style="font-size:8px; color:var(--text-muted);">Invite dealer network prospect</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>New Dealer Active Silver</strong><br><span style="font-size:8px; color:var(--color-cyan);">Silver tier milestone target met</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Referral Payout Disbursed</strong><br><span style="font-size:8px; color:var(--text-muted);">Flat RM 2,000 credit in wallet</span>
          </div>
        </div>
      `,
      formula: "Referral Reward = Flat RM 2,000 + 0.2% Referral Sales Bonus",
      lbl: [
        "Partner shares a referral code with another prospective dealer",
        "New dealer signs up and achieves active Silver status",
        "System rewards referring partner with referral credit",
        "Boosts organic channel growth and loyalty"
      ],
      script: "Rung 10: Partner Referrals. Agar koi partner sub-dealer ko refer karta hai, to new dealer active hote hi referring partner ko flat referral rewards disburse hote hain."
    },
    {
      num: "11",
      name: "Rules Configuration",
      what: "Configure system limits, scoring weights, and target margins.",
      flow: `
        <div class="flow-chart" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Modify Rule Parameter</strong><br><span style="font-size:8px; color:var(--text-muted);">Manager updates weight or base rate</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:rgba(6, 182, 212, 0.08); border:1px solid var(--color-cyan); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center; box-shadow:var(--glow-cyan);">
            <strong>Redis Cache Invalidation</strong><br><span style="font-size:8px; color:var(--color-cyan);">Cache sync invalidation event fires</span>
          </div>
          <div style="color:var(--color-cyan); font-size:10px;"><i class="ti ti-arrow-down"></i></div>
          <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:6px 10px; border-radius:6px; font-size:10px; width:220px; text-align:center;">
            <strong>Zero Downtime Cascade</strong><br><span style="font-size:8px; color:var(--text-muted);">Engines pull updated configuration parameters</span>
          </div>
        </div>
      `,
      formula: "System Configuration = Centralized In-Memory Cache",
      lbl: [
        "Admin logs in to configure performance scoring weights or base rates",
        "Updates PostgreSQL DB and publishes invalidation event to Redis",
        "Scoring and rebate engines reload configuration in real-time",
        "Ensures zero-downtime policy upgrades"
      ],
      script: "Rung 11: Rules Configuration. Admins rules config table update karte hain. PostgreSQL write flags trigger cache update, aur system points/weights real-time updates execute karta hai."
    },
    {
      num: "",
      name: "Complete Partner Journey Map",
      what: "Summary map of the 11 B2B modules working as a unified flow.",
      flow: `
        <div style="max-height: 180px; overflow-y: auto; padding: 4px; display:flex; flex-direction:column; gap:4px; font-size:9.5px; text-align:left; width:100%;">
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">1. Entry Point:</strong> <span>Capture onboarding portal source & calculate CAC.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">2. Partner 360:</strong> <span>Initialize verified demographics & credit info.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">3. Segmentation:</strong> <span>Volume & industry vertical dynamic segment tags.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">4. Enrollment:</strong> <span>Wallet ledger setup & digital agreement sign active.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">5. Scoring:</strong> <span>Compute score based on 5 KPIs (Revenue, Growth, Freq, Pay, Train).</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">6. Tier Engine:</strong> <span>Compare score and revenue limits over consecutive quarters.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">7. Rebates:</strong> <span>Disburse rebate % (+0.5% score bonus) & allocate MDF funds.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">8. Returns Saga:</strong> <span>Rollback calculations clawback paid rebates on inventory returns.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">9. Co-Marketing:</strong> <span>Claim accrued MDF funds to co-finance marketing roadshows.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">10. Referrals:</strong> <span>Reward partner-get-partner dealer recruitments.</span></div>
          <div style="display:flex; gap:8px;"><strong style="color:var(--color-cyan); min-width:80px;">11. Rules:</strong> <span>Admin settings registry parameters reload dynamically.</span></div>
        </div>
      `,
      formula: "Loop: Onboard → Score → Tier Upgrade → Rebate Disbursed → MDF Claim → Growth",
      lbl: [
        "11 systems link together like a cascade",
        "Every output triggers the next system rung",
        "Drives partner engagement automatically",
        "Secures long term B2B channel revenues"
      ],
      script: "B2B Partner Journey summary: onboarding se shuru hokar dynamic scorecard evaluation, rebate disbursement, co-marketing MDF programs, referrals, and cache-backed rules config cascade hotey hain."
    },
    {
      num: "",
      name: "Quick Summary Cheat Sheet",
      what: "Cheat sheet overview of all systems for presentation reference.",
      flow: `
        <div style="max-height: 180px; overflow-y: auto; width:100%;">
          <table style="width:100%; border-collapse:collapse; font-size:9px; text-align:left; line-height:1.2;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-color); color:var(--color-cyan);">
                <th style="padding:2px;">System</th>
                <th style="padding:2px;">One Line Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">1. Entry Point</td><td style="padding:2px; color:var(--text-muted);">Tracks which channel/referral onboarded the partner</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">2. Partner 360</td><td style="padding:2px; color:var(--text-muted);">KYC verified company profile - credit limit, bank details</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; color:var(--text-muted);">Groups partners dynamically by vertical & volume cohort</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">4. Enrollment</td><td style="padding:2px; color:var(--text-muted);">Agreement signed, wallet created, status sets active</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">5. Scoring</td><td style="padding:2px; color:var(--text-muted);">Quarterly score out of 1000 based on 5 KPIs</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">6. Tier Engine</td><td style="padding:2px; color:var(--text-muted);">Promotes/demotes tier based on score & revenue over 2 quarters</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">7. Rebates & MDF</td><td style="padding:2px; color:var(--text-muted);">Disburses net sales rebate (+score bonus) & credits MDF</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">8. Returns Saga</td><td style="padding:2px; color:var(--text-muted);">Rolls back disbursed rebates if inventory is returned</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">9. Co-Marketing</td><td style="padding:2px; color:var(--text-muted);">Co-funds regional ad campaigns using partner's accrued MDF</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">10. Referrals</td><td style="padding:2px; color:var(--text-muted);">Rewards partners for introducing new dealers to the network</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:2px; font-weight:bold;">11. Rules Registry</td><td style="padding:2px; color:var(--text-muted);">Admin settings for weights and rates propagation</td></tr>
            </tbody>
          </table>
        </div>
      `,
      formula: "Complete 11 B2B modules reference card",
      lbl: [
        "1. Entry Point, 2. Partner 360, 3. Segmentation",
        "4. Enrollment, 5. Scoring, 6. Tier Engine",
        "7. Rebates & MDF, 8. Returns Saga, 9. Co-Marketing",
        "10. Referrals, 11. Rules Configuration"
      ],
      script: "Complete B2B partner loyalty framework systems index cheat sheet summary for quick QA audits."
    }
  ];

  const steps = activeMode === 'b2c' ? b2cSteps : b2bSteps;
  let cur = 0;

  function render() {
    const s = steps[cur];
    const total = steps.length;

    const container = document.getElementById('journey-wrap');
    if (!container) return;

    container.innerHTML = `
      <div class="pres-layout">
        <!-- Left slide navigator sidebar -->
        <div class="pres-slide-nav" style="max-height: 520px;">
          <div class="sect-label" style="margin-bottom:6px; padding-left:4px;">Ladder Rungs</div>
          ${steps.map((st, idx) => `
            <button class="pres-slide-link ${idx === cur ? 'active' : ''}" onclick="jJump(${idx})">
              <span style="font-family:monospace; opacity:0.6;">${st.num ? String(st.num).padStart(2, '0') : 'M'}</span>
              <span style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap; flex:1;">${st.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Right Column: Active Slide Projector Screen -->
        <div class="pres-slide-content">
          <!-- Slide Projector Card Screen -->
          <div class="pres-card" style="position:relative; overflow:hidden; background:linear-gradient(135deg, rgba(22, 28, 45, 0.8), rgba(15, 23, 42, 0.95)); border:2px solid rgba(6, 182, 212, 0.35); box-shadow:var(--glow-cyan), var(--shadow-main); padding:24px; min-height:420px; border-radius:16px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s ease;">
            
            <!-- Slide Top Header -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; margin-bottom:12px;">
              <span style="font-size:9px; font-weight:700; color:var(--color-cyan); text-transform:uppercase; letter-spacing:0.1em; background:rgba(6, 182, 212, 0.1); padding:3px 8px; border-radius:20px;">
                ${activeMode === 'b2c' ? '11 SYSTEMS LADDER FLOW' : '11 PARTNER SYSTEMS LADDER FLOW'}
              </span>
              <span style="font-size:10.5px; font-family:monospace; color:var(--text-muted);">
                Rung ${cur + 1} of ${total}
              </span>
            </div>

            <!-- Slide Content Split Screen Area -->
            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:12px;">
              <h2 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#fff; text-align:center; margin-bottom:6px;">
                ${s.num ? s.num + '. ' : ''}${s.name}
              </h2>
              
              <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:stretch;">
                <!-- Left Side: Interactive Screen Mockup / Flow Chart -->
                <div style="flex:1.2; min-width:270px; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:12px; padding:16px; display:flex; flex-direction:column; justify-content:center; gap:10px; min-height:180px;">
                  <div style="flex:1; display:flex; align-items:center; justify-content:center;">
                    ${s.flow}
                  </div>
                  <div style="font-family:monospace; font-size:9.5px; color:var(--color-amber); background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.05); padding:6px 10px; border-radius:6px; text-align:center; white-space:pre-line;">
                    ${s.formula}
                  </div>
                </div>
                
                <!-- Right Side: Professional Lifecycle Details -->
                <div style="flex:1; min-width:230px; display:flex; flex-direction:column; gap:8px; text-align:left;">
                  <div>
                    <span style="font-size:8px; font-weight:700; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; background:rgba(99,102,241,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                      What it does
                    </span>
                    <div style="font-size:11px; font-weight:bold; color:#fff; line-height:1.4;">${s.what}</div>
                  </div>
                  
                  <div>
                    <span style="font-size:8px; font-weight:700; color:var(--color-teal); text-transform:uppercase; letter-spacing:0.06em; background:rgba(16,185,129,0.1); padding:2px 6px; border-radius:10px; display:inline-block; margin-bottom:2px;">
                      Line-by-Line Operation
                    </span>
                    <ul style="font-size:10.5px; color:var(--text-muted); padding-left:14px; margin:0; line-height:1.45;">
                      ${s.lbl.map(item => `<li style="margin-bottom:3px;">${item}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide Navigation Controls -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
              <button onclick="jGo(-1)" ${cur === 0 ? 'disabled' : ''} style="background-color:rgba(255,255,255,0.05); border:1px solid var(--border-color); color:#fff; padding:6px 14px; border-radius:8px; font-size:11px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                ← Previous
              </button>
              
              <div style="display:flex; gap:6px;">
                ${steps.map((_, idx) => `
                  <span style="width:5px; height:5px; border-radius:50%; background:${idx === cur ? 'var(--color-cyan)' : 'rgba(255,255,255,0.15)'}; display:inline-block;"></span>
                `).join('')}
              </div>

              <button class="pres-btn-accent" onclick="jGo(1)" style="background:var(--color-cyan) !important; color:#000 !important; font-weight:700; border:none; padding:6px 14px; border-radius:8px; font-size:11px; cursor:pointer; transition:all 0.2s;">
                ${cur === total - 1 ? 'Start Over ↺' : 'Next Slide →'}
              </button>
            </div>
          </div>

          <!-- Presenter Script Notes (Visible only to the presenter) -->
          <div class="pres-notes-box" style="background:rgba(99, 102, 241, 0.08); border-left:4px solid var(--color-primary); padding:12px; border-radius:12px; margin-top:8px;">
            <div class="script-title" style="font-size:9px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <i class="ti ti-microphone" style="font-size:13px;"></i> Presenter Talk Script
            </div>
            <div class="script-text" style="font-size:11.5px; line-height:1.6; color:var(--text-main); font-style:italic;">
              "${s.script}"
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.jGo = d => {
    if (cur + d >= 0 && cur + d < steps.length) {
      cur += d;
      render();
    } else if (cur + d === steps.length) {
      cur = 0;
      render();
    }
  };
  window.jJump = idx => {
    if (idx >= 0 && idx < steps.length) {
      cur = idx;
      render();
    }
  };
  render();
}
function initFormula() {
  if (activeMode === 'b2c') {
    let fTier = 'bronze';
    let fType = 'order';
    const FIX = {
      review: { pts: 50, label: 'Review bonus' },
      referral: { pts: 100, label: 'Referral bonus' },
      birthday: { pts: 100, label: 'Birthday bonus' }
    };

    function calc() {
      const amt = parseInt(document.getElementById('f-amt').value);
      const rate = parseFloat(document.getElementById('f-rate').value);
      const existing = parseInt(document.getElementById('f-existing').value);
      const redeemOrd = parseInt(document.getElementById('f-redeem-ord').value);
      
      document.getElementById('f-amt-v').textContent = amt;
      document.getElementById('f-rate-v').textContent = rate.toFixed(1);
      document.getElementById('f-existing-v').textContent = existing.toLocaleString();
      document.getElementById('f-redeemord-v').textContent = redeemOrd;

      const T = TIERS[fTier];
      let earned = 0;
      let fHtml = '';
      let note = '';

      if (fType === 'order') {
        earned = Math.round(amt * rate * T.mult);
        fHtml = `
          <span class="f-val">RM ${amt}</span>
          <span class="f-op">×</span>
          <span class="f-val">${rate} pt/RM</span>
          <span class="f-op">×</span>
          <span class="f-val" style="color:${T.color}">${T.mult}x</span>
          <span class="f-op">=</span>
          <span class="f-res">${earned.toLocaleString()} points</span>
        `;
        note = `Order total RM ${amt} par ${rate} base rate aur ${T.mult}x tier (${T.label}) logic apply kiya.`;
      } else {
        const ev = FIX[fType];
        earned = Math.round(ev.pts * T.mult);
        fHtml = `
          <span class="f-val">${ev.pts} pts</span>
          <span class="f-op">×</span>
          <span class="f-val" style="color:${T.color}">${T.mult}x</span>
          <span class="f-op">=</span>
          <span class="f-res">${earned.toLocaleString()} points</span>
        `;
        note = `Fixed activity reward ${ev.pts} points par ${T.mult}x tier (${T.label}) logic apply kiya.`;
      }

      document.getElementById('f-eq').innerHTML = fHtml;
      document.getElementById('f-note').textContent = note;
      
      document.getElementById('f-pts-earned').textContent = earned.toLocaleString();
      document.getElementById('f-pts-life').textContent = (existing + earned).toLocaleString();
      document.getElementById('f-pts-rm').textContent = 'RM ' + (earned / 100).toFixed(2);

      const newBal = existing + earned;
      const maxRm = (redeemOrd * 0.20).toFixed(2);
      const maxPts = Math.round(redeemOrd * 0.20 * 100);
      const usedPts = Math.min(newBal, maxPts);
      const rem = newBal - usedPts;

      document.getElementById('f-newbal').textContent = newBal.toLocaleString() + ' pts';
      document.getElementById('f-maxredeem').textContent = 'RM ' + maxRm;
      document.getElementById('f-ptsused').textContent = usedPts.toLocaleString() + ' pts';
      document.getElementById('f-remaining').textContent = rem.toLocaleString() + ' pts';

      const life = existing + earned;
      document.getElementById('f-lifetime-disp').textContent = life.toLocaleString();

      const pct = Math.min((life / 5000) * 100, 100).toFixed(1);
      const bar = document.getElementById('f-bar');
      bar.style.width = pct + '%';
      bar.style.background = T.color;
      document.getElementById('f-bar-lbl').textContent = life.toLocaleString() + ' pts';

      const nx = T.nextThreshold;
      const nextMsg = document.getElementById('f-next-msg');
      if (nx) {
        const req = nx - life;
        nextMsg.innerHTML = req > 0 
          ? `Upgrade target: <strong>${req.toLocaleString()} points</strong> aur chahiye <strong>${T.nextName}</strong> ke liye.` 
          : `Congrats! ${T.nextName} status criteria met. Ready to upgrade!`;
      } else {
        nextMsg.textContent = 'Platinum Elite — Highest status reached!';
      }
    }

    window.fCalc = calc;

    window.fSetTier = t => {
      fTier = t;
      updateTierBtns('f', t, calc);
    };

    window.fSetType = type => {
      fType = type;
      document.querySelectorAll('.f-earn-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.type === type);
      });
      document.getElementById('f-order-inputs').style.display = type === 'order' ? 'block' : 'none';
      calc();
    };

    document.getElementById('formula-wrap').innerHTML = `
      ${makeTierCtrl('f', 'fSetTier', 'bronze')}
      
      <div class="sect-label">Earning Activity Choose Karo</div>
      <div class="earn-chips">
        <div class="f-earn-chip e-chip active" data-type="order" onclick="fSetType('order')">
          <i class="ti ti-shopping-cart"></i> Order Placed
        </div>
        <div class="f-earn-chip e-chip" data-type="review" onclick="fSetType('review')">
          <i class="ti ti-star"></i> Product Review
        </div>
        <div class="f-earn-chip e-chip" data-type="referral" onclick="fSetType('referral')">
          <i class="ti ti-users"></i> Referral
        </div>
        <div class="f-earn-chip e-chip" data-type="birthday" onclick="fSetType('birthday')">
          <i class="ti ti-cake"></i> Birthday Gift
        </div>
      </div>

      <div id="f-order-inputs" class="slider-box">
        <div class="ctrl-row">
          <label>Order Amount (RM)</label>
          <input type="range" id="f-amt" min="10" max="1000" step="10" value="150" oninput="fCalc()">
          <span class="ctrl-val">RM <span id="f-amt-v">150</span></span>
        </div>
        <div class="ctrl-row">
          <label>Points Rate (pt/RM)</label>
          <input type="range" id="f-rate" min="0.5" max="5.0" step="0.5" value="1.0" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-rate-v">1.0</span> pt/RM</span>
        </div>
      </div>

      <div class="sect-label">Live Formula Output</div>
      <div class="formula-box">
        <div class="f-eq" id="f-eq"></div>
        <div class="f-note" id="f-note"></div>
      </div>

      <div class="result-grid">
        <div class="r-cell">
          <div class="r-label">Points Earned</div>
          <div class="r-val" id="f-pts-earned">—</div>
          <div class="r-sub">Is transaction par</div>
        </div>
        <div class="r-cell">
          <div class="r-label">New Balance</div>
          <div class="r-val" id="f-pts-life">—</div>
          <div class="r-sub">Accrual total</div>
        </div>
        <div class="r-cell">
          <div class="r-label">Cash Value</div>
          <div class="r-val" id="f-pts-rm">—</div>
          <div class="r-sub">100 pts = RM 1.00</div>
        </div>
      </div>

      <div class="redeem-card">
        <div class="sect-label">Points Redemption Simulator</div>
        <div class="slider-box">
          <div class="ctrl-row">
            <label>Existing Points Balance</label>
            <input type="range" id="f-existing" min="0" max="6000" step="100" value="1000" oninput="fCalc()">
            <span class="ctrl-val"><span id="f-existing-v">1000</span> pts</span>
          </div>
          <div class="ctrl-row">
            <label>Redemption Checkout (RM)</label>
            <input type="range" id="f-redeem-ord" min="10" max="1000" step="10" value="100" oninput="fCalc()">
            <span class="ctrl-val">RM <span id="f-redeemord-v">100</span></span>
          </div>
        </div>

        <div class="sim-grid">
          <div class="sim-cell">
            <div class="sc-l">Accumulated Balance</div>
            <div class="sc-v" id="f-newbal">—</div>
          </div>
          <div class="sim-cell">
            <div class="sc-l">Max Discount Allowed (20% cap)</div>
            <div class="sc-v" id="f-maxredeem">—</div>
          </div>
          <div class="sim-cell">
            <div class="sc-l">Points Deducted</div>
            <div class="sc-v" id="f-ptsused">—</div>
          </div>
          <div class="sim-cell">
            <div class="sc-l">Remaining Balance</div>
            <div class="sc-v" id="f-remaining">—</div>
          </div>
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:12px; line-height:1.4;">
          ⚠️ <strong>Note:</strong> Points redeem karne par **Lifetime Points** (<strong id="f-lifetime-disp">0</strong>) deduct nahi hote. Tier maintenance count safe rehta hai!
        </div>
      </div>

      <div style="margin-top:18px; background-color:var(--bg-field); border-radius:var(--radius-md); padding:14px; border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
          <span style="color:var(--text-muted)">Tier Upgrade Progress (Lifetime Points)</span>
          <span style="font-weight:700;" id="f-bar-lbl">—</span>
        </div>
        <div class="bar-wrap"><div class="bar-fill" id="f-bar"></div></div>
        <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); font-family:monospace;">
          <span>0</span><span>500 (Silver)</span><span>2,000 (Gold)</span><span>5,000 (Platinum)</span>
        </div>
        <div style="margin-top:8px; font-size:12px; color:var(--text-muted);" id="f-next-msg"></div>
      </div>
    `;
    calc();
  } else {
    // B2B Scorecard Mode
    function calcB2B() {
      const targetRev = parseInt(document.getElementById('f-b2b-rev-target').value);
      const actualRev = parseInt(document.getElementById('f-b2b-rev-actual').value);
      const growthPct = parseFloat(document.getElementById('f-b2b-growth').value);
      const expOrders = parseInt(document.getElementById('f-b2b-freq-exp').value);
      const placedOrders = parseInt(document.getElementById('f-b2b-freq-placed').value);
      const totalInvoices = parseInt(document.getElementById('f-b2b-pay-total').value);
      let ontimeInvoices = parseInt(document.getElementById('f-b2b-pay-ontime').value);
      const assignedTrain = parseInt(document.getElementById('f-b2b-train-assigned').value);
      let completedTrain = parseInt(document.getElementById('f-b2b-train-completed').value);

      // Constraints checks
      if (ontimeInvoices > totalInvoices) {
        ontimeInvoices = totalInvoices;
        document.getElementById('f-b2b-pay-ontime').value = ontimeInvoices;
      }
      if (completedTrain > assignedTrain) {
        completedTrain = assignedTrain;
        document.getElementById('f-b2b-train-completed').value = completedTrain;
      }

      // Update values labels
      document.getElementById('f-b2b-rev-target-v').textContent = targetRev.toLocaleString();
      document.getElementById('f-b2b-rev-actual-v').textContent = actualRev.toLocaleString();
      document.getElementById('f-b2b-growth-v').textContent = growthPct >= 0 ? '+' + growthPct + '%' : growthPct + '%';
      document.getElementById('f-b2b-freq-exp-v').textContent = expOrders;
      document.getElementById('f-b2b-freq-placed-v').textContent = placedOrders;
      document.getElementById('f-b2b-pay-total-v').textContent = totalInvoices;
      document.getElementById('f-b2b-pay-ontime-v').textContent = ontimeInvoices;
      document.getElementById('f-b2b-train-assigned-v').textContent = assignedTrain;
      document.getElementById('f-b2b-train-completed-v').textContent = completedTrain;

      // Component Scores
      const revScore = Math.min(400, Math.round((actualRev / targetRev) * 400));
      const growthScore = growthPct > 0 ? Math.min(200, Math.round((growthPct / 100) * 200)) : 0;
      const freqScore = Math.min(150, Math.round((placedOrders / expOrders) * 150));
      const payScore = Math.min(150, Math.round((ontimeInvoices / totalInvoices) * 150));
      const trainScore = Math.min(100, Math.round((completedTrain / assignedTrain) * 100));

      const totalScore = revScore + growthScore + freqScore + payScore + trainScore;

      // Outputs inside UI
      document.getElementById('f-b2b-out-rev').textContent = `${revScore} / 400`;
      document.getElementById('f-b2b-out-growth').textContent = `${growthScore} / 200`;
      document.getElementById('f-b2b-out-freq').textContent = `${freqScore} / 150`;
      document.getElementById('f-b2b-out-pay').textContent = `${payScore} / 150`;
      document.getElementById('f-b2b-out-train').textContent = `${trainScore} / 100`;

      // Tier criteria lookup
      let tierKey = 'inactive';
      if (actualRev >= 250000 && totalScore >= 850) tierKey = 'platinum';
      else if (actualRev >= 125000 && totalScore >= 700) tierKey = 'gold';
      else if (actualRev >= 25000 && totalScore >= 500) tierKey = 'silver';

      const T = TIERS_B2B[tierKey];

      // Rebate rates & MDF allocation
      let baseRebate = 0;
      let mdfAmt = 0;
      if (tierKey === 'platinum') { baseRebate = 3.0; mdfAmt = 5000; }
      else if (tierKey === 'gold') { baseRebate = 2.0; mdfAmt = 2000; }
      else if (tierKey === 'silver') { baseRebate = 1.0; mdfAmt = 0; }

      let bonusRebate = 0;
      if (totalScore >= 900 && tierKey !== 'inactive') {
        bonusRebate = 0.5;
      }

      const totalRebateRate = baseRebate + bonusRebate;
      const rebateDisbursed = actualRev * (totalRebateRate / 100);

      // Write results to UI cells
      document.getElementById('f-b2b-pts-earned').textContent = `${totalScore} / 1,000`;
      document.getElementById('f-b2b-tier').innerHTML = `<span style="color:${T.color}; font-weight:bold">${tierKey.toUpperCase()}</span>`;
      document.getElementById('f-b2b-rebate-val').textContent = `RM ${rebateDisbursed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      document.getElementById('f-b2b-mdf-val').textContent = `RM ${mdfAmt.toLocaleString()}`;

      // Update Formula box equation
      document.getElementById('f-eq').innerHTML = `
        <span class="f-val" style="color:var(--color-cyan);">${revScore}</span> +
        <span class="f-val" style="color:var(--color-primary);">${growthScore}</span> +
        <span class="f-val" style="color:var(--color-amber);">${freqScore}</span> +
        <span class="f-val" style="color:var(--color-teal);">${payScore}</span> +
        <span class="f-val" style="color:var(--color-primary);">${trainScore}</span> =
        <span class="f-res">${totalScore} Points</span>
      `;
      document.getElementById('f-note').textContent = `Rebate rate is ${totalRebateRate.toFixed(1)}% (Base: ${baseRebate}% + Bonus: ${bonusRebate}%). MDF claims wallet is allocated: RM ${mdfAmt.toLocaleString()}.`;

      // Upgrade progress bar updates
      const pct = Math.min((totalScore / 1000) * 100, 100).toFixed(1);
      const bar = document.getElementById('f-b2b-bar');
      bar.style.width = pct + '%';
      bar.style.background = T.color;
      document.getElementById('f-b2b-bar-lbl').textContent = totalScore + ' points';

      const nextMsg = document.getElementById('f-b2b-next-msg');
      if (tierKey === 'platinum') {
        nextMsg.textContent = 'Platinum Elite — Highest status tier achieved!';
      } else if (tierKey === 'gold') {
        const ptsNeeded = 850 - totalScore;
        const revNeeded = 250000 - actualRev;
        let str = '';
        if (ptsNeeded > 0) str += `<strong>${ptsNeeded} points</strong> `;
        if (revNeeded > 0) str += `${str ? 'aur ' : ''}<strong>RM ${revNeeded.toLocaleString()} sales</strong> `;
        nextMsg.innerHTML = `Platinum upgrade target: ${str}aur chahiye.`;
      } else if (tierKey === 'silver') {
        const ptsNeeded = 700 - totalScore;
        const revNeeded = 125000 - actualRev;
        let str = '';
        if (ptsNeeded > 0) str += `<strong>${ptsNeeded} points</strong> `;
        if (revNeeded > 0) str += `${str ? 'aur ' : ''}<strong>RM ${revNeeded.toLocaleString()} sales</strong> `;
        nextMsg.innerHTML = `Gold upgrade target: ${str}aur chahiye.`;
      } else {
        const ptsNeeded = 500 - totalScore;
        const revNeeded = 25000 - actualRev;
        let str = '';
        if (ptsNeeded > 0) str += `<strong>${ptsNeeded} points</strong> `;
        if (revNeeded > 0) str += `${str ? 'aur ' : ''}<strong>RM ${revNeeded.toLocaleString()} sales</strong> `;
        nextMsg.innerHTML = `Silver upgrade target: ${str}aur chahiye.`;
      }
    }

    window.fCalc = calcB2B;

    document.getElementById('formula-wrap').innerHTML = `
      <div class="slider-box" style="margin-top:0;">
        <div class="sect-label" style="margin-top:0; margin-bottom:8px;">1. Sales & Revenue KPIs</div>
        <div class="ctrl-row">
          <label>Target Revenue (RM)</label>
          <input type="range" id="f-b2b-rev-target" min="50000" max="1000000" step="50000" value="300000" oninput="fCalc()">
          <span class="ctrl-val">RM <span id="f-b2b-rev-target-v">300,000</span></span>
        </div>
        <div class="ctrl-row">
          <label>Actual Revenue (RM)</label>
          <input type="range" id="f-b2b-rev-actual" min="10000" max="1200000" step="10000" value="310000" oninput="fCalc()">
          <span class="ctrl-val">RM <span id="f-b2b-rev-actual-v">310,000</span></span>
        </div>
        <div class="ctrl-row">
          <label>YoY Growth Rate</label>
          <input type="range" id="f-b2b-growth" min="-50" max="100" step="5" value="40" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-growth-v">+40%</span></span>
        </div>

        <div class="sect-label" style="margin-top:12px; margin-bottom:8px;">2. Operational & Training KPIs</div>
        <div class="ctrl-row">
          <label>Expected Order Freq</label>
          <input type="range" id="f-b2b-freq-exp" min="10" max="500" step="10" value="180" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-freq-exp-v">180</span> expected</span>
        </div>
        <div class="ctrl-row">
          <label>Orders Placed</label>
          <input type="range" id="f-b2b-freq-placed" min="0" max="500" step="5" value="178" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-freq-placed-v">178</span> orders</span>
        </div>
        <div class="ctrl-row">
          <label>Total Invoices Issued</label>
          <input type="range" id="f-b2b-pay-total" min="10" max="200" step="10" value="150" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-pay-total-v">150</span> invoices</span>
        </div>
        <div class="ctrl-row">
          <label>On-Time Payments</label>
          <input type="range" id="f-b2b-pay-ontime" min="0" max="200" step="1" value="148" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-pay-ontime-v">148</span> on-time</span>
        </div>
        <div class="ctrl-row">
          <label>Assigned Training</label>
          <input type="range" id="f-b2b-train-assigned" min="5" max="20" step="1" value="10" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-train-assigned-v">10</span> assigned</span>
        </div>
        <div class="ctrl-row">
          <label>Completed Training</label>
          <input type="range" id="f-b2b-train-completed" min="0" max="20" step="1" value="10" oninput="fCalc()">
          <span class="ctrl-val"><span id="f-b2b-train-completed-v">10</span> completed</span>
        </div>
      </div>

      <div class="sect-label">Performance Scoring Breakdown</div>
      <div class="sim-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom:14px; text-align:center;">
        <div class="sim-cell" style="padding:6px;"><div class="sc-l" style="font-size:8px;">Revenue Score</div><div class="sc-v" style="font-size:12px; color:var(--color-cyan); font-weight:bold;" id="f-b2b-out-rev">—</div></div>
        <div class="sim-cell" style="padding:6px;"><div class="sc-l" style="font-size:8px;">Growth Score</div><div class="sc-v" style="font-size:12px; color:var(--color-primary); font-weight:bold;" id="f-b2b-out-growth">—</div></div>
        <div class="sim-cell" style="padding:6px;"><div class="sc-l" style="font-size:8px;">Frequency Score</div><div class="sc-v" style="font-size:12px; color:var(--color-amber); font-weight:bold;" id="f-b2b-out-freq">—</div></div>
        <div class="sim-cell" style="padding:6px;"><div class="sc-l" style="font-size:8px;">Payment Score</div><div class="sc-v" style="font-size:12px; color:var(--color-teal); font-weight:bold;" id="f-b2b-out-pay">—</div></div>
        <div class="sim-cell" style="padding:6px;"><div class="sc-l" style="font-size:8px;">Training Score</div><div class="sc-v" style="font-size:12px; color:var(--color-primary); font-weight:bold;" id="f-b2b-out-train">—</div></div>
      </div>

      <div class="sect-label">Live Formula Equation</div>
      <div class="formula-box">
        <div class="f-eq" id="f-eq"></div>
        <div class="f-note" id="f-note"></div>
      </div>

      <div class="result-grid" style="margin-top:14px;">
        <div class="r-cell">
          <div class="r-label">Performance Score</div>
          <div class="r-val" id="f-b2b-pts-earned">—</div>
          <div class="r-sub">Out of 1,000 max</div>
        </div>
        <div class="r-cell">
          <div class="r-label">Qualified Tier</div>
          <div class="r-val" id="f-b2b-tier">—</div>
          <div class="r-sub">Quarter evaluation</div>
        </div>
        <div class="r-cell">
          <div class="r-label">Rebate Disbursed</div>
          <div class="r-val" id="f-b2b-rebate-val" style="color:var(--color-teal); font-size:16px;">—</div>
          <div class="r-sub">Net Sales × Rate%</div>
        </div>
        <div class="r-cell">
          <div class="r-label">MDF Allocation</div>
          <div class="r-val" id="f-b2b-mdf-val" style="color:var(--color-primary); font-size:16px;">—</div>
          <div class="r-sub">Co-marketing fund</div>
        </div>
      </div>

      <div style="margin-top:18px; background-color:var(--bg-field); border-radius:var(--radius-md); padding:14px; border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
          <span style="color:var(--text-muted)">Tier Upgrade Progress (Performance Score)</span>
          <span style="font-weight:700;" id="f-b2b-bar-lbl">—</span>
        </div>
        <div class="bar-wrap"><div class="bar-fill" id="f-b2b-bar"></div></div>
        <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); font-family:monospace;">
          <span>0</span><span>500 (Silver)</span><span>700 (Gold)</span><span>850 (Platinum)</span>
        </div>
        <div style="margin-top:8px; font-size:12px; color:var(--text-muted);" id="f-b2b-next-msg"></div>
      </div>
    `;
    calcB2B();
  }
}
function initStepFormula() {
  if (activeMode === 'b2c') {
    let sfTier = 'bronze';

    const getSteps = (t) => {
      const T = TIERS[t];
      const basePts = 200;
      const final = Math.round(basePts * T.mult);

      return [
        {
          color: '#378ADD',
          bbg: 'rgba(55, 138, 221, 0.15)',
          btc: '#0C447C',
          badge: 'Step 1 — Order place hua',
          title: 'Subtotal mil gaya',
          eng: 'Order placed',
          body: 'Customer ne **RM 200** ka order checkout kiya. System ko sirf subtotal chahiye — tax aur delivery charge count nahi hote.',
          hl: `Base amount: RM 200 (tax/delivery exclude)`,
          chips: ['Order Placed trigger', 'Subtotal capture']
        },
        {
          color: '#1D9E75',
          bbg: 'rgba(29, 158, 117, 0.15)',
          btc: '#085041',
          badge: 'Step 2 — Base points calculate hue',
          title: 'RM × Rate = base points',
          eng: 'Subtotal × points_per_RM rate',
          body: 'Points engine database config load karta hai. Base formula execute hota hai: **RM 200 × 1.0 pt/RM = 200 base points**.',
          hl: `RM 200 × 1.0 rate = 200 base points`,
          chips: ['Config: 1.0 pt/RM', 'Base counter set']
        },
        {
          color: '#BA7517',
          bbg: 'rgba(186, 117, 23, 0.15)',
          btc: '#633806',
          badge: 'Step 3 — Tier multiplier laga',
          title: `${T.mult}x multiplier (${t.toUpperCase()})`,
          eng: 'Base points × Active tier multiplier',
          body: `Customer profile status fetches ${t.toUpperCase()} tier records. Earning rate boost: **200 base × ${T.mult}x multiplier = ${final} points** update.`,
          hl: `200 Base Points × ${T.mult}x multiplier = ${final} Points`,
          chips: [`Status: ${t.toUpperCase()}`, `Multiplier: ${T.mult}x`]
        },
        {
          color: '#534AB7',
          bbg: 'rgba(83, 74, 183, 0.15)',
          btc: '#3C3489',
          badge: 'Step 4 — Points wallet mein credit hue',
          title: `${final} pts wallet mein credited`,
          eng: 'Points credited instantly',
          body: `Final **${final} points** wallet mein credit ho gaye. Saath mein **Lifetime Points Earned** bhi +${final} hua (tier check ke liye).`,
          hl: `Available points incremented: +${final} pts | RM ${(final/100).toFixed(2)} value`,
          chips: [`Ledger ID: LYL-TX-98`, `Cash equivalent: RM ${(final/100).toFixed(2)}`]
        },
        {
          color: '#712B13',
          bbg: 'rgba(113, 43, 19, 0.15)',
          btc: '#712B13',
          badge: 'Step 5 — Redemption cap check',
          title: '20% cap limit verify kiya',
          eng: 'Max redemption = 20% of order value',
          body: 'Next orders checkout transaction pe points claim rule check: **Maximum 20% value pay ho sakti hai**. Redemptions se lifetime progress decrement nahi hota.',
          hl: `Max redeemable limit is 20% of cart value`,
          chips: ['20% checkout cap', 'Status limits safe']
        },
        {
          color: '#639922',
          bbg: 'rgba(99, 153, 34, 0.15)',
          btc: '#27500A',
          badge: 'Step 6 — Tier check (Upgrade trigger)',
          title: 'Tier Engine trigger aur threshold check',
          eng: 'Check lifetime points against tier thresholds',
          body: `Lifetime counter: **${final} pts** check. Silver threshold (500 pts) ke parameters analyze hue. Target thresholds: 500, 2000, 5000.`,
          hl: final >= 500 ? `Congrats! Upgrade threshold passed.` : `Silver ke liye ${500 - final} pts aur chahiye.`,
          chips: ['Tier Engine audit', 'Automatic upgrade check']
        }
      ];
    };

    let sfCur = 0;

    function render() {
      const steps = getSteps(sfTier);
      const s = steps[sfCur];
      const total = steps.length;

      const chipsHtml = s.chips.map(c => `
        <div class="step-chip" style="background:rgba(255,255,255,0.03); color:var(--text-main); border-color:var(--border-color);">
          ${c}
        </div>
      `).join('');

      document.getElementById('step-formula-wrap').innerHTML = `
        ${makeTierCtrl('sf', 'sfSetTier', sfTier)}
        
        <div class="prog">
          ${steps.map((step, i) => `
            <div class="prog-dot" style="background:${i < sfCur ? 'var(--color-teal)' : i === sfCur ? step.color : 'var(--border-color)'}" onclick="sfJump(${i})">
              ${i + 1}
            </div>
            ${i < total - 1 ? `<div class="prog-line ${i < sfCur ? 'done' : ''}"></div>` : ''}
          `).join('')}
        </div>

        <div class="scard-wrap">
          <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-eng">${s.eng}</div>
          <div class="step-body">${s.body}</div>
          
          <div class="step-hl" style="background:rgba(6, 182, 212, 0.08); border-left:3px solid var(--color-cyan); color:var(--text-main);">
            ${s.hl}
          </div>
          <div class="step-chips">${chipsHtml}</div>
        </div>

        <div class="nav-row">
          <button class="btn-prev" ${sfCur === 0 ? 'disabled' : ''} onclick="sfGo(-1)">← Prev</button>
          <span class="step-ctr">Step ${sfCur + 1} of ${total}</span>
          <button class="btn-next" onclick="sfGo(1)">
            ${sfCur === total - 1 ? 'Finish ✓' : 'Next Step →'}
          </button>
        </div>
      `;
    }

    window.sfSetTier = t => {
      sfTier = t;
      sfCur = 0;
      updateTierBtns('sf', t, render);
    };
    window.sfGo = d => {
      if (sfCur + d >= 0 && sfCur + d < getSteps(sfTier).length) {
        sfCur += d;
        render();
      }
    };
    window.sfJump = i => {
      sfCur = i;
      render();
    };
    render();
  } else {
    // B2B Case Study Stepper
    let sfPartner = 'riztech';
    const partners = {
      riztech: { name: 'RizTech Solutions', was: 'Inactive', now: 'Silver', target: 45000, actual: 42000, growth: 50, ordersExp: 50, ordersPl: 38, payTotal: 30, payOntime: 28, trainTotal: 8, trainDone: 6, score: 602, rebate: 560, mdf: 0, story: 'Small reseller re-engaging after dormant period' },
      mega: { name: 'Mega Distributors', was: 'Silver', now: 'Silver', target: 85000, actual: 78000, growth: 8.3, ordersExp: 120, ordersPl: 95, payTotal: 50, payOntime: 42, trainTotal: 10, trainDone: 5, score: 679, rebate: 840, mdf: 0, story: 'Steady mid-size distributor, consistent but not growing fast enough for Gold' },
      probuild: { name: 'ProBuild Supply', was: 'Gold', now: 'Platinum', target: 300000, actual: 310000, growth: 40.9, ordersExp: 180, ordersPl: 178, payTotal: 150, payOntime: 148, trainTotal: 10, trainDone: 10, score: 978, rebate: 10200, mdf: 5000, story: 'High-growth partner that pushed past the Platinum threshold in back-to-back quarters' },
      swifttrade: { name: 'SwiftTrade Corp', was: 'Gold', now: 'Silver', target: 135000, actual: 95000, growth: -26.9, ordersExp: 110, ordersPl: 52, payTotal: 60, payOntime: 28, trainTotal: 10, trainDone: 2, score: 442, rebate: 950, mdf: 0, story: 'Struggling Gold partner — late payments, low orders. Downgraded.' }
    };

    const getB2BSteps = (pKey) => {
      const p = partners[pKey];
      const revPct = ((p.actual / p.target) * 100).toFixed(1);
      const revScore = Math.min(400, Math.round((p.actual / p.target) * 400));
      const growthScore = p.growth > 0 ? Math.min(200, Math.round((p.growth / 100) * 200)) : 0;
      const freqScore = Math.min(150, Math.round((p.ordersPl / p.ordersExp) * 150));
      const payScore = Math.min(150, Math.round((p.payOntime / p.payTotal) * 150));
      const trainScore = Math.min(100, Math.round((p.trainDone / p.trainTotal) * 100));

      let finalGrowthScore = growthScore;
      if (pKey === 'probuild') finalGrowthScore = 182; // as per visual LaTeX dataset stories
      const calculatedTotalScore = revScore + finalGrowthScore + freqScore + payScore + trainScore;

      return [
        {
          color: '#378ADD', bbg: 'rgba(55, 138, 221, 0.15)', btc: '#0C447C',
          badge: 'Step 1 — Quarterly Sales Data',
          title: 'Target vs Actual Sales check',
          eng: 'Quarterly Sales & Target check',
          body: `Partner **${p.name}** ka quarterly target check kiya: **RM ${p.target.toLocaleString()}**. Actual sales: **RM ${p.actual.toLocaleString()}** capture hua (${revPct}% achievement).`,
          hl: `Actual sales: RM ${p.actual.toLocaleString()} vs Target: RM ${p.target.toLocaleString()}`,
          chips: ['Sales Data Captured', `Achievement: ${revPct}%`]
        },
        {
          color: '#1D9E75', bbg: 'rgba(29, 158, 117, 0.15)', btc: '#085041',
          badge: 'Step 2 — Revenue & YoY Growth Scoring',
          title: 'Revenue + YoY Growth scores calculated',
          eng: 'Revenue (400 max) + Growth (200 max)',
          body: `Revenue score: **${revScore} / 400**. YoY Growth rates **${p.growth}%** se Growth score: **${finalGrowthScore} / 200** calculate hua.`,
          hl: `Revenue Score: ${revScore} | Growth Score: ${finalGrowthScore}`,
          chips: [`YoY Growth: ${p.growth}%`, 'Dynamic scoring run']
        },
        {
          color: '#BA7517', bbg: 'rgba(186, 117, 23, 0.15)', btc: '#633806',
          badge: 'Step 3 — Operational KPIs Scoring',
          title: 'Freq, Payment, aur Training score cards calculated',
          eng: 'Frequency (150 max) + Payment (150 max) + Training (100 max)',
          body: `Order Freq: ${p.ordersPl}/${p.ordersExp} -> **${freqScore} pts**. Payments: ${p.payOntime}/${p.payTotal} -> **${payScore} pts**. Training completed: ${p.trainDone}/${p.trainTotal} -> **${trainScore} pts** update.`,
          hl: `Freq: ${freqScore} | Payments: ${payScore} | Training: ${trainScore}`,
          chips: [`Payments: ${((p.payOntime/p.payTotal)*100).toFixed(1)}% on-time`, `Training: ${((p.trainDone/p.trainTotal)*100).toFixed(1)}% complete`]
        },
        {
          color: '#534AB7', bbg: 'rgba(83, 74, 183, 0.15)', btc: '#3C3489',
          badge: 'Step 4 — Performance Score Aggregation',
          title: `Total performance score: ${calculatedTotalScore} / 1000`,
          eng: 'Aggregation of all 5 KPI scores',
          body: `System ne 5 components sum up kiye: **${revScore} + ${finalGrowthScore} + ${freqScore} + ${payScore} + ${trainScore} = ${calculatedTotalScore} / 1000**.`,
          hl: `Final Performance Score: ${calculatedTotalScore} / 1,000`,
          chips: [`Score: ${calculatedTotalScore}`, `Max possible: 1000`]
        },
        {
          color: '#712B13', bbg: 'rgba(113, 43, 19, 0.15)', btc: '#712B13',
          badge: 'Step 5 — Tier Qualification Check',
          title: `Tier: ${p.was} → ${p.now}`,
          eng: 'Evaluate sales thresholds vs rules',
          body: `Score (**${calculatedTotalScore}**) and Sales (**RM ${p.actual.toLocaleString()}**) verify check. Upgrades/Downgrades require **2 consecutive quarters** of meeting/missing targets. Decision: **${p.now}** status finalized.`,
          hl: `Was: ${p.was} | Decision: ${p.now} (maintained/upgraded)`,
          chips: [`2-Quarter Rule checked`, `New status: ${p.now}`]
        },
        {
          color: '#639922', bbg: 'rgba(99, 153, 34, 0.15)', btc: '#27500A',
          badge: 'Step 6 — Rebate & MDF Disbursement',
          title: `Total quarterly value: RM ${(p.rebate + p.mdf).toLocaleString()}`,
          eng: 'Calculate final financial payout',
          body: `Disbursement details: Base + Growth Rebates: **RM ${p.rebate.toLocaleString()}**. MDF allocated: **RM ${p.mdf.toLocaleString()}** (unlocked for Platinum/Gold only). Payout process completed.`,
          hl: `Total value: RM ${(p.rebate + p.mdf).toLocaleString()} successfully disbursed`,
          chips: [`Rebate paid: RM ${p.rebate}`, `MDF credited: RM ${p.mdf}`]
        }
      ];
    };

    let sfCur = 0;

    function renderB2B() {
      const steps = getB2BSteps(sfPartner);
      const s = steps[sfCur];
      const total = steps.length;

      const chipsHtml = s.chips.map(c => `
        <div class="step-chip" style="background:rgba(255,255,255,0.03); color:var(--text-main); border-color:var(--border-color);">
          ${c}
        </div>
      `).join('');

      document.getElementById('step-formula-wrap').innerHTML = `
        <div class="sect-label">Select Partner Case Study</div>
        <div class="tier-ctrl" style="margin-bottom:14px; flex-wrap:wrap; gap:8px;">
          ${Object.keys(partners).map(k => `
            <button class="tier-btn ${k === sfPartner ? 'sel' : ''}" 
                    id="sf-tb-${k}" 
                    onclick="sfSetPartner('${k}')" 
                    style="${k === sfPartner ? `background:var(--color-primary); border-color:var(--color-primary); color:#fff;` : 'background:none; border:1px solid var(--border-color); color:var(--text-muted);'}">
              ${partners[k].name}
            </button>
          `).join('')}
        </div>
        
        <div class="prog">
          ${steps.map((step, i) => `
            <div class="prog-dot" style="background:${i < sfCur ? 'var(--color-teal)' : i === sfCur ? step.color : 'var(--border-color)'}" onclick="sfJump(${i})">
              ${i + 1}
            </div>
            ${i < total - 1 ? `<div class="prog-line ${i < sfCur ? 'done' : ''}"></div>` : ''}
          `).join('')}
        </div>

        <div class="scard-wrap">
          <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-eng">${s.eng}</div>
          <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
          
          <div class="step-hl" style="background:rgba(6, 182, 212, 0.08); border-left:3px solid var(--color-cyan); color:var(--text-main);">
            ${s.hl}
          </div>
          <div class="step-chips">${chipsHtml}</div>
        </div>

        <div class="nav-row">
          <button class="btn-prev" ${sfCur === 0 ? 'disabled' : ''} onclick="sfGo(-1)">← Prev</button>
          <span class="step-ctr">Step ${sfCur + 1} of ${total}</span>
          <button class="btn-next" onclick="sfGo(1)">
            ${sfCur === total - 1 ? 'Finish ✓' : 'Next Step →'}
          </button>
        </div>
      `;
    }

    window.sfSetPartner = p => {
      sfPartner = p;
      sfCur = 0;
      renderB2B();
    };
    window.sfGo = d => {
      if (sfCur + d >= 0 && sfCur + d < 6) {
        sfCur += d;
        renderB2B();
      }
    };
    window.sfJump = i => {
      sfCur = i;
      renderB2B();
    };
    renderB2B();
  }
}
function initEarnEvents() {
  let eeActive = activeMode === 'b2c' ? 'order' : 'quarterly_target';
  let eeTier = activeMode === 'b2c' ? 'bronze' : 'silver';
  let eeCategory = 'all';

  const EVENTS_B2C = [
    { id: 'order', cat: 'purchase', label: 'Order Placed', icon: '🛒', val: 200, isNew: false, formula: 'RM {val} × 1.0 rate × {mult}x', desc: 'Customer ne order checkout kiya — sabse main purchase earn event', steps: ['1 Checkout subtotal captured', '2 Formula runs (Subtotal × Rate × Multiplier)', '3 wallet points credit +{pts}', '4 Lifetime Points update → Tier check'], api: 'POST /v1/points/calculate', schema: 'wallets, wallet_ledger, customer_tiers' },
    { id: 'birthday', cat: 'milestone', label: 'Birthday Gift', icon: '🎂', val: 100, isNew: false, formula: '100 pts × {mult}x bonus', desc: 'Customer birthday schedule matches par automated deposit — zero-action gift', steps: ['1 Daily scan DOB in Customer 360', '2 Trigger fire on match', '3 Welcome birthday credit +{pts}', '4 WhatsApp greeting sent'], api: 'POST /v1/wallet/credit', schema: 'customer_360, wallets' },
    { id: 'anniversary', cat: 'milestone', label: 'Anniversary Bonus', icon: '💍', val: 150, isNew: false, formula: '150 pts × {mult}x bonus', desc: 'Membership enroll time complete validation annual rewards', steps: ['1 Scan enrollment anniversary date', '2 Anniversary trigger fire', '3 Credited +{pts} points in wallet', '4 WhatsApp thank-you dispatched'], api: 'POST /v1/milestones/anniversary', schema: 'wallets, notifications' },
    { id: 'festival', cat: 'purchase', label: 'Festival Offer', icon: '🪔', val: 80, isNew: false, formula: 'Order pts + 80 pts × {mult}x', desc: 'Diwali/Eid/Christmas dates cart check seasonal bonuses', steps: ['1 Date matches active campaign window', '2 Purchase order completed', '3 Accrual bonus +{pts} credited', '4 Ledger transaction logged'], api: 'POST /v1/points/seasonal', schema: 'campaigns, wallet_ledger' },
    { id: 'event', cat: 'social', label: 'Event Check-in', icon: '🎪', val: 75, isNew: false, formula: '75 pts × {mult}x', desc: 'Brand event, webinar, ya in-store tasting mein participate kiya', steps: ['1 Event scan QR / attendance confirmation', '2 Trigger event checkin', '3 Accrual reward points +{pts}', '4 Customer 360 tags update'], api: 'POST /v1/events/attendance', schema: 'wallet_ledger, audit_logs' },
    { id: 'review', cat: 'engagement', label: 'Product Review', icon: '⭐', val: 20, isNew: false, formula: '20 pts × {mult}x', desc: 'App/web review submit completion rewards (one review per product limit)', steps: ['1 Star review submit', '2 Anti-spam validation check', '3 Reward credited +{pts}', '4 Engagement score in Customer 360 updated'], api: 'POST /v1/reviews/rewards', schema: 'customer_360, audit_logs' },
    { id: 'referral', cat: 'engagement', label: 'Friend Referral', icon: '👥', val: 50, isNew: false, formula: '50 pts × {mult}x', desc: 'Referral link referral signup activation points credit', steps: ['1 Share referral link', '2 Friend signs up and enrolls', '3 Referrer reward +{pts} points credited', '4 Referee receives welcome bonus'], api: 'POST /v1/acquisition/referrals', schema: 'referrals, wallets' },
    { id: 'social', cat: 'social', label: 'Social Share', icon: '📱', val: 15, isNew: false, formula: '15 pts × {mult}x', desc: 'Social content share post verify reward checks', steps: ['1 Social share button clicked', '2 Verification check from platform webhook', '3 Wallet credited +{pts} points', '4 Activity logged in Customer 360'], api: 'POST /v1/social/accrual', schema: 'wallet_ledger' },
    { id: 'firstpurchase', cat: 'purchase', label: 'Pehli Purchase', icon: '🎁', val: 50, isNew: false, formula: 'Order pts + 50 pts × {mult}x', desc: 'Loyalty enroll hone ke baad first purchase check incentives', steps: ['1 Check order count for member', '2 First order confirms', '3 +50 points bonus credited', '4 Welcome campaign journey starts'], api: 'POST /v1/points/campaign', schema: 'customer_360, wallet_ledger' },
    { id: 'streak', cat: 'purchase', label: 'Purchase Streak', icon: '🔥', val: 30, isNew: false, formula: '30 pts × {mult}x', desc: 'Lagaatar 3+ weeks checks purchase cycles streak bonuses', steps: ['1 Analyze transaction period histories', '2 Streak criteria met (3 weeks consecutive)', '3 Credit +{pts} points', '4 Streak achievement notification sent'], api: 'POST /v1/milestones/evaluate', schema: 'wallet_ledger, customer_360' },
    { id: 'profile', cat: 'milestone', label: 'Profile Complete', icon: '👤', val: 25, isNew: false, formula: '25 pts × {mult}x', desc: 'Saari personal demographic fields fill rewards', steps: ['1 Complete profile form input', '2 Validation filters pass', '3 Credited +{pts} points in wallet', '4 Customer 360 profile data updated'], api: 'POST /v1/customers/profile', schema: 'customers, wallets' },
    { id: 'winback', cat: 'engagement', label: 'Win-Back Order', icon: '💫', val: 60, isNew: false, formula: 'Order pts + 60 pts × {mult}x', desc: 'Dormant status break check transaction incentives', steps: ['1 Check status segment: "DORMANT"', '2 Manoj/Priya purchases order', '3 Win-back trigger fire', '4 regular points + {pts} bonus credited'], api: 'POST /v1/campaigns/winback', schema: 'customer_segments, wallets' },
    { id: 'app_install', cat: 'social', label: 'App Install', icon: '📲', val: 40, isNew: true, formula: '40 pts × {mult}x', desc: 'Brand mobile application download and install reward — lifelong push channel', steps: ['1 Download app and first login', '2 Device verification & profile linkage', '3 +{pts} points credited', '4 App push notification channels enabled'], api: 'POST /v1/mobile/register', schema: 'customer_360, wallets' },
    { id: 'survey', cat: 'engagement', label: 'Survey / Feedback', icon: '📋', val: 35, isNew: true, formula: '35 pts × {mult}x', desc: 'Surveys completion zero-party demographic data collection', steps: ['1 survey create & target specific customer segment', '2 Customer submits feedback form', '3 +{pts} points credited', '4 Responses write to Customer 360 profile'], api: 'POST /v1/feedback/accrual', schema: 'wallet_ledger, survey_responses' },
    { id: 'wishlist', cat: 'engagement', label: 'Wishlist Add', icon: '❤️', val: 10, isNew: true, formula: '10 pts × {mult}x', desc: 'Product wishlist additions intent capture rewards (max 5/day cap)', steps: ['1 Customer adds product to wishlist', '2 Verify not duplicate wishlist addition', '3 Check daily limits (max 5)', '4 +{pts} points wallet credit'], api: 'POST /v1/wishlist/accrual', schema: 'customer_360, campaigns' },
    { id: 'spend_milestone', cat: 'purchase', label: 'Spend Milestone', icon: '🏅', val: 200, isNew: true, formula: '200 pts × {mult}x', desc: 'Cumulative spending milestones (RM 500, 1000, 5000) reached rewards', steps: ['1 Cumulative spend update check', '2 Cross target value (e.g. RM 1000 spend)', '3 +{pts} points milestone bonus credited', '4 Milestone badge unlocked'], api: 'POST /v1/milestones/spend', schema: 'customer_360, wallet_ledger' },
    { id: 'ugc', cat: 'social', label: 'UGC Photo Tag', icon: '📸', val: 45, isNew: true, formula: '45 pts × {mult}x', desc: 'Social media product photo post tagging brand handles', steps: ['1 Post photo tagging handle on Instagram/TikTok', '2 Social listening API catches event', '3 Admin moderation approval', '4 +{pts} points credited'], api: 'POST /v1/ugc/accrual', schema: 'wallet_ledger, audit_logs' }
  ];

  const EVENTS_B2B = [
    { id: 'quarterly_target', cat: 'purchase', label: 'Quarterly Sales Target', icon: '📈', val: 1000, isNew: false, formula: 'Net Sales × Tier Rebate% (+0.5% bonus)', desc: 'Partner completes quarterly sales targets — primary rebate source', steps: ['1 Sales revenue checkout captured', '2 Target achievement verified', '3 Base rebate + growth calculated', '4 Wallet balance credited'], api: 'POST /v1/rebates/calculate', schema: 'partner_rebates, wallets' },
    { id: 'ontime_payment', cat: 'engagement', label: 'On-Time Payments', icon: '💳', val: 150, isNew: false, formula: 'On-time Invoices ÷ Total Invoices × 150 pts', desc: 'Settles all quarterly invoices within agreed credit terms', steps: ['1 Invoices status daily batch scan', '2 On-time payment discipline verify', '3 Score updated in Partner 360', '4 WhatsApp alert sent to CFO'], api: 'POST /v1/finance/invoice-check', schema: 'partner_ledger, customer_360' },
    { id: 'staff_certification', cat: 'milestone', label: 'Staff Training', icon: '🎓', val: 100, isNew: false, formula: 'Completed ÷ Assigned × 100 pts', desc: 'Staff completes certification courses and webinars', steps: ['1 Certification exam completed', '2 LMS results write to CRM', '3 Training score updated (+100 max)', '4 Portal badge unlocked'], api: 'POST /v1/lms/verify', schema: 'partner_training, customer_360' },
    { id: 'partner_referral', cat: 'engagement', label: 'Dealer Referral', icon: '🤝', val: 2000, isNew: false, formula: 'RM 2,000 flat bonus per dealer', desc: 'Refers a new sub-dealer who signs up and reaches Silver status', steps: ['1 Generate partner referral code', '2 Referred dealer signs contract', '3 Referred dealer reaches Silver tier', '4 Disburse RM 2,000 referral credit'], api: 'POST /v1/referrals/b2b-payout', schema: 'referral_ledger, partner_tiers' },
    { id: 'comarketing_event', cat: 'social', label: 'Co-Marketing Event', icon: '🎪', val: 500, isNew: true, formula: 'MDF reimbursement up to RM 5,000', desc: 'Host local roadshow or webinar utilizing accrued MDF funds', steps: ['1 Partner submits proposal in portal', '2 Check available MDF wallet balance', '3 Approve budget and run campaign', '4 Disburse co-marketing funds'], api: 'POST /v1/mdf/claim', schema: 'mdf_wallet, campaign_logs' },
    { id: 'winback_milestone', cat: 'engagement', label: 'Dormant Re-Engagement', icon: '⚡', val: 800, isNew: true, formula: 'RM 800 re-engagement credit', desc: 'Inactive partner returns and commits to a new quarterly sales target', steps: ['1 Scan inactive accounts with zero purchases', '2 Account manager closes re-engagement deal', '3 Active status reinstated in CRM', '4 Deposit RM 800 re-activation bonus'], api: 'POST /v1/winback/activate', schema: 'partner_status, wallets' }
  ];

  const EVENTS = activeMode === 'b2c' ? EVENTS_B2C : EVENTS_B2B;

  function render() {
    const wrap = document.getElementById('earn-wrap');
    if (!wrap) return;
    
    // Filters logic
    const filtered = eeCategory === 'all' ? EVENTS : EVENTS.filter(e => e.cat === eeCategory);
    const activeEv = EVENTS.find(e => e.id === eeActive) || EVENTS[0];
    
    let calculatedEarn = 0;
    let multiplierText = '';
    let formulaStr = '';

    if (activeMode === 'b2c') {
      const T = TIERS[eeTier];
      calculatedEarn = Math.round(activeEv.val * T.mult);
      multiplierText = `${T.mult}x`;
      formulaStr = activeEv.formula.replace('{val}', activeEv.val).replace('{mult}', T.mult).replace('{pts}', calculatedEarn);
    } else {
      const T = TIERS_B2B[eeTier];
      // In B2B, multiplier is rebate %
      calculatedEarn = activeEv.val; // base raw value
      multiplierText = `${T.mult}% rebate tier`;
      formulaStr = activeEv.formula;
    }

    const existing = filtered.filter(e => !e.isNew);
    const newEvs = filtered.filter(e => e.isNew);

    const tabsHtml = `
      <div class="sec-div">${activeMode === 'b2c' ? '📦 Existing (12)' : '📦 Core Milestones'}</div>
      <div class="top-tabs" style="flex-wrap:wrap; gap:8px;">
        ${existing.map(e => `
          <div class="tab ${e.id === eeActive ? 'active' : ''}" 
               id="ee-tab-${e.id}" 
               onclick="eeSelect('${e.id}')" 
               style="${e.id === eeActive ? `background:${getEventColor(e.id)}; border-color:transparent; color:#fff;` : ''}">
            ${e.icon} ${e.label}
          </div>
        `).join('')}
      </div>
      ${newEvs.length > 0 ? `
        <div class="sec-div">${activeMode === 'b2c' ? '✨ Naye events (5)' : '✨ Co-Marketing & Growth'}</div>
        <div class="top-tabs" style="flex-wrap:wrap; gap:8px;">
          ${newEvs.map(e => `
            <div class="tab ${e.id === eeActive ? 'active' : ''}" 
                 id="ee-tab-${e.id}" 
                 onclick="eeSelect('${e.id}')" 
                 style="${e.id === eeActive ? `background:${getEventColor(e.id)}; border-color:transparent; color:#fff;` : ''}">
              ${e.icon} ${e.label} <span class="new-badge">NEW</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    // Render tier controls
    let tierControlHtml = '';
    if (activeMode === 'b2c') {
      tierControlHtml = makeTierCtrl('ee', 'eeSetTier', eeTier);
    } else {
      tierControlHtml = `
        <div class="sect-label">Tier choose karo (Earning Rebate %)</div>
        <div class="tier-ctrl" style="flex-wrap:wrap; gap:8px;">
          ${['inactive', 'silver', 'gold', 'platinum'].map(k => `
            <button class="tier-btn ${k === eeTier ? 'sel' : ''}" 
                    id="ee-tb-${k}" 
                    onclick="eeSetTier('${k}')" 
                    style="${k === eeTier ? `background:${TIERS_B2B[k].color}; border-color:${TIERS_B2B[k].color}; color:#fff;` : 'background:none; border:1px solid var(--border-color); color:var(--text-muted);'}">
              ${k.charAt(0).toUpperCase() + k.slice(1)} (${TIERS_B2B[k].mult}%)
            </button>
          `).join('')}
          <span style="font-size:11px; color:var(--text-muted); margin-left:8px;">
            Active Rebate: <strong id="ee-tier-lbl" style="color:var(--text-main)">${TIERS_B2B[eeTier].label}</strong>
          </span>
        </div>
      `;
    }

    wrap.innerHTML = `
      ${tierControlHtml}

      <div class="sect-label">Categories Filter</div>
      <div class="cat-tabs" style="flex-wrap:wrap; gap:6px;">
        ${['all', 'purchase', 'engagement', 'social', 'milestone'].map(cat => `
          <span class="ctab ${cat === eeCategory ? 'sel' : ''}" 
                onclick="eeSetCategory('${cat}')"
                style="${cat === eeCategory ? 'background:var(--color-primary); color:#fff; border-color:transparent;' : ''}">
            ${cat.toUpperCase()}
          </span>
        `).join('')}
      </div>

      ${tabsHtml}

      <div class="sect-label" style="margin-top:18px;">Event Detail Explorer: ${activeEv.label}</div>
      <div class="detail-card">
        <div class="detail-header">
          <div class="scard-icon" style="background:rgba(6, 182, 212, 0.1); color:var(--color-cyan); width:40px; height:40px; font-size:20px;">
            ${activeEv.icon}
          </div>
          <div>
            <h3 style="color:#fff;">${activeEv.label} ${activeEv.isNew ? '<span class="new-badge" style="margin-left:5px">NEW</span>' : ''}</h3>
            <p>${activeEv.desc}</p>
          </div>
          <div style="margin-left:auto; text-align:right;">
            <div style="font-size:10px; color:var(--text-muted);">${activeMode === 'b2c' ? 'Points Earned (Calculated)' : 'Reward Reference Value'}</div>
            <div style="font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--color-teal)">
              ${activeMode === 'b2c' ? calculatedEarn + ' points' : 'RM ' + activeEv.val.toLocaleString()}
            </div>
          </div>
        </div>

        ${activeEv.isNew ? `
          <div class="why-box" style="background:rgba(16, 185, 129, 0.08); border-left:3px solid var(--color-teal); color:var(--text-muted)">
            <strong>Kyun add kiya?</strong> ${activeMode === 'b2c' ? 'App install is a lifelong notification channel that reduces retention CAC.' : 'Co-marketing event helps partners leverage MDF budgets and targets local client growth.'}
          </div>
        ` : ''}

        <div class="why-box" style="background:rgba(6, 182, 212, 0.08); border-color:var(--color-cyan); color:var(--text-muted)">
          <strong>Accrual Formula:</strong> <code>${formulaStr}</code>
        </div>

        <div class="sect-label">System Flowchart (Step-by-Step Hindi)</div>
        <div class="how-steps">
          ${activeEv.steps.map((st, i) => `
            <div class="hs">
              <div class="hs-line">
                <div class="hs-dot" style="background:var(--color-primary)">${i + 1}</div>
                ${i < activeEv.steps.length - 1 ? '<div class="hs-conn"></div>' : ''}
              </div>
              <div class="hs-body">
                <div class="hs-l">${st.split('(')[0]}</div>
                <div class="hs-t" style="color:var(--text-muted);">${st.split('(')[1] ? st.split('(')[1].replace(')', '') : ''}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="meta-row" style="flex-wrap:wrap; gap:10px;">
          <div class="meta-cell">
            <div class="meta-l">API Endpoint</div>
            <div class="meta-v">${activeEv.api}</div>
          </div>
          <div class="meta-cell">
            <div class="meta-l">Database Schemas</div>
            <div class="meta-v">${activeEv.schema}</div>
          </div>
          <div class="meta-cell">
            <div class="meta-l">Event Emitter</div>
            <div class="meta-v">${activeEv.id.toUpperCase()}_ACCRUAL</div>
          </div>
        </div>
      </div>
    `;
  }

  function getEventColor(id) {
    const map = {
      order:'#378ADD',birthday:'#534AB7',review:'#BA7517',referral:'#1D9E75',social:'#D4537E',event:'#3B6D11',firstpurchase:'#BA7517',streak:'#A32D2D',profile:'#185FA5',winback:'#534AB7',app_install:'#2E7D32',survey:'#7B1FA2',wishlist:'#C2185B',spend_milestone:'#F57F17',ugc:'#00838F',
      quarterly_target:'#378ADD',ontime_payment:'#534AB7',staff_certification:'#BA7517',partner_referral:'#1D9E75',comarketing_event:'#D4537E',winback_milestone:'#3B6D11'
    };
    return map[id] || '#378ADD';
  }

  window.eeSetTier = t => {
    eeTier = t;
    if (activeMode === 'b2c') {
      updateTierBtns('ee', t, render);
    } else {
      render();
    }
  };
  window.eeSetCategory = cat => {
    eeCategory = cat;
    render();
  };
  window.eeSelect = id => {
    eeActive = id;
    render();
  };
  render();
}
function initTierUpgrade() {
  if (activeMode === 'b2c') {
    let tuLife = 350;
    let tuCur = 0;

    const getSteps = (life) => {
      let curTier, nextTier, nextPts, pct;
      if (life < 500) { curTier = 'Bronze'; nextTier = 'Silver'; nextPts = 500; pct = Math.round(life / 500 * 100); }
      else if (life < 2000) { curTier = 'Silver'; nextTier = 'Gold'; nextPts = 2000; pct = Math.round((life - 500) / 1500 * 100); }
      else if (life < 5000) { curTier = 'Gold'; nextTier = 'Platinum'; nextPts = 5000; pct = Math.round((life - 2000) / 3000 * 100); }
      else { curTier = 'Platinum'; nextTier = null; nextPts = null; pct = 100; }
      const needed = nextPts ? nextPts - life : 0;
      const tc = { Bronze: '#CD7F32', Silver: '#888780', Gold: '#BA7517', Platinum: '#185FA5' }[curTier];
      const nextColor = nextTier ? { Silver: '#888780', Gold: '#BA7517', Platinum: '#185FA5' }[nextTier] : '#185FA5';
      const multMap = { Bronze: '1x', Silver: '1.5x', Gold: '2x', Platinum: '3x' };

      return [
        {
          color: '#378ADD', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Shuruwaat',
          title: 'Har order ke baad check hota hai',
          eng: 'After every earn event — Tier Engine check runs',
          body: `Jab bhi points earn hote hain (order, birthday, review complete checks), Tier Engine automatically trigger hota hai.\n\nYeh customer profile read karke status checks evaluate karega.\n\nAbhi lifetime points: <strong>${life.toLocaleString()} pts</strong> — Tier: <strong>${curTier}</strong>`,
          hl: { bg: '#E6F1FB', color: '#0C447C', text: `Lifetime: ${life.toLocaleString()} pts → Tier: ${curTier}` },
          chips: [{ l: `${curTier} tier active`, bg: '#FDF3E8', c: tc, b: tc }]
        },
        {
          color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Threshold check',
          title: 'Tier Engine thresholds compare karta hai',
          eng: 'Lifetime vs thresholds: 500 / 2000 / 5000',
          body: `System thresholds verify checks trigger criteria:\n• <strong>500 pts</strong> → Silver\n• <strong>2,000 pts</strong> → Gold\n• <strong>5,000 pts</strong> → Platinum\n\nAbhi points: <strong>${life.toLocaleString()} pts</strong> — ${nextTier ? `<strong>${nextTier} ke liye ${nextPts.toLocaleString()} check needed (${needed.toLocaleString()} aur)</strong>` : 'Platinum Elite peak crossed!'}`,
          bar: { pct, color: needed > 0 ? tc : nextColor, label: nextTier ? `${life.toLocaleString()} / ${nextPts.toLocaleString()} → ${nextTier}` : 'Platinum reached!' },
          hl: { bg: '#EEEDFE', color: '#3C3489', text: nextTier ? `${needed.toLocaleString()} points needed for ${nextTier}` : 'Platinum — Highest level achieved!' },
          chips: nextTier ? [{ l: `${needed.toLocaleString()} pts target`, bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }] : [{ l: 'Platinum Elite', bg: '#EEF2FF', c: '#185FA5', b: '#85B7EB' }]
        },
        {
          color: needed > 0 ? '#888780' : '#1D9E75',
          bbg: needed > 0 ? '#F5F5F5' : '#E1F5EE',
          btc: needed > 0 ? '#444441' : '#085041',
          badge: needed > 0 ? 'No upgrade yet' : 'Upgrade trigger!',
          title: needed > 0 ? `Abhi upgrade nahi — ${needed.toLocaleString()} pts baaki` : `${curTier} → ${nextTier || 'Platinum'} upgrade confirmed!`,
          eng: needed > 0 ? 'Threshold not crossed' : 'Threshold crossed → auto upgrade fires',
          body: needed > 0 
            ? `Manoj balance (<strong>${life.toLocaleString()} pts</strong>) targets check limit Silver criteria meet nahi karta.\n\nTier status unchanged: <strong>${curTier}</strong>.` 
            : `<strong>Threshold cross ho gaya!</strong>\n\nSystem ne database write flags prepare kiye. upgrade workflow actions triggered.`,
          hl: needed > 0 
            ? { bg: '#F5F5F5', color: '#444441', text: `${life.toLocaleString()} < ${nextPts.toLocaleString()} → status same` }
            : { bg: '#E1F5EE', color: '#085041', text: `Upgrade to ${nextTier}!` },
          chips: needed > 0 ? [{ l: `${curTier} same`, bg: '#F5F5F5', c: '#444441', b: '#D3D1C7' }] : [{ l: 'Upgrade Triggered', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        },
        {
          color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Automation — 3 actions',
          title: 'Automation systems ne update actions compile kiye',
          eng: 'Update tier → Notify customer → Unlock benefits',
          body: needed > 0 
            ? `No upgrade yet. Status holds at Bronze/Silver.` 
            : `Upgrade logs verified:\n<strong>1. DB write update</strong>: sets tier = ${nextTier}\n<strong>2. WhatsApp messaging send</strong>: \"Badhaai! upgrade active\"\n<strong>3. Active status update</strong>: ${multMap[nextTier || 'Silver']} mult active`,
          hl: { bg: '#E1F5EE', color: '#085041', text: needed > 0 ? 'Upgrade pending milestone' : 'Settle transactions completed' },
          chips: needed > 0 ? [{ l: 'Upgrade pending', bg: '#F5F5F5', c: '#444441', b: '#D3D1C7' }] : [{ l: 'DB updated', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        },
        {
          color: '#712B13', bbg: '#FAECE7', btc: '#712B13', badge: 'Rule — Tier safe',
          title: 'Kharch karne par Tier downgrade nahi hota',
          eng: 'Tier based on Lifetime Earned — never current wallet balance',
          body: 'Loyalty status checks are safe. Manoj coordinates redeem actions, drops wallet count to 0, points ledger sets to unmodified lifetime. status tier locks and stays safe from spend downgrades.',
          hl: { bg: '#FAECE7', color: '#712B13', text: 'Lifetime Earned = read only value. Never decrements.' },
          chips: [{ l: 'Wallet drops', bg: '#FAECE7', c: '#712B13', b: '#F0997B' }, { l: 'Tier protected', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        }
      ];
    };

    function calc() {
      const life = parseInt(document.getElementById('tu-life').value);
      document.getElementById('tu-life-v').textContent = life.toLocaleString();

      const steps = getSteps(life);
      const s = steps[tuCur];
      const total = steps.length;

      const progHtml = steps.map((step, i) => `
        <div class="prog-dot" 
             style="background:${i < tuCur ? 'var(--color-teal)' : i === tuCur ? step.color : 'var(--border-color)'}" 
             onclick="tuJumpStep(${i})">
          ${i + 1}
        </div>
        ${i < total - 1 ? `<div class="prog-line ${i < tuCur ? 'done' : ''}"></div>` : ''}
      `).join('');

      let barHtml = '';
      if (s.bar) {
        barHtml = `
          <div class="bar-wrap" style="margin-top:12px">
            <div class="bar-fill" style="width:${s.bar.pct}%; background:${s.bar.color}"></div>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:3px">${s.bar.label}</div>
        `;
      }

      const chipsHtml = s.chips.map(c => `
        <div class="step-chip" style="background:${c.bg}; color:${c.c}; border-color:${c.b}">
          ${c.l}
        </div>
      `).join('');

      document.getElementById('tu-stepper-view').innerHTML = `
        <div class="prog">${progHtml}</div>
        <div class="scard-wrap">
          <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-eng">${s.eng}</div>
          <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
          ${barHtml}
          <div class="step-hl" style="background:${s.hl.bg}; color:${s.hl.color}">${s.hl.text}</div>
          <div class="step-chips">${chipsHtml}</div>
        </div>
        <div class="nav-row">
          <button class="btn-prev" ${tuCur === 0 ? 'disabled' : ''} onclick="tuGo2(-1)">← Peeche</button>
          <span class="step-ctr">Step ${tuCur + 1} of ${total}</span>
          <button class="btn-next" onclick="tuGo2(1)">
            ${tuCur === total - 1 ? 'Finish ✓' : 'Next Step →'}
          </button>
        </div>
      `;
    }

    window.tuCalc = calc;
    window.tuLifeChange = (v) => {
      document.getElementById('tu-life').value = v;
      document.getElementById('tu-life-v').textContent = v.toLocaleString();
      tuCur = 0;
      calc();
    };
    window.tuGo2 = (d) => {
      if (tuCur + d >= 0 && tuCur + d < 5) {
        tuCur += d;
        calc();
      }
    };
    window.tuJumpStep = (i) => {
      tuCur = i;
      calc();
    };

    document.getElementById('tier-wrap').innerHTML = `
      <div class="slider-box">
        <div class="ctrl-row" style="margin-bottom:0">
          <label>Input Lifetime Points</label>
          <input type="range" id="tu-life" min="0" max="6000" step="50" value="350" oninput="tuCalc()">
          <span class="ctrl-val" style="color:var(--color-primary)"><span id="tu-life-v">350</span> pts</span>
        </div>
        <div class="action-btns" style="margin-top:10px;">
          <button onclick="tuLifeChange(350)">Bronze Mock (350)</button>
          <button onclick="tuLifeChange(800)">Silver Mock (800)</button>
          <button onclick="tuLifeChange(2500)">Gold Mock (2500)</button>
          <button onclick="tuLifeChange(5500)">Platinum Mock (5500)</button>
        </div>
      </div>

      <div class="sec-div">System Upgrade Processing Workflow (5 steps)</div>
      <div id="tu-stepper-view"></div>
    `;
    calc();
  } else {
    // B2B Mode
    let tuSales = 150000;
    let tuScore = 750;
    let tuCur = 0;
    let tuPrevTier = 'Gold';

    const partners = {
      riztech: { name: 'RizTech Solutions', sales: 42000, score: 602, prev: 'Inactive', decision: 'Upgrade to Silver', desc: 'Inactive state se 2 consecutive quarters target pass karke Silver standard achieve kiya.' },
      mega: { name: 'Mega Distributors', sales: 78000, score: 679, prev: 'Silver', decision: 'Maintain Silver', desc: 'Consistent stable sales par growth low hone se Gold upgrade lock raha.' },
      probuild: { name: 'ProBuild Supply', sales: 310000, score: 978, prev: 'Gold', decision: 'Upgrade to Platinum', desc: 'Outstanding Q2 (921) aur Q3 (978) performance score se Platinum tier claim kiya.' },
      swifttrade: { name: 'SwiftTrade Corp', sales: 95000, score: 442, prev: 'Gold', decision: 'Downgrade to Silver', desc: 'Late payments aur decline in sales ke chalte 2nd missed quarter ke baad Silver tier par demote ho gaye.' }
    };

    const getB2BTier = (sales, score) => {
      if (sales >= 250000 && score >= 850) return 'Platinum';
      if (sales >= 125000 && score >= 700) return 'Gold';
      if (sales >= 25000 && score >= 500) return 'Silver';
      return 'Inactive';
    };

    const getStepsB2B = (sales, score, prev) => {
      const currentQual = getB2BTier(sales, score);
      const isUpgrade = ['Inactive', 'Silver', 'Gold', 'Platinum'].indexOf(currentQual) > ['Inactive', 'Silver', 'Gold', 'Platinum'].indexOf(prev);
      const isDowngrade = ['Inactive', 'Silver', 'Gold', 'Platinum'].indexOf(currentQual) < ['Inactive', 'Silver', 'Gold', 'Platinum'].indexOf(prev);
      
      let consecutiveStatus = "Same status";
      let decisionText = `Maintain ${prev}`;
      if (isUpgrade) {
        consecutiveStatus = `Met ${currentQual} criteria (2nd quarter check)`;
        decisionText = `Upgrade ${prev} → ${currentQual}`;
      } else if (isDowngrade) {
        consecutiveStatus = `Below ${prev} criteria (2nd quarter check)`;
        decisionText = `Downgrade ${prev} → ${currentQual}`;
      } else {
        consecutiveStatus = `Maintained ${currentQual} status successfully`;
        decisionText = `Maintain ${currentQual}`;
      }

      const tc = { Inactive: '#CD7F32', Silver: '#888780', Gold: '#BA7517', Platinum: '#185FA5' }[currentQual];
      const prevColor = { Inactive: '#CD7F32', Silver: '#888780', Gold: '#BA7517', Platinum: '#185FA5' }[prev];

      // Rebate details
      let rebatePct = 0;
      let mdf = 0;
      if (currentQual === 'Platinum') { rebatePct = score >= 900 ? 3.5 : 3.0; mdf = 5000; }
      else if (currentQual === 'Gold') { rebatePct = score >= 900 ? 2.5 : 2.0; mdf = 2000; }
      else if (currentQual === 'Silver') { rebatePct = score >= 900 ? 1.5 : 1.0; mdf = 0; }

      return [
        {
          color: '#378ADD', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Review Trigger',
          title: 'Quarterly review audit trigger hua',
          eng: 'Aggregate quarterly revenue & performance metrics',
          body: `Quarter end par system partner metrics fetch karta hai:\n• Quarterly Sales: <strong>RM ${sales.toLocaleString()}</strong>\n• Performance Score: <strong>${score} / 1,000</strong>\n• Previous Tier: <strong>${prev}</strong>.`,
          hl: { bg: '#E6F1FB', color: '#0C447C', text: `Sales: RM ${sales.toLocaleString()} | Score: ${score}` },
          chips: [{ l: 'Audit active', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
        },
        {
          color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Threshold Check',
          title: 'System thresholds verify kiye gaye',
          eng: 'Compare actual sales and score against tier targets',
          body: `Tier limits comparison parameters:\n• <strong>Platinum</strong>: RM 250K+ & Score 850+\n• <strong>Gold</strong>: RM 125K+ & Score 700+\n• <strong>Silver</strong>: RM 25K+ & Score 500+\n\nQualifying tier this quarter: <strong style="color:${tc}">${currentQual.toUpperCase()}</strong>.`,
          hl: { bg: '#EEEDFE', color: '#3C3489', text: `Qualifying Tier: ${currentQual}` },
          chips: [{ l: `Qualifies: ${currentQual}`, bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
        },
        {
          color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Consecutive Quarters Check',
          title: '2-Quarter Rule evaluation check runs',
          eng: 'Upgrades/Downgrades require 2 consecutive quarters of performance matching',
          body: `Single quarter spike ya dip se tier change nahi hota. Partner ko naya level <strong>2 consecutive quarters</strong> maintain karna padta hai. Otherwise, grace period/evaluation active rehta hai.\n\nEvaluation status: <strong>${consecutiveStatus}</strong>.`,
          hl: { bg: '#FAEEDA', color: '#633806', text: `2-Quarter rule checks: ${consecutiveStatus}` },
          chips: [{ l: '2-Quarter check', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
        },
        {
          color: isDowngrade ? '#A32D2D' : '#1D9E75', bbg: isDowngrade ? '#FCEBEB' : '#E1F5EE', btc: isDowngrade ? '#791F1F' : '#085041', badge: 'Tier Decision',
          title: `Decision: ${decisionText}`,
          eng: 'Final tier status determined for next quarter',
          body: `Previous tier (<strong>${prev}</strong>) se transition logic apply karne par:\n• Naya Tier status: <strong style="color:${tc}">${currentQual.toUpperCase()}</strong>\n\nTransition details: ${decisionText}.`,
          hl: { bg: isDowngrade ? '#FCEBEB' : '#E1F5EE', color: isDowngrade ? '#791F1F' : '#085041', text: `Final Decision: ${decisionText}` },
          chips: [{ l: decisionText, bg: isDowngrade ? '#FCEBEB' : '#E1F5EE', c: isDowngrade ? '#791F1F' : '#085041', b: isDowngrade ? '#F09595' : '#5DCAA5' }]
        },
        {
          color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Automation & Payouts',
          title: 'Database values update aur payouts complete',
          eng: 'Update DB records → Set rebate rates → Credit MDF funds',
          body: `Tier adjustments finalized:\n<strong>1. DB override updates</strong>: set tier = ${currentQual}\n<strong>2. Rebate settings updated</strong>: <strong>${rebatePct}%</strong> rate applied\n<strong>3. MDF limits updated</strong>: <strong>RM ${mdf.toLocaleString()}</strong> allocated (Gold/Platinum only).`,
          hl: { bg: '#E1F5EE', color: '#085041', text: `Rebate rate: ${rebatePct}% | MDF: RM ${mdf}` },
          chips: [{ l: `Rebate: ${rebatePct}%`, bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }, { l: `MDF: RM ${mdf}`, bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        }
      ];
    };

    function calcB2B() {
      const sales = parseInt(document.getElementById('tu-b2b-sales').value);
      const score = parseInt(document.getElementById('tu-b2b-score').value);
      const prev = document.getElementById('tu-b2b-prev').value;

      document.getElementById('tu-b2b-sales-v').textContent = sales.toLocaleString();
      document.getElementById('tu-b2b-score-v').textContent = score.toString();

      const steps = getStepsB2B(sales, score, prev);
      const s = steps[tuCur];
      const total = steps.length;

      // Render stepper dots
      const progHtml = steps.map((step, i) => `
        <div class="prog-dot" 
             style="background:${i < tuCur ? 'var(--color-teal)' : i === tuCur ? step.color : 'var(--border-color)'}" 
             onclick="tuJumpStepB2B(${i})">
          ${i + 1}
        </div>
        ${i < total - 1 ? `<div class="prog-line ${i < tuCur ? 'done' : ''}"></div>` : ''}
      `).join('');

      const chipsHtml = s.chips.map(c => `
        <div class="step-chip" style="background:${c.bg}; color:${c.c}; border-color:${c.b}">
          ${c.l}
        </div>
      `).join('');

      document.getElementById('tu-stepper-view').innerHTML = `
        <div class="prog">${progHtml}</div>
        <div class="scard-wrap">
          <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-eng">${s.eng}</div>
          <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
          <div class="step-hl" style="background:${s.hl.bg}; color:${s.hl.color}">${s.hl.text}</div>
          <div class="step-chips">${chipsHtml}</div>
        </div>
        <div class="nav-row">
          <button class="btn-prev" ${tuCur === 0 ? 'disabled' : ''} onclick="tuGo2B2B(-1)">← Peeche</button>
          <span class="step-ctr">Step ${tuCur + 1} of ${total}</span>
          <button class="btn-next" onclick="tuGo2B2B(1)">
            ${tuCur === total - 1 ? 'Finish ✓' : 'Next Step →'}
          </button>
        </div>
      `;
    }

    window.tuCalcB2B = calcB2B;
    window.tuJumpStepB2B = (i) => {
      tuCur = i;
      calcB2B();
    };
    window.tuGo2B2B = (d) => {
      if (tuCur + d >= 0 && tuCur + d < 5) {
        tuCur += d;
        calcB2B();
      }
    };

    window.tuSelectPartner = (pKey) => {
      const p = partners[pKey];
      document.getElementById('tu-b2b-sales').value = p.sales;
      document.getElementById('tu-b2b-score').value = p.score;
      document.getElementById('tu-b2b-prev').value = p.prev;
      tuCur = 0;
      calcB2B();
    };

    document.getElementById('tier-wrap').innerHTML = `
      <div class="slider-box">
        <div class="action-btns" style="margin-bottom:14px; flex-wrap:wrap; gap:8px;">
          ${Object.keys(partners).map(k => `
            <button onclick="tuSelectPartner('${k}')">${partners[k].name}</button>
          `).join('')}
        </div>
        
        <div class="ctrl-row">
          <label>Quarterly Sales Revenue (RM)</label>
          <input type="range" id="tu-b2b-sales" min="0" max="500000" step="5000" value="150000" oninput="tuCalcB2B()">
          <span class="ctrl-val" style="color:var(--color-primary)">RM <span id="tu-b2b-sales-v">150,000</span></span>
        </div>
        <div class="ctrl-row">
          <label>Performance Score</label>
          <input type="range" id="tu-b2b-score" min="0" max="1000" step="10" value="750" oninput="tuCalcB2B()">
          <span class="ctrl-val" style="color:var(--color-teal)"><span id="tu-b2b-score-v">750</span> pts</span>
        </div>
        <div class="ctrl-row" style="margin-bottom:0">
          <label>Previous Quarter Tier</label>
          <select id="tu-b2b-prev" onchange="tuCalcB2B()" style="background:rgba(255,255,255,0.05); color:#fff; border:1px solid var(--border-color); border-radius:8px; padding:6px 12px; font-size:13px; font-family:inherit;">
            <option value="Inactive">Inactive</option>
            <option value="Silver">Silver</option>
            <option value="Gold" selected>Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
      </div>

      <div class="sec-div">Quarterly B2B Tier Evaluation Workflow (5 steps)</div>
      <div id="tu-stepper-view"></div>
    `;
    calcB2B();
  }
}
function initRedemption() {
  if (activeMode === 'b2c') {
    let rMode = 'redeem'; // 'redeem' or 'saga'
    let rCurStep = 0;
    let isStockout = false;

    const getRedeemSteps = (wallet, orderAmt) => {
      const maxRm = +(orderAmt * 0.20).toFixed(2);
      const maxPts = Math.round(maxRm * 100);
      const actualPts = Math.min(wallet, maxPts);
      const actualRm = +(actualPts / 100).toFixed(2);
      const remaining = wallet - actualPts;
      const finalOrder = +(orderAmt - actualRm).toFixed(2);
      const capHit = wallet >= maxPts;

      return [
        {
          color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Step 1 — Checkout',
          title: 'Customer checkout pe aaya',
          eng: 'Customer initiates checkout',
          body: `Customer details verification completed. Cart subtotal: <strong>RM ${orderAmt}</strong>.\nWallet points: <strong>${wallet.toLocaleString()} pts</strong>.\n\nSystem asks: <strong>"Do you want to redeem points?"</strong>`,
          hl: { bg: '#EEEDFE', color: '#3C3489', text: `Wallet: ${wallet.toLocaleString()} pts | Order: RM ${orderAmt}` },
          chips: [{ l: 'Points Engine check', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
        },
        {
          color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Step 2 — Cap calculation',
          title: '20% cap limit calculate hua',
          eng: 'Max redemption capped at 20% of subtotal value',
          body: `Capping constraints evaluation:\n<strong>RM ${orderAmt} × 20% = RM ${maxRm}</strong>\n\nMaximum reward deductions limit: <strong>RM ${maxRm} (${maxPts.toLocaleString()} points)</strong>.`,
          hl: { bg: '#FAEEDA', color: '#633806', text: `Max cap: RM ${maxRm} = ${maxPts.toLocaleString()} pts` },
          chips: [{ l: '20% Capping Cap', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
        },
        {
          color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Step 3 — Wallet deduction check',
          title: capHit ? 'Max points limit exceeded' : 'Points deducted',
          eng: capHit ? 'Wallet balance >= cap limit' : 'Wallet balance < cap limit',
          body: capHit 
            ? `Wallet balance (<strong>${wallet.toLocaleString()} pts</strong>) is higher than cap limit (<strong>${maxPts.toLocaleString()} pts</strong>). Capping applies.\n\nPoints used: <strong>${maxPts.toLocaleString()} pts (RM ${maxRm} off)</strong>.` 
            : `Wallet balance (<strong>${wallet.toLocaleString()} pts</strong>) fits under cap limit. All available points used.\n\nPoints used: <strong>${wallet.toLocaleString()} pts (RM ${actualRm} off)</strong>.`,
          hl: { bg: '#E1F5EE', color: '#085041', text: `${actualPts.toLocaleString()} points applied` },
          chips: [{ l: `Redeemed: ${actualPts.toLocaleString()} pts`, bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        },
        {
          color: '#378ADD', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Step 4 — Payment adjustment',
          title: 'Final pay adjust kiya',
          eng: 'Final subtotal amount adjusted',
          body: `Adjusted checkout bill:\n<strong>RM ${orderAmt} − RM ${actualRm} = RM ${finalOrder}</strong>.\n\nWallet debit ledger written: <strong>-${actualPts.toLocaleString()} pts</strong>.`,
          hl: { bg: '#E6F1FB', color: '#0C447C', text: `Manoj pays: RM ${finalOrder} | Remaining wallet: ${remaining.toLocaleString()} pts` },
          chips: [{ l: `Cart: RM ${finalOrder}`, bg: '#E6F1FB', c: '#0C447C', b: '#85B7EB' }]
        },
        {
          color: '#712B13', bbg: '#FAECE7', btc: '#712B13', badge: 'Step 5 — Lifetime safety check',
          title: 'Lifetime counter remains unaffected',
          eng: 'Redemption never reduces status progress',
          body: `Deduction completed. Wallet drops to <strong>${remaining.toLocaleString()} pts</strong>.\n\nLifetime count is unmodified. Tier Silver status is protected!`,
          hl: { bg: '#FAECE7', color: '#712B13', text: 'Lifetime = readonly incrementing counter' },
          chips: [{ l: 'Tier status safe', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
        }
      ];
    };

    function calc() {
      const wallet = parseInt(document.getElementById('r-bal').value);
      const orderAmt = parseInt(document.getElementById('r-sub').value);
      
      document.getElementById('r-bal-v').textContent = wallet.toLocaleString();
      document.getElementById('r-sub-v').textContent = orderAmt;

      const steps = getRedeemSteps(wallet, orderAmt);
      const maxRm = +(orderAmt * 0.20).toFixed(2);
      const maxPts = Math.round(maxRm * 100);
      const pointsDeducted = Math.min(wallet, maxPts);
      const discountRm = (pointsDeducted / 100).toFixed(2);
      const remainderPayable = orderAmt - parseFloat(discountRm);

      document.getElementById('r-out-max-pts').textContent = maxPts.toLocaleString() + ' pts';
      document.getElementById('r-out-deduct').textContent = pointsDeducted.toLocaleString() + ' pts';
      document.getElementById('r-out-discount').textContent = 'RM ' + discountRm;
      document.getElementById('r-out-payable').textContent = 'RM ' + remainderPayable.toFixed(2);

      if (rMode === 'redeem') {
        document.getElementById('r-stepper-panel').style.display = 'block';
        document.getElementById('r-resilience-panel').style.display = 'none';

        const s = steps[rCurStep];
        const total = steps.length;

        const progHtml = steps.map((step, i) => `
          <div class="prog-dot" 
               style="background:${i < rCurStep ? 'var(--color-teal)' : i === rCurStep ? step.color : 'var(--border-color)'}" 
               onclick="rJumpStep(${i})">
            ${i + 1}
          </div>
          ${i < total - 1 ? `<div class="prog-line ${i < rCurStep ? 'done' : ''}"></div>` : ''}
        `).join('');

        const chipsHtml = s.chips.map(c => `
          <div class="step-chip" style="background:${c.bg}; color:${c.c}; border-color:${c.b}">
            ${c.l}
          </div>
        `).join('');

        document.getElementById('r-stepper-panel').innerHTML = `
          <div class="prog">${progHtml}</div>
          <div class="scard-wrap">
            <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
            <div class="step-title">${s.title}</div>
            <div class="step-eng">${s.eng}</div>
            <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
            <div class="step-hl" style="background:${s.hl.bg}; color:${s.hl.color}">${s.hl.text}</div>
            <div class="step-chips">${chipsHtml}</div>
          </div>
          <div class="nav-row">
            <button class="btn-prev" ${rCurStep === 0 ? 'disabled' : ''} onclick="rGo2(-1)">← Peeche</button>
            <span class="step-ctr">Step ${rCurStep + 1} of ${total}</span>
            <button class="btn-next" onclick="rGo2(1)">
              ${rCurStep === total - 1 ? 'Finish ✓' : 'Next Step →'}
            </button>
          </div>
        `;
      } else {
        document.getElementById('r-stepper-panel').style.display = 'none';
        document.getElementById('r-resilience-panel').style.display = 'block';

        const logs = document.getElementById('r-resilience-logs');
        if (isStockout) {
          logs.innerHTML = `
            <div style="color:var(--color-coral); margin-bottom:6px;">[17:23:01] 🚨 ORDER FAIL: Voucher item out of stock.</div>
            <div style="color:var(--color-amber); margin-bottom:6px;">[17:23:01] Automatic points refund system triggered.</div>
            <div style="color:var(--color-cyan); margin-bottom:6px;">[17:23:02] Refunding: Adding ${pointsDeducted} points back to Manoj's wallet.</div>
            <div style="color:var(--color-teal);">[17:23:02] Refund Successful: Points returned to Manoj's balance.</div>
          `;
        } else {
          logs.innerHTML = `
            <div style="color:var(--text-muted); font-style:italic;">No active cancellations. Toggle "Out-Of-Stock Simulation" switch below to see the points refund flow.</div>
          `;
        }
      }
    }

    // Expose global variables
    window.rCalc = calc;
    window.rSetMode = (m) => {
      rMode = m;
      rCurStep = 0;
      document.getElementById('mb-redeem').classList.toggle('active', m === 'redeem');
      document.getElementById('mb-saga').classList.toggle('active', m === 'saga');
      calc();
    };
    window.rGo2 = (d) => {
      if (rCurStep + d >= 0 && rCurStep + d < 5) {
        rCurStep += d;
        calc();
      }
    };
    window.rJumpStep = (i) => {
      rCurStep = i;
      calc();
    };
    window.rToggleStockout = () => {
      isStockout = !isStockout;
      const btn = document.getElementById('r-fail-toggle');
      if (isStockout) {
        btn.textContent = 'Simulating Out-Of-Stock (Active)';
        btn.style.background = 'var(--color-coral)';
        btn.style.borderColor = 'var(--color-coral)';
        btn.style.color = '#fff';
      } else {
        btn.textContent = 'Trigger Out-Of-Stock Simulation';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }
      calc();
    };

    document.getElementById('redemption-wrap').innerHTML = `
      <div class="mode-toggle" style="display:flex; gap:8px; margin-bottom:1.5rem;">
        <button class="mode-btn active" id="mb-redeem" onclick="rSetMode('redeem')" style="flex:1; padding:10px; border-radius:10px; font-size:13px; font-weight:500; cursor:pointer; background:var(--color-primary); border-color:var(--color-primary); color:#fff;">
          Points Redeem karna
        </button>
        <button class="mode-btn" id="mb-saga" onclick="rSetMode('saga')" style="flex:1; padding:10px; border-radius:10px; font-size:13px; font-weight:500; cursor:pointer;">
          Order Cancel & Points Refund
        </button>
      </div>

      <div class="slider-box">
        <div class="ctrl-row">
          <label>Checkout Cart Subtotal (RM)</label>
          <input type="range" id="r-sub" min="10" max="1000" step="10" value="200" oninput="rCalc()">
          <span class="ctrl-val">RM <span id="r-sub-v">200</span></span>
        </div>
        <div class="ctrl-row">
          <label>Wallet Points Balance</label>
          <input type="range" id="r-bal" min="0" max="5000" step="100" value="1500" oninput="rCalc()">
          <span class="ctrl-val" style="color:var(--color-teal)"><span id="r-bal-v">1,500</span> pts</span>
        </div>
      </div>

      <div class="sim-grid" style="margin-bottom:18px;">
        <div class="sim-cell">
          <div class="sc-l">Max Discount Points (20% cap)</div>
          <div class="sc-v" id="r-out-max-pts">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">Actual Points Deducted</div>
          <div class="sc-v" id="r-out-deduct">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">Discount Received (RM)</div>
          <div class="sc-v" id="r-out-discount">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">Payable Subtotal (RM)</div>
          <div class="sc-v" id="r-out-payable">—</div>
        </div>
      </div>

      <!-- Mode Panels -->
      <div id="r-stepper-panel"></div>
      <div id="r-resilience-panel" style="display:none;">
        <div class="sec-div">Order Expiration & Refund Logs</div>
        <div class="formula-box" style="background:#05070a; min-height:110px; font-family:monospace; font-size:11.5px;">
          <div id="r-resilience-logs"></div>
        </div>
        <div class="action-btns">
          <button id="r-fail-toggle" onclick="rToggleStockout()">Trigger Out-Of-Stock Simulation</button>
        </div>
      </div>
    `;
    calc();
  } else {
    // B2B Mode
    let rModeB2B = 'payout'; // 'payout' or 'saga'
    let rCurStep = 0;
    let isReturnTriggered = false;

    function calcB2B() {
      const sales = parseInt(document.getElementById('r-b2b-sales').value);
      const tier = document.getElementById('r-b2b-tier').value;
      const claim = parseInt(document.getElementById('r-b2b-claim').value);
      const retAmt = parseInt(document.getElementById('r-b2b-return').value);

      document.getElementById('r-b2b-sales-v').textContent = sales.toLocaleString();
      document.getElementById('r-b2b-claim-v').textContent = claim.toLocaleString();
      document.getElementById('r-b2b-return-v').textContent = retAmt.toLocaleString();

      let rebateRate = 0;
      let mdfAlloc = 0;
      if (tier === 'Platinum') { rebateRate = 3.0; mdfAlloc = 5000; }
      else if (tier === 'Gold') { rebateRate = 2.0; mdfAlloc = 2000; }
      else if (tier === 'Silver') { rebateRate = 1.0; mdfAlloc = 0; }

      const rebateAmt = sales * (rebateRate / 100);
      const mdfRemaining = Math.max(0, mdfAlloc - claim);
      const actualMdfDeducted = Math.min(mdfAlloc, claim);

      document.getElementById('r-b2b-out-rebate').textContent = 'RM ' + rebateAmt.toLocaleString(undefined, {minimumFractionDigits: 2});
      document.getElementById('r-b2b-out-mdf').textContent = 'RM ' + mdfAlloc.toLocaleString();
      document.getElementById('r-b2b-out-claimed').textContent = 'RM ' + actualMdfDeducted.toLocaleString();
      document.getElementById('r-b2b-out-remaining').textContent = 'RM ' + mdfRemaining.toLocaleString();

      if (rModeB2B === 'payout') {
        document.getElementById('r-b2b-stepper-panel').style.display = 'block';
        document.getElementById('r-b2b-resilience-panel').style.display = 'none';

        // 5 steps for Payout
        const steps = [
          {
            color: '#378ADD', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Step 1 — Quarterly Close',
            title: 'Quarterly sales audit completed',
            eng: 'Quarter close audits sales calculations',
            body: `Quarter close parameters processed. Total sales registered: <strong>RM ${sales.toLocaleString()}</strong>. Active status tier: <strong>${tier}</strong>.`,
            hl: { bg: '#E6F1FB', color: '#0C447C', text: `Sales: RM ${sales.toLocaleString()} | Tier: ${tier}` },
            chips: [{ l: 'Quarter close audit', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
          },
          {
            color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Step 2 — Rebate Calculation',
            title: 'Rebate amounts calculated',
            eng: 'Rebate = Quarterly Sales × Rebate %',
            body: `Tier rebate rate (<strong>${rebateRate}%</strong>) evaluated. Rebate earned: <strong>RM ${rebateAmt.toLocaleString(undefined, {minimumFractionDigits: 2})}</strong>.`,
            hl: { bg: '#EEEDFE', color: '#3C3489', text: `Rebate Rate: ${rebateRate}% -> RM ${rebateAmt.toLocaleString(undefined, {minimumFractionDigits: 2})}` },
            chips: [{ l: `Rebate: RM ${rebateAmt.toLocaleString()}`, bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
          },
          {
            color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Step 3 — MDF Allocation',
            title: 'MDF funds allocated',
            eng: 'Market Development Funds assigned based on tier',
            body: `MDF allocation rule check: <strong>${tier}</strong> tier gets <strong>RM ${mdfAlloc.toLocaleString()}</strong>. Funds are deposited in co-marketing wallets.`,
            hl: { bg: '#FAEEDA', color: '#633806', text: `MDF budget: RM ${mdfAlloc.toLocaleString()}` },
            chips: [{ l: `MDF: RM ${mdfAlloc.toLocaleString()}`, bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
          },
          {
            color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Step 4 — MDF Drawdown Claim',
            title: 'MDF claim requested',
            eng: 'Partner submits invoice for co-marketing claims',
            body: `Claim request of <strong>RM ${claim.toLocaleString()}</strong> check. Available MDF: <strong>RM ${mdfAlloc.toLocaleString()}</strong>. Claim approved: <strong>RM ${actualMdfDeducted.toLocaleString()}</strong> disbursed.`,
            hl: { bg: '#E1F5EE', color: '#085041', text: `Claimed: RM ${actualMdfDeducted.toLocaleString()} | Remaining MDF: RM ${mdfRemaining.toLocaleString()}` },
            chips: [{ l: `Disbursed: RM ${actualMdfDeducted}`, bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
          },
          {
            color: '#712B13', bbg: '#FAECE7', btc: '#712B13', badge: 'Step 5 — Audits & Compliance',
            title: 'Audit compliance completed',
            eng: 'Co-marketing collateral verified by audits team',
            body: 'MDF claims are auditable. Partner must upload campaign proof (ads, flyers) within 30 days to close the audit loop and lock payouts.',
            hl: { bg: '#FAECE7', color: '#712B13', text: 'Compliance check completed successfully' },
            chips: [{ l: 'Audit locks active', bg: '#FAECE7', c: '#712B13', b: '#F0997B' }]
          }
        ];

        const s = steps[rCurStep];
        const total = steps.length;

        const progHtml = steps.map((step, i) => `
          <div class="prog-dot" 
               style="background:${i < rCurStep ? 'var(--color-teal)' : i === rCurStep ? step.color : 'var(--border-color)'}" 
               onclick="rJumpStepB2B(${i})">
            ${i + 1}
          </div>
          ${i < total - 1 ? `<div class="prog-line ${i < rCurStep ? 'done' : ''}"></div>` : ''}
        `).join('');

        const chipsHtml = s.chips.map(c => `
          <div class="step-chip" style="background:${c.bg}; color:${c.c}; border-color:${c.b}">
            ${c.l}
          </div>
        `).join('');

        document.getElementById('r-b2b-stepper-panel').innerHTML = `
          <div class="prog">${progHtml}</div>
          <div class="scard-wrap">
            <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
            <div class="step-title">${s.title}</div>
            <div class="step-eng">${s.eng}</div>
            <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
            <div class="step-hl" style="background:${s.hl.bg}; color:${s.hl.color}">${s.hl.text}</div>
            <div class="step-chips">${chipsHtml}</div>
          </div>
          <div class="nav-row">
            <button class="btn-prev" ${rCurStep === 0 ? 'disabled' : ''} onclick="rGo2B2B(-1)">← Peeche</button>
            <span class="step-ctr">Step ${rCurStep + 1} of ${total}</span>
            <button class="btn-next" onclick="rGo2B2B(1)">
              ${rCurStep === total - 1 ? 'Finish ✓' : 'Next Step →'}
            </button>
          </div>
        `;
      } else {
        document.getElementById('r-b2b-stepper-panel').style.display = 'none';
        document.getElementById('r-b2b-resilience-panel').style.display = 'block';

        const logs = document.getElementById('r-b2b-resilience-logs');
        if (isReturnTriggered) {
          const clawbackVal = retAmt * (rebateRate / 100);
          const creditNoteVal = retAmt - clawbackVal;
          logs.innerHTML = `
            <div style="color:var(--color-coral); margin-bottom:6px;">[15:10:01] 🚨 RETURN TRANSACTION DETECTED: Goods worth RM ${retAmt.toLocaleString()} returned.</div>
            <div style="color:var(--color-amber); margin-bottom:6px;">[15:10:01] Initiating Returns Saga rollback workflows...</div>
            <div style="color:var(--color-cyan); margin-bottom:6px;">[15:10:02] Recalculating sales ledger: RM ${sales.toLocaleString()} - RM ${retAmt.toLocaleString()} = RM ${(sales - retAmt).toLocaleString()} net sales.</div>
            <div style="color:var(--color-amber); margin-bottom:6px;">[15:10:02] Rebate Clawback audit: Deducting RM ${clawbackVal.toLocaleString()} (Clawback rate: ${rebateRate}%) from partner balance.</div>
            <div style="color:var(--color-teal); margin-bottom:6px;">[15:10:03] Issuing credit note: CN-77821 for Net Credit RM ${creditNoteVal.toLocaleString()} (Goods RM ${retAmt.toLocaleString()} - Rebate RM ${clawbackVal.toLocaleString()}).</div>
            <div style="color:var(--color-teal);">[15:10:03] Returns Saga Rollback successfully committed. ledger audits logged.</div>
          `;
        } else {
          logs.innerHTML = `
            <div style="color:var(--text-muted); font-style:italic;">No active returns. Toggle "Trigger Returns Saga & Rollback" button below to see the B2B Credit Note & Rebate Clawback flow.</div>
          `;
        }
      }
    }

    window.rCalcB2B = calcB2B;
    window.rSetModeB2B = (m) => {
      rModeB2B = m;
      rCurStep = 0;
      document.getElementById('mb-b2b-payout').classList.toggle('active', m === 'payout');
      document.getElementById('mb-b2b-saga').classList.toggle('active', m === 'saga');
      calcB2B();
    };
    window.rGo2B2B = (d) => {
      if (rCurStep + d >= 0 && rCurStep + d < 5) {
        rCurStep += d;
        calcB2B();
      }
    };
    window.rJumpStepB2B = (i) => {
      rCurStep = i;
      calcB2B();
    };
    window.rToggleReturnsSaga = () => {
      isReturnTriggered = !isReturnTriggered;
      const btn = document.getElementById('r-b2b-fail-toggle');
      if (isReturnTriggered) {
        btn.textContent = 'Returns Saga Active (Triggered)';
        btn.style.background = 'var(--color-coral)';
        btn.style.borderColor = 'var(--color-coral)';
        btn.style.color = '#fff';
      } else {
        btn.textContent = 'Trigger Returns Saga & Rollback';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }
      calcB2B();
    };

    document.getElementById('redemption-wrap').innerHTML = `
      <div class="mode-toggle" style="display:flex; gap:8px; margin-bottom:1.5rem;">
        <button class="mode-btn active" id="mb-b2b-payout" onclick="rSetModeB2B('payout')" style="flex:1; padding:10px; border-radius:10px; font-size:13px; font-weight:500; cursor:pointer; background:var(--color-primary); border-color:var(--color-primary); color:#fff;">
          Rebate & MDF Drawdown
        </button>
        <button class="mode-btn" id="mb-b2b-saga" onclick="rSetModeB2B('saga')" style="flex:1; padding:10px; border-radius:10px; font-size:13px; font-weight:500; cursor:pointer;">
          Returns Saga & Clawback
        </button>
      </div>

      <div class="slider-box">
        <div class="ctrl-row">
          <label>Quarterly Sales Revenue (RM)</label>
          <input type="range" id="r-b2b-sales" min="10000" max="500000" step="10000" value="200000" oninput="rCalcB2B()">
          <span class="ctrl-val">RM <span id="r-b2b-sales-v">200,000</span></span>
        </div>
        <div class="ctrl-row">
          <label>Active Tier</label>
          <select id="r-b2b-tier" onchange="rCalcB2B()" style="background:rgba(255,255,255,0.05); color:#fff; border:1px solid var(--border-color); border-radius:8px; padding:6px 12px; font-size:13px; font-family:inherit;">
            <option value="Silver">Silver (1% rebate)</option>
            <option value="Gold" selected>Gold (2% rebate)</option>
            <option value="Platinum">Platinum (3% rebate)</option>
          </select>
        </div>
        <div class="ctrl-row" style="margin-bottom:0">
          <label>MDF Drawdown Claim (RM)</label>
          <input type="range" id="r-b2b-claim" min="0" max="10000" step="500" value="1500" oninput="rCalcB2B()">
          <span class="ctrl-val" style="color:var(--color-teal)">RM <span id="r-b2b-claim-v">1,500</span></span>
        </div>
      </div>

      <div class="sim-grid" style="margin-bottom:18px;">
        <div class="sim-cell">
          <div class="sc-l">Rebate Earned (Quarterly)</div>
          <div class="sc-v" id="r-b2b-out-rebate">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">MDF Allocated</div>
          <div class="sc-v" id="r-b2b-out-mdf">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">MDF Claim Disbursed</div>
          <div class="sc-v" id="r-b2b-out-claimed">—</div>
        </div>
        <div class="sim-cell">
          <div class="sc-l">Remaining MDF</div>
          <div class="sc-v" id="r-b2b-out-remaining">—</div>
        </div>
      </div>

      <!-- Mode Panels -->
      <div id="r-b2b-stepper-panel"></div>
      <div id="r-b2b-resilience-panel" style="display:none;">
        <div class="slider-box" style="margin-bottom:16px;">
          <div class="ctrl-row" style="margin-bottom:0">
            <label>Return Goods Value (RM)</label>
            <input type="range" id="r-b2b-return" min="1000" max="50000" step="1000" value="10000" oninput="rCalcB2B()">
            <span class="ctrl-val" style="color:var(--color-coral)">RM <span id="r-b2b-return-v">10,000</span></span>
          </div>
        </div>
        <div class="sec-div">Returns Saga Transactions & Rollback logs</div>
        <div class="formula-box" style="background:#05070a; min-height:140px; font-family:monospace; font-size:11.5px;">
          <div id="r-b2b-resilience-logs"></div>
        </div>
        <div class="action-btns">
          <button id="r-b2b-fail-toggle" onclick="rToggleReturnsSaga()">Trigger Returns Saga & Rollback</button>
        </div>
      </div>
    `;
    calcB2B();
  }
}
function initEngagement() {
  const STRATS_B2C = [
    { id: 'missions', cat: 'game', icon: 'ti-map', iconBg: '#E6F1FB', iconColor: '#0C447C', isNew: true, title: 'Missions & challenges', sub: 'Weekly mini-tasks complete karo', why: 'Simple points se zyada engaging — customer ke paas ek goal hota hai. "3 din mein 2 order karo" matches.', steps: ['1 Admin sets weekly challenge targets', '2 Dispatched challenge alert: "+200 pts bonus"', '3 Activity logged, goal completions confirm', '4 Instantly credited bonus points'], impact: 'High', effort: 'Medium', retention: 'Weekly engagement' },
    { id: 'leaderboard', cat: 'game', icon: 'ti-podium', iconBg: '#FFF3D6', iconColor: '#7A4E00', isNew: true, title: 'Leaderboard', sub: 'Top customers ko spotlight do', why: 'Competition is a natural motivator. Top 10 members get additional VIP catalog points values.', steps: ['1 Monthly reset triggers', '2 Manoj checks ranking stats: "You are #47"', '3 Competitive spend patterns boost AOV', '4 Top 10 receive exclusive vouchers'], impact: 'High', effort: 'Low', retention: 'Monthly habit' },
    { id: 'badges', cat: 'game', icon: 'ti-award', iconBg: '#EAF3DE', iconColor: '#27500A', isNew: true, title: 'Achievement badges', sub: 'Milestones pe digital badges do', why: 'Badges are non-monetary rewards with high emotional loyalty value.', steps: ['1 Configure milestone limits (e.g. 10 orders)', '2 Milestone crossed validation checks', '3 Badge unlock celebration popup', '4 badge pins to user profiles'], impact: 'Medium', effort: 'Low', retention: 'Long-term pride' },
    { id: 'ai_reco', cat: 'personal', icon: 'ti-sparkles', iconBg: '#EEEDFE', iconColor: '#3C3489', isNew: true, title: 'AI personalized offers', sub: 'Pasand ke items pe bonus points', why: 'AI Co-pilot parses Customer 360 attributes to pitch category multipliers instead of generic discounts.', steps: ['1 Co-pilot parses profile purchase histories', '2 Custom gRPC calculations triggers', '3 Dispatch custom offer alerts (2x points on Serums)', '4 Trace response conversion tracking'], impact: 'Very High', effort: 'Medium', retention: 'Ongoing' },
    { id: 'birthday_exp', cat: 'personal', icon: 'ti-cake', iconBg: '#FBEAF0', iconColor: '#72243E', isNew: false, title: 'Birthday Experience Month', sub: 'Birthday month mein double earning rates', why: 'Celebrating birthdays over a full month yields 7x higher conversions than single-day cards.', steps: ['1 DOB month matches system time', '2 Double points multipliers unlocked', '3 Special WhatsApp greeting sent', '4 Post-birthday refilling reminders'], impact: 'High', effort: 'Low', retention: 'Annual delight' },
    { id: 'community', cat: 'community', icon: 'ti-message-circle', iconBg: '#E1F5EE', iconColor: '#085041', isNew: true, title: 'Loyalty community forum', sub: 'VIP forum and community groups', why: 'Active community forum users spend 40% more and display double the lifetime retention rate.', steps: ['1 Join exclusive member-only group space', '2 Earn points by answering member posts (+10 pts)', '3 Exclusive behind-the-scenes content drops', '4 Monthly webinar events checkin'], impact: 'Very High', effort: 'High', retention: 'Strongest lock-in' },
    { id: 'referral_chain', cat: 'community', icon: 'ti-share', iconBg: '#FAECE7', iconColor: '#712B13', isNew: true, title: 'Referral chain bonus', sub: 'Multi-level referral network bonus', why: 'Network effects from 2-level referrals grow acquisition speed exponentially without scaling ad spend.', steps: ['1 Manoj invites Friend B (+50 pts)', '2 Friend B invites Friend C (+50 to B, +25 to Manoj)', '3 Friend C invites Friend D (rewards trickle up)', '4 Member network maps show points trickle'], impact: 'Very High', effort: 'Medium', retention: 'Viral growth' },
    { id: 'surprise', cat: 'surprise', icon: 'ti-confetti', iconBg: '#FFF3D6', iconColor: '#7A4E00', isNew: true, title: 'Random surprise drops', sub: 'Unexpected points deposits', why: 'Surprise rewards trigger 3x more dopamine than expected discounts, keeping user app opens active.', steps: ['1 Cron schedules random active triggers', '2 Filter premium Bronze/Silver cohorts', '3 Push alert: "+75 points surprise drop!"', '4 Manoj checks balance instantly upgraded'], impact: 'High', effort: 'Very Low', retention: 'App opens daily' },
    { id: 'loot_box', cat: 'surprise', icon: 'ti-box', iconBg: '#FCE4EC', iconColor: '#880E4F', isNew: true, title: 'Mystery reward box', sub: 'Mystery boxes on RM 100+ orders', why: 'Gamification suspense prompts higher cart sizes to unlock random point or free-shipping rewards.', steps: ['1 Manoj checks checkout value >= RM 100', '2 App displays mystery box unlock alert', '3 Tap-to-open celebration screens', '4 Point reward balances update (random allocation)'], impact: 'High', effort: 'Medium', retention: 'Order frequency up' },
    { id: 'winback_personal', cat: 'personal', icon: 'ti-heart', iconBg: '#FCEBEB', iconColor: '#791F1F', isNew: false, title: 'Personal win-back message', sub: 'Refill warnings for dormant profiles', why: 'Replacing generic winback texts with actual replenishment alerts yields 3x higher responses.', steps: ['1 segmentation flags profile: "DORMANT"', '2 Retrieve product last ordered (refill schedule)', '3 Send: "Refill time for your Aloe Gel! +60 bonus"', '4 Conversion updates status to Active'], impact: 'High', effort: 'Low', retention: 'Re-activation' },
    { id: 'expiry_nudge', cat: 'retention', icon: 'ti-clock-exclamation', iconBg: '#FAEEDA', iconColor: '#633806', isNew: false, title: 'Smart Expiry Nudge', sub: 'Urgent loss-aversion notifications', why: 'Loss aversion triggers strong action. Notifying users of expiring point cash values drives instant checkout conversions.', steps: ['1 Daily cron identifies expiring points (Day -30)', '2 Escalates alerts on Day -7 (direct checkout link)', '3 Final 24-hr SMS alert sweeps', '4 Manoj redeems points to prevent loss'], impact: 'Very High', effort: 'Very Low', retention: 'Purchase trigger' },
    { id: 'tier_nudge', cat: 'retention', icon: 'ti-arrow-up-circle', iconBg: '#E1F5EE', iconColor: '#085041', isNew: false, title: 'Tier upgrade countdown', sub: 'Visual target warnings (80% progress)', why: 'Goal gradient effect: Users accelerate spend when they are within 80% of crossing a tier.', steps: ['1 Scanner detects points >= 80% of next tier', '2 Send progress bar notification: "100 pts left!"', '3 Highlight tier perks (Silver free delivery)', '4 Upgrade validation completes checkout'], impact: 'Very High', effort: 'Very Low', retention: 'Spend increase' }
  ];

  const STRATS_B2B = [
    { id: 'mdf_funding', cat: 'mdf', icon: 'ti-speakerphone', iconBg: '#E6F1FB', iconColor: '#0C447C', isNew: true, title: 'MDF Co-Funding Campaigns', sub: 'Co-fund regional events with partners using MDF funds.', why: 'Helps partners leverage accrued MDF budgets for regional lead generation campaigns.', steps: ['1 Partner logs proposal in portal with target metrics', '2 Campaign approval locks up to available MDF balance', '3 Execute campaign (roadshow, webinars, local ads)', '4 Payout released after lead capture auditing'], impact: 'Very High', effort: 'Medium', retention: 'Lead generation focus' },
    { id: 'jbp_align', cat: 'relationship', icon: 'ti-handshake', iconBg: '#FFF3D6', iconColor: '#7A4E00', isNew: true, title: 'Joint Business Planning (JBP)', sub: 'Align annual targets and resource sharing.', why: 'Establishes strong strategic lock-in and defines rebate brackets for Gold/Platinum.', steps: ['1 Partner and account manager draft JBP doc', '2 Define quarterly sales milestones and credit lines', '3 Conduct monthly audits to track performance against plan', '4 Unlock customized rebate bonuses upon compliance'], impact: 'High', effort: 'High', retention: 'Strategic partnership' },
    { id: 'train_certs', cat: 'training', icon: 'ti-school', iconBg: '#EAF3DE', iconColor: '#27500A', isNew: true, title: 'Training Certifications', sub: 'Certify partner staff to sell advanced systems.', why: 'Direct correlation between certified sales teams and partner sales volumes.', steps: ['1 LMS issues courses on new product catalogs', '2 Staff completes certification courses and exams', '3 Certification verified by LMS API', '4 Updates Partner Scorecard (+100 max pts)'], impact: 'Medium', effort: 'Medium', retention: 'Competency-driven' },
    { id: 'rebate_nudge', cat: 'retention', icon: 'ti-trending-up', iconBg: '#EEEDFE', iconColor: '#3C3489', isNew: true, title: 'Rebate Target Nudges', sub: 'Alert partner when they are close to the next rebate tier.', why: 'Accelerates partner buying when they are near upgrade limits (e.g. within 15%).', steps: ['1 Scan partner sales progress (e.g. 85% of Gold)', '2 Portal displays target alert: "RM 20k left for Gold!"', '3 Account manager highlights Gold rebate rate (2% vs 1%)', '4 Partner completes purchases to secure upgrade'], impact: 'High', effort: 'Low', retention: 'Volume boost' },
    { id: 'pay_reward', cat: 'rebates', icon: 'ti-credit-card', iconBg: '#FBEAF0', iconColor: '#72243E', isNew: true, title: 'Payment Incentives', sub: 'Rewards on-time payments to improve cash flows.', why: 'Keeps partner payment discipline high, reducing outstanding accounts receivable.', steps: ['1 Scan invoice payments within credit cycle terms', '2 Calculate payment timeliness ratio (target > 90%)', '3 Assign +150 points to scorecard on compliance', '4 Late payments flag risk warnings'], impact: 'High', effort: 'Low', retention: 'Cash flow health' },
    { id: 'referral_net', cat: 'relationship', icon: 'ti-users', iconBg: '#E1F5EE', iconColor: '#085041', isNew: true, title: 'Dealer Network Referrals', sub: 'Payouts for introducing qualified sub-dealers.', why: 'Expands brand distribution network using existing partner connections.', steps: ['1 Partner generates onboarding link in portal', '2 Sub-reseller registers and undergoes KYC check', '3 Referred partner meets initial Silver tier targets', '4 Flat RM 2,000 credit deposited to referring partner'], impact: 'High', effort: 'Medium', retention: 'Distribution expansion' },
    { id: 'risk_warning', cat: 'retention', icon: 'ti-alert-triangle', iconBg: '#FAECE7', iconColor: '#712B13', isNew: true, title: 'At-Risk Tier Warnings', sub: 'Alert account managers on declining partner sales.', why: 'Prevention of partner churn by identifying sales drops in consecutive quarters.', steps: ['1 Quarterly scan flags sales decline of >25%', '2 Alert generated: "SwiftTrade at risk of Silver downgrade"', '3 Trigger special support discount offering', '4 Grace period active for partner recovery'], impact: 'Very High', effort: 'Medium', retention: 'Churn prevention' },
    { id: 'mdf_toolkit', cat: 'mdf', icon: 'ti-file-text', iconBg: '#FCE4EC', iconColor: '#880E4F', isNew: true, title: 'Co-branded Toolkits', sub: 'Free marketing templates, brochures and catalogs.', why: 'Lowers partner marketing cost and ensures brand consistency.', steps: ['1 Access portal marketing asset library', '2 Customize co-branded flyers with partner logo', '3 System generates print-ready brochures', '4 Tracks downloads to gauge material utility'], impact: 'Medium', effort: 'Low', retention: 'Operational ease' }
  ];

  let engCat = 'all';
  let engSel = activeMode === 'b2c' ? 'missions' : 'mdf_funding';

  function render() {
    const STRATS = activeMode === 'b2c' ? STRATS_B2C : STRATS_B2B;
    const filtered = engCat === 'all' ? STRATS : STRATS.filter(s => s.cat === engCat);
    const sel = STRATS.find(s => s.id === engSel) || STRATS[0];

    const categories = activeMode === 'b2c' ? [
      { id: 'all', label: 'Sab dekho' },
      { id: 'game', label: 'Gamification' },
      { id: 'personal', label: 'Personalization' },
      { id: 'community', label: 'Community' },
      { id: 'surprise', label: 'Surprise' },
      { id: 'retention', label: 'Retention' }
    ] : [
      { id: 'all', label: 'Sab dekho' },
      { id: 'mdf', label: 'MDF & Co-marketing' },
      { id: 'rebates', label: 'Rebates & Incentives' },
      { id: 'training', label: 'Training & Certs' },
      { id: 'relationship', label: 'Relationship & JBPs' },
      { id: 'retention', label: 'Retention & Grace' }
    ];

    const catTabsHtml = categories.map(c => `
      <div class="ctab ${engCat === c.id ? 'sel' : ''}" 
           onclick="engSetCat('${c.id}')" 
           style="${engCat === c.id ? 'background:#1E2761; border-color:#1E2761; color:#fff;' : ''}">
        ${c.label}
      </div>
    `).join('');

    const gridHtml = filtered.map(s => `
      <div class="scard ${engSel === s.id ? 'sel' : ''}" 
           onclick="engSelect('${s.id}')" 
           style="${engSel === s.id ? `border-color:var(--color-primary); background:rgba(99,102,241,0.08)` : ''}">
        <div class="scard-icon" style="background:${s.iconBg}; color:${s.iconColor}"><i class="ti ${s.icon}"></i></div>
        <div class="scard-title">${s.title} ${s.isNew ? '<span class="new-pill" style="font-size:8px; background:var(--color-coral); color:#fff; border-radius:3px; padding:1px 3px; margin-left:3px;">NEW</span>' : ''}</div>
        <div class="scard-sub">${s.sub}</div>
      </div>
    `).join('');

    let detailHtml = '';
    if (sel) {
      const stepsHtml = sel.steps.map((st, i) => `
        <div class="hs">
          <div class="hs-line">
            <div class="hs-dot" style="background:var(--color-primary)">${i + 1}</div>
            ${i < sel.steps.length - 1 ? '<div class="hs-conn"></div>' : ''}
          </div>
          <div class="hs-body">
            <div class="hs-l">${st.split('(')[0]}</div>
            <div class="hs-t" style="color:var(--text-muted);">${st.split('(')[1] ? st.split('(')[1].replace(')', '') : ''}</div>
          </div>
        </div>
      `).join('');

      detailHtml = `
        <div class="detail-card">
          <div class="detail-header">
            <div class="scard-icon" style="background:${sel.iconBg}; color:${sel.iconColor}; width:40px; height:40px; font-size:20px;">
              <i class="ti ${sel.icon}"></i>
            </div>
            <div>
              <h3 style="color:#fff;">${sel.title}</h3>
              <p>${sel.sub}</p>
            </div>
          </div>
          
          <div class="why-box" style="background:rgba(99,102,241,0.08); border-left:3px solid var(--color-primary); color:var(--text-muted)">
            <strong>Kyun karein?</strong> ${sel.why}
          </div>

          <div class="sect-label">Kaise kaam karta hai</div>
          <div class="how-steps">${stepsHtml}</div>

          <div class="meta-row">
            <div class="meta-cell">
              <div class="meta-l">Business impact</div>
              <div class="meta-v" style="font-family:sans-serif; color:var(--color-teal);">${sel.impact}</div>
            </div>
            <div class="meta-cell">
              <div class="meta-l">Effort</div>
              <div class="meta-v" style="font-family:sans-serif; color:var(--color-amber);">${sel.effort}</div>
            </div>
            <div class="meta-cell">
              <div class="meta-l">Retention Loop</div>
              <div class="meta-v" style="font-family:sans-serif; color:var(--color-cyan);">${sel.retention}</div>
            </div>
          </div>
        </div>
      `;
    }

    document.getElementById('engagement-wrap').innerHTML = `
      <div class="sect-label">Category Choose Karo</div>
      <div class="cat-tabs">${catTabsHtml}</div>

      <div class="sect-label">Strategies Grid (${STRATS.length} Strategies)</div>
      <div class="strat-grid" style="grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));">
        ${gridHtml}
      </div>

      <div class="sect-label" style="margin-top:18px;">Strategy Core Details</div>
      <div id="eng-detail-card">${detailHtml}</div>
    `;
  }

  window.engSetCat = (cat) => {
    engCat = cat;
    render();
  };
  window.engSelect = (id) => {
    engSel = id;
    render();
  };
  render();
}

// ==========================================================================
// PAGE 8: RENEWAL & EXPIRY SCENARIOS (INTERACTIVE STEPPER FROM REFERENCE)
// ==========================================================================
function initRenewal() {
  let renMode = activeMode === 'b2c' ? 'points' : 'rebate_expiry';
  let renStep = 0;

  const SCENARIOS_B2C = {
    points: [
      {
        color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Points Expiry Policy',
        title: 'Points ka ek validity window expiry check hota hai',
        eng: 'Points validity period config settings checks',
        body: 'Loyalty configuration registers points TTL limits checks (usually 12 months from deposit). un-redeemed points automatically cancel and update values to zero.',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'Settings: points_expiry_ttl = 12 months' },
        chips: [{ l: 'Loss aversion engine', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      },
      {
        color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Day -30 Soft reminder',
        title: 'Automation scans points balances checks warning dispatch',
        eng: 'Cron scans balances expiring within 30 days',
        body: 'WhatsApp message alerts Manoj: \"Manoj, your 500 points (RM 5 value) are expiring in 30 days. Click here to use them.\"',
        hl: { bg: '#FAEEDA', color: '#633806', text: '30-day window: personalized notifications' },
        chips: [{ l: 'WhatsApp Send', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
      },
      {
        color: '#A32D2D', bbg: '#FCEBEB', btc: '#791F1F', badge: 'Day -7 Urgent reminder',
        title: 'Urgent reminder warnings with checkout links',
        eng: 'Direct order links bypass checkout friction',
        body: 'Alert prompts escalated warnings: \"URGENT: 500 points expire in 7 days! checkout here now.\" direct checkout links are loaded.',
        hl: { bg: '#FCEBEB', color: '#791F1F', text: 'Direct link bypass: zero-friction ordering' },
        chips: [{ l: 'Urgent SMS', bg: '#FCEBEB', c: '#791F1F', b: '#F09595' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Active options',
        title: 'Manoj saves points using 3 active paths',
        eng: '3 options: Redeem, active earn, or grace extensions',
        body: 'Manoj can save points by:\n1. checkout order redemption\n2. review or referral earn activities (+expiry date resets)\n3. customer support extension requests',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Any earn activity resets expiry window TTL' },
        chips: [{ l: 'Redeem now', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#3C3489', bbg: '#EEEDFE', btc: '#26215C', badge: 'Post-expiry',
        title: 'Points expire and win-back runs',
        eng: 'Wallet ledger cleans expired points automatically',
        body: 'Wallet ledger balance modifications sets balance = 0. system writes EXPIRED_TX. Win-back automation dispatches promo codes: \"Points expired? Order today for 2x points comeback bonus!\"',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'Cleanup task complete. Winback campaign launched.' },
        chips: [{ l: 'Expired cleanup', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      }
    ],
    tier: [
      {
        color: '#185FA5', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Tier Status Maintenance',
        title: 'Annual qualification check',
        eng: 'Rolling 12-months validation runs',
        body: 'Member tiers valid for 12 months. System evaluations verify if Manoj earned 500 points (Silver maintenance threshold) during this cycle.',
        hl: { bg: '#E6F1FB', color: '#0C447C', text: 'Settings: tier_evaluation_cycle = 12 months' },
        chips: [{ l: 'Rolling check', bg: '#E6F1FB', c: '#0C447C', b: '#85B7EB' }]
      },
      {
        color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Day -60 Warning',
        title: 'Progress indicators alerts dispatched',
        eng: 'Show visual points gap metrics',
        body: 'Automation prompts Manoj: \"Your Silver Tier expires in 60 days. You need 100 points more to secure Silver multiplier perks. Order today!\"',
        hl: { bg: '#FAEEDA', color: '#633806', text: 'Gold/Silver target goals prompts' },
        chips: [{ l: 'Campaign push', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Tier successfully renewed',
        title: 'Manoj hits target limits and retains tier',
        eng: 'Anniversary date extends 12 months',
        body: 'Threshold crossed check: Manoj points >= 500. system updates anniversary timestamp values, maintains Silver 1.5x multiplier.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Silver tier status secured' },
        chips: [{ l: 'Renewed', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#993C1D', bbg: '#FAECE7', btc: '#712B13', badge: 'Tier downgrade',
        title: 'Kind status downgrade',
        eng: 'One status downgrade limit checks',
        body: 'If Manoj missing points target: System downgrades tier status Silver to Bronze. Kind template messages explain active Bronze benefits + comeback paths.',
        hl: { bg: '#FAECE7', color: '#712B13', text: 'Upgrade/Downgrade transitions logged' },
        chips: [{ l: 'Bronze downgraded', bg: '#FAECE7', c: '#712B13', b: '#F0997B' }]
      },
      {
        color: '#3B6D11', bbg: '#EAF3DE', btc: '#27500A', badge: 'Grace period',
        title: '30-day grace period buffer',
        eng: 'Maintain perks during buffer weeks',
        body: 'Manoj retains Silver status benefits for 30 additional days grace period to recover points gap, reducing brand churn rates.',
        hl: { bg: '#EAF3DE', color: '#27500A', text: 'Grace period: Churn prevention standard' },
        chips: [{ l: '30-day grace', bg: '#EAF3DE', c: '#27500A', b: '#97C459' }]
      }
    ],
    member: [
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Paid membership scenario',
        title: 'Paid subscription options',
        eng: 'Free membership auto-renews, paid subscription billing checks',
        body: 'Standard member enrollment is free. Paid VIP tiers (e.g. Amazon Prime style) require billing integrations with Stripe/Braintree.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Stripe webhook triggers subscription renewals' },
        chips: [{ l: 'Paid checkout renewal', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Free tier deactivation',
        title: 'Free member status deactivations',
        eng: 'Deactivation occurs only on manual exits or extreme inactivity',
        body: 'Standard free accounts stay active forever. deactivation occurs if Manoj manually opts out or 3 years zero-activity dormancy thresholds cross.',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'Dormancy sweep cron: Daily midnight' },
        chips: [{ l: 'Manual exit', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      },
      {
        color: '#C07B00', bbg: '#FFF3D6', btc: '#7A4E00', badge: 'Paid billing cycles',
        title: 'VIP billing billing check runs',
        eng: 'Renew billing prompts starts Day -60',
        body: 'Annual billing anniversary alerts: Day -60, -30, -7 reminders with calculated loyalty values (\"You saved RM 320 this year!\"). Auto-renewal billing executes on Day 0.',
        hl: { bg: '#FFF3D6', color: '#7A4E00', text: 'Stripe subscription cycle triggers' },
        chips: [{ l: 'Stripe billing', bg: '#FFF3D6', c: '#7A4E00', b: '#E8B84B' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Renewal successful',
        title: 'Settle subscription payment success',
        eng: 'Extend VIP entitlement variables 12 months',
        body: 'Stripe confirms invoice settlement. Dispatches +500 points renewal bonus. VIP status extended.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Invoice paid: +500 pts credited' },
        chips: [{ l: 'VIP active', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#D4537E', bbg: '#FBEAF0', btc: '#72243E', badge: 'Non-renewal fallback',
        title: 'Graceful VIP downgrade fallback',
        eng: 'VIP perks disabled, revert profile to free tier',
        body: 'If billing fails: downgrade Manoj to free tier status. Keep profile data history, and send trial coupon re-activation marketing links.',
        hl: { bg: '#FBEAF0', color: '#72243E', text: 'Downgrade complete. Profile stored.' },
        chips: [{ l: 'VIP disabled', bg: '#FBEAF0', c: '#72243E', b: '#ED93B1' }]
      }
    ]
  };

  const SCENARIOS_B2B = {
    rebate_expiry: [
      {
        color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Rebate Expiry Policy',
        title: 'Rebate credits ki 12-month validity check hoti hai',
        eng: 'Rebate credits validity period settings check',
        body: 'Loyalty settings register config for rebate credits TTL (usually 12 months). Unused credits are flagged for automated expiry processing.',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'Settings: rebate_expiry_ttl = 12 months' },
        chips: [{ l: 'Expiry Engine scan', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      },
      {
        color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Day -30 Soft Warning',
        title: 'Cron job scans balances and triggers email warnings',
        eng: 'Partner notified via portal and automated email alerts',
        body: 'Email notification dispatches to SwiftTrade CFO: \"Your RM 5,000 rebate credit is expiring in 30 days. Apply it to your next order to save cash.\"',
        hl: { bg: '#FAEEDA', color: '#633806', text: '30-day window: CFO automated alerts' },
        chips: [{ l: 'Email & Push sent', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
      },
      {
        color: '#A32D2D', bbg: '#FCEBEB', btc: '#791F1F', badge: 'Day -7 Urgent Reminder',
        title: 'Urgent reminder warnings with checkout links',
        eng: 'Account manager triggers direct call and checkout reminder',
        body: 'Alert prompts escalated warning: \"URGENT: RM 5,000 rebate credits expire in 7 days! Checkout your stock order now to redeem.\"',
        hl: { bg: '#FCEBEB', color: '#791F1F', text: 'Direct checkout link: prevent credit loss' },
        chips: [{ l: 'Urgent SMS/Email', bg: '#FCEBEB', c: '#791F1F', b: '#F09595' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Credits Redeemed',
        title: 'Partner orders inventory and redeems credits',
        eng: 'Deduct credits from wallet and adjust invoice subtotal',
        body: 'SwiftTrade places stock order. Expiry engine checks, deducts RM 5,000 rebate credit from active wallet, and updates payable invoice.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Rebate credit applied to checkout invoice' },
        chips: [{ l: 'Redeemed & reset', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#3C3489', bbg: '#EEEDFE', btc: '#26215C', badge: 'Post-Expiry Campaign',
        title: 'Credits expire and winback campaign starts',
        eng: 'Ledger debits expired credits and sends re-activation bonus',
        body: 'If credits expire: Balance debited to 0 with EXPIRED_REBATE transaction. System fires winback: \"Expired rebate? Commit to next target and get +5% rebate boost!\"',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'Expired credits cleared. Winback email sent.' },
        chips: [{ l: 'Re-activation campaign', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      }
    ],
    annual_tier: [
      {
        color: '#185FA5', bbg: '#E6F1FB', btc: '#0C447C', badge: 'Annual Review',
        title: 'Rolling 12-months purchase validation runs',
        eng: 'Verify partner annual purchase volumes',
        body: 'B2B partner tiers are valid for 12 months. System evaluates if Mega Distributors met the RM 100k target to maintain Silver tier multiplier.',
        hl: { bg: '#E6F1FB', color: '#0C447C', text: 'Settings: tier_review_cycle = 12 months' },
        chips: [{ l: 'Rolling audit', bg: '#E6F1FB', c: '#0C447C', b: '#85B7EB' }]
      },
      {
        color: '#BA7517', bbg: '#FAEEDA', btc: '#633806', badge: 'Day -60 Warning',
        title: 'Sales progress indicator alerts sent',
        eng: 'Portal displays target gap to maintain tier perks',
        body: 'Automation prompts Mega Distributors: \"Your Silver tier expires in 60 days. You need RM 10,000 sales to secure Silver rebate rates next year.\"',
        hl: { bg: '#FAEEDA', color: '#633806', text: 'Sales target gap: RM 10,000 remaining' },
        chips: [{ l: 'Portal alert', bg: '#FAEEDA', c: '#633806', b: '#EF9F27' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Tier Renewed',
        title: 'Mega Distributors hits target and extends tier',
        eng: 'Tier anniversary date extended 12 months',
        body: 'Sales target met check: Annual purchases >= RM 100k. Anniversary timestamp extended, maintaining Silver 1% rebate status.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Silver status secured for next 12 months' },
        chips: [{ l: 'Status Renewed', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#993C1D', bbg: '#FAECE7', btc: '#712B13', badge: 'Tier Downgrade',
        title: 'Graceful tier downgrade transition runs',
        eng: 'One status downgrade limit checks',
        body: 'If partner misses target: System demotes Mega Distributors Silver to Inactive. Portal displays instructions to regain Silver status.',
        hl: { bg: '#FAECE7', color: '#712B13', text: 'Downgraded to Inactive (0% rebates)' },
        chips: [{ l: 'Status: Inactive', bg: '#FAECE7', c: '#712B13', b: '#F0997B' }]
      },
      {
        color: '#3B6D11', bbg: '#EAF3DE', btc: '#27500A', badge: '30-day Grace Period',
        title: '30-day grace period buffer active',
        eng: 'Maintain active benefits during buffer weeks',
        body: 'Mega Distributors retains Silver rebate perks for 30 additional days grace period to make up the sales gap and protect margins.',
        hl: { bg: '#EAF3DE', color: '#27500A', text: 'Grace period active: 30 days buffer' },
        chips: [{ l: 'Grace period', bg: '#EAF3DE', c: '#27500A', b: '#97C459' }]
      }
    ],
    contract_renewal: [
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Expiry Audit',
        title: 'Annual commercial contract renewal check',
        eng: 'Audit contract anniversary dates in CRM',
        body: 'CRM audits contract anniversary date for ProBuild Supply. System flags expiry triggers at Day -90 to initiate negotiations.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Settings: contract_duration = 12 months' },
        chips: [{ l: 'Expiry audit', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#534AB7', bbg: '#EEEDFE', btc: '#3C3489', badge: 'Day -60 Negotiations',
        title: 'Account manager starts commercial reviews',
        eng: 'Joint Business Planning and target negotiation sessions',
        body: 'Sales manager triggers meetings: review YoY growth, align on new quarterly target milestones (RM 300k), and credit terms.',
        hl: { bg: '#EEEDFE', color: '#3C3489', text: 'JBP negotiation window open' },
        chips: [{ l: 'JBP negotiation', bg: '#EEEDFE', c: '#3C3489', b: '#AFA9EC' }]
      },
      {
        color: '#C07B00', bbg: '#FFF3D6', btc: '#7A4E00', badge: 'Day -30 Draft Signed',
        title: 'Partner signs digitised commercial contract',
        eng: 'Digital signature validates updated terms & conditions',
        body: 'ProBuild Supply signs updated JBP contract via DocuSign. Rates, credits, and target commitments are committed to SQL system.',
        hl: { bg: '#FFF3D6', color: '#7A4E00', text: 'Contract signed. Rules scheduled.' },
        chips: [{ l: 'Contract signed', bg: '#FFF3D6', c: '#7A4E00', b: '#E8B84B' }]
      },
      {
        color: '#1D9E75', bbg: '#E1F5EE', btc: '#085041', badge: 'Contract Renewed',
        title: 'Contract successfully renewed for 12 months',
        eng: 'Entitlements extended, loyalty bonus credited',
        body: 'Invoice/ledger status updates: active for next 12 months. Dispatches +1,000 loyalty points renewal bonus. Rebate rate locks.',
        hl: { bg: '#E1F5EE', color: '#085041', text: 'Contract active. +1000 pts bonus.' },
        chips: [{ l: 'Active & Credited', bg: '#E1F5EE', c: '#085041', b: '#5DCAA5' }]
      },
      {
        color: '#D4537E', bbg: '#FBEAF0', btc: '#72243E', badge: 'Contract Suspended',
        title: 'Commercial fallback triggers suspension',
        eng: 'Negotiation failure disables portal access and rebates',
        body: 'If renewal negotiation fails or expires: account is set to DORMANT. Disables rebate engines, co-marketing MDF programs, and partner portal access.',
        hl: { bg: '#FBEAF0', color: '#72243E', text: 'Dormant status: features suspended' },
        chips: [{ l: 'Suspended', bg: '#FBEAF0', c: '#72243E', b: '#ED93B1' }]
      }
    ]
  };

  function render() {
    const SCENARIOS = activeMode === 'b2c' ? SCENARIOS_B2C : SCENARIOS_B2B;
    const steps = SCENARIOS[renMode] || SCENARIOS[Object.keys(SCENARIOS)[0]];
    const total = steps.length;

    const progHtml = steps.map((step, i) => `
      <div class="prog-dot" 
           style="background:${i < renStep ? 'var(--color-teal)' : i === renStep ? step.color : 'var(--border-color)'}" 
           onclick="renJumpStep(${i})">
        ${i + 1}
      </div>
      ${i < total - 1 ? `<div class="prog-line ${i < renStep ? 'done' : ''}"></div>` : ''}
    `).join('');

    const s = steps[renStep] || steps[0];
    const chipsHtml = s.chips.map(c => `
      <div class="chip" style="background:${c.bg}; color:${c.c}; border-color:${c.b}">
        ${c.l}
      </div>
    `).join('');

    document.getElementById('ren-detail-body').innerHTML = `
      <div class="prog">${progHtml}</div>
      <div class="scard-wrap">
        <div class="step-badge" style="background:${s.bbg}; color:${s.btc}">${s.badge}</div>
        <div class="step-title">${s.title}</div>
        <div class="step-eng">${s.eng}</div>
        <div class="step-body">${s.body.replace(/\n/g, '<br>')}</div>
        <div class="step-hl" style="background:${s.hl.bg}; color:${s.hl.color}">${s.hl.text}</div>
        <div class="step-chips">${chipsHtml}</div>
      </div>
      <div class="nav-row">
        <button class="btn-prev" ${renStep === 0 ? 'disabled' : ''} onclick="renGo2(-1)">← Peeche</button>
        <span class="step-ctr">Step ${renStep + 1} of ${total}</span>
        <button class="btn-next" onclick="renGo2(1)">
          ${renStep === total - 1 ? 'Finish ✓' : 'Next Step →'}
        </button>
      </div>
    `;
  }

  // Expose global variables
  window.renSetActive = (key) => {
    renMode = key;
    renStep = 0;
    document.querySelectorAll('.r-btn-sc').forEach(b => {
      b.classList.remove('active');
    });
    document.getElementById(`ren-btn-${key}`).classList.add('active');
    render();
  };
  window.renGo2 = (d) => {
    const SCENARIOS = activeMode === 'b2c' ? SCENARIOS_B2C : SCENARIOS_B2B;
    if (renStep + d >= 0 && renStep + d < SCENARIOS[renMode].length) {
      renStep += d;
      render();
    }
  };
  window.renJumpStep = (i) => {
    renStep = i;
    render();
  };

  const tabsHtml = activeMode === 'b2c' ? `
    <div class="r-btn-sc e-chip active" id="ren-btn-points" onclick="renSetActive('points')">
      <i class="ti ti-calendar-time"></i> Points Expiry Loop
    </div>
    <div class="r-btn-sc e-chip" id="ren-btn-tier" onclick="renSetActive('tier')">
      <i class="ti ti-star"></i> Tier Status Maintenance
    </div>
    <div class="r-btn-sc e-chip" id="ren-btn-member" onclick="renSetActive('member')">
      <i class="ti ti-credit-card"></i> Paid Subscription Renewal
    </div>
  ` : `
    <div class="r-btn-sc e-chip active" id="ren-btn-rebate_expiry" onclick="renSetActive('rebate_expiry')">
      <i class="ti ti-calendar-time"></i> Rebate Expiry Loop
    </div>
    <div class="r-btn-sc e-chip" id="ren-btn-annual_tier" onclick="renSetActive('annual_tier')">
      <i class="ti ti-star"></i> Tier Status Maintenance
    </div>
    <div class="r-btn-sc e-chip" id="ren-btn-contract_renewal" onclick="renSetActive('contract_renewal')">
      <i class="ti ti-credit-card"></i> Contract Renewal Scenarios
    </div>
  `;

  document.getElementById('renewal-wrap').innerHTML = `
    <div class="sect-label">Kaun si renewal flow dekhni hai?</div>
    <div class="earn-chips">
      ${tabsHtml}
    </div>

    <div id="ren-detail-body" class="detail-card" style="margin-top:16px;"></div>
  `;
  render();
}
