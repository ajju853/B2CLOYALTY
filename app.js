
/* ==========================================================================
   B2C LOYALTY MASTER DECK - FRONTEND LOGIC
   ========================================================================== */

const PAGES = ['journey', 'formulas', 'advanced-tier', 'red-ren', 'fraud', 'engagement', 'social-tech', 'p-bronze', 'p-silver', 'p-gold', 'p-plat', 'p-diamond'];

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
    case 'social-tech': initTech(); break;
    case 'p-bronze': initPersonaBronze(); break;
    case 'p-silver': initPersonaSilver(); break;
    case 'p-gold': initPersonaGold(); break;
    case 'p-plat': initPersonaPlat(); break;
    case 'p-diamond': initPersonaDiamond(); break;
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
    { num: '01', title: "PROFILE & REGISTRATION", color: "#3B82F6", icon: "ti-user-plus", purpose: "Create customer profile and register.", input: "<ul><li>Mobile</li><li>Email</li><li>Referral</li></ul>", logic: "Validate Mobile<br>Create UUID<br>Assign Default Tier", output: "Customer Created", formula: "RM 1 = 1 Point (Default earning rate)", status: "Completed" },
    { num: '02', title: "EXPLORE & ENGAGE", color: "#10B981", icon: "ti-search", purpose: "Browse products and interact with the brand daily.", input: "<ul><li>App Opens</li><li>Wishlist Adds</li></ul>", logic: "Track Daily Streaks<br>Award Behavior Points", output: "Behavior Points Added", formula: "Rule: Max 1 streak bonus per day", status: "Completed" },
    { num: '03', title: "PLACE ORDER", color: "#F97316", icon: "ti-shopping-cart", purpose: "Customer places their first purchase.", input: "<ul><li>Cart Items</li><li>Payment Info</li></ul>", logic: "Process Payment<br>Generate Order ID", output: "Order Confirmed", formula: "Base RM total calculated", status: "Completed" },
    { num: '04', title: "POINTS EARNING", color: "#8B5CF6", icon: "ti-coin", purpose: "Calculate and award raw points based on spend.", input: "<ul><li>Confirmed Order (RM)</li></ul>", logic: "Multiply Spend by Base Rate", output: "Raw Points Generated", formula: "Points = RM Spend × 1", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#06B6D4", icon: "ti-lock", purpose: "Hold points in escrow to prevent return fraud.", input: "<ul><li>Raw Points</li><li>Return Window Policy</li></ul>", logic: "Lock points for 14 Days<br>Monitor for Refunds", output: "Pending Points Balance", formula: "Rule: Wait 14 days before unlock", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#EAB308", icon: "ti-wallet", purpose: "Unlock points for redemption once return window clears.", input: "<ul><li>Pending Points</li><li>Time Elapsed</li></ul>", logic: "Transfer Pending to Active<br>Update Total Balance", output: "Active Spendable Points", formula: "Active Pts = Pending Pts (after 14d)", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#EC4899", icon: "ti-key", purpose: "Unlock the ability to redeem points and upgrade tier.", input: "<ul><li>Order Frequency count</li></ul>", logic: "Check if Orders >= 2<br>Remove Probation Lock", output: "Redemption Unlocked", formula: "IF Orders >= 2 THEN Unlock", status: "Completed" },
    { num: '08', title: "POINTS REDEMPTION", color: "#6366F1", icon: "ti-gift", purpose: "Convert points to cash discount during checkout.", input: "<ul><li>Active Wallet Balance</li><li>Cart Total</li></ul>", logic: "Convert points to RM<br>Apply Max Cap limit", output: "Discount Applied to Cart", formula: "Cash = Points ÷ 100<br>Max Cap = Cart × 20%", status: "Completed" },
    { num: '09', title: "TIER SCORE (DTS)", color: "#10B981", icon: "ti-chart-line", purpose: "Calculate the true loyalty value of the customer.", input: "<ul><li>Spend</li><li>Behavior</li><li>Cancellations</li></ul>", logic: "Aggregate 12-month data<br>Apply Frequency Bonus", output: "Dynamic Tier Score (DTS)", formula: "DTS = [(Spend+Behavior)-Cancel] × Freq", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#EF4444", icon: "ti-medal", purpose: "Assign the appropriate tier based on DTS.", input: "<ul><li>DTS Output</li><li>Tier Thresholds</li></ul>", logic: "Match DTS to Threshold<br>Assign Benefits", output: "Final Tier (e.g. Platinum)", formula: "Bronze(0) -> Diamond(10000+)", status: "Completed" },
    { num: '11', title: "RENEW / EXPIRE", color: "#14B8A6", icon: "ti-reload", purpose: "Manage annual tier renewals and inactivity expiry.", input: "<ul><li>Last 12m Spend</li><li>Inactivity Months</li></ul>", logic: "Soft Downgrade tier<br>Zero out expired points", output: "Renewed/Downgraded Tier", formula: "Rule: Drop 1 tier level max", status: "Completed" }
  ];

  let gridHtml = '<div class="arch-grid">';
  
  steps.forEach((s) => {
    gridHtml += `
      <div class="arch-card" style="border-top: 4px solid ${s.color};">
        <div class="arch-header">
          <div class="arch-num" style="background:${s.color};">${s.num}</div>
          <div class="arch-title">${s.title}</div>
        </div>
        
        <div class="arch-icon" style="color:${s.color};">
          <i class="ti ${s.icon}"></i>
        </div>
        
        <div class="arch-section">
          <div class="arch-label" style="color:${s.color};">Purpose</div>
          <div class="arch-value">${s.purpose}</div>
        </div>
        
        <div class="arch-section">
          <div class="arch-label" style="color:${s.color};">Journey Input</div>
          <div class="arch-value">${s.input}</div>
        </div>
        
        <div class="arch-section">
          <div class="arch-label" style="color:${s.color};">Business Logic</div>
          <div class="arch-value">${s.logic}</div>
        </div>
        
        <div class="arch-section">
          <div class="arch-label" style="color:${s.color};">Output</div>
          <div class="arch-value">${s.output}</div>
        </div>
        
        <div class="arch-section">
          <div class="arch-label" style="color:${s.color};">Formula / Rule</div>
          <div class="arch-formula">${s.formula}</div>
        </div>
        
        <div class="arch-status" style="color:${s.color};">
          <i class="ti ti-check"></i> ${s.status}
        </div>
      </div>
    `;
  });

  gridHtml += '</div>';

  const flowHtml = `
    <div class="flow-summary-container">
      <div class="flow-title">End to End Flow Summary</div>
      <div class="flow-track">
        <div class="flow-node"><div class="flow-node-icon" style="color:#3B82F6;"><i class="ti ti-user-plus"></i></div><div class="flow-node-label">Sign Up</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#10B981;"><i class="ti ti-search"></i></div><div class="flow-node-label">Engage</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#F97316;"><i class="ti ti-shopping-cart"></i></div><div class="flow-node-label">Purchase</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#8B5CF6;"><i class="ti ti-coin"></i></div><div class="flow-node-label">Earn</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#06B6D4;"><i class="ti ti-lock"></i></div><div class="flow-node-label">Pending</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#EAB308;"><i class="ti ti-wallet"></i></div><div class="flow-node-label">Wallet</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#6366F1;"><i class="ti ti-gift"></i></div><div class="flow-node-label">Redeem</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#10B981;"><i class="ti ti-chart-line"></i></div><div class="flow-node-label">DTS</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#EF4444;"><i class="ti ti-medal"></i></div><div class="flow-node-label">Tier</div></div>
        <div class="flow-arrow"><i class="ti ti-arrow-right"></i></div>
        
        <div class="flow-node"><div class="flow-node-icon" style="color:#14B8A6;"><i class="ti ti-reload"></i></div><div class="flow-node-label">Renew</div></div>
      </div>
    </div>
  `;

  container.innerHTML = gridHtml + flowHtml;
}

function initFormulas() {
  const container = document.getElementById('formulas-wrap');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap: 30px; padding: 20px;">
      
      <div class="pres-slide" style="text-align:center;">
        <h2 style="color:var(--color-primary); margin-bottom:10px;">B2C Loyalty System ke 4 Core Formulas</h2>
        <p style="color:var(--text-muted); font-size:14px;">Is poore system ko chalane ke liye 4 main mathematical formulas use hote hain. Chaliye inhe Hindi mein detail mein samjhte hain.</p>
      </div>

      <!-- 1. The Base Formula -->
      <div class="pres-slide">
        <h3 style="color:var(--color-primary); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">Formula #1: Points Earning (Points Kaise Kamayein)</h3>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff; margin-bottom:10px;">
          <strong>Points Earned = Total Spend (RM) × 1</strong>
        </div>
        <p style="color:var(--text-muted); line-height:1.6;">
          <strong>Explanation:</strong> Customer jo bhi paisa kharch karta hai, use utne hi points milte hain. Jaise agar customer ne RM 500 kharch kiya, toh usko exactly 500 Points milenge.
        </p>
      </div>

      <!-- 2. Dynamic Tier Score -->
      <div class="pres-slide">
        <h3 style="color:var(--color-teal); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">Formula #2: Dynamic Tier Score (DTS)</h3>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff; margin-bottom: 15px;">
          <strong>DTS = [ (Confirmed Spend) + (Behavior Points) - (Canceled Spend) ] × Frequency Multiplier</strong>
        </div>
        <p style="color:var(--text-muted); line-height:1.6; margin-bottom:10px;">
          <strong>Explanation:</strong> Yeh formula decide karta hai ki customer Bronze banega ya Diamond. Sirf paisa nahi, balki customer ka poora behavior calculate hota hai:
        </p>
        <ul style="color:var(--text-main); line-height:1.6; margin-left: 20px; font-size:14px;">
          <li><strong>Confirmed Spend:</strong> Order jo safely deliver ho gaye.</li>
          <li><strong>Behavior Points:</strong> Reviews likhne ya Instagram par tag karne ke extra points.</li>
          <li><strong>Canceled Spend:</strong> Refund ya Cancel hue order ka exact RM value minus ho jata hai taaki fraud na ho (Clawback).</li>
          <li><strong>Frequency Multiplier:</strong> Agar 12 mahine mein 3 ya usse zyada order hain, toh 10% bonus milta hai (Multiplier = 1.1).</li>
        </ul>
      </div>

      <!-- 3. Redemption -->
      <div class="pres-slide">
        <h3 style="color:var(--color-cyan); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">Formula #3: Cash Discount Conversion</h3>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff; margin-bottom: 15px;">
          <strong>Discount Value (RM) = Points ÷ 100</strong>
        </div>
        <p style="color:var(--text-muted); line-height:1.6; margin-bottom:10px;">
          <strong>Explanation:</strong> Jab customer points ko discount mein badalta hai, toh usko 1% flat cashback milta hai. 100 Points = RM 1.00. (e.g. 5,000 points = RM 50 ka discount).
        </p>
      </div>

      <!-- 4. Max Cap -->
      <div class="pres-slide">
        <h3 style="color:var(--color-coral); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px;">Formula #4: Max Allowed Cap (Company Protection)</h3>
        <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; font-family:monospace; color:#fff; margin-bottom: 15px;">
          <strong>Max Allowed Discount = Cart Total × 20%</strong>
        </div>
        <p style="color:var(--text-muted); line-height:1.6; margin-bottom:10px;">
          <strong>Explanation:</strong> Company ka cashflow bachane ke liye, koi bhi customer apne pure points laga kar 100% free order nahi le sakta. Wo apne bill ka sirf max 20% hi discount le sakta hai. 
        </p>
      </div>

    </div>
`;
}

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


/* ==========================================================================
   6. SOCIAL TECH API PAGE (Tagging System)
   ========================================================================== */
function initTech() {
  const container = document.getElementById('social-tech-wrap');
  if (!container) return;

  container.innerHTML = `
    <div style="padding: 20px; display:flex; flex-direction:column; gap: 30px;">
      
      <div class="pres-slide" style="border:none; box-shadow:none; text-align:center;">
        <h2 style="font-size:24px; color:var(--color-primary); margin-bottom:10px;">Social Tagging System (How it Works)</h2>
        <p style="font-size:14px; max-width:700px; margin: 0 auto; color:var(--text-muted); line-height:1.5;">
          Customer jab Instagram/Facebook par brand ko tag karta hai (@Brand ya #Hashtag), toh usko automatically points kaise milte hain? Backend API Flow yahan samjhaya gaya hai.
        </p>
      </div>

      <div class="timeline">
        <div class="timeline-step">
          <div class="step-num" style="background:var(--color-cyan);">1</div>
          <div class="step-content">
            <div class="step-title">Profile Linking (Account Connect)</div>
            <div class="step-desc">
              Sabse pehle customer apni website profile mein jaakar apna <strong>Instagram Handle</strong> link karta hai (OAuth Login / Text input). System is handle ko uske User ID se map kar leta hai.
            </div>
          </div>
        </div>
        
        <div class="timeline-step">
          <div class="step-num" style="background:var(--color-primary);">2</div>
          <div class="step-content">
            <div class="step-title">Graph API Webhooks (Listening)</div>
            <div class="step-desc">
              Hamara backend system Facebook Graph API (Instagram API) se connect hota hai. Jab bhi koi public user hamein <strong>@YourBrand</strong> se mention karta hai ya hamara specific <strong>#YourBrandStyle</strong> use karta hai, Instagram API turant hamare server par ek Webhook request (Alert) bhejta hai.
            </div>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-num" style="background:var(--color-amber);">3</div>
          <div class="step-content">
            <div class="step-title">Validation & Match</div>
            <div class="step-desc">
              Server post ka data read karta hai. Phir check karta hai ki post karne wale ka username hamare database mein kisi Linked Account se match hota hai ya nahi. Agar match hota hai, toh rules check hote hain (e.g. Max 1 tag allowed per week to avoid spam).
            </div>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-num" style="background:var(--color-teal);">4</div>
          <div class="step-content">
            <div class="step-title">Automated Point Crediting</div>
            <div class="step-desc">
              Validation pass hone ke baad, system turant customer ke wallet me <strong>+50 Behavior Points</strong> credit kar deta hai aur app me notification bhejta hai: <em>"Thanks for tagging us! +50 Points earned."</em>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `;
}

/* ==========================================================================
   7. 5 PERSONAS PAGE (Bronze to Diamond)
   ========================================================================== */

function initPersonaBronze() {
  const container = document.getElementById('p-bronze-wrap');
  if (!container) return;
  container.innerHTML = `<div style="padding:20px; background:var(--bg-field); border:1px solid #CD7F32; border-radius:var(--radius-lg);">
    <h3 style="color:#fff; font-size:24px; margin-bottom:10px;">Rahul (The Beginner)</h3>
    <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">Rahul naya customer hai. Usne Profile complete ki aur apna sabse pehla order kiya.</p>
    <ul style="color:var(--text-main); font-size:14px; line-height:1.8; margin-left: 20px;">
      <li><strong>Profile Setup:</strong> +100 Points</li>
      <li><strong>Transactions:</strong> 1 Order placed (RM 150)</li>
      <li><strong>Formula:</strong> DTS = (150 + 0) × 1.0 = 150</li>
      <li><strong>Result:</strong> <span style="color:#CD7F32; font-weight:bold;">Bronze (Probation Lock)</span></li>
    </ul>
    <p style="margin-top:15px; font-size:13px; color:var(--text-muted);"><strong>Reason:</strong> Sirf 1 order hai, isliye probation par locked hai. Tier upgrade ke liye 2nd order chahiye.</p>
  </div>`;
}

function initPersonaSilver() {
  const container = document.getElementById('p-silver-wrap');
  if (!container) return;
  container.innerHTML = `<div style="padding:20px; background:var(--bg-field); border:1px solid #888780; border-radius:var(--radius-lg);">
    <h3 style="color:#fff; font-size:24px; margin-bottom:10px;">Priya (The Saver)</h3>
    <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">Priya ko deals pasand hain. Usne 2 baar choti shopping ki.</p>
    <ul style="color:var(--text-main); font-size:14px; line-height:1.8; margin-left: 20px;">
      <li><strong>Profile Setup:</strong> +100 Points</li>
      <li><strong>Transactions:</strong> 2 Orders placed (RM 600 total)</li>
      <li><strong>Formula:</strong> DTS = (600 + 0) × 1.0 = 600</li>
      <li><strong>Result:</strong> <span style="color:#888780; font-weight:bold;">Silver Tier</span></li>
    </ul>
    <p style="margin-top:15px; font-size:13px; color:var(--text-muted);"><strong>Reason:</strong> 2nd order cross kar liya aur DTS 500 cross kar gaya, toh Silver ban gayi.</p>
  </div>`;
}

function initPersonaGold() {
  const container = document.getElementById('p-gold-wrap');
  if (!container) return;
  container.innerHTML = `<div style="padding:20px; background:var(--bg-field); border:1px solid #BA7517; border-radius:var(--radius-lg);">
    <h3 style="color:#fff; font-size:24px; margin-bottom:10px;">Amit (The Engager)</h3>
    <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">Amit ne orders lagaye, par usne website ko reviews aur Insta tags se bhar diya.</p>
    <ul style="color:var(--text-main); font-size:14px; line-height:1.8; margin-left: 20px;">
      <li><strong>Profile Setup:</strong> +100 Points</li>
      <li><strong>Transactions:</strong> 3 Orders placed (RM 1,800 total)</li>
      <li><strong>Behavior:</strong> +60 (3 Reviews) & +50 (Insta Tag) = +110</li>
      <li><strong>Formula:</strong> DTS = (1,800 + 110) × 1.10 = 2,101</li>
      <li><strong>Result:</strong> <span style="color:#BA7517; font-weight:bold;">Gold Tier</span></li>
    </ul>
    <p style="margin-top:15px; font-size:13px; color:var(--text-muted);"><strong>Reason:</strong> Score 2,000 cross kar gaya! 3 orders ke wajah se 10% Frequency Bonus bhi mila.</p>
  </div>`;
}

function initPersonaPlat() {
  const container = document.getElementById('p-plat-wrap');
  if (!container) return;
  container.innerHTML = `<div style="padding:20px; background:var(--bg-field); border:1px solid #185FA5; border-radius:var(--radius-lg);">
    <h3 style="color:#fff; font-size:24px; margin-bottom:10px;">Neha (The Brand Advocate)</h3>
    <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">Neha brand ko bahut pasand karti hai. Usne doston ko refer bhi kiya.</p>
    <ul style="color:var(--text-main); font-size:14px; line-height:1.8; margin-left: 20px;">
      <li><strong>Profile Setup:</strong> +100 Points</li>
      <li><strong>Transactions:</strong> 5 Orders placed (RM 4,500). 1 Cancelled (-RM 200)</li>
      <li><strong>Behavior:</strong> +500 (Referred a Friend)</li>
      <li><strong>Formula:</strong> DTS = (4,500 + 500 - 200) × 1.10 = 5,280</li>
      <li><strong>Result:</strong> <span style="color:#185FA5; font-weight:bold;">Platinum Tier</span></li>
    </ul>
    <p style="margin-top:15px; font-size:13px; color:var(--text-muted);"><strong>Reason:</strong> Cancel order ka penalty laga (Clawback), par uske 500 Referral points ne usko bacha liya. Score 5,000 cross karke Platinum.</p>
  </div>`;
}

function initPersonaDiamond() {
  const container = document.getElementById('p-diamond-wrap');
  if (!container) return;
  container.innerHTML = `<div style="padding:20px; background:var(--bg-field); border:1px solid #006064; border-radius:var(--radius-lg);">
    <h3 style="color:#fff; font-size:24px; margin-bottom:10px;">Vikram (The VIP Diamond)</h3>
    <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">Vikram ek High Net-worth Individual (HNI) hai aur saal bhar heavy shopping karta hai.</p>
    <ul style="color:var(--text-main); font-size:14px; line-height:1.8; margin-left: 20px;">
      <li><strong>Profile Setup:</strong> +100 Points</li>
      <li><strong>Transactions:</strong> 10 Orders placed (RM 9,500)</li>
      <li><strong>Behavior:</strong> +1,000 (Beta Testing Co-Creation points)</li>
      <li><strong>Formula:</strong> DTS = (9,500 + 1,000) × 1.10 = 11,550</li>
      <li><strong>Result:</strong> <span style="color:#006064; font-weight:bold;">Diamond Tier</span></li>
    </ul>
    <p style="margin-top:15px; font-size:13px; color:var(--text-muted);"><strong>Reason:</strong> Spend (9.5k) se wo Diamond (10k) tak nahi pahonch raha tha, par Beta Testing (1000) aur 10% Bonus ne usko Diamond bana diya!</p>
  </div>`;
}
