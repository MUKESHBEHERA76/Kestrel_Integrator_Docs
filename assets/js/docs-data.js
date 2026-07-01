const p = (name, description) => ({ name, description });
const util = ({ name, aliases = [], summary, params = [], example = '', notes = '', output = '' }) => ({
  name,
  aliases,
  summary,
  params,
  example,
  notes,
  output
});

const stringUtilities = [
  util({
    name: 'string:concat',
    aliases: ['String Concatenate'],
    summary: 'Join two string inputs into one value.',
    params: [p('inString1 / left', 'Left-side text input.'), p('inString2 / right', 'Right-side text input.')],
    example: 'Use it to build message lines, keys, or labels from two separate values.',
    output: 'Merged text.'
  }),
  util({
    name: 'string:replace',
    summary: 'Replace one substring with another.',
    params: [p('value', 'Source string.'), p('from', 'Text to replace.'), p('to', 'Replacement text.')],
    example: 'Useful when normalizing codes, labels, and separators.',
    output: 'Updated string.'
  }),
  util({
    name: 'string:substring',
    summary: 'Extract a slice of text by start and end index.',
    params: [p('inString / value', 'Source string.'), p('beginIndex / start', 'Zero-based starting position.'), p('endIndex / end', 'Exclusive end position.')],
    example: 'Great for short IDs, prefixes, suffixes, and token parsing.',
    output: 'Substring.'
  }),
  util({
    name: 'string:padLeft',
    summary: 'Pad text on the left to a target length.',
    params: [p('inString / value', 'Source string.'), p('length / totalLength', 'Desired total length.'), p('padCharacter / padChar', 'Padding character.')],
    example: 'Use for fixed-width identifiers or aligned display output.',
    output: 'Left-padded string.'
  }),
  util({
    name: 'string:padRight',
    summary: 'Pad text on the right to a target length.',
    params: [p('inString / value', 'Source string.'), p('length / totalLength', 'Desired total length.'), p('padCharacter / padChar', 'Padding character.')],
    example: 'Useful for table-style text formatting and fixed-length tokens.',
    output: 'Right-padded string.'
  }),
  util({
    name: 'string:tokenize',
    summary: 'Split text into a list using a delimiter.',
    params: [p('inString / value', 'Source text.'), p('delimiter / delimiters', 'Split token. Default is comma.')],
    example: 'Split CSV-like text into array items for list processing.',
    output: 'List of tokens.'
  }),
  util({
    name: 'string:base64Encode',
    summary: 'Encode text to Base64.',
    params: [p('value', 'Text to encode.')],
    example: 'Use before sending binary-safe text through a channel.',
    output: 'Base64 text.'
  }),
  util({
    name: 'string:base64Decode',
    summary: 'Decode Base64 text back to plain text.',
    params: [p('value', 'Base64 string.')],
    example: 'Use to recover original text from encoded payloads.',
    output: 'Decoded string.'
  }),
  util({
    name: 'string:isNumber',
    summary: 'Check whether the value looks numeric.',
    params: [p('inString / value', 'Input text to validate.')],
    example: 'Use in branch logic before converting to numbers.',
    output: 'Boolean-like result.'
  }),
  util({
    name: 'string:length',
    summary: 'Return the character length of the input.',
    params: [p('inString / value', 'Input text.')],
    example: 'Useful for validation and size checks.',
    output: 'Length number.'
  }),
  util({
    name: 'string:indexOf',
    summary: 'Find the position of a substring.',
    params: [p('inString / value', 'Source text.'), p('searchString / search', 'Target fragment.'), p('startIndex / start', 'Optional start offset.')],
    example: 'Use to locate separators, markers, and tokens.',
    output: 'Index number.'
  }),
  util({
    name: 'string:trim',
    aliases: ['string:trie'],
    summary: 'Trim surrounding whitespace.',
    params: [p('value', 'Text to clean.')],
    example: 'Use before comparing or storing user-entered values.',
    output: 'Trimmed string.'
  }),
  util({
    name: 'string:toUpper',
    summary: 'Convert text to uppercase.',
    params: [p('value', 'Text to transform.')],
    example: 'Normalize codes, states, or identifiers.',
    output: 'Uppercase string.'
  }),
  util({
    name: 'string:toLower',
    aliases: ['string:tolower'],
    summary: 'Convert text to lowercase.',
    params: [p('value', 'Text to transform.')],
    example: 'Normalize keys, emails, and search terms.',
    output: 'Lowercase string.'
  }),
  util({
    name: 'string:substitutePipelineVariables',
    summary: 'Replace pipeline tokens inside text with live values.',
    params: [p('value', 'Template string that can contain pipeline placeholders.')],
    example: 'Use inside mail, path, SQL, or payload templates.',
    output: 'Resolved text.'
  }),
  util({
    name: 'UUID Generator',
    aliases: ['utility:uuid'],
    summary: 'Generate a new UUID value.',
    params: [],
    example: 'Use for unique IDs, correlation IDs, and runtime keys.',
    output: 'Random UUID.'
  })
];

const mathUtilities = [
  util({
    name: 'math:addInts',
    summary: 'Add two integers.',
    params: [],
    example: 'Use for counters and numeric sums.',
    output: 'Integer sum.'
  }),
  util({
    name: 'math:addFloats',
    aliases: ['math:addObjects'],
    summary: 'Add two numeric values with decimal support.',
    params: [],
    example: 'Use for pricing, totals, and score calculations.',
    output: 'Numeric sum.'
  }),
  util({
    name: 'math:addIntList',
    summary: 'Add a list of integers.',
    params: [],
    example: 'Useful when input comes as an array of numbers.',
    output: 'Integer sum.'
  }),
  util({
    name: 'math:addFloatList',
    summary: 'Add a list of decimal numbers.',
    params: [],
    example: 'Useful for aggregating monetary values or measurements.',
    output: 'Decimal sum.'
  }),
  util({
    name: 'math:subtractInts',
    summary: 'Subtract one integer from another.',
    params: [p('num1 / left', 'Minuend.'), p('num2 / right', 'Subtrahend.')],
    example: 'Use for remaining counts or delta calculations.',
    output: 'Integer difference.'
  }),
  util({
    name: 'math:subtractFloats',
    aliases: ['math:subtractObjects'],
    summary: 'Subtract one numeric value from another.',
    params: [p('num1 / left', 'First value.'), p('num2 / right', 'Second value.')],
    example: 'Use for balance changes and floating-point deltas.',
    output: 'Numeric difference.'
  }),
  util({
    name: 'math:multiplyInts',
    summary: 'Multiply two integers.',
    params: [],
    example: 'Use for batch totals or repeat counts.',
    output: 'Integer product.'
  }),
  util({
    name: 'math:multiplyFloats',
    aliases: ['math:multiplyObjects'],
    summary: 'Multiply two numeric values with decimal support.',
    params: [],
    example: 'Useful for taxes, discounts, and percentages.',
    output: 'Numeric product.'
  }),
  util({
    name: 'math:multiplyIntList',
    summary: 'Multiply a list of integers.',
    params: [],
    example: 'Use for chained multipliers or combined scaling.',
    output: 'Integer product.'
  }),
  util({
    name: 'math:multiplyFloatList',
    summary: 'Multiply a list of decimal values.',
    params: [],
    example: 'Useful for scientific and financial calculations.',
    output: 'Decimal product.'
  }),
  util({
    name: 'math:divideInts',
    summary: 'Divide one integer by another.',
    params: [p('num1 / left', 'Dividend.'), p('num2 / right', 'Divisor.')],
    example: 'Use for allocation or ratio calculations.',
    output: 'Integer division result.'
  }),
  util({
    name: 'math:divideFloats',
    summary: 'Divide one numeric value by another.',
    params: [p('num1 / left', 'Dividend.'), p('num2 / right', 'Divisor.'), p('precision', 'Decimal precision.')],
    example: 'Use when the result needs to be rounded to a precise decimal.',
    output: 'Decimal quotient.'
  }),
  util({
    name: 'math:roundNumber',
    summary: 'Round a number to the requested precision.',
    params: [p('num / value', 'Input number.'), p('numberOfDigits', 'Digits to keep.'), p('roundingMode', 'Optional rounding mode.')],
    example: 'Use to clean monetary or measurement results before display.',
    output: 'Rounded number.'
  }),
  util({
    name: 'math:absoluteValue',
    summary: 'Return the absolute value of a number.',
    params: [p('num / value', 'Input number.')],
    example: 'Use to remove the sign from a delta or distance.',
    output: 'Absolute number.'
  }),
  util({
    name: 'math:max',
    summary: 'Select the highest numeric value.',
    params: [],
    example: 'Use in comparison or threshold logic.',
    output: 'Maximum number.'
  }),
  util({
    name: 'math:min',
    summary: 'Select the lowest numeric value.',
    params: [],
    example: 'Use in comparison or threshold logic.',
    output: 'Minimum number.'
  }),
  util({
    name: 'math:toNumber',
    summary: 'Convert text or value to a number.',
    params: [p('value', 'Value to convert.')],
    example: 'Use before arithmetic when the input arrives as text.',
    output: 'Numeric value.'
  }),
  util({
    name: 'math:randomDouble',
    summary: 'Generate a random decimal number.',
    params: [],
    example: 'Useful for demos, sampling, and randomized test data.',
    output: 'Random decimal.'
  })
];

const dateUtilities = [
  util({
    name: 'date:getCurrentDate',
    aliases: ['pub.date:getCurrentDate'],
    summary: 'Get the current date as a date value.',
    params: [p('timeZone / timezone / zoneId', 'Optional time zone. Defaults to UTC.')],
    example: 'Use for current date stamps in the desired zone.',
    output: 'Date value.'
  }),
  util({
    name: 'date:getCurrentDateString',
    aliases: ['pub.date:getCurrentDateString'],
    summary: 'Get the current date as formatted text.',
    params: [p('timeZone / timezone / zoneId', 'Optional time zone.'), p('format', 'Optional date pattern.')],
    example: 'Use for audit strings, filenames, or logs.',
    output: 'Formatted date string.'
  }),
  util({
    name: 'date:dateFormat',
    aliases: ['pub.date:dateFormat'],
    summary: 'Format a date value into a string.',
    params: [p('value / date', 'Date input.'), p('inputFormat', 'Input pattern if the source is text.'), p('outputFormat / format', 'Output pattern.')],
    example: 'Use when converting one date string layout to another.',
    output: 'Formatted date string.'
  }),
  util({
    name: 'date:dateTimeFormat',
    aliases: ['pub.date:dateTimeFormat'],
    summary: 'Format a date-time value into a string.',
    params: [p('value / date', 'Date-time input.'), p('inputFormat', 'Optional input pattern.'), p('outputFormat / format', 'Output pattern.')],
    example: 'Use for human-readable timestamps.',
    output: 'Formatted date-time string.'
  }),
  util({
    name: 'date:findDateDifference',
    aliases: ['pub.date:findDateDifference'],
    summary: 'Calculate the difference between two dates.',
    params: [p('startDate / fromDate', 'Start date.'), p('endDate / toDate', 'End date.'), p('unit', 'days, hours, minutes, seconds, etc.')],
    example: 'Use to calculate elapsed time or SLA windows.',
    output: 'Difference value.'
  }),
  util({
    name: 'date:calculateDateDifference',
    aliases: ['pub.date:calculateDateDifference'],
    summary: 'Calculate a date difference with configurable output.',
    params: [p('startDate / fromDate', 'First date.'), p('endDate / toDate', 'Second date.'), p('unit', 'Difference unit.')],
    example: 'Use when you need a duration expressed in a chosen unit.',
    output: 'Difference value.'
  }),
  util({
    name: 'date:incrementDate',
    aliases: ['pub.date:incrementDate'],
    summary: 'Add or subtract time from a date.',
    params: [p('value', 'Date to adjust.'), p('unit', 'days, hours, minutes, months, etc.'), p('amount', 'Amount to add or subtract.')],
    example: 'Use for due dates, schedule offsets, and expiry calculation.',
    output: 'Adjusted date value.'
  })
];

const jsonUtilities = [
  util({
    name: 'json:jsonToDocument',
    summary: 'Parse JSON text into a structured document.',
    params: [p('value', 'JSON string.')],
    example: 'Use before mapping JSON fields in a pipeline.',
    output: 'Document object.'
  }),
  util({
    name: 'json:jsonStringToDocument',
    summary: 'Parse a JSON string into a document structure.',
    params: [p('value', 'JSON string.')],
    example: 'Use when the payload arrives as stringified JSON.',
    output: 'Document object.'
  }),
  util({
    name: 'json:jsonToDoc',
    summary: 'Convert JSON into a document shell suitable for mapping.',
    params: [],
    example: 'Use for document-based flows that expect nested structures.',
    output: 'Document object.'
  }),
  util({
    name: 'json:documentToJSON',
    summary: 'Serialize a document into JSON text.',
    params: [p('value', 'Document value.'), p('pretty', 'Set to true for pretty output.')],
    example: 'Use when sending pipeline data to APIs or files.',
    output: 'JSON string.'
  }),
  util({
    name: 'json:jsonToXmlConverter',
    summary: 'Convert JSON text into XML text.',
    params: [],
    example: 'Use when a downstream step only accepts XML.',
    output: 'XML string.'
  })
];

const xmlUtilities = [
  util({
    name: 'xml:xmlToDoc',
    summary: 'Parse XML into a document structure.',
    params: [],
    example: 'Use when you need the XML tree in mapping-friendly form.',
    output: 'Document object.'
  }),
  util({
    name: 'xml:xmlNodeToDocument',
    summary: 'Convert an XML node into a document.',
    params: [p('value', 'XML node or XML string.')],
    example: 'Use before working with nested XML structures in a pipeline.',
    output: 'Document object.'
  }),
  util({
    name: 'xml:xmlStringToXMLNode',
    summary: 'Pass through or convert XML text to an XML node.',
    params: [p('value', 'XML text.')],
    example: 'Use when an XML parser stage expects a node object.',
    output: 'XML node.'
  }),
  util({
    name: 'xml:documentToXMLString',
    summary: 'Serialize a document into XML text.',
    params: [p('value', 'Document value.'), p('encoding', 'Encode text nodes when true.')],
    example: 'Use when emitting XML to a file or external service.',
    output: 'XML string.'
  }),
  util({
    name: 'xml:queryXMLNode',
    summary: 'Query an XML node and return the selected value.',
    params: [p('value', 'XML node/document.')],
    example: 'Use to pull a specific node value from a larger tree.',
    output: 'Selected value.'
  }),
  util({
    name: 'xml:xmlToJsonConverter',
    summary: 'Convert XML into JSON text.',
    params: [],
    example: 'Use when a JSON consumer needs XML content.',
    output: 'JSON string.'
  })
];

const hashtableUtilities = [
  util({
    name: 'hashtable:createHashtable',
    summary: 'Create an empty hashtable.',
    params: [],
    example: 'Use as a scratchpad for keyed runtime values.',
    output: 'Empty hashtable.'
  }),
  util({
    name: 'hashtable:put',
    summary: 'Store a value under a key in a hashtable.',
    params: [p('hashtable', 'Target hashtable.'), p('key', 'Key to write.'), p('value', 'Value to store.')],
    example: 'Use to collect runtime state across steps.',
    output: 'Updated hashtable.'
  }),
  util({
    name: 'hashtable:get',
    summary: 'Read a value by key from a hashtable.',
    params: [p('hashtable', 'Source hashtable.'), p('key', 'Lookup key.')],
    example: 'Use to retrieve previously stored step data.',
    output: 'Stored value.'
  }),
  util({
    name: 'hashtable:containsKey',
    summary: 'Check whether a key exists in a hashtable.',
    params: [p('hashtable', 'Source hashtable.'), p('key', 'Key to check.')],
    example: 'Use before reading optional values.',
    output: 'Boolean-like result.'
  }),
  util({
    name: 'hashtable:listKeys',
    summary: 'List all keys in a hashtable.',
    params: [p('hashtable', 'Source hashtable.')],
    example: 'Useful for inspection and debugging.',
    output: 'Key list.'
  }),
  util({
    name: 'hashtable:remove',
    summary: 'Remove a key from a hashtable.',
    params: [p('hashtable', 'Source hashtable.'), p('key', 'Key to remove.')],
    example: 'Use to clear temporary values you no longer need.',
    output: 'Updated hashtable.'
  }),
  util({
    name: 'hashtable:size',
    summary: 'Return the number of entries in a hashtable.',
    params: [p('hashtable', 'Source hashtable.')],
    example: 'Use to confirm whether the hashtable contains data.',
    output: 'Entry count.'
  })
];

const listUtilities = [
  util({
    name: 'list:appendToStringList',
    summary: 'Append a string value to a list of strings.',
    params: [p('list', 'Input list.'), p('value', 'Text to append.')],
    example: 'Use to build ordered lists for later joining or output.',
    output: 'Updated string list.'
  }),
  util({
    name: 'list:appendToDocumentList',
    summary: 'Append a document value to a list of documents.',
    params: [p('list', 'Input list.'), p('value', 'Document to append.')],
    example: 'Use when accumulating payload records or nodes.',
    output: 'Updated document list.'
  }),
  util({
    name: 'list:sizeOfList',
    summary: 'Count the number of values in a list.',
    params: [],
    example: 'Use for branching or validation when an array may be empty.',
    output: 'List size.'
  })
];

const flatFileUtilities = [
  util({
    name: 'flatFile:convertToString',
    summary: 'Convert a flat-file style value into string output.',
    params: [p('value', 'Incoming flat-file value.')],
    example: 'Use before writing delimited or fixed-width output.',
    output: 'String value.'
  }),
  util({
    name: 'flatFile:convertToValues',
    summary: 'Convert flat-file text into discrete values.',
    params: [p('value', 'Incoming flat-file value.')],
    example: 'Use before mapping columns from a file row.',
    output: 'List or value collection.'
  })
];

const flowUtilities = [
  util({
    name: 'flow:setResponse2',
    summary: 'Set the pipeline response body.',
    params: [p('value', 'Response content.'), p('target', 'Pipeline target path.')],
    example: 'Use to return a custom response from a service or workflow.',
    output: 'Response payload.'
  }),
  util({
    name: 'flow:setResponseCode',
    summary: 'Set the response code for the pipeline output.',
    params: [p('value', 'HTTP status value.'), p('target', 'Target response code path.')],
    example: 'Use to drive success and error HTTP statuses.',
    output: 'Response code value.'
  }),
  util({
    name: 'flow:setResponseHeader',
    summary: 'Set a single response header.',
    params: [p('name', 'Header name.'), p('value', 'Header value.')],
    example: 'Use to add custom headers one at a time.',
    output: 'Updated response header map.'
  }),
  util({
    name: 'flow:setResponseHeaders',
    summary: 'Set the response headers collection.',
    params: [p('value', 'Headers object or collection.'), p('target', 'Pipeline target path.')],
    example: 'Use when you already have a complete header map.',
    output: 'Response headers collection.'
  }),
  util({
    name: 'flow:throwExceptionForRetry',
    summary: 'Throw a controlled exception to trigger retry handling.',
    params: [p('message', 'Exception message.')],
    example: 'Use for transient failures that should be retried by the engine.',
    output: 'Runtime exception.'
  })
];

export const DOCS_TABS = [
  { id: 'overview', label: 'Overview', hint: 'Start with the platform map' },
  { id: 'projects', label: 'Projects', hint: 'Project model and assets' },
  { id: 'connectors', label: 'Connections', hint: 'Reusable connector setup' },
  { id: 'workflow', label: 'Workflow', hint: 'Pipeline and execution flow' },
  { id: 'services', label: 'Services', hint: 'Reusable service design' },
  { id: 'console', label: 'Console', hint: 'SQL and XSLT tools' },
  { id: 'utilities', label: 'Utilities', hint: 'All built-in utilities' },
  { id: 'reference', label: 'Reference', hint: 'Searchable quick lookup' }
];

export const DOCS_SECTIONS = {
  overview: {
    title: 'Introduction',
    intro: 'Kestrel Integrator is built around projects, connectors, workflows, services, and runtime utilities. This docs site is designed as a guided path so users can learn the product step by step.',
    cards: [
      { title: '1. Start with a project', body: 'A project is the top-level container. It holds workflows, reusable services, connections, documents, and monitoring history.' },
      { title: '2. Add connections', body: 'Create reusable database and security connectors first. These are then selected by workflow steps or the SQL console.' },
      { title: '3. Build pipelines', body: 'Use workflow and service canvases to connect step outputs to step inputs, then map pipeline in/out values.' },
      { title: '4. Run and inspect', body: 'Use the Open Console, Scheduler, and Monitor pages to execute, validate, and observe your integrations.' }
    ]
  },
  projects: {
    title: 'Projects',
    intro: 'In Kestrel Integrator, a project is the package of artifacts for one integration solution. It groups workflows, reusable services, APIs, connections, data structures, XSLT aliases, schedulers, and console activity under one project ID.',
    menuItems: [
      { title: 'What is a project?', anchor: 'project-summary' }
    ],
    steps: [
      { title: 'What is a project?', body: 'A project is the workspace package that holds one integration solution in Kestrel Integrator.' },
      { title: 'Why is it needed?', body: 'It keeps the project scope, runtime context, and saved data aligned so workflows, services, and connections do not mix across solutions.' },
      { title: 'Workflow', body: 'The project-scoped orchestration flow that connects triggers, steps, mappings, and runtime logic.' },
      { title: 'ReUsable services', body: 'Shared service flows inside the same project that can be called from multiple workflows.' },
      { title: 'API', body: 'The project-level endpoint layer used to expose or consume business data.' },
      { title: 'Connections', body: 'Reusable database and security connectors that belong to the selected project.' },
      { title: 'Data Structure', body: 'The project-specific input, output, and document shapes used in mappings and design.' },
      { title: 'XSLT Alias', body: 'Alias entries used for transformation logic inside the project workspace.' },
      { title: 'Schedluer', body: 'The scheduler that runs project workflows automatically at the configured time using the project context.' }
    ]
  },
  connectors: {
    title: 'Connections',
    intro: 'Connections are reusable credentials and endpoint definitions. The connection docs cover Snowflake, Postgres, MSSQL, MySql, MariaDB, OracleDB, IBMDB2, and PGP profiles, while the workflow connector pages cover Logger, Data Transformer, Send HttpResponse, Workflow End, CSV Parser, Pipeline Logger, XSLT Transformer, Sleep, Raise Exception, and Multi Transformation.',
    cards: [
      { title: 'Catalog first', body: 'Open the catalog, choose the connector type, then configure host, port, database, username, password, keys, or other required fields.' },
      { title: 'Enable or disable', body: 'Use the On/Off toggle to control which connections are available to the workflow and SQL console runtime.' },
      { title: 'Reuse everywhere', body: 'Once saved, the connection can be picked in workflows, services, the SQL console, and other project tools.' }
    ]
  },
  workflow: {
    title: 'Workflow',
    intro: 'Workflow pipelines connect trigger, action, branch, and utility steps. The workflow connector pages document Logger, Data Transformer, Send HttpResponse, Workflow End, CSV Parser, Pipeline Logger, XSLT Transformer, Sleep, Raise Exception, Multi Transformation, and the reusable database and security connectors used inside the canvas.',
    cards: [
      { title: 'Drag steps onto the canvas', body: 'Choose a connector or utility step, then drop it on the workflow canvas and map the required inputs and outputs.' },
      { title: 'Connector menu', body: 'Workflow > Connector contains the dedicated pages for Logger, Data Transformer, Send HttpResponse, Workflow End, CSV Parser, Pipeline Logger, XSLT Transformer, Sleep, Raise Exception, Multi Transformation, PGP, Snowflake, Postgres, MSSQL, MySql, MariaDB, OracleDB, and IBMDB2.' },
      { title: 'Use pipeline scopes', body: 'Runtime variables follow pipeline scopes like `$pipeline.input`, `$pipeline.output`, `$pipeline.temp`, `$pipeline.system`, and `$pipeline.error`.' },
      { title: 'Inspect executions', body: 'Monitor page cards and execution drilldowns help you see logs, branches, and errors after each run.' }
    ]
  },
  services: {
    title: 'Services',
    intro: 'Reusable services are built with the same mapping approach as workflows, but they are meant to be called from other flows.',
    cards: [
      { title: 'Keep them reusable', body: 'Use services for shared business logic, reusable connectors, and small transformations that multiple workflows can call.' },
      { title: 'Map inputs carefully', body: 'The service input and output panels should reflect the actual data contract so downstream flows stay predictable.' },
      { title: 'Use the utilities panel', body: 'If a step is not a connector, pick from the utility catalog and map the parameters directly from pipeline fields.' }
    ]
  },
  console: {
    title: 'Console',
    intro: 'The Open Console contains SQL Console and XSLT Console. Both are optimized as focused workspaces for single-purpose editing and execution.',
    cards: [
      { title: 'SQL Console', body: 'Select a project and enabled connection, write one statement, confirm execution, and inspect results or history.' },
      { title: 'XSLT Console', body: 'Write XSLT, upload XML, run the transformation, and review output in the result modal.' },
      { title: 'History and results', body: 'Query history stores saved statements and the SQL result modal gives you expandable output for table inspection.' }
    ]
  },
  utilities: {
    title: 'Utilities',
    intro: 'Utilities are the small runtime building blocks that perform string, math, date, list, JSON, XML, hash-table, flat-file, and flow operations.',
    cards: [
      { title: 'Read the parameters', body: 'Each utility card below lists the actual argument keys read by the backend implementation so you can wire the right fields.' },
      { title: 'Use aliases safely', body: 'Some utilities support multiple names or legacy aliases. Prefer the main name unless you need backward compatibility.' },
      { title: 'Start with the purpose', body: 'If you are unsure, search by what you want to do first, then open the utility card to see its inputs and output.' }
    ]
  },
  reference: {
    title: 'Reference',
    intro: 'Use search to jump directly to a utility, tab, or concept. The reference panel below is intentionally compact for quick lookup.',
    cards: [
      { title: 'Search the docs', body: 'Type part of a utility name or parameter name in the top search box, then click Search.' },
      { title: 'Filter by tab', body: 'Use the left rail or the top tabs to jump between documentation sections.' },
      { title: 'Open cards for details', body: 'Most utility entries are collapsible so the page stays readable even with a large catalog.' }
    ]
  }
};

export const UTILITY_GROUPS = [
  { id: 'flow', label: 'Flow', icon: 'workflow', utilities: flowUtilities },
  { id: 'string', label: 'String', icon: 'spark', utilities: stringUtilities },
  { id: 'math', label: 'Math', icon: 'chip', utilities: mathUtilities },
  { id: 'date', label: 'Date', icon: 'document', utilities: dateUtilities },
  { id: 'json', label: 'JSON', icon: 'document', utilities: jsonUtilities },
  { id: 'xml', label: 'XML', icon: 'document', utilities: xmlUtilities },
  { id: 'list', label: 'List', icon: 'projects', utilities: listUtilities },
  { id: 'hashtable', label: 'Hashtable', icon: 'projects', utilities: hashtableUtilities },
  { id: 'flatfile', label: 'Flat File', icon: 'console', utilities: flatFileUtilities }
];

export const APP_COPY = {
  searchEmpty: 'No results match your search.',
  utilityEmpty: 'No utilities matched the current filter.',
  tocEmpty: 'No section content available.'
};
