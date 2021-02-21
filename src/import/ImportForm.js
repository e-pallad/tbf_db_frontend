import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './ImportForm.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ImportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.table,
            file: null,
            data: null
        }
        this.uploadFile = this.uploadFile.bind(this);
        document.getElementById('root').classList.remove('container-fluid');
    }

    uploadFile(table, file) {
        const url = 'https://tbf-db-backend.ep-projekte.de/importTable.php'; 
                
        const formData = new FormData();  
        formData.append('table', table)  
        formData.append('file', file);    
        const config = { 
            method: 'POST',
            body: formData
        };
    
        fetch(url, config)
        .then( result => result.json() )
        .then(
            (result) => {
                this.setState({ 
                    data: result,
                    file: null
                })
                document.querySelector(".upload").classList.add("done");
                document.querySelector(".upload").classList.remove("drop", "drag");
                setTimeout(() => document.querySelector(".upload").classList.remove("done"), 1000);
            },
            (error) => {
                this.setState({ 
                    data: error,
                    file: null
                })
            } 
        )
    }

    componentWillUnmount() {
        document.getElementById('root').classList.add('container-fluid');
        this.setState({ data: null });
    }

    componentDidMount() {
        var fileUpload = document.querySelector(".upload");

        fileUpload.addEventListener("dragover", function() {
            this.classList.add("drag");
            this.classList.remove("drop", "done");
        });

        fileUpload.addEventListener("dragleave", function() {
            
        });

        this.submit = (e) => {
            this.setState({ file: e.target.files[0] }); 
            this.setState({ data: null });

            let filename = this.state.file.name
            let importTable = this.state.table

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <div className='modal-dialog'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className='modal-title'>Tabelle importieren</h5>
                                    </div>
                                    <div className='modal-body'>
                                        <p>
                                            Soll die Datei: <br />
                                            <span className='text-danger'>
                                                {filename}
                                            </span> <br />
                                            wirklich in die Tabelle:&nbsp;
                                            <span className='text-danger'>
                                                {importTable.replace('RI-TBF_SEF_', '').replace('_Liste', ' Liste')}
                                            </span> importiert werden?
                                        </p>
                                    </div>
                                    <div className='modal-footer'>
                                        <button className='btn btn-primary'
                                            onClick={() => {
                                                if (this.state.file) {
                                                    fileUpload.classList.remove("drag");
                                                    fileUpload.classList.add("drop");  
                                                    this.uploadFile(this.state.table, this.state.file);      
                                                }
                                                onClose();
                                            }}>
                                            Ja
                                        </button>
                                        <button className='btn btn-secondary'
                                            onClick={() => {
                                                this.setState({ file: null });
                                                onClose();
                                            }}>
                                            Nein
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }

        fileUpload.addEventListener("drop", this.submit.bind(this), false);
        fileUpload.addEventListener("change", this.submit.bind(this), false);
    }

    render() {
        const data = this.state.data;
        let message;
        if (data) {
            message = <div className="message"><p>{data[0]}</p><p>{data[1]}</p><p>{data[2]}</p><p>{data[3]}</p><p>{data[4]}</p></div>
            console.log(message);
        }
        return (
            <section>
                <div className="upload">
                    <input type="file" title="" accept=".xlsx" className="drop-here" />
                    <div className="text text-drop text-center">.xlsx Datei <br />hier ablegen <br />oder klicken <br />zum importieren</div>
                    <div className="text text-upload">uploading</div>
                    <svg className="progress-wrapper" width="300" height="300">
                        <circle className="progress" r="115" cx="150" cy="150"></circle>
                    </svg>
                    <svg className="check-wrapper" width="130" height="130">
                        <polyline className="check" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>
                    <div className="shadow"></div>
                </div>
                {message}
            </section>
        )   
    }
}