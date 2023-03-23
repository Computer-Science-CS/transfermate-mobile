import styled from 'styled-components/native';

export const ContainerLoader = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    position: absolute;
    background-color: ${(props) => props.container ? 'transparent' : 'rgba(16, 25, 87, .8)'};
    justify-content: center;
    align-items: center;
    /* opacity: .8; */
    z-index: 100;
`;