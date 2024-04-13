import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getCards } from '@/remote/card';

import Badge from '@/components/shared/Badge';
import ListRow from '@/components/shared/ListRow';

function CardListPage() {
  const navigate = useRouter();
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => {
      return getCards(pageParam);
    },
    initialPageParam: undefined as any,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (data == null) {
    return null;
  }

  const cards = data?.pages.map(({ items }) => items).flat();

  return (
    <div>
      <InfiniteScroll
        dataLength={cards?.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1} 위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => {
                navigate.push(`/card/${card.id}`);
              }}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export async function getServerSideProps() {
  console.log('getServerSideProps');

  const client = new QueryClient();

  await client.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => {
      return getCards(pageParam);
    },
    initialPageParam: undefined as any,
    getNextPageParam: (snapshot: any) => {
      return snapshot.lastVisible;
    },
  });

  return {
    props: {
      dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  };
}

export default CardListPage;
