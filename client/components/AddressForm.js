import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { addAddress } from '../store';

class AddressForm extends Component {
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.addAddress({
            address1: event.target.address1.value,
            address2: event.target.address2.value,
            city: event.target.city.value,
            state: event.target.state.value,
            address1: event.target.address1.value,
            address1: event.target.address1.value,
        })

    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Address Line 1</label>
                    <input type='text' name='address1' />
                </Form.Field>
                <Form.Field>
                    <label>Address Line 2</label>
                    <input type='text' name='address2' />
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <label>City</label>
                        <input type='text' name='city' />
                    </Form.Field>
                    <Form.Field>
                        <label>State</label>
                        <input type='text' name='state' />
                    </Form.Field>
                    <Form.Field>
                        <label>Country</label>
                        <input type='text' name='country' />
                    </Form.Field>
                    <Form.Field>
                        <label>Zipcode</label>
                        <input type='number' name='zipcode' />
                    </Form.Field>
                </Form.Group>
                <Button type='submit'>Add Address</Button>

            </Form>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    addAddress: (address) => dispatch(addAddress(address))
})

export default connect(null, mapDispatchToProps)(AddressForm)

