import classes from './Loading.module.scss'
import classNames from 'classnames'
import { ReactComponent as LoadingIcon } from '../../assets/icons/loading.svg'

const Loading = ({ active }) => {
  return (
    <div
      className={classNames(classes.loading, {
        [classes['loading--active']]: active,
      })}
    >
      <LoadingIcon className={classes['loading-icon']} />{' '}
      <span className={classes['loading-text']}>Loading, please wait...</span>
    </div>
  )
}

export default Loading
