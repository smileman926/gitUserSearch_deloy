import classes from './Alert.module.scss'
import classNames from 'classnames'

const Alert = ({ children, className, status }) => {
  return <div className={classNames(classes.alert, className, {
    [classes['alert--success']]: status === 'success',
    [classes['alert--error']]: status === 'error',
  })}>{children}</div>
}

export default Alert
