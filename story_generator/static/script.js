
const generateStory = async () => {


  document.getElementById('loadingImage').style.display = 'inline';
  const theme = document.getElementById('theme').value;
  const max_length = parseInt(document.getElementById('max_length').value);
  const num_stories = parseInt(document.getElementById('num_stories').value);

  const response = await fetch('http://127.0.0.1:8000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      theme: theme,
      max_length: max_length,
      num_stories: num_stories
    })
  });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return;
  }

  const data = await response.json();

  if (data.histoire) {
    let storiesHtml = '';
    data.histoire.forEach(story => {
        let storyText = story.generated_text;
        storiesHtml += `<div class="story">${storyText}</div>`;
    });
    document.getElementById('story').innerHTML = storiesHtml;
} else {
    console.error("Unexpected response structure: ", data);
}

  document.getElementById('loadingImage').style.display = 'none';

};
