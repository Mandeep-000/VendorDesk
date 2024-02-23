import styled from 'styled-components'

export const Wrapper = styled.div`
display: flex;
gap: 1rem;
justify-content: center;

img{
    width: 2.5rem;
}
`
export const Text = styled.span`
display: flex;
align-items: center;
font-size: 1.6rem;
font-weight: 900;
line-height: 0;
color: var(--grey-800);
`
export const BlueText = styled(Text)`
 color: var(--primary-500);
`
