import React from 'react';
import { Button, Typography } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoice } from 'store/reducers/actions';
import { baseURLProd } from 'api/api';
const GenerateInvoice = () => {
    const dispatch = useDispatch();
    const invoice = useSelector(state => state.invoice.invoice)
    const generateRandomInvoice = async () => {
        try {
            const response = await fetch(`${baseURLProd}GetInvoiceNumber`, {
                method: 'GET',
                headers: { 'accept': '*/*' }
            });

            const data = await response.json();
            console.log('Invoice data:kakakakak', data);
            if (data.status) {
                const newInvoice = {
                    invoiceNumber: data.invoiceNumber,
                };

                dispatch(setInvoice(newInvoice));
            } else {
                console.error('Error generating invoice:', data.message);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };
    return (
        <div style={{ display: 'flex', gap: 2 }}>
            <Button
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={generateRandomInvoice}
                style={{
                    backgroundColor: '#ECF4FF',
                    color: '#1363DF',
                    border: '1px solid #1363DF',
                    marginBottom: '20px'
                }}>
                Create Invoice
            </Button>
            {invoice && (
                <Typography variant="caption"
                    style={{
                        marginTop: '4px',
                        color: '#666',
                        fontStyle: 'italic',
                        textAlign: 'center'
                    }}>
                    Invoice #{invoice.invoiceNumber}
                </Typography>
            )}
        </div>
    );
};

export default GenerateInvoice;
