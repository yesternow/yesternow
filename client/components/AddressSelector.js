import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Container, Button } from 'semantic-ui-react'
import { fetchAddresses, selectAddress } from '../store'

class AddressSelector extends Component {
    constructor() {
        super()
        this.state={
            selectedAddress: {},
            addAddressToggle: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
		this.props.loadAddresses();
	}

    handleChange(event, data){
        console.log('here')
        this.props.selectAddress(data.value)
    }
    handleSubmit(event){
        event.preventDefault()
    }




    render() {
        if(this.props.addresses){
            const options = this.props.addresses.map(el => ({text: `${el.address1} ${el.city} ${el.state}`, value: el.id}))
            return (
                <Container>
                    <Dropdown
                        onChange={this.handleChange}
                        options={options}
                        placeholder='Your Addresses'
                    />
                    <Button onClick={this.handleSubmit}>Select Address</Button>

                </Container>


            )

        } else {
            return <p>No Addresses</p>
        }
    }
}



const mapStateToProps = (state) => ({
	time: new Date(),
	addresses: state.address.addresses
});

const mapDispatchToProps = (dispatch) => ({
    loadAddresses: () => dispatch(fetchAddresses()),
    selectAddress: (address) => dispatch(selectAddress(address))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressSelector);
