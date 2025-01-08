require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://online-group-study-56c30.web.app',
        'https://online-group-study-56c30.firebaseapp.com'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    }
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }
        req.user = decoded;
        next();
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jtbwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
        // Database and Database Collection
        const database = client.db('AssignmentsDB');
        const assignmentCollection = database.collection('all-assignments');
        const submittedAssignmentCollection = database.collection('submitted-assignments');
        const completedAssignmentCollection = database.collection('completed-assignments');


        // Auth Related APIs
        // Create Token
        app.post('/login', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5h' });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ message: 'Login successful' })
        })
        // Clear Token
        app.post('/logout', async (req, res) => {
            res
                .clearCookie('token', {
                    maxAge: 0,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ message: 'Logged out successfully' })
        })


        // Open APIs 
        app.get('/totalAssignments', async (req, res) => {
            const assignments = await assignmentCollection.estimatedDocumentCount();
            res.send({ assignments })
        })
        app.get('/all-assignments', async (req, res) => {
            const filteredData = req.query.filteredData;
            const search = req.query.search;
            const sort = req.query.sort;
            const page = parseInt(req.query.page)
            const size = parseInt(req.query.size)
            let query = {};
            let options = {};
            if (filteredData) {
                query = { difficulty_level: filteredData }
            }
            if (search) {
                query = { title: { $regex: search, $options: 'i' } }
            }
            if (sort) {
                options = { sort: { marks: sort === 'asc' ? 1 : -1 } }
            }
            const cursor = assignmentCollection.find(query, options)
                .skip(page * size)
                .limit(size)
            const result = await cursor.toArray()
            res.send(result)
        })


        // Private APIs
        app.get('/my-submitted-assignments', verifyToken, async (req, res) => {
            const result = await submittedAssignmentCollection.find().toArray();
            res.send(result)
        })
        app.get('/my-submitted-assignments/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email }
            if (req.user.email !== req.params.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            }
            const result = await completedAssignmentCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/all-assignments/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await assignmentCollection.findOne(query)
            res.send(result)
        })
        app.get('/assignmentDetails/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await assignmentCollection.findOne(query);
            res.send(result)
        })
        app.post('/all-assignments', verifyToken, async (req, res) => {
            const assignment = req.body;
            const result = await assignmentCollection.insertOne(assignment);
            res.send(result)
        })
        app.post('/submitted-assignments', verifyToken, async (req, res) => {
            const assignment = req.body;
            const query = { email: assignment.email, assignment_id: assignment.assignment_id }
            const isAlreadyExist = await submittedAssignmentCollection.findOne(query);
            if (isAlreadyExist) {
                return res.status(400).send('You have already submitted this assignment')
            }
            const result = await submittedAssignmentCollection.insertOne(assignment);
            res.send(result)
        })
        app.post('/completed-assignments', verifyToken, async (req, res) => {
            const assignment = req.body;
            const query = { email: assignment.email, assignment_id: assignment.assignment_id }
            const isAlreadyExist = await completedAssignmentCollection.findOne(query);
            if (isAlreadyExist) {
                return res.status(400).send('You have already Submitted the assignment')
            }
            const result = await completedAssignmentCollection.insertOne(assignment);
            res.send(result)
        })
        app.patch('/submitted-assignments/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const assignment = await submittedAssignmentCollection.findOne(query);
            const myId = assignment.id;
            const filter = { _id: new ObjectId(myId) };
            const data = req.body;
            const updatedDoc = {
                $set: {
                    obtained_marks: data.obtained_marks,
                    feedback: data.feedback,
                    status: data.status,
                }
            }
            const result = await completedAssignmentCollection.updateOne(filter, updatedDoc);
            const deleteDoc = await submittedAssignmentCollection.deleteOne(query)
            res.send(result)
        })
        app.patch('/all-assignments/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const assignment = req.body;
            const updatedDoc = {
                $set: {
                    title: assignment.title,
                    description: assignment.description,
                    marks: assignment.marks,
                    date: assignment.date,
                    thumbnail: assignment.thumbnail,
                    difficulty_level: assignment.difficulty_level,
                }
            }
            const result = await assignmentCollection.updateOne(filter, updatedDoc);
            res.send(result)
        })
        app.delete('/all-assignments/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await assignmentCollection.deleteOne(query)
            res.send(result)
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally { }
}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Running Port is ${port}`)
})


