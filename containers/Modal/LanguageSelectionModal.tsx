import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DetailsBoxWrapper from '../../components/common/DetailsBoxWrapper';
import Typography from '../../components/common/Typography';
import ModalContainer from '../ModalContainer';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TLanguageValue} from '../../types/languageValue';

type TDirectionModal = {
  open: boolean;
  updateLanguage: (value: TLanguageValue, closeModal?: boolean) => void;
};

const languages = [
  {
    name: 'English',
    value: 'en' as TLanguageValue,
  },
  {
    name: 'Français',
    value: 'fr' as TLanguageValue,
  },
];

const LanguageSelectionModal = (props: TDirectionModal) => {
  return (
    <ModalContainer disableOutsideClick modalVisible={props.open}>
      <View style={styles.container}>
        <DetailsBoxWrapper>
          <Typography>Select your preferred language</Typography>
          {languages.map(language => (
            <TouchableOpacity
              onPress={() => props.updateLanguage(language.value, true)}
              activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
              key={language.value}
              style={styles.languageButton}>
              <Typography fontSize={18} fontWeight="600">
                {language.name}
              </Typography>
            </TouchableOpacity>
          ))}
        </DetailsBoxWrapper>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 350,
  },
  languageButton: {
    width: '100%',
    paddingVertical: 15,
  },
});

export default LanguageSelectionModal;
