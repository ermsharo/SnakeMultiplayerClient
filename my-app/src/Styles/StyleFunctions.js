export const GenerateWordColor = (word) => {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let colors = [
    "#DCFFDE",
    "#BDEEDF",
    "#FFBCCD",
    "#FDFCDD",
    "#DECEDF",
    "#FDDDCB",
    "#FFFDEE",
    "#CBDDEC",
    "#EBFCFB",
    "#EFEFBD",
    "#DFBDFE",
    "#CDFEDF",
    "#BBDEFE",
    "#DEDCDF",
    "#BEFDBC",
    "#DFCDEE",
    "#BCFBEC",
    "#ECFEFD",
    "#EDDCBF",
    "#ECFEFE",
    "#BFDDFE",
    "#EEFFCB",
    "#FBEDCD",
    "#BEFDFC",
    "#CCDBEB",
    "#BDCECD",
  ];

  return colors[alphabet.indexOf(word[0])];
};

export const HeaderColor = "#012E40";
export const DarkFontColor = "#080706";
export const LightFontColor = "#FFFFFF";
export const BackgroundColor = "#F0EBE3";
export const SecundaryBackgroundColor = "#051C28";
