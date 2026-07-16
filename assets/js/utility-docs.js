const BOTH_EDITORS = 'Workflow and Reusable Service';
const REUSABLE_ONLY = 'Reusable Service only';

const field = (name, type, description, optional = false) => ({ name, type, description, optional });
const utility = (group, name, summary, use, input, output, example, notes = [], availability = BOTH_EDITORS) => ({
  group, name, summary, use, input, output, example, notes, availability
});

const valueOutput = (description = 'Utility result.') => [field('value', 'String', description)];
const twoNumbers = [
  field('num1', 'String', 'First locale-neutral number.'),
  field('num2', 'String', 'Second locale-neutral number.')
];
const numberList = [field('values', 'String List', 'Numbers to process, each represented as a locale-neutral String.')];
const hashtable = field('hashtable', 'Object', 'A Hashtable previously returned by hashtable:createHashtable.');
const key = field('key', 'String', 'Hashtable key.');

export const utilityDocs = [
  utility(
    'Flow',
    'flow:throwExceptionForRetry',
    'Stops the current path with a retryable RETRY_REQUESTED runtime error.',
    'Use when a temporary condition should activate the configured retry policy rather than be treated as a permanent failure.',
    [field('message', 'String', 'Error message recorded for the retry request.')],
    [],
    { input: 'message=Partner service is temporarily unavailable', output: 'Throws RETRY_REQUESTED; no normal output.' },
    ['The runtime marks this exception as retryable.', 'Without an applicable retry policy, the failure propagates normally.', 'An enclosing TRY/CATCH can intercept the error.']
  ),

  utility('Math', 'math:absoluteValue', 'Returns the non-negative magnitude of a number.', 'Normalize signed amounts or differences before further calculation.', [field('num', 'String', 'Number whose absolute value is required.')], valueOutput('Absolute value as a String.'), { input: 'num=-12.5', output: 'value=12.5' }, ['An empty value is treated as 0.', 'Invalid numeric text raises UTILITY_ERROR.']),
  utility('Math', 'math:addFloatList', 'Adds every floating-point value in a list.', 'Calculate totals for decimal prices, measurements, or percentages.', numberList, valueOutput('Sum as a String.'), { input: 'values=[1.5, 2.25, 3]', output: 'value=6.75' }, ['An empty list returns 0.', 'Values use a period as the decimal separator.']),
  utility('Math', 'math:addFloats', 'Adds two floating-point numbers.', 'Add decimal amounts without converting the pipeline fields first.', twoNumbers, valueOutput('Sum as a String.'), { input: 'num1=10.25, num2=4.5', output: 'value=14.75' }, ['Empty inputs are treated as 0.']),
  utility('Math', 'math:addIntList', 'Adds every integer in a list.', 'Calculate whole-number totals such as item counts.', numberList, valueOutput('Integer sum as a String.'), { input: 'values=[4, 8, 3]', output: 'value=15' }, ['Fractional values are rejected; an exact whole-number decimal such as 4.0 is accepted.', 'An empty list returns 0.']),
  utility('Math', 'math:addInts', 'Adds two integer values.', 'Add counters, quantities, or integer identifiers used arithmetically.', twoNumbers, valueOutput('Integer sum as a String.'), { input: 'num1=10, num2=20', output: 'value=30' }, ['Fractional values are rejected; an exact whole-number decimal such as 10.0 is accepted.', 'Empty inputs are treated as 0.']),
  utility('Math', 'math:addObjects', 'Numeric alias of math:addFloats for scalar objects.', 'Add values arriving as generic scalar pipeline objects when their text form is numeric.', twoNumbers, valueOutput('Floating-point sum as a String.'), { input: 'num1=2.5, num2=7', output: 'value=9.5' }, ['Despite its name, arbitrary documents cannot be added; both values must convert to numbers.']),
  utility('Math', 'math:divideFloats', 'Divides one floating-point number by another.', 'Calculate decimal ratios, rates, or averages.', [
    ...twoNumbers,
    field('precision', 'String', 'Optional number of decimal places; HALF_UP rounding is used.', true)
  ], valueOutput('Quotient as a String.'), { input: 'num1=10, num2=3, precision=2', output: 'value=3.33' }, ['Without precision, floating-point results can be Infinity, -Infinity, or NaN.', 'Use a non-zero divisor when precision is supplied.']),
  utility('Math', 'math:divideInts', 'Performs integer division.', 'Divide whole-number quantities when the remainder is intentionally discarded.', twoNumbers, valueOutput('Integer quotient as a String.'), { input: 'num1=11, num2=4', output: 'value=2' }, ['Division truncates toward zero.', 'Fractional inputs are rejected, while exact whole-number decimals such as 4.0 are accepted.', 'A zero divisor raises UTILITY_ERROR.']),
  utility('Math', 'math:max', 'Returns the largest floating-point value in a list.', 'Find a maximum score, duration, amount, or threshold.', numberList, valueOutput('Maximum value as a String.'), { input: 'values=[4, 9.5, 2]', output: 'value=9.5' }, ['An empty list returns 0.']),
  utility('Math', 'math:min', 'Returns the smallest floating-point value in a list.', 'Find a minimum score, duration, amount, or threshold.', numberList, valueOutput('Minimum value as a String.'), { input: 'values=[4, 9.5, 2]', output: 'value=2' }, ['An empty list returns 0.']),
  utility('Math', 'math:multiplyFloatList', 'Multiplies every floating-point value in a list.', 'Combine decimal factors or calculate a product across a list.', numberList, valueOutput('Product as a String.'), { input: 'values=[1.5, 2, 4]', output: 'value=12' }, ['An empty list returns 1.']),
  utility('Math', 'math:multiplyFloats', 'Multiplies two floating-point numbers.', 'Calculate decimal totals such as quantity multiplied by unit price.', twoNumbers, valueOutput('Product as a String.'), { input: 'num1=3.5, num2=4', output: 'value=14' }, ['Empty inputs are treated as 0.']),
  utility('Math', 'math:multiplyIntList', 'Multiplies every integer in a list.', 'Calculate a whole-number product across several factors.', numberList, valueOutput('Integer product as a String.'), { input: 'values=[2, 3, 4]', output: 'value=24' }, ['An empty list returns 1.', 'Fractional values are rejected; exact whole-number decimals are accepted.']),
  utility('Math', 'math:multiplyInts', 'Multiplies two integer values.', 'Calculate whole-number products such as boxes multiplied by units.', twoNumbers, valueOutput('Integer product as a String.'), { input: 'num1=6, num2=7', output: 'value=42' }, ['Fractional values are rejected; exact whole-number decimals are accepted.']),
  utility('Math', 'math:multiplyObjects', 'Numeric alias of math:multiplyFloats for scalar objects.', 'Multiply generic scalar values whose text representation is numeric.', twoNumbers, valueOutput('Floating-point product as a String.'), { input: 'num1=2.5, num2=4', output: 'value=10' }, ['Arbitrary documents are not supported; both values must convert to numbers.']),
  utility('Math', 'math:randomDouble', 'Generates a pseudorandom value from 0.0 inclusive to 1.0 exclusive.', 'Create sampling values, randomized test branches, or non-security-sensitive variation.', [], [field('number', 'String', 'Generated decimal value.')], { input: 'No input', output: 'number=0.482913...' }, ['Do not use this utility for passwords, tokens, cryptographic keys, or security decisions.']),
  utility('Math', 'math:roundNumber', 'Rounds a decimal number to a requested scale.', 'Apply predictable display or business rounding before mapping a value onward.', [
    field('num', 'String', 'Number to round.'),
    field('numberOfDigits', 'String', 'Digits after the decimal point.'),
    field('roundingMode', 'String', 'RoundHalfUp, RoundUp, RoundDown, RoundCeiling, RoundFloor, RoundHalfDown, or RoundHalfEven.', true)
  ], [field('roundedNumber', 'String', 'Rounded decimal value.')], { input: 'num=1875.23564875, numberOfDigits=5, roundingMode=RoundHalfUp', output: 'roundedNumber=1875.23565' }, ['The default rounding mode is RoundHalfUp.', 'Invalid modes or numbers raise UTILITY_ERROR.']),
  utility('Math', 'math:subtractFloats', 'Subtracts num2 from num1 as floating-point values.', 'Calculate decimal differences such as balance minus payment.', twoNumbers, valueOutput('Difference as a String.'), { input: 'num1=12.5, num2=2.25', output: 'value=10.25' }, ['Empty inputs are treated as 0.']),
  utility('Math', 'math:subtractInts', 'Subtracts num2 from num1 as integers.', 'Calculate whole-number differences such as stock before and after allocation.', twoNumbers, valueOutput('Integer difference as a String.'), { input: 'num1=12, num2=5', output: 'value=7' }, ['Fractional values are rejected; exact whole-number decimals are accepted.']),
  utility('Math', 'math:subtractObjects', 'Numeric alias of math:subtractFloats for scalar objects.', 'Subtract generic scalar pipeline values whose text representation is numeric.', twoNumbers, valueOutput('Floating-point difference as a String.'), { input: 'num1=8.5, num2=3', output: 'value=5.5' }, ['Arbitrary documents are not supported.']),
  utility('Math', 'math:toNumber', 'Parses numeric text into a runtime Number.', 'Validate and convert a scalar before passing it to code or a connector that expects a numeric value.', [field('value', 'String', 'Locale-neutral numeric text.')], [field('value', 'String', 'Parsed numeric scalar; the editor exposes the result as String while runtime stores a Number.')], { input: 'value=42.5', output: 'value=42.5 (runtime Number)' }, ['An empty value becomes 0.', 'Invalid text raises UTILITY_ERROR.']),

  utility('String', 'string:base64Encode', 'Encodes UTF-8 text using standard Base64.', 'Prepare text for a Base64 field, attachment value, or transport format.', [field('value', 'String', 'UTF-8 text to encode.')], valueOutput('Standard Base64 text.'), { input: 'value=Hello Mukesh', output: 'value=SGVsbG8gTXVrZXNo' }, ['Base64 is encoding, not encryption; do not treat it as secret protection.']),
  utility('String', 'string:base64Decode', 'Decodes standard Base64 into UTF-8 text.', 'Read a Base64 text payload before parsing or mapping it.', [field('value', 'String', 'Standard Base64 text.')], valueOutput('Decoded UTF-8 text.'), { input: 'value=SGVsbG8gTXVrZXNo', output: 'value=Hello Mukesh' }, ['Malformed Base64 raises UTILITY_ERROR.', 'Binary data that is not UTF-8 should remain bytes/Base64 instead of being decoded as text.']),
  utility('String', 'string:concat', 'Joins two strings without adding a separator.', 'Build labels, identifiers, URLs, or messages from two values.', [field('inString1', 'String', 'First text.'), field('inString2', 'String', 'Second text.')], valueOutput('Concatenated text.'), { input: 'inString1=Hello, inString2= World', output: 'value=Hello World' }, ['Map a separator explicitly when one is required.', 'Missing values behave as empty strings.']),
  utility('String', 'string:indexOf', 'Finds the first occurrence of a literal substring.', 'Locate a delimiter or marker before extracting part of a value.', [
    field('inString', 'String', 'Text to search.'),
    field('searchString', 'String', 'Literal text to find.'),
    field('startIndex', 'String', 'Zero-based position at which searching begins.', true)
  ], [field('index', 'String', 'Zero-based position, or -1 when not found.')], { input: 'inString=customer:123, searchString=:, startIndex=0', output: 'index=8' }, ['The default startIndex is 0.', 'A negative index raises UTILITY_ERROR.']),
  utility('String', 'string:isNumber', 'Tests whether trimmed text is accepted as a Java double.', 'Validate numeric-looking input before invoking a math utility.', [field('inString', 'String', 'Text to test.')], [field('isNumber', 'String', 'true or false.')], { input: 'inString=42.5', output: 'isNumber=true' }, ['Empty text returns false.', 'This accepts formats supported by Double.parseDouble, including scientific notation.']),
  utility('String', 'string:length', 'Returns the number of UTF-16 characters in a string.', 'Validate maximum length or calculate padding requirements.', [field('inString', 'String', 'Text to measure.')], [field('length', 'String', 'Character-unit count.')], { input: 'inString=Kestrel', output: 'length=7' }, ['Missing input behaves as an empty string.', 'Some emoji can occupy more than one UTF-16 unit.']),
  utility('String', 'string:padLeft', 'Pads the left side of text to a target length.', 'Create fixed-width values or left-pad numbers with zeroes.', [field('inString', 'String', 'Original text.'), field('length', 'String', 'Required total length.'), field('padCharacter', 'String', 'Padding character; only the first character is used.')], valueOutput('Padded text.'), { input: 'inString=42, length=5, padCharacter=0', output: 'value=00042' }, ['Text already at or above the target length is unchanged.', 'Length must be non-negative.']),
  utility('String', 'string:padRight', 'Pads the right side of text to a target length.', 'Create fixed-width records or align a value to a defined width.', [field('inString', 'String', 'Original text.'), field('length', 'String', 'Required total length.'), field('padCharacter', 'String', 'Padding character; only the first character is used.')], valueOutput('Padded text.'), { input: 'inString=AB, length=5, padCharacter=.', output: 'value=AB...' }, ['Text already at or above the target length is unchanged.', 'Length must be non-negative.']),
  utility('String', 'string:replace', 'Replaces every literal occurrence of one string with another.', 'Normalize delimiters, remove known text, or rewrite a fixed token.', [field('value', 'String', 'Original text.'), field('from', 'String', 'Literal text to replace.'), field('to', 'String', 'Replacement text.')], valueOutput('Updated text.'), { input: 'value=A-B-C, from=-, to=/', output: 'value=A/B/C' }, ['This is literal replacement, not a regular expression.']),
  utility('String', 'string:substring', 'Extracts text between zero-based begin and end indexes.', 'Read a fixed portion of a known-format identifier or message.', [field('inString', 'String', 'Original text.'), field('beginIndex', 'String', 'Inclusive start index.'), field('endIndex', 'String', 'Exclusive end index.')], valueOutput('Extracted text.'), { input: 'inString=Kestrel, beginIndex=0, endIndex=4', output: 'value=Kest' }, ['The runtime clamps a negative start to 0 and an oversized end to the string length.', 'Invalid ordering or indexes raise UTILITY_ERROR.']),
  utility('String', 'string:substitutePipelineVariables', 'Resolves pipeline expressions embedded in a string.', 'Build a runtime message or value from hardcoded text and current pipeline fields.', [field('value', 'String', 'Template containing pipeline expressions.')], valueOutput('Template after substitution.'), { input: 'value=Order ${pipeline.input.orderId} accepted', output: 'value=Order 1001 accepted' }, ['Missing paths become an empty string.', 'Never substitute secrets into logs or public error messages.', 'See Pipeline Sub for supported syntax.']),
  utility('String', 'string:toLower', 'Converts text to lowercase.', 'Normalize a value before comparison or lookup.', [field('value', 'String', 'Text to convert.')], valueOutput('Lowercase text.'), { input: 'value=HELLO', output: 'value=hello' }),
  utility('String', 'string:toUpper', 'Converts text to uppercase.', 'Normalize codes or case-insensitive comparison values.', [field('value', 'String', 'Text to convert.')], valueOutput('Uppercase text.'), { input: 'value=hello', output: 'value=HELLO' }),
  utility('String', 'string:tokenize', 'Splits text using a literal delimiter.', 'Convert delimited text into a String List for LOOP or downstream mapping.', [field('inString', 'String', 'Text to split.'), field('delimiter', 'String', 'Literal delimiter.')], [field('tokens', 'String List', 'Tokens, including empty trailing tokens.')], { input: 'inString=A,B,C, delimiter=,', output: 'tokens=[A, B, C]' }, ['An empty delimiter returns a one-item list containing the original string.', 'The delimiter is not treated as a regular expression.']),
  utility('String', 'string:trim', 'Removes leading and trailing characters considered whitespace by String.trim.', 'Normalize user input before validation, comparison, or lookup.', [field('value', 'String', 'Text to trim.')], valueOutput('Trimmed text.'), { input: 'value="  hello  "', output: 'value=hello' }, ['Whitespace inside the string is unchanged.']),

  utility('Hashtable', 'hashtable:createHashtable', 'Creates an empty mutable Java Hashtable.', 'Create a keyed in-memory object to pass through later Hashtable utilities during one execution.', [], [field('hashtable', 'Object', 'New empty Hashtable.')], { input: 'No input', output: 'hashtable={}' }, ['Map this output to a pipeline Object before using other Hashtable utilities.', 'Hashtable does not accept null keys or null values.']),
  utility('Hashtable', 'hashtable:containsKey', 'Tests whether a Hashtable contains a key.', 'Choose a branch based on whether cached execution data has been stored.', [hashtable, key], [field('containsKey', 'String', 'true or false.')], { input: 'hashtable={customerId:123}, key=customerId', output: 'containsKey=true' }, ['The input must be an actual Hashtable returned by createHashtable.']),
  utility('Hashtable', 'hashtable:get', 'Reads the value stored for a key.', 'Retrieve a previously stored execution value.', [hashtable, key], [field('value', 'Object', 'Stored value, or null when the key does not exist.')], { input: 'hashtable={customerId:123}, key=customerId', output: 'value=123' }, ['Use containsKey when null and a missing entry must be distinguished.']),
  utility('Hashtable', 'hashtable:listKeys', 'Returns all Hashtable keys in ascending order.', 'Inspect or iterate the available keys predictably.', [hashtable], [field('keys', 'String List', 'Sorted key names.')], { input: 'hashtable={b:2, a:1}', output: 'keys=[a, b]' }),
  utility('Hashtable', 'hashtable:put', 'Adds or replaces a Hashtable entry.', 'Store an execution-scoped value for later keyed retrieval.', [hashtable, key, field('value', 'Object', 'Value to store.')], [field('hashtable', 'Object', 'The same mutated Hashtable.')], { input: 'hashtable={}, key=customerId, value=123', output: 'hashtable={customerId:123}' }, ['The Hashtable is mutated in place.', 'A null value is ignored and is not inserted.']),
  utility('Hashtable', 'hashtable:remove', 'Removes a key and returns its previous value.', 'Consume or clear an execution-scoped entry.', [hashtable, key], [field('hashtable', 'Object', 'The same mutated Hashtable.'), field('value', 'Object', 'Removed value, or null when absent.')], { input: 'hashtable={a:1}, key=a', output: 'hashtable={}, value=1' }, ['The Hashtable is mutated in place.']),
  utility('Hashtable', 'hashtable:size', 'Counts entries in a Hashtable.', 'Validate whether a table is empty or determine its current entry count.', [hashtable], [field('size', 'String', 'Number of entries.')], { input: 'hashtable={a:1, b:2}', output: 'size=2' }),

  utility('XML', 'xml:documentToXMLString', 'Serializes a Document as UTF-8 XML text.', 'Create an XML request body or file from a mapped Document.', [field('value', 'Document', 'Document to serialize.')], valueOutput('XML declaration and root element as a String.'), { input: 'value={name:"Asha", employeeId:"101"}', output: 'value=<?xml ...?><root><name>Asha</name><employeeId>101</employeeId></root>' }, ['The runtime emits a synthetic root element and escapes XML-reserved characters.', 'Lists become repeated elements.', 'Nested single-key document shells are unwrapped before serialization.']),
  utility('XML', 'xml:xmlToJsonConverter', 'Parses XML text and serializes the resulting structure as JSON.', 'Convert an XML API response into JSON text.', [field('xmlString', 'String', 'Well-formed XML text.'), field('formatJson', 'Boolean', 'Pretty-print JSON when true.', true)], valueOutput('JSON text.'), { input: 'xmlString=<employee><name>Asha</name></employee>, formatJson=true', output: 'value={"employee":{"name":"Asha"}}' }, ['Attributes use @name keys, mixed text uses #text, and repeated elements become lists.', 'DOCTYPE and external entities are disabled.'], REUSABLE_ONLY),
  utility('XML', 'xml:xmlToDoc', 'Parses XML text into a pipeline Document.', 'Map XML response data as nested fields without manually parsing text.', [field('xmlString', 'String', 'Well-formed XML text.')], [field('value', 'Document', 'Parsed document including its root element.')], { input: 'xmlString=<employee><name>Asha</name></employee>', output: 'value={employee:{name:"Asha"}}' }, ['Attributes use @name keys, mixed text uses #text, and repeated elements become lists.', 'Malformed or unsafe XML raises UTILITY_ERROR.'], REUSABLE_ONLY),

  utility('JSON', 'json:documentToJSON', 'Serializes a Document as compact JSON text.', 'Create a JSON request body, message, or file from mapped pipeline data.', [field('value', 'Document', 'Document to serialize.')], valueOutput('Compact JSON text.'), { input: 'value={name:"Asha"}', output: 'value={"name":"Asha"}' }, ['A synthetic single root wrapper is removed; ordinary user keys are retained.']),
  utility('JSON', 'json:jsonToDocument', 'Parses JSON text into a Document.', 'Convert a JSON string response into fields for downstream mapping.', [field('value', 'String', 'JSON text.')], [field('value', 'Document', 'Parsed JSON object, list, or scalar structure.')], { input: 'value={"name":"Asha"}', output: 'value={name:"Asha"}' }, ['Invalid or empty JSON raises UTILITY_ERROR.']),
  utility('JSON', 'json:jsonToDoc', 'Parses jsonString into a Document.', 'Use the explicit jsonString contract when converting JSON in a reusable service.', [field('jsonString', 'String', 'JSON text.')], [field('value', 'Document', 'Parsed JSON structure.')], { input: 'jsonString={"name":"Asha"}', output: 'value={name:"Asha"}' }, ['Functionally similar to json:jsonToDocument but uses the jsonString input name.'], REUSABLE_ONLY),
  utility('JSON', 'json:jsonToXmlConverter', 'Parses JSON text and serializes it as XML.', 'Create an XML payload from a JSON response or intermediate representation.', [field('jsonString', 'String', 'JSON text.'), field('encoding', 'Boolean', 'Encode non-ASCII and control characters as numeric XML entities when true.', true)], valueOutput('XML declaration and root element as a String.'), { input: 'jsonString={"employee":{"name":"Asha"}}, encoding=false', output: 'value=<?xml ...?><root><employee><name>Asha</name></employee></root>' }, ['Reserved XML characters are always escaped.', 'Invalid JSON raises UTILITY_ERROR.'], REUSABLE_ONLY),

  utility('List', 'list:appendToDocumentList', 'Returns a new Document List with one value appended.', 'Accumulate mapped documents during processing without changing the original list.', [field('list', 'Document List', 'Existing list; a missing/non-list value starts an empty list.'), field('value', 'Document', 'Document to append.')], [field('value', 'Document List', 'New list containing existing items and the appended value.')], { input: 'list=[{id:1}], value={id:2}', output: 'value=[{id:1}, {id:2}]' }, ['Map the returned list back to the desired pipeline variable for continued accumulation.']),
  utility('List', 'list:appendToStringList', 'Returns a new String List with one value appended.', 'Accumulate names, identifiers, messages, or other scalar text values.', [field('list', 'String List', 'Existing list; a missing/non-list value starts an empty list.'), field('value', 'String', 'Value to append.')], [field('value', 'String List', 'New list containing existing items and the appended value.')], { input: 'list=[A, B], value=C', output: 'value=[A, B, C]' }, ['The original list is copied rather than mutated.']),
  utility('List', 'list:sizeOfList', 'Returns the number of items in any supported list.', 'Check for an empty list, drive validation, or record a count.', [field('fromList', 'Object List', 'String List, Document List, Document Reference List, or Object List.', true)], [field('size', 'String', 'Number of list items.')], { input: 'fromList=[one, two, three]', output: 'size=3' }, ['Missing input or a non-list value returns 0.']),

  utility('Date', 'date:getCurrentDate', 'Returns the current time in a selected time zone.', 'Timestamp a business event or generate a formatted current date.', [field('timeZone', 'String', 'IANA time-zone ID such as UTC, Asia/Kolkata, or Europe/London.', true), field('format', 'String', 'Java DateTimeFormatter pattern.', true)], valueOutput('Formatted current date/time.'), { input: 'timeZone=UTC, format=yyyy-MM-dd HH:mm:ss', output: 'value=2026-07-16 10:15:30' }, ['The default zone is UTC.', 'Without format, output uses ISO offset date-time.', 'Invalid zones or patterns raise UTILITY_ERROR.'], REUSABLE_ONLY),
  utility('Date', 'date:dateFormat', 'Parses a date/time and formats it using another pattern.', 'Convert partner date formats into a normalized project format.', [field('value', 'String', 'Date/time text.'), field('inputFormat', 'String', 'Java pattern used to parse value; omit for supported ISO formats.', true), field('outputFormat', 'String', 'Java pattern for the result; omit for ISO offset date-time.', true), field('timeZone', 'String', 'Zone applied when the input has no zone.', true)], valueOutput('Formatted date/time.'), { input: 'value=16/07/2026, inputFormat=dd/MM/yyyy, outputFormat=yyyy-MM-dd, timeZone=UTC', output: 'value=2026-07-16' }, ['The default zone is UTC.', 'Supported unformatted inputs include Zoned, Offset, Instant, LocalDateTime, and LocalDate ISO text.'], REUSABLE_ONLY),
  utility('Date', 'date:findDateDifference', 'Calculates the whole-unit difference between two dates.', 'Measure elapsed days, hours, minutes, or another supported calendar unit.', [field('startDate', 'String', 'Start date/time.'), field('endDate', 'String', 'End date/time.'), field('unit', 'String', 'day(s), week(s), month(s), year(s), hour(s), minute(s), second(s), or millisecond(s).', true), field('inputFormat', 'String', 'Java pattern used for both dates.', true), field('timeZone', 'String', 'Zone applied when inputs have no zone.', true)], valueOutput('Signed whole-unit difference as a String.'), { input: 'startDate=2026-07-01, endDate=2026-07-16, unit=days', output: 'value=15' }, ['The default unit is days and default zone is UTC.', 'The result is negative when endDate precedes startDate.'], REUSABLE_ONLY),
  utility('Date', 'date:incrementDate', 'Adds or subtracts a supported time unit from a date.', 'Calculate expiry dates, retry times, or scheduling boundaries.', [field('value', 'String', 'Starting date/time.'), field('amount', 'String', 'Signed number of units to add.', true), field('unit', 'String', 'day(s), week(s), month(s), year(s), hour(s), minute(s), second(s), or millisecond(s).', true), field('inputFormat', 'String', 'Java parsing pattern.', true), field('outputFormat', 'String', 'Java output pattern.', true), field('timeZone', 'String', 'Zone applied when input has no zone.', true)], valueOutput('Updated date/time.'), { input: 'value=2026-07-16, amount=3, unit=days, outputFormat=yyyy-MM-dd', output: 'value=2026-07-19' }, ['The default amount is 1, unit is days, and zone is UTC.', 'Use a negative amount to subtract.'], REUSABLE_ONLY),

  utility('KVS', 'kvs:getValue', 'Returns the first value stored for one project KVS key.', 'Read a project-scoped configuration value or secret at runtime.', [field('key', 'String', 'Reference in kvsName.keyName format; pipeline substitution is supported.'), field('throwErrorOnFailure', 'String', 'true to fail when the KVS/key is invalid or missing; false to return empty text.', true)], valueOutput('First decrypted value, or an empty String.'), { input: 'key=employee_store.employee_id, throwErrorOnFailure=true', output: 'value=12345' }, ['The default throwErrorOnFailure is false.', 'The project context is supplied automatically.', 'Treat returned secret values as sensitive.'], REUSABLE_ONLY),
  utility('KVS', 'kvs:getValues', 'Returns every value stored for one project KVS key.', 'Read a multi-value project configuration such as allowed roles or endpoints.', [field('key', 'String', 'Reference in kvsName.keyName format; pipeline substitution is supported.'), field('throwErrorOnFailure', 'String', 'true to fail when missing; false to return an empty list.', true)], [field('values', 'String List', 'All decrypted values in stored order.')], { input: 'key=employee_store.roles', output: 'values=[admin, user, viewer]' }, ['The default throwErrorOnFailure is false.', 'Never log a returned secret list.'], REUSABLE_ONLY),
  utility('KVS', 'kvs:getValuesList', 'Returns the first value for each key in a list.', 'Resolve several related project settings in one utility step.', [field('keyList', 'String List', 'References in kvsName.keyName format; each entry supports substitution.'), field('throwErrorOnFailure', 'String', 'true to fail on an invalid/missing entry; false to insert empty text for it.', true)], [field('values', 'String List', 'One first value per requested key, preserving input order.')], { input: 'keyList=[employee_store.employee_id, employee_store.department]', output: 'values=[12345, finance]' }, ['The output position corresponds to the same keyList position.', 'The default throwErrorOnFailure is false.'], REUSABLE_ONLY)
];

export function utilitySlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export const utilityBySlug = new Map(utilityDocs.map((item) => [utilitySlug(item.name), item]));

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const groupedUtilities = () => utilityDocs.reduce((groups, item) => {
  const existing = groups.find((group) => group.name === item.group);
  if (existing) existing.items.push(item);
  else groups.push({ name: item.group, items: [item] });
  return groups;
}, []);

export function renderUtilityNavigation() {
  return groupedUtilities().map((group) => `
    <div class="utility-nav-group" data-utility-group="${escapeHtml(group.name.toLowerCase())}">
      <p class="utility-nav-group-label">${escapeHtml(group.name)}</p>
      ${group.items.map((item) => {
        const slug = utilitySlug(item.name);
        return `<a class="nav-child-link" href="#/utils/${slug}" data-route="utils" data-anchor="${slug}">
          <span class="nav-child-marker" aria-hidden="true"></span>
          <span><strong>${escapeHtml(item.name)}</strong></span>
        </a>`;
      }).join('')}
    </div>
  `).join('');
}

export function renderUtilityCatalog() {
  return groupedUtilities().map((group) => `
    <section class="utility-catalog-group" aria-labelledby="utility-${escapeHtml(group.name.toLowerCase())}">
      <h3 id="utility-${escapeHtml(group.name.toLowerCase())}">${escapeHtml(group.name)}</h3>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead><tr><th>Utility</th><th>Purpose</th><th>Available in</th></tr></thead>
          <tbody>${group.items.map((item) => `<tr>
            <td><a href="#/utils/${utilitySlug(item.name)}"><code>${escapeHtml(item.name)}</code></a></td>
            <td>${escapeHtml(item.summary)}</td>
            <td>${escapeHtml(item.availability)}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>
  `).join('');
}

function fieldsTable(fields, direction) {
  if (!fields.length) {
    return '<p class="docs-empty-state">No ' + direction.toLowerCase() + ' fields.</p>';
  }
  return `<div class="comparison-table-wrap"><table class="comparison-table">
    <thead><tr><th>Name</th><th>Type</th><th>${direction === 'Input' ? 'Required' : 'Description'}</th><th>${direction === 'Input' ? 'Description' : 'Logical path'}</th></tr></thead>
    <tbody>${fields.map((item) => `<tr>
      <td><code>${escapeHtml(item.name)}</code></td>
      <td>${escapeHtml(item.type)}</td>
      <td>${direction === 'Input' ? (item.optional ? 'No' : 'Yes') : escapeHtml(item.description)}</td>
      <td>${direction === 'Input' ? escapeHtml(item.description) : `<code>\${service.output.${escapeHtml(item.name)}}</code>`}</td>
    </tr>`).join('')}</tbody>
  </table></div>`;
}

export function renderUtilityDetail(item) {
  const slug = utilitySlug(item.name);
  return `
    <section class="doc-hero" id="${slug}">
      <div class="hero-copy">
        <p class="eyebrow">Project / Utils / ${escapeHtml(item.group)}</p>
        <h1><code>${escapeHtml(item.name)}</code></h1>
        <p class="lead">${escapeHtml(item.summary)}</p>
      </div>
    </section>

    <nav class="page-toc" aria-label="${escapeHtml(item.name)} page sections">
      <div><p class="eyebrow">Utility reference</p><strong>${escapeHtml(item.group)}</strong></div>
      <div class="toc-links">
        <a href="#/utils/${slug}/purpose">Purpose</a>
        <a href="#/utils/${slug}/inputs">Inputs</a>
        <a href="#/utils/${slug}/outputs">Outputs</a>
        <a href="#/utils/${slug}/example">Example</a>
        <a href="#/utils/${slug}/notes">Runtime notes</a>
        <a href="#/utils">All Utils</a>
      </div>
    </nav>

    <section class="doc-section" id="purpose">
      <header class="section-heading"><p class="eyebrow">Purpose and use</p><h2>When to use this utility</h2></header>
      <p>${escapeHtml(item.use)}</p>
      <div class="callout"><span class="callout-mark" aria-hidden="true">i</span><div><strong>Editor availability</strong><p>${escapeHtml(item.availability)}</p></div></div>
    </section>

    <section class="doc-section" id="inputs">
      <header class="section-heading"><p class="eyebrow">Step In / Service In</p><h2>Input contract</h2></header>
      ${fieldsTable(item.input, 'Input')}
      ${item.input.length ? '<p>Map these fields through the utility pipeline. The logical path for an input named <code>field</code> is <code>${service.input.field}</code>.</p>' : ''}
    </section>

    <section class="doc-section" id="outputs">
      <header class="section-heading"><p class="eyebrow">Step Out / Service Out</p><h2>Output contract</h2></header>
      ${fieldsTable(item.output, 'Output')}
      ${item.output.length ? '<p>Outputs are available only after the utility runs and must be mapped explicitly to the required Pipeline Out variable.</p>' : '<p>This utility completes by changing flow state or raising an error instead of returning a normal value.</p>'}
    </section>

    <section class="doc-section" id="example">
      <header class="section-heading"><p class="eyebrow">Developer example</p><h2>Example input and result</h2></header>
      <pre class="code-contract"><code>Input
${escapeHtml(item.example.input)}

Result
${escapeHtml(item.example.output)}</code></pre>
    </section>

    <section class="doc-section" id="notes">
      <header class="section-heading"><p class="eyebrow">Runtime behavior</p><h2>Important implementation details</h2></header>
      ${item.notes.length ? `<ul class="docs-bullet-list">${item.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : '<p>No additional runtime restrictions beyond the declared input contract.</p>'}
      <div class="callout callout-warning"><span class="callout-mark" aria-hidden="true">!</span><div><strong>Failure handling</strong><p>Invalid input raises a utility runtime error and stops the normal branch unless an enclosing <a href="#/error-handling">TRY/CATCH</a> handles it.</p></div></div>
    </section>
  `;
}
