/**
 * Website Stress Test Script
 *
 * This script uses Node.js to perform a stress test on a website by simulating
 * concurrent connections and measuring response times and error rates.
 *
 * Requirements:
 * - Node.js installed
 * - npm packages: axios, commander, cli-progress
 *
 * Usage:
 * node stress-test.js --url https://example.com --users 50 --duration 30
 */

const axios = require("axios");
const { Command } = require("commander");
const cliProgress = require("cli-progress");
const fs = require("fs");

// Configure command line options
const program = new Command();
program
  .requiredOption("--url <url>", "Target URL to stress test")
  .option("--users <number>", "Number of concurrent users", parseInt, 10)
  .option("--duration <seconds>", "Test duration in seconds", parseInt, 60)
  .option(
    "--ramp-up <seconds>",
    "Gradually ramp up users over this many seconds",
    parseInt,
    0
  )
  .option(
    "--delay <ms>",
    "Delay between requests for each user in milliseconds",
    parseInt,
    1000
  )
  .option("--timeout <ms>", "Request timeout in milliseconds", parseInt, 5000)
  .option("--output <file>", "Save results to JSON file")
  .option("--method <method>", "HTTP method (GET, POST, etc.)", "GET")
  .option("--headers <headers>", "HTTP headers in JSON format", "{}")
  .option("--body <body>", "Request body for POST/PUT requests", "");

program.parse(process.argv);
const options = program.opts();

// Create results storage
const results = {
  url: options.url,
  testConfig: {
    users: options.users,
    duration: options.duration,
    rampUp: options.rampUp,
    delay: options.delay,
    timeout: options.timeout,
    method: options.method,
  },
  startTime: new Date(),
  endTime: null,
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimesMs: [],
  statusCodes: {},
  errors: {},
};

// Progress bar
const multibar = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    hideCursor: true,
    format: "{bar} {percentage}% | {value}/{total} | {title}",
  },
  cliProgress.Presets.shades_classic
);

const durationBar = multibar.create(options.duration, 0, {
  title: "Test Duration",
});
const requestBar = multibar.create(100, 0, { title: "Requests" });

// Update duration progress bar
const durationTimer = setInterval(() => {
  const elapsedSeconds = Math.floor((Date.now() - results.startTime) / 1000);
  durationBar.update(Math.min(elapsedSeconds, options.duration));

  if (elapsedSeconds >= options.duration) {
    clearInterval(durationTimer);
    stopTest();
  }
}, 1000);

// Calculate how many users to add in ramp-up mode
const getUserCount = (elapsedTime) => {
  if (!options.rampUp || options.rampUp <= 0) {
    return options.users;
  }

  // Calculate based on elapsed time and ramp-up period
  const rampUpPercent = Math.min(elapsedTime / (options.rampUp * 1000), 1);
  return Math.floor(options.users * rampUpPercent);
};

// Make a single request
const makeRequest = async (userId) => {
  try {
    const startTime = Date.now();

    const requestConfig = {
      timeout: options.timeout,
      headers: JSON.parse(options.headers),
    };

    if (
      options.body &&
      ["POST", "PUT", "PATCH"].includes(options.method.toUpperCase())
    ) {
      requestConfig.data = options.body;
    }

    const response = await axios({
      method: options.method,
      url: options.url,
      ...requestConfig,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Record results
    results.totalRequests++;
    results.successfulRequests++;
    results.responseTimesMs.push(responseTime);

    const statusCode = response.status;
    results.statusCodes[statusCode] =
      (results.statusCodes[statusCode] || 0) + 1;

    // Update progress bar
    requestBar.update(
      Math.min(
        Math.floor(
          (results.totalRequests / (options.users * options.duration)) * 100
        ),
        100
      )
    );

    return responseTime;
  } catch (error) {
    results.totalRequests++;
    results.failedRequests++;

    let errorKey = "Unknown";
    if (error.response) {
      // The request was made and the server responded with an error status code
      const statusCode = error.response.status;
      results.statusCodes[statusCode] =
        (results.statusCodes[statusCode] || 0) + 1;
      errorKey = `HTTP ${statusCode}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorKey = "No Response";
    } else {
      // Something happened in setting up the request
      errorKey = "Request Setup Error";
    }

    results.errors[errorKey] = (results.errors[errorKey] || 0) + 1;

    // Update progress bar
    requestBar.update(
      Math.min(
        Math.floor(
          (results.totalRequests / (options.users * options.duration)) * 100
        ),
        100
      )
    );

    return null;
  }
};

// Simulate a user making repeated requests
const simulateUser = async (userId) => {
  while (isRunning) {
    await makeRequest(userId);

    // Delay between requests
    if (options.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
  }
};

// User simulator management
let isRunning = true;
let activeUsers = 0;
const userIntervalCheck = 100; // Check for adding users every 100ms

// Start the test
const runTest = async () => {
  console.log(`\nStarting stress test for ${options.url}`);
  console.log(
    `Simulating up to ${options.users} concurrent users for ${options.duration} seconds`
  );
  if (options.rampUp > 0) {
    console.log(`Gradually ramping up users over ${options.rampUp} seconds`);
  }
  console.log("\n");

  // Start user simulation based on ramp-up settings
  const userInterval = setInterval(() => {
    const elapsedMs = Date.now() - results.startTime.getTime();
    const targetUsers = getUserCount(elapsedMs);

    // Add new users if needed
    while (activeUsers < targetUsers) {
      activeUsers++;
      simulateUser(activeUsers);
    }

    // Stop adding users if we've reached the end of the test or maximum users
    if (activeUsers >= options.users || elapsedMs >= options.duration * 1000) {
      clearInterval(userInterval);
    }
  }, userIntervalCheck);
};

// Stop the test and display results
const stopTest = async () => {
  isRunning = false;
  results.endTime = new Date();

  // Wait a bit for in-flight requests to complete
  await new Promise((resolve) => setTimeout(resolve, 1000));

  multibar.stop();

  // Calculate statistics
  const totalDurationMs = results.endTime - results.startTime;
  const avgResponseTime =
    results.responseTimesMs.length > 0
      ? results.responseTimesMs.reduce((sum, time) => sum + time, 0) /
        results.responseTimesMs.length
      : 0;

  const sortedResponseTimes = [...results.responseTimesMs].sort(
    (a, b) => a - b
  );
  const medianResponseTime =
    sortedResponseTimes.length > 0
      ? sortedResponseTimes[Math.floor(sortedResponseTimes.length / 2)]
      : 0;

  const p95ResponseTime =
    sortedResponseTimes.length > 0
      ? sortedResponseTimes[Math.floor(sortedResponseTimes.length * 0.95)]
      : 0;

  const requestsPerSecond = results.totalRequests / (totalDurationMs / 1000);

  // Add calculated metrics to results
  results.metrics = {
    totalDurationMs,
    avgResponseTimeMs: avgResponseTime,
    medianResponseTimeMs: medianResponseTime,
    p95ResponseTimeMs: p95ResponseTime,
    requestsPerSecond,
    successRate:
      results.totalRequests > 0
        ? (results.successfulRequests / results.totalRequests) * 100
        : 0,
  };

  // Display results
  console.log("\n\n========== TEST RESULTS ==========");
  console.log(`URL: ${results.url}`);
  console.log(`Duration: ${totalDurationMs / 1000} seconds`);
  console.log(`Concurrent Users: ${options.users}`);
  console.log(`Total Requests: ${results.totalRequests}`);
  console.log(
    `Successful Requests: ${
      results.successfulRequests
    } (${results.metrics.successRate.toFixed(2)}%)`
  );
  console.log(`Failed Requests: ${results.failedRequests}`);
  console.log(`Requests Per Second: ${requestsPerSecond.toFixed(2)}`);
  console.log("\nResponse Times:");
  console.log(`  Average: ${avgResponseTime.toFixed(2)} ms`);
  console.log(`  Median: ${medianResponseTime} ms`);
  console.log(`  95th Percentile: ${p95ResponseTime} ms`);

  console.log("\nStatus Code Distribution:");
  Object.entries(results.statusCodes)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([code, count]) => {
      console.log(
        `  ${code}: ${count} (${((count / results.totalRequests) * 100).toFixed(
          2
        )}%)`
      );
    });

  if (Object.keys(results.errors).length > 0) {
    console.log("\nError Distribution:");
    Object.entries(results.errors)
      .sort(([, a], [, b]) => b - a)
      .forEach(([error, count]) => {
        console.log(
          `  ${error}: ${count} (${(
            (count / results.totalRequests) *
            100
          ).toFixed(2)}%)`
        );
      });
  }

  // Save results to file if specified
  if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
    console.log(`\nDetailed results saved to ${options.output}`);
  }

  process.exit(0);
};

// Handle interruptions
process.on("SIGINT", () => {
  console.log("\nTest interrupted by user");
  stopTest();
});

// Start the test
runTest();
