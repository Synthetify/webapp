import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  Icon,
  ClickAwayListener,
  Hidden
} from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import useStyles from './style'
import { BN } from '@project-serum/anchor'

export interface IProps {
  name: string
  sign: string
  hint?: string
  onClick?: () => void
  max: BN
  maxDecimal: number
  current: BN
  currentDecimal: number
}
export const ProgressCard: React.FC<IProps> = ({ name, sign, hint, onClick, max, maxDecimal, current, currentDecimal }) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
        {hint ? (
          <>
            <Hidden mdDown>
              <Icon>
                <Tooltip
                  classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                  title={hint}
                  placement='top-end'
                  arrow>
                  <img src={HintIcon} alt='' className={classes.questionMark} />
                </Tooltip>
              </Icon>
            </Hidden>
            <Hidden lgUp>
              <ClickAwayListener
                onClickAway={() => {
                  setIsPopoverOpen(false)
                }}>
                <Icon
                  onClick={() => {
                    setIsPopoverOpen(true)
                  }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                    title={hint}
                    placement='top-end'
                    open={isPopoverOpen}
                    onClose={() => {
                      setIsPopoverOpen(false)
                    }}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    arrow>
                    <img src={HintIcon} alt='' className={classes.questionMark} />
                  </Tooltip>
                </Icon>
              </ClickAwayListener>
            </Hidden>
          </>
        ) : null}
        <Typography className={classes.valueCardTitle}>{name}</Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.valueCardAmount}>
        </Typography>
      </CardContent>
    </Card>
  )
}
export default ProgressCard
