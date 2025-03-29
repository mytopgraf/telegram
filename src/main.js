module.exports = async function (context) {
    console.log("Function started");
    
    return {
        status: 200,
        json: { message: "Hello, World!" }
    };
};
