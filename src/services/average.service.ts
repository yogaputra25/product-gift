interface Redeem {
  rating: number | null;
}

export class Average {
  public roundRating(rating: number | null): number | null {
    if (rating == null) {
      return null;
    } else {
      return Math.round(rating * 2) / 2;
    }
  }

  public calculateAverageRating(redeems: Redeem[]): number | null {
    const validRatings = redeems.filter((redeem) => redeem.rating !== null);
    if (validRatings.length === 0) {
      return null; // Mengembalikan null jika tidak ada rating yang valid
    }

    const totalRating = validRatings.reduce(
      (acc, redeem) => acc + (redeem.rating || 0),
      0,
    );
    return totalRating / validRatings.length;
  }
}
