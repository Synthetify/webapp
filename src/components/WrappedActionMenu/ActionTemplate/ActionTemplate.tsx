import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/CommonButton/MaxButton'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import BN from 'bn.js'
import useStyles from './style'

export interface IProps {
  action: string
  onClick: () => void
}

export const ActionTemplate: React.FC<IProps> = ({ action, onClick }) => {
  const classes = useStyles()

  const capitalize = (str: string) => {
    if (!str) {
      return str
    }
    return str[0].toUpperCase() + str.substr(1).toLowerCase()
  }

  return (
    <Grid
      container
      justify='space-around'
      alignItems='flex-start'
      direction='column'
      className={classes.root}>
      <Grid container item className={classes.wrap}>
        <Grid item>
          <AmountInputWithLabel
            className={classes.amountInput}
            setValue={(value: string) => value}
            currency={'xUSD'}
          />
        </Grid>
        <Grid
          item
          container
          direction='row'
          justify='space-around'
          wrap='nowrap'
          className={classes.secondHalf}>
          <Grid item>
            <MaxButton />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.divider} />
          </Grid>
          <Grid item className={classes.available}>
            <KeyValue
              keyName={`Available to ${action}`}
              value={new BN(51640189)}
              decimal={4}
              unit='xUSD'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.bottom}>
        <Grid item style={{ marginRight: 18 }}>
          <OutlinedButton
            name={capitalize(action)}
            color='secondary'
            padding='11px 40px'
            style={{ width: 160 }}
            onClick={onClick}
          />
        </Grid>
        <Grid item>
          <Progress state='progress' message={`${capitalize(action)} is progress...`} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ActionTemplate
