import classes from './Pagination.module.scss'
import classNames from 'classnames'

const Pagination = ({ items, onChange = () => {}, active, totalPages }) => {
  return (
    <div className={classes.pagination}>
      <button className={classes['item-text']} onClick={() => onChange('prev')}>
        Previous
      </button>
      {items &&
        items.map((item) => (
          <button
            className={classNames(classes.item, {
              [classes['item--active']]: item === active,
            })}
            onClick={() => onChange(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      <button className={classes['item-text']} onClick={() => onChange('next')}>
        Next
      </button>
      <span className={classes.total}>(Total {totalPages} pages)</span>
    </div>
  )
}

export default Pagination
