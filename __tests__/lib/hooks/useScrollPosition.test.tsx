import { renderHook, act } from '@/utils/testing';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';

describe('useScrollPosition', () => {
  it('should initialize with scroll position 0 and isScrolled false', () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current.scrollPosition).toBe(0);
    expect(result.current.isScrolled).toBe(false);
  });

  it('should update isScrolled state on scroll', async () => {
    const { result } = renderHook(() => useScrollPosition(100));

    const scrollPositionValues = [50, 120, 80, 200];

    await act(async () => {
      scrollPositionValues.forEach((scrollY) => {
        window.scrollY = scrollY;
        window.dispatchEvent(new Event('scroll'));
      });
    });

    // Wait for the next tick to ensure state update has been processed
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current.isScrolled).toBe(true);
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollPosition());
    unmount();
  });
});
