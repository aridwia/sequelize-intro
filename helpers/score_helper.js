function score(arrNum) {
  var arrNumTemp = [];
  for (var i = 0; i < arrNum.length; i++) {
    if (arrNum[i] > 85) {
      arrNumTemp[i] = 'A';
    }
    if (arrNum[i] > 75 && arrNum[i] <= 85) {
      arrNumTemp[i] = 'B';
    }
    if (arrNum[i] > 55 && arrNum[i] <= 75) {
      arrNumTemp[i] = 'C';
    }
    if (arrNum[i]<= 55) {
      arrNumTemp[i] = 'E';
    }
    if (arrNum[i] == null){
      arrNumTemp[i] = 'Kosong';
    }
  }
  return arrNumTemp
}

module.exports = score;
