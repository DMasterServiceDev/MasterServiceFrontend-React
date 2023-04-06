import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

function BoardMaster() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                setContent(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                );
            }
        );
    }, []);

    return (
        <div>
            <header>
                <h1>Master board</h1>
                <h3>{content}</h3>
                <Link to={"/calendar"}>
                    Календарь
                </Link>
            </header>
        </div>
    );
}

export default BoardMaster;
