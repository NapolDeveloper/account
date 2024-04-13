import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';
import { store } from './firebase';

import { Card } from '@/models/card';
import { COLLECTIONS } from '@/constants/collection';

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        );

  const cardSnapshot = await getDocs(cardQuery);
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1];
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  return { items, lastVisible };
}

export async function getSearchCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    // 키워드로 시작하는 모든 카드를 검색
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  );

  const cardSnapshot = await getDocs(searchQuery);

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));
}
