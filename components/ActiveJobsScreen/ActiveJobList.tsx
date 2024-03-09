import {FlatList, RefreshControl} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import ActiveJobItemButton from '../ActiveJobItemButton';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import useActiveJobContext from '../../contexts/hooks/useActiveJobContext';
import useActiveJobDispatchContext from '../../contexts/hooks/useActiveJobDispatchContext';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import ListEmptyComponent from '../ListEmptyComponent';
import Spacer from '../common/Spacer';
import useLanguage from '../../hooks/useLanguage';

const ActiveJobList = () => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();

  const activeJobContext = useActiveJobContext();
  const activeJobDispatchContext = useActiveJobDispatchContext();

  const handlePress = () => {
    navigate(LOGGED_IN_ROUTES.READY_DELIVERY);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={activeJobContext?.loading || false}
          onRefresh={activeJobDispatchContext?.fetchJobList}
          colors={[theme.PRIMARY]}
        />
      }
      keyExtractor={item => item._id}
      data={activeJobContext?.jobList || []}
      ListEmptyComponent={
        <ListEmptyComponent text={language.ACTIVE_JOBS_SCREEN.NO_ACTIVE_JOBS} />
      }
      ListFooterComponent={<Spacer height={70} />}
      renderItem={({item, index}) => (
        <ActiveJobItemButton
          customer_name={`${item.customer_f_name} ${item.customer_l_name}`}
          drop_off_location={item.drop_off_location}
          pick_up_location={item.pick_up_location}
          job_id={item._id}
          onPress={handlePress}
          job_tags={item.job_tags}
          job_amount={item.job_amount}
          estimate_distance={item.estimate_distance}
          customer_phone_number={`${item.customer_country_code}${item.customer_phone}`}
          itemBgColor={index % 2 === 0 ? theme.OPPOSITE_OF_ACCENT : '#ededed'}
          variant="active"
          note={item.note}
          collectedAmount={item.collected_amount}
        />
      )}
    />
  );
};

export default ActiveJobList;
