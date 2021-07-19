import React from "react";
import { Component } from "react";

/*
import { useAuth } from "../context/auth";

const { setAuthTokens } = useAuth();

function logOut(e) {
    e.preventDefault();
    setAuthTokens();
}
*/

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backuplist: [],
        };
    }

    componentDidMount() {
        fetch("https://tbf-db-backend.ep-projekte.de/backup/listMysqlBackups.php")
		.then(res => res.json())
		.then(result => {
			this.setState({ backuplist: result })
		});
    }

    exportBackup(link) {
        console.log(link);

		fetch("https://tbf-db-backend.ep-projekte.de/backup/exportBackup.php?file=" + link)
		.then(response => {
			response.blob().then(blob => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				a.download = link;
				a.click();
			});
        });
	}

    render() {
        const filelist = Object.values(this.state.backuplist)
        const files = filelist.sort().reverse().map((link, i) =>
            <button key={i} className="dropdown-item" onClick={()=>this.exportBackup(link)}>{link}</button>
        )
        return(
            <div>
                <h1>Admin Page</h1>
                <a href="https://tbf-db.ep-projekte.de/" class="btn btn-primary" role="button" aria-pressed="true">Zurück zur Hauptseite</a>
                <div>
                    <h3>Restore DB entries</h3>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                            Zeitpunkt auswählen
                        </button>
                        <div className="dropdown-menu">
                            {files}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}