export default ({
    createdAt = new Date().getTime(),
    finishedAt = null,
    winner = null,
    isContested = false,
    winners = [],
    competitors = [],
}) => {

    return {
        createdAt,
        finishedAt,
        winner,
        isContested,
        competitors,
        winners, //all users need to point to a winner, when they are the same the winner is known, else contested
    }
}