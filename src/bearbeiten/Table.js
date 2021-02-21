import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import './table.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

async function pushDataToDb(pushData, table) {

    const url = 'https://tbf-db-backend.ep-projekte.de/updateTable.php';

    const formData = new FormData();  
    formData.append('table', table); 
    formData.append('data', JSON.stringify(pushData));  

    const config = { 
        method: 'POST',
        body: formData
    };
    try {
        const result = await fetch(url, config)
        if (!result.ok) {
            throw Error(result.statusText);
        } else {
            return result
        }
    } catch (error) {
        console.log(error)
    }

}

function temps(params) {
    if (params.value) {
        return params.value + ' °C';
    } else {
        return 'in °C';
    }
}

function pressure(params) {
    if (params.value) {
        return params.value + ' mbar';
    } else {
        return 'in mbar';
    }
}

function overpressure(params) {
    if (params.value) {
        return params.value + ' barü';
    } else {
        return 'in barü';
    }
}

function density(params) {
    if (params.value) {
        return params.value + ' kg/Nm³/h';
    } else {
        return 'in kg/Nm³/h';
    }
    
}

function millimeters(params) {
    if (params.value) {
        return params.value + ' mm';
    } else {
        return  'in mm';
    }
}

function meters(params) {
    if (params.value) {
        return params.value + ' m';
    } else {
        return  'in m';
    }
    
}

function volumeFlow(params) {
    if (params.value) {
        return params.value + ' Nm³/h';
    } else {
        return 'in Nm³/h';
    }
    
}

function weight(params) {
    if (params.value) {
        return params.value + ' kg';
    } else {
        return 'in kg';
    }
    
}

function massFlow(params) {
    if (params.value) {
        return params.value + ' kg/h';
    } else {
        return 'in kg/h';
    }
    
}

function rpm(params) {
    if (params.value) {
        return params.value + ' U/min';
    } else {
        return 'in U/min';
    }
}

function space(params) {
    if (params.value) {
        return params.value + ' m²';
    } else {
        return 'in m²';
    }
    
}

function solidsContent(params) {
    if (params.value) {
        return params.value + ' g/kg';
    } else {
        return 'in g/kg';
    }
}

function conveyingVolume(params) {
    if (params.value) {
        return params.value + ' m³/h';
    } else {
        return 'in m³/h';
    }
}

function protectionClass(params) {
    if (params.value) {
        return 'IP' + params.value;
    } else {
        return 'als Schutzartnummer';
    }
}

function power(params) {
    if (params.value) {
        return params.value + ' kW';
    } else {
        return 'in kW';
    }
}

function voltage(params) {
    if (params.value) {
        return params.value + ' V';
    } else {
        return 'in V';
    }
}

function current(params) {
    if (params.value) {
        return params.value + ' A';
    } else {
        return 'in A';
    }
}

function volume(params) {
    if (params.value) {
        return params.value + ' m³';
    } else {
        return 'in m³';
    } 
}


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editType: 'fullRow',
            defaultColDef: {
                sortable: true,
                editable: true,
                filter: true,
                resizable: true,
            },
            table: this.props.table
        }
        this.onGridReady = this.onGridReady.bind(this);
        this.dataChanged = this.dataChanged.bind(this);
        this.getMaxTBFID = this.getMaxTBFID.bind(this);
        this.onAddRow = this.onAddRow.bind(this);
    }

    async getMaxTBFID() {
        return fetch('https://tbf-db-backend.ep-projekte.de/getMaxTBFID.php')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    maxTBFID: parseInt(result),
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }   
        )
    }

    async onAddRow() {
        if (!this.state.maxTBFID) {
            await this.getMaxTBFID()
        } 
        
        this.setState({ maxTBFID: this.state.maxTBFID + 1}, () => {
            console.log(this.state.maxTBFID)
            this.gridApi.applyTransaction({
                add: [{TBF_ID: this.state.maxTBFID}],
            })
        })
        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        var allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function(column) {
            allColumnIds.push(column.colId);
        });
        //params.columnApi.autoSizeColumns(allColumnIds, true)
        params.columnApi.autoSizeColumns(allColumnIds)
        //params.api.sizeColumnsToFit();
        //params.gridApi.autoSizeColumns(true)
    };

    dataChanged(data) {
        if (this.state.table === "RI-TBF_SEF_Elektroangaben") {

            console.log(data.data);

            async function fetchMskValues() {
                const response = await fetch('https://tbf-db-backend.ep-projekte.de/getTypicalMskValues.php')
                const result = await response.json()
                return result
            }

            fetchMskValues().then(result => {
                    var match = result.find(msk => msk[0] === data.data["Typical Nr. MSK"])
                    if (match) {
                        if (!data.data["Anzahl AI"]) {
                            data.data["Anzahl AI"] = parseInt(match[4])
                        }
                        if (!data.data["Anzahl AO"]) {
                            data.data["Anzahl AO"] = parseInt(match[5])
                        }
                        if (!data.data["Anzahl DI"]) {
                            data.data["Anzahl DI"] = parseInt(match[2])
                        }
                        if (!data.data["Anzahl DO"]) {
                            data.data["Anzahl DO"] = parseInt(match[3])
                        }
                    } else {
                        if (data.data["Anzahl AI"] || data.data["Anzahl AO"] || data.data["Anzahl DI"] || data.data["Anzahl DO"]) {
                            ; // Dont do anything
                        } else {
                            data.data["Anzahl AI"] = null
                            data.data["Anzahl AO"] = null
                            data.data["Anzahl DI"] = null
                            data.data["Anzahl DO"] = null
                        }
                    }
                    pushDataToDb(data.data, this.state.table)
                }
            )
        } else {
            pushDataToDb(data.data, this.state.table)
        }
    }

    render() {
        const { tableData } = this.props
        const { table } = this.state
        let button;

        const columns = tableData.slice(0,1).map(( header ) => {
            return(
                header.map(( column ) => {
                    if (column.cellEditor && column.cellEditorParams) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            cellEditor: column.cellEditor,
                            cellEditorParams: column.cellEditorParams,
                            refData: column.refData,
                        })
                    } else if (
                        column.headerName === 'Berechnungstemperatur' || 
                        column.headerName === 'Betriebstemperatur' || 
                        column.headerName === 'max. zul. Temperatur' || 
                        column.headerName === 'Temperatur max' || 
                        column.headerName === 'Temperatur min' || 
                        column.headerName === 'Temperatur nom' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: temps,
                        })
                    } else if (
                        column.headerName === 'Druck max hPa_a' || 
                        column.headerName === 'Druck max Mpa_a' || 
                        column.headerName === 'Druck min hPa_a' || 
                        column.headerName === 'Druck min Mpa_a' || 
                        column.headerName === 'Druck nom hPa_a' || 
                        column.headerName === 'Druck nom Mpa_a' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: pressure,
                        })
                    } else if (
                        column.headerName === 'Berechnungsüberdruck' || 
                        column.headerName === 'Betriebsüberdruck' || 
                        column.headerName === 'max. zul. Druck'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: overpressure,
                        })
                    } else if (
                        column.headerName === 'Dichte max' || 
                        column.headerName === 'Dichte min' || 
                        column.headerName === 'Dichte nom'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: density,
                        })
                    } else if (
                        column.headerName === 'Durchmesser' || 
                        column.headerName === 'Höhe' || 
                        column.headerName === 'Länge [mm]' || 
                        column.headerName === 'Radius' || 
                        column.headerName === 'Wanddicke' || 
                        column.headerName === 'Breite' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: millimeters,
                        })
                    } else if (
                        column.headerName === 'Kabel 1 Länge' || 
                        column.headerName === 'Kabel 2 Länge' || 
                        column.headerName === 'Kabel 3 Länge' || 
                        column.headerName === 'Kabel 4 Länge' || 
                        column.headerName === 'Kabel 5 Länge' || 
                        column.headerName === 'Länge [m]' ||
                        column.headerName === 'Raumlänge' || 
                        column.headerName === 'Raumbreite' || 
                        column.headerName === 'Raumhöhe' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: meters,
                        })
                    } else if (
                        column.headerName === 'Volumenstrom max' || 
                        column.headerName === 'Volumenstrom min' || 
                        column.headerName === 'Volumenstrom nom' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: volumeFlow,
                        })
                    } else if (
                        column.headerName === 'Massenstrom max' || 
                        column.headerName === 'Massenstrom min' || 
                        column.headerName === 'Massenstrom nom' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: massFlow,
                        })
                    } else if (
                        column.headerName === 'Drehzahl'  
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: rpm,
                        })
                    } else if (
                        column.headerName === 'Raumfläche' ||
                        column.headerName === 'Fläche'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: space,
                        })
                    } else if (
                        column.headerName === 'Feststoffgehalt max' || 
                        column.headerName === 'Feststoffgehalt min' || 
                        column.headerName === 'Feststoffgehalt nom' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: solidsContent,
                        })
                    } else if (
                        column.headerName === 'Fördervolumen' 
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: conveyingVolume,
                        })
                    } else if (
                        column.headerName === 'Gewicht'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: weight,
                        })
                    } else if (
                        column.headerName === 'IP-Schutzart'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: protectionClass,
                        })
                    } else if (
                        column.headerName === 'Nennleistung'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: power,
                        })
                    } else if (
                        column.headerName === 'Nennspannung'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: voltage,
                        })
                    } else if (
                        column.headerName === 'Nennstrom'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: current,
                        })
                    } else if (
                        column.headerName === 'Raumvolumen' ||
                        column.headerName === 'Volumen'
                    ) {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                            valueFormatter: volume,
                        })
                    } else {
                        return({
                            headerName: column.headerName,
                            field: column.field,
                            editable: column.editable,
                        })
                    }
                })
            )
        })  
        
        const data = tableData.slice(1)

        if (table === 'RI-TBF_SEF_Elektrokomponentenliste') {
            button = <button className="btn btn-outline-success mb-2" onClick={this.onAddRow}>Zeile hinzufügen</button>
        } else {
            button = null
        }
        
        return (
            <div id="grid" className="p-0 overflow-hidden w-100 h-100">
                <nav className="navbar navbar-light bg-light">
                    <h2 className="navbar-brand">{table}</h2>
                    {button}
                </nav>
                <div className="ag-theme-alpine" style={ { height: 'calc(100% - 60px)', width: '100%'} }>
                    <AgGridReact
                        columnDefs={columns[0]}
                        
                        defaultColDef={this.state.defaultColDef}
                        rowData={data}

                        editType={this.state.editType}
                        pagination={true}
                        //stopEditingWhenGridLosesFocus={true}
                        suppressFieldDotNotation={true}
                        
                        onRowValueChanged={this.dataChanged}
                        onGridReady={this.onGridReady}
                        />
                </div>
            </div>
        );
    }
  }