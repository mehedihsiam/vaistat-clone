export type TSignUpFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
};

export type TSignupDataWithPhone = TSignUpFormData & {
  country_code: string;
  phoneNumber: string;
};
