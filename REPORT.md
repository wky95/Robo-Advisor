# DAT.co Indicator Dashboard Report

**Student Name:** 王開育 資工二 B13902152
**Deployed Website URL:** [https://your-project-name.vercel.app](請填入部屬後的網址)
**GitHub Repository:** [https://github.com/your-username/bitcoin](請填入Git Repo網址)

---

## 1. Selected Indicator

**What indicator did you choose?**
I selected the **"Premium to NAV (Net Asset Value)"** for MicroStrategy (MSTR).

**Why did you choose it?**
MicroStrategy is the most prominent Digital Asset Treasury company (DAT.co), effectively operating as a leveraged Bitcoin proxy in the public equity markets. I chose this indicator because it provides a direct, quantifiable measure of public market sentiment toward Bitcoin. By tracking how much of a premium (or discount) traditional equity investors are willing to pay for MSTR shares relative to the underlying value of its Bitcoin holdings, we can gauge the intensity of institutional and retail demand for regulated crypto exposure.

## 2. Relationship with Bitcoin (BTC)

**How is your indicator related to BTC?**
The MSTR Premium to NAV acts as an emotional amplifier for Bitcoin's price movements. Since MSTR holds a massive amount of BTC on its balance sheet (over 200,000+ BTC), the floor value of the company is heavily tied to Bitcoin's spot price. The premium reflects the market's expectation of future Bitcoin price appreciation and MSTR's ability to accretively acquire more BTC through capital markets operations (issuing convertible debt or equity at a premium).

**Insights / Hypotheses on BTC Price Behavior:**
1. **Bull Market FOMO (Leading Indicator):** When Bitcoin enters a rapid uptrend, traditional investors who cannot or prefer not to hold spot BTC themselves rush into MSTR. This often causes the premium to expand significantly (e.g., from 10% to 50%+). An aggressively expanding premium often coincides with or slightly precedes impulsive upward movements in BTC spot prices, signaling extreme market greed.
2. **Bear Market Contraction:** During severe crypto downturns, this premium typically collapses, sometimes turning into a discount to NAV, indicating extreme fear and a lack of speculative capital in the equity markets.
3. **Volatility Proxy:** Tracking this premium offers early warnings of potential local tops or bottoms. If BTC continues to rise while the MSTR premium starts to stagnate or decline, it could indicate exhaustion among traditional equity buyers, foreshadowing a potential broader market correction.

---

## 3. Bonus: AI-Assisted Insights

In addition to data visualization, this platform integrates the **Google Gemini API (`gemini-flash-latest` model)** to automatically generate market insights based on the last 14 days of MSTR vs. BTC data. 
The backend constructs a dynamic prompt containing time-series data of MSTR price, BTC price, and the Premium to NAV, asking the AI to interpret short-term trends and summarize institutional sentiment. This feature provides casual users with an instant, easy-to-understand narrative about current crypto market conditions.
