import React from 'react';
import './App.css';

function Profile({auth}) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    You are logged in as {auth && auth.nickname ? auth.nickname : null}
                </p>
                <a
                    className="App-link"
                    href={"/auth/logout"}
                >
                    Logout
                </a>
            </header>
        </div>
    );
}

export default Profile;
