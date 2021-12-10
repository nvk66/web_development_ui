import * as React from 'react';
import {Link} from "react-router-dom";
import ComponentLibrary from "./view.element.component";

interface ButtonProps {
    id?: string | null;
    info: string;
    name: string;
    data: Map<string, string>;
}

const render = (data: Map<string, string>) => {
    let elem = [];
    for (let [key, value] of data.entries()) {
        elem.push(ComponentLibrary.listDiv(key, value));
    }
    return elem;
}

const InfoComponent: React.FC<ButtonProps> = ({
                                                  info,
                                                  name,
                                                  id,
                                                  data,
                                              }) => {
    return (
        <div className="col-md-6">
            {id ? (
                <div className="mt-5">
                    <div>
                        <h4 className="float-left mr-2">{name}</h4>
                        <Link
                            to={"/" + info + "/" + id}
                            className="btn btn-warning"
                        >
                            Show
                        </Link>
                    </div>
                    {render(data)}
                </div>
            ) : (
                <div>
                    <br/>
                    <span className="font-weight-bold">Please click on a {name}...</span>
                </div>
            )}
        </div>
    );
};

export default InfoComponent;
