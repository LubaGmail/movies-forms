import React from 'react';

const Input = ({name, value, label, type, error, onChange}) => {
    return ( 
        <div className="form-group">
           
            <input onChange={onChange}
                value={value}
                className="form-control"
                id={name}
                name={name}
                type={type}
                // autoFocus
                aria-describedby="emailHelp"
                placeholder={name}
            />
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
}
 
export default Input;