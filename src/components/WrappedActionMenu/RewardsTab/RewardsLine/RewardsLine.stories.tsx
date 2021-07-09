import React from 'react'
import { storiesOf } from '@storybook/react'
import { colors } from '@static/theme'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards line', () => (
  <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
    <RewardsLine
      message='Amount per round: 9999 points (999 SNY)'
      hint='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet varius orci.'
      bottomHint='Time remaining: 10:10:10'
    />
  </div>
))