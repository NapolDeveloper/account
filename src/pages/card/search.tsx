import { useRouter } from 'next/router';
import { useRef, useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getSearchCards } from '@/remote/card';
import useDebounce from '@/components/shared/hocs/useDebounce';

import Top from '@/components/shared/Top';
import Input from '@/components/shared/Input';
import Text from '@/components/shared/Text';
import ListRow from '@/components/shared/ListRow';
import Badge from '@/components/shared/Badge';

function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const navigate = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: cards } = useQuery({
    queryKey: ['cards', debouncedKeyword],
    queryFn: () => {
      return getSearchCards(debouncedKeyword);
    },
    enabled: keyword !== '',
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>
      {keyword !== '' && cards?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다.</Text>
        </div>
      ) : (
        <ul>
          {cards?.map((card, index) => (
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
      )}
    </div>
  );
}

export default SearchPage;
