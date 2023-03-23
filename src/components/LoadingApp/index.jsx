import React from 'react';
import { ActivityIndicator } from "react-native"
import { Container, TextMessage, Logo } from './styles';

import logo from '../../assets/logo/logo.png'

const LoadingApp = ({ message }) => {
  return (
    <Container>
      <Logo resizeMode="contain" source={logo} />
      <TextMessage>{message}</TextMessage>
      <ActivityIndicator color="black" size="large" />
    </Container>
  )
}

export default LoadingApp;