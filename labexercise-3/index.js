var http = require("http");
const employeeModule = require('./Employee');  

console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method !== 'GET') {
        res.end(JSON.stringify({ "error": http.STATUS_CODES[405] }));
        return;
    }

    if (req.url === '/') {
      
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
    } 
    else if (req.url === '/employee') {
      
        res.end(JSON.stringify(employeeModule.employees));
    } 
    else if (req.url === '/employee/names') {
        
        res.end(JSON.stringify(employeeModule.getEmployeeNames()));
    } 
    else if (req.url === '/employee/totalsalary') {
       
        const totalSalary = employeeModule.getTotalSalary();
        res.end(JSON.stringify({ "total_salary": totalSalary }));
    } 
    else {
        res.end(JSON.stringify({ "error": http.STATUS_CODES[404] }));
    }
});

// Start Server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
