import {useFormik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import useChangePassword from '../APIs/hooks/useChangePassword';
import useLogout from '../APIs/hooks/useLogout';
import Button from '../components/Button';
import PasswordInputField from '../components/common/PasswordInputField';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import useAuth from '../contexts/hooks/useAuth';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useGetPasswordRules from '../data/PasswordRules';
import useCustomTheme from '../hooks/useCustomTheme';
import changePasswordValidationSchema, {
  changePasswordInitialValues,
} from '../validationSchemas/changePasswordValidation';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useLanguage from '../hooks/useLanguage';

type TData = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePasswordScreen() {
  const passwordRules = useGetPasswordRules();
  const language = useLanguage();
  const theme = useCustomTheme();
  const dispatchAppData = useDispatchAppLocalData();
  const changePassword = useChangePassword();
  const auth = useAuth();
  const logout = useLogout();
  const showSnackBar = useSnackBarSetContext();

  const handelChangePassword = async (data: TData) => {
    if (auth) {
      dispatchAppData?.setIsLoading(true);
      const res = await changePassword({...data, driver_id: auth._id});
      if (res.code === 200) {
        dispatchAppData?.setIsLoading(false);
        showSnackBar?.showSnackBar(
          language.CHANGE_PASSWORD_SCREEN.SUCCESS,
          'success'
        );
        await logout();
      } else {
        showSnackBar?.showSnackBar(res.message, 'error');
        dispatchAppData?.setIsLoading(false);
      }
    } else {
      showSnackBar?.showSnackBar('Please login first', 'error');
    }
  };

  const formik = useFormik({
    initialValues: changePasswordInitialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: values => {
      handelChangePassword(values);
    },
  });
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: language.CHANGE_PASSWORD_SCREEN.TITLE,
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <Spacer height={30} />
      <PasswordInputField
        placeholder={language.CHANGE_PASSWORD_SCREEN.OLD_PASSWORD}
        value={formik.values.oldPassword}
        onChangeText={formik.handleChange('oldPassword')}
        onBlur={formik.handleBlur('oldPassword')}
        error={formik.touched.oldPassword ? formik.errors.oldPassword : null}
      />
      <PasswordInputField
        placeholder={language.CHANGE_PASSWORD_SCREEN.NEW_PASSWORD}
        value={formik.values.newPassword}
        onChangeText={formik.handleChange('newPassword')}
        onBlur={formik.handleBlur('newPassword')}
        error={formik.touched.newPassword ? formik.errors.newPassword : null}
      />
      <View style={styles.rulesContainer}>
        {passwordRules.map((item, index) => (
          <View key={index} style={styles.rulesItem}>
            <View style={styles.dot} />
            <Typography>{item}</Typography>
          </View>
        ))}
      </View>
      <Spacer height={30} />
      <Button
        variant="fillRounded"
        title="Save"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        disabled={!formik.isValid}
        onPress={formik.handleSubmit}
      />
      <Spacer height={20} />
    </CommonScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  rulesContainer: {
    paddingHorizontal: 10,
    opacity: 0.5,
  },
  rulesItem: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 7,
    alignItems: 'flex-start',
  },
  dot: {
    height: 5,
    width: 5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000000',
  },
});
