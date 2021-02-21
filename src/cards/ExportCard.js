import React, { Component } from 'react'
import Export from '../export/Export'

function ButtonRender(props) {
    return props.tables.map((buttonData) => {
        if (buttonData['exportieren'] === 1) {
            return (
                <Export key={buttonData['tablename']} table={buttonData['tablename']} alias={buttonData['alias']} />
            )
        } else {
            return null;
        }
    })
}

export default class ExportCard extends Component {
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
                        <h5 className="card-title text-dark">Export</h5>
                        <ButtonRender tables={tables} />
                        {/*tables.map((item) => (
                            <Export key={item['tablename']} table={item['alias']} />
                        ))*/}
                    </div>
                </div>
            </div>
        )
    }
}