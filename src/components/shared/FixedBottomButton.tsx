import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { createPortal } from 'react-dom';

import Button from '@shared/Button';
import { colors } from '@/styles/colorPalette';

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal');

  if ($portalRoot == null) {
    return null;
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        onClick={onClick}
        full={true}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  );
};

export default FixedBottomButton;

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  animation: ${slideup} 0.5s ease-in-out forwards;

  transform: translateY(100%);
`;

const buttonStyles = css`
  border-radius: 8px;
`;
