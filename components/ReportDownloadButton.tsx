import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from './common/Typography';
import Spacer from './common/Spacer';
import {TDriverReport} from '../types/driverReport';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';

type TReportDownloadButton = {
  report: TDriverReport;
};

export default function ReportDownloadButton(props: TReportDownloadButton) {
  const {report} = props;
  const {navigate} = useCustomNavigate();

  const handleNavigate = () => {
    navigate(LOGGED_IN_ROUTES.REPORT_VIEW, {
      report,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      {report.profile_img ? (
        <Image source={{uri: report.profile_img}} style={styles.logo} />
      ) : (
        <Spacer width={24} height={24} />
      )}
      <Typography>{report.pharmacy_name}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 5,
  },
});
