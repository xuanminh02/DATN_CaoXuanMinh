export default function padNumberWithZero(num) {
  if (!num) {
    return '00';
  }
  if (num < 10) {
    return '0' + num;
  } else {
    return '' + num;
  }
}
