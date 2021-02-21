import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function ButtonRender(props) {
    return props.tables.map((buttonData) => {
        if (buttonData['bearbeiten'] === 1) {
            return (
                <Link key={buttonData['tablename']} to={{ pathname: "/bearbeiten", state: {table: buttonData['tablename']} }} className="btn btn-warning btn-block my-2">
                    {buttonData['alias']}
                </Link> 
            )
        } else {
            return null;
        }
    })
}

export default class BearbeitenCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: this.props.tables,
        };
    }

    render() {
        const { tables } = this.state;
        return(
            <div className="col">
                <div className="card p-0">
                    <div className="card-body">
                        <h5 className="card-title text-dark">Bearbeiten</h5>
                        <ButtonRender tables={tables} />
                    </div>
                </div>
            </div>
        )
    }
}