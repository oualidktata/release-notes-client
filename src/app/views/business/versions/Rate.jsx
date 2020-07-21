import React from 'react';
const Rate=({currency,rate})=> {
        return (
            <div key={currency}>
                <p>{currency}</p><p>{rate}</p>
            </div>
    ); 
}

export default Rate


