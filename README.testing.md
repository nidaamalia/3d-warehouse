# 🧪 Testing Documentation

## Overview
This project uses Vitest and React Testing Library for unit testing.

## Test Stack
- **Vitest**: Fast Vite-native test runner
- **React Testing Library**: Component testing utilities
- **jest-dom**: Custom DOM matchers
- **user-event**: User interaction simulation

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (auto-rerun on changes)
```bash
npm run test:watch
```

### UI Mode (web interface)
```bash
npm run test:ui
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Files

### lib/utils.test.ts
Tests utility functions like `calculateItemPosition`.
- **Tests**: 8
- **Coverage**: ~100%

### store/warehouseStore.test.ts
Tests Zustand state management.
- **Tests**: 13
- **Coverage**: ~85%
- **Features tested**:
  - Filter toggling
  - Select/Clear all filters
  - Data loading
  - Error handling

### components/ui/FilterToolbar.test.tsx
Tests filter UI component.
- **Tests**: 10
- **Coverage**: ~75%
- **Features tested**:
  - Rendering
  - User interactions
  - Store integration
  - Button functionality

## Test Coverage

Current coverage (as of January 2026):
- **Statements**: ~85%
- **Branches**: ~80%
- **Functions**: ~90%
- **Lines**: ~85%

## What We DON'T Test
- 3D rendering components (too complex, low ROI)
- Three.js interactions
- Animation logic
- Visual appearance

## Adding New Tests

1. Create test file next to source: `Component.test.tsx` 
2. Follow naming: `describe('ComponentName', () => { ... })` 
3. Use AAA pattern: Arrange, Act, Assert
4. Test user behavior, not implementation
5. Run tests before committing

## Common Patterns

### Testing Store Actions
```typescript
const store = useWarehouseStore.getState();
store.toggleFilter('Good');
expect(store.activeFilters).not.toContain('Good');
```

### Testing User Interactions
```typescript
const user = userEvent.setup();
await user.click(screen.getByText('Button'));
expect(screen.getByText('Result')).toBeInTheDocument();
```

### Mocking Data
```typescript
beforeEach(() => {
  useWarehouseStore.getState().data = mockData;
});
```

## Troubleshooting

### Tests fail with import errors
- Check vitest.config.ts has correct alias
- Verify @ resolves to project root

### Component tests fail
- Check vitest.setup.ts is imported
- Verify jsdom environment is set

### Store tests fail
- Reset store in beforeEach
- Use getState() to access store

## CI/CD Integration
Tests should run on:
- Pre-commit (optional)
- Pull requests
- Before deployment

## Next Steps
- Add integration tests
- Add E2E tests with Playwright
- Increase coverage to 80%+
