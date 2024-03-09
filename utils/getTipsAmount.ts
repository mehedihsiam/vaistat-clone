type TProps = {
  selectedTipsOption: string;
  tips: number;
  amount: number;
};

const getTipsAmount = ({selectedTipsOption, tips, amount}: TProps) => {
  if (selectedTipsOption === 'Amount') {
    return +tips;
  } else {
    const collectedAmount = +amount;
    const tipsPercentage = +selectedTipsOption;
    const tipsAmount = (collectedAmount * tipsPercentage) / 100;
    return tipsAmount;
  }
};

export default getTipsAmount;
