export default `
    
    type Human {
      name: String!
      age: Int
      country: String
    }
    
    type User {
      name: String!
    }

    type Menu {
      day: String
      appetizer: String
      protein: String
      carb: String
      vegetable: String
      sides: String
    }

    type Order {
      day: String
      name: String
      branch: Int
      appetizer: String
      protein: String
      carb: String
      vegetable: String
      sides: String
    }

    type Query {
      getGreeting: String!
      getUsers: [User]!
      getMenu(day: String!): [Menu]!
      getOrder(name: String!, day: String!): Order 
    }
    
    type Mutation {
      makeOrder (name: String!, day: String!, appetizer: String, protein: String, carb: String, vegetable: String, sides: String): Order
      updateOrder (name: String!, day: String!, appetizer: String, protein: String, carb: String, vegetable: String, sides: String): Order
      SetMenu (day: String!, appetizer: String, protein: String, carb: String, vegetable: String, sides: String): Menu
    }

    type Subscription {
      greetingSeen: String!
    }
    
    schema {
      query: Query
      subscription : Subscription
    }
    
`