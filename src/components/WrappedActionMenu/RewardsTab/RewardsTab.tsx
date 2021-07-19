import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { displayDate, divUpNumber } from '@consts/utils'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'
import useStyles from './style'

export type RoundType = 'next' | 'current' | 'finished'

export type RoundData = {
  [type in RoundType]: {
    roundPoints: BN
    roundAllPoints: BN
    roundStartSlot: BN
  }
}

export interface IRewardsProps {
  slot: number
  amountToClaim: BN
  amountPerRound: BN
  roundLength: number
  userDebtShares: BN
  rounds: RoundData
  onClaim: () => void
  onWithdraw: () => void
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin.'

export const RewardsTab: React.FC<IRewardsProps> = ({
  slot = 0,
  amountToClaim,
  amountPerRound,
  roundLength,
  userDebtShares,
  rounds,
  onClaim,
  onWithdraw
}) => {
  const classes = useStyles()

  const estimateRounds = (): RoundData => {
    const { current, next } = rounds

    if (next.roundStartSlot.toNumber() >= slot) {
      return rounds
    }
    const slotDiff = slot - next.roundStartSlot.toNumber()
    const roundDiff = divUpNumber(slotDiff, roundLength)

    switch (roundDiff) {
      case 1: {
        return {
          finished: current,
          current: next,
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
      case 2: {
        return {
          finished: next,
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).muln(2)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
      default: {
        return {
          finished: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).muln(roundDiff - 2)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).muln(roundDiff - 1)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).muln(roundDiff)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
    }
  }

  const { finished, current, next } = estimateRounds()
  const {
    roundAllPoints: currentRoundAllPoints,
    roundPoints: currentRoundPoints,
    roundStartSlot: currentRoundStartSlot
  } = current
  const {
    roundAllPoints: finishedRoundAllPoints,
    roundPoints: finishedRoundPoints,
    roundStartSlot: finishedRoundStartSlot
  } = finished
  const {
    roundAllPoints: nextRoundAllPoints,
    roundPoints: nextRoundPoints,
    roundStartSlot: nextRoundStartSlot
  } = next

  const isClaimDisabled = () => {
    const noPoints = finishedRoundPoints.eqn(0)
    const finishedRoundOver = currentRoundStartSlot.gtn(slot)

    return noPoints || !finishedRoundOver
  }

  const isWithdrawDisabled = () => {
    return amountToClaim.eqn(0)
  }

  const calculateTokensBasedOnPoints = (roundPoints?: BN, allPoints?: BN, amount?: BN) => {
    if (!roundPoints || !allPoints || allPoints.eqn(0) || !amount) {
      return new BN(0)
    }
    return roundPoints.mul(amount).div(allPoints)
  }

  const calculateTimeRemaining = (roundStart: BN) => {
    const slotTime = 0.4
    const roundFinishSlot = roundStart.addn(roundLength)
    const slotDiff = roundFinishSlot.sub(new BN(slot))
    if (slotDiff.lten(0)) {
      return new BN(0)
    }
    return slotDiff.muln(slotTime)
  }

  const displayTimeRemaining = (roundStart: BN, roundLength: number) => {
    const timeRemaining = calculateTimeRemaining(roundStart.addn(roundLength))
    return `Time remaining: ${displayDate(timeRemaining.toNumber())}`
  }

  const rewardsLines: {
    [index: number]: {
      name: string
      bracket?: string
      bracketValue?: BN
      nonBracket: string
      nonBracketValue: BN
      hint: string
      bottomHint?: string
    }
  } = [
    {
      name: 'Next round',
      nonBracket: 'points',
      nonBracketValue: nextRoundPoints,
      bracketValue: calculateTokensBasedOnPoints(
        nextRoundPoints,
        nextRoundAllPoints,
        amountPerRound
      ),
      bracket: nextRoundPoints.eqn(0) ? '' : 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(nextRoundStartSlot, roundLength)
    },
    {
      name: 'Current round',
      nonBracketValue: currentRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        currentRoundPoints,
        currentRoundAllPoints,
        amountPerRound
      ),
      bracket: currentRoundPoints.eqn(0) ? '' : 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(currentRoundStartSlot, roundLength)
    },
    {
      name: 'Finished round',
      nonBracketValue: finishedRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        finishedRoundPoints,
        finishedRoundAllPoints,
        amountPerRound
      ),
      bracket: finishedRoundPoints.eqn(0) ? '' : 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(finishedRoundStartSlot, roundLength)
    }
  ]

  const lines = Object.keys(rewardsLines).map((key, index) => {
    const props = rewardsLines[+key]
    return (
      <Grid item key={index}>
        <RewardsLine {...props} />
        <Divider className={classes.divider} />
      </Grid>
    )
  })

  return (
    <Grid container direction='column' justifyContent='space-around' className={classes.root}>
      <Grid item>
        <RewardsAmount amountToClaim={amountToClaim} />
      </Grid>
      <Grid item container justifyContent='space-between' direction='column'>
        {lines}
      </Grid>
      <Grid item container alignItems='center' justifyContent='flex-end' wrap='nowrap'>
        <Grid item>
          <OutlinedButton
            color='secondary'
            name='Claim'
            disabled={isClaimDisabled()}
            className={classes.button}
            onClick={onClaim}
          />
        </Grid>
        <Grid item style={{ marginLeft: 18 }}>
          <OutlinedButton
            color='primary'
            name='Withdraw'
            disabled={isWithdrawDisabled()}
            className={classes.button}
            onClick={onWithdraw}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RewardsTab
