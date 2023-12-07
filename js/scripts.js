document.addEventListener('DOMContentLoaded', function () {
    var ids = ['Yellow', 'Green', 'Blue', 'Red', 'Start', 'Strict'];

    var themeAudio = new Audio("audio/theme.mp3");
    var alertAudio = new Audio("audio/redalert.mp3");
    var secondAudio = new Audio('audio/code.mp3');
    var explodeSound = new Audio('audio/explode2.mp3');
    var flashInterval;

    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;

    document.getElementById('Strict').addEventListener('click', function () {
        document.getElementById('start-image').style.display = 'none';
    });

    $('#Strict').click(function () {
        $('#start-image').hide();
    });
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = 1000;
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    var videoContainer = document.getElementById('video-container');
    var videoElement = document.createElement('video');
    videoElement.style.width = '65%';
    videoElement.style.height = '50%';
    videoContainer.appendChild(videoElement);


    videoElement.addEventListener('play', function () {
        if (videoElement.src.includes('explode.mp4')) {
            explodeSound.play();
        }
    });

    alertAudio.addEventListener('timeupdate', function () {
        if (this.currentTime > this.duration / 2) {
            this.pause();
        }
    });

    alertAudio.addEventListener('pause', function () {
        clearInterval(flashInterval);
        overlay.style.display = 'none';
        videoElement.src = "video/explode.mp4";
        videoElement.play();
    });

    function addHoverEffect(elementId) {
        var element = document.getElementById(elementId);

        element.addEventListener('mouseover', function () {
            element.style.fill = 'rgba(255, 255, 255)';
            element.style.cursor = 'pointer';
        });

        element.addEventListener('mouseout', function () {
            element.style.fill = '';
            element.style.cursor = '';
        });

        if (elementId == 'Start') {
            element.addEventListener('click', function () {
                document.getElementById('start-image').style.display = 'none';
                clearInterval(flashInterval);
                overlay.style.display = 'none';
                alertAudio.pause();
                alertAudio.currentTime = 0;
                themeAudio.play();
                videoElement.src = "video/hole.mp4";
                videoElement.loop = true;
                videoElement.play();
            });
        }
        if (elementId == 'Strict') {
            element.addEventListener('click', function () {
                themeAudio.pause();
                themeAudio.currentTime = 0;
                alertAudio.currentTime = 0;
                alertAudio.play();
                overlay.style.display = 'block';
                clearInterval(flashInterval);
                flashInterval = setInterval(function () {
                    overlay.style.backgroundColor = overlay.style.backgroundColor == 'rgba(255, 0, 0, 0.5)' ? '' : 'rgba(255, 0, 0, 0.5)';
                }, 1000);
                setTimeout(function () {
                    secondAudio.currentTime = 0;
                    secondAudio.play();
                }, 2000);
                setTimeout(function () {
                    explodeSound.currentTime = 0;
                    explodeSound.play();
                    videoElement.src = "video/explode.mp4";
                    videoElement.play();
                }, 7000);
                videoElement.addEventListener('ended', function () {
                    clearInterval(flashInterval);
                });
            });
        }

        if (['Yellow', 'Green', 'Blue', 'Red'].includes(elementId)) {
            element.addEventListener('click', function () {
                document.getElementById('start-image').style.display = 'none';
                videoElement.pause();
                videoElement.currentTime = 0;
                themeAudio.pause();
                themeAudio.currentTime = 0;
                console.log(elementId + ' button clicked');

                switch (elementId) {
                    case 'Yellow':
                        videoElement.src = "video/voyager.mp4";
                        videoElement.id = 'yellow-video';
                        break;
                    case 'Green':
                        videoElement.src = "video/st.mp4";
                        videoElement.id = 'green-video';
                        break;
                    case 'Blue':
                        videoElement.src = "video/st2.mp4";
                        videoElement.id = 'blue-video';
                        break;
                    case 'Red':
                        videoElement.src = "video/ds9.mp4";
                        videoElement.id = 'red-video';
                        break;
                }
                videoElement.play();
            });
        }
    }

    for (var i = 0; i < ids.length; i++) {
        addHoverEffect(ids[i]);
    }
});