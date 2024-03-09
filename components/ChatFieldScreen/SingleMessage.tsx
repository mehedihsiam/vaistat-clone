import React from 'react';
import {View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import FlexRowStart from '../common/FlexRowStart';
import Typography from '../common/Typography';

type TSingleMessage = {
  message: string;
  person: 'receiver' | 'sender';
};

const SingleMessage = (props: TSingleMessage) => {
  const theme = useCustomTheme();
  const containerStyles = {
    height: 50,
    width: '80%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor:
      props.person === 'receiver' ? theme.PRIMARY : theme.OPPOSITE_OF_ACCENT,
    borderBottomLeftRadius: props.person === 'receiver' ? 20 : 0,
    borderBottomEndRadius: props.person === 'receiver' ? 0 : 20,
    marginVertical: 5,
  };

  const parentComponent = {
    alignItems: props.person === 'receiver' ? 'flex-end' : 'flex-start',
    marginVertical: 10,
  };

  return (
    <View style={[parentComponent]}>
      <View style={[containerStyles]}>
        <FlexRowStart height={'100%'} paddingHorizontal={15}>
          <Typography
            color={
              props.person === 'receiver'
                ? theme.OPPOSITE_OF_ACCENT
                : theme.ACCENT
            }>
            {props.message}
          </Typography>
        </FlexRowStart>
      </View>
      <Typography color={theme.DISABLED_TEXT}>9:12PM</Typography>
    </View>
  );
};

export default SingleMessage;
