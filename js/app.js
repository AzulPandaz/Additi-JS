let checkoutPage = document.querySelector('.checkout-page')
let homePage = document.querySelector('.home-page');
let cartItems = document.getElementById('cartItems')
let itemCount = 0;
let price = 0;
let cartSubTotal = document.getElementById('cartSubTotal')

class Pokemonstore{
    constructor(){
        this.itemsInCart ={
            itemCount: 0,
            subTotal: 0
        }
        this.inventory={
            item1:{
            id:1,
            img:"media/potion.png" ,
            class:'heal',
            price: 4.00,
            qty: 0,
            info:"Heals 20 HP from a Pokemon",
            name:"Potion",
            productCode:"ASD1234"
            },
            item2:{
            id:2,
            img:"media/superPotion.png",
            class:'heal',
            price: 10.00,
            qty: 0,
            info:"Heals 60 HP from a Pokemon",
            name:"Super Potion",
            productCode:"ASD1994"
            },
            item3:{
             id:3,
            img:"media/hyperPotion.png" ,
            class:'heal',
            price: 15.00,
            qty: 0,
            info:"Heals 120 HP from a Pokemon",
            name:"Hyper Potion",
            productCode:"ASD1994"
            },
            // Add Pokeballs
            item4:{
                id:4,
                img:"media/duskBall.png" ,
                class:'pokeBall',
                price: 5.00,
                qty: 0,
                info:"A Pokeball that has a higher catch rate in the darkness (caves, night, etc...)",
                name:"Dusk-ball",
                productCode:"ASD1994"
            },
            item5:{
                id:5,
                img:"media/netBall.png" ,
                class:'pokeBall',
                price: 5.00,
                qty: 0,
                info:"A Poke-ball that has a higher chance to catch Bug-type Pokemons",
                name:"Net-ball",
                productCode:"ASD1994"
            },
            item6:{
                id:6,
                img:"media/diveBall.png",
                class:'pokeBall',
                price: 5.00,
                qty: 0,
                info:"A Pokeball that has a higher catch rate with Water type Pokemons",
                name:"Dive-Ball",
                productCode:"ASD1994"
            },
            item7:{
                id:7,
                img:"media/pokeBall.png",
                class:'pokeBall',
                price: 2.00,
                qty: 0,
                info:"A basic Poke-ball",
                name:"Poke-ball",
                productCode:"ASD1994"
            },
            item8:{
                id:8,
                img:"media/greatBall.png",
                class:'pokeBall',
                price: 6.00,
                qty: 0,
                info:"A higher grade Poke-ball with a higher catch rate",
                name: "Great-Ball",
                productCode:"ISK2931"
            },
            item9:{
                id:9,
                img:"media/ultraBall.png",
                class:'pokeBall',
                price: 12.00,
                qty: 0,
                info:"A higher grade Poke-ball with a higher catch rate then a Great-Ball",
                name: "Ultra-Ball",
                productCode:"ISK2931"
            }


        }
    }
    singleProductPage(){
        let productPage = document.getElementById('single-product')
        let imgClick = document.querySelectorAll('.click-img')

        let home = document.getElementById('home')
        home.addEventListener('click', ()=>{
            checkoutPage.classList.add('d-none')
            homePage.classList.remove('d-none')
            productPage.classList.add('d-none')
        })

        imgClick.forEach(img =>{
            img.addEventListener('click',()=>{
                console.log('clicked')
                for(const key in this.inventory){
                        const item= this.inventory[key]
                    checkoutPage.classList.add('d-none');
                    homePage.classList.add('d-none');
                    productPage.classList.remove('d-none')
                    if(img.dataset['id'] == item.id){
                        productPage.innerHTML=`
                        <div class="jumbotron">
                        <h1 class="display-4 item-name">${item.name}</h1>
                        <div class="img-div">
                            <img src="${item.img}" alt="{item.name}">
                        </div>
                        <p class="lead item-class">${item.class}</p>
                        <hr class="my-4">
                        <p class="item-info">${item.info}</p>
                        <button class="btn btn-info main-button mid-button add-button" data-id="${item.id}">SHOP</button>
                        <button class="btn btn-info main-button mid-button home-button" >Home</button>
            
                        `
                    }
                }
            })
        })

    }

    LoadItems(){
        let count = 0

        let products1= document.getElementById('products1');
        let products2= document.getElementById('products2');
        let products3= document.getElementById('products3');
// IF you want to add more items like jordan. Can sell more items by using click on products 2 so that when it clicks diffrent tabs it filter.
        for(const key in this.inventory){
            const item = this.inventory[key]
            const product = document.createElement('div')
            product.className ='col-4 product'
            product.innerHTML=`
                        <div class="card-mb-3">
                            <div class="row">
                                <div class="col-2">
                                    <img src="${item.img}" alt="${item.name}" class="${item.class} click-img" data-id="${item.id}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body text-center">
                                        <h5 class="card-title product-name">${item.name}</h5>
                                        <p class="price">&#165;${item.price}.00</p>
                                        <button class="btn btn-info main-button mid-button add-button" data-id="${item.id}">SHOP</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
// data id breaking it 
            if(count < 3){
                products1.append(product);
            } else if(count < 6){
                products2.append(product)
            } else{
                products3.append(product)
            }
            count++;
        }
    }

    addtoCart(){
        let buttons = document.querySelectorAll('.add-button')


        for(const key in this.inventory){
            const item = this.inventory[key];
            buttons.forEach(button =>{
                button.addEventListener('click', ()=>{
                    if(button.dataset['id'] == item.id){
                        itemCount++;
                        price = price + item.price

                        this.itemsInCart.itemCount = itemCount
                        this.itemsInCart.subTotal = price

                        item.qty++
                        console.log(item)
                        console.log(this.itemsInCart)
                    }
                    cartItems.innerText= itemCount;
                    cartSubTotal.innerText= price.toFixed(2);
                })
            })
        }
        
    
    }
    
    checkout(){
        let table= document.getElementById('tbody');
        let checkout = document.getElementById('checkout');
        
        let subTimesQty = 0;
        let subTotalValue= document.getElementById('subtotalValue')
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue')
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let shipping = 6;
        
        
        
        checkout.addEventListener('click', ()=>{
            let testing = document.getElementById('testing')
            testing.innerHTML= '';
            // tableRow.innerHTML = '';
            // const tableRow = document.createElement('div')
            // tableRow.id= 'testing'
            // table.remove(tableRow)
            
            checkoutPage.classList.remove('d-none')
            homePage.classList.add('d-none')
            
            if(this.itemsInCart.itemCount == 1){
                checkoutItemCount.innerText=`${this.itemsInCart.itemCount} item`
            } else {
                checkoutItemCount.innerText= `${this.itemsInCart.itemCount} items`
            }
            
            for(const key in this.inventory){
                const item = this.inventory[key];
                
                subTimesQty = (item.qty * item.price).toFixed(2);
                subTotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2)
                tax = this.itemsInCart.subTotal * 0.07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2)
                
                if(item.qty > 0){
                    console.log('working')
                    testing.className= 'product-checkout row';
                    
                    testing.innerHTML +=`
                    <div class="col-12">
                    <div class="row">
                    <img src="${item.img}" alt="${item.name}" class="col-3" id="checkout-img">
                    <p class="name col-3">${item.name}</p>
                    <p class="price col-3">&#165;${item.price}</p>
                    <div id="itemQuantity">
                    <p id="qtyInput">${item.qty}</p>
                    </div>
                    <p class="col-2" id="itemSubtotal">${subTimesQty}</p>
                    </div>
                    </div>`
                    // table.append(testing)
                }
                
            }
        })

        // Clear buttons

        // let clear = document.getElementById("confirmbutton")
        // clear.addEventListener('click', ()=>{
        //     console.log('cleared')
        //     cartItems.innerText= ''
        //     cartSubTotal.innerText= ''
        //     itemCount= 0
        //     price=0
        //     subTimesQty = 0
        //     tax = 0
        //     totalValue= 0
        //     totalValue.innerText= '0.00'
            
        // })
    }
    
    
}

let action = new Pokemonstore;

action.LoadItems();
action.addtoCart();
action.checkout();
action.singleProductPage();

console.log('test')