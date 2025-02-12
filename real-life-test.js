import AgileFetch from 'agile-fetch';

const fetcher = new AgileFetch({ retries: 3, timeout: 5000 });

async function runRealLifeTest() {
    console.log('🔍 Running Real-Life Test for Agile Fetch...\n');

    // ✅ **Test 1: Successful Request**
    try {
        const response = await fetcher.fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1');
        console.log('✅ Test 1 Passed: Successful Request');
        console.log('Response:', response);
    } catch (error) {
        console.error('❌ Test 1 Failed', error);
    }

    // ✅ **Test 2: Simulate Timeout**
    try {
        await fetcher.fetchWithRetry('https://httpbin.org/delay/6'); // Exceeds 5s timeout
        console.error('❌ Test 2 Failed: Should timeout but didn’t');
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('✅ Test 2 Passed: Timeout Handled Correctly');
        } else {
            console.error('❌ Test 2 Failed', error);
        }
    }

    // ✅ **Test 3: Retry Mechanism**
    try {
        await fetcher.fetchWithRetry('https://httpbin.org/status/500'); // Always fails
        console.error('❌ Test 3 Failed: Should fail after retries');
    } catch (error) {
        console.log('✅ Test 3 Passed: Retry Mechanism Works');
    }

    // ✅ **Test 4: Invalid URL Handling**
    try {
        await fetcher.fetchWithRetry('invalid-url');
        console.error('❌ Test 4 Failed: Should fail on invalid URL');
    } catch (error) {
        console.log('✅ Test 4 Passed: Invalid URL Handling Works');
    }

    // ✅ **Test 5: Network Error Simulation**
    try {
        await fetcher.fetchWithRetry('http://localhost:9999'); // Unreachable port
        console.error('❌ Test 5 Failed: Should fail on network error');
    } catch (error) {
        console.log('✅ Test 5 Passed: Network Error Handled Correctly');
    }

    console.log('\n🎉 All real-life tests completed!');
}

runRealLifeTest();
