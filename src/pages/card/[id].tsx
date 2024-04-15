import { GetServerSidePropsContext } from 'next';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '@/remote/card';
import { Card } from '@/models/card';

interface CardDetailPageProps {
  initialCard: Card;
}

function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['card'],
    queryFn: () => {
      getCard(id as string);
    },
    // !TODO: 작동은 정상적으로 하는데, 타입스크립트 에러가 발생함
    initialData: () => initialCard as Card,
  });

  console.log(data);

  return <div>CardDetail</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const cardId = query.id as string;

  const card = await getCard(cardId);
  console.log(card);

  return {
    props: {
      initialCard: card,
    },
  };
}

export default CardDetailPage;
