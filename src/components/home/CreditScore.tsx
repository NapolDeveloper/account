import CreditScoreChart from '@components/shared/CreditScoreChart';
import Flex from '@components/shared/Flex';
import Text from '@components/shared/Text';
import Button from '@components/shared/Button';
import Spacing from '@components/shared/Spacing';
import Skeleton from '@components/shared/Skeleton';

function CreditScore() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Button>내 신용점수 보러가기</Button>
        </Flex>
        <CreditScoreChart score={100} width={80} height={80} />
      </Flex>
    </div>
  );
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing size={8} />
          <Skeleton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  );
}

export default CreditScore;
