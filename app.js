/* ==========================================================================
   REBUILT PRESENTATION SYSTEM JAVASCRIPT - INTERACTIVE ENGINE
   ========================================================================== */

const TIERS = {
  bronze: { label: 'Bronze (1x)', mult: 1.0, color: '#CD7F32', bg: '#FDF3E8', nextThreshold: 500, nextName: 'Silver' },
  silver: { label: 'Silver (1.5x)', mult: 1.5, color: '#888780', bg: '#F5F5F5', nextThreshold: 2000, nextName: 'Gold' },
  gold: { label: 'Gold (2x)', mult: 2.0, color: '#BA7517', bg: '#FFF8DC', nextThreshold: 5000, nextName: 'Platinum' },
  platinum: { label: 'Platinum (3x)', mult: 3.0, color: '#185FA5', bg: '#EEF2FF', nextThreshold: null, nextName: null }
};

// State trackers
let initialized = {};
let activeTheme = 'dark';

// Global tab routing
function showPage(id) {
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
    script: "Aaiye Manoj Kumar ki journey shuru karte hain. Hum dekhenge ki kaise ek customer register hone se lekar billing, referrals, reviews, tier upgrade, points redemption, cancellations aur refund tak hamare loyalty systems ke sath interact karta hai."
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
    script: "Sabse pehle Manoj store par counter QR scan karta hai. Scan karte hi entry points service active hoti hai aur acquisition metrics save karti hai."
  },
  {
    title: "Manoj Registers & Customer 360 Card Creation",
    short: "03. Profile Registration",
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
    script: "Manoj details submit karta hai. Customer 360 database profile create karta hai aur unique Loyalty Card number LYL-MK998 Bronze status ke sath lock kar deta hai."
  },
  {
    title: "Welcome Bonus Delights Manoj (Instant Hook)",
    short: "04. Welcome Onboarding",
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
    script: "System join check matching verify karke instantly wallet accounts mein welcome points deposit karta hai, aur campaigns engine automatic welcome WhatsApp nudge trigger karta hai."
  },
  {
    title: "Manoj's First Purchase (Points Calculation)",
    short: "05. First Purchase",
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
    script: "Manoj counter par RM 200 spent checkout order karta hai. Earning engine Bronze 1x rules coordinate calculations run karke +200 points ledger entry add karta hai."
  },
  {
    title: "Manoj refers friend Rahul (Organic Acquisition)",
    short: "06. Friend Referral",
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
    script: "Advocacy programs verification checks run: Manoj link share karta hai, Rahul joins, system checks pass, Manoj ko +50 points referral bonus active milta hai, balance gets 350."
  },
  {
    title: "Product Review Submission (Engagement)",
    short: "07. Product Review",
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
    script: "Manoj app par verified products par product reviews feedback details submit karta hai. Anti-spam checks verify parameters pass hotey hi system use +20 points reward deta hai."
  },
  {
    title: "Instagram Product Share (Social Integration)",
    short: "08. Social Share",
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
    script: "Manoj app button click social media share complete verifies. listen events points engine process trigger karke +15 points adds, wallet updates to 385."
  },
  {
    title: "Cumulative 500+ Points: Silver Status Upgrade",
    short: "09. Silver Upgrade",
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
    script: "Manoj spends RM 150 purchase, lifetime points touch 535. Tier engine detects upgrade milestones settings automatically updates Silver status badge."
  },
  {
    title: "Shopping as a Silver Member (Earning Boost)",
    short: "10. Silver Earning",
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
    script: "Manoj Silver members status checks active, RM 100 purchase checkout spent triggers 1.5x speed multiplier, earning +150 points, wallet updates to 685."
  },
  {
    title: "Points Redemption (Checkout Discount)",
    short: "11. Redemption Start",
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
    script: "Manoj has accumulated points. Checkout time points checkout apply select option ticks, triggers redemption cash discount options validations."
  },
  {
    title: "Applying the 20% Redemption Capping Guardrail",
    short: "12. Redemption Cap",
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
    script: "Margin protection rules apply: 20% cart cap limit check runs. Manoj redeems 600 points (RM 6 discount value) payable drops RM 94.00, wallet balance is 85 points."
  },
  {
    title: "Stockout Order Cancellation: Points Refund",
    short: "13. Cancel & Refund",
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
    script: "Billing cancellation checks run: catalog out of stock error occurs. points engine compensation trigger automatically refunds points back to wallet."
  },
  {
    title: "Weekly Missions & Challenges (Gamification)",
    short: "14. Mission Bonus",
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
    script: "Gamified mission sweeps: Manoj week target complete, mission engine signals points engine, credits +200 bonus, wallet registers 885."
  },
  {
    title: "Birthday celebration & Surprise Drops",
    short: "15. Birthday & Surprise",
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
    script: "Birthday scan matching matches DOB columns, credits 100 points. Separately, weekend campaign drops 50 points, wallet becomes 1035."
  },
  {
    title: "Manoj goes Inactive: Dormancy Tagging",
    short: "16. Dormancy Warning",
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
    script: "Manoj shopping gap touches 45 days. system tags profile segment to DORMANT, triggering re-engagement automated queues."
  },
  {
    title: "Points Expiry Warnings (WhatsApp Nudge)",
    short: "17. Expiry Nudge",
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
    script: "Points expiry settings trigger reminder notifications, showing Manoj the cash value RM 10.35 at risk of being lost."
  },
  {
    title: "Points Expired & Tier Status Grace Buffer",
    short: "18. Expiry & Grace",
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
    script: "1 saal hone par points zero ho jate hain points clean sweep trigger hone se. Par uski status level system immediate down nahi karta, use 30-day grace period status retention period milta."
  }
];

function initTechPresentation() {
  renderSlide();
}

function renderSlide() {
  const container = document.getElementById('presentation-wrap');
  if (!container) return;

  const total = PRES_SLIDES.length;
  const s = PRES_SLIDES[presSlideIndex];

  // Render a split screen layout
  container.innerHTML = `
    <div class="pres-layout">
      <!-- Left sidebar slide navigator -->
      <div class="pres-slide-nav" style="max-height: 580px;">
        <div class="sect-label" style="margin-bottom:6px; padding-left:4px;">Journey Slides</div>
        ${PRES_SLIDES.map((slide, idx) => `
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
                    Manoj's Experience (CX)
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
                    Points Math & Rules
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
              ${PRES_SLIDES.map((_, idx) => `
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
  if (presSlideIndex === 4) {
    window.simSlide5Calc = () => {
      const val = parseInt(document.getElementById('sim-slide5-spend').value);
      document.getElementById('sim-slide5-spend-v').textContent = 'RM ' + val;
      document.getElementById('sim-slide5-out-spend').textContent = 'RM ' + val;
      document.getElementById('sim-slide5-out-pts').textContent = '+' + val + ' pts';
    };
    window.simSlide5Calc();
  }
  if (presSlideIndex === 8) {
    window.simSlide9Calc = () => {
      const val = parseInt(document.getElementById('sim-slide9-points').value);
      document.getElementById('sim-slide9-points-v').textContent = val + ' pts';
      const card = document.getElementById('sim-slide9-card');
      const tierEl = document.getElementById('sim-slide9-card-tier');
      const multEl = document.getElementById('sim-slide9-card-mult');
      if (val >= 500) {
        card.style.background = 'linear-gradient(135deg, #1e293b, #0f172a)';
        card.style.borderColor = 'var(--color-cyan)';
        card.style.boxShadow = 'var(--glow-cyan)';
        tierEl.textContent = 'Silver Elite';
        tierEl.style.color = 'var(--color-cyan)';
        multEl.textContent = '1.5x speed multiplier active';
      } else {
        card.style.background = 'linear-gradient(135deg, #271a15, #140d0a)';
        card.style.borderColor = '#CD7F32';
        card.style.boxShadow = 'none';
        tierEl.textContent = 'Bronze Member';
        tierEl.style.color = '#CD7F32';
        multEl.textContent = '1.0x base speed multiplier';
      }
    };
    window.simSlide9Calc();
  }
  if (presSlideIndex === 9) {
    window.simSlide10Calc = () => {
      const val = parseInt(document.getElementById('sim-slide10-spend').value);
      const tier = document.getElementById('sim-slide10-tier').value;
      document.getElementById('sim-slide10-spend-v').textContent = 'RM ' + val;
      document.getElementById('sim-slide10-out-spend').textContent = 'RM ' + val;
      const mult = { bronze: 1.0, silver: 1.5, gold: 2.0, platinum: 3.0 }[tier];
      document.getElementById('sim-slide10-out-mult').textContent = mult.toFixed(1) + 'x';
      const pts = Math.round(val * mult);
      document.getElementById('sim-slide10-out-pts').textContent = '+' + pts + ' pts';
    };
    window.simSlide10Calc();
  }
  if (presSlideIndex === 11) {
    window.simSlide11Calc = () => {
      const total = parseInt(document.getElementById('sim-slide11-total').value);
      const wallet = parseInt(document.getElementById('sim-slide11-wallet').value);
      document.getElementById('sim-slide11-total-v').textContent = 'RM ' + total;
      document.getElementById('sim-slide11-wallet-v').textContent = wallet + ' pts';
      const maxDiscount = +(total * 0.20).toFixed(2);
      const maxPts = Math.round(maxDiscount * 100);
      const ptsDeducted = Math.min(wallet, maxPts);
      const discountVal = +(ptsDeducted / 100).toFixed(2);
      const payable = total - discountVal;
      document.getElementById('sim-slide11-out-cap').textContent = 'RM ' + maxDiscount.toFixed(2) + ' (' + maxPts.toLocaleString() + ' pts)';
      document.getElementById('sim-slide11-out-pts').textContent = ptsDeducted.toLocaleString() + ' pts';
      document.getElementById('sim-slide11-out-disc').textContent = 'RM ' + discountVal.toFixed(2);
      document.getElementById('sim-slide11-out-payable').textContent = 'RM ' + payable.toFixed(2);
    };
    window.simSlide11Calc();
  }
}

window.presGo = (d) => {
  if (presSlideIndex + d >= 0 && presSlideIndex + d < PRES_SLIDES.length) {
    presSlideIndex += d;
    renderSlide();
  } else if (presSlideIndex + d === PRES_SLIDES.length) {
    presSlideIndex = 0;
    renderSlide();
  }
};

window.presJump = (idx) => {
  if (idx >= 0 && idx < PRES_SLIDES.length) {
    presSlideIndex = idx;
    renderSlide();
  }
};


// ==========================================================================
// PAGE -0.5: TECH LEAD PITCH PLAYBOOK AND INTERACTIVE PITCH CONSOLE
// ==========================================================================
let tlpCurStep = 0;
let tlpActiveTab = 'script'; // 'script', 'services', 'contract', 'sandbox'
let tlpSagaLogs = [];
let tlpSagaRunning = false;

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
  const ALL_SYS = [
    '1 Entry Points', '2 Customer 360', '3 Segmentation', '4 Enrollment', 
    '5 Points Engine', '6 Tier Engine', '7 Rewards Catalog', '8 Automation', 
    '9 Campaigns', '10 Analytics', '11 Settings & Configuration'
  ];

  const steps = [
    {
      icon: '📱',
      iconBg: '#E6F1FB',
      title: 'Customer discovers the loyalty program',
      sub: 'Entry Point & Acquisition (Module 1)',
      userSees: 'Priya brand ke mobile app page pe Instagram refer link ke throug land karti hai. She sees: "Join our loyalty program — get 100 welcome points on registration!" Woh Join now pe tap karti hai.',
      active: ['1 Entry Points'],
      note: 'Entry point channel source ko session context data mein save karta hai. CAC (Customer Acquisition Cost) trace karne ke liye is segment source ko link kiya jata hai.'
    },
    {
      icon: '👤',
      iconBg: '#E1F5EE',
      title: 'Customer signs up — profile is created',
      sub: 'Customer 360 & Profile Builder (Module 2)',
      userSees: 'Priya apna Name, Mobile Number aur Birthdate fill karti hai. Sign up submit hotey hi use unique Loyalty ID generate hoke dikhti hai: LYL-00482. Starting tier badge Bronze confirm hota hai.',
      active: ['1 Entry Points', '2 Customer 360', '4 Enrollment', '11 Settings & Configuration'],
      note: 'Customer 360 database relational entry banata hai. Enrollment microservice status ko "ACTIVE" set karti hai aur base signup settings load karti hai.'
    },
    {
      icon: '📊',
      iconBg: '#EEEDFE',
      title: 'System silently segments her',
      sub: 'Segmentation Engine (Module 3)',
      userSees: 'Priya ke loyalty dashboard pe aur koi changes nahi dikhte, par system use silently segment kar deta hai. First-signup timestamp evaluate karke segment tag "New Customer" update hota hai.',
      active: ['2 Customer 360', '3 Segmentation', '8 Automation'],
      note: 'RFM segmentation trigger runs. Customer status New set hotey hi Automation logic trigger events fire karne ke liye subscribe hota hai.'
    },
    {
      icon: '💬',
      iconBg: '#EEEDFE',
      title: 'Welcome automation fires',
      sub: 'Automation Rules & Campaign sends (Modules 8 & 9)',
      userSees: 'Registration ke 30 seconds ke andar Priya ko WhatsApp/SMS aata hai: "Welcome Priya! Aapke wallet mein 100 points credit kar diye gaye hain." Dashboard open karte hi balance 100 points balance reflect hota hai.',
      active: ['8 Automation', '9 Campaigns', '5 Points Engine', '10 Analytics'],
      note: 'Automation Engine "CustomerEnrolled" event verify karke welcome rule fire karta hai. Points engine ledger table check karke 100 points deposit register karta hai.'
    },
    {
      icon: '🛒',
      iconBg: '#FAEEDA',
      title: 'Customer places her first order',
      sub: 'Points Engine & Wallet ledger (Modules 5 & 6)',
      userSees: 'Priya skincare pack cart mein add karti hai jiski value RM 150 hai. Checkout page pe message: "Earn 150 points on checkout". Subtotal payment hotey hi wallet points instantly badhkar 250 points ho jaata hai.',
      active: ['5 Points Engine', '2 Customer 360', '6 Tier Engine', '10 Analytics', '11 Settings & Configuration'],
      note: 'Calculation logic: RM 150 order × 1 pt/RM base rate × 1.0x Bronze multiplier = 150 points. Wallet ledger update and cumulative lifetime counter sync completed.'
    },
    {
      icon: '⭐',
      iconBg: '#FAEEDA',
      title: 'Customer writes a product review',
      sub: 'Non-purchase earn event trigger',
      userSees: 'Skincare use karne ke baad Priya app pe 5-star rating aur review submit karti hai. Push alert: "Thanks! Review completed. +50 bonus points added." Balance now: 300 points.',
      active: ['5 Points Engine', '2 Customer 360', '8 Automation', '10 Analytics'],
      note: 'ECA (Event-Condition-Action) workflow check: event is "review_submitted". Condition check passes. Wallet ledger entries updated.'
    },
    {
      icon: '👥',
      iconBg: '#E1F5EE',
      title: 'Referral made — friend joins',
      sub: 'Acquisition & Referral trigger',
      userSees: 'Priya app se referral link share karti hai. Uska friend Rahul registration complete karta hai. Priya ko automated message milta hai: "Rahul joined! Referral bonus credited. +100 points." Balance: 400 points.',
      active: ['5 Points Engine', '8 Automation', '9 Campaigns', '2 Customer 360', '10 Analytics'],
      note: 'Referral signup hook completes validation: referee is distinct customer. Credited 100 referral points. Notification engine delivers messaging payload.'
    },
    {
      icon: '🏆',
      iconBg: '#FAECE7',
      title: 'Customer crosses Silver tier milestone',
      sub: 'Tier evaluation & upgrades (Module 6)',
      userSees: 'Priya RM 200 ki purchase aur karti hai. Points counter: 600 points. Dashboard badge Bronze se upgraded to Silver ho jaata hai. Notification: "Congrats! You are now Silver Elite. Enjoy 1.5x points earning multiplier."',
      active: ['6 Tier Engine', '8 Automation', '9 Campaigns', '2 Customer 360', '10 Analytics'],
      note: 'Tier evaluation runs on points ledger write. Cumulative points (600) cross Silver threshold (500). Update customer_tiers database status, triggers Slack alert.'
    },
    {
      icon: '🎁',
      iconBg: '#E1F5EE',
      title: 'Customer redeems points at checkout',
      sub: 'Rewards catalog validation & settlement (Module 7)',
      userSees: 'Priya checkout cart value RM 100 pe points use tab select karti hai. Wallet se 500 points use karke RM 5 deduction complete ho jata hai. Remainder payable amount: RM 95. Remaining wallet points: 100.',
      active: ['5 Points Engine', '7 Rewards Catalog', '2 Customer 360', '10 Analytics', '11 Settings & Configuration'],
      note: 'Validates point balance, checks 20% order subtotal redemption cap rules. Deducts 500 points. Lifetime counter stays same so Tier level does NOT downgrade.'
    },
    {
      icon: '🎂',
      iconBg: '#EEEDFE',
      title: 'Birthday scheduler fires',
      sub: 'Scheduled Campaign automation',
      userSees: 'Priya ke birthday subah alert: "Happy Birthday Priya! Here is 100 bonus points as our gift. Celebration time!". Bina kisi checkout transaction ke wallet balance checks automatically points add ho jaata hai.',
      active: ['8 Automation', '5 Points Engine', '9 Campaigns', '10 Analytics'],
      note: 'Cron script runs daily check match on customer birthdate columns. Generates point credit payload and sends template message.'
    },
    {
      icon: '⏰',
      iconBg: '#FCEBEB',
      title: 'Customer goes quiet — Dormant alert',
      sub: 'Dormancy evaluation & Churn prevention',
      userSees: '45 days tak koi transaction nahi hone pe Priya ko critical alert push warning milti hai: "We miss you Priya! Reactivate your account with 15% discount coupon. Note: Your points will expire in 30 days!"',
      active: ['3 Segmentation', '8 Automation', '9 Campaigns', '7 Rewards Catalog', '10 Analytics'],
      note: 'Segmentation re-cohorts user. Expiry counter checks last active timestamp rules and triggers warning templates.'
    },
    {
      icon: '📈',
      iconBg: '#E6F1FB',
      title: 'Continuous CRM Analytics telemetry',
      sub: 'Program health & KPI tracking (Module 10)',
      userSees: 'Priya loyalty benefits updates dekhti hai. Business admin view pe manager check karta hai: Total points liability, Retention rates (92%), Churn rate aur Campaign conversions.',
      active: ['10 Analytics', '11 Settings & Configuration', '2 Customer 360', '3 Segmentation', '5 Points Engine', '6 Tier Engine'],
      note: 'All transaction database triggers continuously pump event logs to data pipelines, feeding ROI models instantly.'
    }
  ];

  let cur = 0;

  function render() {
    const s = steps[cur];
    const total = steps.length;
    const activeSysSet = new Set(s.active);
    
    const chipsHtml = ALL_SYS.map(sys => `
      <span class="j-sys-chip ${activeSysSet.has(sys) ? 'sys-active' : 'sys-passive'}" style="${activeSysSet.has(sys) ? 'background:rgba(16,185,129,0.12); color:var(--color-teal); border-color:rgba(16,185,129,0.2)' : 'background:transparent; color:var(--text-muted); border-color:var(--border-color);'}">
        ${sys}
      </span>
    `).join('');

    document.getElementById('journey-wrap').innerHTML = `
      <div class="prog">
        ${steps.map((_, i) => `
          <div class="prog-dot" style="background:${i < cur ? 'var(--color-teal)' : i === cur ? 'var(--color-primary)' : 'var(--border-color)'}" onclick="jJump(${i})">
            ${i + 1}
          </div>
          ${i < total - 1 ? `<div class="prog-line ${i < cur ? 'done' : ''}"></div>` : ''}
        `).join('')}
      </div>
      
      <div class="journey-card">
        <div class="j-badge" style="background:${s.iconBg}; color:#111;">
          ${s.icon} &nbsp; <strong>${s.sub}</strong>
        </div>
        <div class="j-title">${s.title}</div>
        
        <div style="background:var(--bg-field); border-radius:var(--radius-md); padding:14px; margin:14px 0;">
          <div style="font-size:9px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">
            Presentation Story (Customer Experience)
          </div>
          <div style="font-size:12.5px; color:var(--text-main); line-height:1.6;">${s.userSees}</div>
        </div>
        
        <div class="sect-label">Systems Activated in this Step</div>
        <div class="j-chips">${chipsHtml}</div>
        
        <div class="j-hl" style="background:rgba(255,255,255,0.02); border-color:var(--border-color); color:var(--text-muted);">
          <strong style="color:var(--text-main)">Behind the Scenes Workflow:</strong> ${s.note}
        </div>
      </div>
      
      <div class="nav-row">
        <button class="btn-prev" ${cur === 0 ? 'disabled' : ''} onclick="jGo(-1)">← Prev</button>
        <span class="step-ctr">Step ${cur + 1} of ${total}</span>
        <button class="btn-next" onclick="jGo(1)">
          ${cur === total - 1 ? 'Finish ✓' : 'Next Step →'}
        </button>
      </div>
    `;
  }

  window.jGo = d => {
    if (cur + d >= 0 && cur + d < steps.length) {
      cur += d;
      render();
    }
  };
  window.jJump = i => {
    cur = i;
    render();
  };
  render();
}

// ==========================================================================
// PAGE 2: POINTS FORMULA CALCULATOR
// ==========================================================================
function initFormula() {
  let fTier = 'bronze';
  let fType = 'order';
  const FIX = {
    review: { pts: 50, label: 'Review bonus' },
    referral: { pts: 100, label: 'Referral bonus' },
    birthday: { pts: 100, label: 'Birthday bonus' }
  };

  // Expose calculation function to avoid Uncaught ReferenceError
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

    // Progress bar calculate
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

  // Expose fCalc on window for HTML inputs
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
}

// ==========================================================================
// PAGE 3: STEP-BY-STEP BREAKDOWN (6 STEPS IN HINDI)
// ==========================================================================
function initStepFormula() {
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
}

// ==========================================================================
// PAGE 4: 17 EARN EVENTS DETAILED EXPLORER (12 EXISTING + 5 NEW)
// ==========================================================================
function initEarnEvents() {
  let eeActive = 'order';
  let eeTier = 'bronze';
  let eeCategory = 'all';

  const EVENTS = [
    // EXISTING 12
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
    
    // NEW 5
    { id: 'app_install', cat: 'social', label: 'App Install', icon: '📲', val: 40, isNew: true, formula: '40 pts × {mult}x', desc: 'Brand mobile application download and install reward — lifelong push channel', steps: ['1 Download app and first login', '2 Device verification & profile linkage', '3 +{pts} points credited', '4 App push notification channels enabled'], api: 'POST /v1/mobile/register', schema: 'customer_360, wallets' },
    { id: 'survey', cat: 'engagement', label: 'Survey / Feedback', icon: '📋', val: 35, isNew: true, formula: '35 pts × {mult}x', desc: 'Surveys completion zero-party demographic data collection', steps: ['1 survey create & target specific customer segment', '2 Customer submits feedback form', '3 +{pts} points credited', '4 Responses write to Customer 360 profile'], api: 'POST /v1/feedback/accrual', schema: 'wallet_ledger, survey_responses' },
    { id: 'wishlist', cat: 'engagement', label: 'Wishlist Add', icon: '❤️', val: 10, isNew: true, formula: '10 pts × {mult}x', desc: 'Product wishlist additions intent capture rewards (max 5/day cap)', steps: ['1 Customer adds product to wishlist', '2 Verify not duplicate wishlist addition', '3 Check daily limits (max 5)', '4 +{pts} points wallet credit'], api: 'POST /v1/wishlist/accrual', schema: 'customer_360, campaigns' },
    { id: 'spend_milestone', cat: 'purchase', label: 'Spend Milestone', icon: '🏅', val: 200, isNew: true, formula: '200 pts × {mult}x', desc: 'Cumulative spending milestones (RM 500, 1000, 5000) reached rewards', steps: ['1 Cumulative spend update check', '2 Cross target value (e.g. RM 1000 spend)', '3 +{pts} points milestone bonus credited', '4 Milestone badge unlocked'], api: 'POST /v1/milestones/spend', schema: 'customer_360, wallet_ledger' },
    { id: 'ugc', cat: 'social', label: 'UGC Photo Tag', icon: '📸', val: 45, isNew: true, formula: '45 pts × {mult}x', desc: 'Social media product photo post tagging brand handles', steps: ['1 Post photo tagging handle on Instagram/TikTok', '2 Social listening API catches event', '3 Admin moderation approval', '4 +{pts} points credited'], api: 'POST /v1/ugc/accrual', schema: 'wallet_ledger, audit_logs' }
  ];

  function render() {
    const wrap = document.getElementById('earn-wrap');
    if (!wrap) return;
    
    // Filters logic
    const filtered = eeCategory === 'all' ? EVENTS : EVENTS.filter(e => e.cat === eeCategory);
    const activeEv = EVENTS.find(e => e.id === eeActive);
    const T = TIERS[eeTier];
    const calculatedEarn = Math.round(activeEv.val * T.mult);

    // Existing (12) and New (5) categories
    const existing = filtered.filter(e => !e.isNew);
    const newEvs = filtered.filter(e => e.isNew);

    const tabsHtml = `
      <div class="sec-div">📦 Existing (12)</div>
      <div class="top-tabs">
        ${existing.map(e => `
          <div class="tab ${e.id === eeActive ? 'active' : ''}" 
               id="ee-tab-${e.id}" 
               onclick="eeSelect('${e.id}')" 
               style="${e.id === eeActive ? `background:${getEventColor(e.id)}; border-color:transparent; color:#fff;` : ''}">
            ${e.icon} ${e.label}
          </div>
        `).join('')}
      </div>
      <div class="sec-div">✨ Naye events (5)</div>
      <div class="top-tabs">
        ${newEvs.map(e => `
          <div class="tab ${e.id === eeActive ? 'active' : ''}" 
               id="ee-tab-${e.id}" 
               onclick="eeSelect('${e.id}')" 
               style="${e.id === eeActive ? `background:${getEventColor(e.id)}; border-color:transparent; color:#fff;` : ''}">
            ${e.icon} ${e.label} <span class="new-badge">NEW</span>
          </div>
        `).join('')}
      </div>
    `;

    wrap.innerHTML = `
      ${makeTierCtrl('ee', 'eeSetTier', eeTier)}

      <div class="sect-label">Categories Filter</div>
      <div class="cat-tabs">
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
            <div style="font-size:10px; color:var(--text-muted);">Points Earned (Calculated)</div>
            <div style="font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--color-teal)">
              ${calculatedEarn} points
            </div>
          </div>
        </div>

        ${activeEv.isNew ? `
          <div class="why-box" style="background:rgba(16, 185, 129, 0.08); border-left:3px solid var(--color-teal); color:var(--text-muted)">
            <strong>Kyun add kiya?</strong> App install is a lifelong notification channel that reduces retention CAC.
          </div>
        ` : ''}

        <div class="why-box" style="background:rgba(6, 182, 212, 0.08); border-color:var(--color-cyan); color:var(--text-muted)">
          <strong>Accrual Formula:</strong> <code>${activeEv.formula.replace('{val}', activeEv.val).replace('{mult}', T.mult).replace('{pts}', calculatedEarn)}</code>
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

        <div class="meta-row">
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
    const map = {order:'#378ADD',birthday:'#534AB7',review:'#BA7517',referral:'#1D9E75',social:'#D4537E',event:'#3B6D11',firstpurchase:'#BA7517',streak:'#A32D2D',profile:'#185FA5',winback:'#534AB7',app_install:'#2E7D32',survey:'#7B1FA2',wishlist:'#C2185B',spend_milestone:'#F57F17',ugc:'#00838F'};
    return map[id] || '#378ADD';
  }

  window.eeSetTier = t => {
    eeTier = t;
    updateTierBtns('ee', t, render);
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

// ==========================================================================
// PAGE 5: TIER UPGRADE SYSTEM (INTERACTIVE STEPPER FROM REFERENCE)
// ==========================================================================
function initTierUpgrade() {
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

    // Render stepper dots
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

  // Expose global variables
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
}

// ==========================================================================
// PAGE 6: REDEMPTION & SAGA (INTERACTIVE STEPPER FROM REFERENCE)
// ==========================================================================
function initRedemption() {
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
}

// ==========================================================================
// PAGE 7: CUSTOMER ENGAGEMENT STRATEGIES (12 STRATEGIES)
// ==========================================================================
function initEngagement() {
  const STRATS = [
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

  let engCat = 'all';
  let engSel = 'missions';

  function render() {
    const filtered = engCat === 'all' ? STRATS : STRATS.filter(s => s.cat === engCat);
    const sel = STRATS.find(s => s.id === engSel);

    const catTabsHtml = [
      { id: 'all', label: 'Sab dekho' },
      { id: 'game', label: 'Gamification' },
      { id: 'personal', label: 'Personalization' },
      { id: 'community', label: 'Community' },
      { id: 'surprise', label: 'Surprise' },
      { id: 'retention', label: 'Retention' }
    ].map(c => `
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

      <div class="sect-label">Strategies Grid (12 Strategies)</div>
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
  let renMode = 'points'; // 'points', 'tier', or 'member'
  let renStep = 0;

  const SCENARIOS = {
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

  function render() {
    const steps = SCENARIOS[renMode];
    const total = steps.length;

    const progHtml = steps.map((step, i) => `
      <div class="prog-dot" 
           style="background:${i < renStep ? 'var(--color-teal)' : i === renStep ? step.color : 'var(--border-color)'}" 
           onclick="renJumpStep(${i})">
        ${i + 1}
      </div>
      ${i < total - 1 ? `<div class="prog-line ${i < renStep ? 'done' : ''}"></div>` : ''}
    `).join('');

    const s = steps[renStep];
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
    if (renStep + d >= 0 && renStep + d < SCENARIOS[renMode].length) {
      renStep += d;
      render();
    }
  };
  window.renJumpStep = (i) => {
    renStep = i;
    render();
  };

  document.getElementById('renewal-wrap').innerHTML = `
    <div class="sect-label">Kaun si renewal flow dekhni hai?</div>
    <div class="earn-chips">
      <div class="r-btn-sc e-chip active" id="ren-btn-points" onclick="renSetActive('points')">
        <i class="ti ti-calendar-time"></i> Points Expiry Loop
      </div>
      <div class="r-btn-sc e-chip" id="ren-btn-tier" onclick="renSetActive('tier')">
        <i class="ti ti-star"></i> Tier Status Maintenance
      </div>
      <div class="r-btn-sc e-chip" id="ren-btn-member" onclick="renSetActive('member')">
        <i class="ti ti-credit-card"></i> Paid Subscription Renewal
      </div>
    </div>

    <div id="ren-detail-body" class="detail-card" style="margin-top:16px;"></div>
  `;
  render();
}
