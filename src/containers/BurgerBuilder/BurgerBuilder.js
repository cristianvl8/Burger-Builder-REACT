import React, { Component } from 'react'
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
    

class BurgerBuilder extends Component {
   
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
}

    updatePurchaseState(ingredients) {

    
     const sum = Object.keys(ingredients)
         .map(igKey => {
                return ingredients[igKey]
            })
         .reduce((sum, elm) => {
               
            return sum + elm
            }, 0)
        this.setState({ purchaseable: sum > 0 })
        console.log(sum)
    }
    
    addIngredientHandler = type => {
        
        const oldCount = this.state.ingredients[type]
       
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice + priceAddition
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = type => {
 
        const oldCount = this.state.ingredients[type]

        if (oldCount <= 0) {
            return
        } 
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice + priceDeduction
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => this.setState({ purchasing: true })
    purchaseCancelHandler = () => this.setState({ purchasing: false })
    purchaseContinueHandler = () => alert('you continue')
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return (
            <>  
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  price={this.state.totalPrice}
                                purchaseContinued={this.purchaseContinueHandler}
                                purchaseCancelled={this.purchaseCancelHandler}
                    />
                </Modal>    
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    
            />
            </>
 )

    }

}

export default BurgerBuilder