import { Question } from './questions';
import { Flashcard } from './flashcards';
import { Note } from './notes';

export const reasoningQuestions: Question[] = [
  { id: 'q-lns-1', topicId: 'reasoning', text: 'Which number will come in place of the question mark in the given digit/number series? 2, 5, 11, 20, 32, ?', options: ['44', '47', '49', '50'], correctIndex: 1 },
  { id: 'q-lns-2', topicId: 'reasoning', text: 'Which number will come in place of the question mark in the series? 130, 109, 90, 73, 58, ?', options: ['45', '41', '43', '35'], correctIndex: 0 },
  { id: 'q-lns-3', topicId: 'reasoning', text: 'Which number will come in place of the question mark in the series? 4, 10, 22, 46, 94, ?', options: ['145', '190', '180', '225'], correctIndex: 1 },
  { id: 'q-lns-4', topicId: 'reasoning', text: 'Which number will come in place of the question mark in the series? 5, 7, 9, 13, 15, 22, 23, 34, 33, ?', options: ['36', '39', '45', '49'], correctIndex: 3 },
  { id: 'q-lns-5', topicId: 'reasoning', text: 'Which number will come in place of the question mark in the series? 08, 17, 26, 35, ?', options: ['43', '44', '45', '49'], correctIndex: 1 },
  { id: 'q-lns-6', topicId: 'reasoning', text: 'Find the wrong term in the given number series: 5, 9, 15, 23, 34, 45, 59', options: ['34', '45', '59', '23'], correctIndex: 0 },
  { id: 'q-lns-7', topicId: 'reasoning', text: 'Find the wrong term in the given number series: 58, 53, 51, 46, 44, 42, 37, 32', options: ['44', '37', '51', '42'], correctIndex: 3 },
  { id: 'q-lns-8', topicId: 'reasoning', text: 'Find the wrong term in the given number series: 99, 88, 75, 64, 51, 40, 28, 16', options: ['64', '51', '28', '16'], correctIndex: 2 },
  { id: 'q-lns-9', topicId: 'reasoning', text: 'Find the wrong term in the given number series: 23, 89, 23, 82, 23, 73, 23, 62, 23, 51, 23, 34', options: ['73', '62', '51', '34'], correctIndex: 2 },
  { id: 'q-lns-10', topicId: 'reasoning', text: 'Find the wrong term in the given number series: 5, 3, 3, 5, 15, 79, 407', options: ['5', '79', '15', '407'], correctIndex: 1 },
  { id: 'q-lns-11', topicId: 'reasoning', text: 'Which letter will come in place of the question mark in the series? C, F, J, O, U, B, ?', options: ['J', 'F', 'K', 'L'], correctIndex: 0 },
  { id: 'q-lns-12', topicId: 'reasoning', text: 'Which letter will come in place of the question mark in the series? V, Q, M, J, H, ?', options: ['E', 'F', 'G', 'D'], correctIndex: 2 },
  { id: 'q-lns-13', topicId: 'reasoning', text: 'Which letter group will come in place of the question mark in the series? Y, F, W, H, U, J, S, L, ?', options: ['QN', 'QW', 'QP', 'MN'], correctIndex: 0 },
  { id: 'q-lns-14', topicId: 'reasoning', text: 'Which letter group will come in place of the question mark in the series? KCD, LEF, MGH, NIJ, ?', options: ['KOL', 'NIJ', 'MNO', 'OKL'], correctIndex: 3 },
  { id: 'q-lns-15', topicId: 'reasoning', text: 'Which letter group will come in place of the question mark in the series? FCGA, HCIA, JCKA, ?, NCOA', options: ['LBMC', 'MCNB', 'LCMA', 'None of the above'], correctIndex: 2 },
  { id: 'q-cd-1', topicId: 'reasoning', text: "If in a code language the word 'STUDENT' is written as 'TUVEFOU', then how will 'TEACHER' be written in the same language?", options: ['REHCAET', 'UFBDIFS', 'UFDBFIS', 'ETCAEHR'], correctIndex: 1 },
  { id: 'q-cd-2', topicId: 'reasoning', text: "If in a code language the word 'VERBAL' is written as 'WFSCBM', then how will 'CHAPTER' be written in the same language?", options: ['DIQBUFS', 'RETPAHC', 'DIBQUFS', 'DIBUQFS'], correctIndex: 2 },
  { id: 'q-cd-3', topicId: 'reasoning', text: "If in a code language the word 'STABILISE' is written as 'UVCDKNKUG', then how will 'MONUMENT' be written in the same language?", options: ['OQPWOGPV', 'QPOWOGPV', 'NPOVNFOU', 'None of these'], correctIndex: 0 },
  { id: 'q-cd-4', topicId: 'reasoning', text: "If the word 'MAYOR' is written as 'OCAQT' in a code language, then how will 'GOLDEN' be written in the same code language?", options: ['IQNFGP', 'HPMEFO', 'INQFGP', 'NEDLOG'], correctIndex: 0 },
  { id: 'q-cd-5', topicId: 'reasoning', text: "If in a code language 'PLATE' is written as 'SODWH', then how will 'NOBLE' be written in the same code language?", options: ['OPCMF', 'QEROH', 'PQDNG', 'QREOH'], correctIndex: 3 },
  { id: 'q-cd-6', topicId: 'reasoning', text: "If in a certain code language 'HOUSE' is written as 'LSYWI', then how will the word 'BOARD' be written in the same language?", options: ['ERDUG', 'FSEVH', 'CPBSE', 'None of these'], correctIndex: 1 },
  { id: 'q-cd-7', topicId: 'reasoning', text: "If in a code language 'ORANGE' is written as 'TWFSLJ', then how will the word 'MANGOS' be written in the same code language?", options: ['RFRLTW', 'RFSLTX', 'SFRKTX', 'None of these'], correctIndex: 1 },
  { id: 'q-cd-8', topicId: 'reasoning', text: "If in a code language 'HORSE' is written as 'HPTVI', then how will 'LIONS' be written in the same code language?", options: ['LJQQW', 'MJPOT', 'ILOSN', 'None of these'], correctIndex: 0 },
  { id: 'q-cd-9', topicId: 'reasoning', text: "If in a code language 'SATYAM' is written as 'RZSXZL', then how will 'INFOSYS' be written in the same code language?", options: ['JOGPTJT', 'HMNEHRX', 'HMFNXHR', 'None of these'], correctIndex: 3 },
  { id: 'q-cd-10', topicId: 'reasoning', text: "If in a code language 'BHOPAL' is written as 'AGNOZK', then how will 'JAIPUR' be written in the same code language?", options: ['IZHOTQ', 'IZHOQT', 'KBJQVS', 'None of these'], correctIndex: 0 },
  { id: 'q-ana-1', topicId: 'reasoning', text: 'Film is related to Director in the same way as Book is related to:', options: ['Writer', 'Publisher', 'Producer', 'Editor'], correctIndex: 1 },
  { id: 'q-ana-2', topicId: 'reasoning', text: 'Gravity is related to Earth in the same way as Coldness is related to:', options: ['Day', 'Ice', 'Sea', 'Forest'], correctIndex: 1 },
  { id: 'q-ana-3', topicId: 'reasoning', text: 'Horse is related to Herd in the same way as Soldier is related to:', options: ['Navy', 'Fleet', 'Regiment', 'None of these'], correctIndex: 2 },
  { id: 'q-ana-4', topicId: 'reasoning', text: 'Electric current is related to Ampere in the same way as Pressure is related to:', options: ['Joule', 'Newton', 'Pascal', 'Ohm'], correctIndex: 2 },
  { id: 'q-ana-5', topicId: 'reasoning', text: 'Work is related to Joule in the same way as Volume is related to:', options: ['Litre', 'Kilogram', 'Gram', 'Newton'], correctIndex: 0 },
  { id: 'q-ana-6', topicId: 'reasoning', text: 'Power is related to Watt in the same way as Resistance is related to:', options: ['Joule', 'Ampere', 'Ohm', 'Newton'], correctIndex: 2 },
  { id: 'q-ana-7', topicId: 'reasoning', text: 'Botany is related to Plants in the same way as Ornithology is related to:', options: ['Mammals', 'Birds', 'Insects', 'Plants'], correctIndex: 1 },
  { id: 'q-ana-8', topicId: 'reasoning', text: 'Paleontology is related to Fossil in the same way as Microbiology is related to:', options: ['Snake', 'Bird', 'Bacteria', 'Insect'], correctIndex: 2 },
  { id: 'q-ana-9', topicId: 'reasoning', text: 'Nectar is related to Honey in the same way as Disagreement is related to:', options: ['Friendly', 'Conflict', 'Hatred', 'Confusion'], correctIndex: 1 },
  { id: 'q-ana-10', topicId: 'reasoning', text: 'Jealousy is related to Hatred in the same way as Happiness is related to:', options: ['Joy', 'Smile', 'Unhappiness', 'Crying'], correctIndex: 0 },
  { id: 'q-ana-11', topicId: 'reasoning', text: 'Stranger is related to Unknown in the same way as Guess is related to:', options: ['Confusion', 'Conjecture', 'Critic', 'Creative'], correctIndex: 1 },
  { id: 'q-ana-12', topicId: 'reasoning', text: 'Peace is related to Unrest in the same way as Knowledge is related to:', options: ['Ignorance', 'Intelligence', 'Humble', 'Arrogance'], correctIndex: 0 },
  { id: 'q-ana-13', topicId: 'reasoning', text: 'Joy is related to Sadness in the same way as Love is related to:', options: ['Happiness', 'Hate', 'Enmity', 'Shining'], correctIndex: 1 },
  { id: 'q-ana-14', topicId: 'reasoning', text: 'Grief is related to Pleasure in the same way as Joy is related to:', options: ['Medicine', 'Treatment', 'Sad', 'Happy'], correctIndex: 2 },
  { id: 'q-ana-15', topicId: 'reasoning', text: 'Meaningful is related to Meaningless in the same way as Humility is related to:', options: ['Butcher', 'Arrogance', 'Simplicity', 'Weakness'], correctIndex: 1 },
  { id: 'q-ana-16', topicId: 'reasoning', text: 'Animal is related to Zoo in the same way as Aeroplane is related to:', options: ['Airhostess', 'Flying', 'Hangar', 'Landing'], correctIndex: 2 },
  { id: 'q-ana-17', topicId: 'reasoning', text: 'Clothes are related to Cupboard in the same way as Book is related to:', options: ['Table', 'Library', 'Aquarium', 'Hanger'], correctIndex: 1 },
  { id: 'q-ana-18', topicId: 'reasoning', text: 'Car is related to Garage in the same way as Fishes are related to:', options: ['Apiary', 'Hangar', 'Aquarium', 'None of these'], correctIndex: 2 },
  { id: 'q-ana-19', topicId: 'reasoning', text: 'Thermometer is related to Temperature in the same way as Barometer is related to:', options: ['Electric current', 'Earthquake intensity', 'Pressure', 'Blood pressure'], correctIndex: 2 },
  { id: 'q-ana-20', topicId: 'reasoning', text: 'Glucometer is related to Blood sugar in the same way as Sphygmomanometer is related to:', options: ['Blood pressure', 'Barometric pressure', 'Atmospheric pressure', 'Humidity'], correctIndex: 0 },
];

export const reasoningFlashcards: Flashcard[] = [
  { id: 'fc-lns-1', front: 'EJOTY Rule', back: 'A mnemonic to remember the serial numbers of English alphabets in multiples of 5: E=5, J=10, O=15, T=20, Y=25.' },
  { id: 'fc-lns-2', front: 'Opposite Letter Sum Method', back: 'If the sum of the serial numbers of two letters in the English alphabet is 27, they are opposite to each other (e.g., M=13, N=14, 13+14=27).' },
  { id: 'fc-lns-3', front: 'CFILORUX Rule', back: 'A mnemonic to remember the serial numbers of English alphabets in multiples of 3: C=3, F=6, I=9, L=12, O=15, R=18, U=21, X=24.' },
  { id: 'fc-cd-1', front: 'Coding', back: 'The process of converting general meaningful information into meaningless words, letters, or symbols through a specific rule.' },
  { id: 'fc-cd-2', front: 'Decoding', back: 'The process of converting meaningless words, letters, or symbols back into meaningful information using a special rule.' },
  { id: 'fc-cd-3', front: 'Reverse Order Formula', back: 'To find the reverse serial number of a letter from the right side, subtract its left-side serial number from 27.' },
  { id: 'fc-ana-1', front: 'Analogy', back: 'A test of similarity or symmetry, requiring the identification of the underlying relationship between given elements or groups.' },
  { id: 'fc-ana-2', front: 'Arithmetic Progression Formula', back: "The nth term of an arithmetic progression is Tn = a + (n - 1)d, where 'a' is the first term and 'd' is the common difference." },
  { id: 'fc-ana-3', front: 'Geometric Progression Formula', back: "The nth term of a geometric series is Tn = a * r^(n - 1), where 'a' is the first term and 'r' is the common ratio." },
];

export const reasoningNotes: Note[] = [
  {
    id: 'note-lns',
    topicId: 'reasoning',
    title: 'Number and Letter Series Fundamentals',
    sections: [
      { heading: 'Digit and Number Series Patterns', body: 'In digit and number series questions, a sequence of digits is provided where various mathematical operations are inherent. These operations include addition, subtraction, multiplication, division, squares, square roots, cubes, and cube roots. To identify the rule, observe the rate of change: if numbers increase at a simple rate, it is based on addition; if they decrease simply, it is subtraction. A rapid increase indicates multiplication, squares, or positive powers, possibly combined with addition. A rapid decrease suggests division, potentially with subtraction. If the series increases rapidly then decreases, multiplication and division are being used respectively. Alternating small increases and decreases indicate alternating addition and subtraction.' },
      { heading: 'Alphabet Series and Memorization Techniques', body: "Alphabet series questions rely on the arrangement of the English alphabet. It is crucial to remember the serial numbers of letters (A=1 to Z=26). Effective memorization techniques include the 'EJOTY' rule, which represents multiples of 5 (E=5, J=10, O=15, T=20, Y=25), and the 'CFILORUX' rule for multiples of 3 (C=3, F=6, I=9, L=12, O=15, R=18, U=21, X=24). To find the opposite letter of any given letter, the 'Sum Method' is used: if the sum of the serial numbers of two letters is 27, they are opposite to each other (e.g., M=13 and N=14, 13+14=27). Alternatively, the reverse serial number can be found by subtracting the left-side serial number from 27." },
      { heading: 'Arithmetic and Geometric Progressions', body: "An arithmetic progression (or parallel series) is a series where the difference between two consecutive terms is constant, known as the common difference 'd'. If the first term is 'a', the series follows the pattern a, (a+d), (a+2d), etc. The nth term is calculated using the formula Tn = a + (n - 1)d. A geometric progression is a series where the ratio of two consecutive terms is constant, known as the common ratio 'r'. It is obtained by dividing a term by its previous term. If the first term is 'a', the nth term of the geometric series is calculated as Tn = a * r^(n - 1)." },
    ],
  },
  {
    id: 'note-cd',
    topicId: 'reasoning',
    title: 'Coding and Decoding Methodologies',
    sections: [
      { heading: 'Letter Encoding and Decoding Rules', body: 'Coding is the process of converting meaningful information into meaningless words, letters, or symbols using a specific rule, while decoding reverses this process. In letter encoding, common patterns include shifting letters forward or backward by a fixed number of positions in the English alphabet (e.g., +1, -2). Another type involves changing the position of letters within the word, such as reversing the entire word or interchanging adjacent pairs of letters. Additionally, letters may be replaced by their exact opposite letters in the alphabet, which can be quickly identified using the sum method where opposite letters add up to 27.' },
      { heading: 'Number and Symbol Representation', body: 'In number encoding, letters of a word are represented by numbers. This may simply be their alphabetical serial numbers, or it could involve mathematical operations on those serial numbers, such as summing them and multiplying by a constant, or squaring the sum of the digits. In symbol encoding, specific symbols are assigned to specific letters, requiring the solver to map the symbols back to letters by identifying common letters across different coded words. Mixed encoding involves sentences where words are replaced by codes, and the solver must find the code for a specific word by identifying common words and their corresponding common codes across multiple given sentences.' },
    ],
  },
  {
    id: 'note-ana',
    topicId: 'reasoning',
    title: 'Analogy Test Frameworks',
    sections: [
      { heading: 'Word and Semantic Relationships', body: 'Analogy tests measure the ability to identify symmetry or underlying relationships between elements. In word-based analogies, relationships can be based on synonyms (e.g., Stranger: Unknown), antonyms (e.g., Peace: Disturbance), or worker-and-workplace associations (e.g., Animal: Zoo, Car: Garage). Other common semantic relationships include physical quantities and their measuring instruments (e.g., Thermometer measures Temperature, Ammeter measures electric current), and measurement units (e.g., Force is measured in Newtons, Work in Joules). National symbols and capitals also form frequent analogy pairs (e.g., Peacock is to India as Emu is to Australia).' },
      { heading: 'Number and Letter Group Symmetries', body: 'Number analogies often rely on mathematical operations applied to the entire number, such as squaring, cubing, or applying a formula like (x * 3) + 1. For example, 15 relates to 46 because (15 * 3) + 1 = 46. Letter group analogies involve shifting the positions of all letters in a group by a fixed number of places forward or backward in the alphabet. For instance, if AE becomes HL, both letters have shifted forward by 7 positions. Similarly, if FHJ becomes ACE, all three letters have shifted backward by 5 positions. The key to solving these is to determine the uniform transformation applied to the first group and apply the exact same transformation to the second group.' },
    ],
  },
];
