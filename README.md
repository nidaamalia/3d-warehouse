# Warehouse 3D Visualizer

An interactive 3D warehouse visualization and inventory management system built with Next.js, React Three Fiber, and TypeScript. This application provides real-time visualization of warehouse inventory, including storage racks, items, zones, and vehicle routes with filtering capabilities and theme support.

## 🚀 Features

- **3D Warehouse Visualization**: Interactive 3D scene with warehouse racks, items, zones, and vehicles
- **Real-time Filtering**: Filter items by condition (Good, Damage, Quarantine, Scrap)
- **Theme Support**: Dark and light themes with smooth transitions
- **Animated Vehicles**: Forklift animations following predefined routes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test suite with Vitest and React Testing Library

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd warehouse-3d-visualizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Component Hierarchy

```
App
├── ThemeProvider
│   └── Home
│       ├── ThemeToggle
│       ├── FilterToolbar
│       └── WarehouseScene
│           ├── Canvas (React Three Fiber)
│           ├── Lights
│           ├── Ground
│           ├── OrbitControls
│           ├── RackGroup
│           │   └── Rack[]
│           │       ├── RackStructure
│           │       └── Item[]
│           ├── ZoneGroup
│           │   └── Zone[]
│           ├── RouteGroup
│           │   └── Route[]
│           ├── VehicleGroup
│           │   └── Vehicle[]
│           └── DebugHelpers
```

### Data Flow

```
WarehouseData (JSON) → WarehouseStore (Zustand) → Components
                                                    ↓
User Interactions → FilterToolbar → Store Updates → 3D Scene Updates
```

### Key Architectural Patterns

- **State Management**: Zustand for centralized warehouse data and UI state
- **Component Composition**: Modular 3D components with clear separation of concerns
- **Theme System**: Context-based theming with CSS custom properties
- **Data Loading**: Async data fetching with error handling and loading states
- **3D Rendering**: React Three Fiber for declarative Three.js integration

## 🛠️ Tech Stack Justification

### Frontend Framework
- **Next.js 14**: 
  - App Router for improved routing and layouts
  - Server-side rendering capabilities
  - Optimized build pipeline and deployment
  - Built-in TypeScript support

### 3D Graphics
- **React Three Fiber (@react-three/fiber)**:
  - React renderer for Three.js
  - Declarative 3D scene composition
  - Component-based 3D architecture
  - Excellent performance optimization

- **Three.js**:
  - Industry-standard 3D graphics library
  - WebGL abstraction with high performance
  - Extensive ecosystem and community support

- **React Three Drei (@react-three/drei)**:
  - Essential helpers and abstractions for R3F
  - OrbitControls, Text, Billboard components
  - Performance optimizations and utilities

### State Management
- **Zustand**:
  - Lightweight and performant state management
  - TypeScript-first design
  - Simple API with minimal boilerplate
  - Excellent devtools support

### Styling
- **Tailwind CSS 4**:
  - Utility-first CSS framework
  - Consistent design system
  - Responsive design utilities
  - Dark mode support

### Development Tools
- **TypeScript 5**:
  - Type safety and better developer experience
  - Excellent IDE support
  - Catch errors at compile time

- **Vitest**:
  - Fast unit testing framework
  - Vite-based for superior performance
  - Compatible with Jest ecosystem

- **ESLint**:
  - Code quality and consistency
  - Next.js recommended configuration

## 📁 Project Structure

```
warehouse-3d-visualizer/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles and theme variables
├── components/            # React components
│   ├── 3d/                # 3D scene components
│   │   ├── WarehouseScene.tsx
│   │   ├── Rack.tsx
│   │   ├── Vehicle.tsx
│   │   ├── Zone.tsx
│   │   └── ...
│   └── ui/                # UI components
│       ├── FilterToolbar.tsx
│       ├── ThemeToggle.tsx
│       └── ItemConditionLegend.tsx
├── contexts/              # React contexts
│   └── ThemeContext.tsx
├── store/                 # Zustand stores
│   └── warehouseStore.ts
├── types/                 # TypeScript definitions
│   └── warehouse.ts
├── lib/                   # Utility functions
│   └── utils.ts
├── public/                # Static assets
│   └── data/              # Sample data files
│       └── warehouse-data.json
└── tests/                 # Test files
```

## 🎮 Usage

### Navigation
- **Orbit Controls**: Click and drag to rotate, scroll to zoom
- **Filter Items**: Use the filter toolbar to show/hide items by condition
- **Theme Toggle**: Switch between dark and light themes
- **Hover Effects**: Hover over items for visual feedback

### Data Structure
The application expects warehouse data in the following format:

```typescript
interface WarehouseData {
  racks: Rack[];      // Storage racks with items
  zones: Zone[];      // Floor zones (loading, staging, etc.)
  routes: Route[];    // Vehicle paths
}

interface Item {
  serialNo: string;
  lot: string;
  description: string;
  condition: "Good" | "Damage" | "Quarantine" | "Scrap";
  color: string;
  position: { x: number; y: number };
}
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui

# Coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
# Deploy the 'out' or '.next' directory to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related Technologies

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand](https://docs.pmnd.rs/zustand/)
- [Tailwind CSS](https://tailwindcss.com/docs)
