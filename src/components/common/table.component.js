import * as React from 'react';
import {Link} from "react-router-dom";

interface ButtonProps {
    setActive: (data: Object, index: number) => void;
    id?: string | null;
    info: string;
    value: string;
    name: string;
    data: [];
}

const TableComponent: React.FC<ButtonProps> = ({
                                                  setActive,
                                                  info,
                                                  name,
                                                  value,
                                                  id,
                                                  data,
                                              }) => {
    return (
        <div className="col-md-6">
            <div className="mb-5">
                <h4 className="creation mr-2">{name} List</h4>
                <Link
                    to={"/" + info}
                    className="btn btn-primary"
                >
                    Create
                </Link>
            </div>

            <ul className="list-group">
                {data &&
                data.map((obj, index) => (
                    <li
                        className={
                            "list-group-item " +
                            (index === id ? "active" : "")
                        }
                        onClick={() => setActive(obj, index)}
                        key={index}
                    >
                        {obj[value]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableComponent;
