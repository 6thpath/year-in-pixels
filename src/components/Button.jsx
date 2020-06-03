import styled from 'styled-components'

export const Button = styled.button`
  user-select: none;
  outline: none;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: ${(p) => p.theme.spacing.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.font.size.xs};
  border: none;
  border-radius: ${(p) => p.theme.radius.md};
  background: linear-gradient(to right, #a6b1e1, #424874);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: linear-gradient(to right, #dcd6f7, #a6b1e1);
    transition: opacity 0.4s;
    z-index: -1;
  }

  ${(p) => {
    if (!p.disabled) {
      return `
  cursor: pointer;

  &:hover::before {
    opacity: 0.5;
  }
      `
    }
  }}

  &:disabled::before {
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.colors.grey[400]};
    opacity: 1;
  }
`

export const BorderButton = styled.button`
  user-select: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: ${(p) => p.theme.spacing.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.color};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight[p.fontWeight] || p.theme.font.weight.normal};
  border: 2px solid ${(p) => p.color};
  border-radius: ${(p) => p.theme.radius.md};
  transition: all 0.4s;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }
`

export const ButtonLink = styled.button`
  user-select: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: ${(p) => p.theme.spacing.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.primary.dark};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight[p.fontWeight] || p.theme.font.weight.normal};
  border: none;
  opacity: 1;
  transition: all 0.4s;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`
