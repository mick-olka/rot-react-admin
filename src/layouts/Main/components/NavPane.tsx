import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import { ROUTES } from 'src/routing/routes'

export const NavPane = () => {
  return (
    <Box>
      <p>
        <Link to={ROUTES.home}>Products</Link>
      </p>
      <p>
        <Link to={ROUTES.collectionsPage}>Collections</Link>
      </p>
      <p>
        <Link to={ROUTES.ordersPage}>Orders</Link>
      </p>
    </Box>
  )
}
