import React from "react";
import { Component } from "react";

import ImportCard from '../cards/ImportCard';
import BearbeitenCard from '../cards/BearbeitenCard';
import ErzeugenCard from '../cards/ErzeugenCard';
import AuswertenCard from '../cards/AuswertenCard';
import ExportCard from '../cards/ExportCard';

export default class Home extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			tables: [],
		};
	}

	componentDidMount() {
		fetch("https://tbf-db-backend.ep-projekte.de/fetchTables.php")
		.then(res => res.json())
		.then((result) => {
			const tables = [];
			result.map(results => {
				tables.push({
					tablename: results[0],
					alias: results[1],
					importieren: parseInt(results[2], 10),
					bearbeiten: parseInt(results[3], 10),
					auswerten: parseInt(results[4], 10),
					exportieren: parseInt(results[5], 10),
					erzeugen: parseInt(results[6], 10),
				})
				return undefined
			})
			return tables
		})
		.then((tables) => {
			this.setState({
				tables: tables,
			})
		})
	}

	render() {
		if (this.state.tables.length <= 0) {
			return (
				<div className="d-flex justify-content-around">
					<div className="row">
						<div className="d-flex align-items-center">
						<strong>Lädt...</strong>
						<div className="spinner-border ms-auto" role="status" aria-hidden="true" />
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="container-fluid">
					{/*
					<nav className="navbar navbar-light bg-light">
						logoutButton
					</nav>
					*/}
					<div className="d-flex justify-content-around">
						<div className="row">
							<ImportCard tables={this.state.tables} />
							<BearbeitenCard setRedirect={this.renderTable} tables={this.state.tables} />
							{/* <AuswertenCard tables={this.state.tables} />*/}
							<ExportCard tables={this.state.tables} />
							<ErzeugenCard tables={this.state.tables} />
						</div>
					</div>
				</div>
			)
		}
	}
}