class AgileFetch {
    constructor({ retries = 3, timeout = 5000, backoffFactor = 200 } = {}) {
        this.retries = retries;
        this.timeout = timeout;
        this.backoffFactor = backoffFactor;
    }

    async fetchWithRetry(url, options = {}, retries = this.retries) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (retries > 0 && (error.name === 'AbortError' || error.name === 'FetchError')) {
                console.warn(`Retrying in ${this.backoffFactor}ms... (${this.retries - retries + 1}/${this.retries})`);
                await new Promise(resolve => setTimeout(resolve, this.backoffFactor));
                return this.fetchWithRetry(url, options, retries - 1);
            }
            throw error;
        }
    }
}

export default AgileFetch;
