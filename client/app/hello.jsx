import React from 'react';

import AppActions from './app_action.jsx';
import AppStore from './app_store.jsx';

class Hello extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            data: {},
            raw: ""
        }
    }

    componentDidMount() {
        AppStore.listen(this.onAppStoreChange.bind(this));
    }

    onAppStoreChange(event, data) {
        switch(event) {
            case "hello":
                this.setState({
                    data: data.data,
                    raw: data.raw
                });
                break;
        }
    }

    onClickHello() {
        let name = $('#name').val();
        AppActions.hello(name);
    }

    renderContents() {
        let {data, raw} = this.state;

        return <div>
            <div key="input" className="ui action input">
                <input id="name" type="text" placeholder="Name"/>
                <button className="ui button" onClick={this.onClickHello.bind(this)}>Hello</button>
            </div>
            <div key="data" className="ui raised segment">
                <table className="ui definition table">
                    <tbody>
                    <tr>
                        <td style={{width:'100px'}}>Name</td>
                        <td>{data.hello === undefined ? '' : data.hello.name}</td>
                    </tr>
                    <tr>
                        <td>Lowercase</td>
                        <td>{data.hello === undefined ? '' : data.hello.lower}</td>
                    </tr>
                    <tr>
                        <td>Uppercase</td>
                        <td>{data.hello === undefined ? '' : data.hello.upper}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div key="raw" className="ui raised segment">
                <p>{raw}</p>
            </div>
        </div>;
    }

    render() {
        return <div>{this.renderContents()}</div>;
    }
}

export default Hello;