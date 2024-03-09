import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import JobComponent from './JobComponent';

export default function AvailableJobList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
      <JobComponent buttonType="Accept" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
