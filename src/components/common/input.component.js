import * as React from 'react';
import Input from "react-validation/build/input";

interface InputProps {
    onChange: () => void;
    value: Object;
    name: string;
    id: string;
    validations: [];
}

const InputComponent: React.FC<InputProps> = ({
                                                  onChange,
                                                  value,
                                                  name,
                                                  id,
                                                  validations
                                              }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{name}</label>
            <Input
                type="text"
                className="form-control"
                id={id}
                required
                value={value}
                onChange={onChange}
                name={id}
                validations={
                    validations
                }
            />
        </div>
    );
};

export default InputComponent;
