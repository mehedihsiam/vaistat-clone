import React from 'react';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {TMenuItem} from '../../types/menuItem';
import Button from '../Button';

type MenuItemProps = {
  menuItem: TMenuItem;
  hasRightArrow?: boolean;
  onPressExtra?: () => void;
};
const MenuItem = ({menuItem, hasRightArrow, onPressExtra}: MenuItemProps) => {
  const {navigate} = useCustomNavigate();
  const handleNavigate = () => {
    if (onPressExtra) {
      onPressExtra();
    }
    if (menuItem.link) {
      navigate(menuItem.link as string);
    }
  };

  return (
    <Button
      variant="withTextAndIcon"
      onPress={handleNavigate}
      icon={menuItem.icon}
      title={menuItem.item}
      hasRightArrow={hasRightArrow}
      fontWeight="700"
      fontSize={20}
    />
  );
};

export default MenuItem;
