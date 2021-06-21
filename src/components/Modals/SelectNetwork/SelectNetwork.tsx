import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'

interface IConnectWalletModalWallet {
  name: string
  network: string
}

export interface IConnectWalletModal {
  networks: IConnectWalletModalWallet[]
  open: boolean
  handleClose: () => void
  onSelect: (wallet: string) => void
}
export const SelectNetwork: React.FC<IConnectWalletModal> = ({
  networks,
  open,
  handleClose,
  onSelect
}) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {networks.map(({ name, network }) => (
          <Grid
            item
            className={classes.listItem}
            alignItems='center'
            onClick={() => onSelect(network)}>
            <Typography className={classes.name}>{name}</Typography>
            <Typography className={classes.network}>{network}</Typography>
          </Grid>
        ))}
      </Grid>
    </Modal>
  )
}
export default SelectNetwork
