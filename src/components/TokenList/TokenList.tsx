import React from 'react'
import classNames from 'classnames'
import { IToken, TokenItem } from '@components/TokenItem/TokenItem'
import { Grid, Typography, Card, CardContent, Divider } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import useStyles from './style'

export interface IProps {
  tokens: IToken[]
  addAccount: () => void
}

export const TokenList: React.FC<IProps> = ({ tokens, addAccount }) => {
  const classes = useStyles()
  const items = tokens.map((token, index) => (
    <Grid item key={index}>
      <Divider className={classNames(classes.tokensDivider, classes.tokensDividerMargin)} />
      <TokenItem token={token} />
    </Grid>
  ))

  return (
    <Card className={classes.card}>
      <CardContent style={{ margin: 0, padding: 0 }}>
        <Grid item xs={12} className={classes.root} style={{ overflowX: 'hidden' }}>
          <Grid container justify='space-between' className={classes.header}>
            <Grid item xs={12} sm={8}>
              <Typography className={classes.ownedTokens}>Owned tokens</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.addAccountWrapper}>
              <OutlinedButton name='Add account' fontWeight='normal' onClick={addAccount} />
            </Grid>
          </Grid>
          <Grid>
            <Divider className={classes.headerDivider} />
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.headerFont}>
              <Grid container style={{ flexWrap: 'nowrap' }}>
                <Grid item xs={3}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    Token
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    Balance
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    USD value
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {items.length > 0 ? (
            <Grid>{items}</Grid>
          ) : (
            <Grid>
              <Divider className={classNames(classes.tokensDivider, classes.tokensDividerMargin)} />
              <Grid className={classes.emptyTokens}>
                <Typography>No tokens to show.</Typography>
                <Typography>Please connect an account.</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}
