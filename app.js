
/* ==========================================================================
   B2C LOYALTY MASTER DECK - FRONTEND LOGIC
   ========================================================================== */

const PAGES = ['journey', 'formulas', 'advanced-tier', 'red-ren', 'fraud', 'engagement'];

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });
  }

  // Init default page
  showPage('journey');
});

function showPage(pageId) {
  // Hide all pages
  PAGES.forEach(id => {
    const el = document.getElementById('page-' + id);
    if (el) el.classList.remove('active');
  });

  // Deactivate tabs
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => t.classList.remove('active'));

  // Activate target
  const targetPage = document.getElementById('page-' + pageId);
  const targetTab = document.getElementById('tab-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  if (targetTab) targetTab.classList.add('active');

  initPage(pageId);
}

function initPage(pageId) {
  switch (pageId) {
    case 'journey': initJourney(); break;
    case 'formulas': initFormulas(); break;
    case 'advanced-tier': initAdvancedTier(); break;
    case 'red-ren': initRedRen(); break;
    case 'fraud': initFraudPrevention(); break;
    case 'engagement': initEngagement(); break;
  }
}

/* ==========================================================================
   1. MASTER FORMULAS PAGE
   ========================================================================== */

/* ==========================================================================
   0. END-TO-END CUSTOMER JOURNEY (11 MODULES)
   ========================================================================== */
function initJourney() {
  const container = document.getElementById('journey-wrap');
  if (!container) return;

  const steps = [
    { num: 1, title: "Profile Creation & Registration", desc: "Customer sign up karta hai. Profile 100% complete karne par Welcome Points milte hain." },
    { num: 2, title: "Explore & Engage", desc: "Products browse karta hai, wishlist banata hai, aur app roz open karta hai (Daily Streaks). Isse Behavior Points milte hain." },
    { num: 3, title: "Place Order", desc: "Cart me items add karke pehla order place karta hai." },
    { num: 4, title: "Points Earning (Calculation)", desc: "1 RM = 1 Point rule ke hisaab se points calculate hote hain. (e.g., RM 500 = 500 Points)." },
    { num: 5, title: "Pending Wallet (Lock Period)", desc: "Earn kiye gaye points turant use nahi ho sakte. 14-30 din (Return Window) tak Pending Wallet mein lock rehte hain." },
    { num: 6, title: "Active Wallet (Points Unlocked)", desc: "Return period safely khatam hone ke baad points Active Wallet mein aate hain." },
    { num: 7, title: "Second Purchase Unlock", desc: "Customer ke paas Active points hain, par Redeem button locked rehta hai. Jab wo apna 2nd Order place karta hai, tabhi redeem button unlock hota hai (Isse customer wapas aata hai!)." },
    { num: 8, title: "Points Redemption (Convert to Cash)", desc: "Cash Value = Total Points ÷ 100 (1% cashback). Max 20% cap rule ke sath discount milta hai." },
    { num: 9, title: "Tier Score Calculation", desc: "System check karta hai: (Spend + Behavior) - Canceled × Frequency Multiplier." },
    { num: 10, title: "Tier Assignment & Benefits", desc: "DTS score ke hisaab se Bronze, Silver, Gold, Platinum ya Diamond tier assign hota hai." },
    { num: 11, title: "Enjoy Rewards & Renew", desc: "Har 12 mahine mein system review karta hai aur Expiry ya Soft Downgrade rules lagata hai." }
  ];

  let stepHtml = '<div class="timeline" style="margin-top: 10px; padding: 0 10px;">';
  
  steps.forEach((s) => {
    let color = 'var(--color-primary)';
    if (s.num >= 5 && s.num <= 7) color = 'var(--color-coral)';
    if (s.num >= 8) color = 'var(--color-teal)';
    if (s.num === 11) color = 'var(--color-amber)';

    stepHtml += `
      <div class="timeline-step">
        <div class="step-num" style="background:${color};">${s.num}</div>
        <div class="step-content" style="border-left: 3px solid ${color};">
          <div class="step-title" style="color:${color};">${s.title}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      </div>
    `;
  });

  stepHtml += '</div>';

  container.innerHTML = `
    <div style="padding: 10px;">
      <h3 style="color:var(--text-main); font-size:18px; margin-bottom:20px; text-align:center;">Customer Journey: Step 1 se Step 11 tak (Full Flow)</h3>
      ${stepHtml}
    </div>
  `;
}

function initFormulas() {
  const container = document.getElementById('formulas-wrap');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap: 30px; padding: 20px;">
      
      <!-- 1. The Base Formula -->
      <div class="pres-slide">
        <h3 style="color:var(--color-primary); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">1. The Base Earning Formula</h3>
        <p style="color:var(--text-muted); line-height:1.6; margin-bottom:10px;">Customer paise kharch karke points kaise kamata hai.</p>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff;">
          <strong>Points Earned = Total Spend (RM) × Base Multiplier</strong><br><br>
          <span style="color:var(--color-cyan);">Current Rule: RM 1.00 Spend = 1 Point</span>
        </div>
      </div>

      <!-- 2. Dynamic Tier Score -->
      <div class="pres-slide">
        <h3 style="color:var(--color-teal); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">2. Dynamic Tier Score (DTS) Formula</h3>
        <p style="color:var(--text-muted); line-height:1.6; margin-bottom:10px;">System customer ki asli value kaise nikalta hai (Behavior, Cancel, Frequency ko milakar). for Tier upgrades, accounting for behavior, cancellations, and loyalty frequency.</p>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff; margin-bottom: 15px;">
          <strong>DTS = [ (Confirmed Spend) + (Behavior Points) - (Canceled Spend) ] × Frequency Multiplier</strong>
        </div>
        <ul style="color:var(--text-main); line-height:1.6; margin-left: 20px;">
          <li><strong>Confirmed Spend:</strong> Total RM spent on completed orders.</li>
          <li><strong>Behavior Points:</strong> Points awarded manually by the system for non-transactional actions.</li>
          <li><strong>Canceled Spend:</strong> Refund ya Cancel hue order ka exact RM value minus ho jata hai taaki fraud na ho. (The Clawback Rule).</li>
          <li><strong>Frequency Multiplier:</strong> Agar 12 mahine mein 3 ya usse zyada order hain, toh 10% bonus milta hai (Multiplier = 1.1). (A 10% bonus). Otherwise 1.0.</li>
        </ul>
      </div>

      <!-- 3. Tier Thresholds -->
      <div class="pres-slide">
        <h3 style="color:var(--color-amber); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">3. Tier Upgrade Logic & Thresholds</h3>
        <p style="color:var(--color-coral); font-weight:bold; margin-bottom:10px;">Probation Lock Rule (Sabse Zaroori): IF (Total Orders < 2) THEN Tier = "Bronze (Probation)" REGARDLESS of DTS.</p>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
          <div style="background:#FDF3E8; color:#CD7F32; padding:15px; border-radius:8px; text-align:center; font-weight:bold;">Bronze Tier<br>DTS: 0 - 499</div>
          <div style="background:#F5F5F5; color:#888780; padding:15px; border-radius:8px; text-align:center; font-weight:bold;">Silver Tier<br>DTS: 500 - 1,999</div>
          <div style="background:#FFF8DC; color:#BA7517; padding:15px; border-radius:8px; text-align:center; font-weight:bold;">Gold Tier<br>DTS: 2,000 - 4,999</div>
          <div style="background:#EEF2FF; color:#185FA5; padding:15px; border-radius:8px; text-align:center; font-weight:bold;">Platinum Tier<br>DTS: 5,000 - 9,999</div>
          <div style="background:linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); color:#006064; padding:15px; border-radius:8px; text-align:center; font-weight:bold;">Diamond Tier<br>DTS: 10,000+</div>
        </div>
      </div>

      <!-- 4. Redemption -->
      <div class="pres-slide">
        <h3 style="color:var(--color-cyan); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">4. Point Redemption & Checkout Formula</h3>
        <ul style="color:var(--text-main); line-height:1.6; margin-left: 20px;">
          <li><strong>Cash Value Conversion:</strong> 100 points = RM 1.00 (1% Flat Cashback).</li>
          <li><strong>Minimum Threshold Rule:</strong> IF (Wallet Balance < 500 points) THEN Redemption = LOCKED.</li>
          <li><strong>The Max Cap Formula:</strong> Max Allowed Discount (RM) = Cart Total (RM) × Max Cap %</li>
          <li><strong>Final Checkout Calculation:</strong> Out-of-Pocket Cash (RM) = Cart Total (RM) - Applied Discount (RM)</li>
        </ul>
      </div>

    </div>
  `;
}

/* ==========================================================================
   2. DYNAMIC TIER UPGRADE (DTS)
   ========================================================================== */
function initAdvancedTier() {
  const container = document.getElementById('advanced-tier-wrap');
  if (!container) return;

  container.innerHTML = `
    <div class="timeline" style="margin-top: 20px; padding: 0 20px;">
      
      <!-- Step 1 -->
      <div class="timeline-step">
        <div class="step-num" style="background:var(--color-primary);">1</div>
        <div class="step-content">
          <div class="step-title" style="color:var(--color-primary);">Day 1: The First Big Order (Probation Lock)</div>
          <div class="step-desc" style="line-height:1.5;">
            Manoj apna sabse pehla order <strong>RM 5,000</strong> ka place karta hai. Normally, 5,000 points se turant Platinum Tier mil jana chahiye.<br><br>
            <strong style="color:var(--color-coral);"><i class="ti ti-lock"></i> System Action:</strong> Kyunki yeh Manoj ka pehla order hai, system uski Tier ko lock kar deta hai. Usko 5,000 points milte hain, par uska Tier <strong>Bronze (Probation)</strong> hi rehta hai. Isse un fraud logo ko roka jata hai jo ek baar me bada order karke VIP benefits le kar nikal jate hain.
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="timeline-step">
        <div class="step-num" style="background:var(--color-teal);">2</div>
        <div class="step-content">
          <div class="step-title" style="color:var(--color-teal);">Day 15: Behavior & Engagement</div>
          <div class="step-desc" style="line-height:1.5;">
            Manoj ko product pasand aata hai. Wo 2 positive reviews likhta hai aur brand ko Instagram par tag karta hai.<br><br>
            <strong style="color:var(--color-teal);"><i class="ti ti-heart"></i> System Action:</strong> System isko detect karke uske Tier Score me <strong>+150 Behavior Points</strong> add kar deta hai. <br>
            <em>Current Score: 5,150. (Still locked in Bronze until Order #2).</em>
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="timeline-step">
        <div class="step-num" style="background:var(--color-cyan);">3</div>
        <div class="step-content">
          <div class="step-title" style="color:var(--color-cyan);">Day 45: The Second Order (Unlock!)</div>
          <div class="step-desc" style="line-height:1.5;">
            Manoj wapas aakar apna 2nd order <strong>RM 200</strong> ka place karta hai.<br><br>
            <strong style="color:var(--color-cyan);"><i class="ti ti-key"></i> System Action:</strong> System dekhta hai ki Order Frequency = 2 ho gayi hai. Probation lock turant hat jata hai!<br>
            <em>Score: 5,000 + 150 + 200 = 5,350.</em> Manoj turant <strong>Platinum Tier!</strong> mein upgrade ho jata hai.
          </div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="timeline-step">
        <div class="step-num" style="background:var(--color-coral);">4</div>
        <div class="step-content">
          <div class="step-title" style="color:var(--color-coral);">Day 60: Order Cancellation (Penalty)</div>
          <div class="step-desc" style="line-height:1.5;">
            Manoj RM 500 ka order place karta hai par shipping se pehle hi cancel kar deta hai.<br><br>
            <strong style="color:var(--color-coral);"><i class="ti ti-shield"></i> System Action:</strong> Business ko loss se bachane ke liye system turant us cancelled order ki value deduct kar leta hai (Clawback Rule). <br>
            <em>Score: 5,350 - 500 = 4,850.</em> Manoj ka score 5,000 se niche gir jata hai, isliye uska Tier downgrade hoke <strong>Gold Tier</strong> ban jata hai.
          </div>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="timeline-step">
        <div class="step-num" style="background:var(--color-amber);">5</div>
        <div class="step-content">
          <div class="step-title" style="color:var(--color-amber);">Day 90: High Frequency Bonus</div>
          <div class="step-desc" style="line-height:1.5;">
            Manoj apna 3rd order <strong>RM 300</strong> ka place karta hai.<br><br>
            <strong style="color:var(--color-amber);"><i class="ti ti-flame"></i> System Action:</strong> Kyunki Manoj ne pichle 12 mahine me 3+ orders kiye hain, system uski loyalty ke liye uske pure base score me <strong>1.1x Multiplier (10% Bonus)</strong> add kar deta hai! <br>
            <em>Score: (4,850 + 300) = 5,150 × 1.1 = <strong>5,665</strong></em>. Manoj wapas safely <strong>Platinum Tier!</strong> me pahonch jata hai.
          </div>
        </div>
      </div>

    </div>

    <!-- The Simulator Section -->
    <div style="margin-top: 50px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px;">
      <h3 style="text-align:center; color:#fff; font-size:18px; margin-bottom:20px; font-family: var(--font-display);">Try It Yourself: Live Simulator</h3>
      
      <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 0 20px;">
        <!-- Left: Interactive Controls -->
        <div style="flex: 1; min-width: 300px; background: var(--bg-field); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
          <div class="sect-label">Customer Activity Simulation</div>
          
          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Confirmed Spend (RM)</label>
            <input type="range" id="dts-spend" min="0" max="10000" step="100" value="1500" oninput="simDtsCalc()">
            <span class="ctrl-val" id="dts-spend-v">1500</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Behavior Points</label>
            <input type="range" id="dts-behavior" min="0" max="500" step="10" value="50" oninput="simDtsCalc()">
            <span class="ctrl-val" id="dts-behavior-v" style="color: var(--color-primary);">+50</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Canceled Spend (RM)</label>
            <input type="range" id="dts-cancel" min="0" max="2000" step="50" value="0" oninput="simDtsCalc()">
            <span class="ctrl-val" id="dts-cancel-v" style="color: var(--color-coral);">-0</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Order Frequency</label>
            <input type="range" id="dts-freq" min="1" max="10" step="1" value="1" oninput="simDtsCalc()">
            <span class="ctrl-val" id="dts-freq-v">1 Order</span>
          </div>
          
          <div style="font-size: 11px; color: var(--text-muted); font-style: italic; margin-top: 10px;">
            * Rules: Requires minimum 2 orders to unlock Tiers. >= 3 orders grants 1.1x multiplier.
          </div>
        </div>

        <!-- Right: Real-time Evaluation -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 12px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Final Tier Score</div>
            <div id="dts-out-score" style="font-family: var(--font-display); font-size: 42px; font-weight: 800; color: #fff; text-shadow: var(--glow-cyan); margin-bottom: 20px; transition: transform 0.15s;">0</div>
            
            <div id="dts-out-badge" style="display: inline-block; margin: 0 auto; padding: 10px 20px; border-radius: 30px; font-family: var(--font-display); font-size: 16px; font-weight: 700;">
              Bronze Tier
            </div>
          </div>

          <!-- Lock Warning -->
          <div id="dts-out-lock" style="background: rgba(244, 63, 94, 0.1); border: 1px solid var(--color-coral); border-radius: var(--radius-md); padding: 16px; color: var(--color-coral); font-size: 12px; display: flex; align-items: flex-start; gap: 10px; display: none;">
            <i class="ti ti-lock" style="font-size: 18px;"></i>
            <div>
              <strong>Observation Period Locked</strong><br>
              <span style="opacity: 0.8;">Customer has only placed 1 order. Tier upgrades are blocked. Must place 2nd order to unlock.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => { if (window.simDtsCalc) window.simDtsCalc(); }, 50);
}

window.simDtsCalc = function() {
  const spendEl = document.getElementById('dts-spend');
  if (!spendEl) return;

  const spend = parseInt(spendEl.value);
  const behavior = parseInt(document.getElementById('dts-behavior').value);
  const cancel = parseInt(document.getElementById('dts-cancel').value);
  const freq = parseInt(document.getElementById('dts-freq').value);

  document.getElementById('dts-spend-v').textContent = 'RM ' + spend;
  document.getElementById('dts-behavior-v').textContent = '+' + behavior;
  document.getElementById('dts-cancel-v').textContent = '-' + cancel;
  document.getElementById('dts-freq-v').textContent = freq + (freq === 1 ? ' Order' : ' Orders');

  let baseScore = (spend + behavior) - cancel;
  if (baseScore < 0) baseScore = 0;

  let multiplier = 1.0;
  if (freq >= 3) {
    multiplier = 1.1; 
  }

  const finalScore = Math.floor(baseScore * multiplier);
  
  const scoreEl = document.getElementById('dts-out-score');
  scoreEl.textContent = finalScore.toLocaleString();

  const lockEl = document.getElementById('dts-out-lock');
  const badgeEl = document.getElementById('dts-out-badge');

  if (freq < 2) {
    lockEl.style.display = 'flex';
    badgeEl.textContent = 'Bronze (Probation)';
    badgeEl.style.background = '#FDF3E8';
    badgeEl.style.color = '#CD7F32';
    badgeEl.style.border = '1px solid #CD7F32';
    scoreEl.style.color = '#CD7F32';
  } else {
    lockEl.style.display = 'none';
    scoreEl.style.color = '#fff';

    if (finalScore >= 10000) {
      badgeEl.textContent = 'Diamond Tier';
      badgeEl.style.background = 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)';
      badgeEl.style.color = '#006064';
      badgeEl.style.border = '1px solid #006064';
      scoreEl.style.color = '#006064';
    } else if (finalScore >= 5000) {
      badgeEl.textContent = 'Platinum Tier';
      badgeEl.style.background = '#EEF2FF';
      badgeEl.style.color = '#185FA5';
      badgeEl.style.border = '1px solid #185FA5';
      scoreEl.style.color = '#185FA5';
    } else if (finalScore >= 2000) {
      badgeEl.textContent = 'Gold Tier';
      badgeEl.style.background = '#FFF8DC';
      badgeEl.style.color = '#BA7517';
      badgeEl.style.border = '1px solid #BA7517';
      scoreEl.style.color = '#BA7517';
    } else if (finalScore >= 500) {
      badgeEl.textContent = 'Silver Tier';
      badgeEl.style.background = '#F5F5F5';
      badgeEl.style.color = '#888780';
      badgeEl.style.border = '1px solid #888780';
      scoreEl.style.color = '#888780';
    } else {
      badgeEl.textContent = 'Bronze Tier';
      badgeEl.style.background = '#FDF3E8';
      badgeEl.style.color = '#CD7F32';
      badgeEl.style.border = '1px solid #CD7F32';
    }
  }
};

/* ==========================================================================
   3. REDEMPTION & RENEWAL PAGE
   ========================================================================== */
function initRedRen() {
  const container = document.getElementById('red-ren-wrap');
  if (!container) return;

  container.innerHTML = `
    <div style="padding: 20px;">
      
      <!-- REDEMPTION SIMULATOR -->
      <h2 style="font-size:24px; color:var(--color-primary); margin-bottom:10px;">1. Checkout Limits (Max Cap)</h2>
      <p style="color:var(--text-muted); margin-bottom: 20px;">Use the slider to see how imposing a Max % Cap on checkout protects the company's cash flow.</p>
      
      <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 40px;">
        <!-- Left: Interactive Controls -->
        <div style="flex: 1; min-width: 300px; background: var(--bg-field); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
          
          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Cart Total Value (RM)</label>
            <input type="range" id="sim-red-cart" min="100" max="5000" step="100" value="1000" oninput="simRedemptCalc()">
            <span class="ctrl-val" id="sim-red-cart-v">RM 1,000</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Customer Wallet (Points)</label>
            <input type="range" id="sim-red-wallet" min="0" max="100000" step="1000" value="50000" oninput="simRedemptCalc()">
            <span class="ctrl-val" id="sim-red-wallet-v" style="color: var(--color-amber);">50,000 pts</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Max Discount Cap (%)</label>
            <input type="range" id="sim-red-cap" min="0" max="100" step="10" value="20" oninput="simRedemptCalc()">
            <span class="ctrl-val" id="sim-red-cap-v" style="color: var(--color-coral);">20% Cap</span>
          </div>
          
        </div>

        <!-- Right: Real-time Evaluation -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 12px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px;">Final Checkout Bill</div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px; color:var(--text-main);">
              <span>Cart Total:</span> <span id="out-red-cart">RM 1,000.00</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px; color:var(--color-amber);">
              <span>Points Deducted (<span id="out-red-pts-used">20000</span> pts):</span> <span id="out-red-discount">- RM 200.00</span>
            </div>
            <div style="height:1px; background:var(--border-color); margin: 10px 0;"></div>
            <div style="display:flex; justify-content:space-between; font-size:22px; font-weight:bold; color:var(--color-primary);">
              <span>Out of Pocket Cash:</span> <span id="out-red-cash">RM 800.00</span>
            </div>
          </div>
        </div>
      </div>

      <hr style="border-color: var(--border-color); margin: 40px 0;">

      <!-- RENEWAL SIMULATOR -->
      <h2 style="font-size:24px; color:var(--color-teal); margin-bottom:10px;">2. Expiry & Soft Downgrades</h2>
      <p style="color:var(--text-muted); margin-bottom: 20px;">Use the slider to see how Activity Expiry zeroes out wallets, and how Tier Renewal drops a customer gracefully by only 1 tier instead of to the bottom.</p>

      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- Left: Interactive Controls -->
        <div style="flex: 1; min-width: 300px; background: var(--bg-field); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
          
          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Months of Inactivity</label>
            <input type="range" id="sim-ren-inact" min="0" max="12" step="1" value="2" oninput="simRenewalCalc()">
            <span class="ctrl-val" id="sim-ren-inact-v">2 Months</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px;">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Last 12 Months Spend</label>
            <input type="range" id="sim-ren-spend" min="0" max="10000" step="100" value="1500" oninput="simRenewalCalc()">
            <span class="ctrl-val" id="sim-ren-spend-v">RM 1,500</span>
          </div>

          <div class="ctrl-row" style="margin-bottom: 16px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
            <label style="min-width: 150px; font-size: 12px; color: var(--text-main);">Current Tier</label>
            <select id="sim-ren-tier" onchange="simRenewalCalc()" style="background:var(--bg-main); color:#fff; border:1px solid var(--border-color); border-radius:4px; padding:4px 8px; width: 120px;">
              <option value="Bronze">Bronze (0)</option>
              <option value="Silver">Silver (500)</option>
              <option value="Gold" selected>Gold (2000)</option>
              <option value="Platinum">Platinum (5000)</option>
              <option value="Diamond">Diamond (10000)</option>
            </select>
          </div>
          
        </div>

        <!-- Right: Real-time Evaluation -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            
            <div style="margin-bottom: 20px;">
               <div style="font-size: 12px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Reward Points Status</div>
               <div id="out-ren-expiry" style="font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--color-primary);">Active (Safe)</div>
            </div>

            <div>
               <div style="font-size: 12px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">New Tier Decision</div>
               <div id="out-ren-tier" style="font-family: var(--font-display); font-size: 28px; font-weight: 700; color: #fff;">Soft Downgraded to Silver</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.simRedemptCalc) window.simRedemptCalc();
    if (window.simRenewalCalc) window.simRenewalCalc();
  }, 50);
}

window.simRedemptCalc = function() {
  const cartEl = document.getElementById('sim-red-cart');
  if (!cartEl) return;
  const cartValue = parseInt(cartEl.value);
  const walletPts = parseInt(document.getElementById('sim-red-wallet').value);
  const capPercent = parseInt(document.getElementById('sim-red-cap').value);

  document.getElementById('sim-red-cart-v').textContent = 'RM ' + cartValue.toLocaleString();
  document.getElementById('sim-red-wallet-v').textContent = walletPts.toLocaleString() + ' pts';
  document.getElementById('sim-red-cap-v').textContent = capPercent + '% Cap';

  const walletCashValue = walletPts / 100;
  const maxAllowedDiscount = cartValue * (capPercent / 100);

  let discountApplied = 0;
  let ptsDeducted = 0;
  if (walletPts >= 500) { 
    discountApplied = Math.min(walletCashValue, maxAllowedDiscount);
    ptsDeducted = discountApplied * 100;
  }
  const outOfPocket = cartValue - discountApplied;

  document.getElementById('out-red-cart').textContent = 'RM ' + cartValue.toLocaleString(undefined, {minimumFractionDigits: 2});
  document.getElementById('out-red-pts-used').textContent = ptsDeducted.toLocaleString();
  document.getElementById('out-red-discount').textContent = '- RM ' + discountApplied.toLocaleString(undefined, {minimumFractionDigits: 2});
  document.getElementById('out-red-cash').textContent = 'RM ' + outOfPocket.toLocaleString(undefined, {minimumFractionDigits: 2});
};

window.simRenewalCalc = function() {
  const inactEl = document.getElementById('sim-ren-inact');
  if (!inactEl) return;
  const inact = parseInt(inactEl.value);
  const spend = parseInt(document.getElementById('sim-ren-spend').value);
  const currentTier = document.getElementById('sim-ren-tier').value;

  document.getElementById('sim-ren-inact-v').textContent = inact + (inact === 1 ? ' Month' : ' Months');
  document.getElementById('sim-ren-spend-v').textContent = 'RM ' + spend.toLocaleString();

  const expiryEl = document.getElementById('out-ren-expiry');
  if (inact >= 6) {
    expiryEl.textContent = 'EXPIRED (0 pts)';
    expiryEl.style.color = 'var(--color-coral)';
  } else {
    expiryEl.textContent = 'Active (Safe)';
    expiryEl.style.color = 'var(--color-primary)';
  }

  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
  const req = { 'Bronze': 0, 'Silver': 500, 'Gold': 2000, 'Platinum': 5000, 'Diamond': 10000 };
  
  let targetTierLevel = 0;
  if (spend >= req['Diamond']) targetTierLevel = 4;
  else if (spend >= req['Platinum']) targetTierLevel = 3;
  else if (spend >= req['Gold']) targetTierLevel = 2;
  else if (spend >= req['Silver']) targetTierLevel = 1;
  else targetTierLevel = 0;

  const currentLevel = tiers.indexOf(currentTier);
  let finalLevel = currentLevel;
  let statusText = '';

  if (targetTierLevel > currentLevel) {
    finalLevel = targetTierLevel;
    statusText = 'Upgraded to ' + tiers[finalLevel];
  } else if (targetTierLevel === currentLevel) {
    statusText = 'Retained ' + tiers[finalLevel];
  } else {
    finalLevel = Math.max(0, currentLevel - 1);
    statusText = 'Soft Downgraded to ' + tiers[finalLevel];
  }

  const tierEl = document.getElementById('out-ren-tier');
  tierEl.textContent = statusText;
  
  if (statusText.includes('Upgraded')) tierEl.style.color = 'var(--color-cyan)';
  else if (statusText.includes('Retained')) tierEl.style.color = '#fff';
  else tierEl.style.color = 'var(--color-coral)';
};

/* ==========================================================================
   4. FRAUD PREVENTION PAGE
   ========================================================================== */
function initFraudPrevention() {
  const container = document.getElementById('fraud-wrap');
  if (!container) return;

  container.innerHTML = `
    <div style="padding: 20px; display:flex; flex-direction:column; gap: 30px;">
      
      <div class="pres-slide" style="border:none; box-shadow:none; text-align:center;">
        <h2 style="font-size:24px; color:var(--color-coral); margin-bottom:10px;">Return Fraud Prevention</h2>
        <p style="font-size:14px; max-width:700px; margin: 0 auto; color:var(--text-muted); line-height:1.5;">
          If someone buys an RM 5,000 item, claims the VIP Tier, spends their points, and then returns the item 7 days later, the company loses huge margins. We solve this using two critical systems.
        </p>
      </div>

      <!-- Pending Points Rule -->
      <div class="pres-slide">
        <h3 style="color:var(--color-cyan); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;"><i class="ti ti-lock"></i> 1. The "Pending Points" Escrow Rule</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">
          Points are never given instantly. They are held in escrow until the legal return window closes.
        </p>
        <div class="timeline" style="margin-top: 10px;">
          <div class="timeline-step">
            <div class="step-num" style="background:var(--color-primary);">Day 1</div>
            <div class="step-content">
              <div class="step-title">Order Placed (RM 5,000)</div>
              <div class="step-desc">Customer sees "+ 5,000 points" in their app, but they are marked as <strong>PENDING</strong>. Tier remains unchanged.</div>
            </div>
          </div>
          <div class="timeline-step">
            <div class="step-num" style="background:var(--color-coral);">Day 7</div>
            <div class="step-content">
              <div class="step-title" style="color:var(--color-coral);">Return Initiated</div>
              <div class="step-desc">Customer returns the item for a refund. The Pending Points are silently cancelled. Company is 100% safe.</div>
            </div>
          </div>
          <div class="timeline-step">
            <div class="step-num" style="background:var(--color-cyan);">Day 14</div>
            <div class="step-content">
              <div class="step-title" style="color:var(--color-cyan);">Clearance</div>
              <div class="step-desc">If the item was NOT returned, the return window expires. The points unlock into the Active Wallet, and the Tier evaluates for upgrade.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clawback Rule -->
      <div class="pres-slide">
        <h3 style="color:var(--color-amber); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;"><i class="ti ti-arrow-back-up"></i> 2. The Clawback Rule</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">
          In cases where an offline or manual override credits points instantly, and a refund is issued later.
        </p>
        <ul style="color:var(--text-main); line-height:1.6; margin-left: 20px;">
          <li>As soon as the refund API triggers, the system initiates a <strong>Clawback</strong>.</li>
          <li>It deducts the exact point value (e.g. -5000) from the Active Wallet.</li>
          <li>If the user already spent the points, their balance goes <strong>Negative (e.g. -1,500 pts)</strong>.</li>
          <li>The Dynamic Tier Score instantly drops, which revokes their VIP privileges and downgrades their tier.</li>
        </ul>
      </div>

    </div>
  `;
}

/* ==========================================================================
   5. ENGAGEMENT IDEAS PAGE
   ========================================================================== */
function initEngagement() {
  const container = document.getElementById('engagement-wrap');
  if (!container) return;

  const ideas = [
    { title: "Gamified Profile Completion", desc: "Don't just give points for signups. Give points for completing the profile 100% (Birthday, Preferences) for deep data mining." },
    { title: "The Eco-Recycling Drop", desc: "Award points for returning empty product containers. Sustainability attracts high-value customers." },
    { title: "Tiered Product Reviews", desc: "Text Review = 20 Pts, Photo = 50 Pts, Video Review = 100 Pts. Generates high-quality UGC." },
    { title: "UGC Hashtag Challenge", desc: "Points awarded via API tracking when users post a TikTok/Reel with your specific brand hashtag." },
    { title: "The 'Waitlist' Bonus", desc: "Give 50 points to customers who join a waitlist for an out-of-stock item so they don't buy from a competitor." },
    { title: "Daily Login Streaks", desc: "Give points for opening the app daily (Snapchat style). If they miss a day, the streak resets." },
    { title: "Refer-a-Friend (Mentor Bonus)", desc: "Normal points for referral. BUT if the referred friend hits 'Gold Tier' later, the referrer gets a 5,000pt massive bonus." },
    { title: "Micro-Votes & Polls", desc: "Earn 10 points for voting on things like 'Which color should we launch next?'. Creates psychological investment." },
    { title: "Hidden Easter Eggs", desc: "Hide a 'Gold Coin' on a random product page monthly. First 100 users to find it get 500 points. Drives massive traffic." },
    { title: "Charity Point Donations", desc: "Let VIPs donate points to charity (e.g., 1000 Pts = RM 10 donated to plant trees). Boosts brand goodwill." },
    { title: "App-Only Flash Missions", desc: "Push notification: 'Order between 2 PM and 4 PM today for 3x Points!' Drives instant sales on slow days." },
    { title: "Community Q&A", desc: "Earn points for answering another customer's question on the product page (Amazon style). Offloads customer support." },
    { title: "Digital Milestone Badges", desc: "Points and badges for '1 Year Anniversary' or 'Reviewed 5 items'. Gamification builds collection habits." },
    { title: "Post-Purchase Survey", desc: "30 points for filling out a quick 3-question survey 3 days after delivery. Valuable operational feedback." },
    { title: "The 'Unboxing' Video Reward", desc: "Give massive points (1,000) if they upload an unboxing video to YouTube and link it. Floods search results with positive videos." },
    { title: "The Mystery Box (Gacha)", desc: "Spend 1,000 points to buy a 'Mystery Box' in-app. Could contain a RM 5 voucher, a product, or a 5,000 pt jackpot." },
    { title: "Zero-Waste Bonus", desc: "Check 'Minimal Packaging' at checkout to earn 50 points. Saves the brand money on boxes, rewards the customer." },
    { title: "Trade-In The Competitor", desc: "'Send us your old [Competitor Brand] bottle, we'll recycle it and give you 2,000 points to switch to us!'" },
    { title: "Co-Creation / Beta Testing", desc: "Send unreleased product samples to Diamond VIPs. They earn points for filling out detailed feedback forms." },
    { title: "The Weather/Event Trigger", desc: "Real-time API trigger: If it's raining in their city, send 'Gloomy day? Earn 2x points now to cheer up!'" },
    { title: "In-App Mini Games", desc: "A 'Spin the Wheel' game. 1 free spin a day. Pay 50 points for extra spins. Prizes include discounts or free shipping." },
    { title: "Social Commerce Live Drops", desc: "Flash a Promo Code on an Instagram Live for just 30 seconds. First person to enter it in the app gets 500 points." },
    { title: "The 'Gift a Friend' Transfer", desc: "Allow users to transfer points to a friend on their birthday, and the brand adds a 10% bonus." },
    { title: "The 'Second Chance' Receipt", desc: "Allow scanning of a physical retail receipt within 7 days in the app to claim points if they forgot at checkout." },
    { title: "Fitness / Habit Integration", desc: "Link with Apple Health. 'Walk 10,000 steps today while wearing our gear to earn 50 points!' (Brand specific)." }
  ];

  let gridHtml = '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 20px;">';
  
  ideas.forEach((idea, index) => {
    gridHtml += `
      <div style="background:var(--bg-field); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:20px; transition:transform 0.2s;">
        <div style="color:var(--color-primary); font-size:12px; font-weight:bold; margin-bottom:5px;">IDEA #${index + 1}</div>
        <h4 style="color:#fff; font-size:16px; margin-bottom:10px;">${idea.title}</h4>
        <p style="color:var(--text-muted); font-size:13px; line-height:1.5;">${idea.desc}</p>
      </div>
    `;
  });

  gridHtml += '</div>';

  container.innerHTML = `
    <div style="text-align:center; padding: 20px;">
      <p style="color:var(--text-muted); max-width:600px; margin: 0 auto;">Customer engagement shouldn't just be about spending money. A successful loyalty program rewards time, attention, and data. Here are 25 highly unique strategies.</p>
    </div>
    ${gridHtml}
  `;
}
