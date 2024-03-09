import React, {useEffect, useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import FlexRowBetween from '../components/common/FlexRowBetween';
import SingleLine from '../components/common/SingleLine';
import Spacer from '../components/common/Spacer';
import ReportDownloadButton from '../components/ReportDownloadButton';
import DateInput from '../components/common/DateInput';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import Typography from '../components/common/Typography';
import useCustomTheme from '../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import getDate from '../utils/getDate';
import {useGetDriverReports} from '../APIs/hooks/useDriverReport';
import useAuth from '../contexts/hooks/useAuth';
import NoTaskField from '../components/NoTaskField';
import {TDriverReport} from '../types/driverReport';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useLanguage from '../hooks/useLanguage';

export default function ProfileReportsScreen() {
  const language = useLanguage();
  // const filterKey = FILTER_KEYS.PROFILE_REPORT;
  const auth = useAuth();
  const theme = useCustomTheme();
  // const filterContext = useFilterContext();
  const driverReports = useGetDriverReports();
  const snackBarContext = useSnackBarSetContext();

  const [reports, setReports] = useState<TDriverReport[]>([]);
  const [fromDate, setFromDate] = React.useState<Date>(getDate(7));
  const [toDate, setToDate] = React.useState<Date>(getDate(0));
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    if (auth) {
      setLoading(true);
      const res = await driverReports({
        driver_id: auth._id,
        startDate: fromDate.toISOString(),
        endDate: toDate.toISOString(),
      });
      if (res.code === 200) {
        setReports(res.result);
      } else {
        snackBarContext?.showSnackBar(res.message, 'error');
      }
      setLoading(false);
    }
  };

  // const handleOpenFilterDrawer = () => {
  //   filterContext?.showFilter(filterKey);
  // };

  useEffect(() => {
    fetchReports();
  }, [fromDate, toDate]);

  return (
    <NonScrollableScreenContainer
      paddingVertical={0}
      paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}>
      <ScreenTitle title={language.REPORTS_SCREEN.TITLE} showBackButton />
      <FlexRowBetween gap={10}>
        <DateInput
          label={language.REPORTS_SCREEN.FROM}
          date={fromDate}
          setDate={setFromDate}
        />
        <DateInput
          label={language.REPORTS_SCREEN.TO}
          date={toDate}
          setDate={setToDate}
        />
      </FlexRowBetween>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.PRIMARY} />
        </View>
      ) : reports.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}>
          <Typography textAlign="center" color={theme.DISABLED_TEXT}>
            {language.REPORTS_SCREEN.FULL_REPORT}
          </Typography>
          <Spacer height={20} />
          <SingleLine />
          {reports.map(report => (
            <ReportDownloadButton report={report} key={report._id} />
          ))}
        </ScrollView>
      ) : (
        <NoTaskField text={language.REPORTS_SCREEN.EMPTY} />
      )}
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
