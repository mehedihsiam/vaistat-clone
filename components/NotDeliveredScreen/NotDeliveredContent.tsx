import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import RadioButtonWithNestedComponent from '../common/RadioButtonWithNestedComponent';
import Spacer from '../common/Spacer';
import OutlineButton from '../common/OutlineButton';
import SVGs from '../../assets';
import InputField from '../common/InputField';
import {Asset} from 'react-native-image-picker';
import FilePickingModal from '../common/FilePickingModal';
import useLanguage from '../../hooks/useLanguage';

type TNotDeliveredContent = {
  reason: string;
  setReason: (reason: string) => void;
  selectedOption: string;
  setSelectedOption: (arg: string) => void;
  handleGetImage: (asset: Asset | undefined) => void;
};

export default function NotDeliveredContent(props: TNotDeliveredContent) {
  const language = useLanguage();
  const theme = useCustomTheme();
  const [isVisibleFilePickingModal, setIsVisibleFilePickingModal] =
    React.useState(false);

  const handleSelectReason = (option: string) => () => {
    props.setSelectedOption(option);
    if (option !== language.NOT_DELIVERED_SCREEN.OTHERS) {
      props.setReason(option);
    } else {
      props.setReason('');
    }
  };

  const handleTypeReason = (reason: string) => {
    props.setReason(reason);
  };

  const handleOpenModal = () => {
    setIsVisibleFilePickingModal(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.contentContainer}>
      <FilePickingModal
        modalVisible={isVisibleFilePickingModal}
        setModalVisible={setIsVisibleFilePickingModal}
        handleGetImage={props.handleGetImage}
      />
      <Typography color={theme.DISABLED_TEXT}>Specify the reason</Typography>
      <Spacer height={20} />
      <RadioButtonWithNestedComponent
        isActive={
          props.selectedOption === language.NOT_DELIVERED_SCREEN.NOT_AVAILABLE
        }
        activeChildren={null}
        onPress={handleSelectReason(
          language.NOT_DELIVERED_SCREEN.NOT_AVAILABLE
        )}
        title={language.NOT_DELIVERED_SCREEN.NOT_AVAILABLE}
      />
      <Spacer height={20} />
      <RadioButtonWithNestedComponent
        isActive={
          props.selectedOption ===
          language.NOT_DELIVERED_SCREEN.ADDRESS_NOT_FOUND
        }
        activeChildren={null}
        onPress={handleSelectReason(
          language.NOT_DELIVERED_SCREEN.ADDRESS_NOT_FOUND
        )}
        title={language.NOT_DELIVERED_SCREEN.ADDRESS_NOT_FOUND}
      />
      <Spacer height={20} />
      <RadioButtonWithNestedComponent
        isActive={props.selectedOption === language.NOT_DELIVERED_SCREEN.OTHERS}
        activeChildren={
          <InputField
            placeholder={language.NOT_DELIVERED_SCREEN.SPECIFY}
            multiline
            height={130}
            textAlignVertical="top"
            numberOfLines={100}
            onChangeText={handleTypeReason}
          />
        }
        onPress={handleSelectReason(language.NOT_DELIVERED_SCREEN.OTHERS)}
        title="Other"
      />
      <Spacer height={20} />
      <OutlineButton onPress={handleOpenModal}>
        {SVGs.Plus(24, 24)}
        <Typography>{language.NOT_DELIVERED_SCREEN.ADD_PICTURE}</Typography>
      </OutlineButton>
      <Spacer height={20} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
    gap: 20,
  },
});
