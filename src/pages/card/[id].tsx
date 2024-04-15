import { GetServerSidePropsContext } from 'next';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '@/remote/card';
import dynamic from 'next/dynamic';

import Top from '@/components/shared/Top';
import ListRow from '@/components/shared/ListRow';
import Image from 'next/image';
import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text';
import { Card } from '@/models/card';

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
);

interface CardDetailPageProps {
  initialCard: Card;
}

function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['card'],
    queryFn: () => getCard(id as string),
    initialData: () => initialCard as Card,
  });

  if (data == null) {
    return;
  }

  const { name, corpName, promotion, tags, benefit } = data;
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',');

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/leto-most-searched-mix-8/64/__check_ok_approve-64.png"
                  width={40}
                  height={40}
                  alt=""
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={benefit} />
              }
            />
          </motion.li>
        ))}
      </ul>
      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="1분만에 신청하고 혜택받기" onClick={() => {}} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const cardId = query.id as string;

  const card = await getCard(cardId);

  return {
    props: {
      initialCard: card,
    },
  };
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
}

export default CardDetailPage;
