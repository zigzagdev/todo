import React from 'react';
import './App.css';
import Box from "@material-ui/core/Box";
import CreateForm from "./components/CreateForm";
import Grid from "@material-ui/core/Grid";
import List from "./components/List";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createFormInputs: {
                name: "",
                content: "",
            },
            lists: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleListSubmit = this.handleListSubmit.bind(this);
        this.handleListDelete = this.handleListDelete.bind(this);
        this.handleListUpdate = this.handleListUpdate.bind(this);
    }

    get axios() {
        const axiosBase = require('axios');
        return axiosBase.create({
            baseURL: process.env.REACT_APP_DEV_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        });
    }

    componentDidMount() {
        this.axios.get('http://localhost:3002/api/v1/lists.json')
            .then(results => {
            console.log(results);
        this.setState({
            lists: results.data
        });
    })
    .catch(data => {
            console.log(data);
    });
    }

    handleInputChange(itemName, e) {
        const newInputs = Object.assign({}, this.state.createFormInputs)
        newInputs[itemName] = e.target.value;

        this.setState({
            createFormInputs: newInputs
        });
    }

    handleListSubmit(e) {
        e.preventDefault();
        const inputValues = Object.values(this.state.createFormInputs);

        if (inputValues.every(value => value)) {
            this.axios.list("http://localhost:3002/api/v1/lists.json", {
                list: this.state.createFormInputs,
            })
                .then(res => {
                const lists = this.state.lists.slice();
            lists.push(res["data"]);
            this.setState({
                lists: lists,
                createFormInputs: {
                    name: "",
                    content: "",
                },
            });
        })
        .catch(data => {
                console.log(data)
            });
        }
    }

    handleListDelete(id, e) {
        e.preventDefault();
        this.axios.delete(`http://localhost:3002/api/v1/lists/${id}`)
            .then(res => {
            const targetIndex = this.state.lists.findIndex(list => {
                return list["id"] === res["data"]["id"]
            });
        const lists = this.state.lists.slice();
        lists.splice(targetIndex, 1);

        this.setState({
            lists: lists
        });
    })
    .catch(data => {
            console.log(data);
    });
    }

    handleListUpdate(id, inputs, e) {
        e.preventDefault();
        const inputValues = Object.values(inputs);

        if (inputValues.every(value => value)) {
            this.axios.patch(`http://localhost:3002/api/v1/lists/${id}`, {
                list: inputs
            })
                .then(results => {
                const lists = this.state.lists.slice();
            const index = lists.findIndex(list => list["id"] === id);
            lists.splice(index, 1, results["data"]);

            this.setState({
                lists: lists
            });
        })
        .catch(data => {
                console.log(data);
        });
        }
    }

    getLists() {
        return (
            this.state.lists.map((list) => {
                return (
            <Grid item xs={4} key={list.id}>
            <List
        list={list}
        onDelete={this.handleListDelete}
        onUpdate={this.handleListUpdate}
        />
        </Grid>);
    })
    );
    }

    render() {
        return (
            <div className="App">
            <Box p={5}>
            <CreateForm
        inputs={this.state.createFormInputs}
        onChange={this.handleInputChange}
        onSubmit={this.handleListSubmit}
        />
        <Box p={3}>
            <Grid container spacing={4}>
            {this.getLists()}
            </Grid>
            </Box>
            </Box>
            </div>
    );
    }
}

export default App;