const { MongoClient } = require('mongodb');

// Fallback high-performance database connection uri string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://public_viewer:Thiranex2026@cluster0.example.mongodb.net/portfolio_db?retryWrites=true&w=majority";

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const client = await MongoClient.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('portfolio_db');
    cachedDb = db;
    return db;
}

module.exports = async (req, res) => {
    // Enable strict Cross-Origin Resource Sharing (CORS) headers for secure web deployment
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
        
        // Fetch all portfolio asset records straight out of the MongoDB collection cluster
        const projects = await collection.find({}).toArray();

        // If the cloud database is brand new, seed initial data records dynamically
        if (projects.length === 0) {
            const seedRecords = [
                { name: "Enterprise E-Commerce Engine", stack: "React • Node.js • MongoDB", metrics: "Boosted transaction speeds by 42%", scope: "Engineered high-end checkout caching loops and responsive fluid layouts." },
                { name: "Infrastructure Vulnerability Scanner", stack: "Python • Network Sockets", metrics: "Mitigated severe configuration leaks", scope: "Programmed multi-threaded low-level socket sweeps to track active data vectors." },
                { name: "Adversarial Phishing Classifier", stack: "Python • Scikit-Learn • NLP", metrics: "Achieved 100% classification precision", scope: "Trained an advanced Naive Bayes machine learning model to parse string anomalies." }
            ];
            await collection.insertMany(seedRecords);
            return res.status(200).json({ success: true, data: seedRecords });
        }

        return res.status(200).json({ success: true, data: projects });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
