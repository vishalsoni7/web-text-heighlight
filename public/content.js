let selectionPopup = null;

function createSelectionPopup() {
  const popup = document.createElement('div');
  popup.id = 'highlight-popup';
  popup.innerHTML = `
    <button id="save-highlight-btn">Save Highlight?</button>
  `;
  document.body.appendChild(popup);
  return popup;
}

function showPopup(x, y) {
  if (!selectionPopup) {
    selectionPopup = createSelectionPopup();
  }
  
  selectionPopup.style.left = `${x}px`;
  selectionPopup.style.top = `${y - 40}px`;
  selectionPopup.style.display = 'block';
  
  const saveBtn = document.getElementById('save-highlight-btn');
  saveBtn.onclick = saveHighlight;
}

function hidePopup() {
  if (selectionPopup) {
    selectionPopup.style.display = 'none';
  }
}

function saveHighlight() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText) {
    const highlight = {
      id: Date.now().toString(),
      text: selectedText,
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString()
    };
    
    chrome.runtime.sendMessage({
      action: 'saveHighlight',
      highlight: highlight
    }, (response) => {
      if (response && response.success) {
        flashHighlight(selection.getRangeAt(0));
      }
    });
  }
  
  hidePopup();
  window.getSelection().removeAllRanges();
}

function flashHighlight(range) {
  const span = document.createElement('span');
  span.className = 'flash-highlight';
  
  try {
    range.surroundContents(span);
    setTimeout(() => {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    }, 2000);
  } catch (e) {
    console.error('Could not flash highlight:', e);
  }
}

document.addEventListener('mouseup', (e) => {
  setTimeout(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showPopup(rect.left + rect.width / 2, rect.top + window.scrollY);
    } else {
      hidePopup();
    }
  }, 10);
});

document.addEventListener('mousedown', (e) => {
  if (selectionPopup && !selectionPopup.contains(e.target)) {
    hidePopup();
  }
});

window.addEventListener('scroll', hidePopup);
window.addEventListener('resize', hidePopup);