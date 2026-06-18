import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

// connectToDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on: http://localhost:${PORT}`);
});