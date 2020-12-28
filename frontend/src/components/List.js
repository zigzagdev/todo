import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import ListModal from "./ListModal";
import EditForm from "./EditForm";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            editFormOpen: false,
            editFormInputs: {
                title: "",
                content: "",
            },
        }
        this.handleToggleModalOpen = this.handleToggleModalOpen.bind(this);
        this.handleToggleEditFormOpen = this.handleToggleEditFormOpen.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleToggleModalOpen() {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    handleInputChange(itemName, e) {
        const newInputs = Object.assign({}, this.state.editFormInputs);
        newInputs[itemName] = e.target.value;
        this.setState({
            editFormInputs: newInputs
        });
    }

    handleToggleEditFormOpen() {
        this.setState({
            editFormOpen: !this.state.editFormOpen
        });
    }

    render() {
        return (
            <div>
            <Card>
            <CardContent>
            <Typography variant="h3" component="h3">
            {this.props.list.title}
            </Typography>
            <Typography variant="body2">
            {this.props.list.content}
            </Typography>
            </CardContent>
            <CardActions>
            <Button
        size="small"
        variant="contained"
        onClick={this.handleToggleModalOpen}
            >
            DETAIL
            </Button>
            <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={this.handleToggleEditFormOpen}
            >
            EDIT
            </Button>
            <Button
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon/>}
        onClick={(e) => this.props.onDelete(this.props.list.id, e)}
    >
        DELETE
        </Button>
        </CardActions>
        </Card>
        <ListModal
        list={this.props.list}
        open={this.state.modalOpen}
        onClose={this.handleToggleModalOpen}
        onDelete={this.props.onDelete}
        onEditClick={this.handleToggleEditFormOpen}
        />
        {this.state.editFormOpen &&
        <EditForm
            list={this.props.list}
            inputs={this.state.editFormInputs}
            onChange={this.handleInputChange}
            onSubmit={this.props.onUpdate}
            />
        }
    </div>
    );
    }
}

export default List;