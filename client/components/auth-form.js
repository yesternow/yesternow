import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../store';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="login-form" id="auth-form">
      <Image src="/logo.jpg" className="ui centered image medium" />
      <Grid textAlign="center" style={{ height: '35%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center" align="center">
            {displayName} with:
          </Header>
          <Form onSubmit={handleSubmit} name={name} size="large">
            <Segment stacked style={{ minWidth: 450 }}>
              <Form.Input
                style={{ minWidth: 350 }}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                type="text"
              />
              <Form.Input
                style={{ minWidth: 350 }}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />
              <Button color="teal" fluid size="large" type="submit">
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
              <div>
                <button className="ui blue secondary button" role="button">
                  <a href="/auth/facebook">
                    <i
                      aria-hidden="true"
                      className=" facebook circular inverted icon"
                    />
                    Facebook
                  </a>
                </button>
                <button className="ui orange secondary button" role="button">
                  <a href="/auth/google">
                    <i
                      aria-hidden="true"
                      className=" google circular inverted icon"
                    />
                    Google
                  </a>
                </button>
              </div>
            </Segment>
          </Form>
          {displayName === 'Login' ? (
            <Message className="centered center">
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          ) : (
            <Message className="centered center">
              Already have an account? <Link to="/login">Login Now</Link>
            </Message>
          )}
        </Grid.Column>
      </Grid>

      {/* <form onSubmit={handleSubmit} name={name}>
				<div>
					<label htmlFor="email">
						<small>Email</small>
					</label>
					<input name="email" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input name="password" type="password" />
				</div>
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form> */}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
