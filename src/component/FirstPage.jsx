import React, { Component } from "react";
import { Button} from "react-bootstrap";
export default class HomePage extends Component {

    toAdminPage = () => {
        this.props.history.push("/admin");
    }
    render() {
        return (
            <div>
                <Button block bsSize="large" type="submit" onClick={this.toAdminPage}>
                    Admin Login
                </Button>
                <Button block bsSize="large" type="submit" onClick={()=>{this.props.history.push("/other")}}>
                    Other Login
                </Button>
            </div>
        )
    }
}