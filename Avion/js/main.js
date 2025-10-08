const noticeEl = document.querySelector('.notice');

if(noticeEl){
    const noticeCloseEl = noticeEl.querySelector('.notice-close');
    noticeCloseEl.addEventListener('click', () => {
        noticeEl.classList.add('notice--hidden');
    });
}