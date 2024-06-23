import { render, screen, fireEvent } from '@/utils/testing';
import DropdownItem from '@/components/CategorySelector/DropdownItem';

jest.mock('@/components/Icon', () => jest.fn(({ icon, ...props }) => (
  <div data-testid={`icon-${icon}`} {...props}></div>
)));

jest.mock('@/components/Text', () => jest.fn(({ children }) => (
  <div data-testid="text">{children}</div>
)));

describe('DropdownItem component', () => {
  const mockOnSelectCategory = jest.fn();

  beforeEach(() => {
    mockOnSelectCategory.mockClear();
  });

  const renderComponent = (props: any) => {
    render(<DropdownItem {...props} />);
  };

  it('renders the category text correctly', () => {
    renderComponent({
      category: 'Populares',
      selectedCategory: 'Mis Películas',
      onSelectCategory: mockOnSelectCategory,
      platform: 'web'
    });

    expect(screen.getByText('Populares')).toBeInTheDocument();
  });

  it('renders the check icon when the item is selected', () => {
    renderComponent({
      category: 'Populares',
      selectedCategory: 'Populares',
      onSelectCategory: mockOnSelectCategory,
      platform: 'web'
    });

    expect(screen.getByTestId('icon-check')).toBeInTheDocument();
  });

  it('does not render the check icon when the item is not selected', () => {
    renderComponent({
      category: 'Populares',
      selectedCategory: 'Mis Películas',
      onSelectCategory: mockOnSelectCategory,
      platform: 'web'
    });

    expect(screen.queryByTestId('icon-check')).not.toBeInTheDocument();
  });

  it('calls onSelectCategory with the correct category when the item is clicked', () => {
    renderComponent({
      category: 'Populares',
      selectedCategory: 'Mis Películas',
      onSelectCategory: mockOnSelectCategory,
      platform: 'web'
    });

    const item = screen.getByText('Populares').parentElement as Element;
    fireEvent.click(item);

    expect(mockOnSelectCategory).toHaveBeenCalledWith('Populares');
  });
});
