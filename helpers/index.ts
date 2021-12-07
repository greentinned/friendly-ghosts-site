export function randArb(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

export function sleep(milliseconds: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
