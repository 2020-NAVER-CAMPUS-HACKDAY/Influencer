import { makeStyles } from '@material-ui/core/styles';
import { LogoProps } from 'components/Logo';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  logo: {
    fontFamily: (props: LogoProps): string => (props.pageName ? 'Noto Sans KR' : 'Rajdhani'),
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '25px',
    color: AppColor.WHITE,
  },
});

export default useStyles;
