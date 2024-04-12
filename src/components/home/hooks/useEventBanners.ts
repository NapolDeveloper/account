import { useSuspenseQuery } from '@tanstack/react-query';
import { getEventBanners } from '@/remote/banner';

function useEventBanners() {
  return useSuspenseQuery({
    queryKey: ['event-banners'],
    queryFn: () => getEventBanners({ hasAccount: false }),
  });
}

export default useEventBanners;
