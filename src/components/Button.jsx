import styled from 'styled-components'

export const GhostButton = styled.button`
  user-select: none;
  outline: none;
  cursor: pointer;
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
