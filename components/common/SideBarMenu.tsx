import React from 'react';
import SVGs from '../../assets';

import useCustomTheme from '../../hooks/useCustomTheme';
import {Linking} from 'react-native';
import Button from '../Button';
import Divider from './Devider';
import useLogout from '../../APIs/hooks/useLogout';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import MenuItem from './MenuItem';
import {LOGGED_IN_ROUTES, ROOT_ROUTES} from '../../constants/ROUTES';
import {TMenuItem} from '../../types/menuItem';
import useLanguage from '../../hooks/useLanguage';
import useUpdateLanguage from '../../hooks/useUpdateLanguage';
import usePreferredLanguage from '../../hooks/usePreferredLanguage';

type TSideBarMenuLastSection = {
  setIsOpen: (arg: boolean) => void;
};
export default function SideBarMenu(props: TSideBarMenuLastSection) {
  const theme = useCustomTheme();
  const language = useLanguage();
  const logout = useLogout();
  const dispatchAppData = useDispatchAppLocalData();
  const changeLanguage = useUpdateLanguage();
  const preferredLanguage = usePreferredLanguage();

  const SideBarMenuDataFirst: TMenuItem[] = [
    {
      id: 1,
      item: language.SIDEBAR_TEXTS.PROFILE,
      icon: SVGs.UserRegular(24, 24),
      link: LOGGED_IN_ROUTES.PROFILE,
    },

    {
      id: 9,
      icon: SVGs.Pharmacy(24, 24),
      item: language.SIDEBAR_TEXTS.PHARMACY_CONNECTION,
      link: LOGGED_IN_ROUTES.PROFILE,
    },
    {
      id: 10,
      icon: SVGs.DeliveryTruck(24, 24),
      item: language.SIDEBAR_TEXTS.DISPATCH_CONNECTION,
      link: LOGGED_IN_ROUTES.PROFILE,
    },
    {
      id: 11,
      icon: SVGs.TransferRight(24, 24),
      item: language.TRANSFERRED_JOB_SCREEN.TITLE,
      link: LOGGED_IN_ROUTES.TRANSFERRED_JOB,
    },
  ];

  const SideBarMenuDataSecond: TMenuItem[] = [
    {
      id: 4,
      icon: SVGs.Notification(24, 24, 'black'),
      item: language.SIDEBAR_TEXTS.NOTIFICATION_SETTINGS,
      pressExtra() {
        Linking.openSettings();
      },
    },
    {
      id: 8,
      icon: SVGs.Terms(24, 24),
      item: language.SIDEBAR_TEXTS.TERMS_PRIVACY_POLICY,
      link: ROOT_ROUTES.TERMS_AND_CONDITIONS,
    },
    {
      id: 9,
      icon: SVGs.Translate(24, 24),
      item: language.SIDEBAR_TEXTS.CHANGE_LANGUAGE,
      pressExtra() {
        handleChangeLanguage();
      },
    },
    {
      id: 10,
      icon: SVGs.FAQ(26, 26),
      item: language.SIDEBAR_TEXTS.FAQ,
      link: ROOT_ROUTES.FAQ,
    },
  ];

  const handleChangeLanguage = () => {
    switch (preferredLanguage) {
      case 'en':
        changeLanguage('fr');
        break;
      case 'fr':
        changeLanguage('en');
        break;
      default:
        changeLanguage('en');
        break;
    }
  };

  const handelLogout = async () => {
    dispatchAppData?.setIsLoading(true);
    const res = await logout();
    if (res) {
      dispatchAppData?.setIsLoading(false);
    }
  };

  const toggleSlideBar = () => {
    props.setIsOpen(false);
  };

  return (
    <>
      {SideBarMenuDataFirst.map(item => (
        <MenuItem key={item.id} menuItem={item} onPressExtra={toggleSlideBar} />
      ))}
      <Divider />
      {SideBarMenuDataSecond.map(item => (
        <MenuItem
          key={item.id}
          menuItem={item}
          onPressExtra={() => {
            item.pressExtra?.();
            toggleSlideBar();
          }}
        />
      ))}

      <Button
        variant="withTextAndIcon"
        title={language.SIDEBAR_TEXTS.LOG_OUT}
        textColor={theme.DANGER}
        icon={SVGs.Logout(19, 19, theme.DANGER)}
        onPress={handelLogout}
      />
    </>
  );
}
