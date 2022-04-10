import uploadImage from '../upload';
import submit from './submit';
import './popup';
import { reloadPopup, togglePopup } from './popup';
import localforage from 'localforage';
import { ImageData } from '../types';

const uploadButton = () => {
  // .nextInner 요소
  const nextInner = document.getElementById('__next')?.getElementsByClassName('nextInner')[0];
  if (!nextInner) return;

  // 버튼 컨테이너
  const buttonContainer = nextInner.querySelector('section > div > div > div > div > div > div') as HTMLDivElement;

  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.style.display = 'none';
  inputElement.id = 'entry-image-file-input';
  inputElement.onchange = async (e: any) => {
    const files: FileList = e.target.files;
    if (!files || !files[0]) return alert('파일올리셈');

    const res = await uploadImage(files[0]);
    if (!res.success) {
      console.log(res);
      return alert('뭔가이상함... ㅂㄷㅂㄷ');
    }

    const data: ImageData = { id: res.data._id, name: res.data.filename, origName: res.data.name, ext: res.data.imageType };
    const uploads: ImageData[] | null = await localforage.getItem('entry-image-uploads');
    if (uploads !== null) {
      await localforage.setItem('entry-image-uploads', [...uploads, data]);
      reloadPopup();
    }
  };

  // 새 업로드 버튼
  const button = buttonContainer.querySelector('div')!.cloneNode(true) as HTMLDivElement;

  button.className = 'entry-image-upload-button';
  button.querySelector('a')!.className = 'entry-image-upload-button-icon';

  button.onclick = () => {
    togglePopup('open');
  };

  buttonContainer.appendChild(inputElement);
  buttonContainer.insertBefore(button, buttonContainer.firstElementChild!.nextElementSibling!);
};

export default uploadButton;
