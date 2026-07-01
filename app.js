
/* ==========================================================================
   B2C LOYALTY MASTER DECK - FRONTEND LOGIC
   ========================================================================== */

const PAGES = ['journey', 'formulas', 'advanced-tier', 'red-ren', 'fraud', 'engagement', 'social-tech', 'p-bronze', 'p-silver', 'p-gold', 'p-plat', 'p-diamond', 'p-dormant'];

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
    case 'p-dormant': initPersonaDormant(); break;
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
    { num: '01', title: "CUSTOMER ACQUISITION ENGINE", color: "#3B82F6", icon: "ti-users", purpose: "Capture customers from every channel.", input: "<ul><li>Website / App</li><li>QR Code</li><li>Referral / Social Login</li><li>Campaigns</li></ul>", logic: "Track Source<br>Register User", output: "Customer ID", formula: "Rule: Multi-channel entry", status: "Active" },
    { num: '02', title: "CUSTOMER 360 PROFILE ENGINE", color: "#10B981", icon: "ti-id", purpose: "Store everything about the customer in a single view.", input: "<ul><li>Personal Info</li><li>Wishlist & Reviews</li><li>Lifetime Spend</li></ul>", logic: "Aggregate Data<br>Sync Preferences", output: "360° Customer Profile", formula: "Rule: Single source of truth", status: "Active" },
    { num: '03', title: "ENROLLMENT ENGINE", color: "#F97316", icon: "ti-address-book", purpose: "Customer joins the loyalty program.", input: "<ul><li>Loyalty Opt-in</li><li>Profile Complete</li></ul>", logic: "Assign Default Tier<br>Award Welcome Pts", output: "Loyalty ID & Bronze Status", formula: "Initial Tier = Bronze (Probation)", status: "Active" },
    { num: '04', title: "PENDING WALLET ENGINE", color: "#06B6D4", icon: "ti-shield-lock", purpose: "Prevent return fraud by holding points in escrow.", input: "<ul><li>Purchase Value</li><li>Order Date</li></ul>", logic: "Generate Points<br>Lock for 14 Days", output: "Pending Points Balance", formula: "Rule: 14-Day Return Window Lock", status: "Active" },
    { num: '05', title: "ACTIVE WALLET ENGINE", color: "#EAB308", icon: "ti-wallet", purpose: "Manage spendable points after verification.", input: "<ul><li>Pending Points</li><li>14 Days Cleared</li></ul>", logic: "Move from Pending to Active", output: "Active Wallet Balance", formula: "Active = Pending (if no return)", status: "Active" },
    { num: '06', title: "DYNAMIC TIER SCORE (DTS) ENGINE", color: "#10B981", icon: "ti-chart-line", purpose: "The Brain: Calculate true loyalty value.", input: "<ul><li>Spend</li><li>Behavior</li><li>Cancellations</li></ul>", logic: "Aggregate 12m data<br>Apply Frequency Bonus", output: "Dynamic Tier Score", formula: "DTS = [(Spend+Beh)-Cancel] × Freq", status: "Active" },
    { num: '07', title: "TIER EVALUATION ENGINE", color: "#EF4444", icon: "ti-medal", purpose: "Evaluate DTS and assign the correct tier.", input: "<ul><li>DTS Score</li><li>Total Orders</li></ul>", logic: "Check Thresholds<br>Remove Probation", output: "Assigned Tier Badge", formula: "0-499 Bronze | 10000+ Diamond", status: "Active" },
    { num: '08', title: "REDEMPTION ENGINE", color: "#6366F1", icon: "ti-gift", purpose: "Handle points-to-cash conversion at checkout.", input: "<ul><li>Active Points</li><li>Cart Total</li></ul>", logic: "Apply 20% Max Cap<br>Require 500 Min Pts", output: "Cash Discount Applied", formula: "Cash = Pts ÷ 100 | Max = Cart×20%", status: "Active" },
    { num: '09', title: "REWARDS ENGINE", color: "#EC4899", icon: "ti-ticket", purpose: "Manage catalogs of non-cash benefits.", input: "<ul><li>Customer Tier</li><li>Available Points</li></ul>", logic: "Unlock Tier Benefits", output: "Coupons, Free Shipping, Gifts", formula: "Rule: Tier-based unlocking", status: "Active" },
    { num: '10', title: "CLAWBACK & FRAUD ENGINE", color: "#DC2626", icon: "ti-alert-triangle", purpose: "Reverse fraudulent rewards and cancellations.", input: "<ul><li>Refund Event</li><li>Canceled Order</li></ul>", logic: "Remove Spend/Points<br>Recalculate DTS", output: "Clawback / Downgrade", formula: "Cancel = Reverse Pts & Spend", status: "Active" },
    { num: '11', title: "BEHAVIOR INTELLIGENCE ENGINE", color: "#8B5CF6", icon: "ti-brain", purpose: "Reward engagement beyond spending.", input: "<ul><li>Reviews, Logins</li><li>Referrals, Wishlist</li></ul>", logic: "Track Non-Spend Actions", output: "Behavior Points Awarded", formula: "Action mapped to Point Value", status: "Active" },
    { num: '12', title: "CAMPAIGN & AUTOMATION ENGINE", color: "#14B8A6", icon: "ti-broadcast", purpose: "Trigger automated journeys and campaigns.", input: "<ul><li>Birthdays</li><li>Flash Sales</li></ul>", logic: "Run Journey Builder", output: "Automated Comms & Bonuses", formula: "Rule: Trigger -> Action", status: "Active" },
    { num: '13', title: "EXPIRY & RENEWAL ENGINE", color: "#64748B", icon: "ti-reload", purpose: "Manage lifecycle expiries and tier retention.", input: "<ul><li>6 Months Inactive</li><li>365 Days Elapsed</li></ul>", logic: "Expire Points<br>Soft Downgrade Tier", output: "Zero Points / -1 Tier Drop", formula: "Rule: Max 1 Tier Drop per Year", status: "Active" },
    { num: '14', title: "ANALYTICS ENGINE", color: "#0EA5E9", icon: "ti-report-analytics", purpose: "Measure program performance and KPIs.", input: "<ul><li>Transactions</li><li>Redemptions</li></ul>", logic: "Generate Dashboards", output: "ROI, Fraud Rate, LTV", formula: "Rule: Data-driven insights", status: "Active" },
    { num: '15', title: "CONFIGURATION ENGINE", color: "#6B7280", icon: "ti-settings", purpose: "Admin controls for business rules without code.", input: "<ul><li>Admin UI Inputs</li></ul>", logic: "Update System Variables", output: "Live System Updates", formula: "Rule: Dynamic Parameterization", status: "Active" }
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
          <div class="arch-label" style="color:${s.color};">Key Inputs</div>
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
      </div>
    `;
  });

  gridHtml += '</div>';

  const flowHtml = `
    <div class="flow-summary-container" style="background: transparent; border: none; box-shadow: none;">
      <div class="flow-title">Actual Customer Lifecycle (End-to-End Flow)</div>
      <div class="mermaid" style="text-align:center; background:#151A22; padding:30px; border-radius:18px; border:1px solid rgba(255,255,255,0.05);">
        graph TD
          Customer((Customer)) --> Reg[Registration]
          Reg --> Profile[360° Profile]
          Profile --> Enroll[Enrollment]
          Enroll --> Purch[Purchase]
          Purch --> Pending[Pending Wallet]
          Pending --> Check{Return Window Check}
          
          Check -- Yes --> Cancel[Cancel Points]
          Cancel --> Clawback[Clawback Engine]
          
          Check -- No --> Active[Active Wallet]
          Active --> DTS[DTS Calculation]
          DTS --> TierEval[Tier Evaluation]
          TierEval --> SecPurch{Second Purchase?}
          
          SecPurch -- No --> Lock[Redemption Locked]
          SecPurch -- Yes --> Unlock[Redemption Enabled]
          
          Unlock --> Rewards[Rewards Engine]
          Rewards --> Auto[Automation Engine]
          Auto --> Analytics[Analytics Engine]
          Analytics --> Renew[Renewal & Expiry]
          Lock --> Analytics
      </div>
    </div>
  `;

  container.innerHTML = gridHtml + flowHtml;
  
  // Render Mermaid diagram
  if(window.mermaid) {
    mermaid.run({ querySelector: '.mermaid' });
  }
}

function renderPersonaGrid(containerId, steps) {
  const container = document.getElementById(containerId);
  if (!container) return;

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
          <div class="arch-label" style="color:${s.color};">Persona Input</div>
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
          <i class="ti ${s.statusIcon || 'ti-check'}"></i> ${s.status}
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

function initPersonaBronze() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#CD7F32", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#64748B", icon: "ti-search", purpose: "Interact with brand.", input: "None", logic: "No behavior tracked", output: "0 Behavior Points", formula: "N/A", status: "Skipped", statusIcon: "ti-x" },
    { num: '03', title: "1ST PURCHASE", color: "#CD7F32", icon: "ti-shopping-cart", purpose: "First order placed.", input: "Order Value: RM 150", logic: "Process Payment", output: "Order Confirmed", formula: "Spend = 150", status: "Completed" },
    { num: '04', title: "EARNING", color: "#CD7F32", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 150 Spend", logic: "Multiply by 1", output: "150 Raw Points", formula: "150 × 1 = 150 Pts", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#CD7F32", icon: "ti-lock", purpose: "Hold points in escrow.", input: "150 Points", logic: "Lock for 14 Days", output: "150 Pending", formula: "Wait 14 days", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#CD7F32", icon: "ti-wallet", purpose: "Unlock points.", input: "14 days elapsed", logic: "Transfer to Active", output: "150 Active Points", formula: "Active = Pending", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#EF4444", icon: "ti-key", purpose: "Unlock tier benefits.", input: "No 2nd Order", logic: "Probation Lock remains", output: "Redemption Locked", formula: "IF Orders < 2 THEN Lock", status: "Failed", statusIcon: "ti-lock" },
    { num: '08', title: "REDEMPTION", color: "#64748B", icon: "ti-gift", purpose: "Convert points.", input: "Locked", logic: "Cannot redeem", output: "0 Discount", formula: "Locked", status: "Blocked", statusIcon: "ti-lock" },
    { num: '09', title: "DTS SCORE", color: "#CD7F32", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 150, Freq: 1", logic: "Aggregate Data", output: "DTS = 150", formula: "(150) × 1.0 = 150", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#CD7F32", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 150", logic: "Match to Thresholds", output: "Bronze (Probation)", formula: "0-499 = Bronze", status: "Assigned" },
    { num: '11', title: "RENEWAL", color: "#64748B", icon: "ti-reload", purpose: "Annual review.", input: "Not reached 1 yr", logic: "N/A", output: "N/A", formula: "N/A", status: "Pending", statusIcon: "ti-clock" }
  ];
  renderPersonaGrid('p-bronze-wrap', steps);
}

function initPersonaSilver() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#888780", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#64748B", icon: "ti-search", purpose: "Interact with brand.", input: "None", logic: "No behavior tracked", output: "0 Behavior Points", formula: "N/A", status: "Skipped", statusIcon: "ti-x" },
    { num: '03', title: "PURCHASES", color: "#888780", icon: "ti-shopping-cart", purpose: "Orders placed.", input: "Order 1: RM 400<br>Order 2: RM 200", logic: "Process Payments", output: "Total Spend RM 600", formula: "Freq = 2", status: "Completed" },
    { num: '04', title: "EARNING", color: "#888780", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 600 Spend", logic: "Multiply by 1", output: "600 Raw Points", formula: "600 × 1 = 600 Pts", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#888780", icon: "ti-lock", purpose: "Hold points in escrow.", input: "600 Points", logic: "Lock for 14 Days", output: "600 Pending", formula: "Wait 14 days", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#888780", icon: "ti-wallet", purpose: "Unlock points.", input: "14 days elapsed", logic: "Transfer to Active", output: "600 Active Points", formula: "Active = Pending", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#10B981", icon: "ti-key", purpose: "Unlock tier benefits.", input: "2 Orders Confirmed", logic: "Probation Lock Removed", output: "Redemption Unlocked", formula: "Orders >= 2", status: "Unlocked" },
    { num: '08', title: "REDEMPTION", color: "#64748B", icon: "ti-gift", purpose: "Convert points.", input: "Hasn't redeemed yet", logic: "Save points", output: "Wallet unchanged", formula: "N/A", status: "Pending", statusIcon: "ti-clock" },
    { num: '09', title: "DTS SCORE", color: "#888780", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 600, Freq: 2", logic: "Aggregate Data", output: "DTS = 600", formula: "(600) × 1.0 = 600", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#888780", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 600", logic: "Match to Thresholds", output: "Silver Tier", formula: "500-1999 = Silver", status: "Assigned" },
    { num: '11', title: "RENEWAL", color: "#64748B", icon: "ti-reload", purpose: "Annual review.", input: "Not reached 1 yr", logic: "N/A", output: "N/A", formula: "N/A", status: "Pending", statusIcon: "ti-clock" }
  ];
  renderPersonaGrid('p-silver-wrap', steps);
}

function initPersonaGold() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#BA7517", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#BA7517", icon: "ti-search", purpose: "Social interaction.", input: "3 Reviews<br>1 Insta Tag", logic: "API Webhook match", output: "+110 Behavior Points", formula: "Reviews+Tags", status: "Completed" },
    { num: '03', title: "PURCHASES", color: "#BA7517", icon: "ti-shopping-cart", purpose: "Orders placed.", input: "3 Orders Total", logic: "Process Payments", output: "Total Spend RM 1,800", formula: "Freq = 3", status: "Completed" },
    { num: '04', title: "EARNING", color: "#BA7517", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 1,800 Spend", logic: "Multiply by 1", output: "1,800 Raw Points", formula: "1800 × 1 = 1800 Pts", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#BA7517", icon: "ti-lock", purpose: "Hold points in escrow.", input: "All points", logic: "Lock for 14 Days", output: "Cleared", formula: "Wait 14 days", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#BA7517", icon: "ti-wallet", purpose: "Unlock points.", input: "14 days elapsed", logic: "Transfer to Active", output: "1,910 Active Pts (incl behavior)", formula: "Spend+Behavior", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#10B981", icon: "ti-key", purpose: "Unlock tier benefits.", input: "3 Orders Confirmed", logic: "Probation Lock Removed", output: "Redemption Unlocked", formula: "Orders >= 2", status: "Unlocked" },
    { num: '08', title: "REDEMPTION", color: "#64748B", icon: "ti-gift", purpose: "Convert points.", input: "Saving for later", logic: "Save points", output: "Wallet unchanged", formula: "N/A", status: "Pending", statusIcon: "ti-clock" },
    { num: '09', title: "DTS SCORE", color: "#BA7517", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 1800, Beh: 110, Freq: 3", logic: "Apply 10% Freq Bonus", output: "DTS = 2,101", formula: "(1800+110) × 1.1", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#BA7517", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 2,101", logic: "Match to Thresholds", output: "Gold Tier", formula: "2000-4999 = Gold", status: "Assigned" },
    { num: '11', title: "RENEWAL", color: "#64748B", icon: "ti-reload", purpose: "Annual review.", input: "Not reached 1 yr", logic: "N/A", output: "N/A", formula: "N/A", status: "Pending", statusIcon: "ti-clock" }
  ];
  renderPersonaGrid('p-gold-wrap', steps);
}

function initPersonaPlat() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#185FA5", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#185FA5", icon: "ti-search", purpose: "Referrals.", input: "Referred 1 Friend", logic: "Friend hit Gold", output: "+500 Referral Points", formula: "Referral Bonus", status: "Completed" },
    { num: '03', title: "PURCHASES", color: "#185FA5", icon: "ti-shopping-cart", purpose: "Orders placed.", input: "5 Orders Total<br>1 Returned Order", logic: "Process Payments & Refunds", output: "Gross RM 4,700<br>Refund RM 200", formula: "Freq = 5", status: "Completed" },
    { num: '04', title: "EARNING", color: "#185FA5", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 4,700 Gross", logic: "Multiply by 1", output: "4,700 Raw Points", formula: "4700 × 1", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#EF4444", icon: "ti-lock", purpose: "Hold points in escrow.", input: "Returned RM 200", logic: "Clawback triggered", output: "-200 Points Deducted", formula: "Cancel = Point Deduction", status: "Clawback!" },
    { num: '06', title: "ACTIVE WALLET", color: "#185FA5", icon: "ti-wallet", purpose: "Final balance.", input: "After clawback", logic: "Gross - Cancel + Beh", output: "5,000 Active Points", formula: "(4700-200)+500", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#10B981", icon: "ti-key", purpose: "Unlock tier benefits.", input: "5 Orders", logic: "Probation Lock Removed", output: "Redemption Unlocked", formula: "Orders >= 2", status: "Unlocked" },
    { num: '08', title: "REDEMPTION", color: "#185FA5", icon: "ti-gift", purpose: "Convert points.", input: "Redeemed 2000 pts", logic: "1% Cashback", output: "RM 20 Discount", formula: "2000 / 100 = 20", status: "Completed" },
    { num: '09', title: "DTS SCORE", color: "#185FA5", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 4500, Beh: 500, Cancel: 200", logic: "Apply 10% Freq Bonus", output: "DTS = 5,280", formula: "(4500+500-200)×1.1", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#185FA5", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 5,280", logic: "Saved by Referrals!", output: "Platinum Tier", formula: "5000-9999 = Plat", status: "Assigned" },
    { num: '11', title: "RENEWAL", color: "#64748B", icon: "ti-reload", purpose: "Annual review.", input: "Not reached 1 yr", logic: "N/A", output: "N/A", formula: "N/A", status: "Pending", statusIcon: "ti-clock" }
  ];
  renderPersonaGrid('p-plat-wrap', steps);
}

function initPersonaDiamond() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#006064", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#006064", icon: "ti-search", purpose: "Co-creation.", input: "Beta Tested New Product", logic: "Submit Feedback Form", output: "+1,000 Behavior Points", formula: "Beta Test Bonus", status: "Completed" },
    { num: '03', title: "PURCHASES", color: "#006064", icon: "ti-shopping-cart", purpose: "Orders placed.", input: "10 Orders Total", logic: "Process Payments", output: "Total Spend RM 9,500", formula: "Freq = 10", status: "Completed" },
    { num: '04', title: "EARNING", color: "#006064", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 9,500 Spend", logic: "Multiply by 1", output: "9,500 Raw Points", formula: "9500 × 1", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#006064", icon: "ti-lock", purpose: "Hold points in escrow.", input: "All orders clear", logic: "Lock for 14 Days", output: "No refunds", formula: "Wait 14 days", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#006064", icon: "ti-wallet", purpose: "Final balance.", input: "14 days elapsed", logic: "Gross + Beh", output: "10,500 Active Pts", formula: "9500+1000", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#10B981", icon: "ti-key", purpose: "Unlock tier benefits.", input: "10 Orders", logic: "Probation Lock Removed", output: "Redemption Unlocked", formula: "Orders >= 2", status: "Unlocked" },
    { num: '08', title: "REDEMPTION", color: "#006064", icon: "ti-gift", purpose: "Convert points.", input: "Redeemed 5000 pts", logic: "1% Cashback", output: "RM 50 Discount", formula: "5000 / 100 = 50", status: "Completed" },
    { num: '09', title: "DTS SCORE", color: "#006064", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 9500, Beh: 1000", logic: "Apply 10% Freq Bonus", output: "DTS = 11,550", formula: "(9500+1000)×1.1", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#006064", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 11,550", logic: "Beta testing pushed to Diamond!", output: "Diamond Tier", formula: "10000+ = Diamond", status: "Assigned" },
    { num: '11', title: "RENEWAL", color: "#64748B", icon: "ti-reload", purpose: "Annual review.", input: "Maintains high spend", logic: "Retain tier", output: "Diamond Retained", formula: "DTS > 10k at Year End", status: "Renewed" }
  ];
  renderPersonaGrid('p-diamond-wrap', steps);
}

function initPersonaDormant() {
  const steps = [
    { num: '01', title: "PROFILE CREATION", color: "#A855F7", icon: "ti-user-plus", purpose: "Register an account.", input: "Email & Mobile", logic: "Create Profile", output: "User ID created", formula: "RM 1 = 1 Point", status: "Completed" },
    { num: '02', title: "ENGAGE", color: "#64748B", icon: "ti-search", purpose: "Interact with brand.", input: "None", logic: "No behavior tracked", output: "0 Behavior Points", formula: "N/A", status: "Skipped", statusIcon: "ti-x" },
    { num: '03', title: "PURCHASES", color: "#A855F7", icon: "ti-shopping-cart", purpose: "Orders placed.", input: "2 Orders (RM 2500 Total)", logic: "High initial spend", output: "Total Spend RM 2,500", formula: "Freq = 2", status: "Completed" },
    { num: '04', title: "EARNING", color: "#A855F7", icon: "ti-coin", purpose: "Calculate raw points.", input: "RM 2500 Spend", logic: "Multiply by 1", output: "2,500 Raw Points", formula: "2500 × 1 = 2500", status: "Completed" },
    { num: '05', title: "PENDING WALLET", color: "#A855F7", icon: "ti-lock", purpose: "Hold points in escrow.", input: "No returns", logic: "Cleared", output: "Cleared", formula: "Wait 14 days", status: "Completed" },
    { num: '06', title: "ACTIVE WALLET", color: "#A855F7", icon: "ti-wallet", purpose: "Final balance.", input: "Points deposited", logic: "Available to spend", output: "2,500 Active Pts", formula: "Pending -> Active", status: "Completed" },
    { num: '07', title: "2ND PURCHASE", color: "#10B981", icon: "ti-key", purpose: "Unlock tier benefits.", input: "2 Orders", logic: "Probation Lock Removed", output: "Redemption Unlocked", formula: "Orders >= 2", status: "Unlocked" },
    { num: '08', title: "REDEMPTION", color: "#64748B", icon: "ti-gift", purpose: "Convert points.", input: "Doesn't redeem", logic: "Hoards points", output: "Wallet unchanged", formula: "N/A", status: "Pending", statusIcon: "ti-clock" },
    { num: '09', title: "DTS SCORE (YEAR 1)", color: "#A855F7", icon: "ti-chart-line", purpose: "Calculate Tier Score.", input: "Spend: 2500, Freq: 2", logic: "No multiplier (<3 orders)", output: "DTS = 2,500", formula: "(2500) × 1.0", status: "Completed" },
    { num: '10', title: "TIER ASSIGNMENT", color: "#BA7517", icon: "ti-medal", purpose: "Determine Tier.", input: "DTS = 2,500", logic: "Hits Gold Target", output: "Gold Tier", formula: "2000-4999 = Gold", status: "Assigned" },
    { num: '11', title: "DORMANCY & RENEWAL", color: "#EF4444", icon: "ti-ghost", purpose: "Disappears for 7 months.", input: "Inactivity > 6 months", logic: "Points Expired & Tier Dropped", output: "0 Points / Silver Tier", formula: "Expiry Rule + Soft Downgrade", status: "Penalized", statusIcon: "ti-alert-triangle" }
  ];
  renderPersonaGrid('p-dormant-wrap', steps);
}

