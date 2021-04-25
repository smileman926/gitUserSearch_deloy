import { useState } from 'react'
import classes from './TextInput.module.scss'
import classNames from 'classnames'

const TextInput = ({
  value,
  onChange = () => {},
  onKeyDown = () => {},
  className,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={classNames(classes.container, className, {
        [classes['container--focused']]: isFocused,
      })}
    >
      <input
        type="text"
        autoComplete="off"
        className={classes.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  )
}

export default TextInput
