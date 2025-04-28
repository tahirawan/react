import { createContext, useEffect, useState } from 'react';

export const MealsContext = createContext({
  meals: null,
  orderMeal: (orderData) => {},
});

export function MealsContextProvider({ children }) {
  const [meals, setMeals] = useState();

  useEffect(() => {
    async function loadMeals() {
      const response = await fetch('http://localhost:3000/medals');
      const meals = await response.json();
      setMeals(meals);
    }

    loadMeals();
  }, []);

  async function orderMeal(customerData, cartItems) {
    console.log('Ordering meal...');
    console.log(customerData, cartItems);
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          customer: customerData,
          items: cartItems,
        },
      }),
    });
    console.log(response);
    if (!response.ok) {
      return;
    }

    // const savedOpinion = await response.json();
    // setMeals((prevMeals) => [savedOpinion, ...prevMeals]);
  }


  const contextValue = {
    meals: meals,
    orderMeal,
  };

  return <MealsContext value={contextValue}>{children}</MealsContext>;
}
