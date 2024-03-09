import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Tag from '../common/Tag';
import FlexRowBetween from '../common/FlexRowBetween';
import Typography from '../common/Typography';

import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TEditDocumentButton = {
  status: string;
  label: string;
};

export default function EditDocumentButton(props: TEditDocumentButton) {
  const theme = useCustomTheme();
  const getTagColor = () => {
    switch (props.status) {
      case 'Uploaded':
        return theme.WARNING;
      case 'Verified':
        return theme.SUCCESS;
      case 'Unverified':
        return theme.DANGER;
      default:
        return theme.WARNING;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      style={styles.container}>
      <FlexRowBetween width="100%">
        <Typography>{props.label}</Typography>
        <Tag tag={props.status} backgroundColor={getTagColor()} />
        {/* {SVGs.ArrowRight(20, 20, theme.DISABLED_TEXT)} */}
      </FlexRowBetween>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
});
