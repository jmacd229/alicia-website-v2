import React, { FC, ReactElement, ReactNode } from 'react';
import { StyledButton, StyledLink } from './style';

const BaseButton: FC<{
  children: ReactNode;
  href?: string;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
}> = ({
  href,
  children,
  onMouseEnter,
  onFocus,
  onClick,
  ...rest
}): ReactElement => {
  if (href) {
    return (
      <StyledLink
        href={href}
        {...rest}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onClick={onClick}>
        {children}
      </StyledLink>
    );
  } else {
    return (
      <StyledButton
        {...rest}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
};

export default BaseButton;
