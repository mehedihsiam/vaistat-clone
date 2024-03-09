import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {Fragment, useRef, useState} from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import SingleLine from '../common/SingleLine';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Spacer from '../common/Spacer';
import SVGs from '../../assets';

type TFaqAccordion = {
  item: {
    label: string;
    question: string;
    answers: string[];
  };
};

export default function FaqAccordion(props: TFaqAccordion) {
  const theme = useCustomTheme();
  const [isActive, setIsActive] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const heightIncrease = () => {
    Animated.timing(heightAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightDecrease = () => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = () => {
    if (isActive) {
      setIsActive(false);
      heightDecrease();
    } else {
      setIsActive(true);
      heightIncrease();
    }
  };

  const detailsStyle = {
    backgroundColor: theme.DISABLED_BG,
    height: !isActive ? 0 : undefined,
  };

  return (
    <Fragment>
      <SingleLine />
      <TouchableOpacity
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        onPress={handlePress}
        style={styles.headlineContainer}>
        <Typography fontWeight="600">{props.item.label}</Typography>
        <View style={{transform: [{rotate: isActive ? '0deg' : '180deg'}]}}>
          {SVGs.CaretUp(24, 24)}
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.detailsContainer, detailsStyle]}>
        <Spacer height={16} width="100%" />
        <Typography fontWeight="500">Q:{props.item.question}</Typography>
        <Spacer height={10} width="100%" />
        {props.item.answers.map(answer => (
          <Typography key={answer} color={theme.DISABLED_TEXT}>
            <View
              style={[styles.dot, {backgroundColor: theme.DISABLED_TEXT}]}
            />{' '}
            {answer}
          </Typography>
        ))}
        <Spacer height={16} width="100%" />
      </Animated.View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  arrowContainer: {
    transform: [{rotate: '180deg'}],
  },
  detailsContainer: {
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 4,
  },
});
