import { coreParagraph as p, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { knowledgeDiagramForUnit } from './course-v3-knowledge-diagrams.mjs';
import { mechanismVisual } from './course-v3-mechanism-diagrams.mjs';
import { section2TeachingVisuals as visuals } from './course-v3-section2-teaching-diagrams.mjs';
import { section2AdditionalPractice, section2ReviewPractice } from './course-v3-section2-questions.mjs';

const entry = (key, blocks, essentials, prompt, answer, visual, extensions=[]) => ({key,blocks,essentials,checkpoint:{prompt,answer},visual,extensions});
const extension = (title, explanation, materials=[]) => ({title:`Optional extension: ${title}`,explanation,materials});
const materialTable = (title,headers,rows) => ({type:'table',title,headers,rows});
const scopedVisual = (lesson,unit,caption,title) => ({...knowledgeDiagramForUnit(lesson,unit),caption,...(title?{title}:{}),layout:'mechanism'});
const visualContexts = {
  'SERVICE-MODELS':scopedVisual(7,2,'Arrows show logical requests and responses; they do not specify the physical cables or require a full-mesh topology.'),
  'CLOUD-RESOURCES':scopedVisual(9,1,'This example uses an internet-hosted cloud application and encrypted request/response communication. Locks illustrate that chosen protection, not an automatic property of every cloud service. A virtual server is software-defined computing hosted on physical server hardware.'),
  'PRIVATE-CLOUD':scopedVisual(9,3,'Dedicated to one organisation, on-site or hosted. VM means virtual machine: a software-defined computer running on underlying hardware; several can share a physical server. The diagram shows access controls that must be implemented, not automatic immunity from faults.'),
  'CLOUD-DEPENDENCE':scopedVisual(9,4,'This comparison concerns a third-party cloud service accessed over the internet. Access from a location requires a suitable connection and permissions. An on-site private cloud can instead be reachable through its local network.','An internet-hosted cloud: benefits and dependence'),
  'MEDIA-CONSTRAINTS':materialTable('Compare a switched cable link with WiFi access',['Factor','Switched Ethernet cable to a fixed device','WiFi access to a moving device'],[['Path','A separate physical cable connects the device to a switch port.','Radio links the device to an access point within coverage.'],['Movement','Movement is constrained by cable and connection point.','The device can move within usable wireless coverage.'],['Conditions','Cable type, length and environment affect the signal. Not all copper cable is shielded.','Obstacles, interference and competing users affect service.'],['Installation','Each fixed endpoint needs a cable run and port.','Access points need power and onward connectivity, even though clients have no trailing cable.']]),
  'ASSIGNMENT':scopedVisual(14,4,'The two rows illustrate one possible reallocation; renewal may also keep the same address. All 192.0.2.x, 198.51.100.x and 203.0.113.x values shown are documentation examples in hypothetical networks.'),
};
const physicalMedia = {type:'reviewed-visual',asset:'/assets/course-v3/section-2/transmission-media-analogy.png',title:'Physical carriers for a network link',alt:'Physical examples of cable and wireless communication equipment, used to identify carriers rather than rank their performance.',facts:['Copper carries electrical signals.','Fibre carries light pulses.','Wireless communication uses electromagnetic waves through space.'],caption:'Use the following explanation to compare suitability. Equipment appearance alone does not establish capacity, range or delay.',layout:'mechanism',review:'Used as a physical-carrier scene; quantitative and comparative claims are supplied in editable text.'};

export const section2Teaching = [
  [
    entry('PURPOSE-SCOPE',[
      steps('From a shared resource to a measurable benefit',[
        ['Situation','Forty library terminals need the same catalogue and one printer. Separate copies would need separate updates; separate printers would duplicate hardware.'],
        ['Networked arrangement','Terminals request the managed catalogue and submit print jobs over the local network. Access permissions determine which users may change records.'],
        ['Consequence','A catalogue update is available to authorised clients without copying it to every terminal. Sharing the printer reduces the number of printers needed.'],
        ['Boundary','A network does not automatically provide permissions, current backups or uninterrupted service. Those require configuration and maintenance.'],
      ]),
      p('The library site is a LAN. A link joining this site to two libraries in other cities forms part of a WAN. The WAN may use provider-owned fibre while each site uses both Ethernet cables and WiFi. Area and control classify scope; the carrier and measured data rate answer different questions.','Change the scale without changing the definition'),
    ],['Link each network benefit to a shared resource or a management process and its consequence.','LAN and WAN describe scope and control; neither guarantees speed or a particular carrier.'],'A school replaces room Ethernet cables with WiFi. Has its LAN become a WAN?','No. The carrier changes, but the school network still covers the same limited managed site.'),
    entry('SERVICE-MODELS',[
      steps('Follow a service request and its response',[
        ['Request','Terminal T asks the catalogue server for the record with book ID 104. The terminal is the client for this exchange.'],
        ['Service','The server receives the request, checks the applicable access rules, retrieves the record and prepares a result.'],
        ['Response','The server sends the record to T, which displays it. A different request could update a record if the user has permission.'],
      ]),
      p('For four trusted colleagues occasionally sharing non-critical photographs, peer-to-peer can avoid buying and administering a dedicated server. Each person shares selected files from their own computer. A file becomes unavailable when its providing peer is switched off, and backup responsibility remains distributed. If central accounts, reliable shared availability and uniform backup become requirements, the model should be reconsidered.','A contrasting model choice'),
      p('A server is a role, not a guarantee of one physical box or one level of reliability. One computer can provide several services; several servers can support a service. A client-server network may use a star or mesh link pattern. Lesson 008 examines those patterns separately.','Keep roles separate from layout'),
    ],['A client requests a service; a server provides and manages it. Peers may do both.','Justify a model using control, availability, scale, administration and cost.'],'Why does a peer-to-peer shared file disappear when its owner shuts down, even though the other peers remain connected?','That peer provides the file. Working network links and other online peers do not create another copy of its resource.'),
    entry('CLIENT-PROCESSING',[
      table('Trace the same editing task with different processing locations',['Stage','Thin-client arrangement','Thick-client arrangement'],[
        ['Input','The terminal sends the user’s keystrokes or commands to a remote application.','The local application receives and processes the input.'],
        ['Process','The server runs most application processing and retains the working data.','The client CPU and memory perform substantial application processing.'],
        ['Result','The terminal receives output to display; the server may save the file.','The client displays the result and may save locally or send a file to a server.'],
        ['Lost connection','The dependent remote session is interrupted.','Local work can continue if its program, data and required permissions are available locally.'],
      ]),
      p('For the 40 library terminals, a thin-client application can centralise application updates and reduce local processing requirements, but the server and connection must support the simultaneous sessions. For an engineer running CAD at a site with intermittent connectivity, choose a thick client with the application and authorised working files stored locally; synchronise completed files when connected. A powerful local CAD client can still request central accounts and files in a client-server model.','Make a complete choice and test its limits'),
    ],['Thin and thick describe how much application work occurs on the client.','Client-server can use thin or thick clients; offline work also needs local software and data.'],'Is every client that uses a file server a thin client?','No. A thick client may process a file locally while using a server for storage or authentication.'),
  ],
  [
    entry('TOPOLOGY-LINKS',[
      p('Data is sent in structured units rather than as an entire file moving as one indivisible object. At this level, an IP packet contains addressing information and data for delivery between networks. On an Ethernet link, a frame carries data with link-level addressing such as source and destination MAC addresses. Lesson 011 uses these addresses to distinguish local forwarding from routing.','Enough packet and frame vocabulary to follow a path'),
      table('Connect each structure to how a transmission travels',['Topology','Normal delivery','Failure and cost consequence'],[
        ['Bus','Attached devices share one backbone; signals travel along it. The addressed receiver accepts the relevant frame.','Few backbone cables, but shared traffic contends for access. A backbone break or faulty termination can disrupt the shared segment.'],
        ['Star','A host sends to the central device. With a switch and a known destination port, the switch forwards through that port.','Each host needs its own cable. A host-link failure isolates that host; centre failure removes the connection through that centre.'],
        ['Full mesh','Every pair of nodes has a direct link; forwarding can also use an available multi-link route.','Many links provide alternatives at greater cabling, interface and management cost.'],
        ['Partial mesh / hybrid','A partial mesh supplies some alternate links. A hybrid combines layouts, such as local stars joined by meshed links.','Check the actual graph: a “mesh” label does not prove that every node survives every failure.'],
      ]),
      p('A bus terminator absorbs signals reaching an end of the cable and reduces reflections that would interfere with the signal. It does not choose destinations. In a four-node full mesh, list AB, AC, AD, BC, BD and CD: six links. Counting three neighbours at each of four nodes gives twelve ends, so divide by two: 4 × 3 / 2 = 6. In general, N distinct nodes need N(N − 1)/2 undirected pairwise links.','Explain termination and count links'),
    ],['Topology is the link pattern; explain the actual path and relevant failure point.','A full mesh connects every pair; a partial mesh does not. Four full-mesh nodes need six links.'],'A star host cable breaks. Why does that differ from a broken bus backbone?','The star link belongs to one host. The bus backbone is shared by the segment, so its break can disrupt communication for several devices.',visuals.topology,[extension('numbered packet reassembly','A message may be split into numbered packets. In a simplified reassembly example, packets labelled 3, 1 and 2 arrive and are placed in positions 1, 2 and 3 before their payloads are combined. This illustrates why numbering can help when arrival order differs; transport-protocol reliability and retransmission rules are beyond this AS topology lesson.')]),
    entry('TOPOLOGY-FAILURE',[
      steps('Complete the A-to-C failure analysis',[
        ['Initial conditions','A and B connect separately to S1; C and D connect separately to S2. Inter-switch links are S1–S2, S1–S3 and S2–S3. Assume forwarding initially selects S1–S2 and can activate the spare route without loops.'],
        ['Normal route','A → S1 → S2 → C uses the two host links and the direct inter-switch link.'],
        ['One inter-switch failure','Remove S1–S2. The available route becomes A → S1 → S3 → S2 → C, if the configured network activates it.'],
        ['Different failure','Remove A–S1 instead: A has no remaining link. Remove S1: A and B both lose their only attachment. The inter-switch mesh cannot repair either missing host attachment.'],
        ['Decision','Choose this hybrid when surviving an inter-switch link failure justifies extra links, interfaces and configuration. Add separate resilience for the centre or host links only if the requirements demand it.'],
      ]),
    ],['Trace every successive link; distinguish a failed link, end device and central device.','State the spare-path activation assumption and weigh resilience against extra cost.'],'After S1–S2 fails, can A use A → S3 → S2 → C directly?','No. There is no A–S3 link. The valid spare route still passes through S1 first.',visuals.hybrid),
  ],
  [
    entry('CLOUD-RESOURCES',[
      steps('Follow a cloud order-processing request',[
        ['Client input','A shop enters order 501 in a browser. Its application sends the order through the shop connection to a hosted application.'],
        ['Remote resources','Provider computing executes the application; managed storage retains the order. The client uses those resources through a network interface rather than owning every underlying server.'],
        ['Response','The service returns an accepted-order result. The shop should distinguish that acknowledgement from a form that has only been typed locally.'],
        ['Demand changes','More processing or storage can be provisioned as demand grows, subject to the service’s capacity, configuration and charges. Cloud resources are not unlimited or automatically free.'],
      ]),
      p('Cloud computing includes remotely provided processing, applications and storage. Simply copying a file to any other computer does not establish all the management and on-demand service features associated with a cloud platform. The client still needs a suitable access connection and permission to use the service.','Connect the term to the resources'),
    ],['Cloud computing supplies computing resources as a service through a network.','Follow client request, remote processing or storage, and returned result.'],'Does a cloud application mean that no processing occurs on the user’s device?','No. The client still processes input and displays results, and may perform other local work. The cloud supplies specified remote resources.'),
    entry('PUBLIC-CLOUD',[
      p('In a public cloud, a third-party provider offers services to multiple customers using its infrastructure. Customer workloads and data need logical separation and access control; shared provider infrastructure does not mean every customer may read everyone else’s files. A shop can obtain capacity without first purchasing and running its own server estate.','Shared infrastructure and controlled access'),
      p('The benefit is a smaller initial infrastructure commitment and the ability to obtain more resources when needed. The trade-off is ongoing charges and dependence on the provider’s service, terms and security arrangements. A traffic surge may increase both the allocated capacity and the bill. Evaluate those consequences against the shop’s workload instead of assuming public means insecure or free.','Evaluate a changing workload'),
    ],['Public cloud uses a provider’s infrastructure to serve multiple customers.','Shared infrastructure does not imply public access to customer data.'],'A public-cloud document is accessible only to three staff accounts. Is “public cloud” the wrong label?','No. Public describes the cloud service arrangement, not the access permissions of that document.'),
    entry('PRIVATE-CLOUD',[
      p('A private cloud is dedicated to one organisation. It may run in the organisation’s own data centre or be hosted and operated for it by a third party. “Private” therefore describes exclusivity and control, not a requirement that all equipment sits inside the office or that access uses the public internet.','Distinguish tenancy from location'),
      p('A research organisation with specialised access rules may choose a dedicated private cloud to control configuration and resource use. It must still fund capacity and skilled administration, directly or through a hosting contract. Dedicated infrastructure can reduce sharing with other customers, but poor permissions, failed hardware and absent backups remain possible. The choice requires both the control requirement and the cost of delivering it.','Make the control–cost trade-off explicit'),
    ],['A private cloud is dedicated to one organisation and can be on-site or hosted.','Greater control still requires administration, capacity planning and recovery arrangements.'],'Can a private cloud continue serving local staff when the organisation’s internet connection fails?','It can if the cloud is on-site, reachable through the working local network and its required services do not depend on the lost internet connection.'),
    entry('CLOUD-DEPENDENCE',[
      steps('Recover the order service with a known backup boundary',[
        ['Before failure','At 12:00 the shop verifies a recoverable backup held independently of the live provider service. Order 501 was confirmed at 12:05. At 12:10 the service becomes unreachable.'],
        ['Locate the dependency','If another independent connection reaches the service, investigate the shop’s access path. If the provider has an outage, changing only the shop’s connection cannot restore that failed provider service. Confirm status rather than assume the cause from one failed browser request.'],
        ['Continue essential work','Use the agreed offline form with temporary unique order references and timestamps. Tell staff these records have not yet been accepted by the cloud application.'],
        ['Restore what exists','The 12:00 backup recovers the captured state, not automatically order 501 or later work. Restore to an available approved service and verify records and access before normal use.'],
        ['Reconcile and resume','Check which later orders were confirmed or retained elsewhere. Match temporary references and acknowledgements before entering missing records, avoiding duplicate orders. Resume normal submission once the service is verified.'],
      ]),
      table('Choose a response that addresses the actual failure',['Condition','Useful response','Limit'],[
        ['Shop access connection fails','A working independent connection may restore access.','It does not repair the provider.'],
        ['Provider service fails','Provider recovery or a prepared alternate service is needed.','A backup alone is data, not a running replacement application.'],
        ['Data lost or corrupted','Recover a verified independent backup and reconcile later records.','Changes absent from every retained record cannot be recreated merely by restoring the backup.'],
      ]),
    ],['Explain benefits alongside network and provider dependence.','Recovery requires usable retained data, an available service and checks for missing or duplicated work.'],'Does restoring the verified 12:00 backup prove that order 501, confirmed at 12:05, has been recovered?','No. That order was created after the snapshot. Check later retained records or logs and reconcile it separately.'),
  ],
  [
    entry('MEDIA-CONSTRAINTS',[
      table('Different measurements answer different questions',['Term','Meaning','Selection consequence'],[
        ['Capacity / bandwidth in bit/s','How much data a link can carry per second under specified conditions.','Enough usable capacity is needed for the workload.'],
        ['Actual transfer rate','Data successfully delivered per second during this transfer.','Sharing, protocol overhead and weaker signals can reduce it below a nominal capacity.'],
        ['Latency','Time taken for data to travel or for a response to arrive; response time also includes processing.','Interactive work can feel slow even on a link that carries large files quickly.'],
        ['Attenuation','Signal strength decreases during propagation.','Longer distances may require suitable media or regeneration.'],
        ['Interference','Unwanted signals disturb reception.','Electrical noise matters for copper and radio; fibre is not affected by electromagnetic interference in the same way.'],
      ]),
      p('A fixed desktop has a convenient cable endpoint; a walking tablet does not. A wireless link avoids a cable to the moving device, but shared coverage, obstruction and interference affect service. A cable requires installation and constrains movement, while offering a more controlled path. Compare a particular link and task, not a universal claim that every wired link is faster than every wireless link.','Connect mobility and installation to the choice'),
    ],['Compare capacity, achieved rate and latency separately.','Distance, interference, mobility and installation constraints determine suitability.'],'A link transfers a large file quickly but has long response delays. Which two properties should you distinguish?','Its achieved transfer rate can be high while its latency is also high; bit/s and time delay measure different properties.'),
    entry('MEDIA-CARRIERS',[
      table('Follow the carrier and its practical consequence',['Medium','How data is represented','Why select it / what limits it'],[
        ['Copper Ethernet cable','Changing electrical signals travel through conductors.','Economical for short fixed runs; attenuation and electromagnetic interference limit suitable runs and environments.'],
        ['Fibre-optic cable','Light pulses travel through optical fibre.','High capacity over suitable long runs and immunity to electrical interference; installation, termination and equipment can cost more.'],
        ['Radio / WiFi access','Electromagnetic waves travel through space to an access point or another radio receiver.','Mobility and cable-free access; coverage, obstacles, interference and sharing affect achieved service.'],
      ]),
      p('WiFi is a family of wireless networking technologies using radio waves; it is not a synonym for the internet. Microwaves are also part of the radio spectrum. The next unit uses “microwave link” for a directional point-to-point application, separating its installation requirements from the local WiFi access example. A signal carrier and the service carried over it are different classifications.','Avoid overlapping-category mistakes'),
    ],['Copper carries electrical signals; fibre carries light; wireless links use electromagnetic waves.','Match the medium to distance, noise, cost and movement; WiFi is local access rather than the internet itself.'],'Why is fibre suitable for a long link across an electrically noisy factory?','It supports appropriate long high-capacity links and carries light rather than an electrical signal susceptible to the factory’s electromagnetic interference.',physicalMedia),
    entry('MICROWAVE',[
      steps('Evaluate a link between two fixed buildings',[
        ['Requirement','Buildings face each other across ground where digging is prohibited. Both have suitable mounting positions and a clear line of sight.'],
        ['Mechanism','Aligned directional antennas send and receive microwave signals along the unobstructed path. Pointing and clear propagation space matter.'],
        ['Choice','A terrestrial microwave link avoids laying cable across that ground and can carry the required traffic if the selected equipment and link conditions support it.'],
        ['Changed condition','A new obstruction blocks the path. Repositioning antennas, using a suitable relay or selecting another route/medium is needed; simply labelling the connection wireless does not remove the obstruction.'],
      ]),
    ],['Directional terrestrial microwave links need an appropriate clear, aligned path.','Justify them when cable installation is difficult and the path and capacity are suitable.'],'Why would a newly built tower between two microwave antennas matter?','It can obstruct the propagation path and weaken or block reception, so the original line-of-sight assumption no longer holds.'),
    entry('SATELLITE',[
      steps('Carry a message from an offshore vessel',[
        ['Uplink','The vessel’s terminal transmits a signal towards a suitable satellite. Antenna visibility, equipment and service coverage must support the connection.'],
        ['Relay and downlink','The satellite relays the communication to a ground station or another supported route; terrestrial provider infrastructure carries it onward to the destination service.'],
        ['Response','The service response travels back through the provider and satellite system to the vessel. Both outward and return paths contribute delay.'],
        ['Decision','Satellite can reach an offshore location lacking cable and terrestrial cellular coverage, with equipment, service cost, weather effects and propagation delay to consider.'],
      ]),
    ],['Satellite communication uses an uplink, relay and downlink to connect distant coverage areas.','Choose it for required coverage while considering service cost, visibility and delay.'],'Does a high satellite download rate prove that an interactive call will have little delay?','No. Transfer capacity and propagation delay are separate; a long signal path can add delay even when the data rate is high.',undefined,[extension('orbit and propagation delay','A farther satellite generally creates a longer propagation path and more delay for comparable endpoints. Lower-orbit systems can reduce this part of delay but require changing satellite coverage and supporting infrastructure. Actual end-to-end delay also includes routing and processing; no single delay value applies to every satellite service.')]),
    entry('MEDIA-SELECTION',[
      table('Complete five choices under stated conditions',['Requirement','Choice and causal reason','Trade-off / changed condition'],[
        ['30 m fixed office desktop; low cost; ordinary electrical environment','Copper Ethernet: a short fixed run with economical interfaces and cabling.','Cable restricts movement; reconsider if the route is much longer or electrically noisy.'],
        ['500 m factory link; high capacity; strong electrical noise','Fibre: suitable distance and capacity without electromagnetic interference in the carrier.','Budget for installation and optical equipment.'],
        ['Tablets moving around a classroom','WiFi: wireless access lets them move within coverage.','Check coverage and shared capacity; a cable would constrain movement.'],
        ['Fixed buildings; no digging; clear aligned path','Directional microwave: avoids laying a cable across the ground.','Obstruction or poor alignment can invalidate the path.'],
        ['Offshore vessel beyond terrestrial coverage','Satellite: service can cover the remote location.','Check visibility, service availability, equipment cost and delay.'],
      ]),
      p('State the deciding condition, choose a suitable medium, then explain one relevant cost or limitation. If the conditions change, the conclusion may change. Do not claim fibre is always cheapest, satellite always has one fixed delay, or WiFi always supplies its advertised rate. Where several media meet the requirement, justify the selected trade-off rather than pretending only one name is possible.','Build a defensible selection'),
    ],['Use the scenario’s distance, noise, movement, installation and coverage requirements.','Explain one causal advantage and a relevant limitation, then reconsider changed conditions.'],'If the fixed 30 m desktop becomes a tablet used while walking, why might the original copper choice change?','Mobility becomes the deciding condition; WiFi avoids a tethered device while requiring adequate coverage and shared capacity.'),
  ],
  [
    entry('LAN-DEVICES',[
      table('Give each device one clear responsibility',['Component','Role in this LAN'],[
        ['NIC / WNIC','Connects a device to the network through a wired / wireless interface. The link uses its MAC address.'],
        ['WAP','Provides wireless access and bridges traffic into the wired LAN; it does not inherently replace a router.'],
        ['Cabling','Carries signals on each physical wired link, including the independent switch links.'],
        ['Server','Provides an application or shared resource; its NIC still needs a network connection.'],
        ['Switch','Uses destination MAC information and its forwarding table to select a LAN output port.'],
      ]),
      steps('Local request and response with a known table',[
        ['Given state','Laptop MAC L is reachable via WAP on switch p1; desktop D on p2; server S on p3; gateway on p4. The laptop already knows S’s address and the forwarding table is correct.'],
        ['Send request','The laptop sends a frame addressed to S through its WNIC and WAP. The frame enters the switch on p1.'],
        ['Forward','The switch finds S on p3 and forwards the frame there. It does not send this known unicast frame to every port.'],
        ['Return result','The server sends a response frame addressed to L. It enters p3; the table selects p1; WAP delivers it to the laptop by radio.'],
        ['Check the boundary','The router is not needed for this same-LAN exchange. If an address is not yet known, extra discovery/forwarding behaviour would be needed; that is not silently assumed in this trace.'],
      ]),
    ],['NIC/WNIC supplies the interface; WAP supplies wireless access; a server provides the service.','A switch forwards a known local unicast frame using its destination MAC and port table.'],'Why is p4 not used for the example laptop-to-server request?','The destination server is on the same LAN via p3. The gateway on p4 is not needed for this local delivery.',visuals.lan),
    entry('BRIDGE',[
      steps('Filter one frame; forward another',[
        ['Given state','A and B occupy the left segment, attached through bridge port 1. C occupies the right segment through port 2. The learned table contains A→1, B→1 and C→2.'],
        ['A sends to B','The bridge receives the frame on port 1. B is also on port 1, so the bridge filters it: no copy crosses to port 2. B can receive the frame on the left segment.'],
        ['A sends to C','The next frame arrives on port 1 but C is known on port 2. The bridge forwards it through port 2, where C receives it.'],
        ['Consequence','Local traffic need not consume the other segment. Filtering here is a destination-based forwarding decision, not a firewall rule rejecting an unauthorised user.'],
      ]),
      p('A bridge joins LAN segments and decides which frames need to cross. A switch applies the same broad link-level forwarding principle across multiple ports. Both decisions differ from a router choosing the next network using an IP destination.','Connect the devices without merging their jobs'),
    ],['A bridge uses destination MAC location to filter local-segment traffic or forward it across segments.','Filtering at the bridge does not prevent delivery within the original segment.'],'C sends to A with the same known table. What does the bridge do?','It receives on port 2, finds A on port 1 and forwards through port 1.',visuals.bridge),
    entry('REPEATER',[
      p('As a signal travels, attenuation weakens it and distortion can make its states harder to distinguish. A repeater receives a still-decodable signal and regenerates it for the next segment, restoring its usable shape and strength rather than merely amplifying every disturbance. It must be placed where the incoming signal is still recoverable.','Why regeneration is needed'),
      p('Suppose the first segment delivers a weakened but readable binary signal. The repeater recognises the bits, emits regenerated signalling onto the next segment, and the receiving device obtains the carried data. If the incoming signal is too corrupted to decode correctly, regeneration cannot infer the originally intended bits. A repeater also cannot choose a less congested route or supply missing service capacity.','Trace the useful case and its boundary'),
    ],['A repeater regenerates a weakened but recoverable signal to extend a link.','It does not filter by destination or route between IP networks.'],'Can a repeater choose whether the destination is on the left or right LAN?','No. It regenerates signals; a bridge or switch makes link-level destination decisions.'),
    entry('ROUTER',[
      steps('Send from this LAN to a server on another network',[
        ['Given state','The laptop has determined that the server’s IP is outside its local subnet. The gateway’s MAC address and a valid onward route are already known; assume no NAT in this private-network example.'],
        ['Local link','The IP packet names the remote server as destination. Its LAN frame instead names the gateway interface as immediate destination and travels WNIC → WAP → switch p1 → p4 → router.'],
        ['Network boundary','The router reads the destination IP, consults its routing information and forwards towards the destination network in an appropriate outgoing link frame. Link-level recipient information can change at a boundary.'],
        ['Delivery and response','On the destination network, the packet reaches the server. The reply names the original laptop as destination and uses suitable return routes; on the home LAN the gateway sends towards L via switch p4 → p1 → WAP.'],
      ]),
      p('The destination network decision is introduced here and calculated with an address and subnet mask in Lesson 014. Routing does not imply that the router stores the requested web page, converts every access signal like a modem, or always changes the IP destination into the gateway’s address.','Prepare the next lesson without hiding the mechanism'),
    ],['A router forwards between networks using destination IP and routing information.','For a remote packet, the immediate LAN recipient is the gateway while the final IP destination is the remote host.'],'For a remote request, is the destination IP replaced with the gateway IP?','No in the routing example. The gateway is the immediate link-level recipient; the packet’s destination remains the remote server.'),
    entry('CSMA-CD',[
      p('Two stations on a shared half-duplex medium can both sense idle and start nearly together. The first signal takes time to reach the other station, so carrier sensing cannot prevent every collision. While transmitting, each station monitors the medium; detecting a collision shows that the current attempt cannot be relied on.','Explain why an idle check is insufficient'),
      steps('Trace a collision to two successful transmissions',[
        ['Sense and start','A and B each observe idle before the other’s signal arrives and begin transmitting. The signals overlap on the shared medium.'],
        ['Detect and stop','They detect the collision, stop the attempted frames and send a jam signal so the collision is recognised.'],
        ['Choose waits','Each chooses a random backoff. In this selected attempt A has a shorter wait; the waits are not guaranteed to differ.'],
        ['A retries','When its wait ends, A senses again. The medium is idle, so A transmits while monitoring for another collision. This time it completes.'],
        ['B defers and retries','If B’s wait ends while A is transmitting, B must defer because the medium is busy. Once idle under the access rules, B can retry and complete.'],
        ['Equal-wait boundary','If both choose the same wait and start together again, another collision is possible; they detect it and repeat the backoff process. Random delay reduces repeated conflict but does not guarantee the next attempt succeeds.'],
      ]),
    ],['CSMA/CD senses, transmits while monitoring, detects collision, stops/jams, waits randomly and senses again.','Apply it to shared half-duplex Ethernet, not modern switched full-duplex links.'],'A station’s random wait expires while another is transmitting. Must it transmit immediately?','No. It senses a busy medium and defers. Timer expiry alone is not permission to transmit.',visuals.csma),
  ],
  [
    entry('STREAMING',[
      table('Compare how playback receives its content',['Case','Availability and playback','Buffer role'],[
        ['On-demand streaming','A recorded item exists already; the viewer chooses when to start and may seek to available positions.','Downloaded portions wait for playback; delivery and consumption proceed at the same time.'],
        ['Real-time / live streaming','Content is produced as the event happens, so future content does not yet exist.','A reserve smooths short variations but adds delay behind the live event.'],
        ['Complete download then play','Playback waits for the complete file to be stored.','Network interruptions during later local playback no longer affect delivery of that already downloaded file.'],
      ]),
      p('Before progressive playback begins, the player can accumulate an initial reserve. With an empty buffer, arrival 6 Mbit/s and a target reserve of 12 Mbit, it takes 12 / 6 = 2 s to fill before playback, ignoring overhead. Consumption is zero during that startup interval. Once playback starts at 4 Mbit/s, arrival and consumption both affect the level.','Separate startup from ongoing playback'),
      p('Bit rate is data per second; buffer content and capacity are quantities of data. Use compatible units: 1 byte is 8 bits. A 4 Mbit/s stream consumes 4 Mbit in each second under the constant-rate model, not 4 megabytes. Compression can reduce the media rate, subject to quality and encoding choices; Lesson 006 supplies that foundation.','Connect stored quantity to rate'),
    ],['Streaming starts playback before the entire file arrives; live content is produced as time passes.','A startup reserve takes time to accumulate; playback then consumes buffered data.'],'While waiting for an empty buffer to reach the startup target, should you subtract the playback bit rate?','No. Playback has not started in this model, so consumption is zero during startup.'),
    entry('BUFFER-RATES',[
      p('During an interval with constant rates and uninterrupted playback, new content = old content + (arrival rate − playback rate) × interval duration. Mbit/s multiplied by seconds gives Mbit. Apply the rule separately to each interval and carry the previous final content into the next one. The result is valid only until a boundary such as empty or full is reached.','Account for arrivals and consumption'),
      table('Complete trace: capacity 32 Mbit; 12 Mbit present at t = 0; playback 4 Mbit/s',['Interval / s','Arrival / Mbit/s','Net change / Mbit','Content at end / Mbit'],[
        ['0–4','6','(6 − 4) × 4 = +8','12 + 8 = 20'],['4–9','4','(4 − 4) × 5 = 0','20'],['9–19','2','(2 − 4) × 10 = −20','0'],
      ]),
      p('The graph reaches zero at t = 19 s. If input remains 2 Mbit/s, it cannot supply uninterrupted 4 Mbit/s playback beyond that instant; the player must pause/rebuffer or change its consumption rate. Do not continue the line into negative stored data. At a full buffer, further growth stops at capacity and delivery must be controlled; do not invent stored content above 32 Mbit.','Interpret the two physical boundaries'),
      table('Change one condition and predict the result',['Variant','Calculation / conclusion'],[
        ['A 3 s outage starts with 20 Mbit; playback remains 4 Mbit/s','20 − 4 × 3 = 8 Mbit remains, so the reserve covers the outage. A 5 s outage consumes all 20 Mbit.'],
        ['Same 32 Mbit capacity; initial content 8 instead of 20; arrival 2, playback 4','The deficit is 2 Mbit/s. Empty after 8 / 2 = 4 s rather than 20 / 2 = 10 s. Capacity is not the current reserve.'],
        ['At t = 9 reduce playback from 4 to 2 Mbit/s while arrival is 2','The 20 Mbit level is then constant. A suitable lower-rate rendition may avoid a pause with reduced quality.'],
        ['Arrival exceeds playback but the buffer is already full','The unconstrained formula predicts growth, but actual content stays at capacity; incoming delivery must adapt or excess cannot be retained.'],
      ]),
    ],['Update the buffer one interval at a time with compatible data/rate/time units.','A finite reserve covers a temporary deficit; a sustained deficit eventually requires a pause or lower playback rate.'],'A 32 Mbit buffer currently holds 8 Mbit. Input is 2 Mbit/s and playback 4 Mbit/s. Is time to empty 16 s?','No. Use the current 8 Mbit reserve: 8 / (4 − 2) = 4 s. Capacity is not the amount already stored.',visuals.buffer),
  ],
  [
    entry('INTERNET-WWW',[
      steps('Place a web request within the wider internet',[
        ['Infrastructure','The internet interconnects networks using shared communication protocols and routing. Home, school and provider networks are parts of this larger system.'],
        ['One service','The WWW supplies linked web resources accessed by browsers and served by web servers using HTTP/HTTPS. A web request uses the underlying internet to travel.'],
        ['Other services','Email, remote access and file-transfer applications can also use the internet without being the WWW. A working internet connection does not prove that a particular web server is available.'],
      ]),
      p('A WiFi connection first establishes local wireless access. The local network still needs a working onward connection, routing and any required service access to reach a remote website. A printer can remain reachable on the LAN while the provider link is down.','Trace which layer of the experience failed'),
    ],['The internet is interconnected network infrastructure; the WWW is one service carried over it.','Local WiFi, internet reachability and availability of one web service are different conditions.'],'A local printer works but an external website does not. Does that prove WiFi is broken?','No. The local wireless path may work while the onward connection, DNS or the web service has failed.'),
    entry('MODEM',[
      p('Modulation represents digital data by changes in a carrier signal appropriate to the access medium. Demodulation recovers the carried digital data from the received signal. In the telephone-access example, a sending modem performs modulation and the modem at the receiving end performs demodulation. “Modem” combines those two names because communication normally needs both directions.','Follow the conversion responsibility'),
      steps('Reverse the direction for a returned result',[
        ['Outward request','The home system supplies digital request data. Its modem modulates it onto the telephone access signal; the provider modem demodulates the received signal for onward digital communication.'],
        ['Return response','The provider modem now modulates return data. The home modem demodulates the incoming signal and supplies digital data to the home system.'],
        ['Separate equipment roles','A router chooses where to forward a packet. A modem adapts the access signal. A combined home box may contain both functions without making their definitions identical.'],
      ]),
    ],['Modulation puts data onto an appropriate carrier; demodulation recovers it.','Both ends send and receive, so their conversion roles reverse on the return path.'],'Which modem demodulates the response arriving back at the home?','The home modem. On this return direction, the provider modem is the sender.',visuals.pstn),
    entry('PSTN',[
      p('The public switched telephone network connects telephone users through switching infrastructure. In the illustrated dial-up access arrangement, the user establishes a switched telephone connection to a provider’s modem endpoint; the provider supplies onward internet access. Establishing that connection and the limited access data rate are relevant drawbacks for sustained modern media traffic.','Describe the chosen access arrangement'),
      p('PSTN names a telephone network, not an assertion that every internal link is analogue. The illustration focuses on the access signal and the modem conversion at its ends; internal transport can be digital. A telephone service, a modem access arrangement and the global internet are related components with different jobs.','Keep the scope of the diagram precise'),
      p('Follow request data from the home system to its modem, across the established telephone connection to the provider modem, then through the provider network to the service. Return data follows a connection back and reverses the modulation/demodulation roles. Losing the telephone access connection breaks this path even if the destination service is still running.','Complete the path through to a result'),
    ],['PSTN provides switched telephone connections that can support a modem access example.','Explain the access link without claiming that the whole telephone network is analogue.'],'Is “PSTN” another name for the WWW?','No. PSTN is telephone-network infrastructure; the WWW is a service reached through an appropriate internet connection.'),
    entry('DEDICATED-LINE',[
      steps('Connect a branch through a dedicated service',[
        ['Requirement','A branch needs an ongoing connection to its provider or another site with contracted capacity and availability characteristics.'],
        ['Arrangement','A dedicated line reserves the agreed connection for that customer or site; it need not be dialled anew for each session. Provider infrastructure carries the service.'],
        ['Exchange','The branch router forwards a request over the line and onward to the destination. The server processes it and sends the response back through the network connection.'],
        ['Trade-off','The recurring cost can be higher than a shared consumer service. A dedicated access connection can improve predictability under its contract but does not guarantee that every later internet link or remote server is uncongested.'],
      ]),
    ],['A dedicated line supplies a reserved continuing connection under its service arrangement.','Weigh predictable contracted service against cost and remaining end-to-end dependencies.'],'Does a dedicated office access line guarantee that every public website responds immediately?','No. Other network segments, distance and remote-server processing can still delay the response.'),
    entry('CELLULAR',[
      steps('Use and then change the serving cell',[
        ['Start','A phone with network access transmits by radio to its serving base station. The operator network connects that station onward to the requested internet service.'],
        ['Return','The service produces a response that returns through the operator and serving station to the phone. A base station supplies access rather than storing every requested internet resource.'],
        ['Move','As the phone travels, a successful handover transfers its service to a suitable neighbouring base station. The serving radio link changes while communication may continue.'],
        ['Boundary','Coverage gaps, obstructions or overloaded cells can interrupt or reduce service. Mobility support does not mean a usable signal exists everywhere.'],
      ]),
    ],['A cellular device uses radio to a base station and operator infrastructure for onward access.','Handover supports movement between cells; coverage and capacity remain limits.'],'Why can a travelling phone lose service despite supporting handover?','There may be no suitable next cell, or the next cell may lack usable signal or capacity. Handover cannot create missing coverage.',visuals.cellular),
  ],
  [
    entry('IP-FORMATS',[
      steps('Derive the IPv4 format from bits',[
        ['One octet','Eight bits have 2^8 = 256 patterns. As an unsigned value, an octet therefore ranges from 0 through 255 inclusive.'],
        ['Four octets','Four groups contain 4 × 8 = 32 bits. Dotted decimal writes their values, for example 192.168.20.150; 192.168.20.300 is invalid because 300 exceeds an octet.'],
        ['IPv6 comparison','An IPv6 address has 128 bits. In full notation, eight groups each contain four hexadecimal digits, giving 8 × 16 = 128 bits. The larger address space supports far more distinct address values.'],
      ]),
      p('An IP address is assigned to a network interface. A router has interfaces on different networks and therefore needs appropriate addresses for those interfaces. “This computer’s IP” is convenient speech but can hide multiple interfaces and addresses. In these lessons, any 192.0.2.x, 198.51.100.x or 203.0.113.x public-side example is a documentation address in a hypothetical network, not a live destination to contact.','Locate the address correctly'),
    ],['IPv4 has 32 bits: four decimal octets from 0 to 255. IPv6 has 128 bits.','Associate IP addresses with interfaces and use the supplied network context.'],'Why is 256 invalid in one dotted-decimal IPv4 group?','An octet has 256 possible values starting at zero; its largest unsigned value is 255.',undefined,[extension('read one compressed IPv6 address','Hexadecimal leading zeros may be omitted within a group. One :: can replace a sequence of zero groups: 2001:db8::1 expands to 2001:0db8:0000:0000:0000:0000:0000:0001. Count back to eight groups. Using :: twice would make the number of omitted groups ambiguous. 2001:db8::/32 is reserved for documentation; full IPv6 configuration is beyond this lesson.')]),
    entry('SUBNET',[
      p('Subnetting divides an address space into smaller networks so an interface can decide which destinations are local and which need a router. A subnet mask marks the network bits with 1s and host bits with 0s. A /24 prefix has 24 network bits; /26 has 26. To find a network address, AND the address and mask bit by bit: only 1 AND 1 produces 1.','Teach the operation before using the mask'),
      table('One-bit AND',['Address bit','Mask bit','Result'],[['0','0','0'],['0','1','0'],['1','0','0'],['1','1','1']]),
      table('Last-octet calculation: /26 mask is 255.255.255.192',['Value','Last octet in binary','AND 11000000','Network'],[
        ['Host 192.168.20.150','10010110','10000000 = 128','192.168.20.128/26'],['Destination 192.168.20.180','10110100','10000000 = 128','192.168.20.128/26: local'],['Destination 192.168.20.210','11010010','11000000 = 192','192.168.20.192/26: routed'],
      ]),
      steps('Complete delivery from 192.168.20.150/26',[
        ['Network and block','The first three octets stay unchanged because they are masked by 255. Six host bits remain, giving 64 addresses: the host lies in block 128–191.'],
        ['Address roles','In this ordinary IPv4 subnet, .128 is the network address and .191 the broadcast address; ordinary host addresses are .129 through .190. Use the supplied gateway .129; do not invent a gateway merely from the mask.'],
        ['Local destination','For .180, the network result equals the source network. Send locally using the destination’s LAN address information.'],
        ['Remote destination','For .210, the network result differs. Send the packet towards the supplied gateway; the IP destination remains .210, while the immediate LAN frame recipient is the gateway.'],
      ]),
      p('A /24 mask ends in 00000000, so all last-octet host bits are cleared: 192.168.20.150/24 gives network 192.168.20.0/24. Under that mask both .180 and .210 are local. The address alone is insufficient; the prefix changes the local-network decision. These examples teach ordinary LAN subnets, not special-purpose /31 or /32 addressing.','Change the mask, not just the host number'),
    ],['AND source and destination with the same subnet mask and compare the network results.','Equal means local; different means send via the supplied gateway, retaining the remote IP destination.'],'For host .150/26, does a destination ending .191 represent an ordinary unicast host in its subnet?','No. In 192.168.20.128/26, .191 has all six host bits set and is the subnet broadcast address.',visuals.subnet),
    entry('PUBLIC-PRIVATE',[
      p('A private IPv4 address belongs to a reserved private range and can be reused in separate private networks. It is not routed as a globally reachable public destination across the public internet. A public address can identify an internet-facing interface under valid allocation and routing, although reachability still depends on routing, firewalls and services. “Public” is not a promise that every port is open.','Separate scope from reachability'),
      steps('Follow a simple IPv4 NAT exchange',[
        ['Given arrangement','Private host 192.168.1.10 reaches an external server through a router. In this hypothetical public-side network, the router’s external interface is represented by documentation address 203.0.113.5.'],
        ['Outgoing request','The router translates the outgoing private source IPv4 address to its external address and retains mapping information. The destination remains the external server.'],
        ['Matching reply','The reply reaches the external interface. Translation state maps it back to the private host, and the router forwards it onto the LAN.'],
        ['Limit','NAT supports this address translation; it does not by itself guarantee security or recover an unavailable server. Routing between two private subnets can work without NAT.'],
      ]),
    ],['Private IPv4 addresses are for private networks; public-side addressing has a different routing scope.','NAT can map a private host’s IPv4 traffic through an external address; it is separate from subnet selection and security policy.'],'Must routing from private subnet A to private subnet B change the source address through NAT?','No. A router with suitable routes can forward between private subnets without NAT.',visuals.publicIP,[extension('recognise the reserved private IPv4 ranges','Use these ranges to recognise private examples. Their use does not specify whether an address was assigned statically or dynamically.',[materialTable('Private IPv4 ranges',['Prefix','Inclusive address range'],[['10.0.0.0/8','10.0.0.0–10.255.255.255'],['172.16.0.0/12','172.16.0.0–172.31.255.255'],['192.168.0.0/16','192.168.0.0–192.168.255.255']])])]),
    entry('ASSIGNMENT',[
      table('Scope and assignment are independent axes',['Combination','Example arrangement','Practical consequence'],[
        ['Private + static','A local printer has a deliberately fixed private address.','Clients can consistently locate it locally; it is still private.'],
        ['Private + dynamic','A visitor laptop leases an address from the LAN’s address service.','Less manual configuration; its address may change between allocations.'],
        ['Public + static','An organisation obtains a fixed public-facing service address.','The endpoint can retain a stable address while still requiring suitable routing and access rules.'],
        ['Public + dynamic','A provider dynamically allocates the customer’s public access address.','It has public routing scope but is not guaranteed to remain the same after reallocation.'],
      ]),
      p('A static assignment is intended to stay fixed until deliberately changed. A dynamic assignment is supplied automatically for a period or connection and may later change; it does not have to change on every renewal. Administrators must avoid conflicting assignments. The digits alone do not reveal whether a given private or public address was assigned manually, reserved, or leased.','State what assignment actually tells you'),
    ],['Public/private describes routing scope; static/dynamic describes assignment behaviour.','All four combinations are possible; a dynamic address may be renewed unchanged.'],'A printer always uses 192.168.1.20. Does its stable address make it public?','No. Stability concerns assignment. 192.168.1.20 remains in private IPv4 space.',undefined,[extension('a DHCP lease and renewal','A DHCP service can automatically supply a client with an IP address and settings such as a subnet mask, gateway and DNS resolver. A lease has a lifetime. Renewal may keep the same address; a later allocation may differ. This explains dynamic assignment without requiring the detailed DHCP message sequence.')]),
    entry('DNS-RESOURCE',[
      table('Separate parts of a URL',['Part of https://museum.example.org/gallery/map.html','Responsibility'],[
        ['https','The scheme indicates HTTPS communication.'],['museum.example.org','The domain name identifies the named service host for resolution.'],['/gallery/map.html','The path identifies a resource to request from that service.'],
      ]),
      steps('From the typed URL to a displayed resource',[
        ['Starting assumptions','The client has a working connection and configured DNS resolver, and no usable cached mapping. In this hypothetical example, the name maps to documentation address 203.0.113.60.'],
        ['Resolve','The client requests an address for museum.example.org. The resolver obtains or supplies the mapping and sends the address back; it is not asked to locate the path inside the website.'],
        ['Choose delivery','The client compares the returned address with its local subnet. If remote, it sends towards its gateway; routers carry the traffic to the destination network.'],
        ['Request','The browser establishes the required connection and requests /gallery/map.html from that named web service. The server locates or generates the resource.'],
        ['Return and display','The web server sends the resource response through the network to the browser, which interprets and displays it. DNS supplied addressing information; the web server supplies the content.'],
        ['Changed outcome','A valid DNS answer does not prove that the server is running or the path exists. The later connection can fail or the server can return a missing-resource response.'],
      ]),
    ],['DNS resolves the domain name; the browser then requests the resource path from the web service.','Keep the DNS query/reply separate from the web request/content response.'],'If the domain resolves but /gallery/map.html is missing, should DNS return the missing page?','No. DNS has completed name resolution. The web server handles the resource request and can report that the path is missing.',visuals.dns,[extension('a usable DNS cache entry','A client or resolver may reuse a still-valid cached mapping, so it need not perform the entire lookup sequence for every visit. An expired or absent entry requires resolution. Caching changes how the address is obtained; it does not make DNS supply the requested page.')]),
  ],
];

function authorReview(lesson) {
  const target = lesson.units.find(unit=>unit.syllabusId === 'REVIEW-1-2');
  if (!target) throw new Error('Missing Section 2 unit in Paper 1 review');
  const objectiveIds = lesson.objectives.filter(([id])=>id.startsWith('S2.')).map(([id])=>id);
  return {...lesson, units:lesson.units.map(unit=>unit!==target ? unit : {...unit,unitKey:'S2-REVIEW',objectiveIds,masteryCheck:{prompt:'Diagnose the design, hardware, buffer and address-to-resource tasks using the supplied conditions.',answerCriteria:['Separate network scope, service roles, client processing and physical layout.','Trace forwarding and collision recovery within their stated scope.','Calculate changes from current buffer contents, rates and durations.','Use subnet information and follow DNS and web exchanges separately.']},preserveTeachingSteps:true,useAuthoredVisual:true,
    teachingBlocks:[
      p('A mobile museum terminal retrieves an exhibit record from a hosted service. Diagnose the complete system by locating each responsibility: local access, onward link, addressing, remote service and returned content. A correct name must be connected to the stated requirement or failure.','Connect the section as one system'),
      table('Follow the request and identify evidence',['Stage','Decision or mechanism','What can fail independently'],[
        ['Design','Choose LAN/WAN scope, client-server/P2P roles, thin/thick processing, topology and carrier from separate requirements.','A suitable service model does not create a spare physical link or guarantee radio coverage.'],
        ['Access and forwarding','WNIC → WAP → switch; MAC and known ports guide local frames, while routers handle other networks.','A device, cable or central switch can fail; shared half-duplex collision handling has a separate scope.'],
        ['Address and resource','Use the prefix to choose local/gateway delivery; distinguish scope from assignment; resolve the domain before requesting a resource.','DNS success, network delivery and an existing server resource are different conditions.'],
        ['Media and cloud dependence','Compare arrival and playback rates, current reserve and capacity; follow the hosted request and response.','A finite buffer cannot cover an indefinite deficit. A backup captures only retained state and requires a usable recovery service.'],
      ]),
      p('Use the four Section 2 diagnosis questions below to test design, forwarding and collision behaviour, rate calculations, and address-to-resource flow. For revision, return to Lessons 007–014 when a step depends on a label you cannot yet explain.','Apply the complete chain'),
    ],explanation:['Justify designs from their constraints and trace packets, frames and responses through named devices.','Calculate buffer and subnet decisions with supplied values; distinguish failed dependencies before proposing recovery.'],materials:[materialTable('Four independent diagnosis tasks',['Task','Evidence to produce'],[['Design','Separate scope, model, client processing and cloud dependence.'],['Hardware','Trace a known port and explain a collision retry.'],['Buffer','Calculate successive stored quantities and an empty boundary.'],['Address and resource','Choose the next hop, resolve a name and follow the returned resource.']])],checkpoint:{prompt:'A DNS lookup succeeds but playback pauses. Which quantities would you inspect before blaming name resolution?',answer:'Inspect the current buffered content and the arrival and playback rates over time. DNS success does not guarantee sustained delivery at the required media rate.'},misconceptions:['A label such as cloud, mesh, public or dynamic does not establish every other property of the system.'],
  }),practice:[...lesson.practice,...section2ReviewPractice(objectiveIds)]};
}

export function authorSection2Lesson(lesson) {
  if (lesson.kind === 'review' && lesson.paper === 1) return authorReview(lesson);
  if (lesson.section !== 2) return lesson;
  const index = Number(lesson.lessonKey.split('L')[1])-1;
  const specs = section2Teaching[index];
  if (!specs || specs.length !== lesson.units.length) throw new Error(`Section 2 teaching mapping changed: ${lesson.lessonKey}`);
  return {...lesson,
    ...(index === 1 ? {diagnostic:{prompt:'A computer has two drawn lines crossing beside it, but neither line ends at the computer. Does the drawing establish a connection to that computer?',answer:'No. Follow explicit endpoints and labelled nodes. A line crossing is not automatically a connection or a forwarding device.'}} : {}),
    units:lesson.units.map((unit,i)=>{
      const spec=specs[i];
      let materials=unit.materials;
      if (spec.visual) materials=[spec.visual,...materials.filter(m=>!['reviewed-visual','analogy','topology-gallery','address-demo','url-demo'].includes(m.type))];
      // The original reservoir remains a bounded analogy beside the exact rate graph.
      if (spec.key === 'BUFFER-RATES') materials=materials.map(m=>m.type==='reservoir'?{...m,preserve:true}:m);
      const selectedVisual = spec.visual ?? visualContexts[spec.key] ?? (spec.key === 'MICROWAVE' ? mechanismVisual('microwave-path') : spec.key === 'SATELLITE' ? mechanismVisual('satellite-path') : null);
      if (!spec.visual && selectedVisual) materials=[selectedVisual,...materials.filter(m=>!['analogy','reviewed-visual'].includes(m.type))];
      const repeatedFlows = new Set(['SERVICE-MODELS','CLOUD-RESOURCES','LAN-DEVICES','REPEATER','ROUTER','CSMA-CD','MODEM','PSTN','CELLULAR','DNS-RESOURCE']);
      if (repeatedFlows.has(spec.key)) materials=materials.filter(m=>m.type!=='flow');
      return {...unit,unitKey:`S2-${spec.key}`,syllabusId:unit.objectiveIds[0].replace(/\.A\d+$/,''),
        teachingBlocks:[...unit.explanation.map((s,j)=>p(s,j===0?'Establish the concept':undefined)),...spec.blocks],
        explanation:spec.essentials,checkpoint:spec.checkpoint,preserveTeachingSteps:true,
        ...(selectedVisual ? {useAuthoredVisual:true} : {}),
        materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds})),
        ...(spec.extensions.length ? {extensions:spec.extensions.map(e=>({...e,materials:e.materials.map(m=>({...m,objectiveIds:unit.objectiveIds}))}))} : {}),
      };
    }),
    practice:[...lesson.practice,...section2AdditionalPractice(index,lesson)],
  };
}
