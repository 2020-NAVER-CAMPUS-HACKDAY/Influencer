import { makeStyles } from '@material-ui/core/styles';
import { LogoProps } from 'components/Logo';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  logo: {
    fontFamily: (props: LogoProps): string => (props.pageName === undefined ? 'Rajdhani' : 'Noto Sans KR'),
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '25px',
    color: (props: LogoProps): string => props.color ?? AppColor.WHITE,
  },
});

export default useStyles;
