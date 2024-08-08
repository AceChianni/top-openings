class AnimeOpening {
  constructor(title, artist, anime, userId) {
    this.title = title;
    this.artist = artist;
    this.anime = anime;
    this.userId = userId;
  }
}

class Library {
  constructor(name, openings) {
    this.name = name;
    this.openings = openings;
  }

  addOpening(newOpening) {
    const existingOpening = this.openings.find(
      (opening) =>
        opening.title.toLowerCase() === newOpening.title.toLowerCase() &&
        opening.anime.toLowerCase() === newOpening.anime.toLowerCase()
    );

    if (existingOpening) {
      return; // Handle duplicate if necessary
    } else {
      this.openings.push(newOpening);
    }
  }

  removeOpening(title) {
    this.openings = this.openings.filter(
      (opening) => opening.title.toLowerCase() !== title.toLowerCase()
    );
  }

  findOpeningByTitle(title) {
    return this.openings.find(
      (opening) => opening.title.toLowerCase() === title.toLowerCase()
    );
  }

  listAllOpenings() {
    return this.openings;
  }
}

export { AnimeOpening, Library };
