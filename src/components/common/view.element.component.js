import React from "react";

const listDiv = (message, object) => {
    return (
        <div>
            <label>
                <strong>{message}:</strong>
            </label>{" "}
            {object}
        </div>
    );
};

const ComponentLibrary = {
    listDiv
}

export default ComponentLibrary;
