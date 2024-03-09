import React from 'react';
import {StyleSheet, View} from 'react-native';

const DetailsBoxWrapper = ({
  children,
  borderRadius = 16,
}: {
  children: React.ReactNode;
  borderRadius?: number;
}) => {
  return (
    <View style={[styles.container, {borderRadius: borderRadius}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default DetailsBoxWrapper;
