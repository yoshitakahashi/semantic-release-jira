/**
 * parses commit body and searches for issue numbers
 *
 * @param {string} body message to parse
 * @param {string[]} [trailerKeys] optional commit trailer keys that are used to extract issue
 * numbers from a commit body. By default, 'Update(s)', 'Resolves(s)' and 'Close(s)' are used.
 * @returns {string[]} array containing issue numbers
 */
const parseCommitBody = function (body, trailerKeys) {
  if (!body) {
    return [];
  }

  const trailerKeysRegex = trailerKeys ? trailerKeys.join('|') : 'updates?|resolves?|closes?';
  const regEx = new RegExp(`((${trailerKeysRegex}):? \"?([A-Z][A-Z0-9_]+\-[0-9]+)\"?)`, 'gi');
  const bodyLines = body.trim().split("\n");
  const lastEmptyLine = bodyLines.lastIndexOf("");

  const matches = bodyLines.slice(lastEmptyLine).join("\n").match(regEx);

  const issues =
    matches !== null
      ? matches.map((match) =>
          match.replace(new RegExp(`\"|${trailerKeysRegex}:? `, 'gi'), "").trim()
        )
      : [];

  return issues;
};

module.exports = parseCommitBody;
