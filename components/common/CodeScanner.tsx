import {StyleSheet, View, Vibration, ActivityIndicator} from 'react-native';

import {
  useCameraPermission,
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import React, {useState, useEffect} from 'react';
import TransparentButton from './TransparentButton';
import SVGs from '../../assets';
import {TSetState} from '../../types/setStateType';

type TTorchState = 'on' | 'off' | undefined;

type TCodeScanner = {
  codeValue: string | undefined;
  setCodeValue: TSetState<string | undefined>;
};

export default function CodeScanner(props: TCodeScanner) {
  const {hasPermission, requestPermission} = useCameraPermission();

  const [torch, setTorch] = useState<TTorchState>('off');
  const [showCamera, setShowCamera] = useState(true);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (props.codeValue === codes[0].value) {
        return;
      } else {
        Vibration.vibrate(400);
        props.setCodeValue(codes[0].value);
      }
    },
  });

  const handleToggleTorch = () => {
    if (torch === 'on') {
      setTorch('off');
    } else {
      setTorch('on');
    }
  };

  useEffect(() => {
    setShowCamera(true);
  }, []);

  useEffect(() => {
    if (hasPermission) {
      setShowCamera(true);
    } else {
      requestPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    return () => {
      setShowCamera(false);
    };
  }, []);

  if (device === null) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {showCamera && device ? (
        <>
          <View style={styles.flashButton}>
            <TransparentButton onPress={handleToggleTorch}>
              {torch === 'on'
                ? SVGs.Flash(30, 30, 'white')
                : SVGs.FlashOff(30, 30, 'white')}
            </TransparentButton>
          </View>
          <Camera
            style={[styles.camera]}
            device={device}
            isActive={showCamera}
            codeScanner={codeScanner}
            photo={false}
            video={false}
            audio={false}
            torch={torch}
          />

          <View style={styles.codeAreaContainer}>
            {SVGs.QrCodeArea(250, 250, 'green')}
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: 250,
    width: 250,
  },
  codeAreaContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{translateY: -125}],
  },
  flashButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingVertical: 10,
  },
});
