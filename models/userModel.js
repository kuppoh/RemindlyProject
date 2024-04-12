let database = [
    {
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
        role: "admin",
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
        role: "user",
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
        role: "user",
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
        role: "user",
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

const userModel = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email);
        if (user) {
        return user || null;
        }
    },
    findByID: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
        return user || null;
        }
    },
};

const fetch = require('node-fetch');

async function keywordToImage(keyword) {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=VxjNhjLgaDvwvZHzwUhWPweM8WeI4wl9qnuRFi-Ntkc`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
    } 
}

module.exports = { database, userModel, keywordToImage };
