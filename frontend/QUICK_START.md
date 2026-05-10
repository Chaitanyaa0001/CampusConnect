# CampusConnect Frontend - Quick Start Guide

## Project Overview

This is a fully functional, modular Next.js frontend for the CampusConnect platform. The application is built with a professional UI using shadcn/ui components and TailwindCSS.

## 🚀 Quick Features

### Landing Page (Public)
- Hero section with call-to-action
- Feature showcase in masonry grid (5 cards)
- Responsive navbar with Login/Signup buttons
- Professional footer

### After Login
- **Dashboard**: Home page with quick stats and shortcuts
- **Carpool**: Search rides, view driver details, rating, availability
- **Car Rental**: Browse vehicles with images, pricing, availability
- **Lost & Found**: Search lost items by category with full details
- **Projects**: Find team projects, view member progress, join teams
- **Chat**: Real-time messaging interface with chat list

## 📂 Key Components

### Data Structure
All dummy data is in `src/data/`:
```
data/
├── features.ts          → Landing features
├── carpool.ts          → Carpool listings
├── car-rental.ts       → Cars with images
├── lost-and-found.ts   → Lost items with images
├── projects.ts         → Project collaborations
├── chats.ts            → Chat messages
├── user.ts             → Current user
└── navigation.ts       → Sidebar menu
```

### Features Folder Structure
Each feature follows this pattern:
```
feature-name/
├── components/         → React components
├── types/             → TypeScript interfaces
├── utils/             → Helper functions
└── hooks/             → Custom React hooks
```

## 🛠️ Development Setup

### Start Development Server
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000`

### Build for Production
```bash
pnpm build
pnpm start
```

## 📋 Pages Available

| Page | Route | Type | Description |
|------|-------|------|-------------|
| Landing | `/` | Public | Welcome page with features showcase |
| Dashboard | `/dashboard` | Protected | Home page after login |
| Carpool | `/carpool` | Protected | Find & book rides |
| Car Rental | `/car-rental` | Protected | Rent vehicles |
| Lost & Found | `/lost-n-found` | Protected | Report/find lost items |
| Projects | `/projects` | Protected | Find team projects |
| Chat | `/chat` | Protected | Messaging interface |

## 🎨 UI Components Used

All components from shadcn/ui:
- Button, Card, Input, Label
- Badge, Tabs, Dialog
- Select, Textarea
- Checkbox, Separator
- Avatar, Carousel, Skeleton
- And more...

## 📊 Key Features Implementation

### 1. Landing Page
- Navbar with brand and auth buttons
- Hero section with gradient background
- 5 feature cards in responsive grid
- Automatic card layout (1 col → 3 cols → 5 cols)

### 2. Carpool Feature
- **Search Bar**: Filter by from, to, time
- **Add Button**: Create new carpool
- **Cards**: Show driver, route, price, rating, seats
- **Link to Chat**: Click card to message driver

### 3. Car Rental Feature
- **Filters**: Fuel type, transmission, etc.
- **Cards with Images**: Professional car listings
- **Pricing**: Per day and per hour rates
- **Availability Status**: Visual availability indicator

### 4. Lost & Found Feature
- **Search**: Full-text search on items
- **Category Filter**: Filter by type
- **Item Cards**: Large images with details
- **Contact Info**: Easy access to poster details

### 5. Projects Feature
- **Project Cards**: No images, focused on team
- **Team Progress**: Visual progress bar
- **Tags**: Technology stack display
- **Join Button**: Interactive with full status

### 6. Chat Interface
- **Chat List**: Sidebar with all conversations
- **Message Display**: Professional message bubbles
- **Message Input**: Send with Enter key
- **Unread Badges**: Show message count

## 🔄 Data Flow

```
User Visits Page
    ↓
Page Component Renders
    ↓
Imports Data from @/data
    ↓
Maps Data to Components
    ↓
Components Render UI
    ↓
User Interaction (filters, clicks, etc.)
    ↓
Local State Update
    ↓
UI Re-renders
```

## 🎯 Navigation Structure

```
Landing Page (/)
    ↓ [Login/Signup - not implemented yet]
    ↓
Dashboard (/dashboard)
    ├─ Sidebar Navigation
    └─ Quick Links
        ├─ Carpool (/carpool)
        ├─ Car Rental (/car-rental)
        ├─ Lost & Found (/lost-n-found)
        ├─ Projects (/projects)
        └─ Chat (/chat)
```

## 🔧 Customization Guide

### Adding New Data
1. Create file in `src/data/`
2. Export interface and data array
3. Add export to `src/data/index.ts`
4. Use in components via import

### Adding New Feature
1. Create folder in `src/features/`
2. Add `components/`, `types/`, `utils/`, `hooks/`
3. Create components with exports in `index.ts`
4. Create page in `src/app/feature-name/`
5. Add to navigation in `src/data/navigation.ts`

### Styling Changes
- Update colors in TailwindCSS classes
- All components use consistent spacing
- Modify in component files directly
- Color scheme: Blue/Purple primary, gray neutral

## 📝 Import Patterns

### From Data
```typescript
import { carpoolData } from '@/data/carpool';
// or
import { carpoolData } from '@/data';
```

### From Components
```typescript
import { CarpoolCard } from '@/features/carpool/components';
// or direct import
import { CarpoolCard } from '@/features/carpool/components/carpool-card';
```

### From Layouts
```typescript
import { AuthenticatedLayout } from '@/shared/layouts';
import { Navbar } from '@/shared/layouts';
```

## 🚀 Ready for Backend Integration

The application is structured to easily connect to backend APIs:

1. **Create Services Layer**: `src/services/` for API calls
2. **Update Data Files**: Replace with API endpoints
3. **Add Loading States**: Show spinners while fetching
4. **Error Handling**: Catch and display API errors
5. **Authentication**: Implement JWT/session management

Example migration:
```typescript
// Before: Static data
import { carpoolData } from '@/data/carpool';

// After: API call
const { data: carpoolData } = await fetchCarpools();
```

## 📱 Responsive Design

- **Mobile**: Single column, optimized touch targets
- **Tablet**: 2-3 columns, adjusted spacing
- **Desktop**: Full 3-4 column grid layouts
- **All Pages**: Fully responsive with TailwindCSS

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Documentation](https://react.dev)

## 📦 Dependencies

- `next@16.2.6` - React framework
- `react@19.2.4` - UI library
- `tailwindcss@4` - Styling
- `lucide-react@1.14.0` - Icons
- `shadcn/ui` - UI components
- `@radix-ui/*` - Component primitives

## ✅ Checklist

- ✅ Landing page with hero and features
- ✅ Sidebar navigation with all pages
- ✅ Carpool page with search and filter
- ✅ Car rental with images
- ✅ Lost & found with search
- ✅ Projects collaboration
- ✅ Chat interface
- ✅ Responsive design
- ✅ Professional UI
- ✅ Modular components
- ✅ Type-safe code
- ✅ Clean architecture

## 🤝 Next Steps

1. Add authentication (login/signup pages)
2. Connect to backend APIs
3. Add real-time features (WebSocket for chat)
4. Implement user profiles
5. Add notification system
6. Implement image uploads
7. Add search analytics
8. Create admin dashboard

---

**Status**: ✅ Frontend UI Complete - Ready for backend integration

Last Updated: May 10, 2025
