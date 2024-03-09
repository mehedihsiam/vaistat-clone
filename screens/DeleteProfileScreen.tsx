import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import InputField from '../components/common/InputField';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import RadioOptions from '../components/common/RadioOptions';

import Button from '../components/Button';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import useCustomTheme from '../hooks/useCustomTheme';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useGetProfileDeletionReasons from '../hooks/useGetProfileDeletionReasons';
import useLanguage from '../hooks/useLanguage';

export default function DeleteProfileScreen() {
  const language = useLanguage();
  const accountDeleteReason = useGetProfileDeletionReasons();
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleChangeReason = (text: string) => {
    setReason(text);
  };

  const handleProceed = () => {
    navigate(LOGGED_IN_ROUTES.CONFIRM_DELETE_ACCOUNT);
  };

  return (
    <NonScrollableScreenContainer>
      <ScreenTitle
        title={language.DELETE_ACCOUNT_SCREEN.TITLE}
        showBackButton={true}
      />
      <View style={styles.container}>
        <RadioOptions
          gap={20}
          options={accountDeleteReason}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        {selectedOption === language.DELETE_ACCOUNT_SCREEN.OTHER && (
          <>
            <Spacer height={10} />
            <Typography fontWeight="600">
              {language.DELETE_ACCOUNT_SCREEN.SHARE_REASON}
            </Typography>
            <Spacer height={10} />
            <InputField
              placeholder={language.DELETE_ACCOUNT_SCREEN.PLACEHOLDER}
              onChangeText={handleChangeReason}
              height={220}
              flex={0}
              textAlignVertical="top"
            />
          </>
        )}
      </View>
      <Button
        variant="fillRounded"
        title={language.COMMON_TEXTS.NEXT}
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        onPress={handleProceed}
        disabled={!selectedOption}
      />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
