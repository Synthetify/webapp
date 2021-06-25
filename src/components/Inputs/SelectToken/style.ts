import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: '30px',
    margin: 10
  }
}))

export default useStyles
