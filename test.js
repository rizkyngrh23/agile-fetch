import TinyFetch from './index.js';
import { isDeepStrictEqual } from 'node:util';

// Define TinyFetch instance with retries and timeout
const tinyFetch = new TinyFetch({ retries: 2, timeout: 2000 });

async function runTests() {
    console.log('🔍 Running TinyFetch Tests...\n');

    // ✅ **Test 1: Successful Request**
    try {
        const response = await tinyFetch.fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1');
        if (response && response.id === 1) {
            console.log('✅ Test 1 Passed: Successful Request');
        } else {
            console.error('❌ Test 1 Failed');
        }
    } catch (error) {
        console.error('❌ Test 1 Failed', error);
    }

    // ✅ **Test 2: Simulate Timeout**
    try {
        await tinyFetch.fetchWithRetry('https://httpstat.us/200?sleep=5000'); // Exceeds 2s timeout
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
        await tinyFetch.fetchWithRetry('https://httpstat.us/500'); // Always fails
        console.error('❌ Test 3 Failed: Should fail after retries');
    } catch (error) {
        console.log('✅ Test 3 Passed: Retry Mechanism Works');
    }

    // ✅ **Test 4: Invalid URL Handling**
    try {
        await tinyFetch.fetchWithRetry('invalid-url');
        console.error('❌ Test 4 Failed: Should fail on invalid URL');
    } catch (error) {
        console.log('✅ Test 4 Passed: Invalid URL Handling Works');
    }

    // ✅ **Test 5: Network Error Simulation**
    try {
        await tinyFetch.fetchWithRetry('http://localhost:9999'); // Unreachable port
        console.error('❌ Test 5 Failed: Should fail on network error');
    } catch (error) {
        console.log('✅ Test 5 Passed: Network Error Handled Correctly');
    }

    console.log('\n🎉 All tests completed!');
}

runTests();
