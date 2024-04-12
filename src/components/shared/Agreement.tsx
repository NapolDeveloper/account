import { colors } from '@/styles/colorPalette';
import { css } from '@emotion/react';

import Flex from './Flex';
import Text from './Text';

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  );
};

const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void;
}) => {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle={true} />
      <Text bold={true}>{children}</Text>
    </Flex>
  );
};

const AgreementDescription = ({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void;
  link?: string;
}) => {
  return (
    <Flex as="li" justify="space-between">
      <Flex
        onClick={(e) => {
          onChange(e, !checked);
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  );
};

Agreement.Title = AgreementTitle;
Agreement.Description = AgreementDescription;

const IconCheck = ({
  checked,
  withCircle = false,
}: {
  checked: boolean;
  withCircle?: boolean;
}) => {
  return (
    <svg id="Layer_1" version="1.1" viewBox="0 0 48 48" width={24} height={24}>
      <g>
        {withCircle ? (
          <path
            d="M24,46C11.9,46,2,36.1,2,24S11.9,2,24,2s22,9.9,22,22S36.1,46,24,46z M24,4C13,4,4,13,4,24c0,11,9,20,20,20   c11,0,20-9,20-20C44,13,35,4,24,4z"
            fill={checked ? colors.blue : colors.gray}
          />
        ) : null}
      </g>
      <g>
        <polygon
          points="20,34.1 11.3,25.4 12.7,23.9 20,31.2 35.3,15.9 36.7,17.4  "
          fill={checked ? colors.blue : colors.gray}
        />
      </g>
    </svg>
  );
};

export default Agreement;

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`;
