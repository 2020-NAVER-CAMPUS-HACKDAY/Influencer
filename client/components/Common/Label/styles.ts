import { makeStyles } from '@material-ui/core/styles';
import { LogoProps } from 'components/Common/Label/index';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  logo: {
    fontFamily: (props: LogoProps): string => (props.name ? 'Noto Sans KR' : 'Rajdhani'),
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: (props: LogoProps): number => props.fontSize ?? 25,
    color: (props: LogoProps): string => props.color ?? AppColor.WHITE,
  },
});

export default useStyles;
