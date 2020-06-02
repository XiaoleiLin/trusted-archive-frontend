import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import CssBaseline from '@material-ui/core/CssBaseline';

import TableSearch from './ArchiveContent/TableSearch';
import MenuMultiLevel from './ArchiveContent/MenuTree';
import MoreInfo from './ArchiveContent/MoreInfo';
import { toDateMenu } from "./ArchiveContent/Utils"
import { ServiceArchive } from "../Services/ServiceArchive";
import Upload from './ArchiveContent/Upload';

const drawerWidth = 230;
const useStyles = theme => ({
  root: {
      display: 'flex',
  },
  drawer: {
      width: drawerWidth,
      flexShrink: 0,
  },
  drawerPaper: {
      width: drawerWidth,
  },
  drawerContainer: {
      overflow: 'auto',
  },
  content: {
      flexGrow: 1,
      padding: theme.spacing(0.5),
  },
  contentInfo: {
    flexGrow: 1,
    padding: theme.spacing(2),
},
  contentMenu: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  menuFlex: {
    flexDirection: 'col',
    component: "nav",
  }
});


class Archive extends Component {
  
  constructor( props ) {
		super( props )
		this.state = {
      keyObjectSelected: null,
      dateSelected: null,
      archive: false,
      dataMenu: null,
		}
  }

  componentDidMount(){
    this.getData()
    let date = new Date(Date.now())
    let start = date.toLocaleString('en', {year:'numeric'}) +
     "/" + date.toLocaleString ('en', {month: 'short'})
    this.setState({dateSelected: start})
  }

  async getData () {
    let body = {
        // "dataStart":"",
        // "dataEnd": "",
        // "value": "dates"
    }
    let response = await ServiceArchive.search(body)
    let data = toDateMenu(response.list)
    this.setState({ dataMenu: data})
  }

  handleClick = () => {
    this.setState({archive: !this.state.archive})
    this.getData ()
  };

  callbackMenuMultiLevel = (childSelected) => {
    this.setState({keyObjectSelected: null})
    this.setState({dateSelected: childSelected})
  }

  callbackTableSearch = (childSelected) => {
    this.setState({
      keyObjectSelected: childSelected, 
      dateSelected: null,
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      
      <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
        paper: classes.drawerPaper,
      }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List dense={true}>
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                {this.state.archive ? <UnarchiveIcon /> : < ArchiveIcon/>}
              </ListItemIcon>
              <ListItemText primary="My Archives"/>
            </ListItem>
            <Collapse in={this.state.archive} timeout="auto" unmountOnExit>
              <MenuMultiLevel dataMenu={this.state.dataMenu} parentCallback = {this.callbackMenuMultiLevel}/>
            </Collapse>
          </List>
          <ListItem>
            <Upload/>
          </ListItem>
        </div>
      </Drawer>
  
      <main className={classes.content}>
        {!this.state.keyObjectSelected ? 
        <TableSearch 
        dateStart = {this.state.dateSelected}
        dateEnd = {this.state.dateSelected}
        parentCallback = {this.callbackTableSearch}
        />
        : <MoreInfo keyObject = {this.state.keyObjectSelected}/>
        }
      </main>
  
      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true}) (withRouter(Archive));