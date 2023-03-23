import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ContainerLoader } from './styles';
import LottieView from 'lottie-react-native';
import loader from '../../assets/animations/lf30_editor_nwfjfib3.json';

const Loader = (props) => {

  return (
      <ContainerLoader container={props.container}>
        <LottieView
          style={{ width: 280, height: 280 }}
          autoPlay
          colorFilters={[
            {
              keypath: 'ADBE Vector Shape - Group',
              color: 'red'
            }
          ]}
          source={loader}
        />
      </ContainerLoader>
  );
}

export default Loader;