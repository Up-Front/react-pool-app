export default ({
    userA,
    userB,
    createdAt = new Date().getTime(),
    winnerA = null,
    winnerB = null }) => {

    return {
        createdAt,
        userA,
        userB,
        winnerA, //both users need to point to a winner, when they are the same the winner is known, else contested
        winnerB,
    }
}