import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import NotAppBar from '../utils/appBar';
import Brand from '../utils/brand';

const drawerWidth = 240;

const styles = theme => ({
  home: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.main,
    color: 'white',
    border: 'none'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing.unit * 3
  },
  logo: {
    textAlign: 'center'
  }
});

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.home}>
      <NotAppBar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className={classes.logo}>
          <Brand />
          <Typography variant="h5" component="h2" color="inherit">
            DEUX
          </Typography>
        </div>
        <List>
          {['123', '13123'].map(e => (
            <ListItem button key={e}>
              <ListItemIcon>U</ListItemIcon>
              <ListItemText>
                <Typography color="inherit">LOL</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem button key="cvx">
            <ListItemIcon>AVATAR</ListItemIcon>
            <ListItemText>
              <Typography variant="h6" color="inherit" component="li">
                My Account
              </Typography>
            </ListItemText>
          </ListItem>
          {/* )) */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph color="inherit" variant="body1" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph color="inherit" variant="body1" component="p">
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
};

export default withStyles(styles)(Home);
