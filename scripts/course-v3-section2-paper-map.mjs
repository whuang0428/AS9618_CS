// Reviewed against the original QP/MS PDFs, not the legacy whole-requirement tags.
// IDs identify the relevant course objectives; notes retain partial/alternative scope.
const ids = (requirement, ...numbers) => numbers.map(number => `S2.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);

export const section2PaperObjectives = Object.freeze({
  E011: ids(2, 1),
  E012: ids(3, 1),
  E013: [...ids(4, 2), ...ids(5, 1)],
  E014: ids(6, 3),
  E015: ids(8, 2, 3, 4),
  E016: ids(11, 1),
  E017: ids(11, 2),
  E018: ids(12, 1, 4),
  E019: ids(14, 2),
  E020: ids(15, 1, 2, 5, 6),
  E2D01: ids(1, 2, 3),
  E2D02: [...ids(4, 3), ...ids(5, 2)],
  E2D03: [...ids(10, 1), ...ids(9, 1, 3, 4)],
  E2D04: ids(14, 4),
  E2D05: ids(16, 1, 2, 3)
});

export const section2PaperCoverageNotes = Object.freeze({
  E011: '5(a) identifies and describes the bank server and smartphone client. It does not compare peer-to-peer with client-server or justify selecting a model.',
  E012: '3(b) applies two thin-client characteristics to marking software. It does not assess thick clients or choosing between client types; a complete account of every thin-client characteristic is not required for four marks.',
  E013: '5(b) traces transmission in the stated star through a central device. It does not assess bus, mesh or hybrid paths, failure effects or topology selection. The switch/MAC explanation supplies the precise wired-LAN example.',
  E014: '8(a)(i–ii) asks for two benefits and two drawbacks. Public/private cloud distinctions and choosing a cloud deployment are not directly assessed.',
  E015: '9(b) requests two media other than copper with matching descriptions. Fibre and radio/microwave carrier mechanisms are relevant; radio and microwaves are alternatives in the official scheme, not three separately required answers. WiFi operation, directional line-of-sight, satellites, full medium characteristics and scenario selection remain separate checks.',
  E016: '1(d) describes Ethernet for up to three marks. The official scheme offers CSMA/CD as an alternative, so the task follows collision teaching. It does not require a complete collision trace or explanation of random backoff. The teacher explanation distinguishes MAC frame addresses from IP packet addresses and limits CSMA/CD to shared half-duplex Ethernet.',
  E017: '7(c) states any three accepted CSMA/CD tasks. It samples the sequence; it does not by itself verify a complete trace, propagation-delay reasoning or why random backoff reduces repeated collisions. The retained parent stem lists a router as background; this selected subpart does not use routing or IP-address knowledge.',
  E018: '9(c) explains real-time conference streaming and temporary receiver buffering. It does not compare on-demand streaming, calculate bit rates or buffer changes, or assess sustained-deficit adaptation. Compression is reminded in the teaching before this task.',
  E019: '3(c)(ii) describes the PSTN for two marks. The preceding router subpart is not selected. Modem conversion is supporting knowledge; dedicated lines, cellular access and choosing infrastructure are not directly assessed.',
  E020: '7(a) distinguishes the supplied IPv4 address from IPv6; 7(b)(iii) gives two explained subnetting purposes; 7(d) completes address-type entries. Subnet purposes support syllabus requirement S2.15 but do not directly assess objective S2.15.A04 (local/routed delivery). Address-to-interface association, CIDR/mask calculation, public/private security consequences, URL and DNS are not directly assessed. IPv6 full and compressed notation are not both required.',
  E2D01: '6(a) asks for two paired LAN/WAN differences. It does not assess the general benefits of networking or the cellular process used in the shared scenario.',
  E2D02: '2(b)(i–ii) asks for mesh features and two advantages over a bus. This directly samples redundancy/traffic comparison, not hybrid recognition or a complete design choice. A full CSMA/CD sequence and topology security guarantees are not required.',
  E2D03: '2(a–b) describes routing and the purposes of a switch, WAP and bridge. The bundled objectives S2.09.A01/A03/A04 are only partly sampled: server, cables and repeater are not asked. The router scheme includes optional gateway functions; the core routing answer earns three marks without them.',
  E2D04: '6(b) explains cellular access through cells, a base station and a radio link. It does not ask for a handover trace, detailed operator routing or a comparison of internet-access options.',
  E2D05: '7(c) explains URL parsing, optional cache use, DNS resolution, connection, resource request and display. The four-mark task samples this chain; it does not require DNS hierarchy, an IPv4 route calculation or HTTPS cryptography.'
});

// Includes knowledge needed to answer the selected parts and follow the teacher
// reasoning. Incidental devices listed in a retained stem do not force unrelated
// units to be taught first. A prerequisite is not a direct-assessment claim.
export const section2PaperPrerequisites = Object.freeze({
  E011: ids(2, 1),
  E012: [...ids(2, 1), ...ids(3, 1)],
  E013: [...ids(1, 2), ...ids(4, 2), ...ids(5, 1), ...ids(9, 1)],
  E014: ids(6, 1, 3),
  E015: [...ids(1, 2, 3), ...ids(8, 1, 2, 3, 4)],
  E016: [...ids(1, 2), ...ids(9, 2), ...ids(11, 1, 2, 3)],
  E017: [...ids(1, 2), ...ids(11, 1, 2, 3)],
  E018: [...ids(1, 2, 3), ...ids(2, 1), ...ids(12, 1, 2, 3, 4)],
  E019: [...ids(2, 1), ...ids(13, 1), ...ids(14, 1, 2)],
  E020: [...ids(1, 2), ...ids(9, 1), ...ids(10, 1), ...ids(15, 1, 2, 3, 4, 5, 6)],
  E2D01: ids(1, 2, 3),
  E2D02: [...ids(1, 2, 3), ...ids(4, 1, 3), ...ids(5, 1, 2)],
  E2D03: [...ids(1, 2), ...ids(9, 1, 3, 4), ...ids(10, 1, 2)],
  E2D04: [...ids(1, 3), ...ids(8, 3), ...ids(14, 4)],
  E2D05: [...ids(13, 1, 2), ...ids(15, 3), ...ids(16, 1, 2, 3)]
});
