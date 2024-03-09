import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {ScreenProps} from '../types/ScreenProps';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import Typography from '../components/common/Typography';
import ReportViewRow from '../components/ReportViewRow';
import useCustomTheme from '../hooks/useCustomTheme';
import useLanguage from '../hooks/useLanguage';

type Props = ScreenProps<LoggedInStackParamList, 'ReportView'>;

const ProfileReportViewScreen = (props: Props) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {report} = props.route.params;

  const rows = [
    {
      left: language.REPORT_VIEW_SCREEN.TOTAL_JOBS,
      right: `${report.totalJobs} ${language.REPORT_VIEW_SCREEN.JOBS}`,
    },
    {
      left: language.REPORT_VIEW_SCREEN.COMPLETED_JOBS,
      right: `${report.completedJobs} ${language.REPORT_VIEW_SCREEN.JOBS}`,
    },
    {
      left: language.REPORT_VIEW_SCREEN.NOT_DELIVERED,
      right: `${report.notDeliveredJobs} ${language.REPORT_VIEW_SCREEN.JOBS}`,
    },
    {
      left: language.REPORT_VIEW_SCREEN.CASH_PENDING,
      right: `$ ${report.cashPending.toFixed(2)}`,
    },
    {
      left: language.REPORT_VIEW_SCREEN.CHEQUE_PENDING,
      right: `$ ${report.chequePending.toFixed(2)}`,
    },
    {
      left: language.REPORT_VIEW_SCREEN.TOTAL_EARNING,
      right: `$ ${report.totalEarnings.toFixed(2)}`,
    },
  ];

  return (
    <CommonScreenContainer
      screenTitleProps={{
        showBackButton: true,
        title: language.REPORT_VIEW_SCREEN.TITLE,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri: report.profile_img}} />
        <Typography fontSize={24} fontWeight="600" textAlign="center">
          {report.pharmacy_name}
        </Typography>
        <Typography fontSize={14} fontWeight="400" textAlign="center">
          {report.location}
        </Typography>
        <View style={[styles.breaker, {backgroundColor: theme.PRIMARY}]} />
      </View>
      {rows.map(row => (
        <ReportViewRow key={row.left} left={row.left} right={row.right} />
      ))}
    </CommonScreenContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  breaker: {
    height: 3,
    width: '100%',
  },
});

export default ProfileReportViewScreen;
