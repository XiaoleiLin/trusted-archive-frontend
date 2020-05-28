import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Skeleton from '@material-ui/lab/Skeleton';

import { ServiceArchive } from "../../Services/ServiceArchive";
import { toDateMenu } from "./Utils"

const styles = {
  list: {
    width: 200,
  },
  links: {
    textDecoration:'none',
  },
  menuHeader: {
    paddingLeft: '30px'
  },
};


class MenuBar extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      selected: null,
    }
  }

  componentDidMount(){
  }
  
  componentDidUpdate (prevProps, prevState, snapshot){
    // if (prevState.selected !== this.state.selected) this.props.parentCallback (this.state.selected)
  }

	updateSelected = (value, selectedIndex) => {
    this.setState({date: value})
    this.setState({ selected: selectedIndex})
    this.props.parentCallback (selectedIndex)
  }

  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick( item ) {
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) )
  }

  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler( children ) {
    const { classes } = this.props
    const { state } = this
    return children.map( ( subOption ) => {
      if ( !subOption.children ) {
        return (
          <div key={ subOption.name }>
            <ListItem 
              button
              selected= {this.state.selected === subOption.id}
              onClick= { () => this.updateSelected( subOption.id, subOption.id ) }
              key={ subOption.id }>
              
                {/* <ArrowRightIcon /> */}
                <ListItemIcon></ListItemIcon>
                <ListItemIcon>
                  <FolderOpenIcon/>
                </ListItemIcon>
                <ListItemText 
                    primary={ subOption.name } 
                />
            </ListItem>
          </div>
        )
      }
      return (
        <div key={ subOption.id } >
          <ListItem 
            button 
            onClick={ () => this.handleClick( subOption.id ) }>

            { state[ subOption.id ] ? <ExpandLess /> :<ExpandMore />}

            <ListItemIcon>
              <FolderIcon/>
            </ListItemIcon>
            
            <ListItemText  primary={ subOption.name } />
          </ListItem>
          <Collapse 
            in={ state[ subOption.name ] } 
            timeout="auto" 
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse>
          
        </div>
      )
    } )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.list, {overflow: 'auto'} }>
        {this.props.dataMenu? 
        this.handler( this.props.dataMenu )
        :
        <div>
          <Skeleton animation="wave" variant="rect" height={50} />
        </div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(MenuBar)