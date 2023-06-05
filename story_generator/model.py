from transformers import pipeline




def generator_text(theme: str, max_length: int, num_stories: int):

    generator = pipeline("text-generation", model="gpt2")
    story_pattern = "Once upon a time, in a magical kingdom"

    res = generator(
        f'{story_pattern} {theme}',
        max_length=max_length,
        num_return_sequences=num_stories,
        return_full_text=True,
        temperature=0.7,  #hasard (de 0 à 1)
        top_k=50,         #top tokens (de 1 à 50 000 environ)
    )

    for story in res:
        for i in range(num_stories):
            text = res[i]['generated_text']
            last_period = text.rfind('.')
            if last_period != -1:
                res[i]['generated_text'] = text[:last_period+1]

    return res
