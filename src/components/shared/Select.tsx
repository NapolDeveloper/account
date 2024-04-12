import { ComponentPropsWithRef, forwardRef } from 'react';
import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';
import Flex from './Flex';
import Text from './Text';

export interface Option {
  label: string;
  value: string | number | undefined;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

const BaseSelect = styled.select`
  height: 52px;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder = '눌러주세요', value, ...rest },
  ref,
) {
  return (
    <Flex direction="column">
      <Text
        typography="t7"
        color="black"
        display="inline-block"
        style={{ marginBottom: 6 }}
      >
        {label}
      </Text>
      <BaseSelect required={true} ref={ref} value={value} {...rest}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  );
});

export default Select;
