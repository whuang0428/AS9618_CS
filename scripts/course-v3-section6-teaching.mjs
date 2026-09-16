import { coreParagraph as p, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { mechanismVisual } from './course-v3-mechanism-diagrams.mjs';
import { section6Visual } from './course-v3-section6-diagrams.mjs';
import { checkDigitCases, parityExample, parityTableRows, blockCounts, firewallRules, firewallRequests, permissionRows, permissionTrace, validationRules, validationRows } from './course-v3-section6-examples.mjs';
import { enhanceSection6Questions, section6ReviewQuestions } from './course-v3-section6-questions.mjs';

const entry = (essentials, blocks, extra = {}) => ({essentials, blocks, ...extra});
const worked = (title, steps) => ({type:'worked-example',title,steps});
const comparison = (title, headers, rows) => ({type:'table',title,headers,rows,preserveText:true});
const extension = (title, explanation, materials = []) => ({title:'Optional extension · '+title,explanation,materials});

const teaching = {
  'S6-CONCEPTS': entry([
    'Security protects against unauthorised access, loss and damage; privacy concerns appropriate use and disclosure of personal data.',
    'Integrity concerns accuracy, completeness and consistency. Judge each consequence; one incident can affect several properties.',
  ],[
    p("Data security protects data against unauthorised access, loss or damage. Privacy concerns who may access personal information and whether its collection, use or disclosure is appropriate. Data integrity concerns accurate, complete and consistent information during storage, processing and transfer. A security control may support privacy or integrity, but the terms describe different questions.",'Ask a different question about each property'),
    p("If an unchanged medical record is sent to an unauthorised advertiser, its disclosure affects privacy and security even though its contents have not been corrupted. Conversely, a permitted employee can enter the wrong date in a protected file. The access restriction worked, but the stored date is inaccurate. Do not infer an integrity failure merely because an incident was serious.",'Use consequences rather than exclusive labels'),
    p("Check accuracy against the intended fact, completeness against the required information, and consistency between values that should agree. A missing examination mark makes the result set incomplete; two stored totals that should agree but differ are inconsistent. Rules, source comparisons and controlled updates address different causes. Lesson 037 develops the checking methods.",'Unpack integrity'),
  ],{
    visual:section6Visual('data-lifecycle.svg','One record, different protection needs','An entered mark may be wrong, a saved copy may be deleted, a correct file may be unusable when its application fails, and an unchanged record may be disclosed without permission. The consequence determines which properties are affected.'),
    examples:[worked('Four independent events involving a source mark of 46',[
      ['Starting condition','A verified source records 46. Each case below starts independently from a correct saved record and a working service.'],
      ['Disclosure','An employee sends the unchanged named record to an unauthorised recipient. Privacy and security are affected; this fact alone does not show lost integrity.'],
      ['Mistyped update','An authorised teacher enters 64 instead of 46. The stored mark is inaccurate despite successful access control.'],
      ['System failure','The correct file remains on storage, but its application cannot start. The authorised user cannot use the service; this does not establish a changed mark.'],
      ['Only copy deleted','The correct saved record is erased with no backup. Data is lost; the system can no longer provide a complete set of results.'],
      ['Choose protection','Restrict and review disclosure; compare entries with sources; restore a working system; maintain a separate recoverable copy. These address different failure mechanisms.'],
    ])],
    check:['A correct total is copied to an unauthorised recipient. Must integrity have failed?','No. Unauthorised disclosure affects privacy/security, but unchanged accurate contents do not establish an integrity failure. Explain the property from the actual event.'],
  }),
  'S6-SYSTEM': entry([
    'Protect every relevant data copy and the computer system that processes it.',
    'Confidentiality, a functioning service and recoverable data require complementary measures.',
  ],[
    p("Data is the information being protected; the computer system supplies the hardware, operating system and applications needed to use it. Protecting a file alone does not keep that processing environment trustworthy or available. Malware could stop an application, or misuse an already authenticated session to read data after the application decrypts it.",'Keep both protection targets in view'),
    p("Also follow the copies. A locked server room protects one physical location, not a readable export on a lost removable drive. Controls must suit data at rest, data in transit and data in use. These describe where or how the data is being handled, not three new encryption algorithms.",'Follow data beyond the original computer'),
    p("Recovery needs a usable copy and a functioning destination. A backup left on the failed disk may be unavailable with the working data. A tested separate backup can restore a chosen saved state, but not later changes it never captured. Lesson 029 teaches backup operation; here the point is why protection must include continued use and recovery.",'Explain why recovery belongs alongside prevention'),
  ],{
    examples:[worked('Restore a clinic service from a stated recovery point',[
      ['Before failure','At 09:00 a separate protected backup holds verified appointment records. At 09:30 malware prevents the clinic computer from starting. No later appointments have been entered.'],
      ['What encryption achieved','The protected archive can remain unreadable to a person without its key; this does not start the failed application.'],
      ['Restore','Use a trusted repaired or replacement system with a compatible application; restore the available 09:00 records and recover access with the authorised key.'],
      ['Check the result','Open the application and compare the restored records with the known 09:00 state. Staff can again use those appointments.'],
      ['Change the condition','If appointments had been added at 09:20 without another backup, the 09:00 copy would not recover those additions.'],
    ])],
  }),
  'S6-ACCOUNTS': entry([
    'An account identifies the claimed user; a password supplies secret evidence for authentication.',
    'After authentication, check the requested resource and operation against access rights.',
  ],[
    p("A user account associates an identifier with permissions and recorded activity. At login the identifier selects the claimed identity; knowing the identifier alone does not prove that the person is its owner. Separate staff accounts make it possible to associate actions with distinct identities instead of one shared label.",'Claim an identity, then supply evidence'),
    p("A password is secret knowledge. The system checks the supplied password against the stored verifier for that account and accepts or rejects the login. The verifier is information used to check the secret; it need not be a readable stored copy of the password. Hard-to-guess passwords and restrictions on repeated attempts reduce guessing, while a disclosed password can still be used by an impostor.",'Explain what the password check establishes'),
    p("Authentication evaluates the identity claim. Authorisation checks whether that identity may perform a particular operation on a resource. A valid login can therefore lead to a denied deletion. Lesson 028 introduced this OS service; Lesson 036 develops the data-permission decisions. An activity log records the account used, not infallible proof of which human used stolen credentials.",'Do not stop at successful login'),
  ],{
    visual:mechanismVisual('account-permissions'),
    examples:[worked('Three independent requests for Marks.csv',[
      ['Conditions','The teacher account may read and modify Marks.csv but may not delete it. The stored mark is 46. No actual password is needed for this conceptual trace.'],
      ['Wrong password','The verifier does not match. Login fails, the read is not authorised, and the mark remains 46.'],
      ['Correct password; read','Authentication succeeds. Read permission allows the service to return 46. Reading does not change it.'],
      ['Correct password; delete','Authentication succeeds but delete permission is denied. The service rejects the operation and the mark remains 46.'],
    ])],
    check:['A teacher logs in successfully but cannot delete Marks.csv. Which decision failed?','The delete authorisation failed. Authentication succeeded; the operation-specific right is absent.'],
  }),
  'S6-SIGNATURE': entry([
    'Hash the message and sign using the sender’s private key; send the message and signature together.',
    'The receiver checks with the sender’s trusted public key and the received message. A valid signature supports origin and unchanged signed content, not secrecy.',
  ],[
    p("A hash algorithm produces a digest, a short fixed-length value derived from a message. The same message and algorithm give the same digest. A cryptographic hash is designed to make finding different messages with the same digest infeasible in practice; it is not a reversible encryption of the message. The fingerprint icon in the visual is an analogy for a message digest, not a scan of the sender's finger.",'First understand the digest'),
    p("The signer keeps a private key secret and makes the corresponding public key available for verification. These keys have different roles: the public key does not give its holder the ability to create that signer's valid signature. Before trusting the claimed origin, the receiver must have a reliable association between the public key and the sender. A public key supplied by an unknown impostor does not establish that association.",'Know which key belongs to whom'),
    steps('Create, send and check the signed message',[
      ['Sender calculates','Apply the chosen hash algorithm to the exact message to obtain its digest.'],
      ['Sender signs','Use the private key to create a signature tied to the digest. Send the message and signature; retain the private key.'],
      ['Receiver calculates','Hash the received message with the same algorithm.'],
      ['Receiver verifies','Use the trusted sender public key to verify the signature against the digest of the received message. Accept the signature only when verification succeeds.'],
    ]),
    p("A simplified teaching model describes signing as encrypting the digest with the private key and checking as recovering it with the public key for comparison. Actual signature algorithms differ; some verify without recovering a digest from the signature. The invariant is a check of the signature, key and received message. H(M), h1 and h2 below denote supplied conceptual values, not computed outputs of a specified cryptographic implementation.",'Interpret the simplified comparison model'),
    p("A valid signature does not conceal the accompanying plaintext, prove the sender's statements true, or compensate for a stolen signing key. An attacker can edit a message while leaving its signature bytes unchanged; the verification then fails for the altered content. Hashing alone cannot establish origin because an attacker could replace an unprotected message and its plain digest together.",'State what the evidence supports'),
  ],{
    examples:[worked('A purchase order, checked in the simplified digest model',[
      ['Conditions','The sender signs message M = Order 12 units. H(M) = h1. The receiver already trusts the public key associated with this sender. These symbols illustrate the process.'],
      ['Sender','Create signature S from h1 with the private key. Transmit M and S; do not transmit the private key.'],
      ['Unchanged arrival','The receiver hashes M and obtains h1. Checking S with the sender public key provides matching evidence for h1. Signature verification succeeds.'],
      ['Altered arrival','An attacker sends M2 = Order 120 units with the old S. In this example H(M2) = h2, different from h1.'],
      ['Failed check','The received-message digest h2 does not match the evidence tied to S and h1. Reject the claim that M2 is the original signed content; do not silently change the order back.'],
      ['Interpret both outcomes','Observers can read either unencrypted order. A signature authenticates signed content; encryption must separately provide confidentiality.'],
    ])],
    check:['A receiver verifies the old signature but never hashes or otherwise checks the received document against it. Has the document been authenticated?','No. The received content must be included in the signature verification. Checking evidence detached from the received message cannot detect that the message was replaced.'],
  }),
  'S6-BIOMETRIC': entry([
    'Enrol a reference template, then compare features from a new capture with it.',
    'False acceptance admits an impostor; false rejection denies a legitimate user. A match does not grant every access right.',
  ],[
    p("Biometrics use a physical or behavioural feature, such as a fingerprint, iris, voice or typing pattern, as identity evidence. The sensor captures a feature and software derives a template containing information useful for matching. This need not be a raw photograph of the feature.",'From a feature to a reference'),
    steps('Separate enrolment from later authentication',[
      ['Enrol','Register the legitimate user under the correct account, capture suitable samples and store a protected reference template.'],
      ['Capture again','At a later login, capture the claimed user’s feature and extract a new comparison template.'],
      ['Compare','Compare the new features with the enrolled reference and apply the system’s match requirement.'],
      ['Decide','Accept a sufficient match or reject/request a supported retry. If authenticated, still apply the resource permissions.'],
    ]),
    p("Two scans need not be pixel-for-pixel identical: lighting, finger placement, noise or illness can change the capture. A false rejection occurs when the legitimate user is rejected; a false acceptance occurs when an impostor is accepted. Sensors, protected templates and an appropriate recovery method are needed. A compromised biological feature is harder to replace than a password.",'Explain both kinds of wrong decision'),
  ],{
    examples:[worked('Check the system decision against the actual user',[
      ['Enrolment','Mina is registered correctly and her reference template is stored. No template for this identity existed before enrolment.'],
      ['Normal login','Mina supplies a new good capture that sufficiently matches her reference. Authentication succeeds, then access rights decide the requested action.'],
      ['Poor capture','Mina supplies a poor capture and is rejected: a false rejection, because the actual user is legitimate.'],
      ['Impostor','A different person is incorrectly accepted as Mina: a false acceptance. A MATCH label alone cannot tell the observer whether the decision was correct.'],
    ])],
    extensions:[extension('The matching threshold','Requiring a closer match can reject more poor captures, including legitimate ones. Relaxing the requirement can admit more impostors. This qualitative trade-off explains why a matching system is not perfect; no statistical curve or threshold calculation is needed here.')],
  }),
  'S6-FIREWALL': entry([
    'A firewall allows or blocks traffic by configured rules on the paths it controls.',
    'Host and network firewalls differ in placement; permitted connections may still carry harmful content.',
  ],[
    p("A firewall checks traffic against a policy, using properties such as addresses, direction, protocol, port or connection state. A port identifies a service endpoint, not a physical cable socket. The firewall permits or blocks the traffic and may record the decision. It does not decide solely from the name of the sender or from whether a packet is described as dangerous.",'Connect a rule to observable traffic properties'),
    p("A host firewall protects one computer's traffic. A network firewall filters the traffic routed through a boundary, for example between a LAN and the internet. Internal traffic that stays within the LAN need not cross that boundary. The protection therefore depends on placement as well as configuration; the device cannot filter a path that bypasses it.",'Follow the actual path'),
    p("For the classroom policy below, use the first matching rule and stop; the final rule denies everything else. This is a stated simplified policy, not universal default behaviour. Rule 1 permits traffic recognised as part of a previously allowed connection. Rules 2 and 3 distinguish new inbound and outbound connections.",'Apply a complete policy'),
    table('Policy for the worked traffic trace',['Order','Condition','Decision'],firewallRules),
    p("An allowed connection can carry a deceptive message or an infected download. Content checking, authentication, patching and user decisions still have separate jobs. Conversely, an overly restrictive rule can block legitimate work. Explain both the chosen rule and its consequence for the stated traffic.",'Separate connection permission from content trust'),
  ],{
    examples:[worked('Apply the policy, including a permitted unsafe download',firewallRequests.map(([request,rule,result])=>['Rule '+rule+' · '+request,result]))],
    check:['A new inbound TCP connection targets the staff service on port 22. Which rule applies, and does the answer depend on whether the sender calls the file safe?','Rule 4 denies it after rules 1–3 do not match. The sender’s description does not change the connection properties or the policy.'],
  }),
  'S6-ANTIVIRUS': entry([
    'Scan for recognised virus patterns or suspicious behaviour; block, quarantine, remove or repair detected infection as supported.',
    'Update detection information. A clean scan is evidence of no detection, not proof of no malware.',
  ],[
    p("A virus is malicious code that infects a host file or program and can replicate when that host executes. Anti-virus software checks files, memory or activity for known patterns and suspicious behaviour. A virus signature here means a detection pattern; it is different from a digital signature used to authenticate a message.",'Explain what is being detected'),
    p("A detected file can be prevented from executing, isolated in quarantine, removed, or repaired where the tool supports it. Quarantine preserves a restricted copy for investigation instead of letting it run normally. The choice depends on the detected object and tool; removal of an infected file may also remove useful content that needs restoring.",'Follow detection through to a usable system'),
    p("Updates add or improve detection knowledge as threats become known. New, concealed or modified malware can evade existing checks, and a benign file can be flagged incorrectly. Inspect the result and use trusted recovery copies where necessary. Lesson 029 introduced the utility; Lesson 035 follows the infection route that it helps interrupt.",'Explain the limits of the result'),
  ],{
    examples:[worked('From a suspect executable to checked recovery',[
      ['Conditions','A downloaded utility is flagged before normal execution. A separate trusted backup contains the required original file.'],
      ['Contain','Block and quarantine the suspect utility so it cannot execute normally while investigated.'],
      ['Resolve','If infection is confirmed, remove the infected copy or use supported repair; restore the needed clean file from the trusted backup if necessary.'],
      ['Check','Update detection information, scan the recovered file and check the required application function. No detection does not prove every possible threat absent.'],
    ])],
  }),
  'S6-ANTISPYWARE': entry([
    'Anti-spyware detects and stops, isolates or removes covert monitoring components.',
    'Removal cannot retrieve information already disclosed; address exposed credentials and the entry route as well.',
  ],[
    p("Spyware covertly monitors activity or collects information, for example by recording keystrokes or the screen. Anti-spyware looks for recognised components and suspicious monitoring behaviour. It may be part of a broader anti-malware product, so two named functions do not necessarily require two separate installed products.",'Match the function to covert collection'),
    p("Detection can lead to blocking, quarantine or removal. Keep detection information current because newly identified components may not match older rules. Removing a detected keylogger interrupts its future collection, but a remote recipient can retain logs it already received.",'Distinguish the local component from disclosed information'),
    p("After exposed credentials are identified, replace them using a trusted device and repair the installation route, such as an unauthorised download. Changing a password on a still-monitored device can reveal the new value too. This explains the order of response, not a promise that one tool reverses every consequence.",'Resolve the remaining consequence'),
  ],{
    examples:[worked('Use the timeline to choose the response',[
      ['09:00','A keylogger records the password while a user types it.'],
      ['09:05','The log reaches a third party. The recipient now has a separate copy.'],
      ['10:00','Anti-spyware detects and isolates the component. Further collection by this installation stops.'],
      ['After containment','Remove the confirmed component and address the entry route; replace the exposed password from a trusted device.'],
      ['Result and limit','The old credential can be invalidated, but removal does not erase the recipient’s previously received log or undo earlier account misuse.'],
    ])],
  }),
  'S6-LAYERS': entry([
    'Select controls from the threat route and the property needing protection.',
    'Authentication, traffic filtering, malware detection, encryption and recovery perform complementary jobs.',
  ],[
    p("Encryption transforms plaintext into ciphertext using an algorithm and key. An application with the required decryption key can recover the readable contents. This protects a stolen or intercepted copy from a person without the key; Lesson 036 develops the data transformation and key-protection requirements.",'Introduce the confidentiality layer'),
    p("Start a recommendation with the exposure: a guessed password calls for stronger authentication, disallowed traffic for a filtering policy, and infected code for detection and containment. A list of product names does not show that the mechanisms fit. State what each control checks or changes and how that reduces the stated risk.",'Choose a mechanism for each risk'),
    p("Layering combines measures that address different routes or consequences. If malware executes in a user's unlocked session, encryption of the disk alone may not stop access to data that the application has already decrypted. Recovery adds a way to regain a usable saved state when prevention fails; it does not prevent disclosure that has already happened.",'Test the combination against a changed condition'),
  ],{
    examples:[worked('Evaluate a travelling employee’s laptop',[
      ['Starting risks','The employee signs in, browses the web and carries a copy of customer records. Consider guessed credentials, unwanted inbound access, an infected download and theft of storage.'],
      ['Choose controls','Use individual authentication; filter connections with a host firewall; maintain anti-malware; encrypt the customer copy and protect its key separately.'],
      ['What remains','A permitted web connection can carry malware, and a logged-in application can expose decrypted data. Continue to check content, permissions and user actions.'],
      ['Recover','Keep a separate protected backup of the needed records. Test restoration; the recovered state is limited to the selected backup.'],
    ])],
  }),
  'S6-VIRUS': entry([
    'A virus infects a host file or program; executing the infected host can run the viral code and spread infection.',
    'Explain arrival, execution, replication and possible damage separately.',
  ],[
    p("A virus attaches to or modifies a host file or program. A shared or downloaded infected host provides a route to another computer, but the arrival of the file and the execution of its code are different events. In the executable-host model used here, running the infected program runs the attached code.",'Identify the host and activation event'),
    p("The virus can copy its code into additional hosts, creating further opportunities to execute and spread. Its payload may alter or delete data or disrupt normal processing. Replication describes how it spreads; the payload describes harmful actions it performs. A virus need not immediately erase every file to count as an infection.",'Separate spread from impact'),
    p("Avoiding untrusted execution and controlling software installation reduce opportunities for the code to run. Updated anti-virus can detect and isolate recognised infection; a trusted backup may support recovery after damage. None of these precautions can be justified merely by saying that it makes the computer safe: identify the stage it interrupts.",'Explain the link to a precaution'),
  ],{
    visual:mechanismVisual('virus-host'),
    examples:[worked('Follow one infected shared program',[
      ['Initial state','Computer A has an infected drawing program. Computer B has two clean executable files and an independent backup of its work.'],
      ['Arrival','The program is copied to B. In this stated model it has not yet executed on B.'],
      ['Execution and replication','A user runs it. The viral code executes and infects one other executable on B; that file can now carry infection when shared or run.'],
      ['Possible impact','Its payload corrupts a saved drawing. Detection and isolation address the infected files; recovery of the drawing requires a usable clean copy.'],
      ['Changed condition','If the copied host is detected and quarantined before execution, this execution-and-replication path is interrupted.'],
    ])],
  }),
  'S6-SPYWARE': entry([
    'Spyware secretly collects activity or information and may disclose it to a third party.',
    'Covert collection, not self-replication, defines the behaviour; one program can have several malicious behaviours.',
  ],[
    p("Spyware can log keystrokes, record the screen or collect browsing activity without the user's informed awareness. Identify what is collected: a typed password, a visible customer record, or activity history. Merely saying that information is stolen omits the mechanism. Not every openly declared monitoring or analytics function is automatically spyware.",'Name the captured information'),
    p("A monitoring component can store a log and send it to a third party. A keylogger may therefore expose credentials for another service, even though the spyware is installed on the local computer. The recipient can try to impersonate the user. Removing the local component does not erase that separate log.",'Follow collection into disclosure'),
    p("Spyware need not infect other executable hosts. A single program can both replicate like a virus and collect secrets like spyware; classify the behaviours rather than forcing a mutually exclusive label. Controlled installation reduces entry, and anti-spyware addresses detected monitoring components. L034 explains the response after exposure.",'Use behaviour to distinguish threats'),
  ],{
    visual:section6Visual('spyware-route.svg','Trace a captured password to its recipient','A hidden component records a typed account name and password, sends a log to a third party, and enables an impersonation attempt. Isolation prevents further collection by that component but does not erase logs already sent.'),
    examples:[worked('A local keylogger affects a separate email service',[
      ['Capture','On the shared computer, a user types their email account identifier and password. The keylogger records the keystrokes.'],
      ['Disclosure','The component sends a log to a third party. The email service itself need not have been infected.'],
      ['Misuse','The recipient attempts to sign in to the email service using the captured credentials.'],
      ['Response and final state','Isolate and remove the component, then invalidate exposed credentials using a trusted device. The old password can cease to work, but the recipient may retain information obtained earlier.'],
    ])],
  }),
  'S6-HACKING': entry([
    'Unauthorised access may exploit stolen or guessed credentials, exposed services or software flaws.',
    'Match authentication, patches and restricted permissions to the relevant route or consequence.',
  ],[
    p("In this syllabus security context, hackers attempt or gain unauthorised access to systems or data. Access is unauthorised because the person lacks legitimate permission, even if the system accepts a guessed or stolen password. The label refers here to an access threat rather than every possible use of the word hacker.",'Separate accepted credentials from legitimate permission'),
    p("A weak password permits guessing; a disclosed password permits impersonation; an unpatched vulnerability can allow unintended actions through a software flaw. These are different entry routes. Replacing a password does not repair a vulnerable service, and a patch does not automatically invalidate a previously stolen credential.",'Diagnose the entry route'),
    p("After access, permissions determine which records and operations the compromised account can reach. Least privilege limits unnecessary access but does not make the intrusion legitimate. Restrict exposed services, apply relevant patches and strengthen authentication according to the stated cause. Record the remaining risk instead of claiming complete prevention.",'Distinguish preventing access from limiting its impact'),
  ],{
    examples:[worked('A receptionist account is impersonated',[
      ['Conditions','A receptionist account may read appointment times but cannot modify medical notes. An intruder guesses its password.'],
      ['Login','The credential check succeeds for the account, but the intruder still lacks legitimate authorisation to act as its owner.'],
      ['Allowed account action','The intruder can see appointment times available to that identity, creating a disclosure risk.'],
      ['Denied account action','The service rejects a request to change medical notes. Restricted permissions limit the impact of the compromised account.'],
      ['Reduce recurrence','Replace the exposed secret, limit guessing attempts and consider an additional authentication factor. Do not claim that the read-only medical restriction stopped the original login.'],
    ])],
  }),
  'S6-PHISHING': entry([
    'A phishing communication impersonates a trusted source and induces disclosure or an unsafe action.',
    'Verify the request using independently known contact details or a known service, not the message’s supplied route.',
  ],[
    p("Phishing uses a deceptive email, text message or other communication to impersonate a trusted person or organisation. Urgency, a familiar logo and a plausible sender name can persuade the recipient to disclose private information or act unsafely. The message may direct the user to a copied sign-in page, but installing malware is not necessary for credential theft.",'Explain persuasion and the requested action'),
    p("Trace where the action sends information. If a user submits credentials to an attacker-controlled form, they reach the attacker rather than the intended service. If the message requests a payment change, the harm can result from following that instruction even without a fake login page. Describe the stated route instead of assuming every phishing attempt works identically.",'Follow the information or instruction'),
    p("Use an independently known address or trusted contact record to verify the request. A phone number or reply address inside the suspicious message may also belong to the attacker. Filtering and training reduce exposure, and an additional authentication factor can reduce some consequences of a stolen password; it does not make every deceptive instruction harmless.",'Explain why the independent channel matters'),
  ],{
    visual:mechanismVisual('phishing'),
    examples:[worked('Two outcomes for the same support message',[
      ['Message','An urgent message claims school support will close the account today unless the user follows a sign-in link.'],
      ['Unsafe branch','The user opens the copied page and enters credentials. The form sends them to the attacker; no virus installation is required for this disclosure.'],
      ['Independent branch','The user opens the school portal from a previously known address or contacts support using a trusted directory. Support confirms there is no such request.'],
      ['Decision','Reject and report the deceptive request without entering credentials into its form. A convincing logo did not authenticate the sender.'],
    ])],
  }),
  'S6-PHARMING': entry([
    'Pharming redirects a user to a fraudulent destination, for example through corrupted DNS or local name-resolution information.',
    'A correctly typed name can still be misdirected; protect resolution settings and investigate certificate or hostname warnings.',
  ],[
    p("Normally the browser needs an address for the intended domain name before contacting its server. Lesson 014 separates DNS name resolution from the later web request. Pharming manipulates the destination, for example by corrupting a DNS record or local name-resolution entry, so the intended name leads to an attacker-controlled server.",'Recall the normal resolution step'),
    p("The user may type the correct name and receive a convincing imitation page. Unlike the phishing route taught alongside it, no deceptive link is needed to start this redirection. Merely advising the user to type the address does not repair a corrupted mapping. The two routes can also be combined in a wider attack.",'Locate the change before the page is returned'),
    p("Restrict unauthorised changes to resolution settings, maintain relevant software and investigate unexpected certificate or hostname warnings. An HTTPS indicator describes an encrypted connection and its certificate context, not a guarantee that every site or request is honest. Certificate acquisition and TLS protocol details are outside this AS explanation.",'Match the precaution to the destination problem'),
  ],{
    visual:section6Visual('phishing-pharming.svg','Two routes to an imitation page','Phishing persuades a user to follow a supplied route; pharming can redirect a correctly typed name through corrupted resolution information. Both may disclose entered credentials, but their preventive actions target different steps.'),
    examples:[worked('The correctly typed payroll address',[
      ['Normal state','The known payroll name maps to the real payroll server. The browser then requests its sign-in page.'],
      ['Changed state','An unauthorised edit replaces a local name mapping with the attacker’s destination. The legitimate name itself is unchanged.'],
      ['Request','A user types the correct known name. Resolution uses the corrupted mapping and the request reaches the attacker’s server.'],
      ['Consequence','The imitation form can disclose entered credentials. This route is pharming even without an email link.'],
      ['Recovery and check','Repair the unauthorised mapping and its entry route, then check that the intended name resolves to the intended service. Investigate warnings; do not assume that a familiar page appearance proves recovery.'],
    ])],
  }),
  'S6-RISK': entry([
    'A justified precaution interrupts a threat route or reduces a specified consequence.',
    'Combine prevention, detection and recovery; state what each measure does and what remains.',
  ],[
    p("Start with the mechanism rather than a product. Ask what permits entry, what the attacker or code then does, and which data or service is affected. Map a control to that stage: patches repair known flaws, limited installation reduces unapproved execution, and independent confirmation challenges a deceptive request.",'Build a reasoned recommendation'),
    table('Different purposes in a response',['Purpose','Example','Important limit'],[
      ['Prevention','Restrict new software installation or unnecessary access.','A permitted program or compromised account may still be misused.'],
      ['Detection and containment','Identify and quarantine recognised malicious code.','Unknown threats may escape detection; earlier damage may remain.'],
      ['Recovery','Restore a trusted saved state to a usable system.','The backup cannot prevent prior disclosure or recover changes it never captured.'],
    ]),
    p("Physical protection, staff procedures and technical controls can complement each other. For a lost drive, restricting server permissions is insufficient for a readable independent copy; encryption and key protection fit that exposure. For a fake payment request, an encrypted disk does not authenticate the instruction. Reconsider the recommendation when the scenario changes.",'Test whether the proposed control reaches the risk'),
  ],{
    examples:[worked('Change the risk, then change the response',[
      ['Shared laboratory','Users install unknown downloads. Restrict installation and scan for recognised malicious code: these reduce entry and support detection.'],
      ['One layer fails','A permitted connection delivers a new undetected keylogger. Connection filtering alone has not established safe content.'],
      ['Respond','Isolate the affected system/component, investigate, restore trusted operation and address disclosed credentials from a trusted device.'],
      ['Different incident','An unchanged results file is intentionally emailed outside the permitted audience. Focus on access, disclosure procedures and recipient checks; restoring a backup cannot recall the recipient’s copy.'],
    ])],
  }),
  'S6-ENCRYPTION': entry([
    'Encryption transforms plaintext into ciphertext; the correct decryption method and key recover the plaintext.',
    'Protect the key as well as the copy. Encryption alone does not prevent deletion, control every authorised action or prove source truth.',
  ],[
    p("Plaintext is readable original data. Encryption applies an algorithm using a key to produce ciphertext. Decryption uses the corresponding method and required key to recover the original data. An intercepted or stolen encrypted copy should not reveal its readable content to someone without the required secret. Encryption does not prevent the copy from being intercepted.",'Follow both directions'),
    p("Protect the key separately from the exposed copy. An unprotected decryption key on the same lost drive can give the finder both ciphertext and the means to recover it. A legitimate recipient who has the key can read the sent content; possession of that key does not automatically grant permission to edit the original database.",'Separate the copy, the key and the service'),
    p("The small character example illustrates reversible transformation only. It uses uppercase letters A–Z, shifts forward by three for encryption and backward by three for decryption, wrapping at either end. Its rule is deliberately simple and is not a secure cipher for real records or an algorithm to memorise for this syllabus. Cryptographic key-system comparisons belong to later study.",'Use a fully specified teaching model'),
    table('Complete the stated character transformation',['Position','Plaintext','Forward shift by 3','Backward shift by 3'],[
      ['1','Z','C','Z'],['2','O','R','O'],['3','O','R','O'],
    ]),
    p("The model turns ZOO into CRR and restores ZOO with the inverse rule. It is not a hash: the purpose is recovery of the original. If ciphertext is erased, encryption cannot recreate it. If the original data is false, decrypting it faithfully restores the same false information. Keep confidentiality, availability and integrity judgements separate.",'Check the result and its limits'),
  ],{
    examples:[worked('A protected archive: normal delivery and loss',[
      ['Conditions','An archive contains verified results. Its real encryption system is not the simple character model above. The required key is held separately by authorised users, and a separate backup exists.'],
      ['Normal delivery','The sender transmits ciphertext. The intended recipient applies the correct method and key and recovers the original results; a comparison confirms this stated successful round trip.'],
      ['Lost drive','A finder who has only the encrypted copy cannot normally read the results. The finder can still erase that copy; restore from the separate backup if needed.'],
      ['Key also disclosed','If the required unprotected key is obtained with the ciphertext, confidentiality of that copy can be lost. Rights on the original server do not remove the finder’s copy.'],
    ])],
  }),
  'S6-RIGHTS': entry([
    'Access rights specify permitted operations for users or roles on particular resources.',
    'Least privilege limits unnecessary actions; authenticated users can still be denied an operation or make an authorised mistake.',
  ],[
    p("After identifying the user, the service checks the resource and requested operation against its permissions. Read permits viewing, modify permits changing existing data, and delete permits removing it. Other systems may distinguish creation or record-level permissions too; use the rights and resource scope actually stated in the problem.",'Evaluate a complete request'),
    p("A role groups users with similar responsibilities. Least privilege gives each role only the access needed for its work. A reviewer who checks marks can have read access without modification or deletion rights. Restricting reads supports confidentiality, while restricting updates reduces unauthorised alteration. Neither establishes that an allowed update is factually correct.",'Connect each right to its consequence'),
    table('Teaching matrix: rights on one mark record',['Role','Read','Modify','Delete'],permissionRows),
    table('Sequential operations; initial stored mark = 46',['Request','Permission check','Visible result','Stored mark afterwards'],permissionTrace),
    p("The previous operations concern a resource controlled by the service. If a readable copy has already been exported, an outsider may read it without consulting that service's matrix. Read-only access is not a promise that no external copy can be made. Protect disclosure and exported copies as well. Lesson 044 applies these principles to database users and groups.",'State the enforcement boundary'),
  ],{
    examples:[worked('Interpret the denied operation and the independent copy',[
      ['Controlled sequence','After the permitted teacher correction in the table, the saved mark is 48. The reviewer’s denied deletion leaves that same record and value in place.'],
      ['Authorised mistake','If the teacher had instead entered an unsupported 84, modify permission would still allow the action. A source comparison is needed to detect that wrong value.'],
      ['External copy','An outsider receives an unencrypted export showing 48. Reading this separate copy does not invoke the original service’s Visitor row.'],
      ['Design choice','Give reviewers read-only access on the intended records; separately control export/disclosure and protect sensitive copies. Do not claim that a server right follows every external copy automatically.'],
    ])],
    check:['After the teacher changes 46 to 48, a reviewer’s deletion is denied. What is stored, and why?','The record remains with mark 48. The denied operation does not undo the earlier authorised modification or remove the record.'],
  }),
  'S6-VALIDATION': entry([
    'Validation checks stated acceptability rules; verification checks faithful entry or transfer relative to a source.',
    'An acceptable wrong value or two matching wrong copies can pass a check. Neither proves the original fact true.',
  ],[
    p("Validation tests whether input satisfies stated rules and is reasonable for its purpose. Verification checks whether information has been entered, copied or transferred accurately relative to its source. They support integrity by detecting different kinds of error. First ask whether the task needs rule compliance, faithful copying, or both.",'Choose the question the check must answer'),
    p("A source mark of 46 entered as 64 can pass the range 0–75 while failing comparison with the source. A source age of 200 copied correctly can pass that source comparison but fail a permitted range of 0–120. If a wrong source says 12 and both copies say 12, neither a matching copy nor a reasonable age proves the person is actually 12.",'Separate acceptable, copied correctly and true'),
    table('Use independent checks in a data-entry process',['Stage','Test','If it fails'],[
      ['Input rules','Does each field satisfy the specified bounds, pattern, required entry and lookup rules?','Flag the relevant field and request correction.'],
      ['Source verification','Does the entered information agree with the original form?','Investigate the difference against the source, correct and check again.'],
      ['Record acceptance','Have the required checks passed for this submission?','Do not silently store the rejected submission as an accepted record.'],
    ]),
    p("The next units first choose and apply individual validation methods, then combine them on one form. The second stage adds a check digit and source comparisons. The final stage follows checking information from sender to receiver. This is a progression from rule decisions to complete checking processes, not a requirement to implement a program here.",'Follow the three learning stages'),
  ],{
    examples:[worked('Validate and verify a submitted mark',[
      ['Conditions','The source form says 46; marks must be integers from 0 to 75 inclusive. An integer 64 is submitted.'],
      ['Validation','64 satisfies the stated range, so that rule passes. It does not compare 64 with 46.'],
      ['Verification','A visual comparison with the form finds the mismatch. Do not accept the entry as a faithful copy.'],
      ['Correction and result','Re-enter 46, apply the range and source comparison again, and accept the corrected record once both pass.'],
      ['Boundary of the claim','These results establish compliance with the checks, not an independent proof that the source form records the true examination performance.'],
    ])],
  }),
  'S6-BOUNDS': entry([
    'A range specifies lower and upper bounds; a limit specifies one bound.',
    'Follow the stated inclusive or strict comparisons and test the endpoints as well as values just outside.',
  ],[
    p("A range check compares a value with both ends of an allowed interval. For integer marks with 0 <= Mark <= 75, both 0 and 75 are allowed. The two conditions must both hold. Replacing the upper <= with < excludes 75, so the exact comparison matters.",'Read both bounds'),
    p("A limit check uses one upper or lower bound, such as UploadSize <= 10 MiB or Temperature >= -20. A lower limit alone does not impose an unstated upper limit. When a problem already supplies non-negative file sizes, that is an input condition; do not pretend the upper-limit comparison itself checked non-negativity.",'Distinguish the rule from supplied conditions'),
    table('Test the actual boundary',['Rule on integer values','Below the lower edge','At an included edge','Above the upper edge'],[
      ['-20 <= Temperature <= 50','-21 fails','-20 and 50 pass','51 fails'],
      ['Temperature >= -20','-21 fails','-20 passes','51 also passes: no upper bound'],
      ['0 <= Mark < 75','-1 fails','0 passes; 75 fails','76 fails'],
    ]),
    p("Use values just inside, at and just outside the relevant boundary to expose a wrong comparison. For a whole-number mark, 74, 75 and 76 distinguish an inclusive maximum of 75 from a strict maximum. For continuous or measured data, choose test values according to the stated precision rather than always adding one.",'Choose a discriminating test'),
  ],{
    check:['A size is already known to be non-negative. Does Size <= 10 by itself impose a lower bound, and does it accept 10?','It imposes only an upper bound. It accepts 10 because equality is included; non-negativity comes from the stated input condition.'],
  }),
  'S6-PATTERNS': entry([
    'Length counts characters; format checks their required arrangement.',
    'Preserve leading zeros in string identifiers and apply each stated check separately.',
  ],[
    p("A length check tests the number of characters, such as exactly six or at most twenty. A format check tests the required arrangement, such as two uppercase letters followed by four digits. A format may imply a length, but the tests still ask distinguishable questions: 123456 has six characters yet fails the specified letter-and-digit pattern.",'Count characters, then inspect positions'),
    p("Read the full pattern. AB0123 fits two uppercase letters and four digits, while A10123 has a digit where the second uppercase letter is required. AB123 has only five characters and too few trailing digits. A stored identifier is often a string: converting 001234 to a number would lose its leading zeros and change the representation being checked.",'Keep the representation needed by the rule'),
    p("Do not infer factual meaning from appearance. A correctly formatted date string may still describe an impossible date, and a correctly shaped customer code may not occur in the customer file. A format rule needs to be stated precisely; use an additional appropriate check for conditions the pattern does not establish.",'Identify what remains unchecked'),
  ],{
    check:['A six-character code must contain two uppercase letters and four digits. AB0007 passes. Does this prove the booking exists?','No. It passes length and format, but existence requires comparison with the specified stored booking data. The zeros remain part of the code.'],
  }),
  'S6-PRESENCE': entry([
    'Presence requires an entry; existence tests membership in the stated stored set.',
    'A non-blank correctly shaped value can still fail existence. Give the lookup data needed to decide.',
  ],[
    p("A presence check rejects an absent required entry. It does not test whether a supplied identifier corresponds to a real record. An existence check searches a specified stored lookup or file for the supplied value. The correct source matters: finding a customer code in an unrelated product file would not establish that the customer exists.",'State the required field and lookup'),
    p("In the simple examples, Blank means no characters were entered. If a real form also treats spaces-only input as empty, that must be a stated rule. Once a required field fails presence, the form can flag that error before trying its format or lookup. A skipped lookup is not a successful existence check.",'Explain the order of checking'),
    table('Complete form specification for the worked example',['Field','Supplied rule or condition','Validation methods'],validationRules),
    p("All required checks must pass for this form to be accepted under its input rules. Report the failed field and request correction rather than silently replacing an unknown customer or inventing an age. Leading zeros in the two codes are characters and must remain. Passing every rule still does not prove agreement with an original form.",'Combine checks without changing their meaning'),
  ],{
    examples:[worked('Apply all stated rules and finish the submission',[
      ['Initial submission','AB012 / XY0012 / 12 / 8 MiB follows the four fields above. AB012 is in the lookup; both codes fit their patterns; age and size meet their bounds.'],
      ['Initial decision','All validation checks pass. Source verification remains a separate requirement.'],
      ['Changed ID','Replace only AB012 with EF678. It is present and matches the ID pattern but is not in {AB012, CD345}; reject this submission.'],
      ['Correct and recheck','The source form confirms AB012. Correct that field, reapply the required checks and compare the submitted data with the source. Once all required checks pass, accept the corrected record.'],
    ])],
    support:[comparison('Distinct failures under the supplied form rules',['Submission','Result of the relevant checks','Decision'],validationRows)],
    check:['A required customer ID is non-blank and correctly formatted, but absent from the customer lookup. Which check fails?','Existence fails. Presence and format pass; the supplied code still does not identify a stored customer.'],
  }),
  'S6-CHECK-DIGIT': entry([
    'Derive a check digit using the specified rule; on entry recalculate and compare with the supplied digit.',
    'A mismatch detects an error but does not identify the intended identifier. Some wrong identifiers still pass.',
  ],[
    p("A check digit is a digit calculated from the other digits in an identifier and stored with them. The system repeats the stated calculation when the full code is entered or scanned. It can compare the expected final digit with the supplied final digit or apply the equivalent rule to their combined total.",'Distinguish generation from checking'),
    p("For this example only, use four data digits with weights 3, 1, 3, 1. Multiply corresponding digits and weights, add the products, then choose a digit from 0 to 9 that makes the total a multiple of 10. If the total already is a multiple of 10, choose 0; do not choose 10, which is not one digit. Different schemes use different weights and rules.",'Use a complete stated algorithm'),
    table('Generate three check digits under the same rule',['Data digits','Products','Weighted total','Check digit','Full code'],checkDigitCases.map(x=>[x.data,x.products.join(' + '),String(x.sum),String(x.digit),x.code])),
    p("47269 and 42769 both satisfy this rule even though their data digits differ. The totals 31 and 41 both need a final 9. This is a concrete undetected transposition, not proof that check digits are useless. They detect many errors cheaply, but cannot establish that an accepted identifier is the one intended or that its record exists.",'Explain a passing wrong value'),
  ],{
    examples:[worked('Check the scanned identifier and resolve an error',[
      ['Received full code','47268 contains data digits 4726 and supplied check digit 8.'],
      ['Calculate','4 × 3 + 7 × 1 + 2 × 3 + 6 × 1 = 31. The expected check digit is 9.'],
      ['Compare','8 differs from 9; equivalently, 31 + 8 = 39 is not a multiple of 10. Reject or request re-entry.'],
      ['Consult the source','The original label confirms 47269. Re-enter that full code and check again: 31 + 9 = 40, so the rule passes.'],
      ['Do not guess a repair','A mismatch does not establish that only the last digit is wrong. Consult the source rather than automatically changing 8 to 9.'],
    ])],
  }),
  'S6-ENTRY': entry([
    'A visual check compares the entry with its source; double entry compares two independently entered copies.',
    'Resolve differences against the source and recheck. Identical copies can contain the same mistake.',
  ],[
    p("Visual verification means that a person compares the entered information with the original source. Looking at the entry alone and deciding it seems plausible is not that comparison. The original form, document or other stated source must be available, and the person must check the relevant characters or values.",'Make the comparison reference explicit'),
    p("For double entry, enter the value independently twice and let the computer compare the copies. The second entry should not simply copy the first displayed entry. A mismatch identifies disagreement but does not say which entry is right; consult the original source, correct and compare again.",'Complete the mismatch-resolution process'),
    p("If source 640 is entered as 604 twice, both copies agree despite the repeated error. If the source itself is wrong, perfect copying preserves its error. These limitations explain why agreement is evidence from a particular check and why verification differs from validation of permitted values.",'Explain both agreement and disagreement'),
  ],{
    examples:[worked('Resolve a double-entry disagreement completely',[
      ['Conditions','The original form reads 8371. Two independent entries are 8371 and 8731.'],
      ['Computer comparison','The strings differ, so flag the disagreement; do not average them or automatically accept the first.'],
      ['Source check','Compare both with the original 8371. Correct the second entry to 8371.'],
      ['Recheck and final state','Both entries now read 8371 and match the source. Accept 8371 as the verified copy under these checks.'],
      ['Different failure','If both entries had been 8731, double entry alone would pass; a visual source comparison would still detect the difference.'],
    ])],
  }),
  'S6-BYTE-PARITY': entry([
    'Choose the parity bit to make the total count of 1 bits, including that bit, meet the agreed odd/even convention.',
    'Byte parity detects an odd number of bit flips; an even number can pass. It cannot locate the erroneous bit.',
  ],[
    p("The sender and receiver agree a parity convention. Count the 1 bits in the data, then choose a parity bit so the whole transmitted group has an even or odd total as required. The example uses seven data bits followed by one parity bit to make an eight-bit group. Other questions may specify a different data width or bit position; follow the supplied arrangement.",'Fix the convention and the bit positions'),
    table('Build both conventions for the same seven data bits',['Data','Data 1s','Convention','Parity bit','Complete group','Total 1s'],[
      ['1011001','4','Even','0','10110010','4'],['1011001','4','Odd','1','10110011','5'],
    ]),
    p("The receiver checks the whole received group, including its received parity bit. If 10110010 becomes 10100010, the count falls from four to three and even parity fails. The changed bit could instead have been the parity bit itself; this check alone cannot identify which position changed. Reject or request retransmission rather than guessing a correction.",'Trace the receiving decision'),
    p("Each bit flip changes the count of 1s by one in either direction. An odd number of flips changes whether the count is odd or even; an even number preserves it. Flipping the first two bits gives 01110010, still with four 1s. Therefore a passed parity check means no parity error was detected, not that the data is necessarily unchanged.",'Derive the limitation from the count'),
  ],{
    examples:[worked('A parity failure followed by successful retransmission',[
      ['Send','Seven data bits 1011001 with even parity produce 10110010.'],
      ['Receive','The first received group is 10100010. Counting all its bits gives three 1s, so reject it.'],
      ['Request again','The protocol in this example requests retransmission; parity by itself does not perform this communication.'],
      ['Recheck','The resent group arrives as 10110010. Four 1s satisfy even parity, so no parity error is detected and this example accepts the group.'],
      ['Limit','The independent two-flip variant 01110010 also passes. Passing cannot prove every transmission was error-free.'],
    ])],
    check:['The parity bit alone flips in an even-parity group. Is an error detected, and can the check locate that bit?','Yes: one flip changes parity. No: a failed byte-parity check cannot distinguish that position from another single flipped bit.'],
  }),
  'S6-BLOCK-PARITY': entry([
    'Append row parity bits and a column-parity row, then transmit that checking information with the block.',
    'Under a single-bit error assumption, one failed row and one failed column locate the bit; correct and recheck.',
  ],[
    p("Two-dimensional parity adds checking information in both directions. Start with the three seven-bit data rows below and use even parity throughout. Append one row-parity bit to each row. Then count each column of these complete rows to form a final column-parity row, often called a parity byte. This last row is transmitted, not invented by the receiver after an error.",'Construct the sender’s complete block'),
    table('Sender construction',['Row','Seven left-hand bits','Eighth bit','Total 1s in complete row'],parityTableRows),
    p("For data column 4, the sender's rows contain 1, 0, 0: one 1, so the final parity row needs 1 in that column. For column 1 they contain 1, 0, 1: two 1s, so the final bit is 0. Repeating across all eight columns gives 00010100. In this construction the lower-right bit completes the parity information consistently; it is not another original data bit.",'Explain how a column value is obtained'),
    table('Check all column totals including the transmitted last row',['Column','1','2','3','4','5','6','7','8'],[
      ['Sent block',...blockCounts(parityExample.sentBlock).columns.map(String)],
      ['Received block',...blockCounts(parityExample.receivedBlock).columns.map(String)],
      ['Corrected block',...blockCounts(parityExample.sentBlock).columns.map(String)],
    ]),
    p("After exactly one bit changes, its row and column each have the wrong parity. Their intersection locates the bit; flip it and check the complete block again. This reasoning depends on the one-bit assumption. Multiple errors can produce several failed lines, ambiguous intersections or no parity failure. Do not promise correction from every pattern.",'State the correction condition'),
  ],{
    visual:section6Visual('block-parity.svg','Construct the transmitted block, then locate an error','The sender appends even-parity row bits and sends column parity 00010100. Received row 2 becomes 01101000; row 2 and column 5 fail. Under the single-bit assumption, flipping their intersection restores 01100000 and the original even-parity block.'),
    examples:[worked('Check, correct and recheck every direction',[
      ['Sent complete block',parityExample.sentBlock.join('\n')],
      ['Received complete block',parityExample.receivedBlock.join('\n')],
      ['Row check','The received row totals are '+blockCounts(parityExample.receivedBlock).rows.join(', ')+'. Only row 2 is odd.'],
      ['Column check','The received column totals are '+blockCounts(parityExample.receivedBlock).columns.join(', ')+'. Only column 5 is odd.'],
      ['Correct one bit','Assume exactly one bit changed. At row 2, column 5, replace 1 with 0. Row 2 is again 01100000.'],
      ['Final block',parityExample.sentBlock.join('\n')],
      ['Final check','Row totals are '+blockCounts(parityExample.sentBlock).rows.join(', ')+'; column totals are '+blockCounts(parityExample.sentBlock).columns.join(', ')+'. Every total is even.'],
    ])],
    check:['Only row 2 and column 5 fail, and exactly one bit changed. What should be corrected and then checked?','Flip the bit at their intersection, row 2 column 5, then recheck all rows and columns. Without the stated single-bit assumption, those indications alone do not guarantee that correction.'],
    extensions:[extension('Four corner flips can be invisible','Flip the four corners of any rectangle in a correct block. Each affected row has two flips and each affected column has two flips, so their parity remains unchanged. The data can therefore change without a failed check. This explains a limitation; identifying every possible error pattern is not required.')],
  }),
  'S6-CHECKSUM': entry([
    'Calculate a checksum from the data, send it with the block, recalculate from the received data and compare.',
    'Use the specified algorithm. A mismatch detects an error; a match does not prove that the data is unchanged.',
  ],[
    p("A checksum is a value calculated from a block using an agreed algorithm. The sender transmits the data and its checksum. The receiver repeats that algorithm on the received data and compares the newly calculated value with the received checksum. For this example, the checksum is not included as another data byte in the receiver's sum.",'Keep the two compared values distinct'),
    p("The stated rule adds the data bytes and keeps the remainder after division by 256. This is called sum modulo 256. For 84, 121 and 77, the sum is 282. Since 282 = 1 × 256 + 26, the remainder and eight-bit checksum value are 26, not the quotient 1 and not 282. Other checksum algorithms use different operations; do not substitute this rule when a question supplies another.",'Explain the remainder calculation'),
    p("If the received data is 84, 120, 77, its sum is 281 and its remainder is 25. Comparing 25 with the received 26 detects an error somewhere in the data/checking information. A mismatch does not locate the incorrect byte. The system can reject or request retransmission according to its protocol.",'Continue from mismatch to a decision'),
    p("Changing the data to 85, 120, 77 preserves the sum 282 and checksum 26. The two changes cancel, so this algorithm misses them. It is not a digital signature and supplies no authenticated origin: an attacker who can replace both an unprotected block and its checksum can recompute the check. A check digit instead accompanies an identifier under its stated validation rule.",'Compare purpose and limits'),
  ],{
    examples:[worked('Complete the sender–receiver exchange',[
      ['Send','Original data 84,121,77 gives 282 modulo 256 = 26. Send those three data bytes and checksum 26.'],
      ['First arrival','Receive data 84,120,77 and checksum 26. Recompute 281 modulo 256 = 25; 25 differs from 26.'],
      ['Decision','Reject this block and, under this example’s protocol, request retransmission. Do not guess which byte to alter.'],
      ['Second arrival','Receive 84,121,77 and checksum 26. Recompute 26; the values agree, so accept under this check.'],
      ['Unchanged check value is not proof','The separate variant 85,120,77 also gives 26. State that no error was detected, rather than claiming a matching checksum proves truth or authenticity.'],
    ])],
  }),
};

const lessonStages = {
  1:['Classify the four independent incidents, allowing justified overlap between the properties.','Then identify which protection must follow the data copy and which must restore the working service.'],
  2:['Stage 1: authenticate an account and a message. Read the digest and key explanation before tracing a digital signature; compare enrolment with later biometric matching.','Stage 2: apply the complete firewall policy, then distinguish detection, containment and recovery. Justify a control from the stated risk.'],
  3:['Stage 1: follow host execution, covert collection and unauthorised access as different threat mechanisms.','Stage 2: compare phishing with pharming using the normal DNS route. Match each precaution to the step it interrupts.'],
  4:['Follow both encryption and decryption, including the key and final readable result.','Then execute the permission table as a sequence and distinguish a protected service from an independent exported copy.'],
  5:['Stage 1 · Input rules: distinguish validation from source verification, then apply bounds, patterns, presence and lookup checks to the complete form.','Stage 2 · Identifier and entry checks: generate and test a check digit, including zero and a missed error; resolve double-entry differences against the source.','Stage 3 · Transfer checks: construct byte and block parity, calculate both checksum values, and finish rejection, correction or retransmission before evaluating limitations.'],
};

export function enhanceSection6Teaching(lesson, number) {
  const units = lesson.units.map(unit => {
    const spec = teaching[unit.unitKey];
    if (!spec) throw new Error('Missing S6 detailed teaching: '+unit.unitKey);
    const retained = (unit.materials ?? []).filter(m=>m.type!=='worked-example');
    const examples = spec.examples ?? (unit.materials ?? []).filter(m=>m.type==='worked-example');
    const materials = [...(spec.visual ? [spec.visual] : retained),...examples,...(spec.support??[])];
    const firstExample = examples[0];
    return {...unit,teachingBlocks:spec.blocks,explanation:spec.essentials,coreBlocks:undefined,
      preserveSelectedVisual:true,preserveTeachingSteps:true,useAuthoredVisual:true,
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds,preserve:m!==firstExample&&m.type!=='flow'})),
      ...(spec.check?{checkpoint:{prompt:spec.check[0],answer:spec.check[1]}}:{}),
      extensions:spec.extensions??[],
    };
  });
  return enhanceSection6Questions({...lesson,units,teachingCheckpoints:lessonStages[number]},number);
}

export function enhanceSection6Review(lesson) {
  if (lesson.kind!=='review' || lesson.paper!==1) return lesson;
  const units=lesson.units.map(unit=>{
    if (!unit.objectiveIds.some(id=>id.startsWith('S6.'))) return unit;
    return {...unit,unitKey:'S6-REVIEW',useAuthoredVisual:true,preserveSelectedVisual:true,preserveTeachingSteps:true,
      misconceptions:['A passed input or transfer check does not prove the source fact true. A successful login, a valid signature and permission to edit answer different questions.'],
      explanation:['Classify the consequence, follow the threat route and justify controls by their mechanisms.','Trace validation, source comparison and transfer checks; a passed check does not prove truth or authenticated origin.'],
      teachingBlocks:[
        p('Begin with what happened to the record or service: unauthorised disclosure, wrong values, lost records or unavailable processing. Then separate identity authentication, operation-specific permission, encryption, signature verification, filtering and malware detection. One incident may need several controls because each checks a different condition.','Reconstruct the protection argument'),
        p('For integrity, decide which question needs answering. Validation applies input rules. Visual comparison or double entry checks copying. Transfer parity and checksums compare calculated evidence under an agreed rule. Work from supplied data, complete the receiving decision, and explain a relevant way the check can miss an error.','Choose and execute the check'),
      ],
      materials:[comparison('Retrieve the process, then apply it',['Need','Evidence to produce'],[
        ['An identity and a permitted operation','A login result followed by the relevant resource-right decision.'],
        ['A signed readable message','The sender/key/message verification steps and a separate confidentiality judgement.'],
        ['A submitted record','Each rule result, the source comparison, correction and final acceptance decision.'],
        ['A received block','Computed parity/checksum, comparison, action and a justified limitation.'],
      ])],
      checkpoint:{prompt:'A transferred file has a matching checksum and is encrypted. Does this prove its contents are true and its sender is the claimed person?',answer:'No. The checksum can miss changes and does not authenticate origin; encryption protects readable contents. Faithful transfer of false source data remains false, and authentication requires suitable separate evidence.'},
    };
  });
  return {...lesson,units,practice:[...lesson.practice,...section6ReviewQuestions]};
}
