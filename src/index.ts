import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`apiOrder-Services - Server listen on port http://localhost:${port}`);
});

 