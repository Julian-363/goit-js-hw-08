import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

// Obtener el tiempo de reproducción actual y guardarlo en el almacenamiento local
const savePlaybackTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);
// Actualiza el tiempo de reproducción en el almacenamiento local no más de una vez por segundo

// Cargar el tiempo de reproducción guardado del almacenamiento local y establecerlo en el reproductor
const loadPlaybackTime = async () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    await player.setCurrentTime(currentTime);
  }
};

// Escuchar el evento de actualización del tiempo de reproducción
player.on('timeupdate', savePlaybackTime);

// Cargar el tiempo de reproducción al iniciar el reproductor
player.ready().then(loadPlaybackTime);
