import { List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

import { ROUTES } from 'src/routing/routes'

const items = [
  { route: ROUTES.home, title: 'Products' },
  { route: ROUTES.collectionsPage, title: 'Collections' },
  { route: ROUTES.ordersPage, title: 'Orders' },
  { route: ROUTES.textBlocksPage, title: 'Text on Site' },
]

export const NavPane = () => {
  return (
    <List>
      {items.map((i) => (
        <ListItem key={i.route}>
          <ListItemText>
            <Link to={i.route}>{i.title}</Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
