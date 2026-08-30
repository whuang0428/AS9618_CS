const entry = (lesson, optionalTopic, formalPrerequisite, coreRequirementIds, optionalSectionIds, disposition = "Core lesson with optional enrichment") => Object.freeze({
  lesson,
  optionalTopic,
  formalPrerequisite,
  coreRequirementIds,
  optionalSectionIds,
  disposition,
  excludedFromCoverage: true,
  reviewRound: "remediation-v2-stage2",
});

export const optionalEnrichment = Object.freeze([
  entry(6, "binary fractions and precision limits", "S1.02-S1.03 integer number systems and conversions", ["S1.02", "S1.03", "S1.06"], ["overview", "delivery-02", "hook", "point", "explanation-point", "convert", "explanation-convert", "precision", "explanation-precision", "examples", "practice", "debug", "exam", "summary"]),
  entry(12, "sound-file-size calculations", "S1.10 sound sampling, sampling rate, sampling resolution, accuracy and file-size effects", [], ["overview", "delivery-02", "hook", "formula", "explanation-formula", "channels", "explanation-channels", "units", "explanation-units", "tradeoffs", "explanation-tradeoffs", "examples", "practice", "debug", "exam", "summary"], "Optional enrichment lesson"),
  entry(19, "general packet switching, routing and packet structure beyond packet paths for the named topologies", "S2.04 bus, star, mesh and hybrid topologies", ["S2.05"], ["overview", "delivery-02", "hook", "switching", "explanation-switching", "structure", "explanation-structure", "routing", "explanation-routing", "packet-journey", "explanation-packet-journey", "examples", "practice", "debug", "exam", "summary"]),
  entry(20, "general protocol rules and layered communication", "S2.11 Ethernet and CSMA/CD", ["S2.11"], ["overview", "delivery-02", "hook", "protocols", "explanation-protocols", "rules", "explanation-rules", "layers", "explanation-layers", "examples", "practice", "debug", "exam", "summary"]),
  entry(22, "HTTP, HTTPS, FTP, SMTP, POP3 and IMAP", "S2.13 WWW versus internet and S2.16 URL/DNS", [], ["overview", "delivery-02", "hook", "web", "explanation-web", "file", "explanation-file", "email", "explanation-email", "examples", "practice", "debug", "exam", "summary"], "Optional enrichment lesson"),
  entry(31, "cache and virtual-memory detail in the hardware section", "S3.05-S3.07 RAM, ROM, SRAM, DRAM, PROM, EPROM and EEPROM; cache belongs to S4.05", ["S3.05", "S3.06", "S3.07"], ["overview", "delivery-02", "hook", "primary", "explanation-primary", "ram-rom", "explanation-ram-rom", "cache-vm", "explanation-cache-vm", "examples", "practice", "debug", "exam", "summary"]),
  entry(55, "command-line, graphical, menu-driven and natural-language user-interface taxonomy", "S5.01 operating-system purpose and management roles", ["S5.03"], ["overview", "delivery-02", "hook", "concept", "explanation-concept", "cli", "explanation-cli", "gui", "explanation-gui", "menu", "explanation-menu", "natural", "explanation-natural", "compare", "explanation-compare", "examples", "practice", "debug", "exam", "summary"], "Core lesson with optional enrichment"),
  entry(58, "compiler phases from lexical analysis through optimisation and code generation", "S5.04-S5.05 purposes of translators and compiler/interpreter comparison", [], ["overview", "delivery-02", "hook", "pipeline", "explanation-pipeline", "lexical", "explanation-lexical", "syntax", "explanation-syntax", "semantic", "explanation-semantic", "generation", "explanation-generation", "optimisation", "explanation-optimisation", "examples", "practice", "debug", "exam", "summary"], "Optional enrichment lesson"),
  entry(59, "linker, loader, static-linking and extended dynamic-linking mechanics", "S5.03 program libraries and benefits of dynamically linked library files", ["S5.03"], ["overview", "delivery-02", "hook", "concept", "explanation-concept", "libraries", "linkers", "explanation-linkers", "loaders", "explanation-loaders", "static-dynamic", "explanation-static-dynamic", "compare", "explanation-compare", "examples", "practice", "debug", "exam", "summary"]),
  entry(60, "early Section 12 error-classification treatment inside Section 5", "S12.01 lifecycle before S12.04 fault exposure, location and correction", ["S12.04"], ["overview", "delivery-02", "hook", "concept", "explanation-concept", "syntax", "explanation-syntax", "logic", "runtime", "explanation-runtime", "diagnostics", "explanation-diagnostics", "compare", "explanation-compare", "examples", "practice", "debug", "exam", "summary"], "Official content retained temporarily as optional at this early position; Stage 3 must restore its CORE first-use order"),
  entry(114, "user-defined record types before the formal records requirement", "S10.01 official data types; S10.02 records must precede this extension", ["S10.01"], ["user-defined", "explanation-user-defined", "builder"]),
  entry(145, "constructing a state-transition diagram", "S12.03 only requires understanding the purpose of state-transition diagrams; S12.02 structure-chart construction remains CORE", ["S12.02", "S12.03"], ["algorithms", "examples", "practice", "debug", "exam"]),
  entry(146, "producing a complete test strategy or test plan", "S12.06 requires understanding their need and likely contents; S12.05 testing methods remain CORE", ["S12.05", "S12.06"], ["testing", "explanation-testing", "stage-tool", "explanation-stage-tool", "examples", "practice", "debug", "exam"]),
]);

export const optionalEnrichmentByLesson = new Map(optionalEnrichment.map((item) => [item.lesson, item]));
