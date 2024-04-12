import { query, collection, where, getDocs } from 'firebase/firestore';

import { store } from '@remote/firebase';
import { COLLECTIONS } from '@/constants/collection';
import { EventBanner } from '@/models/banner';

/**
 * 이벤트 배너를 가져오는 함수
 * @param hasAccount 계좌 보유 여부
 */
export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  );

  const snapshot = await getDocs(eventBannerQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }));
}
