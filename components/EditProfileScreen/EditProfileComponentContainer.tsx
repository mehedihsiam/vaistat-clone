import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

type TEditProfileComponentContainer = {
  children: React.ReactNode;
};

export default function EditProfileComponentContainer(
  props: TEditProfileComponentContainer
) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>{props.children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
});
