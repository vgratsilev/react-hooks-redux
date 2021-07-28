import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash);
    const customers = useSelector(state => state.customers.customers);
    console.log(cash);

    const addCash = () => {
        dispatch({type: 'ADD_CASH', payload: Number(prompt())})
    }
    const getCash = () => {
        dispatch({type: 'GET_CASH', payload: Number(prompt())})
    }

    const addClient = () => {
        const customer = {
            name: prompt(),
            id: Date.now()
        };
        dispatch(addCustomerAction(customer));
    }

    // const removeClient = () => {
    //
    //     dispatch({type: 'REMOVE_CUSTOMER', payload: prompt()})
    // }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id));
    }

    const getClientsFromBase = () => {
        dispatch(fetchCustomers());
    }

    return (
        <div className="App">
            <div>
                <div className={'cashLabel'}>{cash}</div>
                <div className={'buttons'}>
                    <button onClick={addCash}>Add cash</button>
                    <button onClick={getCash}>Get cash</button>
                </div>
                <div className={'buttons'}>
                    <button onClick={addClient}>Add client</button>
                    <button onClick={getClientsFromBase}>Get clients from base</button>
                </div>
                {customers.length > 0 ?
                    <div>
                        {customers.map((client) =>
                            <div key={client.id} className={'clientName'}
                                 onClick={() => removeCustomer(client)}>{client.name}</div>
                        )}
                    </div>
                    :
                    <div>No clients</div>
                }
            </div>
        </div>
    );
}

export default App;
