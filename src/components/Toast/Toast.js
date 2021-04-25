import classes from './Toast.module.scss'
import classNames from 'classnames'

const Toast = ({ active, status, message }) => {
  return (
    <div
      className={classNames(classes.toast, {
        [classes['toast--active']]: active,
        [classes['toast--success']]: status === 'success',
        [classes['toast--error']]: status === 'error',
      })}
    >
      <p className={classes.text}>{message}</p>
    </div>
  )
}

export default Toast
