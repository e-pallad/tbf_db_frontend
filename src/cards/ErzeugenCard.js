import React, { Component } from 'react';
import Erzeugen from '../erzeugen/Erzeugen'

function ButtonRender(props) {
    return props.tables.map((buttonData) => {
        if (buttonData['erzeugen'] === 1) {
            return (
                <Erzeugen key={buttonData['tablename']} alias={buttonData['alias']} table={buttonData['tablename']} />
            )
        } else {
            return null;
        }
    })
}

export default class ImportCard extends Component {
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
                        <h5 className="card-title text-dark">Erzeugen</h5>
                        <ButtonRender tables={tables}/>
                    </div>
                </div>
            </div>
        )
    }
}