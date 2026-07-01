
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
