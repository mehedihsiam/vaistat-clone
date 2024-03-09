import {View, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import FlexRowBetween from '../common/FlexRowBetween';
import useLanguage from '../../hooks/useLanguage';

type TEarningTable = {
  title: string;
  jobs: number;
  earning: number;
  tips: number;
};

export default function EarningTable(props: TEarningTable) {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {title, jobs, earning, tips} = props;

  const data = [
    {title: language.PROFILE_SCREEN.JOBS, value: jobs},
    {title: language.PROFILE_SCREEN.EARNED, value: earning},
    {title: language.PROFILE_SCREEN.TIPS, value: tips},
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      <View style={[styles.header, {backgroundColor: theme.SUCCESS}]}>
        <Typography color={theme.OPPOSITE_OF_ACCENT}>{title}</Typography>
      </View>
      <FlexRowBetween>
        {data.map(item => (
          <View key={item.title} style={styles.earningColumn}>
            <Typography color={theme.ACCENT} fontWeight="bold">
              {item.title !== 'Jobs' ? `$${item.value}` : item.value}
            </Typography>
            <Typography color={theme.ACCENT}>{item.title}</Typography>
          </View>
        ))}
      </FlexRowBetween>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningColumn: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
