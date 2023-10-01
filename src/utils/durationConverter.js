function durationConverter(duration) {
  const hour = Math.floor(duration / 60);
  const min = duration % 60;

  if (hour === 0) {
    return `${min > 0 ? ` ${min}м` : ''}`;
  } else {
    return `${hour}ч${min > 0 ? ` ${min}м` : ''}`;
  }
}

export default durationConverter;