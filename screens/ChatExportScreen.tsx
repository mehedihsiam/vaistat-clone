import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import RadioButton from '../components/common/RadioOptions/RadioButton';
import ScreenFooter from '../components/common/ScreenFooter';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import DateInput from '../components/common/DateInput';
import OptionSwitch from '../components/common/OptionSwitch';
import CHAT_EXPORT_FORMATS from '../contexts/hooks/CHAT_EXPORT_FORMATS';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function ChatExportScreen() {
  const theme = useCustomTheme();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [selectedFormat, setSelectedFormat] = React.useState(
    CHAT_EXPORT_FORMATS[0]
  );

  return (
    <NonScrollableScreenContainer
      paddingVertical={0.001}
      paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}>
      <ScreenTitle title="Chat Export" showBackButton />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.contentContainer}>
          <RadioButton selected option="Dispatch chat export" />
          <RadioButton
            selected
            option="Patient chat export (coming soon)"
            disabled
          />
          <DateInput
            label="Starting Date"
            date={startDate}
            setDate={setStartDate}
          />
          <DateInput label="Ending Date" date={endDate} setDate={setEndDate} />
          <OptionSwitch
            options={CHAT_EXPORT_FORMATS}
            selectedOption={selectedFormat}
            setSelectedOption={setSelectedFormat}
          />
        </View>
      </ScrollView>
      <ScreenFooter height={80}>
        <Button
          backgroundColor={theme.PRIMARY}
          textColor={theme.OPPOSITE_OF_ACCENT}
          variant="fillRounded"
          title="Download"
        />
      </ScreenFooter>
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 20,
  },
});
