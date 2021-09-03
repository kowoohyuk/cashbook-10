export const DEFAULT_CATEGORY = [
  {
    name: '생활',
    isIncome: false,
    color: '#6ed5eb',
  },
  {
    name: '식비',
    isIncome: false,
    color: '#4cb8b8',
  },
  {
    name: '교통',
    isIncome: false,
    color: '#94d3cc',
  },
  {
    name: '쇼핑/뷰티',
    isIncome: false,
    color: '#4ca1de',
  },
  {
    name: '의료/건강',
    isIncome: false,
    color: '#d092e2',
  },
  {
    name: '문화/여가',
    isIncome: false,
    color: '#817dce',
  },
  {
    name: '미분류',
    isIncome: false,
    color: '#4a6cc3',
  },
  {
    name: '월급',
    isIncome: true,
    color: '#b9d58c',
  },
  {
    name: '용돈',
    isIncome: true,
    color: '#e6d267',
  },
  {
    name: '기타수입',
    isIncome: true,
    color: '#e2b765',
  },
];

export const DEFAULT_PAYMENT = [
  {
    name: '현금',
  },
  {
    name: '신용카드',
  },
  {
    name: '체크카드',
  },
  {
    name: '배민페이',
  },
];

export const DEFAULT_HISTORY_LENGTH = 600;

export function getDummyHistories(
  categoryLength: number,
  paymentLength: number,
) {
  // 더미 데이터이므로 2월 예외처리는 통과.. :)
  const DAY = 28;
  const MONTH = 12;
  const contents =
    '감,persimmon,가 지,egg plant,감 자,potato,건 포도,raisin,겨 자,mustard,강남 콩,kidney bean,곶 감,dried persimmon,고 추,red pepper,검은 콩,black bean,구아바,guava,깻 잎,sesame leaf,고구마,sweet potato,귤,orange,꽃 양배추,cauli flower,곡 류,grain crops,다 래,actinidiaarguta,당 근,carrot,깨,sesame,대 추,jujube,라 임,lime,논,ricefield,도토리,acorn,마 늘,garlic,대 두,soybean,딸 기,strawberry,미나리,parsley,더 덕,deodeok,레 몬,lemon,배 추,chinese cabbage,도라지,bell flower,말린 자두,prune,버 섯,mushroom,땅 콩,peanut,망 고,mango,부 추,chives,무,radish,매 실,japan eseapricot,브로콜리,croccoli,미 역,seaweed,머 루,wild grape,상 추,lettuce,밀,wheat,메 론,melon,샐러리,celery,백 미,white rice,모 과,quince,생 강,ginger,보 리,barley,무화과,fig,스노피,snowpea,산 삼,wild ginseng,바나나,banana,시금치,spinach,서양 호박,zucchini,밤,chestnut,쑥,mugwort wormwood,순 무,turnip,배,pear,아 욱,curledmallow,알로에,aloe,체 리,cherry,양배추,cabbage,양 감자,yam,복숭아,peach,양상추,lettuce,완두 콩,peawax bean,블루 베리,blue berry,양송이,button mushroom,인 삼,ginseng,사 과,apple,양 파,onion,죽 순,bamboo shoot,산 딸기,wild berry,연 근,lotusroot,찹 쌀,glutinous rice,살 구,apricot,오 이,cucumber,콩나물,bean sprouts,석 류,pomegranate,우 엉,burdock,팥,red bean,수 박,water melon,작은 양파,pearl onion,현 미,brown rice,씨없는 과일,seedless fruit,파,green onion,호 밀,rye,아보카도,avocado,파프리카,paprika,호 박,pumpkin,풋 고추,green pepper,후추,pepper,피 망,pimiento'.split(
      ',',
    );
  return Array(DEFAULT_HISTORY_LENGTH)
    .fill('')
    .map((_, i) => ({
      content: `'${contents[getRandomNumber(contents.length)]}'`,
      amount: getRandomPrice(),
      paymentDate: `'2021-${getRandomNumber(MONTH)}-${getRandomNumber(DAY)}'`,
      isIncome: Boolean(i % 2),
      userId: 0,
      paymentId: getRandomNumber(paymentLength),
      categoryId: getRandomNumber(categoryLength),
    }));
}

function getRandomNumber(end: number): number {
  return Math.ceil(Math.random() * end);
}

function getRandomPrice(): number {
  return Math.floor(Number((Math.random() * 1000).toFixed(2))) * 10 + 500;
}
