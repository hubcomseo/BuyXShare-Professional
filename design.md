# BuyXShare Design System

## Core Philosophy
BuyXShare represents a **Modern Web3-Commerce** aesthetic. We blend high-end retail typography with blockchain-inspired transparency and high-energy interactions.

## 1. Typography Hierarchy
We use a disciplined typography scale using **Roboto Condensed** for structural headings and **Inter** for all content.

| Role | Size | Line Height | Weight | Style | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | `34px` | `42px` | `700` | `uppercase`, `tracking-tighter` | Splash, Marketing Hero |
| **Display-MD** | `30px` | `38px` | `700` | `uppercase`, `tracking-tight` | Large Promo banners |
| **H1** | `28px` | `36px` | `700` | `uppercase`, `tracking-tight` | Main Page Titles |
| **H2** | `24px` | `32px` | `700` | `uppercase`, `tracking-tight` | Section Titles |
| **H3** | `20px` | `28px` | `600` | `uppercase`, `tracking-tight` | Cards, Sub-sections |
| **Body-LG** | `16px` | `24px` | `500` | `normal` | Important highlights |
| **Body-MD** | `14px` | `22px` | `400` | `normal` | Default reading copy |
| **Body-SM** | `12px` | `18px` | `400` | `normal` | Helper text, metadata |
| **Label** | `13px` | `18px` | `600` | `uppercase`, `tracking-widest` | Badges, Form labels |
| **Button** | `14px` | `20px` | `600` | `uppercase`, `tracking-wider` | CTAs |
| **Caption** | `11px` | `16px` | `500` | `uppercase`, `tracking-widest` | Tab labels, tiny text |

**Global Typography Rules:**
- **Primary Headers:** Use `Roboto Condensed` (Weight max 700).
- **Body & Functional:** Use `Inter`.
- **Max Weight:** Never exceed `font-bold` (700). Avoid `font-black`.
- **Structural Text:** All headers, labels, and buttons **MUST** be `uppercase`.
- **Color Discipline:** 
  - Dark: `#0F172A` (Slate-900)
  - Medium: `#334155` (Slate-700)
  - Muted: `#64748B` (Slate-500)
  - Primary: `#4F46E5` (Indigo-600)
  - Accent/Profit: `#00D991` (Emerald-500)

## 2. Color Palette
*   **Primary (Indigo-600):** `#4f46e5` - The core brand color representing trust and the digital frontier.
*   **Success (Emerald-500):** `#10b981` - Used for "Paid" states and "Profit" calculations.
*   **Accent (Amber-400):** `#fbbf24` - Used for ratings and "Lucky" features.
*   **Background (Slate-50):** `#f8fafc` - The canvas for our high-contrast cards.
*   **Surface (White):** `#ffffff` - All interactive cards use white backgrounds with subtle shadows.

## 3. UI Components
*   **Bento Cards:** Rounded corners (`rounded-[2rem]` or `rounded-[2.5rem]`) with soft shadows (`shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
*   **Interactive Motion:** 
    - Scale effects on tap (`active:scale-95`).
    - Staggered entrances for list items using `motion/react`.
    - Subtle glassmorphism (`backdrop-blur-xl`) for sticky headers and bars.
*   **Iconography:** High-stroke icons from `lucide-react` (default stroke width: 2).

## 4. Layout & Spacing
- **Responsive:** Mobile-first approach restricted to `max-w-md` for the core app experience.
- **Rhythm:** Use generous white space between sections (`space-y-8` or `space-y-10`) to prevent visual fatigue.
- **Safe Zones:** Padding of `px-6` as the standard horizontal gutter.

## 5. Visual Hierarchy
1. **Critical Actions:** Bright Indigo backgrounds with white `font-black` text.
2. **Secondary Actions:** `bg-slate-50` or `border-slate-200` with greyed text.
3. **Data Values:** Heavily weighted numbers (`font-black tracking-tighter`) compared to their labels.

---
*Maintained by the BuyXShare Design Team*
