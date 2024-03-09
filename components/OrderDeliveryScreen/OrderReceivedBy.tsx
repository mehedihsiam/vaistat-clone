import React from 'react';
import RadioButtonWithNestedComponent from '../common/RadioButtonWithNestedComponent';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import ReceiverRelationshipWithClient from './ReceiverRelationshipWithClient';
import OutlineButton from '../common/OutlineButton';
import SVGs from '../../assets';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import SingleLine from '../common/SingleLine';
import useLocalAppData from '../../contexts/hooks/useLocalAppData';
import ImageOutput from './ImageOutput';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useLanguage from '../../hooks/useLanguage';

type TOrderReceivedBy = {
  patientName: string;
  setReceiver: (receiver: string) => void;
};

export default function OrderReceivedBy(props: TOrderReceivedBy) {
  const language = useLanguage();
  const receivers = [
    language.ORDER_DELIVERY_SCREEN.SPOUSE,
    language.ORDER_DELIVERY_SCREEN.NURSE,
    language.ORDER_DELIVERY_SCREEN.DESK,
    language.ORDER_DELIVERY_SCREEN.FRIEND,
  ];
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const {height, width} = useWindowDimensions();
  const {currentSignature} = useLocalAppData();
  const dispatchLocalApp = useDispatchAppLocalData();

  const [selectedReceiver, setSelectedReceiver] = React.useState(
    language.ORDER_DELIVERY_SCREEN.PATIENT.toLowerCase()
  );
  const [selectedOnBehalfReceiver, setSelectedOnBehalfReceiver] =
    React.useState(receivers[0]);

  const handleDeleteSignature = () => {
    dispatchLocalApp?.setCurrentSignature(null);
  };

  const handleSelect = (receiver: string) => () => {
    setSelectedReceiver(receiver);
    if (receiver === language.ORDER_DELIVERY_SCREEN.PATIENT.toLowerCase()) {
      props.setReceiver(props.patientName);
    }
  };

  const handleAddSignature = () => {
    navigate(LOGGED_IN_ROUTES.ADD_SIGNATURE);
  };

  React.useEffect(() => {
    if (
      selectedReceiver === language.ORDER_DELIVERY_SCREEN.SOMEONE.toLowerCase()
    ) {
      props.setReceiver(selectedOnBehalfReceiver);
    }
  }, [selectedOnBehalfReceiver]);

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>
        {language.ORDER_DELIVERY_SCREEN.RECEIVED_BY}
      </Typography>
      <RadioButtonWithNestedComponent
        onPress={handleSelect(
          language.ORDER_DELIVERY_SCREEN.PATIENT.toLowerCase()
        )}
        isActive={
          selectedReceiver ===
          language.ORDER_DELIVERY_SCREEN.PATIENT.toLowerCase()
        }
        title={`${language.ORDER_DELIVERY_SCREEN.PATIENT} ${props.patientName}`}
        activeChildren={null}
      />
      <RadioButtonWithNestedComponent
        onPress={handleSelect(
          language.ORDER_DELIVERY_SCREEN.SOMEONE.toLowerCase()
        )}
        isActive={
          selectedReceiver ===
          language.ORDER_DELIVERY_SCREEN.SOMEONE.toLowerCase()
        }
        title={language.ORDER_DELIVERY_SCREEN.SOMEONE}
        activeChildren={
          <ReceiverRelationshipWithClient
            selected={selectedOnBehalfReceiver}
            handleSelect={setSelectedOnBehalfReceiver}
            receivers={receivers}
          />
        }
      />
      {selectedReceiver ===
        language.ORDER_DELIVERY_SCREEN.SOMEONE.toLowerCase() && (
        <>
          {currentSignature && (
            <ImageOutput
              source={{uri: currentSignature}}
              widthRatio={height / width}
              onDelete={handleDeleteSignature}
            />
          )}
          <OutlineButton onPress={handleAddSignature}>
            {currentSignature
              ? SVGs.Pencil(24, 24, theme.ACCENT)
              : SVGs.Plus(24, 24, theme.ACCENT)}
            <Typography>
              {currentSignature ? 'Edit' : 'Add'} Signature
            </Typography>
          </OutlineButton>
        </>
      )}
      <SingleLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingBottom: 10,
  },
});
