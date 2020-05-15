import { makeStyles } from '@material-ui/core';
import { BarProps } from 'components/Common/AppBar';

const useStyles = makeStyles({
  root: {
    backgroundImage: (props: BarProps): string => props.backgroundImage,
    position: (props: BarProps) => (props.isNotFixed ? 'relative' : 'fixed'),
    backgroundColor: (props: BarProps): string => props.backgroundColor,
    zIndex: 2,
    boxShadow: 'none',
  },
  container: {
    padding: '0 1.5rem',
    display: 'flex',
    height: (props: BarProps): string => props.height ?? '3.5rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default useStyles;
