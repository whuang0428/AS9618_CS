import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));

const pagesBySection = Object.freeze({
  1: [14, 15], 2: [16, 17], 3: [17, 18], 4: [19, 20, 21, 22],
  5: [23], 6: [24], 7: [25], 8: [26, 27], 9: [28], 10: [29],
  11: [29, 30], 12: [30, 31],
});

const exactOverrides = Object.freeze({
  "S1.08": {
    requirement: "Show understanding of how data for a bitmapped image are encoded; perform calculations to estimate the file size for a bitmap image; show understanding of the effects of changing elements of a bitmap image on the image quality and file size.",
    officialCandidateStatements: [
      "Show understanding of how data for a bitmapped image are encoded",
      "Perform calculations to estimate the file size for a bitmap image",
      "Show understanding of the effects of changing elements of a bitmap image on the image quality and file size",
    ],
    notes: "Use and understand the terms pixel, file header, image resolution, screen resolution and colour depth/bit depth. Required effects concern image resolution and colour depth/bit depth.",
    officialNotesAndGuidance: [
      "Use and understand the terms: pixel, file header, image resolution, screen resolution, colour depth/bit depth",
      "Use the terms: image resolution, colour depth / bit depth",
    ],
  },
  "S1.10": {
    requirement: "Show understanding of how sound is represented and encoded; show understanding of the impact of changing the sampling rate and resolution.",
    officialCandidateStatements: [
      "Show understanding of how sound is represented and encoded",
      "Show understanding of the impact of changing the sampling rate and resolution",
    ],
    notes: "Use the terms sampling, sampling rate and sampling resolution. Explain the impact of changing sampling rate and sampling resolution on file size and accuracy; sound-file-size calculation is not stated as a compulsory requirement.",
    officialNotesAndGuidance: [
      "Use the terms: sampling, sampling rate, sampling resolution, analogue and digital data",
      "Including the impact on file size and accuracy",
    ],
  },
  "S1.11": {
    requirement: "Show understanding of the need for and examples of file compression; show understanding of lossy and lossless compression and justify a method for a given application; show understanding of how a text, bitmap, vector graphic and sound file can be compressed.",
    officialCandidateStatements: [
      "Show understanding of the need for and examples of the use of compression",
      "Show understanding of lossy and lossless compression and justify the use of a method in a given situation",
      "Show understanding of how a text file, bitmap image, vector graphic and sound file can be compressed",
    ],
    notes: "Run-length encoding (RLE) is the named example in the adjacent Notes and guidance.",
    officialNotesAndGuidance: ["Including Run-Length Encoding (RLE)"],
  },
  "S12.03": {
    requirement: "Show understanding of the purpose of state-transition diagrams to document an algorithm.",
    officialCandidateStatements: ["Show understanding of the purpose of state-transition diagrams to document an algorithm"],
    notes: "The Version 2 table requires understanding the purpose; it does not require candidates to construct a state-transition diagram.",
    officialNotesAndGuidance: [],
  },
  "S12.06": {
    requirement: "Show understanding of the need for a test strategy and test plan and their likely contents.",
    officialCandidateStatements: ["Show understanding of the need for a test strategy and test plan and their likely contents"],
    notes: "The Version 2 table requires understanding the need and likely contents; it does not require candidates to produce either document.",
    officialNotesAndGuidance: [],
  },
});

function hashOfficialReference(reference) {
  return crypto.createHash("sha256").update(JSON.stringify(reference)).digest("hex");
}

contract.schemaVersion = 3;
contract.officialSource.version = "Version 2";
contract.officialSource.publicationWindow = "2027-2029";
contract.officialSource.updateUrl = "https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf";
contract.officialSource.updateSha256 = "7a6d305a3370f8aa006eac43bc21be298e1d77bcabfcc57aa677016cb33b869e";
contract.officialSource.pseudocodeGuideUrl = "https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf";
contract.officialSource.pseudocodeGuideSha256 = "04f42cc247cc49e069543aef242dbc6d1d89d4f3539c23148683386cebb2c4b7";
contract.officialSource.contractInterpretation = "Each logical contract row is mapped to the Version 2 subject-content table page(s). officialCandidateStatements and officialNotesAndGuidance preserve the row basis; course interpretation remains separate in requirement and notes. Optional enrichment is excluded.";

for (const requirement of contract.requirements) {
  const override = exactOverrides[requirement.id];
  if (override) Object.assign(requirement, override);

  if (requirement.id === "S1.03") {
    if (!requirement.requiredGroups.some((group) => group.includes("one's complement"))) {
      requirement.requiredGroups.push(["one's-complement", "one's complement"]);
    }
    requirement.workedExampleEvidence = requirement.workedExampleEvidence.map((item) => item.lesson === 5
      ? { ...item, conceptGroups: [["one's-complement", "one's complement"], ["invert"]] }
      : item);
    if (!requirement.practiceEvidence.some((item) => item.lesson === 5)) {
      requirement.practiceEvidence.push({
        lesson: 5,
        sectionId: "stage2-practice",
        activity: "PRACTISE",
        conceptGroups: [["one's complement"], ["convert", "conversion"]],
      });
    }
    requirement.assessmentEvidence = requirement.assessmentEvidence.filter((item) => !["L005-Q1", "L005-Q2"].includes(item.questionId));
    requirement.assessmentEvidence.push({
      questionId: "L005-Q1",
      conceptGroups: [["one's complement"], ["convert", "conversion"], ["integer"]],
    });
  }

  if (requirement.id === "S1.10") {
    requirement.teachingLessons = [10];
    requirement.requiredGroups = requirement.requiredGroups.filter((group) => !group.includes("size in bits"));
    requirement.workedExampleEvidence = requirement.workedExampleEvidence.map((item) => ({
      ...item,
      conceptGroups: [["sampling rate"], ["sampling resolution"], ["accuracy"], ["file size"]],
    }));
  }

  const officialMapping = officialAsMapping[requirement.id];
  if (!officialMapping) throw new Error(`${requirement.id}: exact official AS mapping is missing`);
  const officialReference = {
    syllabus: "Cambridge 9618 2027-2029 Version 2",
    sourceSha256: contract.officialSource.sha256,
    pages: pagesBySection[requirement.section],
    candidateStatements: officialMapping.candidateStatements,
    adjacentNotesAndGuidance: officialMapping.adjacentNotesAndGuidance,
    mappingRound: "remediation-v2-stage2",
  };
  requirement.officialReference = {
    ...officialReference,
    evidenceHash: hashOfficialReference(officialReference),
  };
  delete requirement.officialCandidateStatements;
  delete requirement.officialNotesAndGuidance;
  const firstTeachingLesson = Math.min(...requirement.teachingLessons);
  const firstWorkedExample = requirement.workedExampleEvidence.find((item) => item.lesson === firstTeachingLesson);
  requirement.firstTeachingEvidence = {
    lesson: firstTeachingLesson,
    sectionId: "stage2-completion",
    conceptGroups: firstWorkedExample?.conceptGroups ?? requirement.requiredGroups,
  };
  if (requirement.coreSections.length === 0 || ["S8.10", "S11.09"].includes(requirement.id)) {
    requirement.coreSections = ["stage2-completion"];
  }
  requirement.evidenceReviewStatus = "Reviewed";
  requirement.evidenceReviewRound = "remediation-v2-stage2";
}

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Upgraded ${contract.requirements.length} syllabus contract rows to remediation v2 Stage 2 schema.`);
