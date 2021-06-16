import React from 'react'
import { Button, PropTypes } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: PropTypes.Color
  className?: string
  disabled?: boolean
  startIcon?: JSX.Element
}

export const OutlinedButton: React.FC<IProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
  disabled = false,
  startIcon
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(classes.general, className)}
      variant='contained'
      color={color}
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}