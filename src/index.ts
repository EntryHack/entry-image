import waitForRender from './waitForRender';
import uploadButton from './appendElements/uploadButton';
import './fetch';
import './styles.css';
import localforage from 'localforage';

window.addEventListener('load', () =>
  waitForRender().then(() => {
    localforage.getItem('entry-image-uploads').then((value) => {
      if (value === null) localforage.setItem('entry-image-uploads', []);
    });
    uploadButton();
  })
);
