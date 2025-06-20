import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project import
import { activeItem } from 'store/reducers/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  // active menu item on page load
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  // const iconSelectedColor = 'primary.main';
  const iconSelectedColor = 'text.primary';


  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            // bgcolor: 'primary.lighter',
            bgcolor: '#7E00D1',
          },

          '&.Mui-selected': {
            bgcolor: '#7E00D1 !important',
            color: '#fff !important',
            fontWeight: 'bold !important',
            '& .MuiListItemIcon-root': {
              color: '#fff !important',
            },
            '&:hover': {
              color: '#fff !important',
              bgcolor: '#7E00D1 !important',
            }
          }



        }),
        ...(!drawerOpen && {
          '&:hover': {
            // bgcolor: 'transparent',
            bgcolor: '#7E00D1'

          },
          '&.Mui-selected': {
            '&:hover': {
              // bgcolor: 'transparent',
              bgcolor: '#7E00D1'

            },
            // bgcolor: 'transparent',
            bgcolor: '#7E00D1'

          }
        })
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? '#fff' : textColor, // 👈 icon turns white when selected
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: '#7E00D1',
              '&:hover': {
                bgcolor: '#7E00D1'
              }
            })
          }}
        >
          {itemIcon}
        </ListItemIcon>

      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) &&

        (
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{
                  color: isSelected ? '#fff' : textColor,
                  fontWeight: isSelected ? 'bold' : 'normal' // 👈 makes selected text bold
                }}
              >
                {item.title}
              </Typography>
            }
          />


        )
      }
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
