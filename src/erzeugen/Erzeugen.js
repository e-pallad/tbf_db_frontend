import React, { Component } from 'react';

export default class Eingabe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.table,
            alias: this.props.alias,
        };
    }

    exportTable = () => {
        let $url = ""
        if (this.state.table === 'SEF_E-Verbraucherliste') {
            $url = "https://tbf-db-backend.ep-projekte.de/renderEVerbraucherliste.php"
        } 
        if (this.state.table === 'SEF_Messstellenliste') {
            $url = "https://tbf-db-backend.ep-projekte.de/renderMessstellenliste.php"
        }
        if (this.state.table === 'SEF_Armaturenliste') {
            $url = "https://tbf-db-backend.ep-projekte.de/renderArmaturenliste.php"
        }
        if (this.state.table === 'SEF_Ausrüstungsliste') {
            $url = "https://tbf-db-backend.ep-projekte.de/renderAusruestungsliste.php"
        }

		fetch($url)
		.then(response => {
			response.blob().then(blob => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				a.download = this.state.table + '_' + Date.now() + '.pdf';
				a.click();
			});
        });
	}

    render() {
        const { alias } = this.state
        return (
            <button onClick={this.exportTable} className="btn btn-secondary btn-block my-2">
                {alias}
            </button> 
        )
    }
}