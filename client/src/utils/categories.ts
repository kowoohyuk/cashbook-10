interface ICategories {
  [key: number]: {
    color: string;
    name: string;
    isIncome: boolean;
  };
}

export const CATERORIES: ICategories = {
  1: {
    color: '#6ed5eb',
    name: '생활',
    isIncome: false,
  },
  2: {
    color: '#4cb8b8',
    name: '식비',
    isIncome: false,
  },
  3: {
    color: '#94d3cc',
    name: '교통',
    isIncome: false,
  },
  4: {
    color: '#4ca1de',
    name: '쇼핑/뷰티',
    isIncome: false,
  },
  5: {
    color: '#d092e2',
    name: '의료/건강',
    isIncome: false,
  },
  6: {
    color: '#817dce',
    name: '문화/여가',
    isIncome: false,
  },
  7: {
    color: '#4a6cc3',
    name: '미분류',
    isIncome: false,
  },
  8: {
    color: '#b9d58c',
    name: '월급',
    isIncome: true,
  },
  9: {
    color: '#e6d267',
    name: '용돈',
    isIncome: true,
  },
  10: {
    color: '#e2b765',
    name: '기타수입',
    isIncome: true,
  },
};
