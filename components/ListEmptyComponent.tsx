import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import NoTaskField from './NoTaskField';

type TListEmptyComponent = {
  text: string;
};

const ListEmptyComponent = (props: TListEmptyComponent) => {
  const dimensions = useWindowDimensions();
  return (
    <View style={[styles.emptyContainer, {height: dimensions.height - 200}]}>
      <NoTaskField text={props.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListEmptyComponent;
