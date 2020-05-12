import { makeStyles } from '@material-ui/core/styles';
import { LogoProps } from 'components/Label';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  logo: {
    fontFamily: (props: LogoProps): string => (props.name === undefined ? 'Rajdhani' : 'Noto Sans KR'),
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: (props: LogoProps): number => props.fontSize ?? 25,
    color: (props: LogoProps): string => props.color ?? AppColor.WHITE,
  },
});

export default useStyles;
