import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';

export type TSnackBarVariant = 'success' | 'error' | 'warning' | 'info';

const useSnackBarColorAndIcon = (variant: TSnackBarVariant) => {
  const theme = useCustomTheme();

  const color = () => {
    switch (variant) {
      case 'success':
        return theme.SUCCESS;
      case 'error':
        return theme.DANGER;
      case 'warning':
        return theme.WARNING;
      case 'info':
        return theme.INFO;

      default:
        return theme.INFO;
    }
  };
  const icon = () => {
    switch (variant) {
      case 'success':
        return SVGs.Success(24, 24, theme.OPPOSITE_OF_ACCENT);
      case 'error':
        return SVGs.Error(24, 24, theme.OPPOSITE_OF_ACCENT);
      case 'warning':
        return SVGs.Warning(24, 24, theme.OPPOSITE_OF_ACCENT);
      case 'info':
        return SVGs.Info(24, 24, theme.OPPOSITE_OF_ACCENT);

      default:
        return SVGs.Info(24, 24, theme.OPPOSITE_OF_ACCENT);
    }
  };

  return {color: color(), icon: icon()};
};

export default useSnackBarColorAndIcon;
