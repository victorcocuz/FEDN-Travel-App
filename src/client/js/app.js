document.getElementById('test').addEventListener('click', testFunction());

function testFunction(e) {
    console.log('this test function is working');
    // Client.logSomething();
};

// function performAction(e) {
//     console.log('this test function is working');
//     Client.logSomething();
// };

export { testFunction }
// export { performAction }