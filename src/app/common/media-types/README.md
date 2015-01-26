Media Types Module
============

> Allows engines identify results by custom media types. 

Each engine has different ways of defining what type of media an item is. By defining a JSON path and expected value in each engine's config, 
the `mediaTypes` module allows `oneSearch` to identify media types across search engines automatically. 

Given the following search results for an engine, where a book, article, and video a returned:

```json
{
    "results": [
        {
            "title": "Real World Applications of the Hamster Wheel",
            "typeIdKey": "book"                           
        },
        {
            "title": "Not-so-real World Applications of the Hamster Wheel",
            typeIdKey: "newspaper"
        },
        {
            "title": "Wheel See Who Gets the Last Word on Hamster Wheels",
            "typeIdKey": "broadcastNewsClip"
        },
        {
            "title": "7 Hamster Wheels So Crazy You Will Literally Go Insane and Need a Full Time Care Taker. P.S., This is totally not hyperbole click-baiting",
            "typeIdKey": "youtubeVideo"
        }
    ]
    
}
```

You could tell `oneSearch` about media types in this engine's erratic results by defining the `mediaTypes` parameter in the engine's config options:

```javascript
{
//...options
// This will define books, articles, and videos as media types
mediaTypes: {
    path: 'typeIdKey', //The JSON base path to the type identifier
    types: {
        books: 'book', //expect typeIdKey == "book"
        articles: 'newspaper',
        videos: ['broadcastNewsClip', 'youtubeVideo']
    }
}
```