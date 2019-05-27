import { PubSub } from 'graphql-subscriptions'

//import db from '../../models'
import { debug } from 'util';

export const pubsub = new PubSub()

export default {
    Subscription: {
        greetingSeen: {
            subscribe: () => pubsub.asyncIterator('GREETING_SEEN')
        }
    },
    Query: {
        getGreeting: (parent, args, models) => {
            const greeting = 'Hello from the server!'
            pubsub.publish('GREETING_SEEN', { greetingSeen: greeting })
            return 'Hello from the server!'
        },
        getUsers: async (root, args, context) => {
            const name = await context.db.user.findAll({
                attributes: ['name']
            })

            return name;
        },
        getMenu: async (root, args, context) => {
            //console.log('user = '+JSON.stringify(context.req))
            //console.log("day = "+root+" "+args.day+" "+context)
            const res = await context.db.menu.findAll({
                attributes: ['appetizer', 'protein', 'carb', 'vegetable', 'sides'],
                where: {
                    day: args.day
                }
            })
            console.log("res = " + JSON.stringify(res))

            return res;
        },
        getOrder: async (root, args, context) => {
            const order = await context.db.order.findOne({
                where: { name: args.name, day: args.day },
                attributes: ['appetizer', 'protein', 'carb', 'vegetable', 'sides']
            })
            console.log('order = ' + JSON.stringify(order));
            return order;
        }
    },
    Mutation: {
        makeOrder: async (root, args, context) => {
            /*
            await context.db.order.create({
                name: args.user,
                day: args.day,
                appetizer: args.appetizer,
                protein: args.protein,
                carb: args.carb,
                vegetable: args.vegetable,
                sides: args.sides
            }).then(function (err, other) {
                if (err) {
                    console.log("Make Order error: "+err)
                }
            })*/

            await context.db.sequelize.query(`INSERT INTO orders(day,name,appetizer,protein,carb,vegetable,sides) 
            VALUES('${args.day}','${args.name}','${args.appetizer}','${args.protein}','${args.carb}','${args.vegetable}','${args.sides}')`);
        },
        updateOrder: async (root, args, context) => {
            await context.db.order.update({ appetizer: args.appetizer, protein: args.protein, carb: args.carb, vegetable: args.vegetable, sides: args.sides },
                { where: { name: args.name, day: args.day }, silent: true })
        }
    }

}