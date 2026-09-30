// One experiment instance is shared by classroom and full-reading modes.
import models from './course-v3-section2-models.js';

const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const button = (action, text, extra = '') => `<button type="button" data-s2-action="${action}" ${extra}>${text}</button>`;
const select = (role, label, options, value) => `<label>${label}<select data-s2-role="${role}">${options.map(([key, text]) => `<option value="${esc(key)}"${String(key) === String(value) ? ' selected' : ''}>${esc(text)}</option>`).join('')}</select></label>`;
const number = (role, label, value, min, max) => `<label>${label}<input type="number" data-s2-role="${role}" value="${value}" min="${min}" max="${max}" step="1" inputmode="numeric"></label>`;
const input = (role, label, value) => `<label>${label}<input type="text" data-s2-role="${role}" value="${esc(value)}" maxlength="80" autocomplete="off" spellcheck="false"></label>`;
const definitions = {
  network: { title: 'Request a shared worksheet', introduction: 'Predict which device must stay available. Follow a request to the device that holds the only shared copy.', defaults: { architecture: 'server', failure: 'none' }, prediction: 'Where is the file, and will Student A receive it after the chosen failure?', note: 'Only the shown file copy and local connection are available. File permissions and extra backup copies are not modelled.' },
  topology: { title: 'Find a path after a failure', introduction: 'Send data from A to C. Choose a topology and remove a link or the central switch.', defaults: { shape: 'star', failure: 'none' }, prediction: 'Can A still reach C? Point to every working link on the path.', note: 'S means the central switch. Mesh nodes in this simplified network can forward data along alternative links. A physical route alone is not enough without forwarding support.' },
  media: { title: 'Choose what carries the signal', introduction: 'Trace the carrier, then justify its fit to a school communication task.', defaults: { medium: 'copper', scenario: 'room' }, prediction: 'What carries the bits? What feature or limitation matters in this scenario?', note: 'This is a qualitative comparison, not a performance benchmark. Standards, distance, equipment, contention and installation conditions affect real results.' },
  ethernet: { title: 'Follow an Ethernet transmission', introduction: 'Predict what the sending devices can observe before revealing each step.', defaults: { mode: 'shared', timing: 'together', backoff: 'different' }, prediction: 'Will the next action send a frame, wait, detect a collision or retry?', note: 'The shared-medium case is historical half-duplex Ethernet. Modern dedicated full-duplex switch links do not use CSMA/CD. Times and random choices here are illustrative, not a waveform simulation.' },
  streaming: { title: 'Keep a video buffer supplied', introduction: 'Change the rates, then advance one second at a time. Track the data received, played and left in the buffer.', defaults: { download: 3, playback: 2, threshold: 4, initial: 0, kind: 'demand' }, prediction: 'Will playback run this second, and how many Mbit will remain?', note: 'Discrete one-second model: receive first, then consume one complete second or pause. Rates stay constant, playback keeps its position, and the buffer has no capacity limit. On-demand content is already available; live content is produced at the playback data rate. Real players use smaller chunks and other restart policies.' },
  addressing: { title: 'Read an address with its given prefix', introduction: 'Use the supplied prefix to separate network bits from host bits, then compare a destination. Predict the address range before revealing it.', defaults: { address: '192.168.1.70', destination: '192.168.1.130', prefix: 26, assignment: 'dynamic' }, prediction: 'Which bits identify the network? Does the destination share that complete prefix?', note: 'This subnet experiment covers conventional IPv4 /24 and /26 networks. It compares a destination using the client’s given mask. Actual availability and onward routing need separate checks.' },
  dns: { title: 'From a hostname to a webpage', introduction: 'Choose whether an unexpired address is cached. Then test a DNS failure or a web-service failure.', defaults: { cache: 'miss', failure: 'none' }, prediction: 'Does this next step need DNS, routing or the web server? Can the page load?', note: 'Local simulation only: no network requests are made. courses.example and 203.0.113.20 are documentation examples. The remote web server is outside the school LAN; connection setup and encryption are omitted.' },
  cloud: { title: 'Test a cloud service dependency', introduction: 'Compare a provider’s public cloud with a private cloud hosted at the school. Change one dependency.', defaults: { deployment: 'public', failure: 'none' }, prediction: 'Which part of the path is required, and can the device still reach its service?', note: 'One service and no fallback copy or redundant route. The private-cloud example is on-site; private clouds can also be hosted remotely. Deployment alone does not guarantee availability or security.' }
};

function controls(id, config) {
  const c = config;
  if (id === 'network') return select('architecture', 'Resource model', [['server', 'Client–server'], ['peer', 'Peer-to-peer']], c.architecture) + select('failure', 'Unavailable device or connection', [['none', 'None'], ['server', 'Dedicated file server'], ['peer', 'Student B'], ['switch', 'Network connection']].filter(([key]) => !c.allowedFailures || c.allowedFailures.includes(key)), c.failure);
  if (id === 'topology') return select('shape', 'Topology', [['star', 'Star'], ['mesh', 'Full mesh (3 nodes)']], c.shape) + select('failure', 'Failure', [['none', 'None'], ['link-ac', c.shape === 'star' ? 'Link C–S' : 'Link A–C'], ['link-ab', c.shape === 'star' ? 'Link B–S' : 'Link A–B'], ['centre', 'Central switch S']], c.failure);
  if (id === 'media') return select('medium', 'Medium', Object.entries(models.media).filter(([key]) => !c.allowedMedia || c.allowedMedia.includes(key)).map(([key, item]) => [key, item.label]), c.medium) + select('scenario', 'School task', Object.entries(models.scenarios), c.scenario);
  if (id === 'ethernet') return c.topic === 'frames' ? '' : select('mode', 'Link arrangement', [['shared', 'Shared half-duplex medium'], ['switched', 'Dedicated full-duplex switch links']], c.mode) + `<span data-s2-option="shared">${select('timing', 'When B attempts to send', [['together', 'Before A’s signal reaches B'], ['later', 'After B hears A transmitting']], c.timing)}</span><span data-s2-option="backoff">${select('backoff', 'Random choices after a collision', [['different', 'Different choices: 0 and 1 slots'], ['same', 'Equal choices: both 0 slots']], c.backoff)}</span>`;
  if (id === 'streaming') return number('download', 'Connection delivery rate (Mbit/s)', c.download, 0, 12) + number('playback', 'Playback data rate (Mbit/s)', c.playback, 1, 8) + number('threshold', 'Start / restart threshold (Mbit)', c.threshold, 1, 24) + number('initial', 'Initial buffered data (Mbit)', c.initial, 0, 24) + select('kind', 'Source', [['demand', 'On demand: content already exists'], ['live', 'Live: new content appears over time']], c.kind);
  if (id === 'addressing') return input('address', c.topic === 'formats' || c.topic === 'assignment' ? 'IPv4 address' : 'Client IPv4 address', c.address) + (c.topic === 'formats' ? '' : c.topic === 'assignment' ? select('assignment', 'Assignment method', [['dynamic', 'Dynamic'], ['static', 'Static']], c.assignment) : input('destination', 'Destination IPv4 address', c.destination) + select('prefix', 'Given network prefix', [[26, '/26'], [24, '/24']], c.prefix));
  if (id === 'dns') return select('cache', 'Browser address cache', [['miss', 'No usable cached result'], ['hit', 'Valid, unexpired cached result']], c.cache) + select('failure', 'Failure', [['none', 'None'], ['dns', 'DNS lookup unavailable'], ['web', 'Web service unavailable']], c.failure);
  return select('deployment', 'Cloud deployment', [['public', 'Provider’s public cloud'], ['private', 'School’s on-site private cloud']], c.deployment) + select('failure', 'Failure', [['none', 'None'], ['internet', 'School internet link'], ['server', 'The selected cloud service']], c.failure);
}

export function labFor(id, options = {}) {
  if (!definitions[id]) throw new RangeError(`Unknown Section 2 experiment: ${id}`);
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('Lab configuration must be an object.');
  const d = definitions[id], config = { ...d.defaults, ...options };
  const extra = ['topic', ...(id === 'network' ? ['allowedFailures'] : []), ...(id === 'media' ? ['allowedMedia'] : [])];
  for (const key of Object.keys(options)) if (!(key in d.defaults) && !extra.includes(key)) throw new RangeError(`Unknown ${id} input: ${key}`);
  const topics = { addressing: ['subnets', 'assignment', 'formats'], ethernet: ['frames'] };
  if (config.topic && !topics[id]?.includes(config.topic)) throw new RangeError(`Unknown ${id} topic: ${config.topic}`);
  for (const [key, allowed, selected] of [['allowedMedia', Object.keys(models.media), config.medium], ['allowedFailures', ['none', 'server', 'peer', 'switch'], config.failure]]) {
    if (config[key] && (!Array.isArray(config[key]) || !config[key].length || config[key].some(value => !allowed.includes(value)) || !config[key].includes(selected))) throw new RangeError(`${key} must contain supported choices including the selected default.`);
  }
  const model = id === 'topology' ? models.topologyModel : models[`${id}Trace`];
  model(config); // Reject invalid embedded defaults when generating the course.
  const isAssignment = id === 'addressing' && config.topic === 'assignment', isFormats = id === 'addressing' && config.topic === 'formats';
  const title = isAssignment ? 'Separate address scope from assignment' : isFormats ? 'Compare IPv4 and IPv6 notation' : d.title;
  const introduction = isAssignment ? 'Keep the address fixed and change how it is assigned. Does its address range change?' : isFormats ? 'Count the bits represented by decimal octets and hexadecimal groups.' : d.introduction;
  const prediction = isAssignment ? 'Can a private address be static? Must a dynamic address change on every connection?' : isFormats ? 'How many bits does each written group represent?' : d.prediction;
  const note = isAssignment ? 'Address scope and assignment are separate properties. Other special address ranges exist beyond RFC 1918; internet reachability also depends on routing and access rules.' : isFormats ? 'The IPv6 example uses the documentation prefix 2001:db8::/32. This format demonstration does not attempt to connect to it.' : d.note;
  const fields = controls(id, config);
  return `<div class="s2-lab" data-s2-lab="${id}" data-s2-config="${esc(JSON.stringify(config))}">
    <h3>${title}</h3><p class="s2-lab-intro">${introduction}</p>
    ${fields ? `<details class="s2-lab-setup"><summary>Change conditions</summary><div class="s2-lab-inputs">${fields}</div>${button('prepare', 'Apply conditions')}</details>` : ''}
    <p class="s2-lab-prediction"><strong>Predict:</strong> ${prediction}</p>
    <div class="s2-lab-display" data-s2-role="display" role="region" aria-label="${esc(title)} display" tabindex="0"></div>
    <div class="s2-lab-actions">${button('previous', 'Previous step', 'disabled')}${button('reveal', 'Reveal this step')}${button('next', 'Next step', 'disabled')}${button('reset', 'Reset')}</div>
    <p class="s2-lab-progress" data-s2-role="progress"></p>
    <div class="s2-lab-explanation"><strong data-s2-role="line"></strong><p data-s2-role="status" role="status" aria-live="polite"></p></div>
    <p class="s2-lab-note">${note}</p>
  </div>`;
}

export const labMarkup = Object.fromEntries(Object.keys(definitions).map(id => [id, labFor(id)]));
