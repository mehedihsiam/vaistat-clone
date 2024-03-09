import React, {Fragment} from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import Typography from '../components/common/Typography';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import PRIVACY_POLICIES from '../constants/PRIVACY_POLICIES';
import Spacer from '../components/common/Spacer';
import SVGs from '../assets';
import {StyleSheet, View} from 'react-native';
import useCustomTheme from '../hooks/useCustomTheme';

export default function TermsAndConditionsScreen() {
  const theme = useCustomTheme();
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Terms And Conditions',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <View style={styles.logoContainer}>{SVGs.VaistatLogo(140, 280)}</View>
      {PRIVACY_POLICIES.map(policy => (
        <Fragment key={policy.title}>
          <Typography fontSize={18} fontWeight="700">
            {policy.title}
          </Typography>
          <Spacer height={16} />
          {policy.descriptions.map((description, index) => (
            <Fragment key={index}>
              <Typography
                color={theme.DISABLED_TEXT}
                textAlign="justify"
                key={description}>
                {description}
              </Typography>
              <Spacer height={10} />
            </Fragment>
          ))}
          <Spacer height={16} />
        </Fragment>
      ))}
    </CommonScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
});
