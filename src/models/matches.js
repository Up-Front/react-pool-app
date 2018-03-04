export default ({
    createdAt = new Date().getTime(),
    winners = [],
    competitors = [],
}) => {

    return {
        createdAt,
        competitors,
        winners, //all users need to point to a winner, when they are the same the winner is known, else contested
    }
}