import {
  ComponentPropsWithRef,
  FocusEventHandler,
  forwardRef,
  useState,
} from 'react';
import Text from './Text';
import Input from './Input';

interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...rest },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    // TODO: 포커스 처리
    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined;

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    );
  },
);

export default TextField;
