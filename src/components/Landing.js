import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            users: [
                { name: "Jasmin", color: "yellow" },
                { name: "Jake", color: "blue" },
                { name: "Jenny", color: "green" },
                { name: "Justin", color: "red" }
            ]
        }
    }
    render() {
        return (
            <div id="users-container">

                {this.state.users.map((user, i) => {
                    return (
                        <Link to={"/catalog"} key={i}>
                            <div className="user" style={{ background: user.color }}>
                                <span>{user.name}</span>
                            </div>
                        </Link>
                    )
                })}

            </div>)
    }
}

export default Landing