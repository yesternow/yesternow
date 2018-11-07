import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { addAddress } from '../store';

class AddressForm extends Component {
    constructor(){
        super()
        this.state = {
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            zipcode: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.addAddress(
            this.state
        )
        this.setState({
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            zipcode: 0
        })

    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Address Line 1</label>
                    <input type='text' name='address1' value={this.state.address1} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Address Line 2</label>
                    <input type='text' name='address2' value={this.state.address2} onChange={this.handleChange} />
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <label>City</label>
                        <input type='text' name='city' value={this.state.city} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>State</label>
                        <input type='text' name='state' value={this.state.state} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Country</label>
                        <input type='text' name='country' value={this.state.country} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Zipcode</label>
                        <input type='number' name='zipcode' value={this.state.zipcode} onChange={this.handleChange} />
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

