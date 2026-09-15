const { MongoClient } = require('mongodb');

// Your real, verified MongoDB Atlas connection string mapping directly into the database engine
const MONGODB_URI = "mongodb+srv://Vercel-Admin-atlas-fulvous-magnet:7LURrPiUh9qHKEOL@atlas-fulvous-magnet.4dwucd2.mongodb.net/portfolio_db?retryWrites=true&w=majority";

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    
    // Connect securely to your live remote database instance cluster
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('portfolio_db'); // Sets up an exact database target node named portfolio_db
    cachedDb = db;
    return db;
}

module.exports = async (req, res) => {
    // Cross-Origin Resource Sharing (CORS) security header configurations
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('projects');
        
        let projects = await collection.find({}).toArray();

        // Self-seeding automated execution loop if your collection cluster is completely fresh
        if (projects.length === 0) {
            const seedRecords = [
                { 
                    name: "Enterprise E-Commerce Engine", 
                    stack: "React • Node.js • MongoDB", 
                    metrics: "Boosted transaction speeds by 42%", 
                    scope: "Engineered high-end checkout caching loops and responsive fluid layouts." 
                },
                { 
                    name: "Infrastructure Vulnerability Scanner", 
                    stack: "Python • Network Sockets", 
                    metrics: "Mitigated severe configuration leaks", 
                    scope: "Programmed multi-threaded low-level socket sweeps to track active data vectors." 
                },
                { 
                    name: "Adversarial Phishing Classifier", 
                    stack: "Python • Scikit-Learn • NLP", 
                    metrics: "Achieved 100% classification precision", 
                    scope: "Trained an advanced Naive Bayes machine learning model to parse string anomalies." 
                }
            ];
            await collection.insertMany(seedRecords);
            projects = seedRecords;
        }

        return res.status(200).json({ success: true, data: projects });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
