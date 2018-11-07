import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { addAddress, updateInfo } from '../store';

class GuestForm extends Component {
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.updateInfo(event.target.name, event.target.value)
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field required>
                    <label>Address Line 1</label>
                    <input type='text' name='address1'  onChange={this.handleChange}/>
                </Form.Field >
                <Form.Field >
                    <label>Address Line 2</label>
                    <input type='text' name='address2'  onChange={this.handleChange} />
                </Form.Field>
                <Form.Group>
                    <Form.Field required>
                        <label>City</label>
                        <input type='text' name='city'  onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>State</label>
                        <input type='text' name='state' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Country</label>
                        <input type='text' name='country'  onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Zipcode</label>
                        <input type='number' name='zipcode'  onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field required>
                        <label>Email</label>
                        <input type='email' name='guestEmail'  onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Phone Number</label>
                        <input type='text' name='guestNumber'  onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>


            </Form>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    addAddress: (address) => dispatch(addAddress(address)),
    updateInfo: (key, value) => dispatch(updateInfo(key, value))
})

export default connect(null, mapDispatchToProps)(GuestForm)

