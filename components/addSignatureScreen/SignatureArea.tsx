import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';

type TSignatureArea = {
  onOk: (signature: string) => void;
};

function SignatureArea(
  props: TSignatureArea,
  ref: React.ForwardedRef<SignatureViewRef>
) {
  const theme = useCustomTheme();
  const {width, height} = useWindowDimensions();

  const webStyle = `.m-signature-pad {box-shadow: none;  } 
              .m-signature-pad--body {border: none; background-color: ${theme.DISABLED_BG} }
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${width}px; height: ${height}px;}`;

  // Called after ref.current.readSignature() reads a non-empty base64 string

  return (
    <View style={styles.container}>
      <SignatureScreen
        ref={ref}
        webStyle={webStyle}
        autoClear={false}
        onOK={props.onOk}
        dataURL="data:image/png"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
    backgroundColor: 'red',
  },
});

const ForwardedSignatureArea = React.forwardRef(SignatureArea);

export default ForwardedSignatureArea;
