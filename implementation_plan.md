# GameHub Frontend - Build & Link React Project

Build a properly structured React (Vite) frontend, reorganize all existing flat files into the correct folder hierarchy, fix all imports, replace `react-icons` with Google Material Icons, remove emojis, and match the minimalistic dark theme shown in the demo screenshots.

## User Review Required

> [!IMPORTANT]
> The demo screenshots show the brand name as **"GameHub"**. The current code uses "GameVault". I will rename to **GameHub** to match the demo. Let me know if you'd like to keep "GameVault" instead.

> [!IMPORTANT]
> The demo screenshots show pages not present in the current code (Backups, Activity Logs, Sales Summary, Transactions, Discounts). I'll add routes and stub pages for these to match the demo's admin navbar, but keep focus on linking and styling the existing components.

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] package.json, vite.config.js, index.html
- Initialize a Vite + React project in `gamevault-frontend/`
- Install dependencies: `react`, `react-dom`, `react-router-dom`
- No `react-icons` — use **Google Material Symbols** via CDN link in `index.html`

---

### 2. Directory Structure Reorganization

Move the existing flat files into proper nested folders:

```
gamevault-frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── AuthContext.jsx
    ├── data/
    │   └── mockData.js
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx + Navbar.css
    │   │   ├── Sidebar.jsx + Sidebar.css
    │   │   └── Footer.jsx + Footer.css
    │   └── ui/
    │       └── GameCard.jsx + GameCard.css
    └── pages/
        ├── Home.jsx + Home.css
        ├── Store.jsx + Store.css
        ├── GameDetail.jsx + GameDetail.css
        ├── Cart.jsx + Cart.css
        ├── Checkout.jsx + Checkout.css
        ├── Library.jsx + Library.css
        ├── Login.jsx + Auth.css
        ├── Register.jsx
        ├── Profile.jsx + Profile.css
        ├── DeveloperHub.jsx + DeveloperHub.css
        └── admin/
            ├── AdminDashboard.jsx + AdminDashboard.css
            ├── AdminGames.jsx + AdminGames.css
            └── AdminUsers.jsx + AdminUsers.css
```

---

### 3. Icon Migration (react-icons → Google Material Symbols)

Replace all `react-icons` imports with a reusable `<Icon name="..." />` component that renders `<span class="material-symbols-outlined">icon_name</span>`.

Key icon mappings:
| react-icons | Material Symbol |
|---|---|
| FiSearch | search |
| FiShoppingCart | shopping_cart |
| FiUser | person |
| FiLogOut | logout |
| FiMenu / FiX | menu / close |
| FiHome | home |
| FiGrid | apps |
| FiStar | star |
| FiTrendingUp | trending_up |
| FiBookOpen | library_books |
| FiPackage | inventory_2 |
| FiEdit2 | edit |
| FiTrash2 | delete |
| FiEye | visibility |
| FiDownload | download |
| FiDollarSign | attach_money |
| FiBarChart2 | bar_chart |
| FiPlus | add |
| FiArrowRight | arrow_forward |
| FiArrowLeft | arrow_back |
| FiCheck | check |
| FiCreditCard | credit_card |
| FiLock | lock |
| FiMail | mail |
| FiCalendar | calendar_today |
| FiTag | sell |
| FiZap | bolt |
| FiSettings | settings |
| FiFilter | filter_list |
| FiSliders | tune |
| FiChevronDown | expand_more |
| FiPlay | play_arrow |
| FiUpload | upload |
| FiActivity | monitoring |
| FiPieChart | pie_chart |
| GiGamepad | sports_esports |

---

### 4. Emoji Removal

Remove all emojis from the codebase, replacing with Material Icons:
- `🧩` → `<Icon name="extension" />`
- `🎨` → `<Icon name="palette" />`
- `🆕` → text "New Releases"
- `🏆` → `<Icon name="emoji_events" />`
- `🆓` → text "Free to Play"
- `💳`, `🅿️`, `👛` → Material Icons
- `🎮`, `🛒`, `⭐` → Material Icons
- `✓` → `<Icon name="check" />`
- `🔍` → `<Icon name="search" />`

---

### 5. Theme Adjustments (Match Demo)

The demo shows a **minimalistic Steam-like dark theme**:
- Dark charcoal/navy backgrounds (`#1b2838`, `#171d25`)
- Teal/cyan accent (`#66c0f4`, `#4da6ff`)
- Clean white text, no glow effects
- Subtle borders, no glassmorphism
- Simple hover effects (background change, not transforms)
- Sidebar: Clean text links with small icons, no color-coded genre icons

Key CSS changes:
- Tone down `btn-primary` from gradient to a simpler teal
- Remove `transform: translateY` hover effects
- Simplify card shadows and borders
- Make sidebar items plain text with subtle active highlight

---

### 6. Import Path Fixes

All component imports will be corrected to match the new directory structure. For example:
- `App.jsx`: `'./context/AuthContext'`, `'./components/layout/Navbar'`, `'./pages/Home'`
- `Navbar.jsx`: `'../../context/AuthContext'`, `'../../data/mockData'`
- `Home.jsx`: `'../components/ui/GameCard'`, `'../data/mockData'`, `'../context/AuthContext'`

---

### 7. Admin Navbar (Match Demo)

The demo shows admin pages with a **horizontal navbar** (Dashboard, Games, Users, Transactions, Reports dropdown, Backups) instead of a sidebar. Add stub route placeholders for:
- `/admin/transactions`
- `/admin/reports/sales`
- `/admin/reports/logs`
- `/admin/backups`

---

## Verification Plan

### Automated Tests
- Run `npm install` and `npm run dev` to verify the project compiles
- Open in browser to verify routing works and pages render

### Manual Verification
- Navigate through all routes: Home, Store, Game Detail, Login, Register, Cart, Checkout, Library, Profile, Admin Dashboard, Admin Games, Admin Users
- Verify sidebar navigation links work
- Verify search functionality
- Confirm no emojis appear
- Confirm Google Material Icons render correctly
- Compare visual style against demo screenshots
