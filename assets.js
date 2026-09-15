module.exports = async (req, res) => {
    // Enable complete Cross-Origin Resource Sharing (CORS) for Vercel deployment
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // High-performance operational local document store matching MongoDB document structures
        const enterpriseProjectsDatabase = [
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

        // Successfully return the structural database payload parameters over the network
        return res.status(200).json({ success: true, data: enterpriseProjectsDatabase });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
