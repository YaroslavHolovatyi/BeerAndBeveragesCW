# Beer & Beverages - Sitemap & Navigation Flow

## 🏠 Public Pages (Navbar - Top Level)

```
┌─────────────────────────────────────────────────────────────────┐
│                          NAVBAR                                  │
│  [Logo] [Burger Menu] [Summon Party] [Organize Raid]            │
│         [♥ Liked Bars] [👥 Friends] [👤 Profile]                │
└─────────────────────────────────────────────────────────────────┘
```

### Main Navigation Structure

```
                            ┌──────────┐
                            │   HOME   │
                            │    /     │
                            └────┬─────┘
                                 │
        ┌────────────────────────┼────────────────────────────┐
        │                        │                            │
        ▼                        ▼                            ▼
   ┌─────────┐            ┌──────────┐               ┌──────────────┐
   │  Bars   │            │ About    │               │ Achievements │
   │ /bars   │            │ /about   │               │/achievements │
   └────┬────┘            └──────────┘               └──────────────┘
        │
        ├─────────┐
        ▼         ▼
  ┌──────────┐  ┌────────────┐
  │Bar Detail│  │  Bar Map   │
  │/bars/:id │  │ /bar-map   │
  └──────────┘  └────────────┘
```

---

## 👤 Authentication Flow

```
                    ┌─────────────────────┐
                    │   Not Logged In     │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌──────────────┐      ┌──────────────┐
            │    Login     │      │   Signup     │
            │   /login     │      │  /signup     │
            └──────┬───────┘      └──────┬───────┘
                   │                     │
                   │          ┌──────────┘
                   │          ▼
                   │    ┌──────────────────┐
                   │    │ Questionnaire    │
                   │    │ /questionnaire   │
                   │    └────────┬─────────┘
                   │             ▼
                   │    ┌──────────────────┐
                   │    │  Race Result     │
                   │    │ /race-result     │
                   │    └────────┬─────────┘
                   │             │
                   └─────────────┴─────────────┐
                                               ▼
                                    ┌────────────────────┐
                                    │   User Profile     │
                                    │    /profile        │
                                    └────────────────────┘
```

---

## 🎮 User Features (Logged In)

### Profile Section

```
┌──────────────────┐
│  User Profile    │
│   /profile       │
└────────┬─────────┘
         │
         ├────────────┐
         ▼            ▼
┌──────────────┐  ┌──────────────────┐
│ Edit Profile │  │ Liked Bars (3)   │───────┐
│/profile/edit │  │  (Preview)       │       │
└──────────────┘  └──────────────────┘       │
                                              │
                           ┌──────────────────┘
                           ▼
                  ┌──────────────────┐
                  │All Liked Bars    │
                  │ /liked-bars      │
                  └──────────────────┘
```

### Social Features

```
┌──────────────────┐
│     Friends      │
│    /friends      │
└────────┬─────────┘
         │
         ├──────────────┬──────────────┐
         ▼              ▼              ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│Friend Requests│ │Friend List  │ │Search Friends│
└──────────────┘ └─────────────┘ └──────────────┘
```

### Party & Raid Management

```
┌──────────────────┐          ┌──────────────────┐
│  Summon Party    │          │ Organize Raid    │
│ /summon-party    │          │ /organize-raid   │
└────────┬─────────┘          └────────┬─────────┘
         │                              │
         ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│ • Party Name     │          │ • Raid Name      │
│ • Select Time    │          │ • Theme          │
│ • Choose Friends │          │ • Bar Selection  │
│ • Chart View     │          │ • Date/Time      │
│   (Alcohol Prefs)│          │ • Description    │
└──────────────────┘          └──────────────────┘
```

### Bill Splitting

```
┌──────────────────┐
│  Check Split     │
│  /check-split    │
└────────┬─────────┘
         │
         ├────────────────┬────────────────┐
         ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│1. Upload     │  │2. Add        │  │3. Assign     │
│   Receipt    │  │  Participants│  │   Items      │
└──────────────┘  └──────────────┘  └──────┬───────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │4. Summary &      │
                                  │   D20 Game       │
                                  └──────────────────┘
```

---

## 🗺️ Sidebar Menu (Burger Menu)

```
┌────────────────────────────┐
│      SIDEBAR MENU          │
├────────────────────────────┤
│ 🏠 Home                    │
│ 🍺 Bars                    │
│ 🗺️  Bar Map               │
│ 👥 Friends                 │
│ ❤️  Liked Bars            │
│ 🎭 Summon Party            │
│ ⚔️  Organize Raid         │
│ 🧾 Check Split             │
│ 🏆 Achievements            │
│ ℹ️  About                 │
│ 👤 Profile (if logged in)  │
│ 🔓 Logout (if logged in)   │
│ 🔐 Login (if not logged)   │
└────────────────────────────┘
```

---

## 📍 Complete Route Structure

### Public Routes

- `/` - Home Page
- `/bars` - All Bars List
- `/bars/:slug` - Bar Detail Page
- `/bar-map` - Interactive Bar Map
- `/about` - About Page
- `/login` - Login Page
- `/signup` - Signup Page

### Protected Routes (Requires Authentication)

- `/profile` - User Profile
- `/profile/edit` - Edit Profile
- `/friends` - Friends List
- `/liked-bars` - All Liked Bars
- `/summon-party` - Create Party
- `/organize-raid` - Organize Raid
- `/check-split` - Split Bill
- `/achievements` - User Achievements
- `/questionnaire` - Race/Character Quiz
- `/race-result` - Quiz Results

---

## 🔄 User Journey Examples

### New User Journey

```
1. Home (/)
   ↓
2. Click "Start Adventure" → Signup (/signup)
   ↓
3. Complete Questionnaire (/questionnaire)
   ↓
4. View Race Result (/race-result)
   ↓
5. Redirected to Home (/) [Now Logged In]
   ↓
6. Browse Bars (/bars)
   ↓
7. View Bar Details (/bars/:slug)
   ↓
8. Like a Bar (♥)
   ↓
9. View All Liked Bars (/liked-bars)
```

### Party Planning Journey

```
1. Home (/)
   ↓
2. Click "Summon Party" → Summon Party Page (/summon-party)
   ↓
3. Enter party details, select friends
   ↓
4. View Alcohol Preferences Chart
   ↓
5. Summon Party (saves to store)
   ↓
6. Go to Bar (/bars/:slug)
   ↓
7. Visit Bar & Enjoy!
   ↓
8. Upload Receipt → Check Split (/check-split)
   ↓
9. Assign items by quantity to each person
   ↓
10. Play D20 Dice Game to decide who pays
```

### Bar Discovery Journey

```
1. Home (/)
   ↓
2. Browse Categories or Search
   ↓
3. View Bars List (/bars)
   ↓
4. Filter by City/Price/Rating
   ↓
5. View on Map (/bar-map)
   ↓
6. Select Bar → Bar Detail (/bars/:slug)
   ↓
7. Like Bar (♥)
   ↓
8. Add to Wishlist
   ↓
9. View in Liked Bars (/liked-bars)
```

---

## 🎯 Key Features by Page

### Home (/)

- Hero section with city selector
- Bar categories
- Featured bars
- Quick actions (Summon Party, Organize Raid)

### Bars Page (/bars)

- Search & filters (city, price, rating)
- Sort options
- Bar cards with like button
- Pagination
- Map view toggle

### Bar Detail (/bars/:slug)

- Bar information
- Photos
- Reviews & ratings
- Working hours
- Location map
- Like/Wishlist buttons
- Share button

### Summon Party (/summon-party)

- Party name input
- Time selection
- Friends selection (with race & favorite alcohol)
- **Radar Chart** - Shows party's alcohol preferences
- Create party button

### Organize Raid (/organize-raid)

- Raid name & theme
- Image selection
- Bar search & selection
- Date & time picker
- Description
- Create raid button

### Check Split (/check-split)

- Receipt upload & AI parsing
- Add participants
- Assign items with **quantity per person**
- Real-time calculation
- D20 Dice Game
- Summary view

### Liked Bars (/liked-bars)

- Grid of all liked bars
- Search & filter
- Sort options (date, name, rating)
- Remove from liked
- Clear all

### Profile (/profile)

- User info (name, email, city, race)
- Profile image
- 3 Favorite bars preview
- Edit button
- Logout button
- "View All Liked Bars" link

---

## 🔐 Authentication States

### Not Authenticated

- Can view: Home, Bars, Bar Details, About, Map
- Cannot view: Profile, Friends, Liked Bars, Party features
- Redirected to /login when accessing protected routes

### Authenticated

- Full access to all features
- Navbar shows user-specific actions
- Profile accessible from navbar

---

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All pages are fully responsive with adjusted layouts for mobile devices.
