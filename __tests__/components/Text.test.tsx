import { render, screen } from '@/utils/testing';
import Text from '@/components/Text';
import { theme } from '@/lib/theme';

describe('Text component', () => {
  it('renders children correctly', () => {
    render(<Text>Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toBeInTheDocument();
  });

  it('applies font size based on platform and fontSize props', () => {
    render(<Text platform="web" fontSize="large">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSizes.web.large}`);
  });

  it('applies color based on color prop', () => {
    render(<Text color="primary">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle(`color: ${theme.colors.primary}`);
  });

  it('applies line height based on lineHeight prop', () => {
    render(<Text lineHeight="1.5">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle('line-height: 1.5');
  });

  it('applies font weight based on fontWeight prop', () => {
    render(<Text fontWeight="bold">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle('font-weight: bold');
  });

  it('applies letter spacing based on letterSpacing prop', () => {
    render(<Text letterSpacing="0.1em">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle('letter-spacing: 0.1em');
  });

  it('applies override styles based on override prop', () => {
    render(<Text override="text-transform: uppercase;">Test Text</Text>);
    
    const textElement = screen.getByText('Test Text');
    expect(textElement).toHaveStyle('text-transform: uppercase');
  });
});
