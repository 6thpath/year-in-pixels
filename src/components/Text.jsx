import styled from 'styled-components'

export const Hr = styled.hr`
  width: 100%;
  height: 1.5em;
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  opacity: 0.5;

  ${(p) =>
    p.content
      ? `
  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #000, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
`
      : ''}

  &:after {
    ${(p) => (p.content ? `content: '${p.content}'` : '')};
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    background-color: #fcfcfa;
  }
`
