export type TMenuItem = {
  id?: number;
  icon?: ReactNode;
  item: string;
  link?: string;
  pressExtra?: () => void;
};
