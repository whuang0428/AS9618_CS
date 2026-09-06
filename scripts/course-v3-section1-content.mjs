import { section1DiagramMaterials } from "./course-v3-section1-diagrams.mjs";

// S1 questions are authored with explicit objectives. Do not infer coverage from vocabulary.
const question = (id, objectiveIds, prompt, answerPoints, commonError) => ({
  id, type: "Practice", objectiveIds, prompt, marks: answerPoints.length, answerPoints, commonError,
});

export const section1Practice = {
  "001": [
    question("V3-Q-L001-01", ["S1.01.A01", "S1.01.A02"],
      "State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes.",
      ["1 GiB = 2^30 = 1,073,741,824 bytes.", "Gibi uses successive factors of 1024.", "1 GB = 10^9 = 1,000,000,000 bytes.", "Giga uses successive factors of 1000."],
      "Keep the binary symbol GiB distinct from the decimal symbol GB."),
    question("V3-Q-L001-02", ["S1.01.A01", "S1.01.A02"],
      "Calculate the size of a 3,000,000-byte file in MB. Show your working.",
      ["Divide the byte count by 1,000,000 bytes per MB.", "3,000,000 / 1,000,000 = 3 MB."],
      "MB uses a decimal divisor; dividing by 1,048,576 would give a value in MiB."),
    question("V3-Q-L001-03", ["S1.01.A01", "S1.01.A02"],
      "State the byte multiplier for each pair of prefixes: kibi and kilo; mebi and mega; gibi and giga; tebi and tera.",
      ["Kibi: 2^10; kilo: 10^3.", "Mebi: 2^20; mega: 10^6.", "Gibi: 2^30; giga: 10^9.", "Tebi: 2^40; tera: 10^12."],
      "Each step multiplies by 1024 for binary prefixes and by 1000 for decimal prefixes."),
  ],
  "002": [
    question("V3-Q-L002-01", ["S1.03.A01", "S1.03.A02", "S1.03.A03"],
      "Convert the denary integer 159 to hexadecimal and then to 8-bit binary. Show your working.",
      ["159 = 9 × 16 + 15.", "The hexadecimal value is 9F.", "The nibbles are 9 = 1001 and F = 1111.", "The binary value is 10011111."],
      "Use F for the hexadecimal digit with value 15; this task does not use BCD."),
    question("S1-L02-Q2", ["S1.02.A01", "S1.02.A02", "S1.02.A03"],
      "Explain how the base and place values determine the value of 101 in binary, denary and hexadecimal. Give each value in denary.",
      ["Binary has base 2, so its three place values are 4, 2 and 1.", "Binary 101 has denary value 5.", "Denary has base 10, so its three place values are 100, 10 and 1.", "Denary 101 has value 101.", "Hexadecimal has base 16, so its three place values are 256, 16 and 1.", "Hexadecimal 101 has denary value 257."],
      "The same written digits can represent different values when the base changes."),
    question("S1-L02-Q3", ["S1.02.A04", "S1.03.A04", "S1.06.A01"],
      "A clock displays 59. Give its 8-bit BCD representation and explain why BCD is useful for this display.",
      ["The digit 5 is encoded as 0101.", "The digit 9 is encoded as 1001, giving 0101 1001.", "Each display digit has its own four-bit code, so the two digits can be decoded separately."],
      "Ordinary binary 00111011 represents the integer 59, but is not the BCD encoding of its digits."),
    question("V3-Q-L002-03", ["S1.06.A02"],
      "Explain why hexadecimal is suitable for displaying a binary memory address to a programmer.",
      ["One hexadecimal digit replaces four binary digits, making an address shorter to read.", "Each hexadecimal digit maps directly to one nibble, so the programmer can recover the binary pattern."],
      "Hexadecimal changes the notation shown to the programmer; memory still stores bits."),
    question("S1-L02-Q5", ["S1.02.A05", "S1.03.A05"],
      "Explain how one's complement represents −18 in 8 bits and state one drawback of this representation.",
      ["Positive 18 is 00010010 in eight bits.", "Inverting all eight bits gives 11101101, representing −18.", "One's complement has two zero patterns: 00000000 and 11111111."],
      "Inverting includes every leading zero; keep the width fixed at eight bits."),
    question("S1-L02-Q6", ["S1.02.A06", "S1.03.A06"],
      "Explain how to interpret 11101110 as an 8-bit two's-complement integer. Give its denary value and one advantage of two's complement.",
      ["The leading 1 identifies a negative value; invert to 00010001 and add 1 to obtain magnitude 00010010.", "The denary value is −18.", "Two's complement has only one representation of zero, or allows ordinary fixed-width addition for signed operands."],
      "The leading bit has negative weight in two's complement; the pattern is not unsigned 238."),
    question("S1-L02-Q7", ["S1.03.A01", "S1.03.A02", "S1.03.A03"],
      "Convert hexadecimal 7B to an 8-bit binary value and to denary. Show the place-value calculation.",
      ["7 maps to 0111 and B maps to 1011, giving 01111011.", "The denary calculation is 7 × 16 + 11.", "The denary result is 123."],
      "B is one hexadecimal digit with value 11, not two denary digits."),
  ],
  "003": [
    question("V3-Q-L003-01", ["S1.04.A01", "S1.05.A01"],
      "Calculate 01111111 + 00000001 as unsigned 8-bit integers and explain whether overflow occurs.",
      ["The eight-bit result is 10000000.", "Its unsigned denary value is 128.", "No overflow occurs because 128 lies within the unsigned eight-bit range 0 to 255."],
      "A leading 1 is not a sign bit when the question specifies unsigned integers."),
    question("V3-Q-L003-02", ["S1.04.A02", "S1.05.A01"],
      "Calculate 01001100 + 00111101 as 8-bit two's-complement integers. Explain whether the stored result represents the true sum.",
      ["The stored binary result is 10001001.", "The operands are +76 and +61, so the true sum is +137.", "+137 exceeds the signed maximum +127, so signed overflow occurs.", "The retained pattern represents −119 and is not the true sum."],
      "Two positive operands producing a negative retained result indicate signed overflow; no carry out is needed."),
    question("V3-Q-L003-03", ["S1.04.A01", "S1.05.A01"],
      "For unsigned operands 11001010 and 01110101, give their denary values, the full binary total and the stored byte. Explain any overflow.",
      ["The operands have denary values 202 and 117.", "The full binary sum is 1 00111111.", "The retained eight bits are 00111111.", "Overflow occurs because the true sum 319 exceeds the unsigned maximum 255."],
      "Report both the full mathematical result and the retained register value."),
    question("S1-L03-Q4", ["S1.04.A02"],
      "Calculate −12 − 9 using 8-bit two's-complement addition. Show both encoded operands and interpret the retained result.",
      ["−12 is encoded as 11110100.", "Subtracting +9 means adding −9, encoded as 11110111.", "The addition is 1 11101011; retain 11101011.", "The retained pattern represents −21, the correct signed result."],
      "Negate the subtracted operand, not the first operand; discard only the carry beyond eight bits."),
    question("S1-L03-Q5", ["S1.04.A01"],
      "Calculate the unsigned subtraction 01000000 − 00000111 using borrowing. Explain how you borrow through the zeros and give the 8-bit result.",
      ["Borrow from the 64s column through the 32s, 16s, 8s, 4s and 2s columns to the 1s column.", "The result is 00111001.", "The denary check is 64 − 7 = 57."],
      "A borrowed 1 has value 2 in the next column to the right."),
  ],
  "004": [
    question("V3-Q-L004-01", ["S1.07.A01", "S1.07.A04"],
      "Explain how the character A is represented internally and why Unicode is suitable for a multilingual website.",
      ["A character set assigns a numeric code to A.", "The code is encoded as a binary pattern for storage.", "Unicode includes characters from many writing systems.", "This allows the website to represent languages that the limited ASCII repertoire cannot cover."],
      "A character code describes the character's identity, not its font or drawn shape."),
    question("V3-Q-L004-02", ["S1.07.A01"],
      "A character table gives A the code 65. Give its 8-bit binary pattern and explain why the same character mapping must be used when the file is read.",
      ["The eight-bit pattern is 01000001.", "The reader must map code 65 back to A to recover the intended character."],
      "Use the supplied code; memorising character codes is not required."),
    question("S1-L04-Q3", ["S1.07.A02"],
      "Explain why standard ASCII provides 128 possible codes and state one limitation.",
      ["Seven bits give 2^7 = 128 different patterns.", "The repertoire cannot represent all characters used in the world's writing systems."],
      "Standard ASCII is a seven-bit character set, even when its codes are stored in eight-bit fields."),
    question("S1-L04-Q4", ["S1.07.A02", "S1.07.A03"],
      "Compare standard ASCII with extended ASCII in bit width and number of available codes.",
      ["Standard ASCII uses seven bits; extended ASCII uses eight bits.", "There are 128 standard ASCII codes, compared with 256 codes in an extended ASCII character set."],
      "Different extended ASCII character sets can assign different characters to codes above 127."),
  ],
  "005": [
    question("V3-Q-L005-01", ["S1.09.A02", "S1.09.A03"],
      "A website needs a logo that will also appear on a large banner and a detailed photograph. Justify vector graphics for the logo and a bitmap for the photograph.",
      ["A logo's shapes can be represented as mathematical drawing objects.", "Those objects can be redrawn at banner size without enlarging stored pixels.", "A bitmap stores the photograph's many local colour variations as pixels.", "Describing that detailed photographic scene as individual vector objects would be impractical."],
      "Relate each representation to the particular image, rather than claiming that one is always better."),
    question("V3-Q-L005-02", ["S1.08.A04"],
      "A 200 by 100 bitmap uses 24-bit colour. Calculate its pixel-data size in bytes, ignoring the file header. Show your working.",
      ["There are 200 × 100 = 20,000 pixels.", "Pixel data requires 20,000 × 24 = 480,000 bits.", "480,000 / 8 = 60,000 bytes."],
      "Divide bits by eight to obtain bytes; this calculation excludes header and compression overhead."),
    question("V3-Q-L005-03", ["S1.09.A01"],
      "Identify one property defining a rectangle's position and one other property stored for it in a vector drawing list.",
      ["Its position, such as the coordinates of a corner.", "Its dimensions, fill colour or line colour; accept any second distinct valid property."],
      "Give properties of the object; the image's pixel resolution is not a rectangle property."),
    question("S1-L05-Q4", ["S1.08.A01"],
      "Describe how a bitmap's file header and ordered pixel values allow software to reconstruct the image.",
      ["The header gives dimensions and colour depth needed to interpret the data.", "The pixel values encode the colour for each position in the grid.", "Software uses the dimensions and data order to place each decoded colour at its intended pixel position."],
      "The header is metadata; it does not replace the colour data for individual pixels."),
    question("S1-L05-Q5", ["S1.08.A03", "S1.08.A06"],
      "Calculate the number of available colours at a depth of 4 bits per pixel. Explain the effects of increasing the depth to 8 bits while keeping image resolution unchanged.",
      ["Four bits provide 2^4 = 16 colours.", "Eight bits provide 2^8 = 256 colours.", "More available colours can represent colour differences more accurately.", "Uncompressed pixel-data size doubles because each pixel uses twice as many bits."],
      "Colour depth changes the number of possible colour values, not the number of pixels."),
    question("S1-L05-Q6", ["S1.08.A02", "S1.08.A05"],
      "Compare image resolution with screen resolution. Explain the effects of capturing the same scene with twice as many pixels in each dimension, at unchanged colour depth.",
      ["Image resolution specifies the pixel dimensions of the stored image.", "Screen resolution specifies the pixel dimensions available on the display.", "Doubling both image dimensions gives four times as many pixels, allowing finer spatial detail to be captured.", "The uncompressed pixel data is four times larger at the same colour depth."],
      "Changing the display or enlarging an existing bitmap does not recover detail absent from the original capture."),
  ],
  "006": [
    question("V3-Q-L006-01", ["S1.10.A01", "S1.10.A02"],
      "Describe how sampling, quantisation and binary encoding turn an analogue sound wave into stored digital data.",
      ["Measure the wave's amplitude at equally spaced time intervals.", "Assign each measurement to an available amplitude level.", "Encode the selected levels as binary values and retain their time order."],
      "The stored values are discrete samples; the continuous wave is not stored directly."),
    question("S1-L06-Q2", ["S1.10.A03", "S1.10.A04"],
      "Two changes are considered when recording a sound: doubling the sampling rate or doubling the bits per sample. Explain how each change affects accuracy and uncompressed data size, with duration and channel count unchanged.",
      ["Doubling the sampling rate captures twice as many amplitude measurements per second and can follow time changes more closely.", "With bits per sample unchanged, twice as many samples require twice the data size.", "Increasing bits per sample provides more amplitude levels and can reduce quantisation error.", "Doubling bits per sample doubles data size when the sampling rate is unchanged."],
      "Twice as many bits per sample gives more than twice as many amplitude levels."),
    question("V3-Q-L006-03", ["S1.11.A02", "S1.11.A07"],
      "Compare lossless sound compression with a lossy method that removes less-audible sound information. Explain what happens when each file is decoded.",
      ["Lossless coding stores sample patterns more compactly without discarding original values.", "Decoding recovers every original sample value exactly.", "The lossy method removes information judged less audible to listeners.", "Its decoded sound is an approximation because discarded information cannot be reconstructed exactly."],
      "Lossless compression need not reduce the sampling rate or sampling resolution."),
    question("S1-L06-Q4", ["S1.11.A04", "S1.11.A08"],
      "A text format stores repeated words once in a dictionary and uses short references to them. Explain how this compresses a document and why it is suitable for an examination answer that must be preserved exactly.",
      ["Repeated occurrences of a long word are replaced by a shorter dictionary reference.", "The decoder replaces each reference with the original word, preserving the text exactly.", "Exact reconstruction preserves every word of the examination answer; deleting apparently unimportant letters would be unsuitable."],
      "Dictionary storage has overhead, so a short document with few repeated words may not become smaller."),
    question("S1-L06-Q5", ["S1.11.A05", "S1.11.A08"],
      "A publisher stores a diagram with large areas of identical pixel colour and a small photographic preview. Explain a suitable compression method for each, including its effect on reconstruction.",
      ["RLE can replace long adjacent runs in the diagram with count-and-colour pairs.", "Those pairs reconstruct the diagram's original pixels exactly.", "Lossy compression can discard fine detail or colour differences in the photographic preview.", "The preview can be smaller, but some detail is permanently lost and the reduced quality must remain acceptable."],
      "RLE benefits depend on adjacent repeated values, not merely on the total number of colours."),
    question("S1-L06-Q6", ["S1.11.A06"],
      "A vector map contains 100 identical tree symbols at different positions. Explain how storing one shared object definition and a reference at each position can compress the map without changing its appearance.",
      ["Store the tree's shape and shared properties once.", "Each occurrence stores a reference to that definition plus its own position.", "The renderer retrieves the complete definition for every occurrence, reproducing all trees exactly with less repeated object data."],
      "Each position must still be stored; removing the coordinates would lose information."),
    question("S1-L06-Q7", ["S1.11.A01"],
      "Explain two benefits of compressing a file before storing it and sending it over a connection with a fixed bit rate.",
      ["A smaller encoded file occupies less storage space.", "Fewer transmitted bits take less time at the same bit rate."],
      "Compression reduces the amount of data; it does not increase the connection's bit rate."),
    question("S1-L06-Q8", ["S1.11.A03"],
      "An RLE format stores each run as an 8-bit count followed by an 8-bit character code. Give the decoded text for 3A 1B 4C, calculate its original and encoded sizes, and decide whether RLE saves space.",
      ["The decoded text is AAABCCCC.", "The original has eight characters, requiring 8 × 8 = 64 bits.", "Three count-and-character pairs require 3 × 16 = 48 bits.", "RLE saves 16 bits in this example."],
      "Count the bits used by both parts of each pair, not just the characters."),
  ],
};

export const section1ExamQuestions = {
  "001": [
    {
      "id": "S1-L01-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.01.A01",
        "S1.01.A02"
      ],
      "prompt": "A storage manufacturer labels a drive as 512 GB, but system software reports approximately 477 GiB. Explain why the numerical values differ even though no storage capacity has been lost.",
      "marks": 4,
      "answerPoints": [
        "The label GB uses the decimal prefix giga, so 1 GB equals 10^9 bytes.",
        "The software value GiB uses the binary prefix gibi, so 1 GiB equals 2^30 bytes.",
        "The same byte capacity is divided by two different unit sizes, producing different numerical values.",
        "Because one GiB is larger than one GB, the numerical value in GiB is lower."
      ],
      "commonError": "Do not claim that the operating system deleted capacity; the two displays use different unit definitions."
    },
    {
      "id": "S1-L01-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.01.A01",
        "S1.01.A02"
      ],
      "prompt": "Calculate the number of bytes in 2 MiB and in 2 MB, then calculate the difference between the two capacities.",
      "marks": 3,
      "answerPoints": [
        "2 MiB = 2 × 2^20 = 2,097,152 bytes.",
        "2 MB = 2 × 10^6 = 2,000,000 bytes.",
        "The difference is 2,097,152 − 2,000,000 = 97,152 bytes."
      ],
      "commonError": "Do not use 1024 as the value of mebi; one mebibyte is 1024 squared bytes."
    },
    {
      "id": "S1-L01-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.01.A01",
        "S1.01.A02"
      ],
      "prompt": "A network specification states a transfer amount in gigabytes while a memory specification states a capacity in gibibytes. Describe the multiplier represented by each prefix and explain why the unit symbols must not be treated as interchangeable.",
      "marks": 3,
      "answerPoints": [
        "Giga is the decimal multiplier 10^9 and uses the symbol G in GB.",
        "Gibi is the binary multiplier 2^30 and uses the symbol Gi in GiB.",
        "The multipliers have different byte values, so replacing GB with GiB changes the stated capacity rather than only changing its spelling."
      ],
      "commonError": "Do not state that giga and gibi are synonyms or give them the same multiplier."
    }
  ],
  "002": [
    {
      "id": "S1-L02-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.02.A04",
        "S1.03.A04"
      ],
      "prompt": "Give the 16-bit BCD representation of the denary display value 4072 and explain why this is not the ordinary binary representation of 4072.",
      "marks": 4,
      "answerPoints": [
        "Encode the four denary digits separately as 4 = 0100, 0 = 0000, 7 = 0111 and 2 = 0010.",
        "The complete BCD representation is 0100 0000 0111 0010.",
        "BCD assigns one four-bit group to each displayed denary digit rather than converting the whole value in one operation.",
        "Ordinary binary uses powers-of-two place values for the complete integer, so it produces a different bit pattern."
      ],
      "commonError": "Do not convert 4072 directly to binary and label that result BCD; encode 4, 0, 7 and 2 independently."
    },
    {
      "id": "S1-L02-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.02.A05",
        "S1.02.A06",
        "S1.03.A05",
        "S1.03.A06"
      ],
      "prompt": "Describe how the denary value −37 is represented in 8-bit one's complement and 8-bit two's complement, and explain why the two bit patterns differ.",
      "marks": 4,
      "answerPoints": [
        "Positive 37 has the eight-bit binary representation 00100101.",
        "Inverting all eight bits gives one's complement 11011010.",
        "Adding one gives two's complement 11011011.",
        "The representations differ because two's complement adds one after inversion; one's complement does not."
      ],
      "commonError": "Do not convert the magnitude separately and then attach a minus sign; the fixed-width bit pattern itself represents the negative value."
    },
    {
      "id": "S1-L02-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.03.A01",
        "S1.03.A02"
      ],
      "prompt": "The unsigned binary value 11010110 must be written in denary and hexadecimal. Explain both conversion methods and give both results.",
      "marks": 4,
      "answerPoints": [
        "For denary, add the place values of the 1 bits: 128 + 64 + 16 + 4 + 2.",
        "The denary result is 214.",
        "For hexadecimal, split the binary value into the nibbles 1101 and 0110.",
        "The nibbles map to D and 6, so the hexadecimal result is D6."
      ],
      "commonError": "Do not treat the most significant bit as a sign bit because the value is explicitly unsigned."
    }
  ],
  "003": [
    {
      "id": "S1-L03-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.04.A02",
        "S1.05.A01"
      ],
      "prompt": "Calculate the 8-bit two's-complement sum 11011011 + 00010010. Give the denary value of each operand and the retained result, and explain whether signed overflow occurs.",
      "marks": 4,
      "answerPoints": [
        "The 8-bit addition produces 11101101.",
        "The first operand represents -37 and the second operand represents +18.",
        "Invert 11101101 and add 1 to obtain magnitude 00010011, so the result represents -19.",
        "The exact result -19 lies in the 8-bit signed range -128 to +127, so no signed overflow occurs."
      ],
      "commonError": "Do not apply the unsigned carry-out rule to decide signed overflow; interpret the operands and result using the stated two's-complement representation."
    },
    {
      "id": "S1-L03-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.04.A01",
        "S1.05.A01"
      ],
      "prompt": "Two unsigned 8-bit values are added and produce the nine-bit result 1 00000010. Explain why overflow has occurred and what is stored in the 8-bit register.",
      "marks": 3,
      "answerPoints": [
        "An unsigned 8-bit register can represent only values from 0 to 255.",
        "The mathematical result needs a ninth bit, so it is outside that representable range.",
        "Only the lower eight bits 00000010 remain in the register and the carry out indicates overflow."
      ],
      "commonError": "Do not say that every carry within the addition is overflow; overflow is caused by a result outside the fixed-width range."
    },
    {
      "id": "S1-L03-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.04.A01"
      ],
      "prompt": "Complete the 8-bit unsigned subtraction 10110100 - 00101101 and verify the binary result by converting all three values to denary.",
      "marks": 4,
      "answerPoints": [
        "The first operand 10110100 represents 180 in denary.",
        "The second operand 00101101 represents 45 in denary.",
        "The subtraction gives the 8-bit result 10000111.",
        "The check 180 - 45 = 135 confirms that 10000111 is correct."
      ],
      "commonError": "Do not interpret the leading 1 as a sign bit because the question specifies unsigned values."
    }
  ],
  "004": [
    {
      "id": "S1-L04-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.07.A01",
        "S1.07.A02",
        "S1.07.A03"
      ],
      "prompt": "A system needs unique codes for 150 symbols. Explain whether standard ASCII has enough codes, calculate the minimum fixed bit width required, and state whether an 8-bit character set provides enough patterns.",
      "marks": 4,
      "answerPoints": [
        "Seven bits provide 2^7 = 128 different patterns.",
        "A set of 150 symbols cannot be represented uniquely by only 128 patterns.",
        "Eight bits provide 2^8 = 256 patterns.",
        "The minimum fixed width is therefore 8 bits."
      ],
      "commonError": "Do not assume that seven bits can store values from 0 to 150; seven bits provide only 128 distinct patterns in total."
    },
    {
      "id": "S1-L04-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.07.A01"
      ],
      "prompt": "Using the character codes C = 67, A = 65 and T = 84, describe how the text CAT is represented as three 8-bit binary codes.",
      "marks": 4,
      "answerPoints": [
        "Look up or use the numeric code assigned to each character in sequence.",
        "The code 67 for C is stored as 01000011.",
        "The code 65 for A is stored as 01000001.",
        "The code 84 for T is stored as 01010100."
      ],
      "commonError": "Do not store the appearance of each letter; the file stores the numeric codes selected by the character set."
    },
    {
      "id": "S1-L04-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.07.A03",
        "S1.07.A04"
      ],
      "prompt": "Compare extended ASCII with Unicode for exchanging English, Arabic, Chinese and emoji text between computers, and justify the more suitable character set.",
      "marks": 4,
      "answerPoints": [
        "Extended ASCII provides only 256 code patterns and different extensions may assign the upper codes differently.",
        "That limited repertoire cannot assign codes to all of the required writing systems and emoji.",
        "Unicode defines a much larger common repertoire of code points for characters from many writing systems.",
        "Unicode is more suitable because the sender and receiver can interpret the multilingual text using the same character assignments."
      ],
      "commonError": "Do not claim that every Unicode character is stored in exactly 16 bits; the task concerns repertoire and consistent character assignment."
    }
  ],
  "005": [
    {
      "id": "S1-L05-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.08.A01",
        "S1.08.A03"
      ],
      "prompt": "A bitmap has image resolution 640 by 480 and colour depth 8 bits. Calculate the number of possible pixel colours and describe how its header and pixel data are used when the file is opened.",
      "marks": 4,
      "answerPoints": [
        "An 8-bit colour value provides 2^8 = 256 possible colours for each pixel.",
        "The header supplies metadata such as width, height and colour depth needed to interpret the following data.",
        "The pixel data supplies one colour value for each position in the 640 by 480 grid.",
        "The software uses the metadata to map the stored pixel values to the correct positions and colours on the display."
      ],
      "commonError": "Do not include the header bytes in the pixel count or describe the bitmap as a vector drawing list."
    },
    {
      "id": "S1-L05-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.09.A01",
        "S1.09.A02"
      ],
      "prompt": "A vector file stores a blue rectangle and a black line. Describe the drawing list and explain how the software uses the stored object properties to render the image. Explain why doubling the object dimensions avoids bitmap pixelation.",
      "marks": 4,
      "answerPoints": [
        "The drawing list contains one entry for the rectangle and one entry for the line.",
        "Each entry identifies the object type and stores properties such as coordinates, dimensions, line colour, fill colour and line thickness.",
        "The software reads the entries in list order and draws each object using its stored properties.",
        "Changing coordinates or dimensions allows the objects to be redrawn at another size without enlarging a fixed pixel grid."
      ],
      "commonError": "Do not describe a vector graphic as a grid of stored pixel colour values."
    },
    {
      "id": "S1-L05-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.08.A04",
        "S1.08.A05",
        "S1.08.A06"
      ],
      "prompt": "Compare the uncompressed pixel-data sizes of bitmap A, which is 1600 by 1200 with 8-bit colour, and bitmap B, which is 800 by 600 with 24-bit colour. State which is larger and by how many bytes. Explain why the image with fewer bits per pixel can still be larger.",
      "marks": 4,
      "answerPoints": [
        "Bitmap A contains 1600 x 1200 x 8 = 15,360,000 bits, which is 1,920,000 bytes.",
        "Bitmap B contains 800 x 600 x 24 = 11,520,000 bits, which is 1,440,000 bytes.",
        "Bitmap A is larger by 1,920,000 - 1,440,000 = 480,000 bytes.",
        "The higher pixel count of bitmap A outweighs the greater colour depth of bitmap B in this comparison."
      ],
      "commonError": "Do not compare resolution or colour depth in isolation; multiply both pixel dimensions by the bits per pixel before converting bits to bytes."
    }
  ],
  "006": [
    {
      "id": "S1-L06-EXAM-1",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.10.A01",
        "S1.10.A03"
      ],
      "prompt": "The same analogue sound is recorded twice, once at 22 kHz and once at 44 kHz. Both recordings use mono, 16-bit uncompressed samples and the same duration. Explain how the second recording differs in sample spacing, representation accuracy and sample-data size.",
      "marks": 4,
      "answerPoints": [
        "The second recording captures 44,000 amplitude measurements per second instead of 22,000.",
        "Measurements are separated by 1/44,000 second rather than 1/22,000 second.",
        "Measuring the original wave more frequently can represent changes in the wave more accurately.",
        "Twice as many 16-bit samples require twice the uncompressed sample-data size; headers are excluded."
      ],
      "commonError": "This question describes two captures of the analogue source. Upsampling an existing recording would not recover missing source information."
    },
    {
      "id": "S1-L06-EXAM-2",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.11.A03",
        "S1.11.A05",
        "S1.11.A08"
      ],
      "prompt": "Two one-bit bitmap rows contain 24 pixels each. Row A has twelve 0s followed by twelve 1s. Row B alternates 0 and 1 twelve times. RLE stores a 5-bit count and a 1-bit colour for each run. Explain which row benefits from RLE, supporting your conclusion with the original and encoded bit sizes, and explain why decoding preserves the pixels.",
      "marks": 6,
      "answerPoints": [
        "Each original row occupies 24 bits.",
        "Row A contains two runs: (12, 0) followed by (12, 1).",
        "Row A encodes as two six-bit pairs, requiring 12 bits.",
        "Row B has 24 runs of length one, so it requires 24 × 6 = 144 bits.",
        "RLE saves 12 bits for A but adds 120 bits for B; it benefits the row with long adjacent runs.",
        "Expanding each count-and-colour pair in order reproduces every original pixel exactly."
      ],
      "commonError": "Do not combine non-adjacent occurrences into one run, and always state the count/value order used in the encoding."
    },
    {
      "id": "S1-L06-EXAM-3",
      "type": "Exam-style",
      "objectiveIds": [
        "S1.11.A02",
        "S1.11.A07",
        "S1.11.A08"
      ],
      "prompt": "Compare lossless compression for a concert archive master with lossy compression for its streamed copy, linking each choice to its intended use.",
      "marks": 5,
      "answerPoints": [
        "lossless compression allows every original sample value in the archive master to be reconstructed exactly.",
        "the master preserves the recording for later editing or production without irreversible quality loss.",
        "lossy sound compression can remove less-audible information from the streamed copy.",
        "the discarded information cannot be recovered, so the streamed copy is not an exact reconstruction.",
        "the smaller streamed file can require less bandwidth and transfer in less time when the quality remains acceptable."
      ],
      "commonError": "Do not say that lossy compression can recreate the exact original; its selected sound detail has been removed permanently."
    }
  ]
};

const checkpoints = {
  "001": [["Which is larger: 1 MB or 1 MiB? Explain using byte values.", "1 MiB is larger: 1,048,576 bytes compared with 1,000,000 bytes."]],
  "002": [
    ["What binary place value is immediately to the left of the 16s column?", "32: each step left multiplies the place value by two."],
    ["What does the zero in denary 205 tell you?", "There are no tens; the positions distinguish two hundreds from five units."],
    ["What numerical value does hexadecimal E represent?", "14; digits A to F represent values 10 to 15."],
    ["Which display value is encoded by BCD 0110 0010?", "62: decode the groups separately as 6 and 2."],
    ["What happens when every bit of one's-complement positive zero is inverted?", "00000000 becomes 11111111, the second representation of zero."],
    ["What is the smallest eight-bit two's-complement integer?", "−128, stored as 10000000; the most significant bit has weight −128."],
    ["Give the binary nibbles for hexadecimal A3.", "1010 0011: each hexadecimal digit maps to four bits."],
  ],
  "003": [
    ["What value does a borrowed 1 have in the next binary column to the right?", "It has value 2 in that column, so binary 10 minus 1 leaves 1."],
    ["Does every carry between two columns imply overflow?", "No. Overflow means the true result is outside the range of the stated representation."],
    ["What is retained after adding −1 and +1 in eight-bit two's complement?", "11111111 + 00000001 = 1 00000000; discard the carry and retain 00000000, zero."],
  ],
  "004": [
    ["A is code 65 and B is code 66. Which code is stored first for BA?", "66 for B; retain the order of the characters."],
    ["What is the largest numeric code in seven-bit standard ASCII?", "127; the 128 codes include zero."],
    ["Why must two systems agree on which extended ASCII character set they use?", "Different extensions can assign different characters to codes above 127."],
    ["Does Unicode mean every character occupies exactly 16 bits in a file?", "No. The encoding, such as UTF-8 or UTF-16, determines how code points are stored."],
  ],
  "005": [
    ["Why does the reader need the bitmap width as well as the pixel values?", "The width tells the reader where each row ends when rebuilding the two-dimensional arrangement."],
    ["How many colour values does one pixel have in a single image?", "One selected colour value at that position, even when many colours are available."],
    ["How many colours can a three-bit pixel code select?", "2³ = 8 possible colours."],
    ["Does a higher-resolution screen add stored image pixels?", "No. Screen resolution and stored image resolution describe different grids."],
    ["Why divide a bit total by eight to obtain bytes?", "Each byte contains eight bits."],
    ["Which coordinates can define a straight line in a drawing list?", "Its start and end coordinates, with properties such as colour and thickness."],
    ["Why can an enlarged bitmap show square edges?", "Its fixed grid is enlarged; extra original scene detail is not created."],
  ],
  "006": [
    ["Are sound samples taken at arbitrary or equally spaced time intervals?", "Equally spaced intervals, determined by the sampling rate."],
    ["Does upsampling recover sound information that was never captured?", "No. Interpolated values are not new measurements of the original analogue source."],
    ["How many amplitude levels are possible with 12 bits per sample?", "2¹² = 4096 levels."],
    ["Why can compression shorten a transfer without changing the connection's bit rate?", "Fewer bits need to be transmitted at the same number of bits per second."],
    ["Can decoding a lossy file restore all discarded source information?", "No. The loss is permanent; the decoded result is an approximation."],
    ["Must lossless encoding make every input smaller?", "No. Dictionary or other overhead can outweigh savings when little repetition exists."],
    ["Why choose lossless compression for an editable master copy?", "Every original value remains available for later editing and new exports."],
    ["Can the two A runs in AAABAA be combined into one RLE run?", "No. The intervening B must keep them separate to preserve order."],
  ],
};

export function enhanceSection1Units(lessonId, sourceUnits) {
  return sourceUnits.map((source, index) => {
    const unit = { ...source, materials: [...source.materials], explanation: [...source.explanation] };
    const [prompt, answer] = checkpoints[lessonId][index];
    unit.checkpoint = { prompt, answer };
    const example = (title, steps, objectiveIds = unit.objectiveIds) => ({ type: "worked-example", title, steps, objectiveIds, preserve: true });
    if (lessonId === "001") {
      unit.unitKey = "S1.01-PREFIXES";
      unit.materials = unit.materials.filter((material) => !["flow", "worked-example"].includes(material.type));
      unit.materials.push({ ...example("Express one file in bytes, MB and MiB", [
        ["Start with binary units", "A 4 MiB file contains 4 × 1,048,576 = 4,194,304 bytes."],
        ["Use a decimal divisor", "4,194,304 / 1,000,000 = 4.194304 MB."],
        ["Check the meaning", "4 MiB and 4.194304 MB describe the same byte count; the file has not changed."],
      ]), preserve: false });
    }
    if (unit.unitKey === "S1.04-UNSIGNED") unit.materials.push(example("Subtract with a borrow through zero", [
      ["Align", "Subtract 00010011 (19) from 00110100 (52), starting at the rightmost column."],
      ["Borrow", "The 1s column needs a borrow. Take the 1 from the 4s column: leave 0 there, pass through the 2s column leaving 1, and place binary 10 in the 1s column."],
      ["Subtract", "In the 1s column, 10₂ − 1₂ = 1₂. In the 2s column, 1 − 1 = 0. Complete the remaining columns to obtain 00100001."],
      ["Check", "52 − 19 = 33, which is 00100001 in eight bits."],
    ]));
    if (unit.unitKey === "S1.04-SIGNED") {
      unit.objectiveIds = ["S1.04.A02", "S1.05.A01"];
      unit.materials.push(example("Subtract by adding the two's-complement negation", [
        ["Rewrite", "+7 − (+12) becomes +7 + (−12)."],
        ["Encode −12", "+12 is 00001100; invert to 11110011 and add 1 to obtain 11110100."],
        ["Add", "00000111 + 11110100 = 11111011."],
        ["Interpret", "Invert the negative result and add 1: 00000100 + 1 = 00000101. The result is −5, inside −128 to +127."],
      ], ["S1.04.A02"]));
      unit.materials.push(example("Signed overflow without a carry out", [
        ["Add", "01011010 (+90) + 00111100 (+60) = 10010110."],
        ["True sum", "90 + 60 = 150, beyond the eight-bit signed maximum of 127."],
        ["Retained value", "10010110 represents −106 in two's complement, so it cannot be the required positive sum."],
        ["Decide", "Signed overflow has occurred even though no ninth-bit carry was produced."],
      ], ["S1.04.A02", "S1.05.A01"]));
      unit.explanation.push("For two's-complement addition, operands with the same sign that produce a retained result with the opposite sign indicate overflow. Confirm this by comparing the exact result with the signed range.");
    }
    if (section1DiagramMaterials[unit.unitKey]) {
      unit.materials = unit.materials.filter((material) => material.type !== "reviewed-visual");
      unit.materials.unshift({ ...section1DiagramMaterials[unit.unitKey], objectiveIds: [...unit.objectiveIds] });
    }
    if (unit.unitKey === "S1.10-SAMPLING-RATE") {
      unit.explanation.push("The accuracy benefit describes taking new measurements of the analogue source. Resampling an existing digital recording at a higher rate interpolates additional values but cannot recover information absent from the original capture.");
      unit.materials.push({ ...example("Calculate uncompressed sound data", [
        ["Count samples", "A five-second mono recording at 16,000 Hz contains 5 × 16,000 = 80,000 samples."],
        ["Count bits", "At 16 bits per sample, the sample data occupies 80,000 × 16 = 1,280,000 bits."],
        ["Convert to bytes", "1,280,000 / 8 = 160,000 bytes, excluding headers. Stereo with the same settings requires twice as many sample values."],
      ]), preserve: false });
    }
    if (unit.unitKey === "S1.11-LOSSY-FILES") unit.objectiveIds = unit.objectiveIds.filter((id) => id !== "S1.11.A06");
    if (unit.unitKey === "S1.11-LOSSLESS-FILES") {
      unit.materials.push({ ...example("Replace repeated text with dictionary references", [
        ["Find repetition", "RED RED BLUE RED contains RED three times."],
        ["Define the code", "A tokenised format stores the dictionary entry 1 → RED, then [1, 1, BLUE, 1]. It also preserves the spaces between tokens."],
        ["Decode", "Replace each reference 1 with RED and restore the separators to recover RED RED BLUE RED exactly."],
        ["Check overhead", "Dictionary entries and token markers also need storage. This tiny example illustrates the method; enough repeated text is needed to offset the overhead."],
      ], ["S1.11.A04"]), preserve: false });
      unit.materials.push(example("Share a repeated vector object", [
        ["Original", "Three identical five-point stars have the same shape and fill, but positions (10, 20), (40, 20) and (70, 20)."],
        ["Share", "Store one definition S containing the shape and shared properties; store references S at (10, 20), S at (40, 20), S at (70, 20)."],
        ["Render", "Retrieve S at each position. All three stars retain their original geometry, properties and placement."],
        ["Size", "Long object descriptions are stored once; each reference and position still needs space."],
      ], ["S1.11.A06"]));
      unit.explanation.push("For a bitmap, RLE can store a repeated colour as a count and colour code. Repeated sound sample values can also use reversible run coding; other lossless encoders exploit sample patterns while preserving every value. The format must specify how its codes are decoded.");
    }
    return unit;
  });
}
