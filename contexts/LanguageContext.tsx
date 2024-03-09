import React, {PropsWithChildren, createContext, useEffect} from 'react';
import storage from '../utils/storage';
import JSON_KEYS from '../constants/JSON_KEYS';
import LanguageSelectionModal from '../containers/Modal/LanguageSelectionModal';
import {TLanguageValue} from '../types/languageValue';
import useDispatchAppLocalData from './hooks/useDispatchAppLocalData';

type TLanguageContext = {
  language: TLanguageValue;
  updateLanguage: (value: TLanguageValue) => void;
};

export const LanguageContext = createContext<TLanguageContext>(
  {} as TLanguageContext
);

const LanguageArea = (props: PropsWithChildren) => {
  const [language, setLanguage] = React.useState<TLanguageValue>('en');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dispatchLocalAppData = useDispatchAppLocalData();

  const updateLanguage = async (
    value: TLanguageValue,
    closeModal?: boolean
  ) => {
    dispatchLocalAppData?.setIsLoading(true);
    await storage.set(JSON_KEYS.LANGUAGE, value);
    setLanguage(value);
    dispatchLocalAppData?.setIsLoading(false);
    if (closeModal) {
      setOpenModal(false);
    }
  };

  const getLanguageValue = async () => {
    const res = await storage.get(JSON_KEYS.LANGUAGE);
    if (res) {
      setLanguage(res as TLanguageValue);
    } else {
      setOpenModal(true);
    }
  };

  const values = {
    language,
    updateLanguage,
  };

  useEffect(() => {
    getLanguageValue();
  }, []);

  return (
    <LanguageContext.Provider value={values}>
      {openModal && (
        <LanguageSelectionModal
          updateLanguage={updateLanguage}
          open={openModal}
        />
      )}
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageArea;
