import { render, screen, fireEvent } from '@/utils/testing';
import CategorySelector from '@/components/CategorySelector/CategorySelector';

jest.mock('@/components/Icon', () => jest.fn(({ icon, ...props }) => (
  <div data-testid={`icon-${icon}`} {...props}></div>
)));

jest.mock('@/components/Text', () => jest.fn(({ children }) => (
  <div data-testid="text">{children}</div>
)));

jest.mock('@/components/CategorySelector/DropdownItem', () => jest.fn(({ category, onSelectCategory }) => (
  <div data-testid={`dropdown-item-${category}`} onClick={() => onSelectCategory(category)}>
    {category}
  </div>
)));

describe('CategorySelector component', () => {
  const mockSetSelectedCategory = jest.fn();

  beforeEach(() => {
    mockSetSelectedCategory.mockClear();
  });

  it('renders the component with initial props and displays the selected category', () => {
    render(<CategorySelector selectedCategory="Populares" setSelectedCategory={mockSetSelectedCategory} />);
    
    expect(screen.getByText('Ver:')).toBeInTheDocument();
    expect(screen.getByText('Populares', { selector: '[data-testid="text"]' })).toBeInTheDocument();
    expect(screen.getByTestId('icon-arrowDown')).toBeInTheDocument();
  });

  it('toggles dropdown visibility when the selector container is clicked', () => {
    render(<CategorySelector selectedCategory="Populares" setSelectedCategory={mockSetSelectedCategory} />);
    
    const selectorContainer = screen.getByText('Ver:').parentElement as Element;
    fireEvent.click(selectorContainer);
    
    expect(screen.getByTestId('dropdown-item-Populares')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-item-Mis Películas')).toBeInTheDocument();
  });

  it('calls setSelectedCategory and hides dropdown when a dropdown item is clicked', () => {
    render(<CategorySelector selectedCategory="Populares" setSelectedCategory={mockSetSelectedCategory} />);
    
    const selectorContainer = screen.getByText('Ver:').parentElement as Element;
    fireEvent.click(selectorContainer); // Open dropdown

    const dropdownItem = screen.getByTestId('dropdown-item-Mis Películas');
    fireEvent.click(dropdownItem);
    
    expect(mockSetSelectedCategory).toHaveBeenCalledWith('Mis Películas');
    expect(screen.queryByTestId('dropdown-item-Populares')).not.toBeVisible(); // Dropdown should be hidden
  });
});
