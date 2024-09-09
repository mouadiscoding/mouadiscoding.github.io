document.addEventListener('DOMContentLoaded', function() {
    // Function to create TOC
    function createTOC() {
        var toc = document.getElementById('toc-list');
        var headers = document.querySelectorAll('h2, h3');
        var tocStack = [];
        var currentList = toc;
        headers.forEach(function(header) {
            var headerText = header.innerText;
            var headerId = headerText.toLowerCase().replace(/[^\w]+/g, '-');
            header.id = headerId;
            var level = parseInt(header.tagName.substring(1));
            var tocItem = document.createElement('li');
            var tocLink = document.createElement('a');
            tocLink.href = '#' + headerId;
            tocLink.innerText = headerText;
            tocItem.appendChild(tocLink);
            if (level === 2) {
                currentList = document.createElement('ul');
                toc.appendChild(currentList);
                currentList.appendChild(tocItem);
                tocStack.push(currentList);
            } else if (level === 3) {
                if (tocStack.length > 0) {
                    var lastList = tocStack[tocStack.length - 1];
                    var subList = lastList.querySelector('ul');
                    if (!subList) {
                        subList = document.createElement('ul');
                        lastList.appendChild(subList);
                    }
                    subList.appendChild(tocItem);
                    currentList = subList;
                }
            }
        });
    }

    // Initialize TOC
    createTOC();

    // Toggle TOC visibility
    document.querySelector('.toc-toggle').addEventListener('click', function() {
        var content = document.querySelector('.toc-content');
        var icon = document.querySelector('.toc-icon');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.textContent = '▼';
        } else {
            content.style.display = 'none';
            icon.textContent = '▶';
        }
      });
    });
  
  // Function to fetch and display audio samples
async function loadAudioSamples() {
  try {
    console.log('Fetching audio files JSON...');
    const response = await fetch('/assets/audio-files.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Audio files JSON fetched successfully:', data);

    const container = document.getElementById('audio-samples-container');
    if (!container) {
      throw new Error('Audio samples container not found');
    }

    for (const [category, files] of Object.entries(data)) {
      console.log(`Processing category: ${category}`);
      const section = document.createElement('div');
      section.className = 'audio-container';

      const header = document.createElement('h4');
      header.innerText = category.replace(/_/g, ' ').toUpperCase();
      section.appendChild(header);

      files.forEach(file => {
        console.log(`Processing file: ${file}`);
        const pair = document.createElement('div');
        pair.className = 'audio-pair';

        const noisyAudio = document.createElement('div');
        noisyAudio.className = 'audio-item';
        noisyAudio.innerHTML = `<audio controls>
          <source src="/assets/audio/noisy/${file}" type="audio/wav">
          Your browser does not support the audio element.
        </audio>`;
        pair.appendChild(noisyAudio);

        const cleanAudio = document.createElement('div');
        cleanAudio.className = 'audio-item';
        cleanAudio.innerHTML = `<audio controls>
          <source src="/assets/audio/clean/${file}" type="audio/wav">
          Your browser does not support the audio element.
        </audio>`;
        pair.appendChild(cleanAudio);

        const generatedAudio = document.createElement('div');
        generatedAudio.className = 'audio-item';
        generatedAudio.innerHTML = `<audio controls>
          <source src="/assets/audio/generated/${file}" type="audio/wav">
          Your browser does not support the audio element.
        </audio>`;
        pair.appendChild(generatedAudio);

        section.appendChild(pair);
      });

      container.appendChild(section);
    }
  } catch (error) {
    console.error('Error loading audio samples:', error);
  }
}

// Toggle the collapsible content visibility
function setupCollapsible() {
  console.log('Setting up collapsible toggle...');
  const toggleButton = document.querySelector('.collapsible-toggle');
  if (!toggleButton) {
    console.error('Collapsible toggle button not found');
    return;
  }

  toggleButton.addEventListener('click', function() {
    console.log('Collapsible toggle clicked');
    var content = document.querySelector('.collapsible-content');
    var icon = document.querySelector('.collapsible-icon');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.textContent = '▼';
    } else {
      content.style.display = 'none';
      icon.textContent = '▶';
      }
    });
  }

  // Initialize everything on page load
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing...');
    setupCollapsible();
    loadAudioSamples();
  });