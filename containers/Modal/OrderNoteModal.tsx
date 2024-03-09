import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DetailsBoxWrapper from '../../components/common/DetailsBoxWrapper';
import Typography from '../../components/common/Typography';
import ModalContainer from '../ModalContainer';
import {TSetState} from '../../types/setStateType';
import Button from '../../components/Button';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from '../../components/common/Spacer';
import useLanguage from '../../hooks/useLanguage';

type TOrderNoteModal = {
  open: boolean;
  setOpenModal: TSetState<boolean>;
  note: string;
};

const OrderNoteModal = (props: TOrderNoteModal) => {
  const theme = useCustomTheme();
  const language = useLanguage();

  const handleClose = () => {
    props.setOpenModal(false);
  };

  return (
    <ModalContainer
      setModalVisible={props.setOpenModal}
      modalVisible={props.open}>
      <View style={styles.container}>
        <DetailsBoxWrapper>
          <Typography textAlign="center" fontSize={18} fontWeight="700">
            {language.ACTIVE_JOBS_SCREEN.ORDER_NOTE}
          </Typography>
          <Spacer height={10} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Typography>{props.note}</Typography>
          </ScrollView>
          <Spacer height={10} />
          <Button
            backgroundColor={theme.PRIMARY}
            textColor={theme.OPPOSITE_OF_ACCENT}
            variant="fillRounded"
            title={language.COMMON_TEXTS.OKAY}
            onPress={handleClose}
          />
        </DetailsBoxWrapper>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    minHeight: 350,
    width: 350,
  },
});

export default OrderNoteModal;
