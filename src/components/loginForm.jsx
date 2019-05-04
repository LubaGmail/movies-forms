import React, {Component} from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

export default class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: '' 
        },
        errors: {
            username: '',
            password: ''
        }   
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    // username = React.createRef();

    componentDidMount() {
        // this.username.current.focus();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const username = document.getElementById('username').value;
        // const username = this.username.current.value;  with ref

        const errors = this.validate();
        this.setState({errors: errors || {} });

        // doesn't work
        // const result = Joi.validate(this.state.accout, this.schema, {abortEarly: false} );
        
        if (errors) return;

        // do AJAX
    }

    validate = () => {
        const errors = {};
        const {account} = this.state;

        if (account.username.trim() === '') {
            errors.username = 'Username is required';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required'
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const error = this.validateProps(input);

        if (error) {
            errors[input.name] = error;
        } else {
            delete errors[input.name];
        }
               
        const account = {...this.state.account};
        // account.username = e.currentTarget.value;
        account[input.name] = input.value;
        
        this.setState({account, errors}); 
    }

    // validateProp = input => {
    validateProps = ({name, value}) => {
        if (name === 'username') {
            if (value === '') {
                return 'Username is required.';
            }
        }
        if (name === 'password') {
            if (value === '') {
                return 'Password is required.';
            }
        }
    }
  
    render() {
        const {account, errors} = this.state;
        return (
            <div>
                <h3 className='wrapper'>Login Form</h3>
                <form onSubmit={this.handleSubmit}>
                    <Input name={'username'}
                        value={account.username}
                        label={'Username'}
                        type={'email'} 
                        error={errors.username}
                        onChange={this.handleChange}
                     />
                    <small id="emailHelp" className="form-text text-muted wrapper">
                        We'll never share your email with anyone else.
                    </small>
        
                    <Input name={'password'}
                        value={account.password}
                        label={'Password'}
                        type={'password'}
                        error={errors.password}
                        onChange={this.handleChange}
                    />
                                       
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>

                        <label>
                            Check me out
                        </label>
                    </div>
                    <button onClick={ this.handleSubmit } 
                        disabled={this.validate()}
                        type="submit" 
                        className="btn btn-primary">
                            Submit
                    </button>
                </form>
            </div>
        )
    }
}
