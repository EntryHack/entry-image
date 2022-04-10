const waitForRender = async () => {
  const nextInner = document.getElementById('__next')?.getElementsByClassName('nextInner')[0];
  if (!nextInner) return;

  // 글 목록 렌더까지 기다리기
  return new Promise<void>((res) => {
    const interval = setInterval(() => {
      // 글 목록 요소가 존재하는지 확인
      if (nextInner.querySelectorAll('section > div > div > div > div > div > ul').length > 0) {
        res();
        clearInterval(interval);
      }
    }, 50);
  });
};

export default waitForRender;
