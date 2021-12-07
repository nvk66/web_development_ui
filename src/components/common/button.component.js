import * as React from 'react';

interface ButtonProps {
    create: () => void;
    update: () => void;
    deleteFunc: () => void;
    id?: string | null;
}

const ButtonComponent: React.FC<ButtonProps> = ({
                                                    create,
                                                    update,
                                                    deleteFunc,
                                                    id,
                                                }) => {
    return (
        id ? (
            <div>
                <button
                    className="btn btn-danger mr-2"
                    onClick={deleteFunc}
                >
                    Delete
                </button>

                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={update}
                >
                    Update
                </button>
            </div>
        ) : (
            <div>
                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={create}
                >
                    Create
                </button>
            </div>
        )
    );
};

export default ButtonComponent;
