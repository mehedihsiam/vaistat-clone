import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import JobComponent, {TJobButton} from './JobComponent';
import NoTaskField from '../NoTaskField';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TJobsPharmacyList} from '../../types/jobs';
import {TOnAccept, TOnAcceptAll} from '../../types/jobAccept';

type TJobListProps = {
  loading: boolean;
  onRefresh?: () => void;
  jobs: TJobsPharmacyList;
  buttonType: TJobButton;
  onAcceptAll: TOnAcceptAll;
  onAccept: TOnAccept;
  emptyMessage: string;
};

export default function JobList(props: TJobListProps) {
  const theme = useCustomTheme();
  const dimensions = useWindowDimensions();

  const {loading, onRefresh, jobs, onAccept, onAcceptAll} = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={[theme.PRIMARY]}
        />
      }
      data={jobs}
      keyExtractor={item => item.business.id}
      renderItem={({item}) => (
        <JobComponent
          onAccept={onAccept}
          onAcceptAll={onAcceptAll}
          buttonType={props.buttonType}
          data={item}
        />
      )}
      ListEmptyComponent={
        <View
          style={[styles.emptyContainer, {height: dimensions.height - 200}]}>
          <NoTaskField text={props.emptyMessage} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
