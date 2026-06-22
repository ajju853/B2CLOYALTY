# B2C Loyalty OS — Interactive Presentation & Simulation Platform

An interactive, high-fidelity presentation workspace and simulation engine demonstrating the end-to-end B2C customer loyalty journey. 

Designed for business and technical stakeholders, this platform uses a split-screen layout (Vertical Slide Navigator on the left, Active Slide Screen + Lifecycle Metadata Panel on the right, and Presenter Script Notes at the bottom) to trace a complete customer lifecycle under various loyalty rules, multiplier mechanics, and campaign events.

## 🚀 Key Features

* **Interactive Slide Deck**: 18 high-fidelity slides tracing the complete end-to-end loyalty journey of a customer (**Manoj Kumar**).
* **Live Mathematical Simulators**: Real-time interactive range sliders embedded directly inside slide mockups:
  * **Spend Multipliers**: Calculate points earned dynamically based on spending behavior.
  * **Tier Progression**: Move milestones to transition between Bronze, Silver, Gold, and Platinum tiers with visual card updates.
  * **Earning Multipliers**: Apply multiplier rewards depending on the customer's current tier status.
  * **Redemption & Capping**: Simulate bill payments, applying points redemptions, and enforcing the 20% capping rule.
* **Professional Lifecycle Metadata**: Each slide displays:
  * **Objective**: What we are trying to achieve at this stage.
  * **Customer Experience (CX)**: What the customer actually sees on their device.
  * **System Action**: What the loyalty engine does in the background (without technical developer jargon).
  * **Points Math**: Exact formula and calculations of points accrued, redeemed, or capped.
* **Split-Screen Layout**: Designed to feel like a premium, interactive presenter board.

---

## 🛠️ Tech Stack & Structure

* **Frontend**: HTML5, Vanilla JavaScript, and clean CSS styling.
* **Layout**: Split-screen dashboard layout optimized for interactive presentation.
* **No Server Overhead**: Runs fully in-browser with local simulation state.

### File Structure
* [index.html](file:///c:/Users/Lenovo/Downloads/crm%20website%20b2c/index.html): Clean presentation interface, slide wrapper, and UI styling anchors.
* [app.js](file:///c:/Users/Lenovo/Downloads/crm%20website%20b2c/app.js): Core simulation engine containing the 18-slide dataset, interactive range-slider bindings, and lifecycle math triggers.
* [style.css](file:///c:/Users/Lenovo/Downloads/crm%20website%20b2c/style.css): Dark-mode premium layout system with glassmorphic cards, slide navigators, and interactive styles.

---

## 💻 Getting Started

To run this platform locally:

1. **Install dependencies (Serve tool)**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm start
   ```
   Or run:
   ```bash
   npx serve .
   ```

3. **Open the browser**:
   Go to `http://localhost:3000` (or the port specified by the serve command).

---

## 📖 The Manoj Kumar B2C Journey
The 18 slides trace the following sequence of events:
1. **Welcome**: Join/Registration & signup reward (Welcome points).
2. **First Purchase**: Transaction accrual.
3. **Engagement Loop**: Referrals, product reviews, and social sharing bonuses.
4. **Tier Promotion**: Transitioning tiers based on lifetime points milestone.
5. **Earning Boosters**: Leveraging tier-based 1.5x/2x multipliers.
6. **Redemption & Capping**: Redeeming points during checkout subject to a 20% max-bill capping rule.
7. **Compensation & Recovery**: Handling order cancellations/out-of-stock items via automatic points refund.
8. **Missions & Surprise Drops**: Weekly challenges, birthday multipliers, and seasonal surprise reward drops.
9. **Retention**: WhatsApp notifications for points expiration warnings, inactivity warnings, and grace periods.
