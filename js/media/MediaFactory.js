import Media from "./Media";

class MediaFactory {
    create(object) {
        return new Media(object);
    }

    createFromDB(objectFromDB) {
        const preparedMediaJson = {
            name: objectFromDB.name,
            id: objectFromDB.id,
            photographerId: objectFromDB.photographerId,
            image: objectFromDB.image,
            tags: objectFromDB.tags,
            likes: objectFromDB.likes,
            date: objectFromDB.date,
            price: objectFromDB.price,
        };

        return new Media(preparedMediaJson);

    }
}

export default new MediaFactory();