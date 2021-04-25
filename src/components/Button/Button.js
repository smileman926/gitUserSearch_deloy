import classes from './Button.module.scss'
import classNames from 'classnames'

import { ReactComponent as LoadingIcon } from '../../assets/icons/loading.svg'

const Button = ({ children, onClick = () => {}, loading, className, small }) => {
  return (
    <button
      className={classNames(classes.btn, className, {
        [classes['btn--loading']]: loading,
        [classes['btn--small']]: small,
      })}
      onClick={() => onClick()}
    >
      {loading ? <LoadingIcon className={classes.loading} /> : children}
    </button>
  )
}

export default Button
