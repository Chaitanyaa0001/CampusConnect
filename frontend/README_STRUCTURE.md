# CampusConnect Frontend - Project Structure

## Overview
This is a professional, modular Next.js frontend for CampusConnect - a campus community platform with features like carpooling, car rentals, lost & found, project collaboration, and real-time chat.

## Project Architecture

### 📁 Directory Structure

```
src/
├── app/                              # Next.js app directory
│   ├── page.tsx                     # Landing page (public)
│   ├── dashboard/page.tsx           # Home page (authenticated)
│   ├── carpool/page.tsx             # Carpool listing page
│   ├── car-rental/page.tsx          # Car rental page
│   ├── lost-n-found/page.tsx        # Lost & Found page
│   ├── projects/page.tsx            # Project collaboration page
│   ├── chat/page.tsx                # Chat interface
│   └── [other app routes]
│
├── data/                             # Centralized data management
│   ├── features.ts                  # Landing page features data
│   ├── carpool.ts                   # Carpool listings data
│   ├── car-rental.ts                # Car rental data
│   ├── lost-and-found.ts            # Lost & found items
│   ├── projects.ts                  # Project collaboration data
│   ├── chats.ts                     # Chat messages and conversations
│   ├── user.ts                      # Current user data
│   ├── navigation.ts                # Navigation menu items
│   └── index.ts                     # Central exports
│
├── features/                         # Feature-specific modules
│   ├── landing/                      # Landing page components
│   │   ├── hero-section.tsx
│   │   ├── features-grid.tsx
│   │   ├── feature-card.tsx
│   │   └── index.ts
│   │
│   ├── carpool/                      # Carpool feature
│   │   ├── components/
│   │   │   ├── search-bar.tsx
│   │   │   ├── carpool-card.tsx
│   │   │   ├── carpool-grid.tsx
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │
│   ├── car-rental/                   # Car rental feature
│   │   ├── components/
│   │   │   ├── car-rental-card.tsx
│   │   │   ├── car-rental-grid.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── lost-n-found/                 # Lost & Found feature
│   │   ├── components/
│   │   │   ├── lost-item-card.tsx
│   │   │   ├── lost-item-grid.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── project/                      # Project collaboration
│   │   ├── components/
│   │   │   ├── project-card.tsx
│   │   │   ├── project-grid.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── chat/                         # Chat feature
│   │   ├── components/
│   │   │   ├── chat-list.tsx
│   │   │   ├── chat-item.tsx
│   │   │   ├── message-list.tsx
│   │   │   ├── message-bubble.tsx
│   │   │   ├── message-input.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   └── auth/                         # Auth feature (placeholder)
│
├── shared/                           # Shared components and layouts
│   ├── layouts/
│   │   ├── navbar.tsx               # Navigation bar component
│   │   ├── sidebar.tsx              # Sidebar navigation
│   │   ├── authenticated-layout.tsx # Layout with sidebar
│   │   ├── public-layout.tsx        # Layout without sidebar
│   │   └── index.ts
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   └── [other UI components]
│   └── types/
│
├── lib/
│   └── utils.ts                     # Utility functions
│
├── hooks/
│   └── use-mobile.ts
│
└── app/
    └── layout.tsx                   # Root layout
```

## Key Features

### 1. Landing Page (`/`)
- **Hero Section**: Welcome message with call-to-action buttons
- **Features Grid**: Masonry layout showcasing 5 key features with icons
- **Navigation**: Navbar with Login/Signup buttons
- **Responsive Design**: Mobile-first approach with TailwindCSS

### 2. Dashboard (`/dashboard`)
- **Post-login Home**: Quick stats and shortcuts
- **Authenticated Navbar**: Shows user title on left, user avatar on right
- **Sidebar Navigation**: Links to all app features
- **Quick Access Cards**: Direct shortcuts to all features

### 3. Carpool Page (`/carpool`)
- **Search & Filter**: From, To, Time filters
- **Add Button**: "Add Carpool" button in flexbox space-between layout
- **Carpool Cards**: Display driver, route, time, price, rating, availability
- **Direct Link to Chat**: Clicking card opens chat with ride details

### 4. Car Rental Page (`/car-rental`)
- **Search & Filter**: By fuel type, transmission, etc.
- **Car Cards**: Image on top, details below
- **Availability Status**: Shows if car is available or booked
- **Pricing Details**: Per day and per hour rates

### 5. Lost & Found Page (`/lost-n-found`)
- **Search & Filter**: By category, location, date
- **Item Cards**: Image on top with full details
- **Category Badges**: Item classification
- **Contact Information**: Poster contact details

### 6. Projects Page (`/projects`)
- **Project Cards**: No images, focused on team info
- **Team Progress Bar**: Visual representation of team completion
- **Category & Tags**: Easy identification and filtering
- **Join Button**: Interactive CTA (disabled when full)

### 7. Chat Page (`/chat`)
- **Chat List**: Sidebar with all conversations
- **Active Chat Display**: Message thread with avatars and timestamps
- **Message Input**: Send messages with Enter key support
- **Unread Badges**: Badge count on chat items

## Component Modularity

### Structure Pattern
Each feature follows this pattern:
```
feature-name/
├── components/
│   ├── *.tsx          # Feature components
│   └── index.ts       # Barrel export
├── types/
│   └── index.ts       # TypeScript interfaces
├── utils/
│   └── *.ts          # Helper functions
└── hooks/
    └── *.ts          # Custom React hooks
```

### Benefits
- **Isolated Responsibility**: Each module handles its own logic
- **Easy Testing**: Self-contained feature modules
- **Reusability**: Components can be imported and reused
- **Scalability**: New features can be added without affecting others

## Data Management

### Centralized Data Location: `src/data/`
- All dummy data is stored in `src/data/` folder
- Each file exports TypeScript interfaces and data arrays
- Central index file (`index.ts`) exports all data for easy imports
- No backend integration currently - UI is fully functional with dummy data

### Data Files
- `features.ts`: Landing page features
- `carpool.ts`: Carpool listings
- `car-rental.ts`: Car rental listings
- `lost-and-found.ts`: Lost items
- `projects.ts`: Project collaborations
- `chats.ts`: Chat messages and conversations
- `user.ts`: Current user profile
- `navigation.ts`: Navigation menu structure

## UI Components (shadcn/ui)

This project uses professional shadcn/ui components for consistency:
- **Button**: Styled buttons with variants
- **Card**: Reusable card container
- **Input**: Form input fields
- **Select**: Dropdown menus
- **Badge**: Status indicators
- **Tabs**: Tab navigation
- **Dialog**: Modal dialogs
- **Separator**: Visual dividers

## Styling

- **Framework**: TailwindCSS v4
- **Design**: Minimal and professional
- **Colors**: Blue/Purple gradient primary, with semantic colors
- **Spacing**: Consistent 6px grid system
- **Responsiveness**: Mobile-first responsive design

## Getting Started

### Installation
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` in your browser.

### Build
```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Future Integration

### Backend Connection
When ready to integrate with backend services:

1. **Replace Data Files**: Swap dummy data with API calls
2. **Add Services Layer**: Create `src/services/` with API clients
3. **Update Hooks**: Convert to custom hooks with data fetching
4. **Error Handling**: Add loading and error states to pages

### Example Flow
```
Page Component
  ↓
useEffect/useCustomHook
  ↓
Service (API call)
  ↓
Backend API
```

## Best Practices Implemented

✅ **Clean Architecture**
- Separation of concerns
- Feature-based folder structure
- Reusable components

✅ **Code Organization**
- Type definitions in dedicated files
- Utility functions in utils/
- Index files for barrel exports

✅ **UI/UX**
- Professional minimal design
- Consistent component usage
- Responsive layout

✅ **Maintainability**
- Clear file naming conventions
- Well-documented structure
- Easy to navigate codebase

✅ **Modularity**
- Self-contained features
- No circular dependencies
- Easy to add new features

## Pages Navigation

```
Landing Page (/)
    ↓
    ├─→ Auth (login/signup)
    ↓
Dashboard (/dashboard)
    ├─→ Carpool (/carpool) → Chat (/chat)
    ├─→ Car Rental (/car-rental)
    ├─→ Lost & Found (/lost-n-found)
    ├─→ Projects (/projects)
    └─→ Chat (/chat)
```

## Notes

- No backend integration yet - all data is mock/dummy data
- Authentication flow is placeholder UI only
- Chat is a demo with static messages
- All features are fully functional UI demonstrations
- Ready for backend API integration when services are ready

## Contributing

When adding new features:
1. Create feature folder in `src/features/`
2. Follow the established structure (components, types, utils, hooks)
3. Add data to `src/data/` if needed
4. Export components via `index.ts` files
5. Create corresponding page in `src/app/`

---

Built with ❤️ using Next.js, React, TailwindCSS, and shadcn/ui
