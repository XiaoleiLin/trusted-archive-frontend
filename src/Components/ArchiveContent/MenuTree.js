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
  }

	updateSelected = (value, selectedIndex) => {
    this.setState({date: value})
    this.setState({ selected: selectedIndex})
    this.props.parentCallback (selectedIndex)
  }

  handleClick( item ) {
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) )
  }

  handler( children ) {
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
    return (
      <div>
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