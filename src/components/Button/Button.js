import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = (props) => {
  return <button className={clsx(styles.button, props.className)}>{props.children}</button>;
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Button;
