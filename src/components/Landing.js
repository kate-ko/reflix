import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DEFAULTCOLOR = "blue"

class Landing extends Component {
    render() {
        let users = this.props.users
        return (
            <div id="users-container">
                { users.map((user, i) => {
                    return (
                        <Link to={"/catalog"} key={i}>
                            <div className="user" style={{ background: user.color || DEFAULTCOLOR }} 
                                onClick={ () => this.props.selectUser(user.id) }>
                                <span>{user.name}</span>
                            </div>
                        </Link>
                    )
                })}

            </div>)
    }
}

export default Landing