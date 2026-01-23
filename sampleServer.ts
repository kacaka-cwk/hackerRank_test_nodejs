import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/testAPI", (req: Request, res: Response) => {
    const testResponse = {
        testField1: "Test 1",
        testField2: "Test2",
        testNumber: 3,
    }
  res.json(testResponse);
});

//---------Create Sample call for testing here------






app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





