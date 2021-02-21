import React, { Component } from 'react';
import ImportForm from '../import/ImportForm'

export default class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.location.state.table
        }
    }
     
    render() { 
        const { table } = this.state;
        return (
            <section>
                <div className="container">
                    <h5 className="card-title text-center text-dark">
                        Import für <u>{table.replace('RI-TBF_SEF_', '').replace('_Liste', ' Liste')}</u>
                    </h5>
                    <ImportForm table={table} />
                </div>
            </section> 
        ); 
    } 
} 
   