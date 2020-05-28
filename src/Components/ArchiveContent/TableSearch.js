import React from "react";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";
import { CircularProgress, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { toDataTable } from './Utils';
import { ServiceArchive } from "../../Services/ServiceArchive";

import { RepeatOneSharp } from "@material-ui/icons";


class TableSearch extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            rowsSelected: [],
            data: [],
            isLoading: false,
            selected: null,
        }
    }
    componentDidMount() {
        if(this.props.dateStart !== null) this.getData()
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if(this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd)
            this.getData();

        // if(this.state.data !== [] && !this.state.isLoading){
        //     this.getData();
        // }
            
        // if (this.state.selected !== prevState.selected && this.state.selected !== null)
        //     this.props.parentCallback (this.state.selected)
    }

    async getData () {
        this.setState({ isLoading: true });
        let body = {
            "dataStart": this.props.dateStart,
            "dataEnd": this.props.dateEnd,
            "value": ""
        }
        let response = await ServiceArchive.search(body)
        let data = toDataTable(response.list);
        // let data = toDataTable(searchResultMockup.list)

        this.setState({ data: data, isLoading: false});
    }

    handleRowClick = (rowData, rowMeta) => {
        let index = rowMeta.dataIndex
        let keyObject = this.state.data[index][this.state.data[index].length-1]
        this.setState({selected: keyObject})
        this.props.parentCallback (keyObject)
    }

    toDate (){
        let months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        }
        let splits = this.props.dateStart.split('/')
        let month = new Date(splits[0],months[splits[1]]).toLocaleString ('en', {month: 'long'})
        return (
            <div>
                {month} / {splits[0]} 
            </div>
        )
    }
    
    render() {
        const columns = ["type","Name","Hash","Signature","Blockchain"];
        const { data, isLoading } = this.state;
        const options = {
            filter: true,
            filterType: 'dropdown',
            viewColumns: false,
            serverSide: false,
            download: false,
            print: false,
            pagination: false,
            selectableRows: false,
            searchPlaceholder: 'Search',
            expandableRowsOnClick: true,
            // responsive: 'scrollMaxHeight',
            responsive: 'scrollFullHeight',
            fixedHeaderOptions: {
                xAxis: false,
                yAxis: true
            },
            onRowClick: this.handleRowClick,
        };
        const theme = createMuiTheme({
            overrides: {
              MUIDataTable: {
                responsiveScroll: {
                  overflowX: 'none',
                  height: 'auto',
                  maxHeight: 'auto',
                },
              },
            },
          })
        return (
            
            <div>
                
                <MuiThemeProvider theme={theme}>
                    <MUIDataTable title={<Typography variant="title">
                        {!this.props.dateStart?
                        "No date selected"
                        :
                        this.toDate()
                        }
                        {isLoading && 
                        <CircularProgress 
                        size={24} 
                        style={{marginLeft: 15, position: 'relative', top: 4}} 
                        />}
                    </Typography>
                    } data={data} columns={columns} options={options} />
                </MuiThemeProvider>
                
            </div>
        );

    }
}

export default withRouter(TableSearch);
