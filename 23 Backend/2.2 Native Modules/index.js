const fs=require("fs");

// fs.writeFile("message.txt", "Hello from NodeJS", (err)=>{
//     if (err) throw err;
//     console.log("File has been written")
// });

fs.writeFileSync("message.txt", "Hello from NodeJS2");

// If read is afte writeFile(), not in its callback, read starts without waiting for commpletion of write. 
// writeFileSync() is synchronous write. 
fs.readFile("./message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});
