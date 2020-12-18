import React from 'react';


function Home ({ details }){
    if (!details){
        return <h3>Fetching your details...</h3>
    }
    return(
        <div className="userContainer">
            <h2>Name: {details.name}</h2>
            <p>Pizza Size: {details.pizzaSize}</p>
            <p>Special Instructions: {details.specialInstructions}</p>
        </div>
    )
}
export default Home;