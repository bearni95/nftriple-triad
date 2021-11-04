
export interface CardStatsInterface {
    top: number,
    left: number,
    right: number,
    bottom: number,
}

export interface CardInterface {
    contractAddress: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    stats: CardStatsInterface;
}