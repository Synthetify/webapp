import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, IconButton, Divider, Hidden, Button } from '@material-ui/core'
import useStyles from './style'
import { MoreHoriz, Menu } from '@material-ui/icons'
import PhantomIcon from '@static/svg/phantom.svg'
import SolletIcon from '@static/svg/sollet.svg'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { SolanaNetworks } from '@consts/static'
import useButtonStyles from '../HeaderButton/style'
import { Link } from 'react-router-dom'
import { WalletType } from '@web3/wallet'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (chosen: string) => void
  onWalletSelect: (chosen: WalletType) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: 'phantom' | 'sollet'
  onFaucet?: () => void
}
export const HeaderRedesign: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = 'phantom',
  onFaucet
}) => {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()

  const routes = ['staking', 'stats', 'exchange']
  const [activePath, setActive] = React.useState(landing)
  const [network, setNetwork] = React.useState('Devnet')

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  React.useEffect(() => { // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item container className={classes.left} wrap='nowrap' alignItems='center'>
          <Grid item>
            <CardMedia className={classes.snyLogo} image={snyIcon} />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.verticalDivider} />
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item container wrap='nowrap' alignItems='center' justify='flex-start'>
            {routes.map(path => (
              <Grid item key={`path-${path}`}>
                <Link to={`/${path}`} style={{ textDecoration: 'none' }}>
                  <NavbarButton
                    name={path}
                    onClick={() => {
                      setActive(path)
                    }}
                    active={path === activePath}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Hidden>

        <Grid container item justify='flex-end' wrap='nowrap' alignItems='center'>
          {(network === 'Devnet') && (
            <Grid item>
              <Button
                className={buttonClasses.headerButton}
                variant='contained'
                classes={{ disabled: buttonClasses.disabled }}
                onClick={onFaucet}
              >
                Faucet
              </Button>
            </Grid>
          )}
          <Grid item>
            <SelectNetworkButton
              name={network}
              networks={[
                { name: 'Devnet', network: SolanaNetworks.DEV }
              ]}
              onSelect={(chosen: string) => {
                onNetworkSelect(chosen)
                setNetwork(chosen)
              }}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item>
              {!walletConnected ? (
                <ChangeWalletButton
                  name='Connect a wallet'
                  options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.SOLLET_EXTENSION]}
                  onSelect={onWalletSelect}
                  connected={walletConnected}
                />
              ) : (
                <ChangeWalletButton
                  name={address.toString()}
                  options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.SOLLET_EXTENSION]}
                  onSelect={onWalletSelect}
                  connected={walletConnected}
                  startIcon={
                    typeOfWallet === 'phantom' ? (
                      <CardMedia className={classes.connectedWalletIcon} image={PhantomIcon} />
                    ) : (
                      <CardMedia className={classes.connectedWalletIcon} image={SolletIcon} />
                    )
                  }
                />
              )}
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <ChangeWalletButton
              name='My&nbsp;wallet'
              options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.SOLLET_EXTENSION]}
              onSelect={onWalletSelect}
              connected={walletConnected}
              hideArrow={true}
            />
          </Hidden>
        </Grid>
        <Hidden mdDown>
          <IconButton className={classes.dotsButton} onClick={() => {}}>
            <MoreHoriz fontSize='large' className={classes.dehazeIcon} />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <Grid item container className={classes.mobileRight} wrap='nowrap' alignItems='center'>
            <Grid item>
              <Divider orientation='vertical' className={classes.verticalDivider} />
            </Grid>
            <Grid item>
              <IconButton
                className={classes.dehazeButton}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setRoutesModalAnchor(event.currentTarget)
                  setRoutesModalOpen(true)
                  blurContent()
                }}>
                <Menu className={classes.dehazeIcon} />
              </IconButton>
              <RoutesModal
                routes={routes}
                anchorEl={routesModalAnchor}
                open={routesModalOpen}
                current={activePath}
                onSelect={(selected: string) => {
                  setActive(selected)
                  setRoutesModalOpen(false)
                  unblurContent()
                }}
                handleClose={() => {
                  setRoutesModalOpen(false)
                  unblurContent()
                }}
              />
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}
export default HeaderRedesign
