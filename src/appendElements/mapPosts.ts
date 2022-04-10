import waitForRender from '../waitForRender';
import type { EntryStory } from '../types';

const mapPosts = async (posts: EntryStory[]) => {
  // .nextInner 요소
  const nextInner = document.getElementById('__next')?.getElementsByClassName('nextInner')[0];
  if (!nextInner) return;

  await waitForRender();

  const postNodeList = Array.from(
    nextInner.querySelectorAll('section > div > div > div > div > div > ul[class] > li[class]:not([data-content])')
  );
  if (!postNodeList) return;

  const postList = Array.from(postNodeList) as HTMLLIElement[];

  postList.forEach((post, index) => {
    console.log(Array.from(post.querySelectorAll('div > div'))[1].textContent?.trim());

    if (Array.from(post.querySelectorAll('div > div'))[1].textContent?.trim() !== posts[index].content.trim()) alert('mapping error!');
    post.dataset.content = posts[index].content;
  });
};

export default mapPosts;
