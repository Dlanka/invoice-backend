// src/utils/query.js

/**
 * Parse a comma-separated query string into an array
 * @param {string} queryParam - Example: "tenant,stats,metadata"
 * @returns {string[]} Example: ["tenant", "stats", "metadata"]
 */
function parseIncludeQuery(queryParam) {
  return queryParam ? queryParam.split(",").map((s) => s.trim()) : [];
}

module.exports = { parseIncludeQuery };
