import { ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from 'src/routing/routes'

const items = [
  { route: ROUTES.home, title: 'Products' },
  { route: ROUTES.collectionsPage, title: 'Collections' },
  { route: ROUTES.ordersPage, title: 'Orders' },
  { route: ROUTES.textBlocksPage, title: 'Text on Site' },
]

export const NavPane = () => {
  const location = useLocation()
  return (
    <Paper sx={{ height: '100%' }}>
      <MenuList>
        {items.map((i) => (
          <Link to={i.route} key={i.route}>
            <MenuItem
              sx={{ height: '3rem', bgcolor: location.pathname === i.route ? '#ddd' : null }}
            >
              <ListItemText sx={{ textAlign: 'left', textTransform: 'uppercase' }}>
                {i.title}
              </ListItemText>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Paper>
  )
}
