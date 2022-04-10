import htm from 'htm';
import localforage from 'localforage';
import vhtml from 'vhtml';
import manifest from '../../manifest.json';
import { ImageData } from '../types';
import uploadImage from '../upload';
import submit from './submit';

const html = htm.bind(vhtml);

const popup = (() => {
  if (document.querySelector('.entry-image-popup-container') !== null) return document.querySelector('.entry-image-popup-container')!;

  const tmp = document.createElement('div');
  tmp.className = 'entry-image-popup-container';
  document.documentElement.insertBefore(tmp, document.head);

  return tmp;
})();

window.isPopupOpen = false;

export const reloadPopup = () => {
  localforage.getItem('entry-image-uploads').then((value) => {
    if (value === null) return;

    popup.innerHTML = html`<div class="popup">
      <div class="title">
        <span class="label">이미지 보관함</span>
        <div class="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
      <div class="bottom">
        ${(value as ImageData[]).length <= 0
          ? html`<h3 class="noimages">이미지가 없습니다.<br />"이미지 추가" 버튼을 클릭해 이미지를 추가해보세요.</h3>`
          : html`<div class="content">
              ${(value as ImageData[]).reverse().map((image) => {
                const src = `https://playentry.org/uploads/${image.name.slice(0, 2)}/${image.name.slice(2, 4)}/${image.name}.${image.ext}`;

                return html`<div class="item" data-id="${image.id}" data-orig-name="${image.origName}">
                  <div class="frame">
                    <div class="thumb" style="background-image: url('${src}');"></div>
                  </div>
                  <div class="label">${image.origName}</div>
                </div>`;
              })}
            </div>`}
        <div class="button">+ 이미지 추가</div>
      </div>
    </div>`.toString();

    popup.querySelector('.popup .title .close')?.addEventListener('click', () => togglePopup('close'));
    popup.querySelector('.popup .bottom .button')?.addEventListener('click', () => document.getElementById('entry-image-file-input')?.click());

    (Array.from(popup.querySelectorAll('.popup .bottom .content .item')) as HTMLDivElement[]).forEach((item) => {
      if (item.dataset.id !== undefined)
        item.addEventListener('click', () => {
          window.imageId = item.dataset.id;
          submit();
          togglePopup('close');

          const notice = document.querySelector('section > div > div > div > div > div > div:last-child > a');
          if (notice) notice.textContent = `첨부된 이미지: ${item.dataset.origName}`;
        });
    });
  });
};

export const togglePopup = (type?: 'open' | 'close') => {
  const open = (() => (type === undefined ? !window.isPopupOpen : type === 'open'))();

  reloadPopup();

  if (open) (document.querySelector('.entry-image-popup-container')! as HTMLDivElement).style.display = 'flex';
  else (document.querySelector('.entry-image-popup-container')! as HTMLDivElement).style.display = 'none';

  window.isPopupOpen = open;
};

// (Array.from(popup.querySelectorAll('input[type=file]')) as HTMLInputElement[]).forEach((el) => {
//   el.onchange = async (e) => {
//     const file = el.files![0];
//     popup.querySelector('.content.show label[for] a.uploadButton')!.textContent = '업로드 중입니다...';
//     const fileInfo = await uploadImage(file);

//     console.log(fileInfo);

//     const info = document.querySelector('.css-1lpaq59.e1h77j9v0 .link')!;

//     info.textContent = `첨부된 파일: ${file.name}`;

//     togglePopup('close');

//     popup.querySelector('.content.show label[for] a.uploadButton')!.textContent = '내 컴퓨터에서 선택';

//     // (document.querySelector('.css-vvqlz4.e13821ld2')! as HTMLAnchorElement).onclick = async (e) => {
//     //   e.preventDefault();
//     //   e.stopImmediatePropagation();

//     //   const content = (document.getElementById('Write')! as HTMLTextAreaElement).value;

//     //   const postRes = await fetch('https://playentry.org/graphql', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({
//     //       query: `mutation CREATE_ENTRYSTORY(
//     //         $content: String
//     //         $text: String
//     //         $image: String
//     //         $sticker: String
//     //         $cursor: String
//     //       ) {
//     //         createEntryStory(
//     //           content: $content
//     //           text: $text
//     //           image: $image
//     //           sticker: $sticker
//     //           cursor: $cursor
//     //         ) {
//     //           discuss {
//     //             id
//     //           }
//     //         }
//     //       }
//     //       `,
//     //       variables: { content },
//     //     }),
//     //   });
//     //   if (!postRes.ok) return alert(`에러: ${postRes.status}`);

//     //   const postData = await postRes.json();
//     //   if (!(postData.errors === undefined || postData.errors[0] === undefined || postData.errors[0].statusCode === undefined))
//     //     return alert(`에러: ${postData.errors[0].statusCode}`);

//     //   const res = await fetch('https://entry-image.thoratica.repl.co/addData', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({
//     //       id: postData.data.createEntryStory.discuss.id,
//     //       files: [
//     //         {
//     //           type: popup.querySelector('.content.show')?.classList[1] ?? 'file',
//     //           url: `https://playentry.org/uploads/${fileInfo.filename.slice(0, 2)}/${fileInfo.filename.slice(2, 4)}/${fileInfo.filename}.${
//     //             fileInfo.filename.imageType
//     //           }`,
//     //         },
//     //       ],
//     //     }),
//     //   });

//     //   console.log(await res.json());

//     //   location.reload();
//     // };
//   };
// });

document.documentElement.insertBefore(popup, document.head);
