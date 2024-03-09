import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TSetState} from '../../types/setStateType';
import Button from '../Button';
import JobFilterCheckbox from '../HomeScreen/JobFilterCheckbox';
import Spacer from './Spacer';
import TransparentButton from './TransparentButton';
import Typography from './Typography';

type TFilter = {
  label: string;
  value: string;
};

type TJobFilter = {
  filters: TFilter[];
  appliedFilters: string[];
  setAppliedFilters: (filters: string[]) => void;
  setIsOpenFilterDrawer: TSetState<boolean>;
};

export default function FilterList(props: TJobFilter) {
  const theme = useCustomTheme();
  const [checkedFilters, setCheckedFilters] = React.useState<string[]>(
    props.appliedFilters
  );

  const handleClear = () => {
    setCheckedFilters([]);
    props.setAppliedFilters([]);
    props.setIsOpenFilterDrawer(false);
  };

  const handleApply = () => {
    props.setAppliedFilters(checkedFilters);
    props.setIsOpenFilterDrawer(false);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}>
      <View style={styles.topLine}>
        <Spacer height={10} width={50} />
        <Typography fontWeight="600">Filter pharmacies</Typography>
        <TransparentButton onPress={handleClear}>
          <Typography>Clear</Typography>
        </TransparentButton>
      </View>
      <Spacer height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.filtersContainer}>
        {props.filters.map(filter => (
          <JobFilterCheckbox
            key={filter.value}
            value={filter.value}
            label={filter.label}
            checkedFilters={checkedFilters}
            setCheckedFilters={setCheckedFilters}
          />
        ))}
      </ScrollView>
      <Spacer height={10} />
      <Button
        variant="fillRounded"
        title="Apply"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        disabled={checkedFilters?.length === 0}
        onPress={handleApply}
      />
      <Spacer height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 550,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersContainer: {
    flex: 1,
  },
  checkboxStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
});
