const tableDetail = document.querySelector('#detail');
const tableTotal = document.querySelector('#total');
const orderNameSession = sessionStorage.getItem('order-data');
const totalPriceSession = sessionStorage.getItem('total-price');
const dataOrder = JSON.parse(orderNameSession);

if(dataOrder){
    dataOrder.forEach(data => {
        tableDetail.innerHTML += `
            <tr>
            
            <td>
                <p>${data.name}</p>
            </td>
            
            <td>
                <p>$${data.price}</p>
            </td>
            
            </tr>
        `;
    });
    
    tableTotal.innerHTML = `
        <tr>
                
        <td>
            <p>Total Price</p>
        </td>

        <td>
            <p>$${totalPriceSession}</p>
        </td>
        
        </tr>
    `;
}