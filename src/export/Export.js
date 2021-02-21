import React, { Component } from 'react';

export default class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.table,
            alias: this.props.alias,
        };
    }

    exportTable = () => {
		fetch("https://tbf-db-backend.ep-projekte.de/exportTables.php?table=" + this.state.table)
		.then(response => {
			response.blob().then(blob => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				a.download = '_Neubau_' + this.state.table + '_Datenbank.xlsx';
				a.click();
			});
        });
	}

    render() {
        const { alias } = this.state
        return (
            <button onClick={this.exportTable} className="btn btn-danger btn-block my-2">
                {alias}
            </button>
        )
    }
}