const visual = (file, title, caption, alt, facts) => ({
  type: "reviewed-visual", asset: `/assets/course-v3/section-7/${file}`,
  title, caption, alt, facts, review: "reviewed", preserveText: true,
});

const diagrams = {
  "S7-PURPOSE": visual("professional-responsibility.png", "From specialist knowledge to an informed decision",
    "Follow how a professional's knowledge creates a duty to explain a risk. Professional-body support helps the person discharge that duty.",
    "A programmer discovers a hidden safety fault, explains it in a report, and enables an informed customer decision. Codes, peers and continuing development support the professional.", [
      "Specialist knowledge: a programmer can identify a hidden safety fault that the customer cannot independently assess.",
      "Professional duty: disclose the fault and explain its risk so the customer can make an informed decision.",
      "The purpose is to protect people who depend on the system.",
      "A code of conduct, peer guidance and continuing development support judgement; they do not replace personal responsibility or product testing.",
    ]),
  "S7-CONSEQUENCES": visual("ethical-decision-paths.png", "Compare the consequences of two actions",
    "Read each branch separately: identify the developer's action, the user affected and the resulting consequence.",
    "A route wrongly labelled wheelchair-accessible branches into reporting and correction, or concealment and publication, with separate consequences for users and the launch.", [
      "Shared problem: a route labelled wheelchair-accessible includes steps.",
      "Report and correct: users can avoid the unsuitable route, although launch may be delayed.",
      "Conceal and publish: users may reach an inaccessible location, need assistance and complain.",
      "The branches compare alternative actions; a benefit on one branch is not the cause of a harm on the other.",
    ]),
  "S7-COPYRIGHT": visual("copyright-permissions.png", "Ownership and permission perform different roles",
    "Trace each activity back to the licence. Permission to perform one activity does not automatically authorise another.",
    "A copyright holder grants permissions through a licence. Separate branches show running, modifying and redistributing, each only if permitted, with continuing conditions on copies.", [
      "The copyright holder can grant permissions through a licence.",
      "Running, modifying and redistributing are distinct activities: check which acts the terms permit.",
      "Conditions, such as retaining notices, can continue to apply to a redistributed copy.",
      "Publishing source does not itself remove copyright or authorise every use.",
    ]),
  "S7-COMMERCIAL": visual("software-freedoms-and-price.png", "Separate user permissions from the price of a copy",
    "Compare along each axis independently. A payment does not tell you whether the user receives source-code freedoms.",
    "A two-by-two grid crosses free or open-source versus proprietary permissions with no charge versus paid copies. Commercial describes business activity and is not a synonym for proprietary.", [
      "The horizontal axis compares the price to obtain a copy: no charge or paid.",
      "The vertical axis compares permission categories: free or open-source software, and proprietary software.",
      "Free or open-source freedoms can remain with either a no-charge or a paid copy; proprietary restrictions can also remain in either case.",
      "Commercial describes business activity. Even no-charge distribution may form part of a business model.",
      "Free software and open source overlap, but FSF and OSI are distinct organisations with different definitions and emphasis.",
    ]),
  "S7-SHAREWARE": visual("shareware-trial.png", "A trial has terms and a continuation decision",
    "This example offers 30 days of evaluation. Read the actual offer before deciding what is permitted during and after a trial.",
    "A 30-day trial timeline branches at its end to obtaining permission for continued use or stopping use. Source modification needs separate permission.", [
      "In this example, the user evaluates permitted features from day 1 through day 30.",
      "At the end of this trial, obtain permission for continued use or stop using the trial.",
      "Trial periods, available features and restrictions vary by offer; not every shareware offer uses a 30-day limit.",
      "Trial access alone does not grant source-modification rights or transfer copyright.",
    ]),
  "S7-AI-APPLICATIONS": visual("ai-inference-pipeline.png", "Follow a maintenance prediction from input to use",
    "Locate the inference step, then distinguish the model's prediction from the technician's decision and its possible errors.",
    "Pump vibration and temperature feed a model that estimates a developing fault. A technician uses the alert to inspect and plan maintenance; false alerts and missed faults remain possible.", [
      "Input: vibration and temperature measurements from a pump.",
      "Inference: the model interprets patterns to estimate whether a fault is developing.",
      "Use: a technician inspects the pump and plans maintenance using the output.",
      "A false alert can lead to unnecessary inspection. A missed fault can still lead to a breakdown.",
      "A prediction guides a decision; it is not a guarantee.",
    ]),
  "S7-AI-SOCIAL": visual("ai-fairness.png", "Look beyond an overall accuracy figure",
    "Compare the results for each accent. The difference concerns the system's performance, not the value or ability of its users.",
    "Two accents enter one speech-to-text system but receive different caption quality. An overall score can hide the unequal errors; group-level checks and corrections are needed.", [
      "The same speech-to-text system processes speech from users with two different accents.",
      "It produces mostly correct captions for one accent but frequent caption errors for the other.",
      "One overall accuracy figure can conceal unequal access to reliable captions.",
      "Check performance for each affected group and provide a way to correct inaccurate captions.",
    ]),
  "S7-AI-ENVIRONMENT": visual("ai-environmental-balance.png", "Compare application savings with the system footprint",
    "Use the existing irrigation method as the baseline, and consider operation and hardware over the system's lifetime.",
    "Potential water and pumping savings from AI irrigation are compared with computing electricity, hardware manufacture, replacement and waste without assuming which side dominates.", [
      "Potential savings include less water extraction and less unnecessary pumping through better-targeted irrigation.",
      "The AI system also requires electricity for computing and resources for making its sensors and hardware.",
      "Replacement and disposal can add further material use and waste.",
      "Compare both sides with the existing method over the system lifetime before claiming a net environmental improvement.",
    ]),
};

export function addSection7Visual(unit) {
  const diagram = diagrams[unit.unitKey];
  if (!diagram) return unit;
  return {
    ...unit, preserveTeachingSteps: true,
    materials: [
      { ...structuredClone(diagram), objectiveIds: [...unit.objectiveIds] },
      ...unit.materials.map((material) => ({ ...material, preserve: material.type === "table" || material.preserve })),
    ],
  };
}
