import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import SingleLine from '../common/SingleLine';
import {TSetState} from '../../types/setStateType';
import Typography from '../common/Typography';
import FlexRowBetween from '../common/FlexRowBetween';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TEditProfileTabs = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: TSetState<string>;
};

export default function EditProfileTabs(props: TEditProfileTabs) {
  const theme = useCustomTheme();
  const handleSelectedTab = (tab: string) => () => {
    props.setSelectedTab(tab);
  };

  const selectedStyles = {
    borderBottomWidth: 2,
    borderBottomColor: theme.PRIMARY,
  };

  return (
    <View style={styles.container}>
      <FlexRowBetween>
        {props.tabs.map((tab, index) => {
          const isSelected = props.selectedTab === tab;
          return (
            <TouchableOpacity
              activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
              style={[styles.tabButton, isSelected && selectedStyles]}
              key={index}
              onPress={handleSelectedTab(tab)}>
              <Typography color={isSelected ? theme.PRIMARY : theme.ACCENT}>
                {tab}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </FlexRowBetween>
      <SingleLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabButton: {
    width: `${100 / 3}%`,
    alignItems: 'center',
    paddingVertical: 16,
  },
});
