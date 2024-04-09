// let Database = {
//   cindy: {
//     reminders: [
//       {
//         id: 1,
//         title: "Grocery shopping",
//         description: "Buy milk and bread from safeway",
//         completed: false,
//       }, 
//     ],
//   },
// };

// same formatting as the one from passport.js from userModel.js
let database = [
    {
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
        reminders: [
            {
                id: 1,
                title: "Car Shopping",
                description: "Buy the Koenisegg Gemera (too poor)",
                completed: false,
            },
            {
                id: 2,
                title: "Buy Ingredients for Pho",
                description: "Buy noodles, meat, etc.",
                completed: false,
            }
        ]
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "johnny123@gmail.com",
        password: "johnny123!",
        reminders: [
            {
                id: 1, 
                title: "Buy Headphones at BestBuy",
                description: "Buy the Sony XM4's",
                completed: true,
            },
            {
                id: 2, 
                title: "Buy a Nintedo Switch at Costco",
                description: "Get Nintedo Switch that is on sale",
                completed: false,
            }
        ]
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "jonathan123@gmail.com",
        password: "jonathan123!",
        reminders: [
            {
                id: 1,
                title: "Costco Shopping",
                description: "Buy some groceries, snacks, drinks.",
                completed: false,
            },
            {
                id: 2,
                title: "Watch tutorial on NodeJS",
                description: "Watch the tutorial saved in YouTube playlist.",
                completed: true,
            },
            {
                id: 3,
                title: "Finish Flask Project",
                description: "Finish python flask project, and fix formatting + CSS.",
                completed: true,
            }
        ]
    },
    {
        id: 4,
        name: "Cindy Fake",
        email: "cindyfakemail@gmail.com",
        password: "cindy123!",
        reminders: [
            {
                id: 1,
                title: "Grocery shopping",
                description: "Buy milk and bread from safeway",
                completed: false,
            },
        ]
    }
];


module.exports = { database };
