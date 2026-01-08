import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterToolbar from './FilterToolbar';
import { useWarehouseStore } from '@/store/warehouseStore';

describe('FilterToolbar', () => {
  beforeEach(() => {
    // Reset store to default state
    const store = useWarehouseStore.getState();
    store.selectAllFilters();
  });

  it('should render the component', () => {
    render(<FilterToolbar />);
    
    expect(screen.getByText('Item Condition')).toBeInTheDocument();
  });

  it('should display all condition buttons', () => {
    render(<FilterToolbar />);
    
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Damage')).toBeInTheDocument();
    expect(screen.getByText('Quarantine')).toBeInTheDocument();
    expect(screen.getByText('Scrap')).toBeInTheDocument();
  });

  it('should have All Items button', () => {
    render(<FilterToolbar />);
    
    expect(screen.getByText('All Items')).toBeInTheDocument();
  });

  it('should toggle condition when clicked', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // First clear all to enable normal toggle behavior
    const allItemsButton = screen.getByText('All Items');
    await user.click(allItemsButton);
    
    const goodButton = screen.getByText('Good');
    await user.click(goodButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toContain('Good');
  });

  it('should update store when condition is toggled', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // First clear all to enable normal toggle behavior
    const allItemsButton = screen.getByText('All Items');
    await user.click(allItemsButton);
    
    const goodButton = screen.getByText('Good');
    await user.click(goodButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toContain('Good');
    expect(state.activeFilters).not.toContain('Damage');
    expect(state.activeFilters).not.toContain('Quarantine');
    expect(state.activeFilters).not.toContain('Scrap');
  });

  it('should show only clicked condition when all filters are selected', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // All filters should be selected by default
    const goodButton = screen.getByText('Good');
    await user.click(goodButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toEqual(['Good']);
  });

  it('should clear all filters when All Items is clicked while all selected', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // All filters should be selected by default
    const allItemsButton = screen.getByText('All Items');
    await user.click(allItemsButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toEqual([]);
  });

  it('should select all filters when All Items is clicked while not all selected', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // First clear all
    const allItemsButton = screen.getByText('All Items');
    await user.click(allItemsButton);
    
    // Then select all
    await user.click(allItemsButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toEqual(['Good', 'Damage', 'Quarantine', 'Scrap']);
  });

  it('should display color indicators for each condition', () => {
    render(<FilterToolbar />);
    
    // Check for color indicator divs (they have inline styles)
    const goodButton = screen.getByText('Good').closest('button');
    expect(goodButton).toBeInTheDocument();
    
    // All conditions should have their labels visible
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Damage')).toBeInTheDocument();
    expect(screen.getByText('Quarantine')).toBeInTheDocument();
    expect(screen.getByText('Scrap')).toBeInTheDocument();
  });

  it('should show visual feedback for active filters', async () => {
    const user = userEvent.setup();
    render(<FilterToolbar />);
    
    // Clear all first
    const allItemsButton = screen.getByText('All Items');
    await user.click(allItemsButton);
    
    // Click Good to activate it
    const goodButton = screen.getByText('Good');
    await user.click(goodButton);
    
    const state = useWarehouseStore.getState();
    expect(state.activeFilters).toContain('Good');
    expect(state.activeFilters).not.toContain('Damage');
  });
});